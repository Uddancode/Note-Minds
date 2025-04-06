'use client'
import React, { useState }  from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../components/ui/dialog"
  import { Input } from "../../../components/ui/input"
  import { Button } from "../../../components/ui/button"
  import { DialogFooter } from "../../../components/ui/dialog"
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useAction } from 'convex/react'
  
function  UploadPdf({children,isMax}) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const insertPdfFile = useMutation(api.fileStorage.savePdffile);
  const getPdfUrl = useMutation(api.fileStorage.getPdfUrl);
  const embed = useAction(api.myAction.ingest);

  const {user} = useUser(); 
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [open, setOpen] = useState(false);

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  }

  const handleUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
     // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log('storageId', storageId);
    const fileId = uuidv4();
    const url = await getPdfUrl({fileId: fileId, storageId: storageId});
    // Step 3: Save the newly allocated storage id to the database
    const response = await insertPdfFile({
      fileId:fileId,
      storageId:storageId,
      fileName: fileName??'Untitled PDF File',
      createdBy: user?.primaryEmailAddress?.emailAddress,
      fileUrl:url,
    });
    // console.log('response', response);
    
    //Call the PDF loader API
    const pdfLoaderResponse = await axios.get('/api/pdf-loader?pdfUrl='+url);
    console.log('pdfLoaderResponse', pdfLoaderResponse.data.result);
     await embed({
      splitText:pdfLoaderResponse.data.result,
      fileId:fileId,
    }); 
    //console.log('embededresult', embededresult);
    setLoading(false);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button onClick={() => setOpen(true)} disabled={isMax} className='w-full '>
    + Upload Your PDF File
    </Button>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload Your PDF File</DialogTitle>
      <DialogDescription asChild>
        <div>
          <div className='flex flex-col gap-4 items-center justify-center'>
            
            <input 
              type="file" 
              accept=".pdf"
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
                onChange={(event) => onFileChange(event)}
            />
          </div>
          <div>
            <label>
              File Name
            </label>
            <Input type="text" placeholder="Enter File Name"  onChange={(event) => setFileName(event.target.value)}/>
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit" onClick={handleUpload} disabled={loading}>
        {loading ? 
          <Loader2Icon className='w-4 h-4 animate-spin' />
        :
          'Upload'
      }
      </Button>
      <Button type="button" variant="outline">Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default UploadPdf