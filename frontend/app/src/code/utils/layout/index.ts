import { MEDIA_BASE_URL, DEBUG } from '@/code/settings/main'

export const getImage = (path: string) =>
  DEBUG ? `${MEDIA_BASE_URL}${path}` : path
