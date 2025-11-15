export const dynamic = 'force-dynamic';

import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Heart
} from "lucide-react";

// Mock data - en producción vendría de la base de datos
const analyticsData = {
  overview: {
    totalRevenue: 24580,
    revenueChange: 18.5,
    totalOrders: 892,
    ordersChange: 23.2,
    totalUsers: 3421,
    usersChange: 8.7,
    conversionRate: 3.2,
    conversionChange: -2.1,
  },
  topProducts: [
    { name: "Camiseta Básica", sales: 245, revenue: 4900, growth: 12.5 },
    { name: "Jeans Clásicos", sales: 189, revenue: 5670, growth: 8.3 },
    { name: "Zapatillas Deportivas", sales: 156, revenue: 3900, growth: 15.7 },
    { name: "Chaqueta de Cuero", sales: 98, revenue: 4900, growth: -3.2 },
    { name: "Pantalón Cargo", sales: 87, revenue: 2610, growth: 22.1 },
  ],
  recentActivity: [
    { type: "order", user: "Juan Pérez", action: "realizó un pedido", amount: "$89.99", time: "2 min ago" },
    { type: "user", user: "María García", action: "se registró", amount: "", time: "5 min ago" },
    { type: "product", user: "Carlos López", action: "agregó producto a favoritos", amount: "", time: "8 min ago" },
    { type: "order", user: "Ana Martínez", action: "completó un pedido", amount: "$156.75", time: "12 min ago" },
  ],
  salesByMonth: [
    { month: "Ene", sales: 4200 },
    { month: "Feb", sales: 3800 },
    { month: "Mar", sales: 4500 },
    { month: "Abr", sales: 5200 },
    { month: "May", sales: 4800 },
    { month: "Jun", sales: 6100 },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Analíticas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Estadísticas detalladas de tu tienda
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ingresos Totales
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                ${analyticsData.overview.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">
              +{analyticsData.overview.revenueChange}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              vs mes anterior
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Pedidos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {analyticsData.overview.totalOrders}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">
              +{analyticsData.overview.ordersChange}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              vs mes anterior
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Usuarios Totales
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {analyticsData.overview.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">
              +{analyticsData.overview.usersChange}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              vs mes anterior
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tasa de Conversión
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {analyticsData.overview.conversionRate}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
            <span className="text-sm font-medium text-red-600">
              {analyticsData.overview.conversionChange}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              vs mes anterior
            </span>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Productos Más Vendidos
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
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
                      ${product.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center">
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span className={`text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Actividad Reciente
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="flex-shrink-0 mr-3">
                    {activity.type === "order" && (
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <ShoppingCart className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === "user" && (
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === "product" && (
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Heart className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    {activity.amount && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.amount}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Ventas por Mes
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Evolución de las ventas en los últimos 6 meses
          </p>
        </div>
        
        <div className="space-y-4">
              {analyticsData.salesByMonth.map((month) => (
            <div key={month.month} className="flex items-center">
              <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                {month.month}
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(month.sales / Math.max(...analyticsData.salesByMonth.map(m => m.sales))) * 100}%` 
                    }}
                  />
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 dark:text-gray-100 text-right">
                ${month.sales.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
