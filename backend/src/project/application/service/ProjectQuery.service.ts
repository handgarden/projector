import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from '../../../graphql/project/input/CreateProject.input';
import { Project } from '../../domain/Project.entity';
import { GraphQLNotFoundError } from '../../../graphql/common/exception/GraphQLNotFoundError';
import { Pageable } from '../../../common/page/Pageable';
import { ProjectResponse } from '../../../graphql/project/response/Project.response';
import { PaginatedType } from '../../../common/page/Paginated';
import { ProjectPersistencePort } from '../ports/out/ProjectPersistencePort';
import { EntityManager } from 'typeorm';
import { CreateProjectUseCase } from '../ports/in/CreateProjectUseCase';
import { UpdateProjectUseCase } from '../ports/in/UpdateProjectUseCase';
import { GetProjectUseCase } from '../ports/in/GetProjectUseCase';
import { CreateProjectDto } from '../dto/CreateProject.dto';

@Injectable()
export class ProjectGqlService
  implements CreateProjectUseCase, UpdateProjectUseCase, GetProjectUseCase
{
  constructor(
    private readonly projectPersistencePort: ProjectPersistencePort,
    private readonly em: EntityManager,
  ) {}

  async getProject(id: number): Promise<ProjectResponse> {
    const project = await this.projectPersistencePort.findProjectById(id);

    if (project.isNil()) {
      throw new Error('Project not found');
    }

    return ProjectResponse.fromEntity(project.unwrap());
  }

  async getUserProjects(
    userId: number,
    pageable: Pageable,
  ): Promise<PaginatedType<ProjectResponse>> {
    const [data, total] =
      await this.projectPersistencePort.findProjectsByUserId(userId, pageable);

    return {
      items: data.map(ProjectResponse.fromEntity),
      total,
      hasNext: pageable.size + pageable.skip < total,
    };
  }

  async createProject(projectDto: CreateProjectDto): Promise<ProjectResponse> {
    const project = await Project.fromDto({
      creatorId: projectDto.creatorId,
      title: projectDto.title,
      description: projectDto.description,
    });

    const saved = await this.projectPersistencePort.save(project);

    return ProjectResponse.fromEntity(saved);
  }

  async updateProject(
    creatorId: number,
    projectId: number,
    projectInput: CreateProjectInput,
  ): Promise<ProjectResponse> {
    const nilProject = await this.projectPersistencePort.findById(projectId);

    if (nilProject.isNil()) {
      throw new GraphQLNotFoundError();
    }
    const project = nilProject.unwrap();

    await project.update({
      creatorId,
      title: projectInput.title,
      description: projectInput.description,
    });

    await this.projectPersistencePort.save(project);

    return ProjectResponse.fromEntity(project);
  }

  async deleteProject({
    userId,
    projectId,
  }: {
    userId: number;
    projectId: number;
  }): Promise<boolean> {
    const nilProject =
      await this.projectPersistencePort.findOneByIdWithSlidesAndImages(
        projectId,
      );

    if (nilProject.isNil()) {
      return false;
    }

    const project = nilProject.unwrap();

    await project.validateCreator(userId);

    const slidesForDelete = await project.slides;
    const imagesForDelete = await Promise.all(
      slidesForDelete.map((s) => s.images),
    );
    const imagesForDeleteFlat = imagesForDelete.flat();
    await this.em.transaction(async (manager) => {
      if (imagesForDeleteFlat.length > 0) {
        await manager.remove(imagesForDeleteFlat);
      }
      if (slidesForDelete.length > 0) {
        await manager.remove(slidesForDelete);
      }
      await manager.remove(project);
    });

    return true;
  }
}
