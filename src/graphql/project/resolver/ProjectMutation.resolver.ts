import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectResponse } from '../response/Project.response';
import { CreateProjectInput } from '../input/CreateProject.input';
import { ProjectGqlService } from '../ProjectGql.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { ParseIntPipe } from '@nestjs/common';
@GqlAuth()
@Resolver(() => ProjectResponse)
export class ProjectMutationResolver {
  constructor(private readonly projectGqlService: ProjectGqlService) {}

  @Mutation(() => ProjectResponse)
  async createProject(
    @GqlUser() user: TokenUser,
    @Args('project', { type: () => CreateProjectInput })
    project: CreateProjectInput,
  ): Promise<ProjectResponse> {
    return this.projectGqlService.createProject(user.id, project);
  }

  @Mutation(() => ProjectResponse)
  updateProject(
    @GqlUser() user: TokenUser,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('project', { type: () => CreateProjectInput })
    project: CreateProjectInput,
  ): Promise<ProjectResponse> {
    return this.projectGqlService.updateProject(user.id, id, project);
  }

  @Mutation(() => Boolean)
  deleteProject(
    @GqlUser() user: TokenUser,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.projectGqlService.deleteProject({
      userId: user.id,
      projectId: id,
    });
  }
}
