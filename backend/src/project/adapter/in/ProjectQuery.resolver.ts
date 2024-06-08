import { Args, ID, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserResponse } from '../../../user/adapter/dto/response/User.response';
import { SlideResponse } from '../dto/response/Slide.response';
import { ProjectResponse } from '../dto/response/Project.response';
import { ParseIntPipe } from '@nestjs/common';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { PaginatedProjectResponse } from '../dto/response/PaginatedProject.response';
import { PaginationInput } from '../../../graphql/common/page/PaginationInput';
import { ProjectQueryUseCase } from '../../application/port/in/ProjectQueryUseCase';
import { UserBatchQueryUseCase } from '../../../user/application/port/in/UserBatchQueryUseCase';
import { CreatorNotFoundException } from '../../application/exception/CreatorNotFoundException';
import { SlideBatchQueryUseCase } from '../../application/port/in/SlideBatchQueryUseCase';
import { UploadFileBatchQueryUseCase } from '../../../file/application/port/in/UploadFileBatchQueryUseCase';

@Resolver(() => ProjectResponse)
export class ProjectQueryResolver {
  constructor(
    private readonly projectQueryUseCase: ProjectQueryUseCase,
    private readonly userBatchUseCase: UserBatchQueryUseCase,
    private readonly slideBatchUseCase: SlideBatchQueryUseCase,
    private readonly uploadFileBatchQueryUseCase: UploadFileBatchQueryUseCase,
  ) {}

  @Query(() => ProjectResponse)
  async project(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<ProjectResponse> {
    const project = await this.projectQueryUseCase.getProject(id);
    return ProjectResponse.fromDto(project);
  }

  @GqlAuth()
  @Query(() => PaginatedProjectResponse)
  async projects(
    @GqlUser() user: TokenUser,
    @Args('pageable', { nullable: true })
    pageable: PaginationInput,
  ): Promise<PaginatedProjectResponse> {
    const { items, total } = await this.projectQueryUseCase.getUserProjects(
      user.id,
      pageable,
    );

    const response = new PaginatedProjectResponse();
    response.items = items.map(ProjectResponse.fromDto);
    response.total = total;
    response.hasNext = !!items.length;
    return response;
  }

  @ResolveField(() => UserResponse)
  async creator(@Root() project: ProjectResponse): Promise<UserResponse> {
    const nilDto = await this.userBatchUseCase.loadUserById(project.creatorId);
    if (nilDto.isNil()) {
      throw new CreatorNotFoundException(project.creatorId);
    }
    return UserResponse.fromDto(nilDto.unwrap());
  }

  @ResolveField(() => [SlideResponse], { nullable: 'items' })
  async slides(@Root() project: ProjectResponse): Promise<SlideResponse[]> {
    const slides = await this.slideBatchUseCase.loadSlidesByProjectId(
      parseInt(project.id, 10),
    );
    return slides.map(SlideResponse.fromDto);
  }

  @ResolveField(() => String, { nullable: true })
  async thumbnail(@Root() project: ProjectResponse): Promise<string | null> {
    const thumbnailKey = await this.projectQueryUseCase.getThumbnailKey(
      parseInt(project.id),
    );
    if (thumbnailKey.isNil()) {
      return null;
    }
    const url = await this.uploadFileBatchQueryUseCase.loadUrlByKey(
      thumbnailKey.unwrap(),
    );
    return url.unwrap();
  }
}
