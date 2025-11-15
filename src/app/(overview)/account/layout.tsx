import { getCurrentUserAction } from "@/actions/auth/get-user";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Package, 
  MapPin, 
  User, 
  CreditCard, 
  Settings,
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const navigation = [
  {
    name: "Mis Pedidos",
    href: "/account/orders",
    icon: Package,
  },
  {
    name: "Mis Direcciones",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    name: "Mi Perfil",
    href: "/account/profile",
    icon: User,
  },
  {
    name: "Métodos de Pago",
    href: "/account/payment-methods",
    icon: CreditCard,
  },
  {
    name: "Configuración",
    href: "/account/settings",
    icon: Settings,
  },
];

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentUserAction();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-width px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Mi Cuenta
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gestiona tu información personal, pedidos y preferencias
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-2">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200",
                          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100",
                          "group"
                        )}
                      >
                        <Icon size={18} className="flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        <ChevronRight 
                          size={16} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" 
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

