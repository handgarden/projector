import { DataSource, In, LessThan, Repository } from 'typeorm';
import { Project } from '../domain/project/Project.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/user/User.entity';
import { Slide } from '../domain/project/Slide.entity';
import { Nil } from '../../../common/nil/Nil';
import { PageableType } from '../../../common/page/Pageable';
import { ScrollableType } from '../../../common/page/InfiniteScrollableType';

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

  async findAllByCreatorIdScrollable(
    userId: number,
    scrollable: ScrollableType<string>,
  ): Promise<[Project[], number]> {
    return this.findAndCount({
      where: {
        creator: {
          id: userId,
        },
        id: scrollable.lastKey
          ? LessThan(parseInt(scrollable.lastKey, 10))
          : undefined,
      },
      relations: {
        creator: true,
      },
      take: scrollable.size,
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

  async findSlidesByIds(ids: number[]): Promise<[number, Slide[]][]> {
    const projects = await this.find({
      select: {
        id: true,
        slides: true,
      },
      where: {
        id: In(ids),
      },
      relations: {
        slides: true,
      },
    });

    return Promise.all(
      projects.map(async (project) => [project.id, await project.slides]),
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
