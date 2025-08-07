import React, { useState } from 'react';
import { 
  Zap, Globe, Link2, Shield, Activity, AlertCircle, CheckCircle,
  Settings, RefreshCw, Plus, Play, Pause, Terminal, Code,
  Database, Cloud, Lock, Key, Clock, TrendingUp, TrendingDown,
  BarChart3, Cpu, HardDrive, Wifi, WifiOff, Server, 
  GitBranch, Package, Layers, Send, Download, Upload,
  FileJson, AlertTriangle, Info, XCircle, ChevronRight,
  Copy, ExternalLink, MoreVertical, Filter, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar,
         XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function IntegrationHub() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Active Integrations
  const [integrations] = useState([
    {
      id: 'INT-001',
      name: 'Shopify',
      type: 'ecommerce',
      status: 'active',
      health: 'healthy',
      icon: '🛍️',
      description: 'Sincronización de productos y pedidos',
      apiVersion: '2024-01',
      endpoints: [
        { name: 'Orders', url: '/api/orders', method: 'GET', status: 'active' },
        { name: 'Products', url: '/api/products', method: 'GET', status: 'active' },
        { name: 'Customers', url: '/api/customers', method: 'GET', status: 'active' },
        { name: 'Inventory', url: '/api/inventory', method: 'POST', status: 'active' }
      ],
      credentials: {
        apiKey: '••••••••••••••••',
        secret: '••••••••••••••••',
        store: 'tesili-mexico.myshopify.com'
      },
      metrics: {
        requestsToday: 1247,
        successRate: 99.2,
        avgResponseTime: 245,
        lastSync: '2024-11-15T14:30:00Z'
      },
      webhooks: ['orders/create', 'orders/updated', 'products/update'],
      rateLimits: { current: 15, max: 40, reset: '2024-11-15T15:00:00Z' }
    },
    {
      id: 'INT-002',
      name: 'Stripe',
      type: 'payments',
      status: 'active',
      health: 'healthy',
      icon: '💳',
      description: 'Procesamiento de pagos y suscripciones',
      apiVersion: 'v1',
      endpoints: [
        { name: 'Charges', url: '/api/charges', method: 'POST', status: 'active' },
        { name: 'Customers', url: '/api/customers', method: 'GET', status: 'active' },
        { name: 'Subscriptions', url: '/api/subscriptions', method: 'POST', status: 'active' },
        { name: 'Webhooks', url: '/api/webhooks', method: 'POST', status: 'active' }
      ],
      credentials: {
        publishableKey: 'pk_live_••••••••',
        secretKey: 'sk_live_••••••••'
      },
      metrics: {
        requestsToday: 892,
        successRate: 99.8,
        avgResponseTime: 180,
        lastSync: '2024-11-15T14:45:00Z'
      },
      webhooks: ['payment_intent.succeeded', 'customer.subscription.created'],
      rateLimits: { current: 8, max: 100, reset: '2024-11-15T15:00:00Z' }
    },
    {
      id: 'INT-003',
      name: 'WhatsApp Business',
      type: 'communication',
      status: 'active',
      health: 'warning',
      icon: '💬',
      description: 'Mensajería con clientes',
      apiVersion: 'v17.0',
      endpoints: [
        { name: 'Messages', url: '/api/messages', method: 'POST', status: 'active' },
        { name: 'Media', url: '/api/media', method: 'GET', status: 'degraded' },
        { name: 'Contacts', url: '/api/contacts', method: 'GET', status: 'active' }
      ],
      credentials: {
        phoneId: '1234567890',
        token: '••••••••••••••••'
      },
      metrics: {
        requestsToday: 3456,
        successRate: 94.5,
        avgResponseTime: 320,
        lastSync: '2024-11-15T14:40:00Z'
      },
      webhooks: ['messages', 'message_status'],
      rateLimits: { current: 45, max: 80, reset: '2024-11-15T15:00:00Z' }
    },
    {
      id: 'INT-004',
      name: 'Google Maps',
      type: 'geolocation',
      status: 'active',
      health: 'healthy',
      icon: '📍',
      description: 'Geocodificación y rutas',
      apiVersion: 'v3',
      endpoints: [
        { name: 'Geocoding', url: '/api/geocode', method: 'GET', status: 'active' },
        { name: 'Directions', url: '/api/directions', method: 'GET', status: 'active' },
        { name: 'Distance Matrix', url: '/api/distancematrix', method: 'GET', status: 'active' }
      ],
      credentials: {
        apiKey: '••••••••••••••••'
      },
      metrics: {
        requestsToday: 567,
        successRate: 100,
        avgResponseTime: 95,
        lastSync: '2024-11-15T14:50:00Z'
      },
      webhooks: [],
      rateLimits: { current: 234, max: 1000, reset: '2024-11-16T00:00:00Z' }
    },
    {
      id: 'INT-005',
      name: 'SendGrid',
      type: 'email',
      status: 'paused',
      health: 'offline',
      icon: '✉️',
      description: 'Envío de emails transaccionales',
      apiVersion: 'v3',
      endpoints: [
        { name: 'Send Mail', url: '/api/mail/send', method: 'POST', status: 'paused' },
        { name: 'Templates', url: '/api/templates', method: 'GET', status: 'paused' }
      ],
      credentials: {
        apiKey: '••••••••••••••••'
      },
      metrics: {
        requestsToday: 0,
        successRate: 0,
        avgResponseTime: 0,
        lastSync: '2024-11-14T18:00:00Z'
      },
      webhooks: ['bounce', 'open', 'click'],
      rateLimits: { current: 0, max: 100, reset: '2024-11-15T15:00:00Z' }
    }
  ]);

  // API Logs
  const [apiLogs] = useState([
    {
      id: 'LOG-001',
      timestamp: '2024-11-15T14:45:32Z',
      integration: 'Stripe',
      endpoint: '/api/charges',
      method: 'POST',
      status: 200,
      duration: 156,
      request: { amount: 2400, currency: 'MXN' },
      response: { id: 'ch_3O1ABC2DEF3GHI4J', status: 'succeeded' }
    },
    {
      id: 'LOG-002',
      timestamp: '2024-11-15T14:44:28Z',
      integration: 'Shopify',
      endpoint: '/api/orders',
      method: 'GET',
      status: 200,
      duration: 234,
      request: { limit: 50, status: 'open' },
      response: { orders: [], count: 23 }
    },
    {
      id: 'LOG-003',
      timestamp: '2024-11-15T14:43:15Z',
      integration: 'WhatsApp Business',
      endpoint: '/api/messages',
      method: 'POST',
      status: 400,
      duration: 312,
      request: { to: '5215512345678', body: 'Hola' },
      response: { error: 'Invalid phone number format' }
    },
    {
      id: 'LOG-004',
      timestamp: '2024-11-15T14:42:10Z',
      integration: 'Google Maps',
      endpoint: '/api/geocode',
      method: 'GET',
      status: 200,
      duration: 89,
      request: { address: 'Polanco, CDMX' },
      response: { lat: 19.4326, lng: -99.1899 }
    }
  ]);

  // Performance Metrics
  const performanceData = [
    { time: '00:00', requests: 145, errors: 2, latency: 120 },
    { time: '04:00', requests: 89, errors: 1, latency: 95 },
    { time: '08:00', requests: 234, errors: 3, latency: 145 },
    { time: '12:00', requests: 456, errors: 5, latency: 210 },
    { time: '16:00', requests: 523, errors: 4, latency: 189 },
    { time: '20:00', requests: 367, errors: 2, latency: 156 },
    { time: '23:59', requests: 198, errors: 1, latency: 110 }
  ];

  // Available Integrations
  const availableIntegrations = [
    { name: 'Twilio', category: 'communication', icon: '📱' },
    { name: 'Slack', category: 'communication', icon: '💼' },
    { name: 'QuickBooks', category: 'accounting', icon: '📊' },
    { name: 'Zapier', category: 'automation', icon: '⚡' },
    { name: 'HubSpot', category: 'crm', icon: '🎯' },
    { name: 'Facebook', category: 'social', icon: '👥' },
    { name: 'Instagram', category: 'social', icon: '📸' },
    { name: 'Mailchimp', category: 'email', icon: '🐵' }
  ];

  const getHealthColor = (health) => {
    switch(health) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'offline': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getHealthIcon = (health) => {
    switch(health) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'offline': return <WifiOff className="w-5 h-5 text-gray-400" />;
      default: return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400';
      case 'error': return 'bg-red-500/20 text-red-400';
      case 'degraded': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getHttpStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    if (status >= 500) return 'text-red-400';
    return 'text-gray-400';
  };

  const formatDuration = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                API Integration Hub
              </h1>
              <p className="text-gray-500 mt-1">Centro de control de integraciones y servicios externos</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Sincronizar Todo</span>
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Integración</span>
              </motion.button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Estado Sistema</p>
                  <p className="font-medium">Operacional</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">APIs Activas</p>
                  <p className="font-medium">4 de 5</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Requests/Hora</p>
                  <p className="font-medium">6,459</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Latencia Avg</p>
                  <p className="font-medium">187ms</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Success Rate</p>
                  <p className="font-medium">98.7%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-900 p-1 rounded-lg w-fit">
            {['overview', 'integrations', 'logs', 'webhooks', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab === 'integrations' ? 'Integraciones' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Areas */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Chart */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
                Rendimiento del Sistema (24h)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#06B6D4" 
                    fillOpacity={1} 
                    fill="url(#colorRequests)"
                    name="Requests" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="errors" 
                    stroke="#EF4444" 
                    fillOpacity={1} 
                    fill="url(#colorErrors)"
                    name="Errores" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Active Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.filter(i => i.status === 'active').map((integration) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer"
                  onClick={() => setSelectedIntegration(integration)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-xs text-gray-500">{integration.type}</p>
                      </div>
                    </div>
                    {getHealthIcon(integration.health)}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Requests hoy</span>
                      <span className="font-medium">{integration.metrics.requestsToday.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Success Rate</span>
                      <span className={`font-medium ${
                        integration.metrics.successRate > 95 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {integration.metrics.successRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Latencia</span>
                      <span className="font-medium">{integration.metrics.avgResponseTime}ms</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(integration.status)}`}>
                        {integration.status}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTestModal(true);
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        Probar API →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Actividad Reciente</h3>
                <button 
                  onClick={() => setActiveTab('logs')}
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Ver todos los logs →
                </button>
              </div>
              <div className="space-y-3">
                {apiLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status >= 200 && log.status < 300 ? 'bg-green-400' :
                        log.status >= 400 && log.status < 500 ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{log.integration}</p>
                        <p className="text-xs text-gray-500">
                          {log.method} {log.endpoint}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-mono ${getHttpStatusColor(log.status)}`}>
                        {log.status}
                      </p>
                      <p className="text-xs text-gray-500">{formatDuration(log.duration)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar integraciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500">
                  <option value="">Todas las categorías</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="payments">Pagos</option>
                  <option value="communication">Comunicación</option>
                  <option value="geolocation">Geolocalización</option>
                  <option value="email">Email</option>
                </select>
                <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </button>
              </div>
            </div>

            {/* Integrations List */}
            <div className="grid grid-cols-1 gap-6">
              {integrations
                .filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((integration) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{integration.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold">{integration.name}</h3>
                          <p className="text-gray-400">{integration.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">API Version: {integration.apiVersion}</span>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(integration.status)}`}>
                              {integration.status}
                            </span>
                            <div className="flex items-center space-x-1">
                              {getHealthIcon(integration.health)}
                              <span className={`text-xs font-medium ${getHealthColor(integration.health)}`}>
                                {integration.health}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integration.status === 'active' ? (
                          <button className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
                            <Pause className="w-5 h-5" />
                          </button>
                        ) : (
                          <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                            <Play className="w-5 h-5" />
                          </button>
                        )}
                        <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Endpoints */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Endpoints</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {integration.endpoints.map((endpoint, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">{endpoint.name}</p>
                              <p className="text-xs text-gray-500">{endpoint.method} {endpoint.url}</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              endpoint.status === 'active' ? 'bg-green-400' :
                              endpoint.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'
                            }`} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Requests Hoy</p>
                        <p className="text-xl font-bold">{integration.metrics.requestsToday.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                        <p className="text-xl font-bold">{integration.metrics.successRate}%</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Latencia Avg</p>
                        <p className="text-xl font-bold">{integration.metrics.avgResponseTime}ms</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Rate Limit</p>
                        <p className="text-xl font-bold">{integration.rateLimits.current}/{integration.rateLimits.max}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        {integration.webhooks.length > 0 && (
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                            {integration.webhooks.length} webhooks
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          Última sync: {new Date(integration.metrics.lastSync).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1.5 bg-gray-800 text-sm rounded-lg hover:bg-gray-700 transition-colors">
                          Ver Logs
                        </button>
                        <button className="px-3 py-1.5 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-500 transition-colors">
                          Test Connection
                        </button>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>

            {/* Available Integrations */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Integraciones Disponibles</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableIntegrations.map((integration) => (
                  <motion.div
                    key={integration.name}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{integration.icon}</div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-xs text-gray-500">{integration.category}</p>
                    <button className="mt-3 text-xs text-cyan-400 hover:text-cyan-300">
                      Configurar →
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6">
            {/* Logs Table */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">API Logs</h3>
                  <div className="flex items-center space-x-2">
                    <select className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500">
                      <option>Todas las APIs</option>
                      <option>Shopify</option>
                      <option>Stripe</option>
                      <option>WhatsApp</option>
                    </select>
                    <select className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500">
                      <option>Todos los estados</option>
                      <option>Success (2xx)</option>
                      <option>Client Error (4xx)</option>
                      <option>Server Error (5xx)</option>
                    </select>
                    <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                      Exportar
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Timestamp</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Integration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Endpoint</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Method</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm">{new Date(log.timestamp).toLocaleTimeString()}</p>
                          <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleDateString()}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-sm">{log.integration}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-mono">{log.endpoint}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded font-mono ${
                            log.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                            log.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                            log.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {log.method}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-mono text-sm ${getHttpStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{formatDuration(log.duration)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            {/* Webhooks Configuration */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Webhooks Configurados</h3>
                <button className="px-3 py-1.5 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-500 transition-colors">
                  Nuevo Webhook
                </button>
              </div>

              <div className="space-y-4">
                {integrations.map((integration) => (
                  integration.webhooks.length > 0 && (
                    <div key={integration.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <h4 className="font-medium">{integration.name}</h4>
                            <p className="text-xs text-gray-500">{integration.webhooks.length} webhooks activos</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {integration.webhooks.map((webhook, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-mono">{webhook}</span>
                            </div>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Webhook URL */}
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Tu URL de Webhook</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value="https://api.tesili.com/webhooks/receive"
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg font-mono text-sm"
                  />
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Usa esta URL para recibir webhooks de servicios externos
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Global Settings */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-400" />
                Configuración Global
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Timeout de Requests (ms)</label>
                  <input
                    type="number"
                    defaultValue="5000"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Reintentos Máximos</label>
                  <input
                    type="number"
                    defaultValue="3"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Rate Limit Global</label>
                  <input
                    type="number"
                    defaultValue="1000"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Modo Debug</p>
                    <p className="text-xs text-gray-500">Registrar todas las requests</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-gray-400" />
                Seguridad
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Encriptación SSL</p>
                    <p className="text-xs text-gray-500">Forzar HTTPS en todas las conexiones</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Validación de Webhooks</p>
                    <p className="text-xs text-gray-500">Verificar firmas de webhooks</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">IP Whitelist</p>
                    <p className="text-xs text-gray-500">Restringir acceso por IP</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
                <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors">
                  Rotar API Keys
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Integration Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-6">Nueva Integración</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Servicio</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500">
                      <option>Seleccionar servicio...</option>
                      <option>Twilio</option>
                      <option>Slack</option>
                      <option>QuickBooks</option>
                      <option>Zapier</option>
                      <option>HubSpot</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nombre de la Integración</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="Mi integración"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Webhook URL (opcional)</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Conectar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Test API Modal */}
        <AnimatePresence>
          {showTestModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowTestModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-6">Test API Connection</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Método</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500">
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>DELETE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Endpoint</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500"
                        placeholder="/api/test"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Headers</label>
                    <textarea
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 font-mono text-sm"
                      rows="3"
                      placeholder='{"Content-Type": "application/json"}'
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Body</label>
                    <textarea
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 font-mono text-sm"
                      rows="4"
                      placeholder='{}'
                    />
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Response</h3>
                    <pre className="text-xs font-mono text-green-400">
                      {`{
  "status": 200,
  "message": "Connection successful",
  "timestamp": "2024-11-15T15:00:00Z"
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowTestModal(false)}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Ejecutar Test
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

export default IntegrationHub;
