import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, RefreshCw, Download, Upload, AlertCircle, CheckCircle,
  Package, Users, DollarSign, TrendingUp, Clock, Globe, Link2,
  Settings, Filter, Search, ChevronRight, ExternalLink, Zap,
  Activity, ArrowUpRight, ArrowDownRight, Loader2, Database,
  ShoppingCart, CreditCard, Truck, Tag, BarChart3, Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopifyManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [syncStatus, setSyncStatus] = useState('idle');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toISOString());

  // Shopify Connection Status
  const [shopifyConfig] = useState({
    store: 'tesili-mexico.myshopify.com',
    status: 'connected',
    apiVersion: '2024-01',
    webhooks: ['orders/create', 'orders/updated', 'orders/cancelled'],
    lastWebhook: '2024-11-15T14:32:00Z',
    rateLimit: { current: 12, max: 40 }
  });

  // Métricas de Shopify
  const shopifyMetrics = {
    totalOrders: 1847,
    pendingOrders: 23,
    processingOrders: 12,
    completedOrders: 1789,
    cancelledOrders: 23,
    totalRevenue: 2456780,
    averageOrderValue: 1330,
    conversionRate: 3.2,
    cartAbandonment: 68.5
  };

  // Órdenes de Shopify (simuladas)
  const [shopifyOrders] = useState([
    {
      id: 'SH-2024-001',
      shopifyId: '5476893210',
      orderNumber: '#1001',
      customer: {
        name: 'María González',
        email: 'maria.gonzalez@email.com',
        phone: '+52 55 1234 5678'
      },
      items: [
        { name: 'Caja Grande - 3 meses', quantity: 5, price: 450, sku: 'BOX-L-3M' },
        { name: 'Servicio de Entrega', quantity: 1, price: 150, sku: 'DELIVERY-STD' }
      ],
      total: 2400,
      status: 'pending',
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      tags: ['rental', 'polanco', 'priority'],
      createdAt: '2024-11-15T10:30:00Z',
      deliveryDate: '2024-11-18',
      notes: 'Cliente solicita entrega en horario matutino',
      syncStatus: 'synced'
    },
    {
      id: 'SH-2024-002',
      shopifyId: '5476893211',
      orderNumber: '#1002',
      customer: {
        name: 'Carlos Mendoza',
        email: 'carlos.m@empresa.com',
        phone: '+52 55 9876 5432'
      },
      items: [
        { name: 'Caja Mediana - 6 meses', quantity: 10, price: 350, sku: 'BOX-M-6M' },
        { name: 'Carrito de Transporte', quantity: 2, price: 200, sku: 'CART-STD' }
      ],
      total: 3900,
      status: 'processing',
      paymentStatus: 'paid',
      fulfillmentStatus: 'partial',
      tags: ['business', 'del-valle'],
      createdAt: '2024-11-15T11:45:00Z',
      deliveryDate: '2024-11-17',
      syncStatus: 'synced'
    },
    {
      id: 'SH-2024-003',
      shopifyId: '5476893212',
      orderNumber: '#1003',
      customer: {
        name: 'Ana Ramírez',
        email: 'ana.ramirez@gmail.com',
        phone: '+52 55 5555 1234'
      },
      items: [
        { name: 'Caja Pequeña - 1 mes', quantity: 3, price: 250, sku: 'BOX-S-1M' }
      ],
      total: 750,
      status: 'pending',
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      tags: ['residential', 'roma-norte', 'new-customer'],
      createdAt: '2024-11-15T13:20:00Z',
      deliveryDate: '2024-11-19',
      syncStatus: 'pending'
    }
  ]);

  // Productos sincronizados
  const [shopifyProducts] = useState([
    {
      id: 'PROD-001',
      shopifyId: '7891234560',
      title: 'Caja Grande - Renta Mensual',
      variants: [
        { id: 'VAR-001', title: '1 mes', price: 450, inventory: 45 },
        { id: 'VAR-002', title: '3 meses', price: 1200, inventory: 45 },
        { id: 'VAR-003', title: '6 meses', price: 2100, inventory: 45 }
      ],
      type: 'rental',
      vendor: 'Tesili',
      tags: ['storage', 'large', 'rental'],
      status: 'active',
      syncStatus: 'synced',
      lastSync: '2024-11-15T12:00:00Z'
    },
    {
      id: 'PROD-002',
      shopifyId: '7891234561',
      title: 'Caja Mediana - Renta Mensual',
      variants: [
        { id: 'VAR-004', title: '1 mes', price: 350, inventory: 80 },
        { id: 'VAR-005', title: '3 meses', price: 900, inventory: 80 },
        { id: 'VAR-006', title: '6 meses', price: 1680, inventory: 80 }
      ],
      type: 'rental',
      vendor: 'Tesili',
      tags: ['storage', 'medium', 'rental'],
      status: 'active',
      syncStatus: 'synced',
      lastSync: '2024-11-15T12:00:00Z'
    }
  ]);

  // Webhooks Log
  const [webhooksLog] = useState([
    {
      id: 'WH-001',
      event: 'orders/create',
      shopifyId: '5476893210',
      status: 'processed',
      timestamp: '2024-11-15T14:32:00Z',
      response: '200 OK'
    },
    {
      id: 'WH-002',
      event: 'orders/updated',
      shopifyId: '5476893209',
      status: 'processed',
      timestamp: '2024-11-15T14:15:00Z',
      response: '200 OK'
    },
    {
      id: 'WH-003',
      event: 'inventory_levels/update',
      shopifyId: '7891234560',
      status: 'processed',
      timestamp: '2024-11-15T13:45:00Z',
      response: '200 OK'
    }
  ]);

  // Simulación de sincronización
  const handleSync = async (type) => {
    setSyncStatus('syncing');
    setShowSyncModal(true);
    
    // Simular proceso de sincronización
    setTimeout(() => {
      setSyncStatus('completed');
      setLastSync(new Date().toISOString());
      setTimeout(() => {
        setShowSyncModal(false);
        setSyncStatus('idle');
      }, 2000);
    }, 3000);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for orders:`, selectedOrders);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPaymentStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Shopify Integration
              </h1>
              <p className="text-gray-500 mt-1">Gestión de pedidos y sincronización con tu tienda Shopify</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center px-4 py-2 bg-gray-800 rounded-lg">
                <div className={`w-2 h-2 rounded-full mr-2 ${shopifyConfig.status === 'connected' ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-sm font-medium">{shopifyConfig.store}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSync('full')}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                <span>Sincronizar Todo</span>
              </motion.button>
            </div>
          </div>

          {/* Connection Status Bar */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <p className="text-xs text-gray-500">Estado</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm font-medium">Conectado</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">API Version</p>
                <p className="text-sm font-medium mt-1">{shopifyConfig.apiVersion}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Última Sincronización</p>
                <p className="text-sm font-medium mt-1">Hace 5 min</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Webhooks Activos</p>
                <p className="text-sm font-medium mt-1">{shopifyConfig.webhooks.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rate Limit</p>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: `${(shopifyConfig.rateLimit.current / shopifyConfig.rateLimit.max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs">{shopifyConfig.rateLimit.current}/{shopifyConfig.rateLimit.max}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Auto-Sync</p>
                <button
                  onClick={() => setAutoSync(!autoSync)}
                  className={`mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                    autoSync ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {autoSync ? 'Activado' : 'Desactivado'}
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-500">Últimas 24h</span>
              </div>
              <p className="text-2xl font-bold">{shopifyMetrics.totalOrders}</p>
              <p className="text-sm text-gray-500">Total Órdenes</p>
              <div className="flex items-center mt-2 text-xs">
                <ArrowUpRight className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-400">12% vs ayer</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-xs text-gray-500">Este mes</span>
              </div>
              <p className="text-2xl font-bold">${(shopifyMetrics.totalRevenue/1000).toFixed(0)}k</p>
              <p className="text-sm text-gray-500">Ingresos Shopify</p>
              <div className="flex items-center mt-2 text-xs">
                <ArrowUpRight className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-400">23% vs mes anterior</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-xs text-gray-500">Pendientes</span>
              </div>
              <p className="text-2xl font-bold">{shopifyMetrics.pendingOrders}</p>
              <p className="text-sm text-gray-500">Por Procesar</p>
              <div className="flex items-center mt-2 text-xs">
                <AlertCircle className="w-3 h-3 text-yellow-400 mr-1" />
                <span className="text-yellow-400">Requieren atención</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs text-gray-500">Conversión</span>
              </div>
              <p className="text-2xl font-bold">{shopifyMetrics.conversionRate}%</p>
              <p className="text-sm text-gray-500">Tasa Conversión</p>
              <div className="flex items-center mt-2 text-xs">
                <ArrowDownRight className="w-3 h-3 text-red-400 mr-1" />
                <span className="text-red-400">-0.5% vs promedio</span>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-900 p-1 rounded-lg w-fit">
            {['overview', 'orders', 'products', 'webhooks', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Orders Toolbar */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar órdenes..."
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 w-64"
                    />
                  </div>
                  <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500">
                    <option value="">Todos los estados</option>
                    <option value="pending">Pendiente</option>
                    <option value="processing">Procesando</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Más filtros</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedOrders.length > 0 && (
                    <>
                      <span className="text-sm text-gray-400">{selectedOrders.length} seleccionados</span>
                      <button
                        onClick={() => handleBulkAction('process')}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                      >
                        Procesar
                      </button>
                      <button
                        onClick={() => handleBulkAction('export')}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Exportar
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleSync('orders')}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sincronizar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrders(shopifyOrders.map(o => o.id));
                            } else {
                              setSelectedOrders([]);
                            }
                          }}
                          className="rounded border-gray-600 bg-gray-800"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Orden</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cliente</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Items</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Pago</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Entrega</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Sync</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopifyOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedOrders([...selectedOrders, order.id]);
                              } else {
                                setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                              }
                            }}
                            className="rounded border-gray-600 bg-gray-800"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-xs text-gray-500">{order.shopifyId}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-xs text-gray-500">{order.customer.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm">{order.items.length} productos</p>
                            <p className="text-xs text-gray-500">{order.items[0].name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">${order.total}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-1">
                            {getPaymentStatusIcon(order.paymentStatus)}
                            <span className="text-xs">{order.paymentStatus}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs">{order.deliveryDate}</p>
                        </td>
                        <td className="px-4 py-3">
                          {order.syncStatus === 'synced' ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-400" />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shopifyProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">ID: {product.shopifyId}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {product.syncStatus === 'synced' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{variant.title}</p>
                          <p className="text-xs text-gray-500">${variant.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{variant.inventory}</p>
                          <p className="text-xs text-gray-500">disponibles</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-800 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <span className="text-xs text-gray-500">
                      Última sync: {new Date(product.lastSync).toLocaleString()}
                    </span>
                    <button className="text-xs text-green-400 hover:text-green-300">
                      Sincronizar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            {/* Webhooks Configuration */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Webhooks Configurados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {shopifyConfig.webhooks.map((webhook) => (
                  <div key={webhook} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="font-medium">{webhook}</p>
                        <p className="text-xs text-gray-500">Activo y funcionando</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4">Registro de Webhooks</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Evento</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">ID Shopify</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Timestamp</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Respuesta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webhooksLog.map((log) => (
                      <tr key={log.id} className="border-b border-gray-800">
                        <td className="px-4 py-3 font-medium">{log.event}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{log.shopifyId}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            {log.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono text-green-400">{log.response}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Configuration */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-400" />
                Configuración API
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Store URL</label>
                  <input
                    type="text"
                    value={shopifyConfig.store}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
                  <input
                    type="password"
                    value="••••••••••••••••••••"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">API Secret</label>
                  <input
                    type="password"
                    value="••••••••••••••••••••"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                    readOnly
                  />
                </div>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
                  Actualizar Credenciales
                </button>
              </div>
            </div>

            {/* Sync Settings */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-gray-400" />
                Configuración de Sincronización
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Auto-sincronización</p>
                    <p className="text-xs text-gray-500">Sincronizar automáticamente cada 15 minutos</p>
                  </div>
                  <button
                    onClick={() => setAutoSync(!autoSync)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoSync ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSync ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Sincronizar inventario</p>
                    <p className="text-xs text-gray-500">Actualizar niveles de inventario en tiempo real</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Sincronizar clientes</p>
                    <p className="text-xs text-gray-500">Importar datos de clientes de Shopify</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Notificaciones</p>
                    <p className="text-xs text-gray-500">Recibir alertas de nuevos pedidos</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sync Modal */}
        <AnimatePresence>
          {showSyncModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="text-center">
                  {syncStatus === 'syncing' ? (
                    <>
                      <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Sincronizando con Shopify</h3>
                      <p className="text-sm text-gray-400">Esto puede tardar unos momentos...</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">¡Sincronización Completada!</h3>
                      <p className="text-sm text-gray-400">Todos los datos han sido actualizados</p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ShopifyManager;
