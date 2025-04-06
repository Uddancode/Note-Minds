'use client'
import React from 'react'
import { UserButton } from '@clerk/nextjs'  
import { useUser } from '@clerk/nextjs'

function Header() {
  const { user } = useUser();
  
  return (
    <div className='flex items-center justify-between px-8 h-16 bg-white border-b border-gray-100'>
      <div className='flex items-center gap-4'>
        <p className='text-gray-600'>Welcome back, <span className='font-medium text-gray-900'>{user?.firstName || 'User'}!</span></p>
      </div>
      <div className='flex items-center gap-4'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default Header