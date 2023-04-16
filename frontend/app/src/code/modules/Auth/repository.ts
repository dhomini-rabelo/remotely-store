import { ServerResponse } from 'http'
import {
  ClientResponse,
  CookiesManagerContract,
} from './dependencies/contracts/cookiesManager'
import {
  SavedAuthStructureType,
  AuthStructureType,
  ResponseAuthStructureType,
  ITokenSettings,
} from './types'
import { differenceInSeconds } from 'date-fns'

export class AuthRepository {
  /* eslint-disable */
  constructor(
    private cookiesManager: CookiesManagerContract,
    private readonly tokenSettings: ITokenSettings,
  ) { }
  /* eslint-enable */

  saveAuthInstance(authInstance: AuthStructureType) {
    const authInstanceForSave: SavedAuthStructureType = {
      ...authInstance,
      savedAt: new Date().toISOString(),
    }
    this.cookiesManager.setCookieInClient(
      this.tokenSettings.TOKEN_KEY,
      JSON.stringify(authInstanceForSave),
    )
  }

  killAuthInstanceInClientSide() {
    this.cookiesManager.deleteCookieInClient(this.tokenSettings.TOKEN_KEY)
  }

  killAuthInstanceInServerSide(req: ClientResponse, res: ServerResponse) {
    this.cookiesManager.deleteCookieInServer('test', { req, res })
  }

  getAuthInstanceInClientSide(): ResponseAuthStructureType {
    const instanceIsSaved = this.cookiesManager.hasCookieInClient(
      this.tokenSettings.TOKEN_KEY,
    )
    const authInstance = (instanceIsSaved &&
      JSON.parse(
        String(
          this.cookiesManager.getCookieInClient(this.tokenSettings.TOKEN_KEY),
        ),
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
      this.tokenSettings.TOKEN_KEY,
      { req, res },
    )
    const authInstance = (instanceIsSaved &&
      this.cookiesManager.getCookieInServer(this.tokenSettings.TOKEN_KEY, {
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

  private tokenWasExpired(savedAtIsoDate: string) {
    const savedAuthInstanceDate = new Date(savedAtIsoDate)
    return (
      differenceInSeconds(new Date(), savedAuthInstanceDate) >=
      this.tokenSettings.REFRESH_TOKEN_TIMEOUT - 10
    )
  }
}
