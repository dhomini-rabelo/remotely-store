import {
  CookiesManagerContract,
  INextResponse,
} from '../../contracts/cookiesManager'
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'

export class CookiesNext implements CookiesManagerContract {
  getCookieInClient(key: string) {
    return getCookie(key)
  }

  getCookieInServer(key: string, nextResponse: INextResponse) {
    return getCookie(key, nextResponse)
  }

  hasCookieInClient(key: string) {
    return hasCookie(key)
  }

  hasCookieInServer(key: string, nextResponse: INextResponse) {
    return hasCookie(key, nextResponse)
  }

  setCookieInClient(key: string, value: string) {
    return setCookie(key, value)
  }

  setCookieInServer(key: string, value: string, nextResponse: INextResponse) {
    return setCookie(key, value, nextResponse)
  }

  deleteCookieInClient(key: string) {
    return deleteCookie(key)
  }

  deleteCookieInServer(key: string, nextResponse: INextResponse) {
    return deleteCookie(key, nextResponse)
  }
}
