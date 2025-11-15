import { getCurrentUserAction } from "@/actions/auth/get-user";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currencyFormat } from "@/lib/currency-format";
// Using native Date methods instead of date-fns for now

export const dynamic = 'force-dynamic';

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "SHIPPED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "CONFIRMED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmado",
    PROCESSING: "En Proceso",
    SHIPPED: "Enviado",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
  };
  return statusMap[status] || status;
};

export default async function OrdersPage() {
  const { user } = await getCurrentUserAction();

  if (!user) {
    redirect("/login");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orders = await (prisma as any).order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Package size={24} />
            Mis Pedidos
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {orders.length === 0
              ? "No has realizado pedidos aún"
              : `Tienes ${orders.length} pedido${orders.length !== 1 ? "s" : ""}`
            }
          </p>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-8 sm:p-12">
          <div className="text-center py-8">
            <Package size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No tienes pedidos aún
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Cuando realices un pedido, aparecerá aquí para que puedas hacer seguimiento de su estado.
            </p>
            <Link href="/">
              <Button size="lg">
                Explorar productos
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Pedido #{order.orderNumber}
                        </h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("es-CR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Items
                      </p>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {order.items.length} producto{order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Total
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {currencyFormat(order.total)}
                      </p>
                    </div>
                  </div>

                  {order.address && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Dirección de entrega
                      </p>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {order.address.address}, {order.address.city}, {order.address.province}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-end">
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

