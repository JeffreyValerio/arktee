import { getCurrentUserAction } from "@/actions/auth/get-user";
import { redirect } from "next/navigation";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import prisma from "@/lib/prisma";
// Using native Date methods instead of date-fns for now

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const { user } = await getCurrentUserAction();

  if (!user) {
    redirect("/login");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData = await (prisma as any).user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!userData) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <User size={24} />
            Mi Perfil
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tu información personal
          </p>
        </div>
        <Link href="/account/profile/edit">
          <Button>
            <Edit2 size={18} className="mr-2" />
            Editar Perfil
          </Button>
        </Link>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <div className="space-y-6">
          {/* Name */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <User size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Nombre Completo
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {userData.name}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Mail size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Correo Electrónico
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {userData.email}
              </p>
              {userData.emailVerified ? (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  ✓ Email verificado
                </p>
              ) : (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  ⚠ Email no verificado
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Phone size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Teléfono
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(userData as any).phone || "No proporcionado"}
              </p>
            </div>
          </div>

          {/* Account Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Miembro desde
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {new Date(userData.createdAt).toLocaleDateString("es-CR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Última actualización
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {new Date(userData.updatedAt).toLocaleDateString("es-CR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

