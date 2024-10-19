const Groq = require("groq-sdk");
const path = require('path');
const apiError = require("../api-error/api-error");

const config = require(path.join('..', 'config', 'config'));
const { GROQ_API_KEY, DEFAULT_MODEL } = config;

const groq = new Groq({ apiKey: GROQ_API_KEY });

const scheduleData = {
  "staticWeek": [
    {
      "day": "Пн",
      "events": [
        {
          "eventInfo": {
            "_id": "66e95ef32b87652b3fdcbee8",
            "teacherName": "Сюди потім якось автоматично підкручу",
            "name": "Додаткова пара Пархоменко",
            "type": "Лабораторна",
            "tag": "lab",
            "__v": 0
          },
          "eventDate": {
            "_id": "66e95ef32b87652b3fdcbeea",
            "countWeek": "0",
            "day": "Пн",
            "time": "10:30",
            "duration": 60,
            "data": [],
            "__v": 0
          },
          "_id": "66e95ef72b87652b3fdcbeec"
        }
      ],
      "_id": "66e95ee52b87652b3fdcbed1"
    },
    {
      "day": "Вв",
      "events": [],
      "_id": "66e95ee52b87652b3fdcbed2"
    },
    {
      "day": "Ср",
      "events": [],
      "_id": "66e95ee52b87652b3fdcbed3"
    },
    {
      "day": "Чт",
      "events": [],
      "_id": "66e95ee52b87652b3fdcbed4"
    },
    {
      "day": "Пт",
      "events": [],
      "_id": "66e95ee52b87652b3fdcbed5"
    },
    {
      "day": "Сб",
      "events": [
        {
          "eventInfo": {
            "_id": "66fa8c36ee1d9f2df14a53a7",
            "teacherName": "Програмування на базі LLM систем",
            "name": "Додаткова пара Пархоменко",
            "type": "Лабораторна",
            "tag": "lab",
            "__v": 0
          },
          "eventDate": {
            "_id": "66fa8c38ee1d9f2df14a53a9",
            "countWeek": "0",
            "day": "Сб",
            "time": "12:00:00",
            "duration": 60,
            "data": [],
            "__v": 0
          },
          "_id": "66fa8c3bee1d9f2df14a53ab"
        }
      ],
      "_id": "66e95ee52b87652b3fdcbed6"
    },
    {
      "day": "Вс",
      "events": [],
      "_id": "66e95ee52b87652b3fdcbed7"
    }
  ],
  "dateNow": "${time}" //new Date().toISOString()
}

const generatePrompt = (question) => {
  const data = JSON.stringify(scheduleData);
  return `По наступним даним ${data} допоможи з наступним питанням: ${question} та Впевнись, що повертаєш тільки текстову відповідь без додаткових уточнень та тексту`;
};

module.exports = {
  getGroqResponse: async (userMessage, model = DEFAULT_MODEL) => {
    try {
      const promt = generatePrompt(userMessage);

      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: promt }],
        model: model,
      });

      return completion.choices[0]?.message?.content || "No response from Groq";
    } catch (e) {
      next(new apiError(403, 4032, e.details[0].message));
      return;
    }
  }
};