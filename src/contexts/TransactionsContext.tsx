import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface TransactionsType {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createAt: string
}

interface TransactionsContextTypes {
  transactions: TransactionsType[]
  fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextTypes)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransaction] = useState<TransactionsType[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        q: query,
      },
    })

    setTransaction(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
