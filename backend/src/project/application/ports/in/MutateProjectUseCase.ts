import { CreateProjectDto } from '../../dto/CreateProject.dto';
import { CreateSlideDto } from '../../dto/CreateSlide.dto';
import { DeleteProjectDto } from '../../dto/DeleteProject.dto';
import { DeleteSlideDto } from '../../dto/DeleteSlide.dto';
import { ProjectDto } from '../../dto/Project.dto';
import { SlideDto } from '../../dto/Slide.dto';
import { UpdateProjectDto } from '../../dto/UpdateProject.dto';
import { UpdateSlideDto } from '../../dto/UpdateSlide.dto';

export interface MutateProjectUseCase {
  createProject(createDto: CreateProjectDto): Promise<ProjectDto>;
  updateProject(updateDto: UpdateProjectDto): Promise<ProjectDto>;
  deleteProject(deleteDto: DeleteProjectDto): Promise<void>;
  addSlide(createDto: CreateSlideDto): Promise<SlideDto>;
  updateSlide(updateDto: UpdateSlideDto): Promise<SlideDto>;
  deleteSlide(dto: DeleteSlideDto): Promise<void>;
}

export const MutateProjectUseCase = Symbol('MutateProjectUseCase');
