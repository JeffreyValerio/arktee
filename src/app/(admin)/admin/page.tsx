export const dynamic = 'force-dynamic';

import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  DollarSign,
  Eye
} from "lucide-react";

// Mock data - en producción vendría de la base de datos
const stats = [
  {
    name: "Productos Totales",
    value: "1,248",
    change: "+12%",
    changeType: "increase" as const,
    icon: Package,
  },
  {
    name: "Usuarios Activos",
    value: "3,421",
    change: "+8%",
    changeType: "increase" as const,
    icon: Users,
  },
  {
    name: "Pedidos del Mes",
    value: "892",
    change: "+23%",
    changeType: "increase" as const,
    icon: ShoppingCart,
  },
  {
    name: "Ingresos del Mes",
    value: "$24,580",
    change: "+18%",
    changeType: "increase" as const,
    icon: DollarSign,
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "Juan Pérez", amount: "$89.99", status: "Completado", date: "2024-01-15" },
  { id: "ORD-002", customer: "María García", amount: "$124.50", status: "En proceso", date: "2024-01-15" },
  { id: "ORD-003", customer: "Carlos López", amount: "$67.25", status: "Pendiente", date: "2024-01-14" },
  { id: "ORD-004", customer: "Ana Martínez", amount: "$156.75", status: "Completado", date: "2024-01-14" },
];

const topProducts = [
  { name: "Camiseta Básica", sales: 245, revenue: "$4,900" },
  { name: "Jeans Clásicos", sales: 189, revenue: "$5,670" },
  { name: "Zapatillas Deportivas", sales: 156, revenue: "$3,900" },
  { name: "Chaqueta de Cuero", sales: 98, revenue: "$4,900" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Resumen general de tu tienda
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                vs mes anterior
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Pedidos Recientes
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.amount}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === "Completado" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : order.status === "En proceso"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Productos Más Vendidos
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mr-3">
                      <span className="text-sm font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.sales} ventas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {product.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors duration-200">
            <Package className="h-8 w-8 text-primary mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Nuevo Producto
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Agregar un nuevo producto
              </p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200">
            <Eye className="h-8 w-8 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Ver Tienda
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ver como cliente
              </p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Ver Analíticas
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Estadísticas detalladas
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 