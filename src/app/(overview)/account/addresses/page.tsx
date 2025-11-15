import { getCurrentUserAction } from "@/actions/auth/get-user";
import { redirect } from "next/navigation";
import { MapPin, Plus, Edit2, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AddressesPage() {
  const { user } = await getCurrentUserAction();

  if (!user) {
    redirect("/login");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addresses = await (prisma as any).address.findMany({
    where: {
      userId: user.id,
    },
    orderBy: [
      { isDefault: "desc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <MapPin size={24} />
            Mis Direcciones
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {addresses.length === 0
              ? "No tienes direcciones guardadas"
              : `Tienes ${addresses.length} direccion${addresses.length !== 1 ? "es" : ""} guardada${addresses.length !== 1 ? "s" : ""}`
            }
          </p>
        </div>
        <Link href="/account/addresses/new">
          <Button>
            <Plus size={18} className="mr-2" />
            Agregar Dirección
          </Button>
        </Link>
      </div>

      {/* Addresses List */}
      {addresses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-8 sm:p-12">
          <div className="text-center py-8">
            <MapPin size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No tienes direcciones guardadas
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Agrega una dirección para facilitar el proceso de compra y entrega de tus pedidos.
            </p>
            <Link href="/account/addresses/new">
              <Button size="lg">
                <Plus size={18} className="mr-2" />
                Agregar primera dirección
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {addresses.map((address: any) => (
            <div
              key={address.id}
              className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-gray-500 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {address.firstName} {address.lastName}
                  </h3>
                  {address.isDefault && (
                    <Badge variant="default" className="text-xs">
                      <Check size={12} className="mr-1" />
                      Principal
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-6">
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.province}
                </p>
                <p>Código postal: {address.postalCode}</p>
                <p>{address.country}</p>
                <p className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  📞 {address.phone}
                </p>
                {address.notes && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                    Notas: {address.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/account/addresses/${address.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit2 size={16} className="mr-2" />
                    Editar
                  </Button>
                </Link>
                <Link href={`/account/addresses/${address.id}/delete`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 size={16} className="mr-2" />
                    Eliminar
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

