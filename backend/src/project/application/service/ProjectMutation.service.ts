import { Project } from '../../domain/Project.entity';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { ProjectDto } from '../dto/Project.dto';
import { UpdateProjectDto } from '../dto/UpdateProject.dto';
import { ProjectNotFoundException } from '../exception/ProjectNotFoundException';
import { MutateProjectUseCase } from '../ports/in/MutateProjectUseCase';
import { ProjectPersistencePort } from '../ports/out/ProjectPersistencePort';
import { CreateSlideDto } from '../dto/CreateSlide.dto';
import { SlideDto } from '../dto/Slide.dto';
import { Slide } from '../../domain/Slide.entity';
import { UpdateSlideDto } from '../dto/UpdateSlide.dto';
import { DeleteSlideDto } from '../dto/DeleteSlide.dto';
import { DeleteProjectDto } from '../dto/DeleteProject.dto';
import { User } from '../../../core/entity/domain/user/User.entity';

export class ProjectMutationService implements MutateProjectUseCase {
  constructor(
    private readonly projectPersistencePort: ProjectPersistencePort,
  ) {}

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

    const slide = Slide.create({ ...createDto });

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
