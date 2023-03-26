import styled from 'styled-components'

export const IndexForm = {
  container: styled.div`
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem 0;

      label {
        display: block;
        font-size: 0.75rem;
      }

      input {
        display: block;
        font-size: 0.75rem;
        padding: 1.25rem 1rem;
        background-color: var(--Gray-200);
        font-weight: 500;
        border-radius: 8px;
      }
    }
  `,
}
