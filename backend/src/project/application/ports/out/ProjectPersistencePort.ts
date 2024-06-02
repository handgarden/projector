import { Nil } from '../../../../common/nil/Nil';
import { Pageable } from '../../../../common/page/Pageable';
import { Project } from '../../../domain/Project.entity';

export interface ProjectPersistencePort {
  findProjectById(id: number): Promise<Nil<Project>>;
  findProjects(pageable: Pageable): Promise<[Project[], number]>;
  findProjectsByUserId(
    userId: number,
    pageable: Pageable,
  ): Promise<[Project[], number]>;
  findAggregatedProjectById(id: number): Promise<Nil<Project>>;
  saveAggregateProject(project: Project): Promise<Project>;
  removeAggregateProject(project: Project): Promise<boolean>;
}

export const ProjectPersistencePort = Symbol('ProjectPersistencePort');
