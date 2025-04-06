import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
//const pdfUrl = "https://valuable-aardvark-230.convex.cloud/api/storage/79a07540-b7f8-4fbb-8ff7-2c08c1b25377";


export async function GET(req) {

    const urlreq=req.url;
    const {searchParams} = new URL(urlreq);
    const pdfUrl = searchParams.get('pdfUrl');
    console.log('pdfUrl', pdfUrl);
    //1 loading the PDF file
    const response = await fetch(pdfUrl);
    const pdfData = await response.blob();
    const pdfLoader = new  WebPDFLoader(pdfData);
    const docs = await pdfLoader.load();

    let pdfText = '';
    docs.forEach((doc) => {
        pdfText += doc.pageContent;
    });

    //2 Splitting the PDF file into chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const chunks = await splitter.createDocuments([pdfText]);

    let splitterTextList = [];
    chunks.forEach((chunk) => {
        splitterTextList.push(chunk.pageContent);
    });

   
    
    
    return NextResponse.json({result: splitterTextList})
}