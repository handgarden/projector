import { Inject, Injectable } from '@nestjs/common';
import { Pageable } from '../../../common/page/Pageable';
import { PaginatedType } from '../../../common/page/Paginated';
import { ProjectPersistencePort } from '../port/out/ProjectPersistencePort';
import { ProjectDto } from '../dto/Project.dto';
import { ProjectQueryUseCase } from '../port/in/ProjectQueryUseCase';
import { ProjectMutateUseCase } from '../port/in/ProjectMutateUseCase';
import { ProjectNotFoundException } from '../exception/ProjectNotFoundException';
import { DeleteSlideDto } from '../dto/DeleteSlide.dto';
import { SlideDto } from '../dto/Slide.dto';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { Project } from '../../domain/Project.entity';
import { User } from '../../../user/domain/User.entity';
import { UpdateProjectDto } from '../dto/UpdateProject.dto';
import { DeleteProjectDto } from '../dto/DeleteProject.dto';
import { CreateSlideDto } from '../dto/CreateSlide.dto';
import { UpdateSlideDto } from '../dto/UpdateSlide.dto';
import { Nil } from '../../../common/nil/Nil';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProjectService
  implements ProjectQueryUseCase, ProjectMutateUseCase
{
  constructor(
    @Inject(ProjectPersistencePort)
    private readonly projectPersistencePort: ProjectPersistencePort,
    private readonly em: EntityManager,
  ) {}
  async getThumbnailKey(projectId: number): Promise<Nil<string>> {
    const projectNil =
      await this.projectPersistencePort.findAggregatedProjectById(projectId);
    if (projectNil.isNil()) {
      throw new Error('Project not found');
    }
    const project = projectNil.unwrap();
    const thumbnail = await project.getThumbnail();

    if (thumbnail.isNil()) {
      return Nil.empty();
    }

    return Nil.of(thumbnail.unwrap().key);
  }

  async getProject(id: number): Promise<ProjectDto> {
    const project = await this.projectPersistencePort.findProjectById(id);

    if (project.isNil()) {
      throw new Error('Project not found');
    }

    return ProjectDto.fromEntity(project.unwrap());
  }

  async getUserProjects(
    userId: number,
    pageable: Pageable,
  ): Promise<PaginatedType<ProjectDto>> {
    const [data, total] =
      await this.projectPersistencePort.findProjectsByUserId(userId, pageable);

    return {
      items: data.map(ProjectDto.fromEntity),
      total,
      hasNext: pageable.size + pageable.skip < total,
    };
  }

  public async createProject(
    projectDto: CreateProjectDto,
  ): Promise<ProjectDto> {
    const creator = User.of(projectDto.creatorId);

    const project = await Project.fromDto({
      creator,
      title: projectDto.title,
      description: projectDto.description,
    });

    const saved = await this.projectPersistencePort.saveProject(project);

    return ProjectDto.fromEntity(saved);
  }

  public async updateProject(
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    const nilProject = await this.projectPersistencePort.findProjectById(
      updateProjectDto.projectId,
    );

    if (nilProject.isNil()) {
      throw new ProjectNotFoundException(updateProjectDto.projectId);
    }
    const project = nilProject.unwrap();

    await project.validateCreator(updateProjectDto.creatorId);

    await project.update({
      title: updateProjectDto.title,
      description: updateProjectDto.description,
    });

    const updated = await this.projectPersistencePort.saveProject(project);

    return ProjectDto.fromEntity(updated);
  }

  public async deleteProject(dto: DeleteProjectDto): Promise<void> {
    const project = await this.getAggregateProject(dto.id);

    await project.validateCreator(dto.creatorId);

    const slides = await project.slides;
    const images = (await Promise.all(slides.map((s) => s.images))).flat();

    this.em.transaction(async (tem) => {
      if (slides.length > 0) {
        await tem.remove(slides);
      }
      if (images.length > 0) {
        await tem.remove(images);
      }
      await tem.remove(project);
    });
  }

  public async addSlide(createDto: CreateSlideDto): Promise<SlideDto> {
    const project = await this.getAggregateProject(createDto.projectId);

    await project.validateCreator(createDto.creatorId);

    const slide = await project.addSlide(createDto);

    const savedSlide = await this.em.transaction(async (tem) => {
      const saved = await tem.save(slide);
      const images = await slide.images;
      if (images.length > 0) {
        images.forEach((i) => (i.slide = Promise.resolve(saved)));
        await tem.save(images);
      }
      return saved;
    });

    return SlideDto.fromEntity(savedSlide);
  }

  public async updateSlide(updateDto: UpdateSlideDto): Promise<SlideDto> {
    const project = await this.getAggregateProject(updateDto.projectId);

    await project.validateCreator(updateDto.creatorId);

    const slides = await project.slides;
    const slide = slides.find((s) => s.id === updateDto.slideId);
    const prevImages = await slide?.images;

    const updated = await project.updateSlide({
      slideId: updateDto.slideId,
      updatedTitle: updateDto.title,
      updatedDescription: updateDto.description,
      updatedImages: updateDto.images,
    });

    const updatedImages = await updated.images;

    await this.em.transaction(async (tem) => {
      if (prevImages && prevImages.length > 0) {
        await tem.remove(prevImages);
      }
      await tem.save(updated);
      await tem.save(updatedImages);
    });

    return SlideDto.fromEntity(updated);
  }

  public async deleteSlide(dto: DeleteSlideDto): Promise<void> {
    const project = await this.getAggregateProject(dto.projectId);

    await project.validateCreator(dto.creatorId);

    const deleted = await project.deleteSlide(dto.slideId);

    if (deleted.isNil()) {
      return;
    }

    const deletedSlide = deleted.unwrap();
    const deletedImages = await deletedSlide.images;
    const updatedSlides = await project.slides;
    await this.em.transaction(async (tem) => {
      await tem.remove(deletedImages);
      await tem.remove(deletedSlide);
      await tem.save(updatedSlides);
    });
  }

  private async getAggregateProject(id: number) {
    const nilProject =
      await this.projectPersistencePort.findAggregatedProjectById(id);
    if (nilProject.isNil()) {
      throw new ProjectNotFoundException(id);
    }
    const project = nilProject.unwrap();

    return project;
  }
}
