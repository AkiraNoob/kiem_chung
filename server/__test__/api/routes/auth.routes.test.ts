import supertest from 'supertest';
import { EHttpStatus } from '../../../src/constant/statusCode';
import appLoader from '../../../src/loader/appLoader';

const request = supertest(appLoader());

describe('Tesing auth routes', () => {
  describe('Given routes POST /api/auth/login', () => {
    it('should not return statusCode 404', async () => {
      const { status } = await request.post('/api/auth/login');
      expect(status).not.toBe(EHttpStatus.NOT_FOUND);
    });
  });

  describe('Given routes POST /api/auth/register', () => {
    it('should not return statusCode 404', async () => {
      const { status } = await request.post('/api/auth/register');
      expect(status).not.toBe(EHttpStatus.NOT_FOUND);
    });
  });

  describe('Given routes POST /api/auth/refreshToken', () => {
    it('should not return statusCode 404', async () => {
      const { status } = await request.post('/api/auth/refreshToken');
      expect(status).not.toBe(EHttpStatus.NOT_FOUND);
    });
  });
});
