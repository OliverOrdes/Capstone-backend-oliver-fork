import { getUserById } from "#db/queries/users";

/**
 * Attaches the user to the request if a valid x-user-id header is provided.
 * No password/JWT — the client just resends the id it got back from
 * POST /users on every subsequent request.
 */
export default async function getUserFromHeader(req, res, next) {
  const userId = req.get("x-user-id");
  if (!userId) return next();

  if (!/^\d+$/.test(userId)) {
    return res.status(400).send("x-user-id header must be a numeric id.");
  }

  try {
    const user = await getUserById(userId);
    if (user) req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}
