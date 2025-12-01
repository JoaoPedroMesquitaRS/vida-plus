import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import App from './App.jsx'
import './index.css'

// Pages
import LocalAtendimentoPage from './pages/LocalAtendimentoPage.jsx'
import Profissional from './pages/ProfissionalPage.jsx'
import Paciente from './pages/PacientePage.jsx'
import BuscarPacientePage from './pages/BuscarPacientePage.jsx'
import ExamesPage from './pages/ExamesPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'

import AppLayout from './components/AppLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'local-atendimento', element: <LocalAtendimentoPage /> },
      { path: 'profissional', element: <Profissional /> },
      { path: 'paciente', element: <Paciente /> },
      { path: 'buscar-pacientes', element: <BuscarPacientePage /> },
      { path: 'exames', element: <ExamesPage /> },
      { path: 'home', element: <HomePage /> },
    ],
  },
  { path: 'login', element: <LoginPage /> }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
)