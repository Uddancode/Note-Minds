'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import WorkSpaceHeader from '../_components/WorkSpaceHeader'
import PdfViewer from '../_components/PdfViewer'
import TextEditor from '../_components/TextEditor'
import { useEffect } from 'react'

function Workspace() {
  const { fileId } = useParams()
  const fileinfo = useQuery(api.fileStorage.getPdfFile, { fileId: fileId })

  useEffect(() => {
    console.log(fileinfo)
  }, [fileinfo])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <WorkSpaceHeader fileName={fileinfo?.fileName}/>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 overflow-hidden">
        <div className="overflow-auto">
          <TextEditor fileId={fileId} />
        </div>
        <div className="h-full overflow-hidden">
          {fileinfo && <PdfViewer fileUrl={fileinfo.fileUrl} />}
        </div>
      </div>
    </div>
  )
}

export default Workspace