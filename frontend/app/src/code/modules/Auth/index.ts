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
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { IncomingMessage, ServerResponse } from 'http'
type ClientResponse = IncomingMessage & {
  cookies: NextApiRequestCookies
}

class AuthManager {
  private tokenSaveKey: string
  private refreshTokenTimeoutInSeconds: number

  constructor(
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
    setCookie(this.tokenSaveKey, JSON.stringify(authInstanceForSave))
  }

  killAuthInstanceInClientSide() {
    deleteCookie(this.tokenSaveKey)
  }

  killAuthInstanceInServerSide(req: ClientResponse, res: ServerResponse) {
    deleteCookie('test', { req, res })
  }

  getAuthInstanceInClientSide(): ResponseAuthStructureType {
    const instanceIsSaved = hasCookie(this.tokenSaveKey)
    const authInstance = (instanceIsSaved &&
      JSON.parse(String(getCookie(this.tokenSaveKey)))) as
      | SavedAuthStructureType
      | false

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
    const instanceIsSaved = hasCookie(this.tokenSaveKey, { req, res })
    const authInstance = (instanceIsSaved &&
      getCookie(this.tokenSaveKey, { req, res })) as
      | SavedAuthStructureType
      | false

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

  private getAuthorizationHeaderFromAccessToken(accessToken: string) {
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
  settingsRefreshTokenTimeoutInSeconds,
  applicationName,
)
