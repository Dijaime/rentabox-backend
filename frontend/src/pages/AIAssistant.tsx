import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, Bot, Sparkles, Cpu, Zap, MessageSquare, Send,
  TrendingUp, Target, AlertCircle, CheckCircle, Clock,
  BarChart3, PieChart, Activity, GitBranch, PlayCircle,
  Settings, Filter, Search, ChevronRight, ChevronDown,
  Lightbulb, Rocket, Shield, Globe, Database, Cloud,
  FileText, Calendar, Users, Package, DollarSign,
  ArrowUpRight, ArrowDownRight, RefreshCw, Download,
  Code, Terminal, Layers, Award, Star, Flag, Info, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar,
         RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
         XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AIAssistant() {
  const [activeTab, setActiveTab] = useState('assistant');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState(null);
  const messagesEndRef = useRef(null);

  // AI Insights & Predictions
  const [aiInsights] = useState([
    {
      id: 'INS-001',
      type: 'revenue',
      title: 'Proyección de Ingresos',
      prediction: 'Los ingresos aumentarán un 23% el próximo mes',
      confidence: 87,
      impact: 'high',
      details: 'Basado en tendencias estacionales y crecimiento actual',
      recommendations: [
        'Aumentar inventario en 15%',
        'Preparar campaña de marketing',
        'Contratar 2 agentes temporales'
      ],
      metrics: {
        currentMonth: 378900,
        nextMonth: 465447,
        growth: '+23%'
      }
    },
    {
      id: 'INS-002',
      type: 'customer',
      title: 'Riesgo de Churn Detectado',
      prediction: '5 clientes premium muestran señales de abandono',
      confidence: 78,
      impact: 'critical',
      details: 'Reducción del 40% en actividad últimas 2 semanas',
      recommendations: [
        'Contactar personalmente a cada cliente',
        'Ofrecer descuento de retención 20%',
        'Programar llamada de seguimiento'
      ],
      affectedCustomers: ['Carlos Mendoza', 'Ana Ramírez', 'Luis Torres', 'Sofia García', 'Miguel Ángel']
    },
    {
      id: 'INS-003',
      type: 'inventory',
      title: 'Optimización de Inventario',
      prediction: 'Cajas medianas se agotarán en 3 días',
      confidence: 92,
      impact: 'medium',
      details: 'Velocidad de consumo 45% mayor que el promedio',
      recommendations: [
        'Reordenar 200 unidades inmediatamente',
        'Negociar precio por volumen',
        'Activar alerta de stock bajo'
      ]
    },
    {
      id: 'INS-004',
      type: 'operations',
      title: 'Horario Óptimo Detectado',
      prediction: 'Mayor conversión entre 2PM-5PM',
      confidence: 94,
      impact: 'medium',
      details: '67% de ventas exitosas en este horario',
      recommendations: [
        'Asignar más agentes en horario pico',
        'Programar campañas para 2PM',
        'Ajustar horario de atención'
      ]
    }
  ]);

  // Automation Workflows
  const [automationWorkflows] = useState([
    {
      id: 'AUTO-001',
      name: 'Onboarding Automático de Clientes',
      description: 'Proceso completo de bienvenida para nuevos clientes',
      status: 'active',
      trigger: 'Nuevo cliente registrado',
      actions: [
        'Enviar email de bienvenida',
        'Crear cuenta en CRM',
        'Asignar agente de ventas',
        'Programar llamada de seguimiento',
        'Enviar recursos de ayuda'
      ],
      executionCount: 234,
      successRate: 98.5,
      lastRun: '2024-11-15T14:30:00Z',
      savedTime: '45 min/cliente'
    },
    {
      id: 'AUTO-002',
      name: 'Recuperación de Carritos Abandonados',
      description: 'Secuencia para recuperar ventas perdidas',
      status: 'active',
      trigger: 'Carrito abandonado > 2 horas',
      actions: [
        'Esperar 2 horas',
        'Enviar recordatorio por email',
        'Esperar 24 horas',
        'Enviar descuento 10%',
        'Notificar a ventas si no convierte'
      ],
      executionCount: 89,
      successRate: 34.2,
      lastRun: '2024-11-15T13:00:00Z',
      recoveredRevenue: '$45,600'
    },
    {
      id: 'AUTO-003',
      name: 'Escalamiento de Tickets Urgentes',
      description: 'Manejo automático de casos críticos',
      status: 'active',
      trigger: 'Ticket con prioridad alta',
      actions: [
        'Notificar supervisor inmediatamente',
        'Asignar al agente senior disponible',
        'Enviar SMS al cliente',
        'Crear alerta en dashboard',
        'Programar revisión cada hora'
      ],
      executionCount: 45,
      successRate: 91.3,
      lastRun: '2024-11-15T12:15:00Z',
      avgResolutionTime: '1.5 horas'
    },
    {
      id: 'AUTO-004',
      name: 'Análisis Predictivo Semanal',
      description: 'Generación de reportes y predicciones',
      status: 'scheduled',
      trigger: 'Todos los lunes 9:00 AM',
      actions: [
        'Recopilar datos de la semana',
        'Ejecutar modelos predictivos',
        'Generar insights automáticos',
        'Crear reporte ejecutivo',
        'Enviar a stakeholders'
      ],
      executionCount: 52,
      successRate: 100,
      lastRun: '2024-11-11T09:00:00Z',
      nextRun: '2024-11-18T09:00:00Z'
    }
  ]);

  // AI Performance Metrics
  const aiMetrics = {
    totalPredictions: 1847,
    accuracyRate: 89.3,
    automationsSaved: '324 horas',
    revenueImpact: '+$127,500',
    tasksAutomated: 2456,
    avgResponseTime: '1.2s',
    modelsActive: 8,
    dataProcessed: '12.4 GB'
  };

  // ML Model Performance
  const modelPerformance = [
    { model: 'Predicción Ventas', accuracy: 92, f1Score: 0.89, precision: 0.91, recall: 0.87 },
    { model: 'Detección Churn', accuracy: 85, f1Score: 0.82, precision: 0.84, recall: 0.80 },
    { model: 'Clasificación Leads', accuracy: 88, f1Score: 0.86, precision: 0.87, recall: 0.85 },
    { model: 'Análisis Sentimiento', accuracy: 94, f1Score: 0.93, precision: 0.95, recall: 0.91 },
    { model: 'Forecast Inventario', accuracy: 90, f1Score: 0.88, precision: 0.89, recall: 0.87 }
  ];

  // Training Data for Radar Chart
  const radarData = [
    { subject: 'Ventas', A: 92, B: 85, fullMark: 100 },
    { subject: 'Marketing', A: 88, B: 78, fullMark: 100 },
    { subject: 'Soporte', A: 95, B: 90, fullMark: 100 },
    { subject: 'Inventario', A: 85, B: 80, fullMark: 100 },
    { subject: 'Finanzas', A: 90, B: 82, fullMark: 100 },
    { subject: 'Operaciones', A: 87, B: 85, fullMark: 100 }
  ];

  // Suggested Actions
  const suggestedActions = [
    {
      icon: <DollarSign className="w-4 h-4" />,
      title: 'Optimizar Pricing',
      description: 'Ajustar precios basado en demanda',
      impact: '+15% revenue',
      priority: 'high'
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: 'Segmentar Clientes',
      description: 'Crear 3 nuevos segmentos identificados',
      impact: 'Mejor targeting',
      priority: 'medium'
    },
    {
      icon: <Package className="w-4 h-4" />,
      title: 'Restock Automático',
      description: 'Activar reorden inteligente',
      impact: '-30% stockouts',
      priority: 'high'
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      title: 'Optimizar Horarios',
      description: 'Redistribuir turnos del equipo',
      impact: '+20% eficiencia',
      priority: 'medium'
    }
  ];

  // Quick AI Commands
  const quickCommands = [
    { cmd: '/predict', desc: 'Generar predicciones' },
    { cmd: '/analyze', desc: 'Analizar datos' },
    { cmd: '/automate', desc: 'Crear automatización' },
    { cmd: '/report', desc: 'Generar reporte' },
    { cmd: '/optimize', desc: 'Optimizar proceso' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsAITyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsAITyping(false);
    }, 1500);
  };

  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('ventas') || lowerInput.includes('revenue')) {
      return `📊 Análisis de Ventas:
      
• Ventas actuales: $378,900 MXN (mes)
• Proyección próximo mes: $465,447 (+23%)
• Mejor día: Viernes (promedio $72k)
• Producto estrella: Cajas grandes (35% del revenue)

💡 Recomendación: Aumentar inventario de cajas grandes y preparar promoción para el viernes.`;
    }
    
    if (lowerInput.includes('cliente') || lowerInput.includes('churn')) {
      return `👥 Análisis de Clientes:
      
• Total clientes activos: 1,234
• Nuevos este mes: 156 (+18%)
• En riesgo de churn: 5 clientes premium
• NPS Score: 72 (Excelente)

⚠️ Acción urgente: Contactar a los 5 clientes en riesgo hoy mismo.`;
    }

    return `Entiendo tu consulta sobre "${input}". Basándome en los datos actuales, te sugiero:

1. Revisar las métricas del dashboard principal
2. Configurar una automatización para este proceso
3. Programar un análisis más profundo

¿Te gustaría que profundice en algún aspecto específico?`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAITyping]);

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    if (confidence >= 60) return 'text-orange-400';
    return 'text-red-400';
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent flex items-center">
                <Brain className="w-8 h-8 mr-3 text-purple-400" />
                AI Assistant & Automation
              </h1>
              <p className="text-gray-500 mt-1">Inteligencia artificial y automatización de procesos</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-gray-800 rounded-lg flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-sm">8 Modelos Activos</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAutomationModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Nueva Automatización</span>
              </motion.button>
            </div>
          </div>

          {/* AI Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs text-gray-500">IA</span>
              </div>
              <p className="text-2xl font-bold">{aiMetrics.accuracyRate}%</p>
              <p className="text-sm text-gray-500">Precisión</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-green-400">+2.3% esta semana</span>
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
                <span className="text-xs text-gray-500">Impacto</span>
              </div>
              <p className="text-2xl font-bold">{aiMetrics.revenueImpact}</p>
              <p className="text-sm text-gray-500">Revenue generado</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-green-400">Por automatización</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-500">Ahorro</span>
              </div>
              <p className="text-2xl font-bold">{aiMetrics.automationsSaved}</p>
              <p className="text-sm text-gray-500">Tiempo ahorrado</p>
              <div className="flex items-center mt-2">
                <Zap className="w-3 h-3 text-blue-400 mr-1" />
                <span className="text-xs text-blue-400">Este mes</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-pink-400" />
                </div>
                <span className="text-xs text-gray-500">Tareas</span>
              </div>
              <p className="text-2xl font-bold">{aiMetrics.tasksAutomated.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Automatizadas</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-green-400">98.5% exitosas</span>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-900 p-1 rounded-lg w-fit">
            {['assistant', 'insights', 'automations', 'models', 'training'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab === 'assistant' ? 'Asistente' : 
                 tab === 'insights' ? 'Insights' :
                 tab === 'automations' ? 'Automatizaciones' :
                 tab === 'models' ? 'Modelos' : 'Entrenamiento'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Areas */}
        {activeTab === 'assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl flex flex-col h-[600px]">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tesili AI Assistant</h3>
                      <p className="text-xs text-gray-500">Siempre listo para ayudarte</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">¡Hola! Soy tu asistente de IA</h4>
                    <p className="text-gray-500 text-sm mb-6">
                      Puedo ayudarte con predicciones, análisis, automatizaciones y más.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {quickCommands.map((cmd) => (
                        <button
                          key={cmd.cmd}
                          onClick={() => setInputMessage(cmd.cmd)}
                          className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                        >
                          <span className="font-mono text-purple-400">{cmd.cmd}</span>
                          <span className="ml-2 text-gray-500">{cmd.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-md ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`px-4 py-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : 'bg-gray-800 text-gray-100'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    {isAITyping && (
                      <div className="flex items-center space-x-2 text-gray-400">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-sm">AI está pensando...</span>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Pregunta algo a la IA..."
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Suggested Actions */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                  Acciones Sugeridas
                </h3>
                <div className="space-y-3">
                  {suggestedActions.map((action, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-700 rounded-lg">
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{action.title}</p>
                          <p className="text-xs text-gray-500">{action.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-green-400">{action.impact}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              action.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {action.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Predicciones hoy</span>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Automatizaciones</span>
                    <span className="font-bold">12 activas</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Tiempo respuesta</span>
                    <span className="font-bold">1.2s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Confianza promedio</span>
                    <span className="font-bold text-green-400">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* AI Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{insight.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{insight.prediction}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${getImpactColor(insight.impact)}`}>
                      {insight.impact}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Confianza del modelo</span>
                      <span className={`font-bold ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          insight.confidence >= 90 ? 'bg-green-400' :
                          insight.confidence >= 75 ? 'bg-yellow-400' :
                          insight.confidence >= 60 ? 'bg-orange-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg mb-4">
                    <p className="text-xs text-gray-500 mb-1">Detalles</p>
                    <p className="text-sm">{insight.details}</p>
                  </div>

                  {insight.recommendations && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-400">Recomendaciones:</p>
                      {insight.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {insight.metrics && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="text-center p-2 bg-gray-800/50 rounded">
                        <p className="text-xs text-gray-500">Actual</p>
                        <p className="font-bold">${(insight.metrics.currentMonth/1000).toFixed(0)}k</p>
                      </div>
                      <div className="text-center p-2 bg-gray-800/50 rounded">
                        <p className="text-xs text-gray-500">Proyección</p>
                        <p className="font-bold">${(insight.metrics.nextMonth/1000).toFixed(0)}k</p>
                      </div>
                      <div className="text-center p-2 bg-gray-800/50 rounded">
                        <p className="text-xs text-gray-500">Cambio</p>
                        <p className="font-bold text-green-400">{insight.metrics.growth}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <button className="text-sm text-purple-400 hover:text-purple-300">
                      Ver análisis completo →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Performance Chart */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Rendimiento de Predicciones (7 días)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[
                  { day: 'Lun', predicciones: 45, aciertos: 41 },
                  { day: 'Mar', predicciones: 52, aciertos: 47 },
                  { day: 'Mié', predicciones: 48, aciertos: 44 },
                  { day: 'Jue', predicciones: 61, aciertos: 56 },
                  { day: 'Vie', predicciones: 58, aciertos: 52 },
                  { day: 'Sáb', predicciones: 42, aciertos: 38 },
                  { day: 'Dom', predicciones: 35, aciertos: 32 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicciones" 
                    stroke="#A855F7" 
                    strokeWidth={2}
                    name="Total Predicciones"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aciertos" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Predicciones Correctas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'automations' && (
          <div className="space-y-6">
            {/* Automation Workflows */}
            {automationWorkflows.map((workflow) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{workflow.name}</h3>
                    <p className="text-sm text-gray-400">{workflow.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      workflow.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      workflow.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {workflow.status}
                    </span>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Trigger</p>
                    <p className="text-sm font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                      {workflow.trigger}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Métricas</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{workflow.executionCount} runs</span>
                      <span className="text-sm font-medium text-green-400">{workflow.successRate}% éxito</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-400 mb-2">Acciones ({workflow.actions.length})</p>
                  <div className="space-y-2">
                    {workflow.actions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-bold text-purple-400">
                          {index + 1}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        <p className="text-sm">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Última ejecución: {new Date(workflow.lastRun).toLocaleString()}</span>
                    {workflow.savedTime && <span className="text-green-400">Ahorro: {workflow.savedTime}</span>}
                    {workflow.recoveredRevenue && <span className="text-green-400">Revenue: {workflow.recoveredRevenue}</span>}
                  </div>
                  <button className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-500 transition-colors">
                    Ejecutar Ahora
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-6">
            {/* Model Performance Table */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">Rendimiento de Modelos ML</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Modelo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Accuracy</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">F1 Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Precision</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Recall</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelPerformance.map((model) => (
                      <tr key={model.model} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium">{model.model}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-700 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-green-400"
                                style={{ width: `${model.accuracy}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{model.accuracy}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm">{model.f1Score}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm">{model.precision}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm">{model.recall}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-500/20 text-green-400">
                            Activo
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <PlayCircle className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <Settings className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Model Comparison Radar Chart */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Comparación de Modelos por Área</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9CA3AF" />
                  <Radar name="Modelo Actual" dataKey="A" stroke="#A855F7" fill="#A855F7" fillOpacity={0.6} />
                  <Radar name="Modelo Anterior" dataKey="B" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Centro de Entrenamiento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Nuevo Modelo</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Tipo de Modelo</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500">
                        <option>Clasificación</option>
                        <option>Regresión</option>
                        <option>Clustering</option>
                        <option>NLP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Dataset</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500">
                        <option>Ventas históricas</option>
                        <option>Comportamiento clientes</option>
                        <option>Inventario</option>
                        <option>Tickets soporte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Algoritmo</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500">
                        <option>Random Forest</option>
                        <option>XGBoost</option>
                        <option>Neural Network</option>
                        <option>SVM</option>
                      </select>
                    </div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                      Iniciar Entrenamiento
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Entrenamiento en Progreso</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Modelo Churn v2.1</span>
                        <span className="text-xs text-yellow-400">En progreso</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Epoch 78/100</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Loss:</span>
                          <span className="ml-1 font-mono">0.0234</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Val Acc:</span>
                          <span className="ml-1 font-mono">92.3%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg opacity-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Forecast Inventario v3.0</span>
                        <span className="text-xs text-gray-500">En cola</span>
                      </div>
                      <p className="text-xs text-gray-500">Iniciará después del modelo actual</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Training History */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Historial de Entrenamiento</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium">Predicción Ventas v4.2</p>
                      <p className="text-xs text-gray-500">Completado hace 2 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">Acc: 94.2%</p>
                    <p className="text-xs text-gray-500">2h 15min</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium">Clasificación Leads v2.8</p>
                      <p className="text-xs text-gray-500">Completado hace 5 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">Acc: 88.7%</p>
                    <p className="text-xs text-gray-500">1h 45min</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="font-medium">Análisis Sentimiento v1.0</p>
                      <p className="text-xs text-gray-500">Falló hace 8 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-red-400">Error</p>
                    <p className="text-xs text-gray-500">45min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Automation Modal */}
        <AnimatePresence>
          {showAutomationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowAutomationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-6">Nueva Automatización</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Mi automatización"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                    <textarea
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                      rows="2"
                      placeholder="¿Qué hace esta automatización?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Trigger (Cuando...)</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500">
                      <option>Nuevo cliente registrado</option>
                      <option>Pedido creado</option>
                      <option>Ticket de soporte abierto</option>
                      <option>Inventario bajo</option>
                      <option>Fecha/hora específica</option>
                      <option>Webhook recibido</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Acciones (Entonces...)</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <select className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500">
                          <option>Enviar email</option>
                          <option>Enviar SMS</option>
                          <option>Crear tarea</option>
                          <option>Actualizar CRM</option>
                          <option>Notificar equipo</option>
                        </select>
                        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="w-full px-3 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                        + Agregar acción
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="activateNow"
                      className="rounded border-gray-600 bg-gray-800"
                      defaultChecked
                    />
                    <label htmlFor="activateNow" className="text-sm">Activar inmediatamente</label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAutomationModal(false)}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Crear Automatización
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

export default AIAssistant;
