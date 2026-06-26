import db from "#db/client";

export async function getRandomWords(count = 3, category = null) {
  const sql = category
    ? `SELECT * FROM words WHERE category = $2 ORDER BY random() LIMIT $1`
    : `SELECT * FROM words ORDER BY random() LIMIT $1`;
  const params = category ? [count, category] : [count];
  const { rows } = await db.query(sql, params);
  return rows;
}

export async function getWordById(id) {
  const sql = `SELECT * FROM words WHERE id = $1`;
  const {
    rows: [word],
  } = await db.query(sql, [id]);
  return word;
}

export async function createWord(text, category = "general", difficulty = 1) {
  const sql = `
  INSERT INTO words
    (text, category, difficulty)
  VALUES
    ($1, $2, $3)
  ON CONFLICT (text) DO NOTHING
  RETURNING *
  `;
  const {
    rows: [word],
  } = await db.query(sql, [text, category, difficulty]);
  return word;
}

export async function listWords() {
  const sql = `SELECT * FROM words ORDER BY text ASC`;
  const { rows } = await db.query(sql);
  return rows;
}
