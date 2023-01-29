import { Calendar, CaretLeft, CaretRight, Tag } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { queryClient } from '../../lib/reactQuery'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TableGroupNumber,
  TablePaginationNumber,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableFooter,
  TransactionsTableMobile,
  TransactionsTableToggleGroup,
  TransactionsTableToolbarButton,
} from './styles'

export function Transactions() {
  const [page, setPage] = useState(1)

  const fetchTransactionQuery = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactionQuery,
  )

  const { data, isLoading, isSuccess, isPreviousData, isFetching, refetch } =
    useQuery({
      queryKey: ['todos', page],
      queryFn: () => fetchTransactionQuery('', page, 5),
      onSuccess: () => {
        queryClient.setQueryData(['summary'], [])
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 5,
      keepPreviousData: true,
    })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  const { innerWidth } = window

  return (
    <div>
      <Header />
      {isSuccess && <Summary />}
      <TransactionsContainer>
        <SearchForm />
        {isLoading && 'carregando'}
        <TransactionsTable>
          {innerWidth > 862 ? (
            <tbody>
              {data?.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <TransactionsTableMobile>
              <tbody>
                {data?.map((transaction) => (
                  <tr key={transaction.id}>
                    <td width="50%">
                      <header>
                        <p>{transaction.description}</p>
                        <PriceHighlight variant={transaction.type}>
                          {transaction.type === 'outcome' && '- '}
                          {priceFormatter.format(transaction.price)}
                        </PriceHighlight>
                      </header>
                      <footer>
                        <span>
                          <Tag size={16} />
                          {transaction.category}
                        </span>
                        <span>
                          <Calendar size={16} />
                          {dateFormatter.format(
                            new Date(transaction.createdAt),
                          )}
                        </span>
                      </footer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TransactionsTableMobile>
          )}
        </TransactionsTable>
        {isSuccess ? (
          <TransactionsTableFooter>
            <TransactionsTableToggleGroup aria-label="Tool bar de paginação">
              <TransactionsTableToolbarButton
                disabled={page === 1}
                onClick={() => setPage((PrevPages) => PrevPages - 1)}
              >
                <CaretLeft size={24} weight="bold" />
              </TransactionsTableToolbarButton>
              <TableGroupNumber value={page.toString()} type="single">
                <TablePaginationNumber
                  value={page.toString()}
                  onClick={() => setPage(page)}
                >
                  {page}
                </TablePaginationNumber>
                <TablePaginationNumber
                  value={(page + 1).toString()}
                  onClick={() => setPage(page + 1)}
                  disabled={isPreviousData || data?.length === 0 || isFetching}
                >
                  {page + 1}
                </TablePaginationNumber>
                <TablePaginationNumber
                  value={(page + 2).toString()}
                  onClick={() => setPage(page + 2)}
                  disabled={isPreviousData || data?.length === 0 || isFetching}
                >
                  {page + 2}
                </TablePaginationNumber>
              </TableGroupNumber>
              <TransactionsTableToolbarButton
                disabled={isPreviousData || data?.length === 0 || isFetching}
                onClick={() => setPage((PrevPages) => PrevPages + 1)}
              >
                <CaretRight size={24} weight="bold" />
              </TransactionsTableToolbarButton>
            </TransactionsTableToggleGroup>
          </TransactionsTableFooter>
        ) : null}
      </TransactionsContainer>
    </div>
  )
}
