import { SlideImage } from '../../domain/SlideImage.entity';

export class SlideImageDto {
  id: number;
  seq: number;
  imageKey: string;

  static fromEntity(slideImage: SlideImage) {
    const slideImageDto = new SlideImageDto();
    slideImageDto.id = slideImage.slideId;
    slideImageDto.seq = slideImage.seq;
    slideImageDto.imageKey = slideImage.fileId;
    return slideImageDto;
  }
}
