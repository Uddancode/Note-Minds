'use client'

import { useAuth } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useEffect } from 'react'

console.log("InitUser module loaded");

export default function InitUser() {
  console.log("InitUser component rendering");
  
  const { isLoaded: authLoaded, userId } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const createUser = useMutation(api.user.createUser);

  console.log("InitUser hooks initialized:", { authLoaded, userLoaded, userId });

  useEffect(() => {
    async function initUser() {
      console.log("InitUser effect running");
      
      if (!authLoaded || !userLoaded) {
        console.log("Still loading auth or user data...");
        return;
      }

      if (!userId || !user) {
        console.log("No authenticated user found");
        return;
      }

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error("User has no email address!");
        return;
      }

      console.log("Preparing to create/update user:", {
        userId,
        email,
        name: user.fullName,
      });

      try {
        const userData = {
          email,
          imageUrl: user.imageUrl || '',
          userName: user.fullName || '',
          phoneNumber: user.phoneNumbers?.[0]?.phoneNumber || '',
        };

        console.log("Calling createUser mutation with:", userData);
        const result = await createUser(userData);
        console.log("User creation/update completed:", result);
      } catch (error) {
        console.error("Failed to create/update user:", error);
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
    }

    console.log("Setting up InitUser effect");
    initUser();
  }, [authLoaded, userLoaded, userId, user, createUser]);

  return (
    <div style={{ display: 'none' }} data-testid="init-user">
      {console.log("InitUser component rendered")}
    </div>
  );
} 