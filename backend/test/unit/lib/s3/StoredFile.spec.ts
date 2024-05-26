import { StoredFile } from '../../../../src/lib/s3/StoredFile';

describe(StoredFile, () => {
  describe('constructor', () => {
    it('생성자가 정상적으로 동작한다.', () => {
      //given
      const key = 'key';
      const bucket = 'bucket';
      const originalName = 'originalName';
      const url = 'url';

      //when
      const storedFile = new StoredFile({ key, bucket, originalName, url });

      //then
      expect(storedFile.key).toBe(key);
      expect(storedFile.bucket).toBe(bucket);
      expect(storedFile.originalName).toBe(originalName);
      expect(storedFile.url).toBe(url);
    });
  });
});
