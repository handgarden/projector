import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from '../../../core/entity/domain/project/Project.entity';

@ObjectType(Project.name)
export class ProjectModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  static fromEntity(project: Project): ProjectModel {
    const model = new ProjectModel();
    model.id = project.id.toString();
    model.title = project.title;
    return model;
  }
}
