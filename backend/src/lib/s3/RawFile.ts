export class RawFile {
  private readonly _key: string;
  private readonly _buffer: Buffer;
  private readonly _originalname: string;
  constructor(key: string, originalname: string, buffer: Buffer) {
    this._originalname = originalname;
    this._key = this.addExtensionToKey(key, originalname);
    this._buffer = buffer;
  }

  private addExtensionToKey(key: string, originalname: string): string {
    const extension = originalname.split('.').pop();
    return `${key}.${extension}`;
  }

  get key(): string {
    return this._key;
  }

  get buffer(): Buffer {
    return this._buffer;
  }

  get originalname(): string {
    return this._originalname;
  }
}
