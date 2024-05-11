import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { ProjectModel } from './model/Project.model';
import { CreateProjectInput } from './input/CreateProject.input';
import { Project } from '../../core/entity/domain/project/Project.entity';
import { GraphQLNotFoundError } from '../common/exception/GraphQLNotFoundError';
import { PageableType } from '../../common/page/Pageable';

@Injectable()
export class ProjectGqlService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProject(id: number) {
    const project = await this.projectRepository.findById(id);

    if (project.isNil()) {
      throw new Error('Project not found');
    }

    const model = ProjectModel.fromEntity(project.unwrap());

    return model;
  }

  async getProjectsPagable(creatorId: number, pageable: PageableType) {
    const [data, total] =
      await this.projectRepository.findAllByCreatorIdPageable(
        creatorId,
        pageable,
      );

    return {
      items: data.map(ProjectModel.fromEntity),
      total,
    };
  }

  async createProject(userId: number, projectInput: CreateProjectInput) {
    const project = await Project.create({
      creatorId: userId,
      title: projectInput.title,
      description: projectInput.description,
    });

    const saved = await this.projectRepository.save(project);

    return ProjectModel.fromEntity(saved);
  }

  async updateProject(
    creatorId: number,
    projectId: number,
    projectInput: CreateProjectInput,
  ) {
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

    return ProjectModel.fromEntity(project);
  }

  async deleteProject({
    userId,
    projectId,
  }: {
    userId: number;
    projectId: number;
  }) {
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
