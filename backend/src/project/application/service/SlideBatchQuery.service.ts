import { Injectable } from '@nestjs/common';
import { SlideBatchQueryUseCase } from '../ports/in/SlideBatchQueryUseCase';
import { SlideDto } from '../dto/Slide.dto';
import { SlideBatchLoadPort } from '../ports/out/SlideBatchLoadPort';

@Injectable()
export class SlideBatchQueryService implements SlideBatchQueryUseCase {
  constructor(private readonly slideBatchLoadPort: SlideBatchLoadPort) {}

  async loadSlidesByProjectId(projectId: number): Promise<SlideDto[]> {
    const slides =
      await this.slideBatchLoadPort.loadSlidesByProjectId.load(projectId);
    return slides.map(SlideDto.fromEntity);
  }
}
