"use client"
import {ClerkProvider, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Generate() {
    return (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <InnerGenerate />
      </ClerkProvider>
    );
  }
  

  function InnerGenerate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();
  
    const handleSubmit = async () => {
      // function for flashcard generation from the prompt
    };
  
  }