import { DataSource, In, Repository } from 'typeorm';
import { Project } from '../../domain/Project.entity';
import { Injectable } from '@nestjs/common';
import { ProjectPersistencePort } from '../../application/ports/out/ProjectPersistencePort';
import { Nil } from '../../../common/nil/Nil';
import { Pageable } from '../../../common/page/Pageable';

@Injectable()
export class ProjectTypeORMRepository
  extends Repository<Project>
  implements ProjectPersistencePort
{
  constructor(dataSource: DataSource) {
    super(Project, dataSource.manager);
  }

  async findProjectById(id: number): Promise<Nil<Project>> {
    const findProject = await this.findOne({
      where: {
        id,
      },
    });
    return Nil.of(findProject);
  }

  findProjects(pageable: Pageable): Promise<[Project[], number]> {
    return this.findAndCount({
      take: pageable.size,
      skip: pageable.skip,
    });
  }

  findProjectsByUserId(
    userId: number,
    pageable: Pageable,
  ): Promise<[Project[], number]> {
    return this.findAndCount({
      where: {
        creator: {
          id: userId,
        },
      },
      take: pageable.size,
      skip: pageable.skip,
    });
  }

  findProjectsByIds(ids: number[]): Promise<Project[]> {
    return this.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findAggregatedProjectById(id: number): Promise<Nil<Project>> {
    const findProject = await this.findOne({
      where: {
        id,
      },
      relations: {
        creator: true,
        slides: {
          images: {
            file: true,
          },
        },
      },
    });
    return Nil.of(findProject);
  }
  async saveAggregateProject(project: Project): Promise<Project> {
    return this.save(project);
  }

  async removeAggregateProject(project: Project): Promise<boolean> {
    await this.remove(project);
    return true;
  }
}
