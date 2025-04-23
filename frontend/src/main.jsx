import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from './utils/initialize';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { store } from './Store/store'
import { Provider } from 'react-redux'

initializeApp();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>   
  </StrictMode>,
)
