import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { QueryClient, useMutation } from 'react-query'
import { useState } from 'react'

const searchSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchSchema>

export function SearchForm() {
  const [query, setQuery] = useState('')
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactionQuery,
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
  })

  async function handleSearchTransactions({ query }: SearchFormInputs) {
    setQuery(query)
    mutate()
  }

  const queryClient = new QueryClient()

  const { mutate } = useMutation(() => fetchTransactions(query), {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions')
      console.log('d')
    },
  })

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por uma transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        <span>Buscar</span>
      </button>
    </SearchFormContainer>
  )
}
