import styled from 'styled-components'

export const Div = {
  bannerSlider: styled.div`
    overflow-x: clip !important;
    overflow-y: visible !important;
  `,

  bannerSlideItem: styled.div`
    overflow: visible !important;

    @media (max-width: 640px) {
      min-width: 100% !important;
    }
  `,

  dots: styled.div`
    display: none;
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

    @media (max-width: 640px) {
      display: flex;
    }
  `,

  departmentSlideItem: styled.div`
    width: 8.5rem !important;
    min-width: 8.5rem !important;
    height: 11.125rem !important;
    min-height: 11.125rem !important;
  `,
}
