import { RegionIdOrName, ClientId, ClientSecret, /* Options, */Endpoint, Endpoints, AccessToken, JSONSelector } from '../types';
// import { QueryBatchOptions } from '../interfaces';
import * as oauthHelpers from '../helpers/oauth';
import * as bnetHelpers from '../helpers/bnet';
import * as jsonHelpers from '../helpers/json';
import { getTokenUriByRegion } from '../utils/oauth/tokenUris';

export default class BattleNetApi {
  private region: RegionIdOrName;
  private clientId: ClientId;
  private clientSecret: ClientSecret;
  private accessToken: AccessToken;
  // options:
  // validateAccessTokenOnEachQuery - bool
  // refreshAccessToken - bool - should access token be automatically if bnet responds with 403
  // onAccessTokenRefresh - fn to run after access token is fetched
  // onAccessTokenInvalid - fn to run if bnet responds with 403

  constructor(region: RegionIdOrName, clientId:ClientId, clientSecret:ClientSecret, accessToken?: AccessToken) {
    this.region = region;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = accessToken || '';
  }

  private async getAccessToken() {
    return this.accessToken === '' ? await this.setAccessToken() : this.accessToken;
  }

  private async setAccessToken() {
    const tokenUri = getTokenUriByRegion(this.region);
    const accessToken = await oauthHelpers.getAccessToken(tokenUri, this.clientId, this.clientSecret);
    this.accessToken = accessToken;
    return this.accessToken;
  }

  async query(endpoint:Endpoint) {
    const accessToken = await this.getAccessToken();
    return bnetHelpers.queryEndpoint(this.region, endpoint, accessToken);
  }

  async querySearch(endpoint:Endpoint, selector: JSONSelector) {
    const response = await this.query(endpoint);
    return jsonHelpers.querySearch(response, selector);
  }

  async queryBatch(endpoints:Endpoints) {
      const accessToken = await this.getAccessToken();
      return bnetHelpers.queryBatch(this.region, endpoints, accessToken);
  }

  // queryAndParseBatch(endpoints:Endpoints, selectors:SelectorArray)
}
