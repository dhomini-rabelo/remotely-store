import axios from 'axios'
import { axiosAuthConsumerFactory } from '../modules/Auth/consumers'

export const BASE_HOST = String(process.env.NEXT_PUBLIC_BACKEND_HOST)
export const BASE_URL = `${BASE_HOST}/api`
export const MEDIA_BASE_URL = String(process.env.NEXT_PUBLIC_BACKEND_HOST)

export const client = axios.create({
  baseURL: BASE_URL,
}) // with Authentication

export const simpleClient = axios.create({
  baseURL: BASE_URL,
}) // without Authentication

export const APPLICATION_NAME = 'REMOTELY'

export const REFRESH_TOKEN_TIMEOUT = 60 * 60 * 20 // 20 hours

export const authConsumer = axiosAuthConsumerFactory({
  TOKEN_KEY: `@${APPLICATION_NAME}-TOKEN_KEY`,
  REFRESH_TOKEN_TIMEOUT,
  TOKEN_PREFIX: 'Bearer',
})
