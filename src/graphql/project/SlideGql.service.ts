import { Injectable } from '@nestjs/common';
import { SlideRepository } from '../../core/entity/repository/Slide.repository';
import { SlideModel } from './model/Slide.model';
import { Slide } from '../../core/entity/domain/project/Slide.entity';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { ValidationError } from 'class-validator';
import { CreateSlideInput } from './input/CreateSlide.input';
import { UploadFile } from '../../core/entity/domain/UploadFile.entity';
import { SlideImage } from '../../core/entity/domain/project/SlideImage.entity';
import { SlideImageRepository } from '../../core/entity/repository/SlideImage.repository';

@Injectable()
export class SlideGqlService {
  constructor(
    private readonly slideRepository: SlideRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly slideImageRepository: SlideImageRepository,
  ) {}

  async getSlide(id: number) {
    const slide = await this.slideRepository.findById(id);

    if (slide.isNil()) {
      throw new Error('Slide not found');
    }

    return SlideModel.fromEntity(slide.unwrap());
  }

  async createSlide({
    userId,
    slideInput,
  }: {
    userId: number;
    slideInput: CreateSlideInput;
  }) {
    const nilProject = await this.projectRepository.findById(
      slideInput.projectId,
    );

    if (nilProject.isNil()) {
      const err = new ValidationError();
      err.constraints = {
        projectId: 'Project not found',
      };
      throw err;
    }
    const project = nilProject.unwrap();

    const slide = await Slide.create({
      seq: slideInput.seq,
      title: slideInput.title,
      description: slideInput.description,
    });

    const saved = await this.slideRepository.manager.transaction(
      async (manager) => {
        await project.addSlide(userId, slide);

        const saved = await manager.save(slide);

        const slideImages = slideInput.images.map((i) => {
          const file = new UploadFile();
          file.key = i.key;
          const slideImage = new SlideImage();
          slideImage.file = Promise.resolve(file);
          slideImage.fileId = file.key;
          slideImage.seq = i.seq;
          return slideImage;
        });

        await saved.addImages(slideImages);

        await manager.save(slideImages);

        return saved;
      },
    );

    return SlideModel.fromEntity(saved);
  }
}
