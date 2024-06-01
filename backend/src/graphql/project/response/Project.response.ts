import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from '../../../project/domain/Project.entity';
import { BaseTimeResponse } from '../../common/BaseTimeResponse';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

@ObjectType(Project.name)
export class ProjectResponse extends BaseTimeResponse {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  static fromEntity(project: Project): ProjectResponse {
    const model = new ProjectResponse();
    model.id = project.id.toString();
    model.title = project.title;
    model.description = project.description;
    model.createdAt = DateTimeUtils.toLocalDateTime(project.createdAt);
    model.updatedAt = DateTimeUtils.toLocalDateTime(project.updatedAt);
    return model;
  }
}
