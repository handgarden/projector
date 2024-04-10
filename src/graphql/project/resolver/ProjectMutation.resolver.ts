import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectModel } from '../model/Project.model';
import { CreateProjectInput } from '../input/CreateProject.input';
import { ProjectGqlService } from '../ProjectGql.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';

@Resolver(() => ProjectModel)
export class ProjectMutationResolver {
  constructor(private readonly projectGqlService: ProjectGqlService) {}

  @GqlAuth()
  @Mutation(() => ProjectModel)
  createProject(
    @GqlUser() user: TokenUser,
    @Args('project', { type: () => CreateProjectInput })
    project: CreateProjectInput,
  ) {
    return this.projectGqlService.createProject(user.id, project);
  }
}
