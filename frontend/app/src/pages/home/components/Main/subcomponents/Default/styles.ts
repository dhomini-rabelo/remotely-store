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

  dots: styled.div`
    display: flex;
    padding: 10px 0;
    justify-content: center;

    .dot {
      border: none;
      width: 10px;
      height: 10px;
      background: #c5c5c5;
      border-radius: 50%;
      margin: 0 5px;
      padding: 5px;
      cursor: pointer;
    }

    .dot:focus {
      outline: none;
    }

    .dot.active {
      background: #000;
    }
  `,
}
