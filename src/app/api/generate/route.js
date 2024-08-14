import { NextResponse } from "next/server";
import {GoogleGenerativeAI} from "@google/generative-ai"

//Put this to wherever you want to generate the prompt



export async function POST(req, res){
    try{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({model: "gemini-1.5-pro-latest"})
        const data = await req.json()
        const systemPrompt = data.body
        const result = await model.generateContent(systemPrompt)
        const response = await result.response
        const output = await response.text()
        

        return NextResponse.json({output: output})
    }
    catch(error)
    {
        console.error(error)
    }
}