import { Test } from '@nestjs/testing';
import { UploadFileService } from '../../../../src/file/application/service/UploadFile.service';
import { ObjectStorageClient } from '../../../../src/lib/s3/ObjectStorageClient';
import { StoredFile } from '../../../../src/lib/s3/StoredFile';

describe(UploadFileService, () => {
  let s3Service: UploadFileService;
  let objectStorageClient: ObjectStorageClient;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UploadFileService,
        {
          provide: ObjectStorageClient,
          useValue: {
            putObject: jest.fn(),
            getPresignedUrl: jest.fn(),
            deleteObject: jest.fn(),
          },
        },
      ],
    }).compile();

    s3Service = moduleRef.get<UploadFileService>(UploadFileService);
    objectStorageClient =
      moduleRef.get<ObjectStorageClient>(ObjectStorageClient);
  });

  describe('uploadFile', () => {
    it('파일을 업로드한다.', async () => {
      //given
      const file: Express.Multer.File = {
        buffer: jest.fn(),
        originalname: 'originalName.txt',
      } as any;
      const storedFile: StoredFile = {
        key: 'key',
        bucket: 'bucket',
        originalName: file.originalname,
        url: 'url',
      };

      objectStorageClient.putObject = jest.fn().mockReturnValue(storedFile);

      //when
      const result = await s3Service.uploadFile(file);

      //then
      expect(objectStorageClient.putObject).toHaveBeenCalled();
      expect(result).toBe(storedFile);
    });
  });

  describe('uploadFiles', () => {
    it('files의 길이만큼 uploadFile을 호출해 파일을 업로드한다.', async () => {
      //given
      s3Service.uploadFile = jest.fn();
      const file: Express.Multer.File = {} as any;
      const files = [file, file];
      //when
      await s3Service.uploadFiles(files);

      //then
      expect(s3Service.uploadFile).toHaveBeenCalledTimes(files.length);
    });
  });

  describe('getPresignedUrl', () => {});
});
