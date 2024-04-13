import { DataSource, In, Repository } from 'typeorm';
import { Project } from '../domain/project/Project.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/User.entity';
import { Slide } from '../domain/project/Slide.entity';
import { Nil } from '../../../common/nil/Nil';

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

  async findByIdWithCreatorAndSlides(id: number): Promise<Nil<Project>> {
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

  async findAllByCreatorId(userId: number): Promise<Project[]> {
    return this.find({
      where: {
        creator: {
          id: userId,
        },
      },
      relations: {
        creator: true,
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
}
