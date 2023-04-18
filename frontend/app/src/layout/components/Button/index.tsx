import { SimpleLoading } from '@/layout/simple-components/Loading/simple'
import * as React from 'react'
import { ButtonStyles, ButtonStylesProps } from './styles'

/* eslint-disable */
interface Props
  extends ButtonStylesProps,
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean
  children: React.ReactNode | string
}

export function Button({
  isSubmitting = false,
  children,
  disabled,
  ...props
}: Props) {
  return (
    <ButtonStyles disabled={isSubmitting || disabled} {...props}>
      {!isSubmitting ? <>{children}</> : <SimpleLoading />}
    </ButtonStyles>
  )
}
