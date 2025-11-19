// api/claude.js - Vercel Serverless Function
import fs from 'fs';
import path from 'path';

// Load master instructions once at cold start
const masterInstructions = fs.readFileSync(
  path.join(process.cwd(), 'api', 'master-instructions.md'),
  'utf-8'
);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get API key from environment variable (set in Vercel dashboard)
    const api_key = process.env.ANTHROPIC_API_KEY;
    
    if (!api_key) {
      console.error('ANTHROPIC_API_KEY environment variable not set');
      return res.status(500).json({ error: 'Server configuration error - API key not configured' });
    }
    
    const { messages, isInitialRequest } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }
    
    console.log(`Processing request with ${messages.length} messages`);
    
    // If this is the initial request (first message with lesson plan),
    // prepend the master instructions
    let processedMessages = messages;
    if (isInitialRequest && messages.length === 1) {
      const lessonPlan = messages[0].content;
      processedMessages = [{
        role: 'user',
        content: `${masterInstructions}\n\n---\n\nHere is the lesson plan to adapt:\n\n${lessonPlan}`
      }];
      console.log('Added master instructions to initial request');
    }
    
    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': api_key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: processedMessages
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json(data);
    }
    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
