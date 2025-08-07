import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Activity, DollarSign,
  Package, Users, Calendar, Clock, MapPin, Truck, AlertCircle,
  Download, Filter, RefreshCw, ChevronUp, ChevronDown, MoreVertical,
  Eye, Share2, Printer, FileText, PieChart, LineChart, Target,
  Award, Zap, ArrowUpRight, ArrowDownRight, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart as RechartsLine, Line, BarChart, Bar, PieChart as RechartsPie, 
         Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         Area, AreaChart, RadialBarChart, RadialBar } from 'recharts';

function AnalyticsManager() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Datos de ejemplo para Tesili
  const revenueData = [
    { month: 'Ene', revenue: 45000, rentals: 120, growth: 5 },
    { month: 'Feb', revenue: 52000, rentals: 145, growth: 15 },
    { month: 'Mar', revenue: 48000, rentals: 132, growth: -8 },
    { month: 'Abr', revenue: 61000, rentals: 168, growth: 27 },
    { month: 'May', revenue: 58000, rentals: 160, growth: -5 },
    { month: 'Jun', revenue: 67000, rentals: 185, growth: 15 },
    { month: 'Jul', revenue: 72000, rentals: 198, growth: 7 },
    { month: 'Ago', revenue: 69000, rentals: 190, growth: -4 },
    { month: 'Sep', revenue: 75000, rentals: 206, growth: 9 },
    { month: 'Oct', revenue: 82000, rentals: 225, growth: 9 },
    { month: 'Nov', revenue: 78000, rentals: 215, growth: -5 }
  ];

  const inventoryUtilization = [
    { type: 'Cajas Pequeñas', total: 100, inUse: 85, available: 15, utilization: 85 },
    { type: 'Cajas Medianas', total: 150, inUse: 120, available: 30, utilization: 80 },
    { type: 'Cajas Grandes', total: 80, inUse: 72, available: 8, utilization: 90 },
    { type: 'Carritos', total: 40, inUse: 32, available: 8, utilization: 80 },
    { type: 'Racks', total: 25, inUse: 20, available: 5, utilization: 80 }
  ];

  const customerSegments = [
    { name: 'Residencial', value: 45, count: 234, color: '#60A5FA' },
    { name: 'Oficinas', value: 30, count: 156, color: '#34D399' },
    { name: 'Mudanzas', value: 15, count: 78, color: '#FBBF24' },
    { name: 'Temporal', value: 10, count: 52, color: '#A78BFA' }
  ];

  const performanceMetrics = {
    revenue: {
      current: 78000,
      previous: 82000,
      change: -4.88,
      target: 85000,
      achievement: 91.7
    },
    customers: {
      current: 520,
      previous: 495,
      change: 5.05,
      new: 45,
      churn: 20
    },
    utilization: {
      current: 84,
      previous: 79,
      change: 6.33,
      peak: 92,
      average: 81
    },
    operations: {
      deliveries: 215,
      pickups: 187,
      onTime: 94,
      satisfaction: 4.7
    }
  };

  const topCustomers = [
    { name: 'Empresa ABC', revenue: 12500, rentals: 45, duration: '8 meses', trend: 'up' },
    { name: 'Juan Carlos Pérez', revenue: 8900, rentals: 32, duration: '14 meses', trend: 'stable' },
    { name: 'Oficinas Polanco', revenue: 7600, rentals: 28, duration: '6 meses', trend: 'up' },
    { name: 'María González', revenue: 6200, rentals: 24, duration: '10 meses', trend: 'down' },
    { name: 'Constructora XYZ', revenue: 5800, rentals: 22, duration: '4 meses', trend: 'up' }
  ];

  const dailyActivity = [
    { hour: '00', rentals: 2, returns: 1 },
    { hour: '06', rentals: 5, returns: 3 },
    { hour: '09', rentals: 22, returns: 8 },
    { hour: '12', rentals: 18, returns: 15 },
    { hour: '15', rentals: 25, returns: 20 },
    { hour: '18', rentals: 15, returns: 22 },
    { hour: '21', rentals: 8, returns: 5 }
  ];

  const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#F87171'];

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4" />;
    return null;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-500 mt-1">Análisis de rendimiento y métricas • Tesili</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mes</option>
                <option value="quarter">Último Trimestre</option>
                <option value="year">Último Año</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg font-medium hover:bg-gray-700 transition-all flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Actualizar</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <span className={`text-sm font-medium flex items-center ${getChangeColor(performanceMetrics.revenue.change)}`}>
                {getChangeIcon(performanceMetrics.revenue.change)}
                {Math.abs(performanceMetrics.revenue.change)}%
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold">${(performanceMetrics.revenue.current/1000).toFixed(0)}k</p>
              <p className="text-sm text-gray-500 mt-1">Ingresos del Mes</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Meta: ${(performanceMetrics.revenue.target/1000).toFixed(0)}k</span>
                <span className="text-xs font-medium text-cyan-400">{performanceMetrics.revenue.achievement}%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${performanceMetrics.revenue.achievement}%` }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <span className={`text-sm font-medium flex items-center ${getChangeColor(performanceMetrics.customers.change)}`}>
                {getChangeIcon(performanceMetrics.customers.change)}
                {Math.abs(performanceMetrics.customers.change)}%
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold">{performanceMetrics.customers.current}</p>
              <p className="text-sm text-gray-500 mt-1">Clientes Activos</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Nuevos</p>
                  <p className="text-sm font-medium text-green-400">+{performanceMetrics.customers.new}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bajas</p>
                  <p className="text-sm font-medium text-red-400">-{performanceMetrics.customers.churn}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <span className={`text-sm font-medium flex items-center ${getChangeColor(performanceMetrics.utilization.change)}`}>
                {getChangeIcon(performanceMetrics.utilization.change)}
                {Math.abs(performanceMetrics.utilization.change)}%
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold">{performanceMetrics.utilization.current}%</p>
              <p className="text-sm text-gray-500 mt-1">Utilización de Inventario</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Pico</p>
                  <p className="text-sm font-medium">{performanceMetrics.utilization.peak}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Promedio</p>
                  <p className="text-sm font-medium">{performanceMetrics.utilization.average}%</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-sm font-medium text-green-400">
                {performanceMetrics.operations.satisfaction}/5.0
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold">{performanceMetrics.operations.onTime}%</p>
              <p className="text-sm text-gray-500 mt-1">Entregas a Tiempo</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Entregas</p>
                  <p className="text-sm font-medium">{performanceMetrics.operations.deliveries}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Recolecciones</p>
                  <p className="text-sm font-medium">{performanceMetrics.operations.pickups}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
                Tendencia de Ingresos y Rentas
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'revenue' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  Ingresos
                </button>
                <button
                  onClick={() => setSelectedMetric('rentals')}
                  className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'rentals' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  Rentas
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                {selectedMetric === 'revenue' ? (
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#06B6D4" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                ) : (
                  <Area 
                    type="monotone" 
                    dataKey="rentals" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#colorRentals)" 
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Customer Segments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-400" />
              Segmentos de Clientes
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPie>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {customerSegments.map((segment) => (
                <div key={segment.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-gray-400">{segment.name}</span>
                  </div>
                  <span className="font-medium">{segment.count} clientes</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Inventory Utilization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Package className="w-5 h-5 mr-2 text-green-400" />
              Utilización de Inventario
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={inventoryUtilization} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="type" type="category" stroke="#9CA3AF" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                />
                <Bar dataKey="utilization" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Daily Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-yellow-400" />
              Actividad Diaria
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                />
                <Line type="monotone" dataKey="rentals" stroke="#60A5FA" strokeWidth={2} name="Rentas" />
                <Line type="monotone" dataKey="returns" stroke="#F87171" strokeWidth={2} name="Devoluciones" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Top Clientes
            </h3>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.duration} • {customer.rentals} rentas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(customer.revenue/1000).toFixed(1)}k</p>
                    {customer.trend === 'up' && <span className="text-xs text-green-400">↑</span>}
                    {customer.trend === 'down' && <span className="text-xs text-red-400">↓</span>}
                    {customer.trend === 'stable' && <span className="text-xs text-gray-400">→</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Estadísticas Rápidas
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ticket Promedio</span>
                <span className="font-medium">$1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Duración Promedio</span>
                <span className="font-medium">3.5 meses</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Tasa de Renovación</span>
                <span className="font-medium text-green-400">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">NPS Score</span>
                <span className="font-medium text-cyan-400">72</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Tiempo de Respuesta</span>
                <span className="font-medium">2.5 hrs</span>
              </div>
            </div>
          </div>

          {/* Growth Indicators */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              Indicadores de Crecimiento
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Meta Mensual</span>
                  <span className="text-sm font-medium">91.7%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '91.7%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Meta Trimestral</span>
                  <span className="text-sm font-medium">76%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '76%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Meta Anual</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Recommendations */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              Alertas y Recomendaciones
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm font-medium text-red-400">Inventario Bajo</p>
                <p className="text-xs text-gray-400 mt-1">Cajas grandes al 90% de capacidad</p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm font-medium text-yellow-400">Optimización</p>
                <p className="text-xs text-gray-400 mt-1">Redistribuir carritos en zona norte</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm font-medium text-green-400">Oportunidad</p>
                <p className="text-xs text-gray-400 mt-1">Alta demanda en Polanco (+23%)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AnalyticsManager;
