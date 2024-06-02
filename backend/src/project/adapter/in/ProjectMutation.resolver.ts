import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectResponse } from '../dto/response/Project.response';
import { CreateProjectInput } from '../dto/input/CreateProject.input';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { ParseIntPipe } from '@nestjs/common';
import { MutateProjectUseCase } from '../../application/ports/in/MutateProjectUseCase';
import { UpdateProjectInput } from '../dto/input/UpdateProject.input';
import { DeleteProjectDto } from '../../application/dto/DeleteProject.dto';

@GqlAuth()
@Resolver(() => ProjectResponse)
export class ProjectMutationResolver {
  constructor(private readonly mutateProjectUseCase: MutateProjectUseCase) {}

  @Mutation(() => ProjectResponse)
  async createProject(
    @GqlUser() user: TokenUser,
    @Args('project', { type: () => CreateProjectInput })
    project: CreateProjectInput,
  ): Promise<ProjectResponse> {
    const created = await this.mutateProjectUseCase.createProject(
      project.toDto(user.id),
    );
    return ProjectResponse.fromDto(created);
  }

  @Mutation(() => ProjectResponse)
  async updateProject(
    @GqlUser() user: TokenUser,
    @Args('project', { type: () => UpdateProjectInput })
    project: UpdateProjectInput,
  ): Promise<ProjectResponse> {
    const updated = await this.mutateProjectUseCase.updateProject(
      project.toDto(user.id),
    );
    return ProjectResponse.fromDto(updated);
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @GqlUser() user: TokenUser,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    const deleteDto = new DeleteProjectDto();
    deleteDto.id = id;
    deleteDto.creatorId = user.id;

    await this.mutateProjectUseCase.deleteProject(deleteDto);

    return true;
  }
}
