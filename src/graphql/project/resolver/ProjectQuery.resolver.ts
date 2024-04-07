import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserModel } from '../../user/model/User.model';
import { SlideModel } from '../model/Slide.model';
import { ProjectModel } from '../model/Project.model';
import { ProjectLoader } from '../loader/ProjectLoader';
import { ProjectGqlService } from '../ProjectGql.service';

@Resolver(() => ProjectModel)
export class ProjectQueryResolver {
  constructor(
    private readonly projectService: ProjectGqlService,
    private readonly projectLoader: ProjectLoader,
  ) {}

  @Query(() => ProjectModel)
  project(@Args('id', { type: () => Number }) id: number) {
    return this.projectService.getProject(id);
  }

  @ResolveField(() => UserModel)
  creator(@Root() project: ProjectModel) {
    return this.projectLoader.loadUserById.load(project.id);
  }

  @ResolveField(() => [SlideModel])
  slides(@Root() project: ProjectModel) {
    return this.projectLoader.loadSlidesById.load(project.id);
  }
}
