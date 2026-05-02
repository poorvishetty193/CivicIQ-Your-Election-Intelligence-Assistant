import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const geminiFlash = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
export const geminiChat = () => geminiFlash.startChat({ history: [] });
