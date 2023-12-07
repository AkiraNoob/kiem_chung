import { Response } from 'express';
import { sendAuthCookieToClient, sendToClientCookieOptions } from '../../src/common/cookies';
import { EAuthCookiesKey } from '../../src/config/constant';

describe('Test common cookies', () => {
  describe('Given sendToClientCookieOptions function', () => {
    describe('Given expires time in string', () => {
      it('should return object', () => {
        expect(sendToClientCookieOptions('300')).toStrictEqual({
          maxAge: parseInt('300') * 1000, //convert from seconds to milliseconds
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
      });
    });
  });

  describe('Given sendAuthCookieToClient function', () => {
    describe('Given expires time in string', () => {
      it('should return object', () => {
        const res = {} as unknown as Response;
        res.json = jest.fn();
        res.cookie = jest.fn(() => res); // chained

        const credentials = {
          token: { token: 'token', expires: '300' },
          refreshToken: { token: 'refreshToken', expires: '604800' },
        };

        sendAuthCookieToClient(res, credentials);
        expect(res.cookie).toHaveBeenCalledTimes(2);
        expect(res.cookie).toHaveBeenNthCalledWith(
          1,
          EAuthCookiesKey.Token,
          credentials.token.token,
          sendToClientCookieOptions(credentials.token.expires),
        );
        expect(res.cookie).toHaveBeenNthCalledWith(
          2,
          EAuthCookiesKey.RefreshToken,
          credentials.refreshToken.token,
          sendToClientCookieOptions(credentials.refreshToken.expires),
        );
      });
    });
  });
});
