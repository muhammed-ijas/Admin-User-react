import React from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner';
import AdminHeader from './components/header/adminHeader';
import AdminHero from './components/hero/AdminHero';


function Admin() {
    return (
        <ThemeProvider>
            <div className='w-full h-full'>
                <Toaster position="top-center" duration={2000} />
                <AdminHeader />
                <Outlet/>
            </div>
        </ThemeProvider>
    )
}

export default Admin
