import supertest from 'supertest';
import { EHttpStatus } from '../../../src/constant/statusCode';
import appLoader from '../../../src/loader/appLoader';

const request = supertest(appLoader());

describe('Tesing user routes', () => {
  describe('Given routes POST /api/user/:userId', () => {
    it('should not return statusCode 404', async () => {
      const { status } = await request.post('/api/user/123');
      expect(status).not.toBe(EHttpStatus.NOT_FOUND);
    });
  });
});
