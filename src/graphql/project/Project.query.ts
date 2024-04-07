import { ResolveField, Resolver } from '@nestjs/graphql';
import { Project } from '../../core/entity/domain/project/Project.entity';
import { UserModel } from '../user/User.model';
import { SlideModel } from './Slide.model';

@Resolver(() => Project)
export class ProjectQueryResolver {
  @ResolveField(() => UserModel)
  creator() {}

  @ResolveField(() => [SlideModel])
  slides() {}
}
