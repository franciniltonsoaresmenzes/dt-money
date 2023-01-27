import { Calendar, Tag } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableMobile,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions,
  )

  const { innerWidth } = window

  console.log('re')

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          {innerWidth > 862 ? (
            <tbody>
              {transactions.map((transaction) => (
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
                {transactions.map((transaction) => (
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
      </TransactionsContainer>
    </div>
  )
}
