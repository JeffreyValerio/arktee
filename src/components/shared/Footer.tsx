import Link from "next/link";
import Logo from "./Logo";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, HelpCircle, Package, Truck, Shield, CreditCard } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="max-width px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-xs">
              Camisetas premium con diseño minimalista. Calidad excepcional y estilo único para definir tu personalidad.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-gray-700 dark:text-gray-300" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-gray-700 dark:text-gray-300" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube size={16} className="text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Tienda
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/gender/men" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light">
                  Hombres
                </Link>
              </li>
              <li>
                <Link href="/gender/women" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light">
                  Mujeres
                </Link>
              </li>
              <li>
                <Link href="/gender/kid" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light">
                  Niños
                </Link>
              </li>
              <li>
                <Link href="/gender/unisex" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light">
                  Unisex
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Soporte
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/preguntas-frecuentes" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light flex items-center gap-2">
                  <HelpCircle size={14} />
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/envios-y-devoluciones" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light flex items-center gap-2">
                  <Truck size={14} />
                  Envíos y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/guia-de-tallas" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light flex items-center gap-2">
                  <Package size={14} />
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light flex items-center gap-2">
                  <Shield size={14} />
                  Garantía
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light">
                  Comparar Productos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://wa.me/50671447395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
                >
                  (506) 7144-7395
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:ventas@arktee.com"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
                >
                  ventas@arktee.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-light">
                  Costa Rica
                </span>
              </li>
            </ul>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CreditCard size={16} />
                <span className="font-light">Pagos seguros</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-width px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light text-center sm:text-left">
              © 2025 <span className="font-semibold">ArkTee</span>. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              <Link 
                href="/politica-de-privacidad" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="/terminos-y-condiciones" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
              >
                Términos y Condiciones
              </Link>
              <Link 
                href="/aviso-legal" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
              >
                Aviso Legal
              </Link>
              <Link 
                href="/politica-de-cookies" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
