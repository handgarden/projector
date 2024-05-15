import { UUIDUtils } from '../../../src/util/UUIDUtils';

describe(UUIDUtils, () => {
  const uuidReg = new RegExp(
    '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    'i',
  );

  describe('generateUUID', () => {
    it('UUID를 생성한다.', () => {
      //when
      const uuid = UUIDUtils.generateUUID();

      //then
      expect(uuidReg.test(uuid)).toBeTruthy();
    });
  });
});
