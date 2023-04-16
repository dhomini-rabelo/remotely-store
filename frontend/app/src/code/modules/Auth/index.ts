import { applicationName, REFRESH_TOKEN_TIMEOUT } from '../../settings/main'
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
  private TOKEN_KEY: string

  constructor(
    private cookiesManager: CookiesManagerContract,
    private readonly REFRESH_TOKEN_TIMEOUT: number,
    TOKEN_KEY: string,
  ) {
    this.TOKEN_KEY = TOKEN_KEY
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
      this.TOKEN_KEY,
      JSON.stringify(authInstanceForSave),
    )
  }

  killAuthInstanceInClientSide() {
    this.cookiesManager.deleteCookieInClient(this.TOKEN_KEY)
  }

  killAuthInstanceInServerSide(req: ClientResponse, res: ServerResponse) {
    this.cookiesManager.deleteCookieInServer('test', { req, res })
  }

  getAuthInstanceInClientSide(): ResponseAuthStructureType {
    const instanceIsSaved = this.cookiesManager.hasCookieInClient(
      this.TOKEN_KEY,
    )
    const authInstance = (instanceIsSaved &&
      JSON.parse(
        String(this.cookiesManager.getCookieInClient(this.TOKEN_KEY)),
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
      this.TOKEN_KEY,
      { req, res },
    )
    const authInstance = (instanceIsSaved &&
      this.cookiesManager.getCookieInServer(this.TOKEN_KEY, {
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
      this.REFRESH_TOKEN_TIMEOUT - 10
    )
  }
}

export const authConsumer = new AuthManager(
  new CookiesNext(),
  REFRESH_TOKEN_TIMEOUT,
  `@${applicationName}-AUTH_TOKEN`,
)
