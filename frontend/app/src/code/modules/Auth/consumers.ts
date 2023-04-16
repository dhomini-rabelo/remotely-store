import { AxiosAuthClientManager } from './axios-client'
import { CookiesNext } from './dependencies/services/cookiesManager/cookiesNext'
import { DateFnsManager } from './dependencies/services/dateManager/dateFnsManager'
import { AuthRepository } from './repository'
import { ITokenSettings } from './types'

export function axiosAuthConsumerFactory(tokenSettings: ITokenSettings) {
  return {
    repository: new AuthRepository(
      new CookiesNext(),
      new DateFnsManager(),
      tokenSettings,
    ),
    clientManager: new AxiosAuthClientManager(tokenSettings),
  }
}
