import styled from 'styled-components'

/* eslint-disable */
export const Div = {
  paymentType: styled.div(({ active }: { active: boolean }) => `
    cursor: pointer;
    height: 3.75rem; 
    ${active ? `
      border: 0.6px solid var(--Green-100);
      color: var(--Green-100);
      ` : `
      border: 0.6px solid var(--Gray-300);
      color: var(--Gray-300);
    `}
  `),
}
