'use client'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import InitUser from './components/InitUser'

console.log("Layout module initializing");

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
console.log("Convex client created with URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

export default function RootLayout({ children }) {
  console.log("RootLayout rendering");
  
  return (
    <html lang="en">
      <head>
        <title>Note Minds - AI-Powered PDF Note-Taking</title>
        <meta name="description" content="Your AI-powered PDF note-taking companion. Upload your PDFs, take smart notes, and let AI help you understand and organize your content better." />
      </head>
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        <ClerkProvider>
          <ConvexProvider client={convex}>
            <InitUser />
            {children}
          </ConvexProvider>
        </ClerkProvider>
      </body>
    </html>
  )
} 