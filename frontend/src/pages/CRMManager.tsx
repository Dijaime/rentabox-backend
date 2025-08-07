import React, { useState } from 'react';
import { 
  Users, UserPlus, TrendingUp, Phone, Mail, MessageSquare,
  Calendar, Clock, Star, Tag, Filter, Search, MoreVertical,
  ChevronRight, ChevronDown, Activity, Target, Zap, Award,
  DollarSign, BarChart3, PieChart, MapPin, Building2,
  FileText, Link2, AlertCircle, CheckCircle, XCircle,
  ArrowUpRight, ArrowDownRight, Briefcase, Heart, Flag
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, LineChart, Line,
         XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CRMManager() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pipeline Stages
  const [pipelineStages] = useState([
    { id: 'new', name: 'Nuevos Leads', color: 'bg-blue-500', count: 12, value: 45000 },
    { id: 'contacted', name: 'Contactados', color: 'bg-yellow-500', count: 8, value: 32000 },
    { id: 'qualified', name: 'Calificados', color: 'bg-purple-500', count: 6, value: 28000 },
    { id: 'proposal', name: 'Propuesta', color: 'bg-indigo-500', count: 4, value: 18000 },
    { id: 'negotiation', name: 'Negociación', color: 'bg-orange-500', count: 3, value: 15000 },
    { id: 'closed', name: 'Cerrados', color: 'bg-green-500', count: 2, value: 12000 }
  ]);

  // Leads/Customers Data
  const [leads] = useState([
    {
      id: 'LEAD-001',
      name: 'María González',
      company: 'Startup Tech MX',
      email: 'maria.gonzalez@startuptech.mx',
      phone: '+52 55 1234 5678',
      stage: 'new',
      score: 85,
      value: 15000,
      status: 'hot',
      source: 'Website',
      assignedTo: 'Carlos Ruiz',
      createdAt: '2024-11-14',
      lastContact: '2024-11-15',
      nextAction: 'Llamada de seguimiento',
      nextActionDate: '2024-11-16',
      tags: ['Premium', 'Urgente', 'Polanco'],
      notes: 'Interesada en plan empresarial, necesita 50+ cajas',
      activities: [
        { type: 'email', date: '2024-11-15', description: 'Envío de propuesta' },
        { type: 'call', date: '2024-11-14', description: 'Llamada inicial - 15 min' },
        { type: 'meeting', date: '2024-11-13', description: 'Demo del servicio' }
      ],
      metrics: {
        emailsOpened: 5,
        emailsClicked: 3,
        websiteVisits: 12,
        responseTime: '2h'
      }
    },
    {
      id: 'LEAD-002',
      name: 'Carlos Mendoza',
      company: 'Oficinas Reforma',
      email: 'carlos.mendoza@oficinasreforma.com',
      phone: '+52 55 9876 5432',
      stage: 'qualified',
      score: 72,
      value: 8500,
      status: 'warm',
      source: 'Referral',
      assignedTo: 'Ana López',
      createdAt: '2024-11-10',
      lastContact: '2024-11-14',
      nextAction: 'Enviar cotización',
      nextActionDate: '2024-11-16',
      tags: ['Corporativo', 'Reforma'],
      notes: 'Referido por cliente actual, busca solución a largo plazo'
    },
    {
      id: 'LEAD-003',
      name: 'Ana Ramírez',
      company: 'Personal',
      email: 'ana.ramirez@gmail.com',
      phone: '+52 55 5555 1234',
      stage: 'proposal',
      score: 68,
      value: 3500,
      status: 'warm',
      source: 'Facebook Ads',
      assignedTo: 'Carlos Ruiz',
      createdAt: '2024-11-08',
      lastContact: '2024-11-15',
      nextAction: 'Cerrar venta',
      nextActionDate: '2024-11-17',
      tags: ['Residencial', 'Roma Norte'],
      notes: 'Mudanza temporal, necesita almacenamiento por 6 meses'
    },
    {
      id: 'LEAD-004',
      name: 'Roberto Silva',
      company: 'Constructora Silva',
      email: 'roberto@constructorasilva.mx',
      phone: '+52 55 3333 4444',
      stage: 'negotiation',
      score: 90,
      value: 25000,
      status: 'hot',
      source: 'LinkedIn',
      assignedTo: 'Ana López',
      createdAt: '2024-11-05',
      lastContact: '2024-11-15',
      nextAction: 'Revisar contrato',
      nextActionDate: '2024-11-16',
      tags: ['Enterprise', 'Construcción', 'VIP'],
      notes: 'Gran oportunidad, necesita almacenamiento para equipo de construcción'
    }
  ]);

  // CRM Metrics
  const crmMetrics = {
    totalLeads: 156,
    newLeadsMonth: 34,
    conversionRate: 23.5,
    avgDealSize: 8500,
    salesCycle: 12,
    customerLifetime: 24500,
    nps: 72,
    churnRate: 5.2
  };

  // Activity Timeline
  const recentActivities = [
    { id: 1, type: 'call', user: 'María González', action: 'Llamada realizada', time: 'Hace 10 min', status: 'completed' },
    { id: 2, type: 'email', user: 'Carlos Mendoza', action: 'Email enviado', time: 'Hace 30 min', status: 'completed' },
    { id: 3, type: 'meeting', user: 'Ana Ramírez', action: 'Reunión programada', time: 'Hace 1 hora', status: 'scheduled' },
    { id: 4, type: 'deal', user: 'Roberto Silva', action: 'Propuesta enviada', time: 'Hace 2 horas', status: 'pending' },
    { id: 5, type: 'note', user: 'Juan Pérez', action: 'Nota agregada', time: 'Hace 3 horas', status: 'completed' }
  ];

  // Sales Performance Data
  const salesData = [
    { month: 'Jun', leads: 120, conversions: 24, revenue: 145000 },
    { month: 'Jul', leads: 135, conversions: 28, revenue: 168000 },
    { month: 'Ago', leads: 142, conversions: 31, revenue: 186000 },
    { month: 'Sep', leads: 158, conversions: 35, revenue: 210000 },
    { month: 'Oct', leads: 165, conversions: 38, revenue: 228000 },
    { month: 'Nov', leads: 156, conversions: 37, revenue: 222000 }
  ];

  // Lead Sources
  const leadSources = [
    { name: 'Website', value: 35, color: '#60A5FA' },
    { name: 'Referidos', value: 25, color: '#34D399' },
    { name: 'Social Media', value: 20, color: '#FBBF24' },
    { name: 'Email', value: 12, color: '#A78BFA' },
    { name: 'Otros', value: 8, color: '#F87171' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'hot': return 'bg-red-500/20 text-red-400';
      case 'warm': return 'bg-yellow-500/20 text-yellow-400';
      case 'cold': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'deal': return <DollarSign className="w-4 h-4" />;
      case 'note': return <FileText className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                CRM Manager
              </h1>
              <p className="text-gray-500 mt-1">Gestión de clientes y pipeline de ventas</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLeadModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Nuevo Lead</span>
              </motion.button>
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
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <p className="text-2xl font-bold">{crmMetrics.totalLeads}</p>
              <p className="text-sm text-gray-500">Leads Activos</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-green-400">+{crmMetrics.newLeadsMonth} este mes</span>
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
                  <Target className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-xs text-gray-500">Conversión</span>
              </div>
              <p className="text-2xl font-bold">{crmMetrics.conversionRate}%</p>
              <p className="text-sm text-gray-500">Tasa de Cierre</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-green-400">+3.2% vs mes anterior</span>
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
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs text-gray-500">Promedio</span>
              </div>
              <p className="text-2xl font-bold">${(crmMetrics.avgDealSize/1000).toFixed(1)}k</p>
              <p className="text-sm text-gray-500">Valor del Deal</p>
              <div className="flex items-center mt-2">
                <Award className="w-3 h-3 text-purple-400 mr-1" />
                <span className="text-xs text-purple-400">Top 20%</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-xs text-gray-500">Ciclo</span>
              </div>
              <p className="text-2xl font-bold">{crmMetrics.salesCycle}</p>
              <p className="text-sm text-gray-500">Días Promedio</p>
              <div className="flex items-center mt-2">
                <Zap className="w-3 h-3 text-orange-400 mr-1" />
                <span className="text-xs text-orange-400">-2 días vs promedio</span>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-900 p-1 rounded-lg w-fit">
            {['pipeline', 'leads', 'activities', 'analytics', 'automation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab === 'automation' ? 'Automatización' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Areas */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            {/* Pipeline View */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Pipeline de Ventas</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Valor Total:</span>
                  <span className="text-xl font-bold text-green-400">$150,000</span>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4">
                {pipelineStages.map((stage) => (
                  <div key={stage.id} className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{stage.name}</p>
                        <p className="text-xs text-gray-500">{stage.count} leads</p>
                      </div>
                      <div className={`w-2 h-8 rounded-full ${stage.color}`} />
                    </div>
                    
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {leads
                        .filter(lead => lead.stage === stage.id)
                        .map((lead) => (
                          <motion.div
                            key={lead.id}
                            whileHover={{ scale: 1.02 }}
                            className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-all"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium text-sm">{lead.name}</p>
                                <p className="text-xs text-gray-500">{lead.company}</p>
                              </div>
                              <span className={`text-xs font-bold ${getScoreColor(lead.score)}`}>
                                {lead.score}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">${(lead.value/1000).toFixed(1)}k</span>
                              <span className={`px-1.5 py-0.5 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                                {lead.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="p-2 bg-gray-700 rounded-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.action}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-sm">Carlos Ruiz</p>
                        <p className="text-xs text-gray-500">12 deals cerrados</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-400">$45k</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-sm">Ana López</p>
                        <p className="text-xs text-gray-500">10 deals cerrados</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-400">$38k</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-700 to-amber-800 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-sm">Luis Martínez</p>
                        <p className="text-xs text-gray-500">8 deals cerrados</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-400">$32k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Leads Toolbar */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 w-64"
                    />
                  </div>
                  <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500">
                    <option value="">Todos los estados</option>
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                  </select>
                  <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filtros</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
                    Importar
                  </button>
                  <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
                    Exportar
                  </button>
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Lead</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Contacto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Valor</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Asignado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Próxima Acción</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads
                      .filter(lead => 
                        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((lead) => (
                        <tr key={lead.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium">{lead.name}</p>
                              <p className="text-xs text-gray-500">{lead.company}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="space-y-1">
                              <div className="flex items-center text-xs text-gray-400">
                                <Mail className="w-3 h-3 mr-1" />
                                {lead.email}
                              </div>
                              <div className="flex items-center text-xs text-gray-400">
                                <Phone className="w-3 h-3 mr-1" />
                                {lead.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-12 bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    lead.score >= 80 ? 'bg-green-400' :
                                    lead.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                                  }`}
                                  style={{ width: `${lead.score}%` }}
                                />
                              </div>
                              <span className={`text-sm font-bold ${getScoreColor(lead.score)}`}>
                                {lead.score}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium">${(lead.value/1000).toFixed(1)}k</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm">{lead.assignedTo}</p>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-sm">{lead.nextAction}</p>
                              <p className="text-xs text-gray-500">{lead.nextActionDate}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                                <Phone className="w-4 h-4 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                                <Mail className="w-4 h-4 text-gray-400" />
                              </button>
                              <button 
                                onClick={() => setSelectedLead(lead)}
                                className="p-1 hover:bg-gray-700 rounded transition-colors"
                              >
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

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Rendimiento de Ventas</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="#60A5FA" 
                      strokeWidth={2}
                      name="Leads"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conversions" 
                      stroke="#34D399" 
                      strokeWidth={2}
                      name="Conversiones"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Ingresos Mensuales</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                      formatter={(value) => [`$${(value/1000).toFixed(0)}k`, 'Ingresos']}
                    />
                    <Bar dataKey="revenue" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Lead Sources & Team Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Fuentes de Leads</h3>
                <div className="space-y-3">
                  {leadSources.map((source) => (
                    <div key={source.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">{source.name}</span>
                        <span className="text-sm font-medium">{source.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{ 
                            width: `${source.value}%`,
                            backgroundColor: source.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Métricas Clave</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Customer Lifetime Value</span>
                      <Heart className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold">${(crmMetrics.customerLifetime/1000).toFixed(1)}k</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">NPS Score</span>
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-2xl font-bold">{crmMetrics.nps}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Churn Rate</span>
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold">{crmMetrics.churnRate}%</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Sales Velocity</span>
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold">2.3x</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
            {/* Automation Rules */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Reglas de Automatización</h3>
                <button className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-500 transition-colors">
                  Nueva Regla
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                        Bienvenida a Nuevos Leads
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Enviar email de bienvenida cuando se crea un nuevo lead
                      </p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>Ejecutado: 234 veces</span>
                    <span>Última vez: Hace 2 horas</span>
                    <span className="text-green-400">100% éxito</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-400" />
                        Seguimiento Automático
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Recordatorio después de 3 días sin respuesta
                      </p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>Ejecutado: 89 veces</span>
                    <span>Última vez: Hace 5 horas</span>
                    <span className="text-green-400">98% éxito</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <Target className="w-4 h-4 mr-2 text-green-400" />
                        Lead Scoring Automático
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Actualizar score basado en interacciones
                      </p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>Ejecutado: 567 veces</span>
                    <span>Última vez: Hace 1 hora</span>
                    <span className="text-yellow-400">95% éxito</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Templates */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Plantillas de Email</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  <Mail className="w-8 h-8 text-blue-400 mb-3" />
                  <h4 className="font-medium mb-1">Bienvenida</h4>
                  <p className="text-xs text-gray-500">Usado 234 veces</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-green-400 mb-3" />
                  <h4 className="font-medium mb-1">Propuesta</h4>
                  <p className="text-xs text-gray-500">Usado 89 veces</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  <Calendar className="w-8 h-8 text-purple-400 mb-3" />
                  <h4 className="font-medium mb-1">Recordatorio</h4>
                  <p className="text-xs text-gray-500">Usado 156 veces</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lead Detail Modal */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setSelectedLead(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedLead.name}</h2>
                    <p className="text-gray-500">{selectedLead.company}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Información de Contacto</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedLead.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedLead.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedLead.company}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Métricas</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Score</p>
                        <p className={`text-xl font-bold ${getScoreColor(selectedLead.score)}`}>
                          {selectedLead.score}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Valor</p>
                        <p className="text-xl font-bold">${(selectedLead.value/1000).toFixed(1)}k</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedLead.activities && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Actividades Recientes</h3>
                    <div className="space-y-2">
                      {selectedLead.activities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-sm">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Notas</h3>
                  <p className="text-sm text-gray-400">{selectedLead.notes}</p>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Contactar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Lead Modal */}
        <AnimatePresence>
          {showLeadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowLeadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-6">Nuevo Lead</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Empresa</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="+52 55 1234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Fuente</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500">
                      <option>Website</option>
                      <option>Referido</option>
                      <option>Social Media</option>
                      <option>Email</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowLeadModal(false)}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Crear Lead
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

export default CRMManager;
