const { Router } = require('express');
const router = Router();
const Groq = require("groq-sdk");
const config = require('../config');

const GROQ_API_KEY = config.GROQ_API_KEY;
const DEFAULT_MODEL = config.DEFAULT_MODEL;

const groq = new Groq({ apiKey: GROQ_API_KEY });

// async function verifyUserID(userID) {
//   const db = client.db('yourDatabase');
//   const collection = db.collection('users'); // Assuming collection is called 'users'
//   const user = await collection.findOne({ userID });
//   return !!user; // Return true if user exists
// }

async function verifyUserID(userID) {
  return userID === "exampleUserID";
}

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
    throw error;
  }
}

router.get('/', (req, res) => {
  res.json({ message: 'Back-end response.' });
});

// POST request sends a promt to the LLM and revieves a response
router.post('/', async (req, res) => {
  const { promt, userID } = req.body;

  if (!promt) {
    return res.status(400).json({ error: 'Prompt is empty.' });
  }

  // if (promt.length > 5000) {
  //   return res.status(400).json({ error: 'Prompt is too long.' });
  // }

  if (!userID || !(await verifyUserID(userID))) {
    return res.status(401).json({ error: 'Invalid userID.' });
  }

  try {
    const groqReply = await getGroqResponse(promt);
    res.json({ message: `User message: ${promt}`, reply: groqReply });
  }  catch (error) {
    console.error("Error in /api/messenger route:", error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

module.exports = router;