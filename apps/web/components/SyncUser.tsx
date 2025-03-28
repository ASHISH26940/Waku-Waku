"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

export default function SyncUser() {
  const { user } = useUser();
  const pubUrl="http://localhost:5555";
  if(!pubUrl){
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
  async function registerUser() {
    if (user) {
      const res = await axios.post(
        `${pubUrl}/api/v1/user`,
        {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }
      );
      if (res.data.success) {
        console.log("User registered successfully");
      } else {
        console.log("User registration failed", res.data.message);
      }
    }
  }

  useEffect(() => {
    if (user) {
      registerUser();
    }
  }, [user]);

  return null;
}
