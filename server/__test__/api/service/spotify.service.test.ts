import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { jestConfigEnv } from '../../../.jest/test.config';
import spotifyService from '../../../src/api/service/spotify.service';
import { EHttpStatus } from '../../../src/constant/statusCode';
import { ISpotifyTokenResponse } from '../../../src/types/api/spotify.types';

describe('Testing spotify service', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Token service', () => {
    describe('Given valid .env', () => {
      it('should return statusCode 200 and data is null and message is "Register successfully"', async () => {
        const data: ISpotifyTokenResponse = expect.objectContaining({
          access_token: expect.any(String),
          token_type: 'Bearer',
          expires_in: expect.any(Number),
        });

        await expect(spotifyService.token()).resolves.toStrictEqual({
          data,
          statusCode: EHttpStatus.OK,
          message: 'Access spotify granted',
        });
      });
    });

    describe('Given invalid .env', () => {
      beforeAll(async () => {
        jest.resetModules();
        process.env.SPOTIFY_CLIENT_ID = '0';
      });

      afterEach(() => {
        jest.resetModules();
        process.env = jestConfigEnv;
      });

      it('should return statusCode 500 and message "Can not read .env or service is currently available."', async () => {
        expect(spotifyService.token()).rejects.toEqual(
          expect.objectContaining({
            statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
            message: expect.stringContaining('Can not read .env or service is currently available.'),
          }),
        );
      });
    });
  });
});
