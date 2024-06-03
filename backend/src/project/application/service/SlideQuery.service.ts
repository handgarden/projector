import { Injectable } from '@nestjs/common';
import { SlideDto } from '../dto/Slide.dto';
import { SlideQueryUseCase } from '../ports/in/SlideQueryUseCase';
import { SlidePersistencePort } from '../ports/out/SlidePersistencePort';
import { SlideNotFoundException } from '../exception/SlideNotFoundException';

@Injectable()
export class SlideQueryService implements SlideQueryUseCase {
  constructor(private readonly slidePersistencePort: SlidePersistencePort) {}

  async getSlide(id: number): Promise<SlideDto> {
    const slide = await this.slidePersistencePort.findSlideById(id);
    if (slide.isNil()) {
      throw new SlideNotFoundException({
        slideId: id,
      });
    }
    return SlideDto.fromEntity(slide.unwrap());
  }
}
