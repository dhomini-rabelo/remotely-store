import {
  applicationName,
  refreshTokenTimeoutInSeconds as settingsRefreshTokenTimeoutInSeconds,
} from '../../settings/main'
import {
  SavedAuthStructureType,
  AuthStructureType,
  ResponseAuthStructureType,
} from './types'
import { differenceInSeconds } from 'date-fns'
import { AxiosInstance } from 'axios'
import { ServerResponse } from 'http'
import {
  ClientResponse,
  CookiesManagerContract,
} from './dependencies/contracts/cookiesManager'
import { CookiesNext } from './dependencies/services/cookiesManager/cookiesNext'

class AuthManager {
  private tokenSaveKey: string
  private refreshTokenTimeoutInSeconds: number

  constructor(
    private cookiesManager: CookiesManagerContract,
    refreshTokenTimeoutInSeconds: number,
    applicationName: string,
    authSaveKeyName: string = 'auth',
  ) {
    this.tokenSaveKey = `@${applicationName}-${authSaveKeyName}`
    this.refreshTokenTimeoutInSeconds = refreshTokenTimeoutInSeconds
  }

  configureAuthClient(client: AxiosInstance, authInstance: AuthStructureType) {
    this.setAuthHeader(client, authInstance)
  }

  saveAuthInstance(authInstance: AuthStructureType) {
    const authInstanceForSave: SavedAuthStructureType = {
      ...authInstance,
      savedAt: new Date().toISOString(),
    }
    this.cookiesManager.setCookieInClient(
      this.tokenSaveKey,
      JSON.stringify(authInstanceForSave),
    )
  }

  killAuthInstanceInClientSide() {
    this.cookiesManager.deleteCookieInClient(this.tokenSaveKey)
  }

  killAuthInstanceInServerSide(req: ClientResponse, res: ServerResponse) {
    this.cookiesManager.deleteCookieInServer('test', { req, res })
  }

  getAuthInstanceInClientSide(): ResponseAuthStructureType {
    const instanceIsSaved = this.cookiesManager.hasCookieInClient(
      this.tokenSaveKey,
    )
    const authInstance = (instanceIsSaved &&
      JSON.parse(
        String(this.cookiesManager.getCookieInClient(this.tokenSaveKey)),
      )) as SavedAuthStructureType | false

    if (!!authInstance && !this.tokenWasExpired(authInstance.savedAt)) {
      return {
        isAuthenticated: true,
        accessToken: authInstance.accessToken,
      }
    } else {
      this.killAuthInstanceInClientSide()
      return {
        isAuthenticated: false,
        accessToken: null,
      }
    }
  }

  getAuthInstanceInServerSide(
    req: ClientResponse,
    res: ServerResponse,
  ): ResponseAuthStructureType {
    const instanceIsSaved = this.cookiesManager.hasCookieInServer(
      this.tokenSaveKey,
      { req, res },
    )
    const authInstance = (instanceIsSaved &&
      this.cookiesManager.getCookieInServer(this.tokenSaveKey, {
        req,
        res,
      })) as SavedAuthStructureType | false

    if (!!authInstance && !this.tokenWasExpired(authInstance.savedAt)) {
      return {
        isAuthenticated: true,
        accessToken: authInstance.accessToken,
      }
    } else {
      this.killAuthInstanceInServerSide(req, res)
      return {
        isAuthenticated: false,
        accessToken: null,
      }
    }
  }

  getAuthorizationHeaderFromAccessToken(accessToken: string) {
    return `Bearer ${accessToken}`
  }

  private setAuthHeader(
    client: AxiosInstance,
    authInstance: AuthStructureType,
  ) {
    client.defaults.headers.common.Authorization =
      this.getAuthorizationHeaderFromAccessToken(authInstance.accessToken!)
    this.saveAuthInstance({
      accessToken: authInstance.accessToken,
    })
  }

  private tokenWasExpired(savedAtIsoDate: string) {
    const savedAuthInstanceDate = new Date(savedAtIsoDate)
    return (
      differenceInSeconds(new Date(), savedAuthInstanceDate) >=
      this.refreshTokenTimeoutInSeconds - 10
    )
  }
}

export const authConsumer = new AuthManager(
  new CookiesNext(),
  settingsRefreshTokenTimeoutInSeconds,
  applicationName,
)
