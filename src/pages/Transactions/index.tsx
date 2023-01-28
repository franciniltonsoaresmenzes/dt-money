import { Calendar, CaretLeft, CaretRight, Tag } from 'phosphor-react'
import { useQuery, useQueryClient } from 'react-query'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
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
  const fetchTransactionQuery = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactionQuery,
  )

  const { data, isLoading, isSuccess } = useQuery(
    'todos',
    () => fetchTransactionQuery(''),
    {
      refetchInterval: 60000,
    },
  )

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

        <TransactionsTableFooter>
          <TransactionsTableToggleGroup aria-label="Tool bar de paginação">
            <TransactionsTableToolbarButton disabled>
              <CaretLeft size={24} weight="bold" />
            </TransactionsTableToolbarButton>
            <TableGroupNumber defaultValue="1" type="single">
              <TablePaginationNumber value="1">1</TablePaginationNumber>
              <TablePaginationNumber value="2">2</TablePaginationNumber>
              <TablePaginationNumber value="3">3</TablePaginationNumber>
            </TableGroupNumber>
            <TransactionsTableToolbarButton>
              <CaretRight size={24} weight="bold" />
            </TransactionsTableToolbarButton>
          </TransactionsTableToggleGroup>
        </TransactionsTableFooter>
      </TransactionsContainer>
    </div>
  )
}
