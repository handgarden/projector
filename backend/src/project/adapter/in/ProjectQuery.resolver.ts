import { Args, ID, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserResponse } from '../../../graphql/user/response/User.response';
import { SlideResponse } from '../dto/response/Slide.response';
import { ProjectResponse } from '../dto/response/Project.response';
import { ProjectLoader } from '../../../graphql/project/loader/Project.loader';
import { ProjectQueryService } from '../../application/service/ProjectQuery.service';
import { ParseIntPipe } from '@nestjs/common';
import { S3Service } from '../../../lib/s3/S3.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { PaginatedProjectResponse } from '../dto/response/PaginatedProject.response';
import { PaginationInput } from '../../../graphql/common/page/PaginationInput';
import { UserLoader } from '../../../graphql/user/loader/User.loader';
import { SlideLoader } from '../../../graphql/project/loader/Slide.loader';

@Resolver(() => ProjectResponse)
export class ProjectQueryResolver {
  constructor(
    private readonly projectService: ProjectQueryService,
    private readonly projectLoader: ProjectLoader,
    private readonly s3Service: S3Service,
    private readonly userLoader: UserLoader,
    private readonly slideLoader: SlideLoader,
  ) {}

  @Query(() => ProjectResponse)
  project(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<ProjectResponse> {
    return this.projectService.getProject(id);
  }

  @GqlAuth()
  @Query(() => PaginatedProjectResponse)
  async projectsPageable(
    @GqlUser() user: TokenUser,
    @Args('pageable', { nullable: true })
    pageable: PaginationInput,
  ): Promise<PaginatedProjectResponse> {
    const { items, total } = await this.projectService.getUserProjects(
      user.id,
      pageable,
    );

    const response = new PaginatedProjectResponse();
    response.items = items;
    response.total = total;
    response.hasNext = !!items.length;
    return response;
  }

  @ResolveField(() => UserResponse)
  creator(@Root() project: ProjectResponse): Promise<UserResponse> {
    return this.userLoader.loadCreatorsByProjectIds.load(project.id);
  }

  @ResolveField(() => [SlideResponse], { nullable: 'items' })
  slides(@Root() project: ProjectResponse): Promise<SlideResponse[]> {
    return this.slideLoader.loadSlidesById.load(project.id);
  }

  @ResolveField(() => String, { nullable: true })
  async thumbnail(@Root() project: ProjectResponse): Promise<string | null> {
    const thumbnailKey = await this.projectLoader.loadThumbnailKeysById.load(
      project.id,
    );
    if (thumbnailKey.isNil()) {
      return null;
    }
    const url = this.s3Service.getPresignedUrl(thumbnailKey.unwrap());
    return url;
  }
}
