import supertest from 'supertest';
import userService from '../../api/service/user.service';
import { EHttpStatus } from '../../constant/statusCode';
import appLoader from '../../loader';
import { TRegisterPayload } from '../../types/api/auth.types';
import { TServiceResponseType } from '../../types/general.types';

const app = appLoader(false);

export const mockRegisterPayload: TRegisterPayload = {
  email: 'tester.001@company.com',
  password: 'Tester@001',
  fullName: 'Tester 001',
};



describe('/auth', () => {
  // beforeAll(async () => {
  //   const mongoServer = await MongoMemoryServer.create();
  //   await mongoose.connect(mongoServer.getUri());
  // });

  // afterAll(async () => {
  //   await mongoose.disconnect();
  //   await mongoose.connection.close();
  // });

  describe('POST /register', () => {
    it('should return 200', async () => {
      const mockCreateUserFn = jest.spyOn(userService, 'createUser').mockResolvedValueOnce({data: null, statusCode: EHttpStatus.OK});

      const { statusCode, body } = await supertest(app).post(`/api/auth/register`).send(mockRegisterPayload);

      expect(statusCode).toBe(EHttpStatus.OK);
      expect((body as TServiceResponseType).data).toBe(null);
      expect(mockCreateUserFn).toHaveBeenCalledTimes(1);
      expect(mockCreateUserFn).toHaveBeenCalledWith({...mockRegisterPayload, password: expect.any(String)});
    });
  });
});
