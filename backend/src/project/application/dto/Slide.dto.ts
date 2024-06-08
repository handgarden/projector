import { LocalDateTime } from '@js-joda/core';
import { Slide } from '../../domain/Slide.entity';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

export class SlideDto {
  id: number;
  title: string;
  description: string;
  seq: number;
  createdAt: LocalDateTime;
  updatedAt: LocalDateTime;

  static fromEntity(slide: Slide): SlideDto {
    const dto = new SlideDto();
    dto.id = slide.id;
    dto.title = slide.title;
    dto.description = slide.description;
    dto.seq = slide.seq;
    dto.createdAt = DateTimeUtils.toLocalDateTime(slide.createdAt);
    dto.updatedAt = DateTimeUtils.toLocalDateTime(slide.updatedAt);
    return dto;
  }
}
