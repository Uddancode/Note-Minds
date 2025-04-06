import React from 'react'

function PdfViewer({fileUrl}) {
  console.log(fileUrl);
  return (
    <div className="h-screen w-full">
      <iframe src={fileUrl+"#toolbar=0&navpanes=0&scrollbar=0"} width="100%" height="100%" className="rounded-lg shadow-md" style={{border: 'none'}}/>
    </div>
  )
}

export default PdfViewer