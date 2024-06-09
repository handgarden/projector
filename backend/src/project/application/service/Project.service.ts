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
import { Slide } from '../../domain/Slide.entity';
import { UpdateSlideDto } from '../dto/UpdateSlide.dto';
import { Nil } from '../../../common/nil/Nil';

@Injectable()
export class ProjectService
  implements ProjectQueryUseCase, ProjectMutateUseCase
{
  constructor(
    @Inject(ProjectPersistencePort)
    private readonly projectPersistencePort: ProjectPersistencePort,
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

    const saved =
      await this.projectPersistencePort.saveAggregateProject(project);

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

    const updated =
      await this.projectPersistencePort.saveAggregateProject(project);

    return ProjectDto.fromEntity(updated);
  }

  public async deleteProject(dto: DeleteProjectDto): Promise<void> {
    const project = await this.getAggregateProject(dto.id);

    await project.validateCreator(dto.creatorId);

    await this.projectPersistencePort.removeAggregateProject(project);
  }

  public async addSlide(createDto: CreateSlideDto): Promise<SlideDto> {
    const project = await this.getAggregateProject(createDto.projectId);

    await project.validateCreator(createDto.creatorId);

    const slide = await Slide.create({ ...createDto });

    await project.addSlide(slide);

    const saved =
      await this.projectPersistencePort.saveAggregateProject(project);
    const savedSlides = await saved.slides;
    const savedSlide = savedSlides[savedSlides.length - 1];

    return SlideDto.fromEntity(savedSlide);
  }

  public async updateSlide(updateDto: UpdateSlideDto): Promise<SlideDto> {
    const project = await this.getAggregateProject(updateDto.projectId);

    await project.validateCreator(updateDto.creatorId);

    await project.updateSlide({
      slideId: updateDto.slideId,
      updatedTitle: updateDto.title,
      updatedDescription: updateDto.description,
      updatedImages: updateDto.images,
    });

    const updated =
      await this.projectPersistencePort.saveAggregateProject(project);

    const updatedSlides = await updated.slides;
    const updatedSlide = updatedSlides.find((s) => s.id === updateDto.slideId);

    return SlideDto.fromEntity(updatedSlide!);
  }

  public async deleteSlide(dto: DeleteSlideDto): Promise<void> {
    const project = await this.getAggregateProject(dto.projectId);

    await project.validateCreator(dto.creatorId);

    await project.deleteSlide(dto.slideId);

    await this.projectPersistencePort.saveAggregateProject(project);
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
