import { Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiController } from 'src/common/decorator/ApiController';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileApiService } from './FileApiService';
import { RestTemplate } from 'src/common/response/RestTemplate';

@ApiController('files')
export class FileApiController {
  constructor(private readonly fileService: FileApiService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
    }),
  )
  async upload(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const uploadFiles = await this.fileService.uploadFiles(files);
    return RestTemplate.OK_WITH_DATA(
      uploadFiles.map((uploadFile) => uploadFile.toDto()),
    );
  }
}
