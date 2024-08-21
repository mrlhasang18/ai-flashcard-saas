import React, { useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../components/ui/lamp";
import ToggleButton from "@/components/toggletheme";
import FeatureSection from "@/components/features-section";
import BackgroundGradientCard from "@/components/background-gradient-card";
import Navbar from "@/components/navbar";
import Link from "next/link";


export default function Landing() {
    return (
      <div>
        
        <Navbar className="top-5"/>
      <ToggleButton/> 
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Know your favourite<br /> superhero
        </motion.h1>
        
        <Link href="/generate">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Generate Flashcard
          </span>
        </button>
        </Link>
        <Link href="/flashcards">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Saved Flashcards
          </span>
        </button>
        </Link>
          <FeatureSection/>
        <BackgroundGradientCard/>
        
        </LampContainer>
        
      </div>
    );
  }