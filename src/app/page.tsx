"use client";
import React, { useState } from "react";
import Head from "next/head";
import Landing from "./landingpage/landing";


export default function Home()
{
  return (
    <div>
      <Head>
        <title>SuperHero Flashcards</title>
        <meta name="description" content="custom flashcards for your superhero."></meta>
      </Head>
      <Landing/>
      
      
    </div>
  ) 
}