import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectModel } from '../model/Project.model';
import { CreateProjectInput } from '../input/CreateProject.input';
import { ProjectGqlService } from '../ProjectGql.service';

@Resolver(() => ProjectModel)
export class ProjectMutationResolver {
  constructor(private readonly projectGqlService: ProjectGqlService) {}

  @Mutation(() => ProjectModel)
  createProject(
    @Args('project')
    project: CreateProjectInput,
  ) {
    return this.projectGqlService.createProject(project);
  }
}
