import styled from 'styled-components'

/* eslint-disable */
export const Div = {
  container: styled.div(({ color }: { color: string }) => `
    path {
      color: ${color};
    }
  `),
}