'use client'
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Undo, Redo, Highlighter, Download, Sparkle } from 'lucide-react';
import React, { useState } from 'react'
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { useAction, useMutation } from 'convex/react';

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { chatSession } from '../../../configs/AllModel';
import { useUser } from '@clerk/nextjs';
import { api } from '../../../convex/_generated/api'; 

function EditorExtension({editor}) {
  const [showHighlightColors, setShowHighlightColors] = useState(false);
  
  const handleDownload = async () => {
    if (!editor) return;

    const content = editor.getHTML();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "Calibri",
            },
            paragraph: {
              spacing: {
                line: 360,
                before: 200,
                after: 200,
              },
            },
          },
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 36,
              bold: true,
              color: "2F5496",
              font: "Calibri",
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120,
              },
            },
          },
        ],
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000,
            },
          },
        },
        children: []
      }]
    });

    const elements = tempDiv.children;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      
      if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
        const level = parseInt(element.tagName[1]);
        const paragraph = new Paragraph({
          text: element.textContent,
          heading: HeadingLevel[`HEADING_${level}`],
          spacing: {
            before: 400,
            after: 200,
          },
        });
        doc.addSection({ children: [paragraph] });
      } else if (element.tagName === 'P') {
        const runs = [];
        const processNode = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const parentElement = node.parentElement;
            const color = parentElement?.style?.color;
            const backgroundColor = parentElement?.style?.backgroundColor;
            
            // Skip if color is 'inherit' or undefined
            const textColor = color && color !== 'inherit' ? color.replace('#', '') : undefined;
            const highlightColor = backgroundColor && backgroundColor !== 'inherit' ? backgroundColor.replace('#', '') : undefined;

            runs.push(new TextRun({
              text: node.textContent,
              bold: parentElement?.tagName === 'STRONG' || parentElement?.tagName === 'B',
              italics: parentElement?.tagName === 'EM' || parentElement?.tagName === 'I',
              underline: parentElement?.tagName === 'U',
              color: textColor,
              highlight: highlightColor,
            }));
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.childNodes).forEach(processNode);
          }
        };
        processNode(element);
        const paragraph = new Paragraph({
          children: runs,
          spacing: {
            line: 360,
            before: 200,
            after: 200,
          },
        });
        doc.addSection({ children: [paragraph] });
      } else if (element.tagName === 'UL' || element.tagName === 'OL') {
        const listItems = element.querySelectorAll('li');
        listItems.forEach(item => {
          const paragraph = new Paragraph({
            text: item.textContent,
            bullet: element.tagName === 'UL',
            numbering: element.tagName === 'OL' ? {
              reference: "my-numbering",
              level: 0,
            } : undefined,
            spacing: {
              line: 360,
              before: 100,
              after: 100,
            },
          });
          doc.addSection({ children: [paragraph] });
        });
      }
    }

    const blob = await Packer.toBlob(doc);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `document-${timestamp}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  //AI Search
  const {fileId} = useParams();
  const Searchai=useAction(api.myAction.search);
  const SaveNotes=useMutation(api.notes.SaveNotes); 
  
  const {user}=useUser();
  const onAiSelect = async () => {
    if (!editor) return;
    
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');
    console.log("selectedText", selectedText);

    const response = await Searchai({
      query: selectedText,
      fileId: fileId
    });
    console.log("Unformatted AI Response:", response);

    // No need to parse JSON since response is already in the correct format
    let ans = '';
    response.forEach(element => {
      ans += element;
    });

    const PROMPT = `
    You are a helpful assistant that can answer questions and help with tasks.
    You are given a question and a context.
    You need to answer the question in brief and crisp based on the context in HTML format.
    Question: ${selectedText}
    Context: ${ans}
    `;

   
      const result = await chatSession.sendMessage(PROMPT);
      const res = await result.response;
      console.log("AI Response:", res.text());
      const finalres=res.text().replace('```','').replace('html','').replace('```',''); //final answer is being stored 
      const Text=editor.getHTML();
      editor.commands.setContent(Text+'<p><strong>Ans:</strong>' + finalres + '</p>');
      SaveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
  };

  const highlightColors = [
    { name: 'Yellow', color: '#fef08a' },
    { name: 'Green', color: '#bbf7d0' },
    { name: 'Blue', color: '#bfdbfe' },
    { name: 'Pink', color: '#fbcfe8' },
    { name: 'Purple', color: '#e9d5ff' },
  ];

  const buttonBaseStyle = "p-2 rounded-md hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-center min-w-[40px] h-[40px]";
  const activeButtonStyle = "bg-gray-200 hover:bg-gray-300";
  const aiButtonStyle = "p-2 rounded-md hover:bg-purple-100 transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-center min-w-[40px] h-[40px] text-purple-600";

  return editor && (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex gap-2">
        <div className="flex gap-2">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${buttonBaseStyle} ${editor.isActive('bold') ? activeButtonStyle : ''}`} title="Bold (Ctrl+B)">
            <Bold size={20} />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${buttonBaseStyle} ${editor.isActive('italic') ? activeButtonStyle : ''}`} title="Italic (Ctrl+I)">
            <Italic size={20} />
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${buttonBaseStyle} ${editor.isActive('underline') ? activeButtonStyle : ''}`} title="Underline (Ctrl+U)">
            <Underline size={20} />
          </button>
          <div className="relative">
            <button onClick={() => setShowHighlightColors(!showHighlightColors)} className={`${buttonBaseStyle} ${editor.isActive('highlight') ? activeButtonStyle : ''}`} title="Text Highlight">
              <Highlighter size={20} />
            </button>
            {showHighlightColors && (
              <div className="absolute top-0 right-0 mt-2 p-2 bg-white rounded-md shadow-lg z-10">
                <div className="flex flex-col gap-2">
                  {highlightColors.map(({ name, color }) => (
                    <button key={name} onClick={() => {
                      editor.chain().focus().setHighlight({ color }).run();
                      setShowHighlightColors(false);
                    }} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all duration-200" title={`Highlight with ${name}`}>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                      <span className="text-sm">{name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${buttonBaseStyle} ${editor.isActive('bulletList') ? activeButtonStyle : ''}`} title="Bullet List">
            <List size={20} />
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${buttonBaseStyle} ${editor.isActive('orderedList') ? activeButtonStyle : ''}`} title="Numbered List">
            <ListOrdered size={20} />
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`${buttonBaseStyle} ${editor.isActive({ textAlign: 'left' }) ? activeButtonStyle : ''}`} title="Align Left">
            <AlignLeft size={20} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`${buttonBaseStyle} ${editor.isActive({ textAlign: 'center' }) ? activeButtonStyle : ''}`} title="Align Center">
            <AlignCenter size={20} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`${buttonBaseStyle} ${editor.isActive({ textAlign: 'right' }) ? activeButtonStyle : ''}`} title="Align Right">
            <AlignRight size={20} />
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => editor.chain().focus().undo().run()} className={buttonBaseStyle} title="Undo (Ctrl+Z)">
            <Undo size={20} />
          </button>
          <button onClick={() => editor.chain().focus().redo().run()} className={buttonBaseStyle} title="Redo (Ctrl+Y)">
            <Redo size={20} />
          </button>
        </div>

        <button onClick={onAiSelect} className={aiButtonStyle} title="Generate AI Notes">
          <Sparkle size={20} />
        </button>
      </div>

      <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-all duration-200 ease-in-out" title="Download as DOCX">
        <Download size={20} />
        <span className="font-medium">DOCX</span>
      </button>
    </div>
  );
}

export default EditorExtension;
