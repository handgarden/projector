import { Module } from '@nestjs/common';
import { SlideQueryResolver } from './resolver/SlideQuery.resolver';
// import { ProjectMutationResolver } from './resolver/ProjectMutation.resolver';
import { ProjectLoader } from './loader/ProjectLoader';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { ProjectQueryResolver } from './resolver/ProjectQuery.resolver';
import { SlideLoader } from './loader/SlideLoader';
import { SlideRepository } from '../../core/entity/repository/Slide.repository';
import { ProjectGqlService } from './ProjectGql.service';
import { SlideGqlService } from './SlideGql.service';

@Module({
  imports: [],
  providers: [
    ProjectGqlService,
    ProjectQueryResolver,
    // ProjectMutationResolver,
    ProjectLoader,
    ProjectRepository,
    SlideGqlService,
    SlideQueryResolver,
    SlideLoader,
    SlideRepository,
  ],
  exports: [],
})
export class ProjectGqlModule {}
