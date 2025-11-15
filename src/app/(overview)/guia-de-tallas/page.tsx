import type { Metadata } from "next";
import { Ruler } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Guía de Tallas",
  description: "Guía completa para elegir la talla correcta de nuestras camisetas. Medidas y recomendaciones.",
  openGraph: {
    title: "Guía de Tallas | ArkTee",
    description: "Guía completa para elegir la talla correcta de nuestras camisetas. Medidas y recomendaciones.",
    url: `${siteUrl}/guia-de-tallas`,
  },
  alternates: {
    canonical: `${siteUrl}/guia-de-tallas`,
  },
};

export default function GuiaDeTallasPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Ruler className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Guía de Tallas
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encuentra la talla perfecta con nuestra guía de medidas
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Instrucciones */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              ¿Cómo medir?
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
              Para obtener las medidas más precisas, usa una cinta métrica y mide sobre una camiseta que te quede bien. Si no tienes una cinta métrica, puedes usar un cordón y luego medirlo con una regla.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-600 dark:text-gray-400 ml-4">
              <li><strong className="text-gray-900 dark:text-gray-100">Pecho:</strong> Mide alrededor de la parte más ancha del pecho, justo debajo de los brazos</li>
              <li><strong className="text-gray-900 dark:text-gray-100">Largo:</strong> Mide desde el hombro hasta donde quieras que termine la camiseta</li>
              <li><strong className="text-gray-900 dark:text-gray-100">Manga:</strong> Mide desde el hombro hasta la muñeca</li>
            </ul>
          </div>

          {/* Tabla de Tallas Hombres */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Tallas Hombres
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Talla</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Pecho (cm)</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Largo (cm)</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Manga (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">XS</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">86-91</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">68</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">58</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">S</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">91-97</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">71</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">61</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">M</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">97-102</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">74</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">63</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">L</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">102-107</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">76</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">65</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">XL</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">107-112</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">79</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">67</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">XXL</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">112-117</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">81</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">69</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla de Tallas Mujeres */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 sm:p-8 shadow-sm overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Tallas Mujeres
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Talla</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Pecho (cm)</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Largo (cm)</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Manga (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">XS</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">78-83</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">60</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">55</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">S</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">83-88</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">63</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">57</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">M</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">88-93</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">66</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">59</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">L</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">93-98</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">68</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">61</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">XL</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">98-103</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">70</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">63</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Consejos */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Consejos para elegir tu talla
            </h2>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-600 dark:text-gray-400 ml-4">
              <li>Si estás entre dos tallas, te recomendamos elegir la talla mayor</li>
              <li>Nuestras camisetas están pre-encogidas, así que mantendrán su tamaño después del lavado</li>
              <li>Si prefieres un ajuste más holgado, elige una talla más grande</li>
              <li>Para un ajuste más ceñido, elige tu talla normal o una menor</li>
              <li>En caso de duda, contáctanos y te ayudaremos a elegir la talla perfecta</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

