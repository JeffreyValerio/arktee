import { getCurrentUserAction } from "@/actions/auth/get-user";
import { redirect } from "next/navigation";
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function PaymentMethodsPage() {
  const { user } = await getCurrentUserAction();

  if (!user) {
    redirect("/login");
  }

  // TODO: Implementar modelo de PaymentMethod en Prisma
  const paymentMethods: any[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CreditCard size={24} />
            Métodos de Pago
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {paymentMethods.length === 0
              ? "No tienes métodos de pago guardados"
              : `Tienes ${paymentMethods.length} método${paymentMethods.length !== 1 ? "s" : ""} de pago guardado${paymentMethods.length !== 1 ? "s" : ""}`
            }
          </p>
        </div>
        <Link href="/account/payment-methods/new">
          <Button>
            <Plus size={18} className="mr-2" />
            Agregar Método de Pago
          </Button>
        </Link>
      </div>

      {/* Payment Methods List */}
      {paymentMethods.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-8 sm:p-12">
          <div className="text-center py-8">
            <CreditCard size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No tienes métodos de pago guardados
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Agrega un método de pago para acelerar el proceso de compra. Tus métodos de pago están seguros y encriptados.
            </p>
            <Link href="/account/payment-methods/new">
              <Button size="lg">
                <Plus size={18} className="mr-2" />
                Agregar método de pago
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard size={20} className="text-gray-500 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {method.type}
                  </h3>
                  {method.isDefault && (
                    <Badge variant="default" className="text-xs">
                      Principal
                    </Badge>
                  )}
                </div>
              </div>
              {/* TODO: Mostrar detalles del método de pago cuando se implemente */}
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            !
          </div>
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Pago seguro
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Todos los métodos de pago están encriptados y almacenados de forma segura. 
              Actualmente aceptamos transferencias bancarias y pagos por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

