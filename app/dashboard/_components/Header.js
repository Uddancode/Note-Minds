'use client'
import React from 'react'
import { UserButton } from '@clerk/nextjs'  
import { useUser } from '@clerk/nextjs'
import ThemeToggle from '../../components/ThemeToggle'

function Header() {
  const { user } = useUser();
  
  return (
    <div className='flex items-center justify-between px-8 h-16 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700'>
      <div className='flex items-center gap-4'>
        <div className='flex flex-col'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Hey there, <span className='font-semibold text-gray-900 dark:text-white'>{user?.fullName || 'Explorer'}!</span>
          </p>
          <p className='text-xs text-gray-400 dark:text-gray-500'>
            Ready to transform your PDFs into smart notes?
          </p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default Header