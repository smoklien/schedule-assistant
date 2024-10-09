const express = require('express');
const Groq = require("groq-sdk");
const router = express.Router();
const config = require('../config');

const GROQ_API_KEY = config.GROQ_API_KEY;
const DEFAULT_MODEL = config.DEFAULT_MODEL;

const groq = new Groq({ apiKey: GROQ_API_KEY });

// async function main() {
//   const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
//   console.log(chatCompletion.choices[0]?.message?.content || "");
// }

// async function getGroqChatCompletion() {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: "Explain the importance of fast language models",
//       },
//     ],
//     model: "llama3-8b-8192",
//   });
// }

// Function to send a message to Groq's LLM
async function getGroqResponse(promt, model = DEFAULT_MODEL) {
  try {
      const completion = await groq.chat.completions.create({
          messages: [
              {
                  role: "user",
                  content: promt,
              },
          ],
          model: model,
      });

      // console.log(completion);

      return completion.choices[0]?.message?.content || "No response from Groq";
  } catch (error) {
      console.error("Error with Groq API:", error);
      return "An error occurred while communicating with Groq";
  }
}

// GET request
router.get('/', (req, res) => {
  res.json({ message: 'Back-end response.' });
});

// POST request sends a promt to the LLM and revieves a response
router.post('/', async (req, res) => {
    const { promt } = req.body;
    if (!promt) {
        return res.status(400).json({ error: 'Please fill out this field' });
    }

    try {
      const groqReply = await getGroqResponse(promt);

      res.json({ message: `User message: ${promt}`, reply: groqReply });
    }
    catch (error){
      console.error("Error in /api/messenger route:", error);
      res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;