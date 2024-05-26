export class RawFile {
  private readonly _key: string;
  private readonly _file: Express.Multer.File;
  constructor(key: string, file: Express.Multer.File) {
    this._key = this.addExtensionToKey(key, file.originalname);
    this._file = file;
  }

  private addExtensionToKey(key: string, originalname: string): string {
    const extension = originalname.split('.').pop();
    return `${key}.${extension}`;
  }

  get key(): string {
    return this._key;
  }

  get buffer(): Buffer {
    return this._file.buffer;
  }

  get originalname(): string {
    return this._file.originalname;
  }
}
