import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    rating: 5,
    text: "La calidad de las camisetas es excepcional. Muy cómodas y el diseño es perfecto.",
  },
  {
    name: "Carlos Rodríguez",
    rating: 5,
    text: "Excelente servicio y productos de muy buena calidad. Volveré a comprar.",
  },
  {
    name: "Ana Martínez",
    rating: 5,
    text: "Me encanta la variedad de estilos. Las camisetas son suaves y duran mucho.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Experiencias reales de personas que confían en nosotros
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 sm:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200 dark:text-gray-700" />
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-light">
                "{testimonial.text}"
              </p>

              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

