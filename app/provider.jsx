"use client"
import React from 'react'
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function provider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
        <ConvexProvider client={convex}>
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
            {children}
            </PayPalScriptProvider>
        </ConvexProvider>
    </div>
  )
}

export default provider