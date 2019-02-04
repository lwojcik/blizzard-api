import { Uri, ClientId, ClientSecret } from '../../types';
import fetchAccessToken from './fetchAccessToken';

export default async (oauthUri: Uri, clientId: ClientId, clientSecret: ClientSecret) => {
  try {
    const accessTokenObject = await fetchAccessToken(oauthUri, clientId, clientSecret);
    const accessToken = <string>accessTokenObject.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
};
