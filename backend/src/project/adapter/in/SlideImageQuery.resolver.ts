import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UploadFileResponse } from '../../../file/adapter/dto/UploadFile.response';
import { SlideImageResponse } from '../dto/response/SlideImage.response';
import { UploadFileBatchQueryUseCase } from '../../../file/application/port/in/UploadFileBatchQueryUseCase';
import { Inject } from '@nestjs/common';

@Resolver(() => SlideImageResponse)
export class SlideImageQueryResolver {
  constructor(
    @Inject(UploadFileBatchQueryUseCase)
    private readonly uploadFileBatchQueryUseCase: UploadFileBatchQueryUseCase,
  ) {}
  @ResolveField(() => UploadFileResponse)
  async file(
    @Root() slideImage: SlideImageResponse,
  ): Promise<UploadFileResponse> {
    const key = slideImage.imageKey;

    const image =
      await this.uploadFileBatchQueryUseCase.loadUploadFileByKey(key);

    if (image.isNil()) {
      throw new Error(`Image with key ${key} not found`);
    }

    return UploadFileResponse.fromDto(image.unwrap());
  }
}
