import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../components/ui/lamp";
import ToggleButton from "@/components/toggletheme";
import FeatureSection from "@/components/features-section";
import BackgroundGradientCard from "@/components/background-gradient-card";
import Navbar from "@/components/navbar";
import Link from "next/link";

const PricingCard = ({ title, price, features, buttonText, isPopular }) => (
  <div className={`bg-slate-900 p-6 rounded-lg shadow-lg ${isPopular ? 'border-2 border-blue-500' : ''}`}>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-4">${price}<span className="text-sm font-normal">/month</span></p>
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          {feature}
        </li>
      ))}
    </ul>
    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
      {buttonText}
    </button>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
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
        
        <div className="flex justify-center space-x-4 mt-8">
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
        </div>

        <FeatureSection/>

        <div className="mt-20 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Simple and Affordable Pricing Plans</h2>
          <p className="text-center mb-8 text-slate-400">Start tracking and improving your finance management</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <PricingCard
              title="Free"
              price="0"
              features={[
                "Account Aggregation",
                "Expense Tracking",
                "Budgeting Tools",
                "Transaction Insights",
                "Basic Security"
              ]}
              buttonText="Start for Free"
            />
            <PricingCard
              title="Professional"
              price="98"
              features={[
                "Everything in Free",
                "Customizable Dashboards",
                "Advanced Budgeting",
                "Investment Tracking",
                "Enhanced Security"
              ]}
              buttonText="Sign Up with Professional"
              isPopular={true}
            />
            <PricingCard
              title="Enterprise"
              price="160"
              features={[
                "Financial Planning Tools",
                "Priority Support",
                "Premium Widgets",
                "Advanced Security",
                "Integration with 3rd-Party Services"
              ]}
              buttonText="Sign Up with Enterprise"
            />
          </div>
        </div>

        <BackgroundGradientCard/>
      </LampContainer>
    </div>
  );
}