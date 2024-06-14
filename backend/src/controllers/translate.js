import translate from "@iamtraction/google-translate";
import comment from "../models/comment.js";
import OpenAI from "openai";
import synonyms from 'synonyms';
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export const translateControllers = {
  handleTranslateUsingOpenAI: async (req, res) => {
    try {
      const { option, origin_lang, text } = req.body;
      let example_object = {
        word: "Love",
        meaning: "Amor",
        pronunciation: "/lʌv/",
        synonyms: ["Affection", "Fondness", "Devotion"],
        example_sentences: [
          "She felt a deep love for her family.",
          "Love can bring people together in times of need.",
        ],
      };
      let prompt = `Provide the following information for the given word as a JSON object:\
        Meaning in ${option}\
        Pronunciation in ${origin_lang}\
        Synonyms in ${origin_lang}\
        Example Sentences in ${origin_lang} (2 sentences)\
        Word: ${text}\
        Output must follow the json object in example below, key of json object must be the same\
        json\
        ${JSON.stringify(example_object)}`;
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful translator." },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
      });
      console.log(chatCompletion.choices[0].message.content);
      return res.status(200).json(chatCompletion.choices[0].message.content);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  handelTranslateByUser: async (req, res) => {
    try {
      const { option, text } = req.body;
      if (option == "en") {
        translate(text, { from: "en", to: "vi" })
          .then((data) => {
            console.log(data.text);
            console.log(data.from.autoCorrected); // OUTPUT: true
            console.log(data.from.text.value); // OUTPUT: [Thank] you
            console.log(data.from.text.didYouMean); // OUTPUT: false
            return res.status(200).json({
              en: text,
              vi: data.text,
            }); // OUTPUT
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (option == "vi") {
        translate(text, { from: "vi", to: "en" })
          .then((data) => {
            console.log(data.text);
            console.log(data.from.autoCorrected); // OUTPUT: true
            console.log(data.from.text.value); // OUTPUT: [Thank] you
            console.log(data.from.text.didYouMean); // OUTPUT: false
            return res.status(200).json({
              vi: text,
              en: data.text,
            }); // OUTPUT
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  commentTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      if (!message) {
        return res.status(500).json({
          message: "message not found",
        });
      }
      const data = new comment({
        idUser: id,
        nameComment: message,
      }).save();
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllComment: async (req, res) => {
    try {
      const data = await comment.find({}).populate("idUser");
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getIdComment: async (req, res) => {
    try {
      const data = await comment.findById(req.params.id).populate("idUser");
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
