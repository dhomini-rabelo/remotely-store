import { AuthStructureType, ITokenSettings } from './types'
import { AxiosInstance } from 'axios'

export class AxiosAuthClientManager {
  /* eslint-disable */
  constructor(
    private readonly tokenSettings: ITokenSettings,
  ) { }
  /* eslint-enable */

  getAuthorizationHeaderFromAccessToken(accessToken: string) {
    return `${this.tokenSettings.TOKEN_PREFIX} ${accessToken}`
  }

  private setAuthHeader(
    client: AxiosInstance,
    authInstance: AuthStructureType,
  ) {
    client.defaults.headers.common.Authorization =
      this.getAuthorizationHeaderFromAccessToken(authInstance.accessToken!)
  }

  configureAuthClient(client: AxiosInstance, authInstance: AuthStructureType) {
    this.setAuthHeader(client, authInstance)
  }
}
