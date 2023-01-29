import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const fetchTransactionQuery = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactionQuery,
  )

  const { data, refetch } = useQuery({
    queryKey: ['summary'],
    queryFn: () => fetchTransactionQuery(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 50,
  })

  useEffect(() => {
    refetch()
  }, [refetch, data])

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
