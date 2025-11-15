import type { Metadata } from "next";
import { Cookie } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Información sobre el uso de cookies en el sitio web de ArkTee.",
  openGraph: {
    title: "Política de Cookies | ArkTee",
    description: "Información sobre el uso de cookies en el sitio web de ArkTee.",
    url: `${siteUrl}/politica-de-cookies`,
  },
  alternates: {
    canonical: `${siteUrl}/politica-de-cookies`,
  },
};

export default function PoliticaDeCookiesPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Cookie className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Política de Cookies
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Última actualización: Enero 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introducción */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ¿Qué son las Cookies?
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, tablet o móvil) cuando visitas nuestro sitio web. Las cookies nos ayudan a mejorar tu experiencia en el sitio, recordando tus preferencias y proporcionando funcionalidades mejoradas.
              </p>
              <p className="leading-relaxed">
                Esta Política de Cookies explica qué tipos de cookies utilizamos, para qué las usamos y cómo puedes gestionarlas.
              </p>
            </div>
          </div>

          {/* Tipos de Cookies */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Tipos de Cookies que Utilizamos
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  1. Cookies Técnicas (Necesarias)
                </h3>
                <p className="leading-relaxed mb-2">
                  Estas cookies son esenciales para que el sitio web funcione correctamente. Permiten funciones básicas como la navegación por las páginas y el acceso a áreas seguras del sitio web. Sin estas cookies, el sitio web no puede funcionar correctamente.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Cookies de sesión para mantener tu sesión activa</li>
                  <li>Cookies de seguridad para prevenir fraudes</li>
                  <li>Cookies de autenticación para recordar que has iniciado sesión</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  2. Cookies de Funcionalidad
                </h3>
                <p className="leading-relaxed mb-2">
                  Estas cookies permiten que el sitio web recuerde las opciones que realizas (como tu idioma o región) y proporcionan características mejoradas y personalizadas.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Preferencias de idioma</li>
                  <li>Preferencias de tema (modo claro/oscuro)</li>
                  <li>Productos en favoritos y comparación</li>
                  <li>Items en el carrito de compras</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  3. Cookies Analíticas
                </h3>
                <p className="leading-relaxed mb-2">
                  Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web proporcionándonos información sobre las áreas visitadas, el tiempo de permanencia en el sitio y cualquier problema encontrado, como mensajes de error.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Análisis de tráfico y comportamiento de usuarios</li>
                  <li>Páginas más visitadas</li>
                  <li>Tiempo de permanencia en el sitio</li>
                  <li>Fuentes de tráfico</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  4. Cookies de Publicidad
                </h3>
                <p className="leading-relaxed mb-2">
                  Estas cookies se utilizan para hacer seguimiento de tus visitas a nuestro sitio web y otros sitios web para proporcionarte anuncios relevantes. Actualmente no utilizamos cookies de publicidad, pero nos reservamos el derecho de hacerlo en el futuro.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies Específicas */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Cookies Específicas que Utilizamos
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Propósito</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Duración</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Tipo</th>
                  </tr>
                </thead>
                <tbody className="text-base text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">session</td>
                    <td className="py-3 px-4">Mantener la sesión del usuario</td>
                    <td className="py-3 px-4">Sesión</td>
                    <td className="py-3 px-4">Necesaria</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">theme</td>
                    <td className="py-3 px-4">Recordar preferencia de tema (claro/oscuro)</td>
                    <td className="py-3 px-4">1 año</td>
                    <td className="py-3 px-4">Funcionalidad</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">cart-storage</td>
                    <td className="py-3 px-4">Almacenar productos en el carrito</td>
                    <td className="py-3 px-4">1 año</td>
                    <td className="py-3 px-4">Funcionalidad</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">favorites-storage</td>
                    <td className="py-3 px-4">Almacenar productos favoritos</td>
                    <td className="py-3 px-4">1 año</td>
                    <td className="py-3 px-4">Funcionalidad</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">comparison-storage</td>
                    <td className="py-3 px-4">Almacenar productos para comparar</td>
                    <td className="py-3 px-4">1 año</td>
                    <td className="py-3 px-4">Funcionalidad</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Gestión de Cookies */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Cómo Gestionar las Cookies
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Configuración del Navegador
                </h3>
                <p className="leading-relaxed mb-3">
                  La mayoría de los navegadores web te permiten controlar las cookies a través de sus configuraciones. Puedes configurar tu navegador para que rechace todas las cookies o para que te avise cuando se envía una cookie.
                </p>
                <p className="leading-relaxed mb-3">
                  Sin embargo, ten en cuenta que si bloqueas las cookies, es posible que algunas funciones del sitio web no funcionen correctamente.
                </p>
                <p className="leading-relaxed mb-2">
                  Aquí tienes enlaces a las páginas de ayuda de los navegadores más comunes:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Safari</a></li>
                  <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Microsoft Edge</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Cookies de Terceros
                </h3>
                <p className="leading-relaxed">
                  Algunas cookies pueden ser establecidas por terceros cuyos servicios utilizamos en nuestro sitio web. No tenemos control sobre estas cookies de terceros. Te recomendamos consultar las políticas de privacidad de estos terceros para obtener más información sobre sus cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Consentimiento */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Consentimiento
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Al continuar navegando por nuestro sitio web o hacer clic en "Aceptar" en el banner de cookies, aceptas el uso de cookies de acuerdo con esta Política de Cookies.
              </p>
              <p className="leading-relaxed">
                Puedes retirar tu consentimiento en cualquier momento modificando la configuración de cookies de tu navegador o eliminando las cookies almacenadas en tu dispositivo.
              </p>
            </div>
          </section>

          {/* Actualizaciones */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Actualizaciones de esta Política
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en nuestras prácticas o por otras razones operativas, legales o regulatorias. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo utilizamos las cookies.
              </p>
              <p className="leading-relaxed">
                La fecha de "Última actualización" al inicio de esta política indica cuándo se realizó la última revisión.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Contacto
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos:
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

