import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { ProjectModel } from './model/Project.model';
import { CreateProjectInput } from './input/CreateProject.input';
import { Project } from '../../core/entity/domain/project/Project.entity';
import { GraphQLNotFoundError } from '../common/exception/GraphQLNotFoundError';

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

  async getProjects(creatorId: number) {
    const projects = await this.projectRepository.findAllByCreatorId(creatorId);
    return projects.map((project) => ProjectModel.fromEntity(project));
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
}
