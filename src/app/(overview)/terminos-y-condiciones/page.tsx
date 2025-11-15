import type { Metadata } from "next";
import { FileText, Scale, ShoppingBag, AlertTriangle } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso de ArkTee. Condiciones de compra y uso del sitio web.",
  openGraph: {
    title: "Términos y Condiciones | ArkTee",
    description: "Términos y condiciones de uso de ArkTee. Condiciones de compra y uso del sitio web.",
    url: `${siteUrl}/terminos-y-condiciones`,
  },
  alternates: {
    canonical: `${siteUrl}/terminos-y-condiciones`,
  },
};

export default function TerminosYCondicionesPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Última actualización: Enero 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introducción */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Bienvenido a <strong className="text-gray-900 dark:text-gray-100">ArkTee</strong>. Estos Términos y Condiciones rigen el uso de nuestro sitio web y la compra de nuestros productos. Al acceder y utilizar nuestro sitio, aceptas estar sujeto a estos términos. Si no estás de acuerdo con alguno de estos términos, por favor no utilices nuestro sitio.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              Estos términos se rigen por las leyes de la República de Costa Rica, incluyendo el Código de Comercio, la Ley de Protección al Consumidor (Ley 7472) y demás normativa aplicable.
            </p>
          </div>

          {/* Información de la Empresa */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Scale className="w-6 h-6" />
              1. Información de la Empresa
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                <strong className="text-gray-900 dark:text-gray-100">ArkTee</strong> es una empresa costarricense dedicada a la venta de camisetas personalizadas de alta calidad.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 space-y-2">
                <p>Email: ventas@arktee.com</p>
                <p>Teléfono: (506) 7144-7395</p>
                <p>País: Costa Rica</p>
              </div>
            </div>
          </section>

          {/* Uso del Sitio */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              2. Uso del Sitio Web
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  2.1. Elegibilidad
                </h3>
                <p className="leading-relaxed">
                  Debes ser mayor de 18 años o tener el consentimiento de un tutor legal para realizar compras en nuestro sitio. Al realizar una compra, garantizas que tienes la capacidad legal para celebrar contratos.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  2.2. Cuenta de Usuario
                </h3>
                <p className="leading-relaxed">
                  Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Debes notificarnos inmediatamente de cualquier uso no autorizado de tu cuenta.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  2.3. Uso Prohibido
                </h3>
                <p className="leading-relaxed mb-3">Está prohibido:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Usar el sitio para fines ilegales o no autorizados</li>
                  <li>Violar cualquier ley local o internacional</li>
                  <li>Transmitir virus, malware o código dañino</li>
                  <li>Intentar acceder a áreas restringidas del sitio</li>
                  <li>Copiar, reproducir o distribuir el contenido sin autorización</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Productos y Precios */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              3. Productos y Precios
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  3.1. Disponibilidad
                </h3>
                <p className="leading-relaxed">
                  Nos esforzamos por mantener la información de productos actualizada y precisa. Sin embargo, no garantizamos la disponibilidad de productos específicos. Si un producto no está disponible después de realizar tu pedido, te notificaremos y procesaremos un reembolso completo.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  3.2. Precios
                </h3>
                <p className="leading-relaxed">
                  Todos los precios están en colones costarricenses (₡) e incluyen impuestos aplicables, salvo que se indique lo contrario. Nos reservamos el derecho de modificar los precios en cualquier momento, pero los cambios no afectarán pedidos ya confirmados.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  3.3. Errores en Precios
                </h3>
                <p className="leading-relaxed">
                  En caso de error en el precio de un producto, nos reservamos el derecho de cancelar el pedido o contactarte para confirmar si deseas proceder con el precio correcto.
                </p>
              </div>
            </div>
          </section>

          {/* Pedidos y Pagos */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              4. Pedidos y Pagos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  4.1. Confirmación de Pedido
                </h3>
                <p className="leading-relaxed">
                  Al realizar un pedido, recibirás una confirmación por email. Esta confirmación no constituye una aceptación del pedido, sino un acuse de recibo. Nos reservamos el derecho de rechazar o cancelar cualquier pedido antes del envío.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  4.2. Métodos de Pago
                </h3>
                <p className="leading-relaxed">
                  Aceptamos transferencias bancarias, tarjetas de crédito/débito, y pagos mediante SINPE Móvil. Todos los pagos se procesan de forma segura. No almacenamos información completa de tarjetas de crédito.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  4.3. Procesamiento de Pagos
                </h3>
                <p className="leading-relaxed">
                  El pago se procesará antes del envío del producto. En caso de pago rechazado, tu pedido será cancelado y te notificaremos.
                </p>
              </div>
            </div>
          </section>

          {/* Envíos y Entregas */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              5. Envíos y Entregas
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Realizamos envíos dentro de Costa Rica. Los tiempos de entrega estimados son de 3-5 días hábiles para productos estándar, y 5-7 días hábiles adicionales para productos personalizados. Consulta nuestra <a href="/envios-y-devoluciones" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Política de Envíos</a> para más información.
              </p>
              <p className="leading-relaxed">
                El riesgo de pérdida y título de los productos se transfiere a ti una vez que el producto es entregado al transportista.
              </p>
            </div>
          </section>

          {/* Devoluciones */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              6. Devoluciones y Reembolsos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Tienes 15 días calendario desde la recepción para solicitar una devolución. Los productos deben estar sin usar, en su empaque original y con todas las etiquetas intactas. Consulta nuestra <a href="/envios-y-devoluciones" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Política de Devoluciones</a> para más detalles.
              </p>
              <p className="leading-relaxed">
                Los productos personalizados no son elegibles para devolución, excepto en casos de defectos de fabricación.
              </p>
            </div>
          </section>

          {/* Garantía */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              7. Garantía
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Todos nuestros productos están cubiertos por una garantía de 30 días contra defectos de fabricación. Consulta nuestra <a href="/garantia" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Política de Garantía</a> para más información.
              </p>
            </div>
          </section>

          {/* Propiedad Intelectual */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              8. Propiedad Intelectual
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de ArkTee o sus proveedores de contenido y está protegido por las leyes de propiedad intelectual de Costa Rica e internacionales.
              </p>
              <p className="leading-relaxed">
                No puedes reproducir, distribuir, modificar o crear obras derivadas del contenido sin nuestra autorización escrita previa.
              </p>
            </div>
          </section>

          {/* Limitación de Responsabilidad */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              9. Limitación de Responsabilidad
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                En la medida máxima permitida por la ley costarricense, ArkTee no será responsable de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Daños indirectos, incidentales o consecuentes</li>
                <li>Pérdida de beneficios o ingresos</li>
                <li>Interrupciones del servicio o errores técnicos</li>
                <li>Uso indebido de los productos por parte del cliente</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Nuestra responsabilidad total no excederá el monto pagado por el producto específico que dio lugar a la reclamación.
              </p>
            </div>
          </section>

          {/* Ley Aplicable */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              10. Ley Aplicable y Jurisdicción
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Estos términos se rigen e interpretan de acuerdo con las leyes de la República de Costa Rica. Cualquier disputa relacionada con estos términos o con nuestros productos será sometida a la jurisdicción exclusiva de los tribunales competentes de Costa Rica.
              </p>
            </div>
          </section>

          {/* Modificaciones */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              11. Modificaciones de los Términos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor al publicarlos en el sitio web. Es tu responsabilidad revisar periódicamente estos términos. El uso continuado del sitio después de los cambios constituye tu aceptación de los mismos.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              12. Contacto
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos:
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-md p-4 space-y-2">
                <p><strong className="text-gray-900 dark:text-gray-100">Email:</strong> ventas@arktee.com</p>
                <p><strong className="text-gray-900 dark:text-gray-100">WhatsApp:</strong> (506) 7144-7395</p>
                <p><strong className="text-gray-900 dark:text-gray-100">País:</strong> Costa Rica</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

