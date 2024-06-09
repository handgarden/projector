import { LocalDateTime } from '@js-joda/core';
import { Project } from '../../domain/Project.entity';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

export class ProjectDto {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  createdAt: LocalDateTime;
  updatedAt: LocalDateTime;

  static fromEntity(project: Project): ProjectDto {
    const dto = new ProjectDto();
    dto.id = project.id;
    dto.title = project.title;
    dto.description = project.description;
    dto.creatorId = project.creatorId;
    dto.createdAt = DateTimeUtils.toLocalDateTime(project.createdAt);
    dto.updatedAt = DateTimeUtils.toLocalDateTime(project.updatedAt);
    return dto;
  }
}
