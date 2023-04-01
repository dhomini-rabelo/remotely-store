import styled from 'styled-components'

/* eslint-disable */
export const Div = {
  paymentType: styled.div(({ active }: { active: boolean }) => `
    border: 0.6px solid ${active ? 'var(--Green-100)' : 'var(--Gray-300)'};
    color: ${active ? 'var(--Green-100)' : 'var(--Gray-300)'};
  `),
}
