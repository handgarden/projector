import { Pageable } from '../../../../common/page/Pageable';
import { PaginatedType } from '../../../../common/page/Paginated';
import { ProjectDto } from '../../dto/Project.dto';

export interface ProjectQueryUseCase {
  getProject(id: number): Promise<ProjectDto>;
  getUserProjects(
    userId: number,
    pageable: Pageable,
  ): Promise<PaginatedType<ProjectDto>>;
}

export const ProjectQueryUseCase = Symbol('ProjectQueryUseCase');
