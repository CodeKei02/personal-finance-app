import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Dashboard } from './components/navigation/Dashboard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
        <Dashboard />
        <App />
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)
