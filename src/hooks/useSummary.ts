import { useMemo } from 'react'
import { queryClient } from '../lib/reactQuery'

interface TransactionsType {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

export function useSummary() {
  const data = queryClient.getQueryData<TransactionsType[]>(['todos', 1])

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
