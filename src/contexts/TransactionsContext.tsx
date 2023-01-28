import { ReactNode, useCallback, useEffect } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface TransactionsType {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface createTransactionsInput {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

interface TransactionsContextTypes {
  createTransactions: (data: createTransactionsInput) => Promise<void>
  fetchTransactionQuery: (
    query?: string,
    page?: number,
    limit?: number,
  ) => Promise<TransactionsType[]>
}

export const TransactionsContext = createContext({} as TransactionsContextTypes)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const fetchTransactionQuery = useCallback(
    async (
      query?: string,
      page?: number,
      limit?: number,
    ): Promise<TransactionsType[]> => {
      const response = await api.get<TransactionsType[]>('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
          _page: page,
          _limit: limit,
        },
      })

      return response.data
    },
    [],
  )
  const createTransactions = useCallback(
    async (data: createTransactionsInput) => {
      const { description, category, price, type } = data

      await api.post('transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })
    },
    [],
  )

  useEffect(() => {
    fetchTransactionQuery()
  }, [fetchTransactionQuery])

  return (
    <TransactionsContext.Provider
      value={{
        createTransactions,
        fetchTransactionQuery,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
