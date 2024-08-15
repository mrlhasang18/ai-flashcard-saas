"use client";
import React, { useState } from "react";
import Head from "next/head";
import Landing from "./landingpage/landing";


export default function Home()
{
  return (
    <div>
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="This is an app where you can make custom flashcards for your superhero."></meta>
      </Head>
      <Landing/>
      
      
    </div>
  ) 
}