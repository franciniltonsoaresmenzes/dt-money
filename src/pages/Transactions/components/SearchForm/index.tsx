import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { useMutation } from 'react-query'
import { queryClient } from '../../../../lib/reactQuery'

const searchSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactionQuery,
  )

  const { mutateAsync } = useMutation(
    (query: string) => fetchTransactions(query),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['todos', 1], data)
      },
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
  })

  async function handleSearchTransactions({ query }: SearchFormInputs) {
    if (query.length > 0) {
      mutateAsync(query.toString())
    }
  }

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
