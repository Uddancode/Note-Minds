'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api' 
import Image from 'next/image'
import Link from 'next/link'
import { FileText, ExternalLink, Clock, Calendar, FileIcon } from 'lucide-react'

function Dashboard() {
  const {user} = useUser();
  const userFiles = useQuery(api.fileStorage.getUserFiles,
    {userEmail: user?.emailAddresses[0].emailAddress});
  
  return (
    <div className='space-y-6 pb-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>
            Your Documents
          </h1>
          <p className='text-gray-500 mt-2'>
            Manage and access your PDF files easily
          </p>
        </div>
      </div>

      {userFiles?.length === 0 && (
        <div className='bg-white rounded-xl p-8 text-center space-y-4'>
          <div className='flex justify-center'>
            <FileText className='h-12 w-12 text-gray-400' />
          </div>
          <h3 className='text-xl font-semibold text-gray-700'>No documents yet</h3>
          <p className='text-gray-500'>Upload your first PDF to get started</p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
        {userFiles ? userFiles.map((file, index) => (
          <Link href={'/workspace/'+file.fileId} key={index}>
            <div className='group relative perspective-1000 h-[120px]'>
              {/* Main Card */}
              <div className='relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                          transition-all duration-500 transform-gpu group-hover:shadow-xl 
                          group-hover:scale-105 group-hover:-rotate-2 z-10 h-full'>
                <div className='flex items-start space-x-4'>
                  <div className='relative h-14 w-14 shrink-0'>
                    <Image
                      src='/pdf.gif'
                      alt='PDF icon'
                      fill
                      className='object-contain'
                    />
                  </div>
                  <div className='flex-1 truncate'>
                    <h2 className='text-lg font-semibold text-gray-800 truncate'>
                      {file?.fileName}
                    </h2>
                    <p className='text-sm text-gray-500 mt-1'>
                      Added {new Date(file._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div className='absolute inset-0 opacity-0 invisible group-hover:visible group-hover:opacity-100 
                          transition-all duration-500 delay-150
                          transform translate-y-4 translate-x-2 rotate-2 scale-105 z-20'>
                <div className='bg-white rounded-xl p-6 shadow-2xl border border-gray-200'>
                  <div className='space-y-4'>
                    {/* Header */}
                    <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
                      <div className='flex items-center space-x-3'>
                        <FileIcon className='h-6 w-6 text-blue-500' />
                        <h3 className='font-semibold text-lg text-gray-800 truncate max-w-[200px]'>{file?.fileName}</h3>
                      </div>
                    </div>

                    {/* Details */}
                    <div className='space-y-3'>
                      <div className='flex items-center text-sm text-gray-600'>
                        <Calendar className='h-4 w-4 mr-2 shrink-0' />
                        <span>Created: {new Date(file._creationTime).toLocaleDateString()}</span>
                      </div>
                      <div className='flex items-center text-sm text-gray-600'>
                        <Clock className='h-4 w-4 mr-2 shrink-0' />
                        <span>Modified: {new Date(file._creationTime).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Preview Actions */}
                    <div className='flex items-center justify-end space-x-3 pt-4 border-t border-gray-100'>
                      <div className='text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors'>
                        <ExternalLink className='h-4 w-4' />
                        <span>Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )) : (
          // Loading state
          Array.from({length: 6}).map((_, index) => (
            <div key={index} className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[120px]'>
              <div className='animate-pulse flex space-x-4'>
                <div className='rounded-lg bg-gray-200 h-14 w-14'></div>
                <div className='flex-1 space-y-4 py-1'>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard