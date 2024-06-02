import { Pageable } from '../../../../common/page/Pageable';

export interface QueryProjectUseCase {
  getProject(id: number): void;
  getUserProjects(userId: number, pageable: Pageable): void;
}

export const QueryProjectUseCase = Symbol('QueryProjectUseCase');
