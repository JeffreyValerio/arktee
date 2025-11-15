import type { Metadata } from "next";
import { Truck, RotateCcw, Package, Shield } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Envíos y Devoluciones",
  description: "Información sobre nuestras políticas de envío y devolución dentro de Costa Rica.",
  openGraph: {
    title: "Envíos y Devoluciones | ArkTee",
    description: "Información sobre nuestras políticas de envío y devolución dentro de Costa Rica.",
    url: `${siteUrl}/envios-y-devoluciones`,
  },
  alternates: {
    canonical: `${siteUrl}/envios-y-devoluciones`,
  },
};

export default function EnviosYDevolucionesPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Truck className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Envíos y Devoluciones
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Toda la información que necesitas sobre el envío y la devolución de tus productos
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Envíos Section */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Información de Envíos
              </h2>
            </div>

            <div className="space-y-6 text-base text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Tiempo de Entrega
                </h3>
                <p className="leading-relaxed">
                  Los pedidos estándar se procesan y envían en 1-2 días hábiles. El tiempo de entrega dentro de Costa Rica es de 3-5 días hábiles. Los pedidos personalizados pueden tardar entre 5-7 días hábiles adicionales en producción antes del envío.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Costos de Envío
                </h3>
                <p className="leading-relaxed mb-3">
                  Ofrecemos envío gratuito en compras mayores a ₡15,000. Para compras menores, los costos de envío son los siguientes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Gran Área Metropolitana: ₡2,500</li>
                  <li>Resto del país: ₡3,500</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Seguimiento de Pedidos
                </h3>
                <p className="leading-relaxed">
                  Una vez que tu pedido sea enviado, recibirás un email con el número de seguimiento y un enlace para rastrear tu paquete en tiempo real.
                </p>
              </div>
            </div>
          </section>

          {/* Devoluciones Section */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Política de Devoluciones
              </h2>
            </div>

            <div className="space-y-6 text-base text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Período de Devolución
                </h3>
                <p className="leading-relaxed">
                  Tienes 15 días calendario desde la fecha de recepción para solicitar una devolución o cambio. El producto debe estar sin uso, en su empaque original y con todas las etiquetas intactas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Productos Elegibles para Devolución
                </h3>
                <p className="leading-relaxed mb-3">
                  Los siguientes productos pueden ser devueltos:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Productos con defectos de fabricación</li>
                  <li>Productos que no coinciden con la descripción</li>
                  <li>Productos dañados durante el transporte</li>
                  <li>Cambios de talla (sujeto a disponibilidad de inventario)</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  <strong className="text-gray-900 dark:text-gray-100">Nota:</strong> Los productos personalizados o con diseños específicos no son elegibles para devolución, excepto en casos de defectos de fabricación.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Proceso de Devolución
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contacta a nuestro servicio al cliente en ventas@arktee.com o vía WhatsApp</li>
                  <li>Proporciona el número de orden y motivo de la devolución</li>
                  <li>Recibirás instrucciones para el envío de devolución</li>
                  <li>Una vez recibido y verificado, procesaremos el reembolso en un plazo de 5-7 días hábiles</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Reembolsos
                </h3>
                <p className="leading-relaxed">
                  Los reembolsos se realizarán al método de pago original. El costo del envío inicial no es reembolsable, excepto en casos de productos defectuosos o errores de nuestra parte. Los costos de envío de devolución corren por cuenta del cliente, salvo en casos de defectos.
                </p>
              </div>
            </div>
          </section>

          {/* Cambios Section */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Cambios de Talla
              </h2>
            </div>

            <div className="space-y-4 text-base text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                Si necesitas cambiar el tamaño de tu producto, puedes hacerlo dentro de los primeros 15 días desde la recepción. El cambio está sujeto a disponibilidad de inventario. Contacta a nuestro equipo para coordinar el cambio.
              </p>
              <p className="leading-relaxed">
                Los costos de envío del producto nuevo corren por cuenta del cliente. Si el nuevo producto tiene un precio mayor, deberás pagar la diferencia.
              </p>
            </div>
          </section>

          {/* Garantía Section */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Garantía de Calidad
              </h2>
            </div>

            <div className="text-base text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                Todos nuestros productos están cubiertos por una garantía de 30 días contra defectos de fabricación. Si recibes un producto defectuoso, contáctanos inmediatamente y te enviaremos un reemplazo sin costo adicional.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

