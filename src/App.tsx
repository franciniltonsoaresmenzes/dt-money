import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { queryClient } from './lib/reactQuery'
import { Transactions } from './pages/Transactions'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <TransactionsProvider>
          <Transactions />
        </TransactionsProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
