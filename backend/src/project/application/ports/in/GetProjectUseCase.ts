import { Pageable } from '../../../../common/page/Pageable';

export interface GetProjectUseCase {
  getProject(id: number): void;
  getUserProjects(userId: number, pageable: Pageable): void;
}

export const GetProjectUseCase = Symbol('GetProjectUseCase');
