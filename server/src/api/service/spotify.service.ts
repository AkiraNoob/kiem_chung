import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import { ISpotifyTokenResponse } from '../../types/api/spotify.types';
import { TServiceResponseType } from '../../types/general.types';

const spotifyService = {
  token: async (): Promise<TServiceResponseType<ISpotifyTokenResponse>> => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    const data: ISpotifyTokenResponse | { [key: string]: unknown } = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: urlencoded,
      },
    ).then((data) => data.json());

    if (!(data as { [key: string]: unknown }).error) {
      return {
        data: data as ISpotifyTokenResponse,
        statusCode: EHttpStatus.OK,
        message: 'Access spotify granted',
      };
    }
    throw new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Can not read .env or service is currently available.');
  },
};

export default spotifyService;
