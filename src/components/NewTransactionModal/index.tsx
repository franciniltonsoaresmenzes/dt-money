import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleUp, X, ArrowCircleDown } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionsType,
  TransactionsTypeButton,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const NewTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof NewTransactionFormSchema>

export function NewTransactionModal() {
  const createTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.createTransactions,
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(NewTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransations(data: NewTransactionFormInputs) {
    const { description, category, price, type } = data
    createTransactions({ description, price, category, type })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransations)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionsType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionsTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionsTypeButton>

                <TransactionsTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionsTypeButton>
              </TransactionsType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
