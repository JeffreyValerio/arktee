import type { Metadata } from "next";
import { Scale, Building2, FileText } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal e información legal de ArkTee. Identificación de la empresa y marco legal.",
  openGraph: {
    title: "Aviso Legal | ArkTee",
    description: "Aviso legal e información legal de ArkTee. Identificación de la empresa y marco legal.",
    url: `${siteUrl}/aviso-legal`,
  },
  alternates: {
    canonical: `${siteUrl}/aviso-legal`,
  },
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Scale className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Aviso Legal
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Última actualización: Enero 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Identificación */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              1. Identificación de la Empresa
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                En cumplimiento de la Ley de Protección al Consumidor (Ley 7472) y el Código de Comercio de Costa Rica, se informa que el presente sitio web es operado por:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 space-y-2">
                <p className="font-semibold text-gray-900 dark:text-gray-100">ArkTee</p>
                <p>Email: ventas@arktee.com</p>
                <p>Teléfono: (506) 7144-7395</p>
                <p>País: Costa Rica</p>
                <p className="mt-3">Sitio web: {siteUrl}</p>
              </div>
            </div>
          </section>

          {/* Objeto */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              2. Objeto del Sitio Web
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                El presente sitio web tiene por objeto la comercialización de camisetas personalizadas de alta calidad a través de Internet. La empresa se dedica a la venta online de productos textiles personalizados dentro del territorio de Costa Rica.
              </p>
            </div>
          </section>

          {/* Condiciones Generales */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              3. Condiciones Generales de Uso
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                El acceso y uso del presente sitio web implica la aceptación de todas las condiciones incluidas en este Aviso Legal. Si no estás de acuerdo con alguna de estas condiciones, te rogamos que no utilices el sitio web.
              </p>
              <p className="leading-relaxed">
                Para más información sobre las condiciones de uso y compra, consulta nuestros <a href="/terminos-y-condiciones" className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300">Términos y Condiciones</a>.
              </p>
            </div>
          </section>

          {/* Propiedad Intelectual */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              4. Propiedad Intelectual e Industrial
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Todos los contenidos del sitio web, incluyendo textos, gráficos, logos, iconos, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, son propiedad de ArkTee o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual de Costa Rica e internacionales.
              </p>
              <p className="leading-relaxed">
                El nombre comercial "ArkTee" y sus logos son marcas registradas de ArkTee. Todas las demás marcas, nombres comerciales y logos que aparecen en el sitio web son propiedad de sus respectivos dueños.
              </p>
              <p className="leading-relaxed">
                Está prohibida la reproducción, distribución, comunicación pública y transformación de los contenidos de este sitio web, salvo para uso personal y no comercial, y siempre que se cite la fuente.
              </p>
            </div>
          </section>

          {/* Limitación de Responsabilidad */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              5. Limitación de Responsabilidad
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                ArkTee no se hace responsable de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Los daños derivados de la imposibilidad de acceso al sitio web o de la falta de veracidad, exactitud, exhaustividad y/o actualización de los contenidos transmitidos, difundidos, almacenados o puestos a disposición.</li>
                <li>Los daños que puedan derivarse de la presencia de virus u otros elementos en los contenidos que puedan producir alteraciones en el sistema informático, documentos electrónicos o ficheros del usuario.</li>
                <li>El funcionamiento incorrecto del sitio web o de sus servicios debido a causas de fuerza mayor o caso fortuito.</li>
                <li>La veracidad, exactitud o exhaustividad de la información que el usuario facilite mediante el sitio web.</li>
              </ul>
            </div>
          </section>

          {/* Enlaces Externos */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              6. Enlaces a Sitios Web de Terceros
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                El sitio web puede contener enlaces a sitios web de terceros. ArkTee no tiene control sobre estos sitios y no asume responsabilidad alguna por el contenido, políticas de privacidad o prácticas de estos sitios web de terceros.
              </p>
              <p className="leading-relaxed">
                La inclusión de enlaces a sitios web de terceros no implica una aprobación o recomendación por parte de ArkTee. Te recomendamos leer las condiciones de uso y políticas de privacidad de cualquier sitio web de terceros que visites.
              </p>
            </div>
          </section>

          {/* Modificaciones */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              7. Modificaciones del Aviso Legal
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                ArkTee se reserva el derecho de modificar el presente Aviso Legal en cualquier momento sin previo aviso. Las modificaciones entrarán en vigor desde su publicación en el sitio web.
              </p>
              <p className="leading-relaxed">
                Es responsabilidad del usuario revisar periódicamente este Aviso Legal para estar informado de cualquier cambio.
              </p>
            </div>
          </section>

          {/* Ley Aplicable */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              8. Ley Aplicable y Jurisdicción
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                El presente Aviso Legal se rige por las leyes de la República de Costa Rica. Para cualquier controversia relacionada con el presente Aviso Legal o con el uso del sitio web, las partes se someten a la jurisdicción de los tribunales competentes de Costa Rica, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
              </p>
              <p className="leading-relaxed">
                En caso de conflicto entre estas condiciones y cualquier otra condición específica para determinados productos o servicios, prevalecerán las condiciones específicas.
              </p>
            </div>
          </section>

          {/* Protección al Consumidor */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              9. Protección al Consumidor
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                En cumplimiento de la Ley 7472 de Protección al Consumidor de Costa Rica, se informa que:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Todos los productos ofrecidos cumplen con las especificaciones anunciadas</li>
                <li>Los precios incluyen todos los impuestos aplicables</li>
                <li>Se proporciona información clara y precisa sobre los productos y servicios</li>
                <li>Se respetan los derechos de devolución y garantía establecidos por ley</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Si tienes alguna queja o reclamo relacionado con nuestros productos o servicios, puedes contactarnos a través de los medios indicados en este aviso legal. También puedes presentar tu reclamo ante la Comisión Nacional del Consumidor de Costa Rica si consideras que tus derechos han sido vulnerados.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              10. Contacto
            </h2>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p className="leading-relaxed">
                Para cualquier consulta, sugerencia o reclamación relacionada con este Aviso Legal, puedes contactarnos:
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

