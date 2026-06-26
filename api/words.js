import express from "express";
const router = express.Router();
export default router;

import { listWords, createWord } from "#db/queries/words";
import requireBody from "#middleware/requireBody";

router.route("/").get(async (req, res) => {
  const words = await listWords();
  res.send(words);
});

router.route("/").post(requireBody(["text"]), async (req, res) => {
  const { text, category, difficulty } = req.body;
  const word = await createWord(text, category, difficulty);
  if (!word) return res.status(400).send("Word already exists.");
  res.status(201).send(word);
});
