import React from 'react'
import Header from './_components/Header'
import SideBar from './_components/SideBar'

function DashboardLayout({children}) {
  return (
    <div className='flex min-h-screen bg-gray-50'>
        <div className='w-1/6 h-screen bg-gray-100 fixed'> 
            <SideBar />
        </div>
        <div className='flex-1 ml-[16.666667%]'>
          <Header />
          <main className='p-8'>
            {children}
          </main>
        </div>
    </div>
  )
}
export default DashboardLayout