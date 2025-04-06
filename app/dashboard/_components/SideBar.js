'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '../../../components/ui/button'
import { Crown, LayoutDashboardIcon, PlusCircle } from 'lucide-react'
import { Progress } from '../../../components/ui/progress'
import UploadPdf from './UploadPdf'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useRouter, usePathname } from 'next/navigation'
import { useMutation } from 'convex/react'
import { v } from 'convex/values'
import Link from 'next/link'

function SideBar() {
    const {user} = useUser();
    const files = useQuery(api.fileStorage.getUserFiles,{
        userEmail:user?.primaryEmailAddress?.emailAddress
    })
    const userData = useQuery(api.user.getUserByEmail,{
        email:user?.primaryEmailAddress?.emailAddress
    })
    
    const router = useRouter();
    const createFile = useMutation(api.fileStorage.createFile);
    const pathname = usePathname();

    return (
        <div className='flex flex-col gap-4'>
            <Image src="/download.webp" alt="logo" width={100} height={100} />
            <div className='flex flex-col gap-4'>
               
                <UploadPdf isMax={(files?.length>=10 && userData?.isPro)?true:false} >
                    <Button className='w-full'>
                        + Upload Your PDF File 
                    </Button>
                </UploadPdf>
                <Link href='/dashboard'>
                <div className={`flex items-center gap-2 p-3 mt-3 hover:bg-gray-200 rounded-md cursor-pointer 
                    ${pathname==='/dashboard'&&'bg-gray-200'}`}>
                    <LayoutDashboardIcon />
                    <h1 className='text-lg font-bold'>Dashboard</h1>    
                </div>
                </Link>
                <Link href='/dashboard/upgrade'>
                <div className={`flex items-center gap-2 p-3 mt-3 hover:bg-yellow-100 rounded-md cursor-pointer 
                    ${pathname==='/dashboard/upgrade'&&'bg-yellow-100'}`}>
                    <Crown className='w-5 h-5 text-yellow-600' />
                    <h1 className='text-lg font-bold text-yellow-600'>Upgrade to Pro</h1>    
                </div>
                </Link>
            </div>
            <div className='absolute bottom-8 w-[85%] mx-auto p-4 bg-gray-50 rounded-lg shadow-sm'>
                <Progress value={(files?.length/10)*10} className="h-2 mb-2" />
                <p className='text-sm text-gray-600 font-medium mb-1'>{(files?.length/10)*10} out of 10 credits used</p>
                <p className='text-sm text-blue-600 hover:text-blue-700 cursor-pointer'>Update your credit plan</p>
            </div>
        </div>
    )
}

export default SideBar