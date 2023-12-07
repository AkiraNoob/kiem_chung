import { bcryptCompareSync, bcryptHashSync } from '../../src/common/bcrypt';

describe('Test common bcrypt', () => {
  describe('Given bcryptHashSync function', () => {
    describe('Given string data', () => {
      it('should return hash string', () => {
        expect(bcryptHashSync('hash_string')).toStrictEqual(expect.any(String));
      });
    });
  });

  describe('Given bcryptCompareSync function', () => {
    const data: string = 'hash_string';

    describe('Given string data and hashed data', () => {
      let hashedData: string = '';
      beforeAll(() => {
        hashedData = bcryptHashSync(data);
      });

      it('should return true', () => {
        expect(bcryptCompareSync(data, hashedData)).toBe(true);
      });
    });

    describe('Given string data and non-hashed related to data', () => {
      it('should return true', () => {
        expect(bcryptCompareSync(data, bcryptHashSync('another_string'))).toBe(false);
      });
    });
  });
});
