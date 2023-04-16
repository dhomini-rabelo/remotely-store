export interface ITokenSettings {
  readonly REFRESH_TOKEN_TIMEOUT: number
  readonly TOKEN_KEY: string
  readonly TOKEN_PREFIX: string
}

export interface AuthStructureType {
  accessToken: string | null
}

export interface SavedAuthStructureType extends AuthStructureType {
  savedAt: string
}

export interface ResponseAuthStructureType extends AuthStructureType {
  isAuthenticated: boolean
}
