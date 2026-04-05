require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for Groq API (free tier)
// Accepts API key from .env OR from x-api-key request header (UI input)
app.post('/api/analyze', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY || req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(400).json({ error: 'API key not provided. Enter your Groq API key in the settings panel.' });
  }

  try {
    const { systemPrompt, userMessage } = req.body;

    const groqBody = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.3,
      max_tokens: 2048,
      response_format: { type: 'json_object' }
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(groqBody)
    });

    if (!response.ok) {
      const errBody = await response.text();
      process.stderr.write(`Groq API error [${response.status}]: ${errBody}\n`);
      let errMsg = 'API request failed';
      try {
        const errJson = JSON.parse(errBody);
        errMsg = errJson.error?.message || errMsg;
      } catch {}
      if (response.status === 401) errMsg = 'Invalid API key. Please check your key and try again.';
      return res.status(response.status).json({ error: errMsg });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    res.json({ text });
  } catch (err) {
    process.stderr.write(`Server error: ${err.message}\n`);
    res.status(502).json({ error: 'Failed to reach Groq API' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  process.stdout.write(`PQAL server running on http://localhost:${PORT}\n`);
});
