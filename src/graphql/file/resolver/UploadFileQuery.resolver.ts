import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UploadFileModel } from '../model/UploadFile.model';
import { UserModel } from '../../user/model/User.model';
import UploadFileGqlService from '../UploadFileGql.service';
import { UploadFileLoader } from '../loader/UploadFIleLoader';
import { S3Service } from '../../../lib/s3/S3.service';

@Resolver(() => UploadFileModel)
export class UploadFileQueryResolver {
  constructor(
    private readonly uploadFileGqlService: UploadFileGqlService,
    private readonly fileLoader: UploadFileLoader,
    private readonly s3Service: S3Service,
  ) {}

  @Query(() => UploadFileModel)
  uploadFile(@Args('key', { type: () => String }) key: string) {
    return this.uploadFileGqlService.getUploadFile(key);
  }

  @Query(() => [UploadFileModel])
  uploadFiles(@Args('keys', { type: () => [String] }) keys: string[]) {
    return this.uploadFileGqlService.getUploadFiles(keys);
  }

  @ResolveField(() => UserModel)
  uploader(@Root() uploadFile: UploadFileModel) {
    const userModel = this.fileLoader.findUserModelByKeys.load(uploadFile.key);

    return userModel;
  }

  @ResolveField(() => String)
  url(@Root() uploadFile: UploadFileModel) {
    return this.s3Service.getPresignedUrl(uploadFile.key);
  }
}
