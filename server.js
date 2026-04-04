require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for Anthropic API
// Accepts API key from .env OR from x-api-key request header (UI input)
app.post('/api/analyze', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY || req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(400).json({ error: 'API key not provided. Enter your key in the settings panel.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errBody = await response.text();
      if (response.status === 401) {
        return res.status(401).json({ error: 'Invalid API key. Please check your key and try again.' });
      }
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach Anthropic API' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  process.stdout.write(`PQAL server running on http://localhost:${PORT}\n`);
});
