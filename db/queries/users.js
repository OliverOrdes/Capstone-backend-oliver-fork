import db from "#db/client";

/** Creates a user. avatarType must be 'preset' or 'custom'. */
export async function createUser(username, avatarType, avatarValue) {
  const sql = `
  INSERT INTO users
    (username, avatar_type, avatar_value)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username, avatarType, avatarValue]);
  return user;
}

export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function getUserBySessionToken(sessionToken) {
  const sql = `
  SELECT *
  FROM users
  WHERE session_token = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [sessionToken]);
  return user;
}

export async function touchLastSeen(id) {
  const sql = `
  UPDATE users
  SET last_seen_at = now()
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
