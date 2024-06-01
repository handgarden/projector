import { CreateProjectDto } from '../../dto/CreateProject.dto';

export interface CreateProjectUseCase {
  createProject(dto: CreateProjectDto): void;
}

export const CreateProjectUseCase = Symbol('CreateProjectUseCase');
