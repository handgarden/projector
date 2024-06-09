import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserResponse } from '../../../user/adapter/dto/response/User.response';
import { UploadFileQueryUseCase } from '../../application/port/in/UploadFileQueryUseCase';
import { UploadFileResponse } from '../dto/UploadFile.response';
import { UserBatchQueryUseCase } from '../../../user/application/port/in/UserBatchQueryUseCase';
import { Inject } from '@nestjs/common';

@Resolver(() => UploadFileResponse)
export class UploadFileQueryResolver {
  constructor(
    @Inject(UploadFileQueryUseCase)
    private readonly uploadFileQueryUseCase: UploadFileQueryUseCase,
    @Inject(UserBatchQueryUseCase)
    private readonly userBatchUseCase: UserBatchQueryUseCase,
  ) {}

  @Query(() => UploadFileResponse)
  async uploadFile(
    @Args('key', { type: () => String }) key: string,
  ): Promise<UploadFileResponse> {
    const dto = await this.uploadFileQueryUseCase.getUploadFile(key);
    return UploadFileResponse.fromDto(dto);
  }

  @Query(() => [UploadFileResponse])
  async uploadFiles(
    @Args('keys', { type: () => [String] }) keys: string[],
  ): Promise<UploadFileResponse[]> {
    const uploadFiles = await this.uploadFileQueryUseCase.getUploadFiles(keys);
    return uploadFiles.map(UploadFileResponse.fromDto);
  }

  @ResolveField(() => UserResponse)
  async uploader(
    @Root() uploadFile: UploadFileResponse,
  ): Promise<UserResponse> {
    const user = await this.userBatchUseCase.loadUserById(uploadFile.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return UserResponse.fromDto(user.unwrap());
  }
}
