"use server";

import { getCurrentUser } from "@/lib/auth";

export async function getCurrentUserAction() {
  try {
    const user = await getCurrentUser();
    return { user };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { user: null };
  }
}

