import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
function WorkSpaceHeader({fileName}) {
  return (
    <div className='flex items-center justify-between shadow-md p-2'>
        <Image src={'/download.webp'} alt='logo ' width={100} height={150} />
        <h1 className='text-2xl font-bold'>{fileName}</h1>
         <UserButton />
    </div>
  )
}

export default WorkSpaceHeader