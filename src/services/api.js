import axios from 'axios';

const LOCAL_API_URL = "http://localhost:3001/api/chat";

export const chatWithAI = async (message) => {
  try {
    const response = await axios.post(LOCAL_API_URL, {
      messages: [{ 
        role: "user", 
        content: message 
      }]
    });

    if (!response.data || !response.data.choices) {
      throw new Error('Invalid API response');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.details || error.message);
  }
}; 