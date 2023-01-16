import { ReactNode, useEffect, useState, useCallback } from 'react'
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
  transactions: TransactionsType[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactions: (data: createTransactionsInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextTypes)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransaction] = useState<TransactionsType[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransaction(response.data)
  }, [])

  const createTransactions = useCallback(
    async (data: createTransactionsInput) => {
      const { description, category, price, type } = data

      const response = await api.post('transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })

      setTransaction((state) => [response.data, ...state])
    },
    [],
  )
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
