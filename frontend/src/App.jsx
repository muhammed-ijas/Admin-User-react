import React from 'react'
import Header from './components/header/header'
import { ThemeProvider } from "@/components/theme-provider"
import Home from './pages/Home'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner';


function App() {
  return (
    <ThemeProvider>
      <div className='w-full h-full'>
        <Toaster position="top-center" duration={2000} />
        <Header />
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
