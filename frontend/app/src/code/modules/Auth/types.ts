export interface AuthStructureType {
  accessToken: string | null
}

export interface SavedAuthStructureType extends AuthStructureType {
  savedAt: string
}

export interface ResponseAuthStructureType extends AuthStructureType {
  isAuthenticated: boolean
}
