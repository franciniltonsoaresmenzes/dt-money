import { useContextSelector } from 'use-context-selector'
import { useQuery } from 'react-query'
import { useMemo } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const fetchTransactionQuery = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactionQuery,
  )
  const { data } = useQuery('transactions', () => fetchTransactionQuery())

  const summary = useMemo(
    () =>
      data!.reduce(
        (acc, transactions) => {
          if (transactions.type === 'income') {
            acc.income += transactions.price
            acc.total += transactions.price
          } else {
            acc.outcome += transactions.price
            acc.total -= transactions.price
          }
          return acc
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      ),
    [data],
  )

  return summary
}
