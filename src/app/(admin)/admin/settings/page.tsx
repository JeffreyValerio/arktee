export const dynamic = 'force-dynamic';

import { 
  Store, 
  Bell, 
  Shield, 
  Palette,
  CreditCard,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-úl mt-1">
          Configura tu tienda y preferencias
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Información de la Tienda
              </h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="store-name">Nombre de la tienda</Label>
              <Input id="store-name" defaultValue="Mi Tienda" />
            </div>
            <div>
              <Label htmlFor="store-description">Descripción</Label>
              <Textarea 
                id="store-description" 
                defaultValue="Tu tienda de ropa online"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="store-email">Email de contacto</Label>
              <Input id="store-email" type="email" defaultValue="contacto@mitienda.com" />
            </div>
            <div>
              <Label htmlFor="store-phone">Teléfono</Label>
              <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <Button className="w-full">
              Guardar Cambios
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-3">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Notificaciones
              </h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Nuevos pedidos
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recibe notificaciones cuando lleguen nuevos pedidos
                </p>
              </div>
              <Badge variant="default">Activado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Productos agotados
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avisos cuando el stock esté bajo
                </p>
              </div>
              <Badge variant="default">Activado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Reseñas de productos
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Notificaciones de nuevas reseñas
                </p>
              </div>
              <Badge variant="outline">Desactivado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Reportes semanales
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Resumen semanal de ventas
                </p>
              </div>
              <Badge variant="default">Activado</Badge>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg mr-3">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Seguridad
              </h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Autenticación de dos factores
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Protección adicional para tu cuenta
                </p>
              </div>
              <Badge variant="outline">Desactivado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Cambio de contraseña
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Última actualización hace 30 días
                </p>
              </div>
              <Button variant="outline" size="sm">
                Cambiar
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Sesiones activas
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3 dispositivos conectados
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ver todas
              </Button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-3">
                <Palette className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Apariencia
              </h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="theme">Tema</Label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="theme" value="light" defaultChecked className="mr-2" />
                  <span className="component-sm">Claro</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="theme" value="dark" className="mr-2" />
                  <span className="text-sm">Oscuro</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="theme" value="auto" className="mr-2" />
                  <span className="text-sm">Automático</span>
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="language">Idioma</Label>
              <select id="language" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timezone">Zona horaria</Label>
              <select id="timezone" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                <option value="America/New_York">Nueva York (GMT-5)</option>
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mr-3">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Pagos
              </h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  PayPal
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Método de pago PayPal
                </p>
              </div>
              <Badge variant="default">Activado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Stripe
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Procesamiento de tarjetas
                </p>
              </div>
              <Badge variant="outline">Desactivado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Transferencia bancaria
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pagos por transferencia
                </p>
              </div>
              <Badge variant="default">Activado</Badge>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
                <Database className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Información del Sistema
              </h3>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Versión:</span>
              <span className="text-gray-900 dark:text-gray-100">v2.1.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Última actualización:</span>
              <span className="text-gray-900 dark:text-gray-100">15 Ene 2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Base de datos:</span>
              <span className="text-gray-900 dark:text-gray-100">PostgreSQL 15.2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Servidor:</span>
              <span className="text-gray-900 dark:text-gray-100">Ubuntu 22.04</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Uso de almacenamiento:</span>
              <span className="text-gray-900 dark:text-gray-100">2.3 GB / 10 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save All Changes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Guardar Configuración
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Guarda todos los cambios realizados en la configuración
            </p>
          </div>
          <Button size="lg">
            Guardar Todo
          </Button>
        </div>
      </div>
    </div>
  );
}
