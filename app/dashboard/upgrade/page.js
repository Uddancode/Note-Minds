'use client'
import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import ThemeToggle from '../../components/ThemeToggle';

const PRICE_IN_INR = 830; // ₹830 INR (equivalent to approximately $9.99 USD)

function UpgradePlans() {
  const updateUserToPro = useAction(api.user.updateUserToPro);
  const {user} = useUser();
  const onPaymentSuccess = () => {
    console.log('Payment successful')
    updateUserToPro({email:user?.emailAddresses[0].emailAddress})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <h2 className='text-2xl font-bold mb-2 text-gray-900 dark:text-white'>Choose Your Plan</h2>
      <p className='text-gray-600 dark:text-gray-300 mb-6'>Unlock more features and storage for your PDF notes</p>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          <div
            className="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12 bg-white dark:bg-gray-800"
          >
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Pro
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">₹{PRICE_IN_INR}</strong>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">/month</span>
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                (Approximately $9.99 USD)
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Unlimited PDF uploads</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Advanced AI note generation</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Priority support</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Collaborative note sharing</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Enhanced search capabilities</span>
              </li>
            </ul>

            <div className='mt-8'>
              <PayPalButtons
                style={{
                  color: "blue",
                  layout: "horizontal",
                  height: 48,
                  tagline: false,
                  shape: "pill"
                }}
                onApprove={() => {
                  onPaymentSuccess()
                }}
                onCancel={()=>console.log('Payment cancelled')}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: (PRICE_IN_INR / 83).toFixed(2), // Convert INR to USD for PayPal (approximate conversion)
                        currency_code: 'USD',
                        breakdown: {
                          item_total: {
                            currency_code: 'USD',
                            value: (PRICE_IN_INR / 83).toFixed(2)
                          }
                        }
                      },
                      description: 'Note Minds Pro Subscription',
                      items: [{
                        name: 'Note Minds Pro Monthly Subscription',
                        description: 'Monthly subscription to Note Minds Pro features',
                        unit_amount: {
                          currency_code: 'USD',
                          value: (PRICE_IN_INR / 83).toFixed(2)
                        },
                        quantity: '1'
                      }]
                    }]
                  })
                }}
              />
              <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                *Price shown in USD for PayPal payment
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm sm:px-8 lg:p-12 bg-white dark:bg-gray-800">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Free
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">₹0</strong>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">10 PDF uploads per month</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Basic AI note generation</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Community support</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 dark:text-indigo-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Basic search functionality</span>
              </li>
            </ul>

            <div
              className="mt-8 block rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-12 py-3 text-center text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Current Plan
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradePlans