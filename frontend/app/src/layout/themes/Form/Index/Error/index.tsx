import Image from 'next/image'
import ErrorIcon from '../../../../../assets/forms/error.svg'
import * as React from 'react'
import { Span } from './styles'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  children: string | React.ReactNode
  layoutSpace?: boolean
}

export function Error({ children, layoutSpace = false, ...props }: Props) {
  return !children && !layoutSpace ? (
    <></>
  ) : (
    <Span.main {...props}>
      {children ? (
        <>
          <Image
            width={13}
            height={13}
            src={ErrorIcon}
            alt="Ícone de erro de X dentro de um círculo"
          />
          <span>{children}</span>
        </>
      ) : (
        <>&nbsp;</>
      )}
    </Span.main>
  )
}
