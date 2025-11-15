import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description: "Respuestas a las preguntas más comunes sobre nuestros productos, envíos, pagos y políticas.",
  openGraph: {
    title: "Preguntas Frecuentes | ArkTee",
    description: "Respuestas a las preguntas más comunes sobre nuestros productos, envíos, pagos y políticas.",
    url: `${siteUrl}/preguntas-frecuentes`,
  },
  alternates: {
    canonical: `${siteUrl}/preguntas-frecuentes`,
  },
};

const faqs = [
  {
    question: "¿Cuánto tiempo tarda en llegar mi pedido?",
    answer: "Los pedidos dentro de Costa Rica tienen un tiempo de entrega de 3 a 5 días hábiles. Para pedidos personalizados, el tiempo de producción es de 5 a 7 días hábiles adicionales.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos transferencias bancarias, tarjetas de crédito y débito, y pagos mediante SINPE Móvil. Todos los pagos son procesados de forma segura.",
  },
  {
    question: "¿Puedo cambiar el tamaño de mi pedido?",
    answer: "Sí, puedes cambiar el tamaño antes de que tu pedido sea procesado. Una vez en producción, los cambios no son posibles. Contacta a nuestro servicio al cliente dentro de las primeras 24 horas.",
  },
  {
    question: "¿Hacen envíos internacionales?",
    answer: "Actualmente solo realizamos envíos dentro de Costa Rica. Estamos trabajando para expandir nuestros servicios internacionales próximamente.",
  },
  {
    question: "¿Qué hago si mi producto llega con algún defecto?",
    answer: "Si tu producto llega con algún defecto de fabricación, contáctanos inmediatamente con fotos del defecto. Te enviaremos un reemplazo sin costo adicional o procesaremos una devolución completa.",
  },
  {
    question: "¿Puedo cancelar mi pedido?",
    answer: "Puedes cancelar tu pedido dentro de las primeras 24 horas después de realizarlo. Una vez que el pedido esté en producción, no será posible cancelarlo.",
  },
  {
    question: "¿Ofrecen descuentos para compras al por mayor?",
    answer: "Sí, ofrecemos descuentos especiales para pedidos de más de 10 unidades. Contacta a nuestro equipo de ventas corporativas para más información.",
  },
  {
    question: "¿Los productos son pre-encogidos?",
    answer: "Sí, todas nuestras camisetas están pre-encogidas para garantizar que mantengan su tamaño después del lavado. Recomendamos seguir las instrucciones de cuidado incluidas.",
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {faq.question}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              ¿No encontraste tu respuesta?
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
              Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ventas@arktee.com"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Enviar Email
              </a>
              <a
                href="https://wa.me/50671447395"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-900 dark:border-gray-100 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

