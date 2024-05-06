import { Args, ID, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserModel } from '../../user/model/User.model';
import { SlideModel } from '../model/Slide.model';
import { ProjectModel } from '../model/Project.model';
import { ProjectLoader } from '../loader/ProjectLoader';
import { ProjectGqlService } from '../ProjectGql.service';
import { ParseIntPipe } from '@nestjs/common';
import { S3Service } from '../../../lib/s3/S3.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { PaginatedProjectModel } from '../model/PaginatedProject.model';
import { PaginationInput } from '../../common/page/PaginationInput';
import { ScrollableInput } from '../../common/page/ScrollableInput';

@Resolver(() => ProjectModel)
export class ProjectQueryResolver {
  constructor(
    private readonly projectService: ProjectGqlService,
    private readonly projectLoader: ProjectLoader,
    private readonly s3Service: S3Service,
  ) {}

  @Query(() => ProjectModel)
  project(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.projectService.getProject(id);
  }

  @GqlAuth()
  @Query(() => PaginatedProjectModel)
  async projectsPageable(
    @GqlUser() user: TokenUser,
    @Args('pagination', { nullable: true })
    pagination: PaginationInput,
  ) {
    const { items, total } = await this.projectService.getProjectsPagable(
      user.id,
      pagination,
    );

    const response = new PaginatedProjectModel();
    response.items = items;
    response.total = total;
    response.hasNext = !!items.length;
    return response;
  }

  @GqlAuth()
  @Query(() => PaginatedProjectModel)
  async projectsScrollable(
    @GqlUser() user: TokenUser,
    @Args('scrollable', { nullable: true })
    scrollable: ScrollableInput,
  ) {
    const { items, total } = await this.projectService.getProjectsScrollable(
      user.id,
      scrollable,
    );

    const response = new PaginatedProjectModel();
    response.items = items;
    response.total = total;
    response.hasNext = !!items.length;
    return response;
  }

  @ResolveField(() => UserModel)
  creator(@Root() project: ProjectModel) {
    return this.projectLoader.loadUserById.load(project.id);
  }

  @ResolveField(() => [SlideModel])
  slides(@Root() project: ProjectModel) {
    return this.projectLoader.loadSlidesById.load(project.id);
  }

  @ResolveField(() => String, { nullable: true })
  async thumbnail(@Root() project: ProjectModel) {
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
