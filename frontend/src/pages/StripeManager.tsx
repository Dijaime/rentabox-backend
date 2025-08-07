import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, TrendingUp, Link2, Users, Activity,
  CheckCircle, XCircle, Clock, AlertCircle, Download, Filter,
  Search, RefreshCw, ExternalLink, Copy, Share2, Mail,
  Calendar, ArrowUpRight, ArrowDownRight, MoreVertical,
  Zap, Shield, Globe, Smartphone, Receipt, FileText,
  BarChart3, PieChart, Settings, Plus, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, 
         Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StripeManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentLinkModal, setShowPaymentLinkModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Stripe Connection Status
  const stripeConfig = {
    accountId: 'acct_1ABC123DEF456',
    businessName: 'Tesili México',
    status: 'connected',
    mode: 'live', // test or live
    currency: 'MXN',
    payoutSchedule: 'daily',
    webhookEndpoint: 'https://api.tesili.com/stripe/webhook'
  };

  // Financial Metrics
  const financialMetrics = {
    totalRevenue: 2456780,
    monthRevenue: 378900,
    weekRevenue: 89200,
    todayRevenue: 12450,
    pendingPayouts: 45600,
    availableBalance: 234500,
    totalTransactions: 3456,
    successRate: 96.8,
    avgTransaction: 1250,
    recurringRevenue: 156000,
    activeSubscriptions: 234,
    churnRate: 2.3
  };

  // Recent Transactions
  const [transactions] = useState([
    {
      id: 'pi_3O1ABC2DEF3GHI4J',
      amount: 2400,
      currency: 'MXN',
      status: 'succeeded',
      customer: {
        name: 'María González',
        email: 'maria.gonzalez@email.com'
      },
      description: 'Renta de cajas - 3 meses',
      paymentMethod: 'card',
      cardBrand: 'visa',
      cardLast4: '4242',
      created: '2024-11-15T14:30:00Z',
      fee: 72,
      net: 2328
    },
    {
      id: 'pi_3O1ABC2DEF3GHI4K',
      amount: 1500,
      currency: 'MXN',
      status: 'succeeded',
      customer: {
        name: 'Carlos Mendoza',
        email: 'carlos.m@empresa.com'
      },
      description: 'Suscripción mensual - Plan Pro',
      paymentMethod: 'card',
      cardBrand: 'mastercard',
      cardLast4: '5555',
      created: '2024-11-15T13:15:00Z',
      fee: 45,
      net: 1455,
      subscription: 'sub_1ABC123'
    },
    {
      id: 'pi_3O1ABC2DEF3GHI4L',
      amount: 3200,
      currency: 'MXN',
      status: 'pending',
      customer: {
        name: 'Ana Ramírez',
        email: 'ana.ramirez@gmail.com'
      },
      description: 'Pago inicial + primer mes',
      paymentMethod: 'oxxo',
      created: '2024-11-15T12:00:00Z',
      expiresAt: '2024-11-17T12:00:00Z'
    },
    {
      id: 'pi_3O1ABC2DEF3GHI4M',
      amount: 890,
      currency: 'MXN',
      status: 'failed',
      customer: {
        name: 'Roberto Silva',
        email: 'roberto.silva@email.com'
      },
      description: 'Renovación de suscripción',
      paymentMethod: 'card',
      cardBrand: 'visa',
      cardLast4: '1234',
      created: '2024-11-15T11:30:00Z',
      failureReason: 'insufficient_funds'
    }
  ]);

  // Payment Links
  const [paymentLinks] = useState([
    {
      id: 'plink_1ABC123',
      url: 'https://pay.tesili.com/l/caja-grande-3m',
      shortUrl: 'tesili.com/p/abc123',
      description: 'Caja Grande - 3 meses',
      amount: 1350,
      currency: 'MXN',
      status: 'active',
      created: '2024-11-10T10:00:00Z',
      usageCount: 45,
      totalCollected: 60750,
      qrCode: true,
      expiresAt: null
    },
    {
      id: 'plink_1ABC124',
      url: 'https://pay.tesili.com/l/promo-black-friday',
      shortUrl: 'tesili.com/p/bf2024',
      description: 'Promoción Black Friday - 30% desc',
      amount: 945,
      currency: 'MXN',
      status: 'active',
      created: '2024-11-01T10:00:00Z',
      usageCount: 128,
      totalCollected: 120960,
      qrCode: true,
      expiresAt: '2024-11-30T23:59:59Z'
    },
    {
      id: 'plink_1ABC125',
      url: 'https://pay.tesili.com/l/deposito-inicial',
      shortUrl: 'tesili.com/p/deposit',
      description: 'Depósito inicial reembolsable',
      amount: 500,
      currency: 'MXN',
      status: 'active',
      created: '2024-10-15T10:00:00Z',
      usageCount: 89,
      totalCollected: 44500,
      qrCode: false,
      expiresAt: null
    }
  ]);

  // Subscriptions
  const [subscriptions] = useState([
    {
      id: 'sub_1ABC123',
      customer: 'María González',
      plan: 'Plan Pro - Mensual',
      amount: 1500,
      status: 'active',
      currentPeriodEnd: '2024-12-15',
      created: '2024-06-15',
      nextPayment: '2024-12-15',
      totalPaid: 9000
    },
    {
      id: 'sub_1ABC124',
      customer: 'Empresa ABC',
      plan: 'Plan Empresarial - Anual',
      amount: 15000,
      status: 'active',
      currentPeriodEnd: '2025-03-01',
      created: '2024-03-01',
      nextPayment: '2025-03-01',
      totalPaid: 15000
    },
    {
      id: 'sub_1ABC125',
      customer: 'Carlos Mendoza',
      plan: 'Plan Básico - Mensual',
      amount: 750,
      status: 'past_due',
      currentPeriodEnd: '2024-11-10',
      created: '2024-08-10',
      nextPayment: 'Vencido',
      totalPaid: 2250
    }
  ]);

  // Revenue Chart Data
  const revenueData = [
    { day: 'Lun', revenue: 45000, transactions: 34 },
    { day: 'Mar', revenue: 52000, transactions: 41 },
    { day: 'Mié', revenue: 48000, transactions: 38 },
    { day: 'Jue', revenue: 61000, transactions: 48 },
    { day: 'Vie', revenue: 72000, transactions: 56 },
    { day: 'Sáb', revenue: 89000, transactions: 68 },
    { day: 'Dom', revenue: 42000, transactions: 32 }
  ];

  // Payment Methods Distribution
  const paymentMethods = [
    { name: 'Tarjeta de Crédito', value: 65, count: 2246, color: '#60A5FA' },
    { name: 'Tarjeta de Débito', value: 20, count: 691, color: '#34D399' },
    { name: 'OXXO', value: 10, count: 346, color: '#FBBF24' },
    { name: 'Transferencia', value: 5, count: 173, color: '#A78BFA' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'succeeded': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'succeeded': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      case 'active': return 'bg-blue-500/20 text-blue-400';
      case 'past_due': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount / 100);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stripe Payments
              </h1>
              <p className="text-gray-500 mt-1">Gestión de pagos, suscripciones y finanzas</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center px-4 py-2 bg-gray-800 rounded-lg">
                <div className={`w-2 h-2 rounded-full mr-2 ${stripeConfig.status === 'connected' ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-sm font-medium">{stripeConfig.mode === 'live' ? 'Producción' : 'Pruebas'}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPaymentLinkModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Link de Pago</span>
              </motion.button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <p className="text-xl font-bold">${(financialMetrics.totalRevenue/1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-500">Ingresos totales</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-500">Mes</span>
              </div>
              <p className="text-xl font-bold">${(financialMetrics.monthRevenue/1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-500">Este mes</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-green-400">+18%</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs text-gray-500">Balance</span>
              </div>
              <p className="text-xl font-bold">${(financialMetrics.availableBalance/1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-500">Disponible</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-xs text-gray-500">Pendiente</span>
              </div>
              <p className="text-xl font-bold">${(financialMetrics.pendingPayouts/1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-500">Por cobrar</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs text-gray-500">Tasa</span>
              </div>
              <p className="text-xl font-bold">{financialMetrics.successRate}%</p>
              <p className="text-xs text-gray-500">Éxito</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-pink-400" />
                </div>
                <span className="text-xs text-gray-500">Subs</span>
              </div>
              <p className="text-xl font-bold">{financialMetrics.activeSubscriptions}</p>
              <p className="text-xs text-gray-500">Activas</p>
              <div className="flex items-center mt-1">
                <ArrowDownRight className="w-3 h-3 text-red-400 mr-1" />
                <span className="text-xs text-red-400">-{financialMetrics.churnRate}%</span>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-900 p-1 rounded-lg w-fit">
            {['overview', 'transactions', 'links', 'subscriptions', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab === 'links' ? 'Links de Pago' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Areas */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Ingresos de la Semana
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                      formatter={(value) => [`$${(value/1000).toFixed(0)}k`, 'Ingresos']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#A855F7" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-pink-400" />
                  Métodos de Pago
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPie>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {paymentMethods.map((method) => (
                    <div key={method.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: method.color }}
                        />
                        <span className="text-gray-400">{method.name}</span>
                      </div>
                      <span className="font-medium">{method.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Transactions Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Transacciones Recientes</h3>
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Ver todas →
                </button>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <p className="font-medium">{transaction.customer.name}</p>
                        <p className="text-xs text-gray-500">{transaction.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.created).toLocaleString('es-MX')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Transactions Toolbar */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar transacciones..."
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 w-64"
                    />
                  </div>
                  <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500">
                    <option value="">Todos los estados</option>
                    <option value="succeeded">Exitoso</option>
                    <option value="pending">Pendiente</option>
                    <option value="failed">Fallido</option>
                  </select>
                  <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filtros</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Exportar</span>
                  </button>
                  <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Actualizar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cliente</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Descripción</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Monto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Método</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-xs font-mono">{transaction.id.slice(-8)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-sm">{transaction.customer.name}</p>
                            <p className="text-xs text-gray-500">{transaction.customer.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm">{transaction.description}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                          {transaction.fee && (
                            <p className="text-xs text-gray-500">Fee: {formatCurrency(transaction.fee)}</p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm">{transaction.paymentMethod}</p>
                              {transaction.cardBrand && (
                                <p className="text-xs text-gray-500">
                                  {transaction.cardBrand} ••{transaction.cardLast4}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm">{new Date(transaction.created).toLocaleDateString('es-MX')}</p>
                          <p className="text-xs text-gray-500">{new Date(transaction.created).toLocaleTimeString('es-MX')}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => setSelectedTransaction(transaction)}
                              className="p-1 hover:bg-gray-700 rounded transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <Receipt className="w-4 h-4 text-gray-400" />
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

        {activeTab === 'links' && (
          <div className="space-y-6">
            {/* Payment Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentLinks.map((link) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{link.description}</h3>
                      <p className="text-2xl font-bold mt-2">{formatCurrency(link.amount)}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(link.status)}`}>
                      {link.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Usos</span>
                      <span className="font-medium">{link.usageCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Recaudado</span>
                      <span className="font-medium">{formatCurrency(link.totalCollected)}</span>
                    </div>
                    {link.expiresAt && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Expira</span>
                        <span className="font-medium text-yellow-400">
                          {new Date(link.expiresAt).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg mb-4">
                    <input
                      type="text"
                      value={link.shortUrl}
                      readOnly
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                    <button
                      onClick={() => copyToClipboard(link.url)}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {link.qrCode && (
                        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                          <Smartphone className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                      <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <button className="text-sm text-purple-400 hover:text-purple-300">
                      Ver detalles →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {/* Subscriptions Table */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">Suscripciones Activas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cliente</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Plan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Monto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Próximo Pago</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Total Pagado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium">{subscription.customer}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm">{subscription.plan}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{formatCurrency(subscription.amount)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(subscription.status)}`}>
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm">{subscription.nextPayment}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{formatCurrency(subscription.totalPaid)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <Settings className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <XCircle className="w-4 h-4 text-gray-400" />
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

        {/* Payment Link Modal */}
        <AnimatePresence>
          {showPaymentLinkModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowPaymentLinkModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-6">Crear Link de Pago</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Ej: Renta de cajas - 3 meses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Monto (MXN)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">URL Personalizada</label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-gray-800 border border-gray-700 border-r-0 rounded-l-lg text-gray-500">
                        tesili.com/p/
                      </span>
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-lg focus:outline-none focus:border-purple-500"
                        placeholder="mi-link"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Fecha de Expiración</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="qrCode"
                      className="rounded border-gray-600 bg-gray-800"
                      defaultChecked
                    />
                    <label htmlFor="qrCode" className="text-sm">Generar código QR</label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowPaymentLinkModal(false)}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Crear Link
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

export default StripeManager;
