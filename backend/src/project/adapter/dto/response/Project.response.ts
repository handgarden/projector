import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseTimeResponse } from '../../../../graphql/common/BaseTimeResponse';
import { ProjectDto } from '../../../application/dto/Project.dto';
import { Project } from '../../../domain/Project.entity';

@ObjectType(Project.name)
export class ProjectResponse extends BaseTimeResponse {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  creatorId: number;

  static fromDto(project: ProjectDto): ProjectResponse {
    const model = new ProjectResponse();
    model.id = project.id.toString();
    model.title = project.title;
    model.description = project.description;
    model.createdAt = project.createdAt;
    model.updatedAt = project.updatedAt;
    model.creatorId = project.creatorId;
    return model;
  }
}
