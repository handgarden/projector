import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectModel } from '../model/Project.model';
import { CreateProjectInput } from '../input/CreateProject.input';
import { ProjectGqlService } from '../ProjectGql.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { ParseIntPipe } from '@nestjs/common';
@GqlAuth()
@Resolver(() => ProjectModel)
export class ProjectMutationResolver {
  constructor(private readonly projectGqlService: ProjectGqlService) {}

  @Mutation(() => ProjectModel)
  createProject(
    @GqlUser() user: TokenUser,
    @Args('project', { type: () => CreateProjectInput })
    project: CreateProjectInput,
  ) {
    return this.projectGqlService.createProject(user.id, project);
  }

  @Mutation(() => ProjectModel)
  updateProject(
    @GqlUser() user: TokenUser,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('project', { type: () => CreateProjectInput })
    project: CreateProjectInput,
  ) {
    return this.projectGqlService.updateProject(user.id, id, project);
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @GqlUser() user: TokenUser,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ) {
    return await this.projectGqlService.deleteProject({
      userId: user.id,
      projectId: id,
    });
  }
}
