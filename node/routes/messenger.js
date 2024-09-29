const express = require('express');
const router = express.Router();

// Static message as response
router.get('/', (req, res) => {
  res.json({ message: 'Back-end response.' });
});

// Adding messages (POST-request)
router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Please fill out this field' });
    }
    res.json({ message: `User message: ${text}`, reply: 'LLM response' });
});


// // Default
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// async function main() {
//   const completion = await groq.chat.completions
//     .create({
//       messages: [
//         {
//           role: "user",
//           content: "Explain the importance of fast language models",
//         },
//       ],
//       model: "mixtral-8x7b-32768",
//     })
//     .then((chatCompletion) => {
//       console.log(chatCompletion.choices[0]?.message?.content || "");
//     });
// }

// main();


module.exports = router;