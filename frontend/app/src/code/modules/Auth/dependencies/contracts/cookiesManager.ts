import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { IncomingMessage, ServerResponse } from 'http'
export type ClientResponse = IncomingMessage & {
  cookies: NextApiRequestCookies
}

export type INextResponse = { req: ClientResponse; res: ServerResponse }

export interface CookiesManagerContract {
  getCookieInClient: (key: string) => any
  getCookieInServer: (key: string, nextResponse: INextResponse) => any
  hasCookieInClient: (key: string) => boolean
  hasCookieInServer: (key: string, nextResponse: INextResponse) => boolean
  setCookieInClient: (key: string, value: string) => void
  setCookieInServer: (
    key: string,
    value: string,
    nextResponse: INextResponse,
  ) => void
  deleteCookieInClient: (key: string) => void
  deleteCookieInServer: (key: string, nextResponse: INextResponse) => void
}
