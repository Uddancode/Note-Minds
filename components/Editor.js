'use client'
import React from 'react'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Undo,
  Redo,
} from 'lucide-react'

function Editor() {
  return (
    <div className='flex flex-col h-full'>
      {/* Toolbar */}
      <div className='bg-white border-b border-gray-200 sticky top-0'>
        <div className='flex items-center gap-1 p-2'>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Bold className='w-5 h-5' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Italic className='w-5 h-5' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Underline className='w-5 h-5' />
          </button>
          <div className='w-px h-6 bg-gray-200 mx-2' />
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Heading1 className='w-5 h-5' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Heading2 className='w-5 h-5' />
          </button>
          <div className='w-px h-6 bg-gray-200 mx-2' />
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <List className='w-5 h-5' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <ListOrdered className='w-5 h-5' />
          </button>
          <div className='w-px h-6 bg-gray-200 mx-2' />
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <LinkIcon className='w-5 h-5' />
          </button>
          <div className='flex-1' />
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Undo className='w-5 h-5' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Redo className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className='flex-1 p-4'>
        <div 
          className='min-h-[500px] w-full p-4 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
          contentEditable={true}
          suppressContentEditableWarning={true}
          placeholder='Start writing your notes...'
        />
      </div>
    </div>
  )
}

export default Editor 