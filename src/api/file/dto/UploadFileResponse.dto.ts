export class UploadFileResponseDto {
  key: string;
  url: string;
  originalName: string;

  constructor(key: string, url: string, originalName: string) {
    this.key = key;
    this.url = url;
    this.originalName = originalName;
  }
}
