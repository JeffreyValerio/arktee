"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { requestPasswordResetAction, resetPasswordAction } from "@/actions/auth/reset-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const dynamic = 'force-dynamic';

const requestResetSchema = z.object({
  email: z.string().email("Email inválido"),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RequestResetFormData = z.infer<typeof requestResetSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ForgotPasswordContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const requestResetForm = useForm<RequestResetFormData>({
    resolver: zodResolver(requestResetSchema),
  });

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onRequestReset = async (data: RequestResetFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);

      const result = await requestPasswordResetAction(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        setTokenSent(true);
        if (result?.token) {
          // For development/testing - remove in production
          setResetToken(result.token);
          toast.info(`Token generado: ${result.token} (solo para desarrollo)`);
        } else {
          toast.success("Se ha enviado un email con las instrucciones para restablecer tu contraseña.");
        }
      }
    } catch (error) {
      toast.error("Error al solicitar el restablecimiento de contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("token", token || resetToken || "");
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      const result = await resetPasswordAction(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Contraseña restablecida exitosamente. Por favor inicia sesión.");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Error al restablecer la contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  // If token is provided in URL, show reset password form
  if (token || resetToken) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100">
              Restablecer Contraseña
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Ingresa tu nueva contraseña
            </p>
          </div>

          <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nueva contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    {...resetPasswordForm.register("password")}
                    className="pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-gray-400"
                    placeholder="••••••••"
                  />
                </div>
                {resetPasswordForm.formState.errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {resetPasswordForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirmar nueva contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...resetPasswordForm.register("confirmPassword")}
                    className="pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-gray-400"
                    placeholder="••••••••"
                  />
                </div>
                {resetPasswordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {resetPasswordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Restableciendo...
                </>
              ) : (
                <>
                  Restablecer Contraseña
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Show request reset form
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100">
            Recuperar Contraseña
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {tokenSent ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                Email enviado
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Revisa tu bandeja de entrada para las instrucciones.
              </p>
              {resetToken && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Token de desarrollo (solo para testing):
                  </p>
                  <Link
                    href={`/forgot-password?token=${resetToken}`}
                    className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all hover:underline"
                  >
                    {resetToken}
                  </Link>
                </div>
              )}
            </div>
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-400"
              >
                Volver al inicio de sesión
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={requestResetForm.handleSubmit(onRequestReset)} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  {...requestResetForm.register("email")}
                  className="pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-gray-400"
                  placeholder="tu@email.com"
                />
              </div>
              {requestResetForm.formState.errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {requestResetForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar enlace de recuperación
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}

