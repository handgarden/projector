import { Injectable } from '@nestjs/common';
import { SlideRepository } from '../../../core/entity/repository/Slide.repository';
import { ProjectRepository } from '../../../core/entity/repository/Project.repository';
import { UploadFile } from '../../../core/entity/domain/UploadFile.entity';
import { SlideImage } from '../../domain/SlideImage.entity';
import { GraphQLNotFoundError } from '../../../graphql/common/exception/GraphQLNotFoundError';
import { SlideImageInput } from '../../adapter/dto/input/CreateSlideImage.input';
import { SlideResponse } from '../../adapter/dto/response/Slide.response';

@Injectable()
export class SlideGqlService {
  constructor(
    private readonly slideRepository: SlideRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async getSlide({
    slideId,
    userId,
  }: {
    slideId: number;
    userId: number;
  }): Promise<SlideResponse> {
    const nilSlide = await this.slideRepository.findById(slideId);

    if (nilSlide.isNil()) {
      throw new GraphQLNotFoundError();
    }

    const slide = nilSlide.unwrap();

    slide.validateCreator(userId);

    return SlideResponse.fromEntity(slide);
  }

  private convertSlideImageInputToEntity(image: SlideImageInput): SlideImage {
    const file = new UploadFile();
    file.key = image.key;
    const slideImage = new SlideImage();
    slideImage.file = Promise.resolve(file);
    slideImage.fileId = file.key;
    slideImage.seq = image.seq;
    return slideImage;
  }
}
