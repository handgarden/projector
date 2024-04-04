export interface ObjectStorageClient {
  getObject(bucket: string, key: string): Promise<any>;
  putObject(bucket: string, key: string, body: any): Promise<any>;
  deleteObject(bucket: string, key: string): Promise<any>;
}
