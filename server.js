require('dotenv').config({ path: '.env.server' });
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const apiResponse = await axios({
      method: 'post',
      url: 'https://api.deepseek.com/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        model: "deepseek-chat",
        messages: req.body.messages,
        temperature: 0.7,
        max_tokens: 2000
      }
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      error: 'API request failed',
      message: error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 