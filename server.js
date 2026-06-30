// server.js — small backend that keeps your API key secret on the server
// and proxies chat requests from the frontend to Groq's free API.

const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.static(__dirname));

const API_KEY = process.env.GROQ_API_KEY;

if (!API_KEY) {
  console.warn('WARNING: GROQ_API_KEY is not set. Set it as an environment variable before running.');
}

app.post('/api/chat', async (req, res) => {
  try {
    const { system, messages } = req.body;
    if (!API_KEY) {
      return res.status(500).json({ error: 'Server is missing GROQ_API_KEY.' });
    }

    const groqMessages = [{ role: 'system', content: system }, ...messages];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: groqMessages
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Groq API error' });
    }

    // Normalize to the same shape the frontend expects (Anthropic-style content blocks)
    const text = data.choices?.[0]?.message?.content || '';
    res.json({ content: [{ type: 'text', text }] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sheet Assistant running on http://localhost:${PORT}`));

