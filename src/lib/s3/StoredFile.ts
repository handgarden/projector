export class StoredFile {
  key: string;
  bucket: string;
  originalName: string;
  url: string;

  constructor({
    key,
    bucket,
    originalName,
    url,
  }: {
    key: string;
    bucket: string;
    originalName: string;
    url: string;
  }) {
    this.key = key;
    this.bucket = bucket;
    this.originalName = originalName;
    this.url = url;
  }
}
