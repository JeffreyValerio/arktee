import type { Metadata } from "next";
import { Shield, CheckCircle, AlertCircle, Clock } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Garantía",
  description: "Información sobre nuestra garantía de calidad y cobertura de productos.",
  openGraph: {
    title: "Garantía | ArkTee",
    description: "Información sobre nuestra garantía de calidad y cobertura de productos.",
    url: `${siteUrl}/garantia`,
  },
  alternates: {
    canonical: `${siteUrl}/garantia`,
  },
};

export default function GarantiaPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Garantía de Calidad
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprometidos con la calidad y satisfacción de nuestros clientes
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Garantía Principal */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-6 h-6 text-gray-900 dark:text-gray-100 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Garantía de 30 Días
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Todos nuestros productos están cubiertos por una garantía de 30 días contra defectos de fabricación desde la fecha de recepción. Si recibes un producto con algún defecto, nos comprometemos a reemplazarlo o reembolsarte sin costo adicional.
                </p>
              </div>
            </div>
          </div>

          {/* Cobertura */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              ¿Qué cubre nuestra garantía?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Defectos de Fabricación
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    Hilos sueltos, costuras defectuosas, problemas de impresión o estampado, y cualquier otro defecto relacionado con el proceso de fabricación.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Materiales Defectuosos
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    Productos con materiales de baja calidad o que no cumplen con nuestras especificaciones de calidad.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Daños durante el Transporte
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    Si tu producto llega dañado debido al transporte, lo reemplazaremos inmediatamente sin costo adicional.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Encogimiento Excesivo
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    Si el producto se encoge más de lo esperado siguiendo las instrucciones de cuidado, está cubierto por la garantía.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* No Cobertura */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-6 h-6 text-gray-900 dark:text-gray-100 mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                ¿Qué no cubre nuestra garantía?
              </h2>
            </div>
            <div className="space-y-3 text-base text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">La garantía no cubre:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Desgaste normal por uso</li>
                <li>Daños causados por mal uso, negligencia o accidentes</li>
                <li>Alteraciones o modificaciones hechas por el cliente</li>
                <li>Productos lavados incorrectamente (no seguir instrucciones de cuidado)</li>
                <li>Cambios de opinión sobre el color o diseño elegido</li>
                <li>Daños causados por productos químicos de limpieza inadecuados</li>
                <li>Productos comprados fuera de nuestro sitio web oficial</li>
              </ul>
            </div>
          </div>

          {/* Proceso de Reclamación */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <Clock className="w-6 h-6 text-gray-900 dark:text-gray-100 mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Proceso de Reclamación
              </h2>
            </div>
            <div className="space-y-4 text-base text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">Para hacer una reclamación bajo la garantía, sigue estos pasos:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 dark:text-gray-100">Contacta nuestro servicio al cliente</strong> dentro de los 30 días desde la recepción del producto, ya sea por email (ventas@arktee.com) o WhatsApp (7144-7395).
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 dark:text-gray-100">Proporciona información relevante:</strong> número de orden, fotos claras del defecto, y una descripción del problema.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 dark:text-gray-100">Revisión:</strong> Nuestro equipo revisará tu caso en un plazo de 24-48 horas hábiles.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 dark:text-gray-100">Resolución:</strong> Si tu reclamación es aprobada, te enviaremos un reemplazo sin costo adicional o procesaremos un reembolso completo, incluyendo los gastos de envío si aplica.
                </li>
              </ol>
            </div>
          </div>

          {/* Compromiso */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Nuestro Compromiso
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              En ArkTee, nos comprometemos a proporcionar productos de la más alta calidad. Trabajamos constantemente para mejorar nuestros procesos de fabricación y asegurar que cada producto que sale de nuestras manos cumpla con los más altos estándares.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Tu satisfacción es nuestra prioridad. Si alguna vez no estás completamente satisfecho con tu compra, no dudes en contactarnos. Estamos aquí para ayudarte y resolver cualquier problema que puedas tener.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

