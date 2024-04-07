import { Injectable } from '@nestjs/common';
import { SlideRepository } from '../../core/entity/repository/Slide.repository';
import { SlideModel } from './model/Slide.model';

@Injectable()
export class SlideGqlService {
  constructor(private readonly slideRepository: SlideRepository) {}

  async getSlide(id: number) {
    const slide = await this.slideRepository.findById(id);

    if (slide.isNil()) {
      throw new Error('Slide not found');
    }

    return SlideModel.fromEntity(slide.unwrap());
  }
}
