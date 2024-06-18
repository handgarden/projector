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
  findProjectsByIds(ids: number[]): Promise<Project[]>;
  findAggregatedProjectById(id: number): Promise<Nil<Project>>;
  saveProject(project: Project): Promise<Project>;
}

export const ProjectPersistencePort = Symbol('ProjectPersistencePort');
