import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  padding: 0 1.5rem;
  margin: 4rem auto 0;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background-color: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

export const TransactionsTableMobile = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  header {
    display: flex;
    flex-direction: column;
    gap: 4px;

    margin-bottom: 12px;
    p {
      font-weight: 400;
      font-size: 1rem;
      line-height: 160%;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 400;
      font-size: 1rem;
      line-height: 160%;
      color: ${(props) => props.theme['gray-500']};

      display: flex;
      gap: 0.25rem;
      align-items: center;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};

  @media screen and (max-width: 838px) {
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 160%;
  }
`
