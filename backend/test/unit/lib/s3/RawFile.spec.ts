import { RawFile } from '../../../../src/lib/s3/RawFile';

describe(RawFile, () => {
  let originalFileName: string;
  let buffer: Buffer;
  const key = 'key';

  beforeEach(() => {
    originalFileName = 'originalName.jpg';
    buffer = Buffer.from('');
  });

  describe('constructor', () => {
    it('파일명의 확장자를 key에 추가한다.', () => {
      //given

      //when
      const rawFile = new RawFile(key, originalFileName, buffer);

      //then
      expect(rawFile.key).toBe(`${key}.jpg`);
    });

    it('file의 originalname을 originalname으로 반환한다.', () => {
      //when
      const rawFile = new RawFile(key, originalFileName, buffer);

      //then
      expect(rawFile.originalname).toBe(originalFileName);
    });

    it('생성자가 정상적으로 동작한다.', () => {
      //given

      //when
      const rawFile = new RawFile(key, originalFileName, buffer);

      //then
      expect(rawFile).toBeDefined();
      expect(rawFile.key).toBe(`${key}.${originalFileName.split('.')[1]}`);
      expect(rawFile.originalname).toBe(originalFileName);
    });
  });
});
