import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { ProjectModel } from './model/Project.model';
import { CreateProjectInput } from './input/CreateProject.input';
import { Project } from '../../core/entity/domain/project/Project.entity';
import { Slide } from '../../core/entity/domain/project/Slide.entity';
import { CreateSlideInput } from './input/CreateSlide.input';
import { UploadFile } from '../../core/entity/domain/UploadFile.entity';
import { SlideImage } from '../../core/entity/domain/project/SlideImage.entity';
import { User } from '../../core/entity/domain/User.entity';

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

  async createProject(userId: number, projectInput: CreateProjectInput) {
    const project = await Project.create({
      creatorId: userId,
      title: projectInput.title,
      description: projectInput.description,
    });

    const saved = await this.projectRepository.save(project);

    return ProjectModel.fromEntity(saved);
  }

  private async handleSlides(
    project: Project,
    slideInputs: CreateSlideInput[],
  ) {
    const slides = slideInputs.map((slideInput) =>
      this.handleSlide(slideInput),
    );
    await project.addSlides(await Promise.all(slides));
  }

  private async handleSlide(slideInput: CreateSlideInput) {
    const slideEntity = new Slide();
    slideEntity.title = slideInput.title;
    slideEntity.description = slideInput.description;
    slideEntity.seq = slideInput.seq;
    await this.handleImageKeys(slideEntity, slideInput.imageKeys);
    return slideEntity;
  }

  private async handleImageKeys(slide: Slide, imageKeys: string[]) {
    const images = imageKeys.map((imageKey) =>
      this.handleImageKey(slide, imageKey),
    );
    await slide.addImages(await Promise.all(images));
  }

  private async handleImageKey(slide: Slide, imageKey: string) {
    const uploadFile = new UploadFile();
    uploadFile.key = imageKey;
    const slideImage = new SlideImage();
    slideImage.file = Promise.resolve(uploadFile);
    slideImage.slide = Promise.resolve(slide);
    return slideImage;
  }

  private handleUser(project: Project, userId: number) {
    const user = new User();
    user.id = userId;
    project.creator = Promise.resolve(user);
  }
}
