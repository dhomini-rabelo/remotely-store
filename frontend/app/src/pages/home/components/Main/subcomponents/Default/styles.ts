import styled from 'styled-components'

export const Div = {
  slider: styled.div`
    overflow-x: clip !important;
    overflow-y: visible !important;
  `,
  slideItem: styled.div`
    overflow: visible !important;

    @media (max-width: 640px) {
      min-width: 100% !important;
    }
  `,
}
