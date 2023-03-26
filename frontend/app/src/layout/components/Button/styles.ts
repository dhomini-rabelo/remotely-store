import styled from 'styled-components'

export interface ButtonStylesProps {
  variant: 'primary'
}

/* eslint-disable */
export const ButtonStyles = styled.button((props: ButtonStylesProps) => `
  padding-top: 1.1875rem;
  padding-bottom: 1.1875rem;
  font-weight: 500;
  color: var(--Black-500);
  line-height: 22px;
  border-radius: 8px;
  font-family: 'Inter', 'Roboto', Arial;


  ${props.variant === 'primary' && `
    background-color: var(--Green-100);
  `}



  /* &.md {
    padding-top: 14px;
    padding-bottom: 14px;
  }

  &.sm {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &.xs {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &:hover {
    background-color: var(--Green-450);
  }

  &:disabled {
    opacity: 0.75;
  }

  &.delete-model {
    background-color: var(--Red-700);
  } */
`)
