import { Slide } from '../../core/entity/domain/project/Slide.entity';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { UploadFileModel } from '../file/UploadFile.model';

@Resolver(() => Slide)
export class SlideQueryResolver {
  @ResolveField(() => [UploadFileModel])
  images() {}
}
