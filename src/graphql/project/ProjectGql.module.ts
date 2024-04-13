import { Module } from '@nestjs/common';
import { SlideQueryResolver } from './resolver/SlideQuery.resolver';
import { ProjectLoader } from './loader/ProjectLoader';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { ProjectQueryResolver } from './resolver/ProjectQuery.resolver';
import { SlideLoader } from './loader/SlideLoader';
import { SlideRepository } from '../../core/entity/repository/Slide.repository';
import { ProjectGqlService } from './ProjectGql.service';
import { SlideGqlService } from './SlideGql.service';
import { ProjectMutationResolver } from './resolver/ProjectMutation.resolver';
import { S3Module } from '../../lib/s3/S3.module';
import { SlideImageRepository } from '../../core/entity/repository/SlideImage.repository';
import { SlideMutationResolver } from './resolver/SlideMutation.resolver';

@Module({
  imports: [S3Module],
  providers: [
    ProjectGqlService,
    ProjectQueryResolver,
    ProjectMutationResolver,
    ProjectLoader,
    ProjectRepository,
    SlideGqlService,
    SlideQueryResolver,
    SlideMutationResolver,
    SlideLoader,
    SlideRepository,
    SlideImageRepository,
  ],
  exports: [],
})
export class ProjectGqlModule {}
