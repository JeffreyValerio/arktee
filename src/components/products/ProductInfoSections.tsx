"use client";

import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Package, 
  Heart,
  Info,
  CheckCircle2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ProductInfoSections() {
  const sections = [
    {
      icon: Truck,
      title: "Envío Gratis",
      description: "Envío gratis en compras superiores a $50. Entrega en 3-5 días hábiles.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: RotateCcw,
      title: "Devoluciones Fáciles",
      description: "30 días para devolver tu compra. Proceso simple y sin complicaciones.",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Shield,
      title: "Garantía de Calidad",
      description: "Productos de alta calidad con garantía de satisfacción o tu dinero de vuelta.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Package,
      title: "Empaque Seguro",
      description: "Todos nuestros productos se envían en empaques protectores de alta calidad.",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  const careInstructions = [
    "Lavar a máquina en agua fría",
    "No usar lejía",
    "Planchar a temperatura baja",
    "No secar en secadora",
    "Lavar del revés para preservar el color",
  ];

  const specifications = [
    { label: "Material", value: "100% Algodón Premium" },
    { label: "Peso", value: "180 g/m²" },
    { label: "Acabado", value: "Pre-encogido" },
    { label: "Costuras", value: "Reforzadas" },
    { label: "Cuello", value: "Corte y cosido" },
  ];

  return (
    <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-12">
      {/* Shipping & Returns Info */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className={`${section.bgColor} rounded-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`${section.color} flex-shrink-0`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-1">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <Separator className="my-8 sm:my-12" />

      {/* Care Instructions & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Care Instructions */}
        <section>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Heart className="h-5 w-5 text-red-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Cuidado del Producto
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <ul className="space-y-2 sm:space-y-3">
              {careInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {instruction}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Specifications */}
        <section>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Info className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Especificaciones
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <dl className="space-y-3 sm:space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    {spec.label}
                  </dt>
                  <dd className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}

