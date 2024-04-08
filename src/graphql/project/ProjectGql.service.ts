import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { ProjectModel } from './model/Project.model';
import { CreateProjectInput } from './input/CreateProject.input';
import { Project } from '../../core/entity/domain/project/Project.entity';
import { Slide } from '../../core/entity/domain/project/Slide.entity';
import { CreateSlideInput } from './input/CreateSlide.input';
import { UploadFile } from '../../core/entity/domain/UploadFile.entity';
import { SlideImage } from '../../core/entity/domain/project/SlideImage.entity';

@Injectable()
export class ProjectGqlService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProject(id: number) {
    const project = await this.projectRepository.findById(id);

    if (project.isNil()) {
      throw new Error('Project not found');
    }

    const model = ProjectModel.fromEntity(project.unwrap());

    return model;
  }

  async createProject(projectInput: CreateProjectInput) {
    const project = new Project();
    project.title = projectInput.title;
    project.slides = Promise.all(
      projectInput.slides.map((slideInput) =>
        this.convertSlideToEntity(slideInput),
      ),
    );
    const saved = await this.projectRepository.save(project);
    return ProjectModel.fromEntity(saved);
  }

  private async convertSlideToEntity(slideInput: CreateSlideInput) {
    const slideEntity = new Slide();
    slideEntity.title = slideInput.title;
    slideEntity.description = slideInput.description;
    slideEntity.seq = slideInput.seq;
    slideEntity.images = Promise.all(
      slideInput.imageKeys.map((imageKey) => {
        return this.convertImageKeyToEntity(slideEntity, imageKey);
      }),
    );
    return slideEntity;
  }

  private async convertImageKeyToEntity(slide: Slide, imageKey: string) {
    const uploadFile = new UploadFile();
    uploadFile.key = imageKey;
    const slideImage = new SlideImage();
    slideImage.file = Promise.resolve(uploadFile);
    slideImage.slide = Promise.resolve(slide);
    return slideImage;
  }
}
