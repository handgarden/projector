import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UploadFileResponse } from '../../../file/application/adapter/dto/UploadFile.response';
import { SlideImageResponse } from '../dto/response/SlideImage.response';
import { UploadFileBatchQueryUseCase } from '../../../file/application/port/in/UploadFileBatchQueryUseCase';

@Resolver(() => SlideImageResponse)
export class SlideImageQueryResolver {
  constructor(
    private readonly uploadFileBatchQueryUseCase: UploadFileBatchQueryUseCase,
  ) {}
  @ResolveField(() => UploadFileResponse, {
    nullable: true,
  })
  async image(
    @Root() slideImage: SlideImageResponse,
  ): Promise<UploadFileResponse | null> {
    const key = slideImage.imageKey;

    const image =
      await this.uploadFileBatchQueryUseCase.loadUploadFileByKey(key);

    if (image.isNil()) {
      return null;
    }

    return UploadFileResponse.fromDto(image.unwrap());
  }
}
