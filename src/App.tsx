import { Routes, Route } from 'react-router';
import { OverviewPage, TransactionsPage, BudgetsPage, BillsPage, PotsPage } from './pages/index';


export const App = () => {
  return (
    <>
      <Routes>
        <Route path='overview' element={<OverviewPage />}></Route>
        <Route path='/transactions' element={<TransactionsPage />}></Route>
        <Route path='/budgets' element={<BudgetsPage />}></Route>
        <Route path='/pots' element={<PotsPage />}></Route>
        <Route path='/bills' element={<BillsPage />}></Route>
      </Routes>
    </>
  )
}


