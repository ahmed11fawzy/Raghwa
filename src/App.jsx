
import { useSelector } from 'react-redux'
import { CssBaseline,ThemeProvider } from '@mui/material'
import {createTheme} from '@mui/material/styles'
import './App.css'
import { themeSettings } from './Constants/them'
import { useMemo } from 'react'
import{ BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Pages/dashboard/Dashboard'
import Layout from './Pages/layout/Layout'
import Products from './Pages/Products/Products'
import Customers from './Pages/customers/Customers'
import Transaction from './Pages/transaction/Transaction'
import Geography from './Pages/geography/Geography'
import Overview from './Pages/overview/Overview'
import Daily from './Pages/daily/Daily'
import Monthly from './Pages/monthly/Monthly'
import Breakdown from './Pages/breakdown/Breakdown'
import Admin from './Pages/admin/Admin'
import Performance from './Pages/performance/Performance'
function App() {
  const mode=useSelector((state)=>state.theme.mode)
  console.log(mode)
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]) 


  return (
    <>  
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <CssBaseline/>
          <Routes>
            <Route element={<Layout/>} >
                <Route path='/' element={<Navigate to="/dashboard" replace  />} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/customers' element={<Customers/>} />
                <Route path='/transactions' element={<Transaction/>} />
                <Route path='/geography' element={<Geography />} />
                <Route path='/overview' element={<Overview />} />
                <Route path='/daily' element={<Daily />} />
                <Route path='/monthly' element={<Monthly />} />
                <Route path='/breakdown' element={<Breakdown />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/performance' element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
