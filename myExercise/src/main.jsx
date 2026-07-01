import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import SearchPage from './pages/search.jsx'
import RegisterPage from './pages/register.jsx'
import UsersPage from './pages/users.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <SearchPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/users',
        element: <UsersPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
