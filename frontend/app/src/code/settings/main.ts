import axios from 'axios'

export const BASE_URL = 'http://localhost:8000/api'
export const MEDIA_BASE_URL = 'http://localhost:8000'

export const client = axios.create({
  baseURL: BASE_URL,
}) // with Authentication

export const simpleClient = axios.create({
  baseURL: BASE_URL,
}) // without Authentication

export const applicationName = 'REMOTELY'

export const REFRESH_TOKEN_TIMEOUT = 60 * 60 * 20 // 20 hours
