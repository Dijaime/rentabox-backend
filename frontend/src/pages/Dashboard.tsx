
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, Users, Calendar, CreditCard,
  BarChart3, Settings, TrendingUp, TrendingDown, DollarSign,
  ShoppingCart, Truck, MapPin, ChevronRight, FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Animated counter
const AnimatedValue = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(numericValue);
    }, 100);
    return () => clearTimeout(timer);
  }, [numericValue]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-3xl font-bold"
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={displayValue}
      >
        {displayValue.toLocaleString()}
      </motion.span>
      {suffix}
    </motion.span>
  );
};


const Dashboard = () => {
    // Mock data for the dashboard
    const revenueData = [
        { month: 'Ene', hogar: 45000, oficina: 22000, adicionales: 8000 },
        { month: 'Feb', hogar: 52000, oficina: 28000, adicionales: 9500 },
        { month: 'Mar', hogar: 48000, oficina: 31000, adicionales: 11000 },
        { month: 'Abr', hogar: 61000, oficina: 35000, adicionales: 12000 },
        { month: 'May', hogar: 72000, oficina: 42000, adicionales: 14000 },
        { month: 'Jun', hogar: 85000, oficina: 48000, adicionales: 16000 },
        { month: 'Jul', hogar: 92000, oficina: 51000, adicionales: 18000 },
      ];
    
      const paquetesDistribucion = [
        { name: 'Estudio', value: 25, color: '#3B82F6', count: 142 },
        { name: '1 Recámara', value: 28, color: '#10B981', count: 159 },
        { name: '2 Recámaras', value: 22, color: '#F59E0B', count: 125 },
        { name: '3+ Recámaras', value: 15, color: '#EF4444', count: 85 },
        { name: 'Oficinas', value: 10, color: '#8B5CF6', count: 57 }
      ];
    
      const kpiCards = [
        {
          title: 'Ingresos del Mes',
          value: '$161,450',
          change: '+18.5%',
          trend: 'up',
          icon: DollarSign,
          color: 'blue',
          subtitle: 'Meta: $200,000'
        },
        {
          title: 'Mudanzas Activas',
          value: '87',
          change: '+12.3%',
          trend: 'up',
          icon: Truck,
          color: 'green',
          subtitle: '23 entregas hoy'
        },
        {
          title: 'Cajas Disponibles',
          value: '2,847',
          change: '-5.2%',
          trend: 'down',
          icon: Package,
          color: 'purple',
          subtitle: 'Reorden en 5 días'
        },
        {
          title: 'Clientes Activos',
          value: '1,256',
          change: '+22.7%',
          trend: 'up',
          icon: Users,
          color: 'orange',
          subtitle: '45 nuevos esta semana'
        }
      ];
    
      const recentActivities = [
        { 
          id: 1, 
          type: 'nueva_mudanza',
          cliente: 'Juan Pérez',
          servicio: 'Hogar - 2 Recámaras',
          direccion: 'Col. Insurgentes Mixcoac',
          semanas: 3,
          total: '$3,768.59',
          time: 'Hace 5 min',
          status: 'confirmado',
          token: '1206679240926'
        },
        {
          id: 2,
          type: 'recoleccion',
          cliente: 'María García',
          servicio: 'Oficina - Individual',
          direccion: 'Col. Polanco',
          time: 'Hace 15 min',
          status: 'en_ruta'
        },
        {
          id: 3,
          type: 'entrega',
          cliente: 'Carlos López',
          servicio: 'Hogar - Estudio',
          direccion: 'Col. Roma Norte',
          cajas: 15,
          time: 'Hace 1 hora',
          status: 'completado'
        },
        {
          id: 4,
          type: 'pago',
          cliente: 'Ana Martínez',
          monto: '$5,654.24',
          metodo: 'Tarjeta',
          time: 'Hace 2 horas',
          status: 'procesado'
        },
        {
          id: 5,
          type: 'cotizacion',
          cliente: 'Roberto Silva',
          servicio: 'Hogar - 3 Recámaras',
          time: 'Hace 3 horas',
          status: 'pendiente'
        }
      ];
    
      const proximasActividades = [
        {
          id: 1,
          tipo: 'Entrega',
          cliente: 'Laura Mendoza',
          direccion: 'Coyoacán, CDMX',
          hora: '09:00 AM',
          paquete: 'Estudio - 2 semanas',
          cajas: 12
        },
        {
          id: 2,
          tipo: 'Recolección',
          cliente: 'Pedro Ramírez',
          direccion: 'Benito Juárez, CDMX',
          hora: '11:30 AM',
          paquete: '2 Recámaras - 4 semanas',
          cajas: 25
        },
        {
          id: 3,
          tipo: 'Entrega',
          cliente: 'Sofia Hernández',
          direccion: 'Miguel Hidalgo, CDMX',
          hora: '02:00 PM',
          paquete: 'Oficina - 5 personas',
          cajas: 20
        }
    ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Dashboard - Renta Cajas Tesili
          </h1>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full">
            v2.0
          </span>
        </div>
        <p className="text-gray-500">Control completo de mudanzas y logística • Sistema profesional de renta de cajas</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${
                card.color === 'blue' ? 'from-blue-500/20 to-cyan-600/20' :
                card.color === 'green' ? 'from-green-500/20 to-emerald-600/20' :
                card.color === 'purple' ? 'from-purple-500/20 to-violet-600/20' :
                'from-orange-500/20 to-amber-600/20'
              }`}>
                <card.icon className={`w-6 h-6 ${
                  card.color === 'blue' ? 'text-cyan-400' :
                  card.color === 'green' ? 'text-emerald-400' :
                  card.color === 'purple' ? 'text-violet-400' :
                  'text-amber-400'
                }`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                card.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {card.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">{card.change}</span>
              </div>
            </div>
            <AnimatedValue value={card.value} prefix={card.value.includes('$') ? '$' : ''} />
            <p className="text-gray-400 text-sm mt-1">{card.title}</p>
            <p className="text-gray-600 text-xs mt-2">{card.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Ingresos por Servicio</h2>
              <p className="text-sm text-gray-500 mt-1">Últimos 7 meses • Tesili</p>
            </div>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="hogar" stackId="a" fill="#3B82F6" />
              <Bar dataKey="oficina" stackId="a" fill="#10B981" />
              <Bar dataKey="adicionales" stackId="a" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Hogar</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Oficina</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Adicionales</span>
            </div>
          </div>
        </motion.div>

        {/* Paquetes Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-6">Distribución de Paquetes</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paquetesDistribucion}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {paquetesDistribucion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {paquetesDistribucion.map((paquete) => (
              <div key={paquete.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: paquete.color }}
                  />
                  <span className="text-sm text-gray-400">{paquete.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{paquete.count}</span>
                  <span className="text-xs text-gray-500 ml-2">({paquete.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Actividad Reciente</h2>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center space-x-1">
              <span>Ver todo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  activity.type === 'nueva_mudanza' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'recoleccion' ? 'bg-yellow-500/20 text-yellow-400' :
                  activity.type === 'entrega' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'pago' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {activity.type === 'nueva_mudanza' ? <ShoppingCart className="w-4 h-4" /> :
                   activity.type === 'recoleccion' ? <Package className="w-4 h-4" /> :
                   activity.type === 'entrega' ? <Truck className="w-4 h-4" /> :
                   activity.type === 'pago' ? <DollarSign className="w-4 h-4" /> :
                   <FileText className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {activity.type === 'nueva_mudanza' && `Nueva mudanza - ${activity.servicio}`}
                    {activity.type === 'recoleccion' && `Recolección programada`}
                    {activity.type === 'entrega' && `Entrega completada - ${activity.cajas} cajas`}
                    {activity.type === 'pago' && `Pago recibido - ${activity.monto}`}
                    {activity.type === 'cotizacion' && `Nueva cotización`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.cliente} • {activity.direccion || activity.metodo || ''}
                  </p>
                  {activity.token && (
                    <p className="text-xs text-cyan-400 mt-1 font-mono">
                      Token: {activity.token}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'confirmado' ? 'bg-green-500/20 text-green-400' :
                    activity.status === 'en_ruta' ? 'bg-yellow-500/20 text-yellow-400' :
                    activity.status === 'completado' ? 'bg-blue-500/20 text-blue-400' :
                    activity.status === 'procesado' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {activity.status}
                  </span>
                  <span className="text-xs text-gray-600">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Próximas Actividades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Agenda de Hoy</h2>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <div className="space-y-4">
            {proximasActividades.map((actividad, index) => (
              <motion.div
                key={actividad.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-l-4 border-cyan-500 pl-4 py-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${
                        actividad.tipo === 'Entrega' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {actividad.tipo}
                      </span>
                      <span className="text-xs text-gray-500">• {actividad.hora}</span>
                    </div>
                    <p className="text-sm font-medium mt-1">{actividad.cliente}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      <MapPin className="inline w-3 h-3 mr-1" />
                      {actividad.direccion}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded">
                        {actividad.paquete}
                      </span>
                      <span className="text-xs text-gray-400">
                        {actividad.cajas} cajas
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 group">
            <Calendar className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
            <span>Ver calendario completo</span>
          </button>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-xs text-gray-600"
      >
        <p>Renta Cajas Tesili © 2024 • Sistema de Gestión Profesional • info@tesili.net</p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
