const express = require('express');
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
async function getGroqResponse(userMessage) {
  try {
      const completion = await groq.chat.completions.create({
          messages: [
              {
                  role: "user",
                  content: userMessage,
              },
          ],
          model: "mixtral-8x7b-32768",
      });
      return completion.choices[0]?.message?.content || "No response from Groq";
  } catch (error) {
      console.error("Error with Groq API:", error);
      return "An error occurred while communicating with Groq";
  }
}

// Static message as response
router.get('/', (req, res) => {
  res.json({ message: 'Back-end response.' });
});

// Adding messages (POST-request)
router.post('/', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Please fill out this field' });
    }

    try {
      const groqReply = await getGroqResponse(text);

      res.json({ message: `User message: ${text}`, reply: groqReply });

    }
    catch (error){

    }

});

module.exports = router;