import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || "change-this-to-a-random-secret-key-at-least-32-characters-long",
  cookieName: "arktee-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax" as const,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function saveSession(session: SessionData) {
  const cookieStore = await cookies();
  const ironSession = await getIronSession<SessionData>(cookieStore, sessionOptions);
  Object.assign(ironSession, session);
  await ironSession.save();
}

export async function destroySession() {
  const cookieStore = await cookies();
  const ironSession = await getIronSession<SessionData>(cookieStore, sessionOptions);
  ironSession.destroy();
}

