"use client"

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "../convex/_generated/api";
import { useAction } from "convex/react";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const { user } = useUser();
  const createUser = useAction(api.user.createUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
        <Image src="/download.webp" alt="logo" width={100} height={100} className="dark:invert" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            <span className="text-red-500">PDF</span> <span className="text-blue-500">Note</span>-Taking
            <br />
            with <span className="text-emerald-500">AI</span>-Powered
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
            Elevate your note-taking experience with our AI-powered PDF app. Seamlessly extract key insights, summaries, and annotations from any PDF with just a few clicks
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105">
              Get started
            </Link>
            <Link href="#features" className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105">
              Learn more
            </Link>
          </div>
        </div>

        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">The lowest price</h3>
            <p className="text-gray-600 dark:text-gray-300">Get premium features at the most competitive price in the market.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">The fastest on the market</h3>
            <p className="text-gray-600 dark:text-gray-300">Experience lightning-fast PDF processing and note-taking capabilities.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">The most loved</h3>
            <p className="text-gray-600 dark:text-gray-300">Join thousands of satisfied users who love our intuitive interface.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
