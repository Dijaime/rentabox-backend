
import React, { useState, useEffect } from 'react';
import { 
  Database, Search, Filter, Download, Upload, Plus, Edit2, Trash2, 
  Eye, Check, X, AlertCircle, FileText, Users, Package, Truck,
  Calendar, DollarSign, MapPin, Phone, Mail, Hash, Clock,
  ChevronDown, ChevronRight, MoreVertical, RefreshCw, Shield,
  CheckCircle, XCircle, AlertTriangle, Copy, ExternalLink,
  BarChart3, TrendingUp, Activity, Layers, Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function DatabaseManager() {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortField, setSortField] = useState('fecha');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Estructura EXACTA de la base de datos según CSV de Tesili
  const databaseSchema = {
    orders: {
      tableName: 'pedidos',
      fields: [
        { name: 'fecha', type: 'datetime', required: true, label: 'Fecha' },
        { name: 'nombre', type: 'string', required: true, label: 'Nombre' },
        { name: 'apellidos', type: 'string', required: true, label: 'Apellidos' },
        { name: 'email', type: 'email', required: true, label: 'Email' },
        { name: 'telefono', type: 'phone', required: true, label: 'Teléfono' },
        { name: 'calle_entrega', type: 'string', required: true, label: 'Calle Entrega' },
        { name: 'interior_entrega', type: 'string', required: false, label: 'Interior Entrega' },
        { name: 'colonia_entrega', type: 'string', required: true, label: 'Colonia Entrega' },
        { name: 'alcaldia_entrega', type: 'string', required: true, label: 'Alcaldía Entrega' },
        { name: 'estado_entrega', type: 'string', required: true, label: 'Estado Entrega' },
        { name: 'cp_entrega', type: 'string', required: true, label: 'CP Entrega' },
        { name: 'calle_recoleccion', type: 'string', required: true, label: 'Calle Recolección' },
        { name: 'interior_recoleccion', type: 'string', required: false, label: 'Interior Recolección' },
        { name: 'colonia_recoleccion', type: 'string', required: true, label: 'Colonia Recolección' },
        { name: 'alcaldia_recoleccion', type: 'string', required: true, label: 'Alcaldía Recolección' },
        { name: 'estado_recoleccion', type: 'string', required: true, label: 'Estado Recolección' },
        { name: 'cp_recoleccion', type: 'string', required: true, label: 'CP Recolección' },
        { name: 'tipo_servicio', type: 'enum', values: ['hogar', 'oficina'], required: true, label: 'Tipo Servicio' },
        { name: 'paquete', type: 'string', required: true, label: 'Paquete' },
        { name: 'semanas', type: 'number', required: true, label: 'Semanas' },
        { name: 'precio_total', type: 'currency', required: true, label: 'Precio Total' },
        { name: 'cajas_xl', type: 'number', default: 0, label: 'Cajas XL' },
        { name: 'carritos', type: 'number', default: 0, label: 'Carritos' },
        { name: 'film', type: 'number', default: 0, label: 'Film' },
        { name: 'esquineros', type: 'number', default: 0, label: 'Esquineros' },
        { name: 'papel_kraft', type: 'number', default: 0, label: 'Papel Kraft' },
        { name: 'token_seguridad', type: 'string', unique: true, required: true, label: 'Token Seguridad' },
        { name: 'status', type: 'enum', values: ['nuevo', 'confirmado', 'en_proceso', 'entregado', 'recolectado', 'completado', 'cancelado'], label: 'Estado' }
      ]
    }
  };

  // Datos de ejemplo con estructura REAL - MÁS DATOS
  const [ordersData, setOrdersData] = useState([
    {
      id: 1,
      fecha: '2024-11-07 15:48',
      nombre: 'Juan Carlos',
      apellidos: 'Pérez García',
      email: 'jperez@gmail.com',
      telefono: '5521096859',
      calle_entrega: 'Av. Insurgentes Sur 1234',
      interior_entrega: 'Depto 401',
      colonia_entrega: 'Del Valle',
      alcaldia_entrega: 'Benito Juárez',
      estado_entrega: 'CDMX',
      cp_entrega: '03100',
      calle_recoleccion: 'Malaga 11',
      interior_recoleccion: '302',
      colonia_recoleccion: 'Insurgentes Mixcoac',
      alcaldia_recoleccion: 'Benito Juárez',
      estado_recoleccion: 'CDMX',
      cp_recoleccion: '03920',
      tipo_servicio: 'hogar',
      paquete: '2_recamaras',
      semanas: 3,
      precio_total: 3768.59,
      cajas_xl: 5,
      carritos: 1,
      film: 2,
      esquineros: 20,
      papel_kraft: 1,
      token_seguridad: '1206679240926',
      status: 'confirmado'
    },
    {
      id: 2,
      fecha: '2024-11-07 14:23',
      nombre: 'María',
      apellidos: 'González López',
      email: 'mgonzalez@hotmail.com',
      telefono: '5534567890',
      calle_entrega: 'Reforma 222',
      interior_entrega: '',
      colonia_entrega: 'Juárez',
      alcaldia_entrega: 'Cuauhtémoc',
      estado_entrega: 'CDMX',
      cp_entrega: '06600',
      calle_recoleccion: 'Hamburgo 135',
      interior_recoleccion: 'PB',
      colonia_recoleccion: 'Juárez',
      alcaldia_recoleccion: 'Cuauhtémoc',
      estado_recoleccion: 'CDMX',
      cp_recoleccion: '06600',
      tipo_servicio: 'oficina',
      paquete: '5_10_personas',
      semanas: 4,
      precio_total: 5026.12,
      cajas_xl: 10,
      carritos: 2,
      film: 3,
      esquineros: 40,
      papel_kraft: 2,
      token_seguridad: '1206679240927',
      status: 'en_proceso'
    },
    {
      id: 3,
      fecha: '2024-11-07 12:15',
      nombre: 'Roberto',
      apellidos: 'Silva Mendoza',
      email: 'rsilva@empresa.com',
      telefono: '5556789012',
      calle_entrega: 'Polanco 456',
      interior_entrega: 'Torre A, Piso 5',
      colonia_entrega: 'Polanco',
      alcaldia_entrega: 'Miguel Hidalgo',
      estado_entrega: 'CDMX',
      cp_entrega: '11560',
      calle_recoleccion: 'Masaryk 111',
      interior_recoleccion: '',
      colonia_recoleccion: 'Polanco',
      alcaldia_recoleccion: 'Miguel Hidalgo',
      estado_recoleccion: 'CDMX',
      cp_recoleccion: '11560',
      tipo_servicio: 'hogar',
      paquete: 'estudio',
      semanas: 2,
      precio_total: 1257.53,
      cajas_xl: 0,
      carritos: 0,
      film: 1,
      esquineros: 10,
      papel_kraft: 0,
      token_seguridad: '1206679240928',
      status: 'nuevo'
    },
    {
      id: 4,
      fecha: '2024-11-07 10:30',
      nombre: 'Ana',
      apellidos: 'Martínez Ruiz',
      email: 'amartinez@yahoo.com',
      telefono: '5545678901',
      calle_entrega: 'Av. Universidad 890',
      interior_entrega: 'Casa 12',
      colonia_entrega: 'Copilco',
      alcaldia_entrega: 'Coyoacán',
      estado_entrega: 'CDMX',
      cp_entrega: '04360',
      calle_recoleccion: 'Miguel Angel de Quevedo 247',
      interior_recoleccion: '',
      colonia_recoleccion: 'Romero de Terreros',
      alcaldia_recoleccion: 'Coyoacán',
      estado_recoleccion: 'CDMX',
      cp_recoleccion: '04310',
      tipo_servicio: 'hogar',
      paquete: '3_recamaras',
      semanas: 5,
      precio_total: 6281.64,
      cajas_xl: 8,
      carritos: 2,
      film: 4,
      esquineros: 50,
      papel_kraft: 3,
      token_seguridad: '1206679240929',
      status: 'entregado'
    },
    {
      id: 5,
      fecha: '2024-11-06 18:45',
      nombre: 'Carlos',
      apellidos: 'López Hernández',
      email: 'clopez@gmail.com',
      telefono: '5567890123',
      calle_entrega: 'Periférico Sur 4020',
      interior_entrega: 'Oficina 301',
      colonia_entrega: 'Jardines del Pedregal',
      alcaldia_entrega: 'Álvaro Obregón',
      estado_entrega: 'CDMX',
      cp_entrega: '01900',
      calle_recoleccion: 'San Jerónimo 123',
      interior_recoleccion: '',
      colonia_recoleccion: 'San Jerónimo Lídice',
      alcaldia_recoleccion: 'Magdalena Contreras',
      estado_recoleccion: 'CDMX',
      cp_recoleccion: '10200',
      tipo_servicio: 'oficina',
      paquete: 'mas_10_personas',
      semanas: 6,
      precio_total: 7537.18,
      cajas_xl: 15,
      carritos: 3,
      film: 5,
      esquineros: 60,
      papel_kraft: 4,
      token_seguridad: '1206679240930',
      status: 'completado'
    }
  ]);

  // Estadísticas de la base de datos
  const dbStats = {
    totalRecords: ordersData.length,
    newToday: ordersData.filter(o => o.status === 'nuevo').length,
    processing: ordersData.filter(o => o.status === 'en_proceso' || o.status === 'confirmado').length,
    completed: ordersData.filter(o => o.status === 'completado').length,
    revenue: ordersData.reduce((sum, o) => sum + o.precio_total, 0),
    averageOrder: ordersData.reduce((sum, o) => sum + o.precio_total, 0) / ordersData.length
  };

  // Función para manejar el ordenamiento
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Función para filtrar datos
  const filteredData = ordersData.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.token_seguridad.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Ordenar datos
  const sortedData = [...filteredData].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (sortField === 'fecha') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Función para exportar a CSV
  const exportToCSV = () => {
    const headers = databaseSchema.orders.fields.map(f => f.label).join(',');
    const rows = filteredData.map(order => 
      databaseSchema.orders.fields.map(f => {
        const value = order[f.name];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value || '';
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tesili_pedidos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Función para copiar token
  const copyToken = (token) => {
    navigator.clipboard.writeText(token);
  };

  // Función para eliminar pedidos
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      setOrdersData(ordersData.filter(order => order.id !== id));
    }
  };

  // Función para eliminar múltiples
  const handleBulkDelete = () => {
    if (selectedRows.length > 0 && window.confirm(`¿Eliminar ${selectedRows.length} pedidos seleccionados?`)) {
      setOrdersData(ordersData.filter(order => !selectedRows.includes(order.id)));
      setSelectedRows([]);
    }
  };

  // Tabs de navegación
  const tabs = [
    { id: 'orders', label: 'Pedidos', icon: Package, count: dbStats.totalRecords },
    { id: 'customers', label: 'Clientes', icon: Users, count: 156 },
    { id: 'inventory', label: 'Inventario', icon: Database, count: 12 },
    { id: 'analytics', label: 'Análisis', icon: BarChart3 },
    { id: 'sync', label: 'Sincronización', icon: RefreshCw, status: 'active' }
  ];

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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Base de Datos - Tesili
              </h1>
              <p className="text-gray-500 mt-1">Gestión completa de datos con estructura CSV • Renta Cajas Tesili</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                onClick={() => setShowImportModal(true)}
              >
                <Upload className="w-4 h-4" />
                <span>Importar CSV</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                onClick={exportToCSV}
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </motion.button>
            </div>
          </div>

          {/* Database Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Total Registros</p>
                  <p className="text-2xl font-bold">{dbStats.totalRecords}</p>
                </div>
                <Database className="w-8 h-8 text-blue-400" />
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
                  <p className="text-gray-500 text-xs">Nuevos Hoy</p>
                  <p className="text-2xl font-bold text-green-400">{dbStats.newToday}</p>
                </div>
                <Plus className="w-8 h-8 text-green-400" />
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
                  <p className="text-gray-500 text-xs">En Proceso</p>
                  <p className="text-2xl font-bold text-yellow-400">{dbStats.processing}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
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
                  <p className="text-gray-500 text-xs">Completados</p>
                  <p className="text-2xl font-bold text-blue-400">{dbStats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-400" />
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
                  <p className="text-gray-500 text-xs">Ingresos Total</p>
                  <p className="text-xl font-bold text-cyan-400">${dbStats.revenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-cyan-400" />
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
                  <p className="text-gray-500 text-xs">Promedio</p>
                  <p className="text-xl font-bold text-purple-400">${dbStats.averageOrder.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mb-6 border-b border-gray-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
              {tab.count && (
                <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
              {tab.status === 'active' && (
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              )}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por nombre, email, token..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="all">Todos los estados</option>
                <option value="nuevo">Nuevo</option>
                <option value="confirmado">Confirmado</option>
                <option value="en_proceso">En Proceso</option>
                <option value="entregado">Entregado</option>
                <option value="recolectado">Recolectado</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
              
              {selectedRows.length > 0 && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar ({selectedRows.length})</span>
                </motion.button>
              )}
              
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Más filtros</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-800"
                      checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(paginatedData.map(d => d.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSort('token_seguridad')}
                      className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
                    >
                      <Hash className="w-4 h-4" />
                      <span>Token</span>
                      {sortField === 'token_seguridad' && (
                        <ChevronDown className={`w-3 h-3 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSort('fecha')}
                      className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Fecha</span>
                      {sortField === 'fecha' && (
                        <ChevronDown className={`w-3 h-3 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left">Cliente</th>
                  <th className="p-4 text-left">Servicio</th>
                  <th className="p-4 text-left">Dirección Entrega</th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSort('precio_total')}
                      className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Total</span>
                      {sortField === 'precio_total' && (
                        <ChevronDown className={`w-3 h-3 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left">Estado</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-600 bg-gray-800"
                        checked={selectedRows.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRows([...selectedRows, order.id]);
                          } else {
                            setSelectedRows(selectedRows.filter(id => id !== order.id));
                          }
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-800 px-2 py-1 rounded font-mono text-cyan-400">
                          {order.token_seguridad.slice(0, 8)}...
                        </code>
                        <button
                          onClick={() => copyToken(order.token_seguridad)}
                          className="text-gray-500 hover:text-cyan-400 transition-colors"
                          title="Copiar token"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p>{order.fecha.split(' ')[0]}</p>
                        <p className="text-gray-500 text-xs">{order.fecha.split(' ')[1]}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.nombre} {order.apellidos}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {order.email}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {order.telefono}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.tipo_servicio === 'hogar' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {order.tipo_servicio}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {order.paquete.replace(/_/g, ' ')} • {order.semanas} semanas
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                          {order.calle_entrega}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.colonia_entrega}, {order.alcaldia_entrega}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-cyan-400">${order.precio_total.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        order.status === 'nuevo' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'confirmado' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'en_proceso' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'entregado' ? 'bg-purple-500/20 text-purple-400' :
                        order.status === 'completado' ? 'bg-cyan-500/20 text-cyan-400' :
                        order.status === 'cancelado' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailModal(true);
                          }}
                          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sortedData.length)} de {sortedData.length} registros
              </span>
              {selectedRows.length > 0 && (
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                  {selectedRows.length} seleccionados
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentPage === pageNum 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && (
                <span className="px-2">...</span>
              )}
              
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* Import Modal */}
        <AnimatePresence>
          {showImportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowImportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-lg w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4">Importar Datos CSV</h2>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Arrastra tu archivo CSV aquí o</p>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="csv-upload"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        console.log('Archivo seleccionado:', file.name);
                      }
                    }}
                  />
                  <label
                    htmlFor="csv-upload"
                    className="inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 cursor-pointer transition-colors"
                  >
                    Seleccionar Archivo
                  </label>
                  <p className="text-xs text-gray-600 mt-4">
                    Formato: CSV con headers exactos de Tesili
                  </p>
                </div>
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-yellow-400" />
                    Headers Requeridos (27 campos):
                  </h3>
                  <p className="text-xs text-gray-500 font-mono overflow-x-auto">
                    Fecha, Nombre, Apellidos, Email, Teléfono, Calle Entrega, Interior Entrega, 
                    Colonia Entrega, Alcaldía Entrega, Estado Entrega, CP Entrega, 
                    Calle Recolección, Interior Recolección, Colonia Recolección, 
                    Alcaldía Recolección, Estado Recolección, CP Recolección, 
                    Tipo Servicio, Paquete, Semanas, Precio Total, Cajas XL, 
                    Carritos, Film, Esquineros, Papel Kraft, Token Seguridad
                  </p>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Importar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowDetailModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Detalle del Pedido</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Token and Status */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Shield className="w-8 h-8 text-cyan-400" />
                      <div>
                        <p className="text-xs text-gray-500">Token de Seguridad</p>
                        <p className="font-mono text-lg text-cyan-400">{selectedOrder.token_seguridad}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-medium ${
                      selectedOrder.status === 'nuevo' ? 'bg-green-500/20 text-green-400' :
                      selectedOrder.status === 'confirmado' ? 'bg-blue-500/20 text-blue-400' :
                      selectedOrder.status === 'en_proceso' ? 'bg-yellow-500/20 text-yellow-400' :
                      selectedOrder.status === 'entregado' ? 'bg-purple-500/20 text-purple-400' :
                      selectedOrder.status === 'completado' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-cyan-400" />
                      Información del Cliente
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500">Nombre:</span> {selectedOrder.nombre} {selectedOrder.apellidos}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Email:</span> {selectedOrder.email}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Teléfono:</span> {selectedOrder.telefono}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Fecha pedido:</span> {selectedOrder.fecha}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Package className="w-4 h-4 mr-2 text-cyan-400" />
                      Información del Servicio
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500">Tipo:</span> {selectedOrder.tipo_servicio}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Paquete:</span> {selectedOrder.paquete.replace(/_/g, ' ')}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Duración:</span> {selectedOrder.semanas} semanas
                      </p>
                      <p className="text-sm font-bold">
                        <span className="text-gray-500">Total:</span> 
                        <span className="text-cyan-400 text-lg ml-2">${selectedOrder.precio_total.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-green-400" />
                      Dirección de Entrega
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>{selectedOrder.calle_entrega} {selectedOrder.interior_entrega}</p>
                      <p>{selectedOrder.colonia_entrega}</p>
                      <p>{selectedOrder.alcaldia_entrega}, {selectedOrder.estado_entrega}</p>
                      <p>CP: {selectedOrder.cp_entrega}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-yellow-400" />
                      Dirección de Recolección
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>{selectedOrder.calle_recoleccion} {selectedOrder.interior_recoleccion}</p>
                      <p>{selectedOrder.colonia_recoleccion}</p>
                      <p>{selectedOrder.alcaldia_recoleccion}, {selectedOrder.estado_recoleccion}</p>
                      <p>CP: {selectedOrder.cp_recoleccion}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Products */}
                {(selectedOrder.cajas_xl > 0 || selectedOrder.carritos > 0 || selectedOrder.film > 0 || selectedOrder.esquineros > 0 || selectedOrder.papel_kraft > 0) && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-3">Productos Adicionales</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {selectedOrder.cajas_xl > 0 && (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-400">{selectedOrder.cajas_xl}</p>
                          <p className="text-xs text-gray-500">Cajas XL</p>
                        </div>
                      )}
                      {selectedOrder.carritos > 0 && (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-400">{selectedOrder.carritos}</p>
                          <p className="text-xs text-gray-500">Carritos</p>
                        </div>
                      )}
                      {selectedOrder.film > 0 && (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-400">{selectedOrder.film}</p>
                          <p className="text-xs text-gray-500">Film</p>
                        </div>
                      )}
                      {selectedOrder.esquineros > 0 && (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-400">{selectedOrder.esquineros}</p>
                          <p className="text-xs text-gray-500">Esquineros</p>
                        </div>
                      )}
                      {selectedOrder.papel_kraft > 0 && (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-400">{selectedOrder.papel_kraft}</p>
                          <p className="text-xs text-gray-500">Papel Kraft</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Línea de Tiempo</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Pedido creado</p>
                        <p className="text-xs text-gray-500">{selectedOrder.fecha}</p>
                      </div>
                    </div>
                    {selectedOrder.status !== 'nuevo' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">Pedido confirmado</p>
                          <p className="text-xs text-gray-500">Fecha confirmación</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowEditModal(true);
                    }}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Actualizar Estado
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

export default DatabaseManager;
