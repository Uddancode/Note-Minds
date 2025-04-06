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
            Transform your PDFs into interactive knowledge hubs! Our AI-powered platform extracts key insights, generates smart summaries, and creates interactive notes that help you learn faster and retain more information.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105">
              Start Your Journey
            </Link>
            <Link href="#features" className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105">
              Explore Features
            </Link>
          </div>
        </div>

        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Smart Pricing</h3>
            <p className="text-gray-600 dark:text-gray-300">Premium features at student-friendly prices. Start free, upgrade when you need more power.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-300">Process PDFs in seconds, not minutes. Our AI engine works at superhuman speed.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community Driven</h3>
            <p className="text-gray-600 dark:text-gray-300">Join a growing community of learners and researchers. Share insights and learn together.</p>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Note-Minds?</h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Advanced AI-powered summarization
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Interactive note-taking interface
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Real-time collaboration features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Cross-platform synchronization
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Pro Features</h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">★</span> Unlimited PDF processing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">★</span> Advanced AI analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">★</span> Priority support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">★</span> Custom templates
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
