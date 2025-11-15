import { Leaf, Droplets, Shirt, Heart } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Materiales sostenibles",
    description: "Utilizamos algodón orgánico y materiales reciclados",
  },
  {
    icon: Droplets,
    title: "Fácil cuidado",
    description: "Resistentes al lavado y mantienen su forma",
  },
  {
    icon: Shirt,
    title: "Alta calidad",
    description: "Prendas diseñadas para durar y verse bien",
  },
  {
    icon: Heart,
    title: "Hecho con amor",
    description: "Cada pieza es cuidadosamente seleccionada",
  },
];

export const QualityMaterials = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
            Calidad y compromiso
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Nos comprometemos a ofrecerte las mejores camisetas con materiales de primera calidad
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 mb-4">
                  <Icon size={28} className="text-white dark:text-gray-900" />
                </div>
                <h3 className="text-lg font-light text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

