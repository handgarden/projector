import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UploadFileModel } from './UploadFile.model';
import { UserModel } from '../user/User.model';
import UploadFileGqlService from './UploadFileGql.service';
import { UploadFileLoader } from './UploadFIleLoader';

@Resolver(() => UploadFileModel)
export class UploadFileQueryResolver {
  constructor(
    private readonly uploadFileGqlService: UploadFileGqlService,
    private readonly fileLoader: UploadFileLoader,
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
}
