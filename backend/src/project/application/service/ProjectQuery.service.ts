import { Injectable } from '@nestjs/common';
import { Pageable } from '../../../common/page/Pageable';
import { PaginatedType } from '../../../common/page/Paginated';
import { ProjectPersistencePort } from '../port/out/ProjectPersistencePort';
import { ProjectDto } from '../dto/Project.dto';
import { ProjectQueryUseCase } from '../port/in/ProjectQueryUseCase';

@Injectable()
export class ProjectQueryService implements ProjectQueryUseCase {
  constructor(
    private readonly projectPersistencePort: ProjectPersistencePort,
  ) {}

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
}
