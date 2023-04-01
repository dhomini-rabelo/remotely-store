import { ErrorMessages } from '@/code/settings/forms/errors'
import * as zod from 'zod'

export const LoginSchema = zod.object({
  email: zod.string().min(1, ErrorMessages.REQUIRED),
  password: zod.string().min(1, ErrorMessages.REQUIRED),
})

export type ILoginSchema = zod.infer<typeof LoginSchema>
