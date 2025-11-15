import { getCurrentUserAction } from "@/actions/auth/get-user";
import { redirect } from "next/navigation";
import { Settings, Bell, Lock, Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const { user } = await getCurrentUserAction();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Settings size={24} />
          Configuración
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Gestiona tus preferencias y configuración de cuenta
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Notificaciones
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Configura cómo y cuándo recibes notificaciones
              </p>
              <Button variant="outline" size="sm">
                Configurar notificaciones
              </Button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Lock size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Privacidad y Seguridad
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Cambia tu contraseña y gestiona la privacidad de tu cuenta
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/account/settings/password">
                  <Button variant="outline" size="sm">
                    Cambiar contraseña
                  </Button>
                </Link>
                <Link href="/account/settings/privacy">
                  <Button variant="outline" size="sm">
                    Configuración de privacidad
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Globe size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Idioma y Región
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Configura tu idioma preferido y región
              </p>
              <Button variant="outline" size="sm">
                Configurar idioma
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <Trash2 size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-1">
                Zona de Peligro
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                Estas acciones no se pueden deshacer. Por favor, ten cuidado.
              </p>
              <Link href="/account/settings/delete-account">
                <Button variant="destructive" size="sm">
                  Eliminar cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

