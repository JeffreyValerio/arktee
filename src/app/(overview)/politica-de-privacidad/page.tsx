import type { Metadata } from "next";
import { Shield, Lock, FileText, Eye } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y protección de datos personales de ArkTee. Cumplimiento con la Ley 8968 de Costa Rica.",
  openGraph: {
    title: "Política de Privacidad | ArkTee",
    description: "Política de privacidad y protección de datos personales de ArkTee. Cumplimiento con la Ley 8968 de Costa Rica.",
    url: `${siteUrl}/politica-de-privacidad`,
  },
  alternates: {
    canonical: `${siteUrl}/politica-de-privacidad`,
  },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Última actualización: Enero 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introducción */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              En <strong className="text-gray-900 dark:text-gray-100">ArkTee</strong>, nos comprometemos a proteger tu privacidad y tus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos tu información personal cuando utilizas nuestro sitio web y servicios.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Esta política cumple con la <strong className="text-gray-900 dark:text-gray-100">Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales</strong> de Costa Rica y demás normativa aplicable en materia de protección de datos personales.
            </p>
          </div>

          {/* Responsable */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              1. Responsable del Tratamiento de Datos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                El responsable del tratamiento de tus datos personales es:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 space-y-2">
                <p className="font-semibold text-gray-900 dark:text-gray-100">ArkTee</p>
                <p>Email: ventas@arktee.com</p>
                <p>Teléfono: (506) 7144-7395</p>
                <p>País: Costa Rica</p>
              </div>
            </div>
          </section>

          {/* Datos Recopilados */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6" />
              2. Datos Personales que Recopilamos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  2.1. Datos que nos proporcionas directamente:
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección postal para envíos</li>
                  <li>Información de pago (procesada de forma segura por nuestros proveedores de pago)</li>
                  <li>Preferencias de productos y tallas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  2.2. Datos recopilados automáticamente:
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Cookies y tecnologías similares (ver nuestra Política de Cookies)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalidad */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              3. Finalidad del Tratamiento de Datos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">Utilizamos tus datos personales para las siguientes finalidades:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Procesar y gestionar tus pedidos</li>
                <li>Enviar confirmaciones de pedido y actualizaciones de envío</li>
                <li>Comunicarnos contigo sobre tu cuenta y pedidos</li>
                <li>Proporcionar atención al cliente y soporte técnico</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Enviar comunicaciones de marketing (solo con tu consentimiento)</li>
                <li>Cumplir con obligaciones legales y fiscales</li>
                <li>Prevenir fraude y garantizar la seguridad del sitio</li>
              </ul>
            </div>
          </section>

          {/* Base Legal */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              4. Base Legal para el Tratamiento
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">El tratamiento de tus datos personales se basa en:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-gray-900 dark:text-gray-100">Consentimiento:</strong> Cuando nos das tu consentimiento explícito para ciertos usos</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Ejecución de contrato:</strong> Para procesar y entregar tus pedidos</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Obligación legal:</strong> Para cumplir con requisitos legales y fiscales</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraude</li>
              </ul>
            </div>
          </section>

          {/* Compartir Datos */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              5. Compartir Información con Terceros
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">No vendemos tus datos personales. Podemos compartir tu información con:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-gray-900 dark:text-gray-100">Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestro negocio (procesamiento de pagos, envíos, hosting)</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Autoridades legales:</strong> Cuando sea requerido por ley o para proteger nuestros derechos legales</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Empresas afiliadas:</strong> Solo para proporcionar los servicios que solicitas</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Todos nuestros proveedores de servicios están contractualmente obligados a proteger tus datos personales y solo pueden usarlos para los fines especificados.
              </p>
            </div>
          </section>

          {/* Seguridad */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6" />
              6. Seguridad de los Datos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tus datos personales contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encriptación SSL/TLS para las transmisiones de datos</li>
                <li>Almacenamiento seguro de datos</li>
                <li>Acceso restringido a datos personales solo para personal autorizado</li>
                <li>Monitoreo regular de nuestros sistemas de seguridad</li>
                <li>Actualizaciones periódicas de nuestros sistemas de seguridad</li>
              </ul>
            </div>
          </section>

          {/* Derechos */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              7. Tus Derechos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">De acuerdo con la Ley 8968 de Costa Rica, tienes derecho a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-gray-900 dark:text-gray-100">Acceso:</strong> Conocer qué datos personales tenemos sobre ti</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Cancelación:</strong> Solicitar la eliminación de tus datos cuando ya no sean necesarios</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Oposición:</strong> Oponerte al tratamiento de tus datos en ciertas circunstancias</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
                <li><strong className="text-gray-900 dark:text-gray-100">Revocación del consentimiento:</strong> Retirar tu consentimiento en cualquier momento</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Para ejercer estos derechos, contáctanos en <strong className="text-gray-900 dark:text-gray-100">ventas@arktee.com</strong> o vía WhatsApp al <strong className="text-gray-900 dark:text-gray-100">(506) 7144-7395</strong>. Responderemos a tu solicitud dentro de un plazo razonable, según lo establecido por la ley.
              </p>
            </div>
          </section>

          {/* Retención */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              8. Retención de Datos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados, incluyendo cualquier período de retención requerido por ley. Los datos de facturación se conservan según los requisitos fiscales de Costa Rica (generalmente 5 años). Los datos de marketing se conservan hasta que retires tu consentimiento.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              9. Cookies y Tecnologías Similares
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. Para más información, consulta nuestra <a href="/politica-de-cookies" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Política de Cookies</a>.
              </p>
            </div>
          </section>

          {/* Menores */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              10. Protección de Menores
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente datos personales de menores. Si descubrimos que hemos recopilado datos de un menor, tomaremos medidas para eliminar esa información de nuestros sistemas.
              </p>
            </div>
          </section>

          {/* Cambios */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              11. Cambios a esta Política
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos cualquier cambio significativo publicando la nueva política en esta página y actualizando la fecha de "Última actualización". Te recomendamos revisar esta política periódicamente.
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
                Si tienes preguntas, preocupaciones o deseas ejercer tus derechos sobre tus datos personales, puedes contactarnos:
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

