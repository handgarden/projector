import { DataSource, In, Repository } from 'typeorm';
import { Project } from '../domain/project/Project.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/user/User.entity';
import { Nil } from '../../../common/nil/Nil';
import { PageableType } from '../../../common/page/Pageable';

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(dataSource: DataSource) {
    super(Project, dataSource.manager);
  }

  async findById(id: number): Promise<Nil<Project>> {
    const project = await this.findOne({
      where: {
        id,
      },
    });

    return Nil.of(project);
  }

  async findOneByIdWithCreatorAndSlides(id: number): Promise<Nil<Project>> {
    const project = await this.findOne({
      where: {
        id,
      },
      relations: {
        creator: true,
        slides: true,
      },
    });

    return Nil.of(project);
  }

  async findAllByCreatorIdPageable(
    userId: number,
    pageable: PageableType,
  ): Promise<[Project[], number]> {
    return this.findAndCount({
      where: {
        creator: {
          id: userId,
        },
      },
      relations: {
        creator: true,
      },
      skip: pageable.skip,
      take: pageable.size,
      order: {
        id: 'DESC',
      },
    });
  }

  async findCreatorByIds(ids: number[]): Promise<[number, User][]> {
    const projects = await this.find({
      select: {
        id: true,
        creator: true,
      },
      where: {
        id: In(ids),
      },
      relations: {
        creator: true,
      },
    });

    return Promise.all(
      projects.map(async (project) => [project.id, await project.creator]),
    );
  }

  async findOneByIdWithSlidesAndImages(id: number): Promise<Nil<Project>> {
    const project = await this.findOne({
      where: {
        id: id,
      },
      relations: {
        creator: true,
        slides: {
          images: true,
        },
      },
    });

    return Nil.of(project);
  }
}
