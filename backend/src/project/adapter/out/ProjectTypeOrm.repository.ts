import { DataSource, Repository } from 'typeorm';
import { Project } from '../../domain/Project.entity';
import { Injectable } from '@nestjs/common';
import { ProjectPersistencePort } from '../../application/ports/out/ProjectPersistencePort';

@Injectable()
export class ProjectTypeORMRepository
  extends Repository<Project>
  implements ProjectPersistencePort
{
  constructor(dataSource: DataSource) {
    super(Project, dataSource.manager);
  }
  createProject(): void {
    throw new Error('Method not implemented.');
  }
  updateProject(): void {
    throw new Error('Method not implemented.');
  }
  addSlide(): void {
    throw new Error('Method not implemented.');
  }
  updateSlide(): void {
    throw new Error('Method not implemented.');
  }
  removeSlide(): void {
    throw new Error('Method not implemented.');
  }
}
