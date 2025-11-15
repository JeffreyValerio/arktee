import Link from "next/link";
import { User, LogOut, Settings } from "lucide-react";
import { logoutAction } from "@/actions/auth/logout";
import { getCurrentUserAction } from "@/actions/auth/get-user";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

export async function UserMenu() {
  const { user } = await getCurrentUserAction();

  if (!user) {
    return (
      <div className="flex items-center gap-4 text-xs">
        <Link
          href="/register"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
        >
          Crear cuenta
        </Link>
        <Separator orientation="vertical" className="h-4" />
        <Link
          href="/login"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="flex items-center gap-3">
      {isAdmin && (
        <>
          <Link href="/admin">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <Settings size={14} className="mr-1" />
              Admin
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-4" />
        </>
      )}
      <div className="hidden sm:flex items-center gap-2 text-xs">
        <User size={14} className="text-gray-500 dark:text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400 font-light">{user.name}</span>
      </div>
      <form action={logoutAction}>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <LogOut size={14} className="mr-1" />
          Salir
        </Button>
      </form>
    </div>
  );
}

