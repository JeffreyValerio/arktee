import Link from "next/link";
import { User, LogOut, Settings, Package, MapPin, CreditCard, ChevronDown } from "lucide-react";
import { logoutAction } from "@/actions/auth/logout";
import { getCurrentUserAction } from "@/actions/auth/get-user";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className="flex items-center gap-2 sm:gap-3">
      {isAdmin && (
        <>
          <Link href="/admin">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 sm:px-3 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <Settings size={14} className="sm:mr-1" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
        </>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light focus:outline-none p-1.5 sm:p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 sm:hover:bg-transparent sm:dark:hover:bg-transparent">
            <User size={16} className="text-gray-500 dark:text-gray-400 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">{user.name}</span>
            <ChevronDown size={12} className="text-gray-400 hidden sm:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/account/orders" className="flex items-center cursor-pointer">
              <Package size={16} className="mr-2" />
              Mis Pedidos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/addresses" className="flex items-center cursor-pointer">
              <MapPin size={16} className="mr-2" />
              Mis Direcciones
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/profile" className="flex items-center cursor-pointer">
              <User size={16} className="mr-2" />
              Mi Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/payment-methods" className="flex items-center cursor-pointer">
              <CreditCard size={16} className="mr-2" />
              Métodos de Pago
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/settings" className="flex items-center cursor-pointer">
              <Settings size={16} className="mr-2" />
              Configuración
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={logoutAction}>
            <DropdownMenuItem asChild>
              <button
                type="submit"
                className="w-full flex items-center cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
              >
                <LogOut size={16} className="mr-2" />
                Cerrar Sesión
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

