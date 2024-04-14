import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

// Extract the API key from environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Initialize OpenAI with the API key
export const openai = new OpenAI({
  apiKey,
});
