import React, { useState } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin,
  Package, Truck, Users, Filter, Search, Settings, Download,
  Bell, AlertCircle, CheckCircle, XCircle, Eye, Edit2,
  MoreVertical, Star, Tag, Zap, TrendingUp, Activity,
  CalendarDays, CalendarRange, List, Grid3x3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CalendarManager() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day, list
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Eventos de ejemplo para Tesili
  const [events] = useState([
    {
      id: 1,
      title: 'Entrega - Juan Pérez',
      type: 'delivery',
      date: '2024-11-15',
      time: '09:00',
      duration: 2,
      client: 'Juan Carlos Pérez',
      address: 'Av. Insurgentes Sur 1234, Del Valle',
      packages: { cajas: 5, carritos: 1 },
      status: 'confirmed',
      priority: 'high',
      notes: 'Cliente preferencial, manejar con cuidado extra'
    },
    {
      id: 2,
      title: 'Recolección - María González',
      type: 'pickup',
      date: '2024-11-15',
      time: '14:00',
      duration: 1.5,
      client: 'María González',
      address: 'Reforma 222, Juárez',
      packages: { cajas: 10, carritos: 2 },
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Entrega - Oficina Polanco',
      type: 'delivery',
      date: '2024-11-16',
      time: '10:00',
      duration: 3,
      client: 'Empresa ABC',
      address: 'Polanco 456, Miguel Hidalgo',
      packages: { cajas: 15, carritos: 3 },
      status: 'confirmed',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Mantenimiento de Inventario',
      type: 'maintenance',
      date: '2024-11-17',
      time: '08:00',
      duration: 4,
      status: 'scheduled',
      priority: 'low',
      notes: 'Revisión mensual de cajas y equipos'
    },
    {
      id: 5,
      title: 'Recolección - Del Valle',
      type: 'pickup',
      date: '2024-11-18',
      time: '11:00',
      duration: 2,
      client: 'Roberto Silva',
      address: 'Gabriel Mancera 123, Del Valle',
      packages: { cajas: 8, carritos: 1 },
      status: 'confirmed',
      priority: 'medium'
    }
  ]);

  // Estadísticas del mes
  const monthStats = {
    totalEvents: 45,
    deliveries: 23,
    pickups: 18,
    maintenance: 4,
    completionRate: 92,
    onTimeRate: 88,
    revenue: 156780
  };

  // Funciones de calendario
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        events: []
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dateStr = currentDate.toISOString().split('T')[0];
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        events: events.filter(e => e.date === dateStr)
      });
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        events: []
      });
    }
    
    return days;
  };

  const calendarDays = getDaysInMonth(currentDate);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getEventColor = (type) => {
    switch(type) {
      case 'delivery': return 'bg-blue-500';
      case 'pickup': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-cyan-500/20 text-cyan-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(e => e.type === filterType);

  const todayEvents = events.filter(e => {
    const today = new Date().toISOString().split('T')[0];
    return e.date === today;
  });

  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Calendario de Operaciones
              </h1>
              <p className="text-gray-500 mt-1">Gestión de entregas y recolecciones • Tesili</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                onClick={() => setShowEventModal(true)}
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Evento</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg font-medium hover:bg-gray-700 transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Total Eventos</p>
                  <p className="text-2xl font-bold">{monthStats.totalEvents}</p>
                </div>
                <Calendar className="w-8 h-8 text-indigo-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Entregas</p>
                  <p className="text-2xl font-bold text-blue-400">{monthStats.deliveries}</p>
                </div>
                <Truck className="w-8 h-8 text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Recolecciones</p>
                  <p className="text-2xl font-bold text-green-400">{monthStats.pickups}</p>
                </div>
                <Package className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Mantenimiento</p>
                  <p className="text-2xl font-bold text-yellow-400">{monthStats.maintenance}</p>
                </div>
                <Settings className="w-8 h-8 text-yellow-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Completado</p>
                  <p className="text-2xl font-bold text-cyan-400">{monthStats.completionRate}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">A Tiempo</p>
                  <p className="text-2xl font-bold text-purple-400">{monthStats.onTimeRate}%</p>
                </div>
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Ingresos</p>
                  <p className="text-lg font-bold text-green-400">${(monthStats.revenue/1000).toFixed(0)}k</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              {/* Calendar Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    Hoy
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">Todos</option>
                    <option value="delivery">Entregas</option>
                    <option value="pickup">Recolecciones</option>
                    <option value="maintenance">Mantenimiento</option>
                  </select>
                  <div className="flex bg-gray-800 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('month')}
                      className={`p-1.5 rounded ${viewMode === 'month' ? 'bg-gray-700' : ''}`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('week')}
                      className={`p-1.5 rounded ${viewMode === 'week' ? 'bg-gray-700' : ''}`}
                    >
                      <CalendarDays className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-700' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              {viewMode === 'month' && (
                <div>
                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                      const isToday = day.date.toDateString() === new Date().toDateString();
                      const hasEvents = day.events.length > 0;
                      
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className={`min-h-24 p-2 rounded-lg border cursor-pointer transition-all ${
                            day.isCurrentMonth 
                              ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
                              : 'bg-gray-900/30 border-gray-800'
                          } ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
                          onClick={() => setSelectedDate(day.date)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-sm font-medium ${
                              day.isCurrentMonth ? 'text-gray-300' : 'text-gray-600'
                            } ${isToday ? 'text-indigo-400' : ''}`}>
                              {day.date.getDate()}
                            </span>
                            {hasEvents && (
                              <span className="text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded">
                                {day.events.length}
                              </span>
                            )}
                          </div>
                          
                          {/* Event Indicators */}
                          <div className="space-y-1">
                            {day.events.slice(0, 3).map((event, idx) => (
                              <div
                                key={idx}
                                className={`h-1 rounded-full ${getEventColor(event.type)}`}
                              />
                            ))}
                            {day.events.length > 3 && (
                              <p className="text-xs text-gray-500">+{day.events.length - 3} más</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-8 rounded-full ${getEventColor(event.type)}`} />
                            <div>
                              <h3 className="font-semibold">{event.title}</h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {event.date}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {event.time}
                                </span>
                                {event.address && (
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {event.address}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                          <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-indigo-400" />
                Eventos de Hoy
              </h3>
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.time} - {event.duration}h</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No hay eventos programados para hoy</p>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Próximos Eventos
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-2 border-gray-700 pl-3">
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-500">{event.date}</span>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    {event.client && (
                      <p className="text-xs text-gray-400 mt-1">Cliente: {event.client}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Acciones Rápidas
              </h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left transition-colors">
                  📅 Programar Entrega
                </button>
                <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left transition-colors">
                  📦 Programar Recolección
                </button>
                <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left transition-colors">
                  🔧 Programar Mantenimiento
                </button>
                <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left transition-colors">
                  📊 Ver Disponibilidad
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Modal */}
        <AnimatePresence>
          {showEventModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowEventModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-6">Programar Nuevo Evento</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tipo de Evento</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500">
                      <option value="delivery">Entrega</option>
                      <option value="pickup">Recolección</option>
                      <option value="maintenance">Mantenimiento</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Cliente</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
                      placeholder="Nombre del cliente"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Fecha</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Hora</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Dirección</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
                      placeholder="Dirección completa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Cajas</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Carritos</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Notas</label>
                    <textarea
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
                      rows="3"
                      placeholder="Notas adicionales..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Programar Evento
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default CalendarManager;
