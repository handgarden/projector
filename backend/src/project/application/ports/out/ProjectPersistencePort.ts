import { Nil } from '../../../../common/nil/Nil';
import { Pageable } from '../../../../common/page/Pageable';
import { Project } from '../../../domain/Project.entity';

export interface ProjectPersistencePort {
  findProjectById(id: number): Promise<Nil<Project>>;
  findProjects(pageable: Pageable): void;
  findProjectsByUserId(
    userId: number,
    pageable: Pageable,
  ): Promise<[Project[], number]>;
  saveProject(): void;
}

export const ProjectPersistencePort = Symbol('ProjectPersistencePort');
