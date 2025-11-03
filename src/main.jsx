import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import App from './App.jsx'
import './index.css'

// Pages
import LocalAtendimentoPage from './pages/LocalAtendimentoPage.jsx'
import Profissional from './pages/ProfissionalPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    // element: <AppLayout />,
    children: [
      { path: 'local-atendimento', element: <LocalAtendimentoPage /> },
      { path: 'profissional', element: <Profissional /> }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)