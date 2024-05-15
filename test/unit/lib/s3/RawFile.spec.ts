import { RawFile } from '../../../../src/lib/s3/RawFile';

describe(RawFile, () => {
  let file: Express.Multer.File;
  const key = 'key';

  beforeEach(() => {
    file = {
      buffer: jest.fn(),
      originalname: 'originalName.txt',
    } as any;
  });

  describe('constructor', () => {
    it('파일명의 확장자를 key에 추가한다.', () => {
      //given
      file.originalname = 'originalName.jpg';

      //when
      const rawFile = new RawFile(key, file);

      //then
      expect(rawFile.key).toBe(`${key}.jpg`);
    });

    it('file의 originalname을 originalname으로 반환한다.', () => {
      //when
      const rawFile = new RawFile(key, file);

      //then
      expect(rawFile.originalname).toBe(file.originalname);
    });

    it('file의 buffer를 buffer로 반환한다.', () => {
      //given
      file.buffer = Buffer.from('');

      //when
      const rawFile = new RawFile(key, file);

      //then
      expect(rawFile.buffer).toBe(file.buffer);
    });

    it('생성자가 정상적으로 동작한다.', () => {
      //given

      //when
      const rawFile = new RawFile(key, file);

      //then
      expect(rawFile).toBeDefined();
      expect(rawFile.key).toBe(`${key}.txt`);
      expect(rawFile.originalname).toBe(file.originalname);
    });
  });
});
