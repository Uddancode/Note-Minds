import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import EditorExtension from './EditorExtension'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useEffect } from 'react'
function TextEditor({fileId}) {

    //save notes in the Database
    const notes = useQuery (api.notes.fetchNotes, {fileId})
    console.log(notes);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something for the notes ...',
            }),
            Highlight.configure({
                multicolor: true,
                HTMLAttributes: {
                    class: 'highlight',
                },
            }),
        ],
        
        editorProps: {
            attributes: {
                class: 'focus:outline-none border-none rounded-md shadow-md p-2 h-full',
            },
        },
      })

      useEffect(() => {
        if (editor) {
            editor&&editor.commands.setContent(notes);
        }
      }, [editor && notes]);

      
    return (
    <div>
        <EditorExtension editor={editor} />
        <div >
        <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TextEditor