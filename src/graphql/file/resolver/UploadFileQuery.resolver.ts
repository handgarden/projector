import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UploadFileResponse } from '../response/UploadFile.response';
import { UserResponse } from '../../user/response/User.response';
import UploadFileGqlService from '../UploadFileGql.service';
import { S3Service } from '../../../lib/s3/S3.service';
import { UserLoader } from '../../user/loader/User.loader';

@Resolver(() => UploadFileResponse)
export class UploadFileQueryResolver {
  constructor(
    private readonly uploadFileGqlService: UploadFileGqlService,
    private readonly userLoader: UserLoader,
    private readonly s3Service: S3Service,
  ) {}

  @Query(() => UploadFileResponse)
  uploadFile(
    @Args('key', { type: () => String }) key: string,
  ): Promise<UploadFileResponse> {
    return this.uploadFileGqlService.getUploadFile(key);
  }

  @Query(() => [UploadFileResponse])
  uploadFiles(
    @Args('keys', { type: () => [String] }) keys: string[],
  ): Promise<UploadFileResponse[]> {
    return this.uploadFileGqlService.getUploadFiles(keys);
  }

  @ResolveField(() => UserResponse)
  async uploader(
    @Root() uploadFile: UploadFileResponse,
  ): Promise<UserResponse> {
    return this.userLoader.findUserByFileKeys.load(uploadFile.key);
  }

  @ResolveField(() => String)
  url(@Root() uploadFile: UploadFileResponse): Promise<string> {
    return this.s3Service.getPresignedUrl(uploadFile.key);
  }
}
