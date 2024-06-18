import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectResponse } from '../dto/response/Project.response';
import { CreateProjectInput } from '../dto/input/CreateProject.input';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { ProjectMutateUseCase } from '../../application/port/in/ProjectMutateUseCase';
import { UpdateProjectInput } from '../dto/input/UpdateProject.input';
import { DeleteProjectDto } from '../../application/dto/DeleteProject.dto';

@GqlAuth()
@Resolver(() => ProjectResponse)
export class ProjectMutationResolver {
  constructor(
    @Inject(ProjectMutateUseCase)
    private readonly mutateProjectUseCase: ProjectMutateUseCase,
  ) {}

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
