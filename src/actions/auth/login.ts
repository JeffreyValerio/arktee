"use server";

import { loginUser } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!email || !password) {
    return { error: "Email y contraseña son requeridos" };
  }

  try {
    const result = await loginUser(email, password);
    
    if (result.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Error al iniciar sesión. Por favor intenta de nuevo." };
  }
}

