"use server";

import { createPasswordResetToken, resetPassword } from "@/lib/auth";

export async function requestPasswordResetAction(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "El email es requerido" };
  }

  try {
    const result = await createPasswordResetToken(email);
    
    if (result.error) {
      return { error: result.error };
    }

    // In a real app, you would send an email here with the token
    // For now, we'll return the token (remove this in production!)
    return { 
      success: true, 
      token: result.token, // Remove this in production - only for testing
      message: "Token generado. En producción, esto se enviaría por email." 
    };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "Error al solicitar el restablecimiento de contraseña." };
  }
}

export async function resetPasswordAction(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token || !password || !confirmPassword) {
    return { error: "Todos los campos son requeridos" };
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres" };
  }

  try {
    const result = await resetPassword(token, password);
    
    if (result.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "Error al restablecer la contraseña." };
  }
}

