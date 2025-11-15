import Link from "next/link";

const genders = [
  {
    name: "Hombres",
    slug: "men",
    description: "Estilo y comodidad",
  },
  {
    name: "Mujeres",
    slug: "women",
    description: "Diseño y elegancia",
  },
  {
    name: "Niños",
    slug: "kid",
    description: "Diversión y color",
  },
  {
    name: "Unisex",
    slug: "unisex",
    description: "Para todos",
  },
];

export const GenderCollections = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
            Colecciones
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Encuentra tu estilo perfecto
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {genders.map((gender) => (
            <Link
              key={gender.slug}
              href={`/gender/${gender.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
                <h3 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2 group-hover:scale-105 transition-transform duration-300">
                  {gender.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {gender.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 dark:bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

