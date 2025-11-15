"use client";

import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de suscripción
    console.log("Email:", email);
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
            <Mail size={28} className="text-white" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-light text-white">
              Mantente al día
            </h2>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Suscríbete a nuestro newsletter y recibe descuentos exclusivos y las últimas novedades
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              required
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
            <Button
              type="submit"
              className="bg-white text-gray-900 hover:bg-gray-100 group"
            >
              Suscribirse
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-xs text-gray-400">
            Al suscribirte, aceptas recibir emails promocionales. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
};

