import supertest from 'supertest';
import { EHttpStatus } from '../../../src/constant/statusCode';
import appLoader from '../../../src/loader/appLoader';

const request = supertest(appLoader());

describe('Tesing spotify routes', () => {
  describe('Given routes POST /api/spotify/token', () => {
    it('should not return statusCode 404', async () => {
      const { status } = await request.post('/api/spotify/token');
      expect(status).not.toBe(EHttpStatus.NOT_FOUND);
    });
  });
});
