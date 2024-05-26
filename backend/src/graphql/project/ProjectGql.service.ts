import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { CreateProjectInput } from './input/CreateProject.input';
import { Project } from '../../core/entity/domain/project/Project.entity';
import { GraphQLNotFoundError } from '../common/exception/GraphQLNotFoundError';
import { PageableType } from '../../common/page/Pageable';
import { ProjectResponse } from './response/Project.response';
import { PaginatedType } from '../../common/page/Paginated';

@Injectable()
export class ProjectGqlService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProject(id: number): Promise<ProjectResponse> {
    const project = await this.projectRepository.findById(id);

    if (project.isNil()) {
      throw new Error('Project not found');
    }

    return ProjectResponse.fromEntity(project.unwrap());
  }

  async getProjectsPageable(
    creatorId: number,
    pageable: PageableType,
  ): Promise<PaginatedType<ProjectResponse>> {
    const [data, total] =
      await this.projectRepository.findAllByCreatorIdPageable(
        creatorId,
        pageable,
      );

    return {
      items: data.map(ProjectResponse.fromEntity),
      total,
      hasNext: pageable.size + pageable.skip < total,
    };
  }

  async createProject(
    userId: number,
    projectInput: CreateProjectInput,
  ): Promise<ProjectResponse> {
    const project = await Project.create({
      creatorId: userId,
      title: projectInput.title,
      description: projectInput.description,
    });

    const saved = await this.projectRepository.save(project);

    return ProjectResponse.fromEntity(saved);
  }

  async updateProject(
    creatorId: number,
    projectId: number,
    projectInput: CreateProjectInput,
  ): Promise<ProjectResponse> {
    const nilProject = await this.projectRepository.findById(projectId);

    if (nilProject.isNil()) {
      throw new GraphQLNotFoundError();
    }
    const project = nilProject.unwrap();

    await project.update({
      creatorId,
      title: projectInput.title,
      description: projectInput.description,
    });

    await this.projectRepository.save(project);

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
      await this.projectRepository.findOneByIdWithSlidesAndImages(projectId);

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
    await this.projectRepository.manager.transaction(async (manager) => {
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
