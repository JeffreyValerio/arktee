export const dynamic = 'force-dynamic';

import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - en producción vendría de la base de datos
const reports = [
  {
    id: "sales-report",
    title: "Reporte de Ventas",
    description: "Análisis detallado de ventas por período",
    icon: DollarSign,
    lastGenerated: "2024-01-15",
    frequency: "Mensual",
    status: "Disponible"
  },
  {
    id: "users-report",
    title: "Reporte de Usuarios",
    description: "Estadísticas de usuarios y comportamiento",
    icon: Users,
    lastGenerated: "2024-01-14",
    frequency: "Semanal",
    status: "Disponible"
  },
  {
    id: "products-report",
    title: "Reporte de Productos",
    description: "Rendimiento de productos y inventario",
    icon: Package,
    lastGenerated: "2024-01-13",
    frequency: "Diario",
    status: "Disponible"
  },
  {
    id: "orders-report",
    title: "Reporte de Pedidos",
    description: "Análisis de pedidos y conversiones",
    icon: ShoppingCart,
    lastGenerated: "2024-01-12",
    frequency: "Diario",
    status: "Disponible"
  },
];

const quickStats = [
  {
    name: "Reportes Generados",
    value: "24",
    change: "+12%",
    icon: FileText,
  },
  {
    name: "Descargas del Mes",
    value: "156",
    change: "+8%",
    icon: Download,
  },
  {
    name: "Reportes Programados",
    value: "8",
    change: "+2",
    icon: Calendar,
  },
  {
    name: "Tiempo Promedio",
    value: "2.3 min",
    change: "-0.5 min",
    icon: TrendingUp,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Reportes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Genera y descarga reportes detallados de tu tienda
          </p>
        </div>

        <Button className="flex items-center gap-2">
          <FileText size={16} />
          Generar Reporte
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.change} vs mes anterior
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-primary/10 rounded-lg mr-4">
                  <report.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {report.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  report.status === "Disponible" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                }`}>
                  {report.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Último generado:</span>
                <span className="text-gray-900 dark:text-gray-100">
                  {new Date(report.lastGenerated).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Frecuencia:</span>
                <span className="text-gray-900 dark:text-gray-100">{report.frequency}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Download size={14} className="mr-2" />
                Descargar
              </Button>
              <Button variant="outline" size="sm">
                <Calendar size={14} className="mr-2" />
                Programar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Reportes Recientes
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <report.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {report.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generado el {new Date(report.lastGenerated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Download size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            ¿Necesitas un reporte personalizado?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Crea reportes personalizados con los datos que necesites
          </p>
          <Button className="flex items-center gap-2">
            <FileText size={16} />
            Crear Reporte Personalizado
          </Button>
        </div>
      </div>
    </div>
  );
}
