import { SlideImage } from '../../domain/SlideImage.entity';

export class SlideImageDto {
  id: number;
  seq: number;
  imageKey: string;

  static async fromEntity(slideImage: SlideImage) {
    const slideImageDto = new SlideImageDto();
    slideImageDto.id = (await slideImage.slide).id;
    slideImageDto.seq = slideImage.seq;
    slideImageDto.imageKey = slideImage.fileId;
    return slideImageDto;
  }
}
