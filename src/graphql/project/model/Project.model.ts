import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from '../../../core/entity/domain/project/Project.entity';
import { BaseTimeModel } from '../../common/BaseTimeModel';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

@ObjectType(Project.name)
export class ProjectModel extends BaseTimeModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  static fromEntity(project: Project): ProjectModel {
    const model = new ProjectModel();
    model.id = project.id.toString();
    model.title = project.title;
    model.createdAt = DateTimeUtils.toLocalDateTime(project.createdAt);
    model.updatedAt = DateTimeUtils.toLocalDateTime(project.updatedAt);
    return model;
  }
}
