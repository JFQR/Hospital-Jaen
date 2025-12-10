import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import Login from './Components/Login.tsx'
import MainMenu from './Components/MainMenu.tsx'
import NewRegister from './Components/NewRegister.tsx'
import ConsultRegister from"./Components/ConsultRegister.tsx"
import UpdateLogin from './Components/UpdateLogin.tsx';
import { AuthProvider } from './Context.tsx'

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import '@fontsource/poppins/300.css'

import '@fontsource/poppins/400.css'

import '@fontsource/poppins/500.css'

import '@fontsource/poppins/700.css'

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainMenu/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"newregister",
    element:<NewRegister/>
  },
  {
    path:"consultregister",
    element:<ConsultRegister/>
  },
  {
    path:"updatelogin",
    element:<UpdateLogin/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline/>
          <RouterProvider router={router}/>
        </AuthProvider>
      </ThemeProvider>
  </StrictMode>,
)
