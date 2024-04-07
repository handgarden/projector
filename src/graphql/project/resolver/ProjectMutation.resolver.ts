import { Args, Resolver } from '@nestjs/graphql';
import { ProjectModel } from '../model/Project.model';
import { CreateProjectInput } from '../input/CreateProject.input';

@Resolver(() => ProjectModel)
export class ProjectMutationResolver {
  create(
    @Args('project', { type: () => CreateProjectInput })
    project: CreateProjectInput,
  ) {
    console.log(project);
  }
}
