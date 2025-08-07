import React, { useState } from 'react';
import { 
  Package, Search, Filter, Plus, Edit2, Trash2, BarChart3,
  AlertTriangle, TrendingUp, TrendingDown, Box, Layers,
  Truck, Calendar, DollarSign, Settings, RefreshCw, Download,
  ChevronDown, ChevronRight, AlertCircle, CheckCircle, Clock,
  ShoppingCart, Archive, Database, Zap, Shield, Info, LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function InventoryManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Datos del inventario según estructura real de Tesili
  const [inventory, setInventory] = useState([
    {
      id: 1,
      sku: 'CAJ-STD-001',
      name: 'Caja Estándar',
      category: 'cajas',
      description: 'Caja estándar para mudanza 60x40x40cm',
      stock: 450,
      reserved: 85,
      available: 365,
      minStock: 100,
      maxStock: 1000,
      unitCost: 45.00,
      rentPrice: 120.00,
      location: 'Bodega A - Pasillo 3',
      status: 'optimal',
      lastRestocked: '2024-11-01',
      condition: 'excellent'
    },
    {
      id: 2,
      sku: 'CAJ-XL-001',
      name: 'Caja XL',
      category: 'cajas',
      description: 'Caja extra grande 80x60x60cm',
      stock: 220,
      reserved: 45,
      available: 175,
      minStock: 50,
      maxStock: 500,
      unitCost: 65.00,
      rentPrice: 150.00,
      location: 'Bodega A - Pasillo 4',
      status: 'optimal',
      lastRestocked: '2024-11-03',
      condition: 'excellent'
    },
    {
      id: 3,
      sku: 'CAR-IND-001',
      name: 'Carrito Industrial',
      category: 'equipo',
      description: 'Carrito industrial para transporte de cajas',
      stock: 35,
      reserved: 12,
      available: 23,
      minStock: 10,
      maxStock: 50,
      unitCost: 450.00,
      rentPrice: 200.00,
      location: 'Bodega B - Zona Equipos',
      status: 'optimal',
      lastRestocked: '2024-10-15',
      condition: 'good'
    },
    {
      id: 4,
      sku: 'FLM-STR-001',
      name: 'Film Stretch',
      category: 'materiales',
      description: 'Rollo de film stretch industrial 500mm',
      stock: 85,
      reserved: 20,
      available: 65,
      minStock: 30,
      maxStock: 200,
      unitCost: 25.00,
      rentPrice: 0,
      location: 'Bodega A - Zona Materiales',
      status: 'optimal',
      lastRestocked: '2024-11-05',
      condition: 'new'
    },
    {
      id: 5,
      sku: 'ESQ-CART-001',
      name: 'Esquineros de Cartón',
      category: 'materiales',
      description: 'Esquineros protectores de cartón (paquete de 100)',
      stock: 45,
      reserved: 0,
      available: 45,
      minStock: 20,
      maxStock: 100,
      unitCost: 15.00,
      rentPrice: 0,
      location: 'Bodega A - Zona Materiales',
      status: 'warning',
      lastRestocked: '2024-10-28',
      condition: 'new'
    },
    {
      id: 6,
      sku: 'PAP-KRF-001',
      name: 'Papel Kraft',
      category: 'materiales',
      description: 'Rollo de papel kraft para empaque',
      stock: 12,
      reserved: 5,
      available: 7,
      minStock: 10,
      maxStock: 50,
      unitCost: 35.00,
      rentPrice: 0,
      location: 'Bodega A - Zona Materiales',
      status: 'critical',
      lastRestocked: '2024-10-20',
      condition: 'new'
    }
  ]);

  // Estadísticas del inventario
  const stats = {
    totalItems: inventory.reduce((sum, item) => sum + item.stock, 0),
    totalValue: inventory.reduce((sum, item) => sum + (item.stock * item.unitCost), 0),
    reservedItems: inventory.reduce((sum, item) => sum + item.reserved, 0),
    availableItems: inventory.reduce((sum, item) => sum + item.available, 0),
    lowStockItems: inventory.filter(item => item.stock <= item.minStock).length,
    criticalItems: inventory.filter(item => item.status === 'critical').length
  };

  // Datos para gráficos
  const categoryData = [
    { name: 'Cajas', value: inventory.filter(i => i.category === 'cajas').reduce((sum, i) => sum + i.stock, 0), color: '#3B82F6' },
    { name: 'Equipo', value: inventory.filter(i => i.category === 'equipo').reduce((sum, i) => sum + i.stock, 0), color: '#10B981' },
    { name: 'Materiales', value: inventory.filter(i => i.category === 'materiales').reduce((sum, i) => sum + i.stock, 0), color: '#F59E0B' }
  ];

  const movementData = [
    { date: 'Lun', entradas: 45, salidas: 30 },
    { date: 'Mar', entradas: 52, salidas: 48 },
    { date: 'Mié', entradas: 38, salidas: 35 },
    { date: 'Jue', entradas: 65, salidas: 42 },
    { date: 'Vie', entradas: 48, salidas: 55 },
    { date: 'Sáb', entradas: 25, salidas: 20 },
    { date: 'Dom', entradas: 15, salidas: 10 }
  ];

  // Filtrar inventario
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Función para manejar stock
  const updateStock = (id, newStock) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const available = newStock - item.reserved;
        const status = newStock <= item.minStock ? 'critical' : 
                       newStock <= item.minStock * 1.5 ? 'warning' : 'optimal';
        return { ...item, stock: newStock, available, status };
      }
      return item;
    }));
  };

  // Tabs de navegación
  const tabs = [
    { id: 'overview', label: 'Vista General', icon: LayoutDashboard },
    { id: 'stock', label: 'Control Stock', icon: Package },
    { id: 'movements', label: 'Movimientos', icon: TrendingUp },
    { id: 'orders', label: 'Órdenes', icon: ShoppingCart },
    { id: 'analytics', label: 'Análisis', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings }
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gestión de Inventario
              </h1>
              <p className="text-gray-500 mt-1">Control completo de cajas y materiales • Tesili</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Item</span>
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
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Total Items</p>
                  <p className="text-2xl font-bold">{stats.totalItems}</p>
                </div>
                <Package className="w-8 h-8 text-purple-400" />
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
                  <p className="text-gray-500 text-xs">Valor Total</p>
                  <p className="text-xl font-bold">${stats.totalValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
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
                  <p className="text-gray-500 text-xs">Reservados</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.reservedItems}</p>
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
                  <p className="text-gray-500 text-xs">Disponibles</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.availableItems}</p>
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
                  <p className="text-gray-500 text-xs">Stock Bajo</p>
                  <p className="text-2xl font-bold text-orange-400">{stats.lowStockItems}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-orange-400" />
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
                  <p className="text-gray-500 text-xs">Críticos</p>
                  <p className="text-2xl font-bold text-red-400">{stats.criticalItems}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
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
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inventory Table */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="cajas">Cajas</option>
                    <option value="equipo">Equipo</option>
                    <option value="materiales">Materiales</option>
                  </select>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredInventory.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Box className="w-5 h-5 text-purple-400" />
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-xs text-gray-500">{item.sku} • {item.description}</p>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Stock Total</p>
                              <p className="font-bold">{item.stock}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Disponible</p>
                              <p className="font-bold text-green-400">{item.available}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Reservado</p>
                              <p className="font-bold text-yellow-400">{item.reserved}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Ubicación</p>
                              <p className="text-sm">{item.location}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            item.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                            item.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {item.status}
                          </span>
                          <button 
                            onClick={() => {
                              setSelectedItem(item);
                              setShowEditModal(true);
                            }}
                            className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                      {/* Stock Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Nivel de Stock</span>
                          <span>{Math.round((item.stock / item.maxStock) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              item.status === 'optimal' ? 'bg-green-400' :
                              item.status === 'warning' ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                            style={{ width: `${(item.stock / item.maxStock) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Distribution Chart */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
                <h3 className="font-semibold mb-4">Distribución por Categoría</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                        <span className="text-sm">{cat.name}</span>
                      </div>
                      <span className="text-sm font-bold">{cat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Movement Chart */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
                <h3 className="font-semibold mb-4">Movimientos Semanales</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={movementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Line type="monotone" dataKey="entradas" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="salidas" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stock' && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-4 text-left">SKU</th>
                    <th className="p-4 text-left">Producto</th>
                    <th className="p-4 text-left">Categoría</th>
                    <th className="p-4 text-center">Stock</th>
                    <th className="p-4 text-center">Reservado</th>
                    <th className="p-4 text-center">Disponible</th>
                    <th className="p-4 text-left">Ubicación</th>
                    <th className="p-4 text-left">Estado</th>
                    <th className="p-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="p-4">
                        <code className="text-xs bg-gray-800 px-2 py-1 rounded font-mono text-purple-400">
                          {item.sku}
                        </code>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.category === 'cajas' ? 'bg-blue-500/20 text-blue-400' :
                          item.category === 'equipo' ? 'bg-green-500/20 text-green-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold">{item.stock}</td>
                      <td className="p-4 text-center font-bold text-yellow-400">{item.reserved}</td>
                      <td className="p-4 text-center font-bold text-green-400">{item.available}</td>
                      <td className="p-4 text-sm">{item.location}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          item.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                          item.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setShowEditModal(true);
                            }}
                            className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                            <RefreshCw className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {(showAddModal || showEditModal) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedItem(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-6">
                  {showEditModal ? 'Editar Item' : 'Agregar Nuevo Item'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">SKU</label>
                    <input
                      type="text"
                      defaultValue={selectedItem?.sku}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="CAJ-XXX-000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      defaultValue={selectedItem?.name}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Nombre del producto"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                    <textarea
                      defaultValue={selectedItem?.description}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      rows="3"
                      placeholder="Descripción detallada del producto"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Categoría</label>
                    <select
                      defaultValue={selectedItem?.category || 'cajas'}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                      <option value="cajas">Cajas</option>
                      <option value="equipo">Equipo</option>
                      <option value="materiales">Materiales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Stock Actual</label>
                    <input
                      type="number"
                      defaultValue={selectedItem?.stock || 0}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Stock Mínimo</label>
                    <input
                      type="number"
                      defaultValue={selectedItem?.minStock || 10}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Stock Máximo</label>
                    <input
                      type="number"
                      defaultValue={selectedItem?.maxStock || 100}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Costo Unitario</label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={selectedItem?.unitCost || 0}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Precio de Renta</label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={selectedItem?.rentPrice || 0}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Ubicación</label>
                    <input
                      type="text"
                      defaultValue={selectedItem?.location}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Bodega A - Pasillo 1"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                    {showEditModal ? 'Guardar Cambios' : 'Agregar Item'}
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

export default InventoryManager;
