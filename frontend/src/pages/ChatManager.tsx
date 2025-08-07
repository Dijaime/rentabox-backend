import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, Paperclip, Smile, Search, Phone, Video,
  MoreVertical, User, Users, Circle, CheckCheck, Check, Clock,
  Bell, BellOff, Archive, Trash2, Star, Pin, Filter, Hash,
  AtSign, Settings, Mic, Image, File, X, ChevronDown,
  AlertCircle, Zap, Globe, Lock, Headphones, UserPlus,
  Volume2, VolumeX, Edit3, Camera, Download, ExternalLink, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ChatManager() {
  const [activeTab, setActiveTab] = useState('customers');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // User Status
  const [userStatus, setUserStatus] = useState('online');
  const [notifications, setNotifications] = useState(true);

  // Customer Chats
  const [customerChats] = useState([
    {
      id: 'CHAT-001',
      customer: {
        name: 'María González',
        email: 'maria.gonzalez@email.com',
        avatar: null,
        status: 'online',
        company: 'Startup Tech MX'
      },
      lastMessage: {
        text: '¿Cuándo pueden entregar las cajas?',
        time: '10:30 AM',
        unread: 2,
        type: 'text'
      },
      priority: 'high',
      assignedTo: 'Carlos Ruiz',
      tags: ['nuevo-cliente', 'urgente'],
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'Hola, necesito información sobre el servicio de almacenamiento',
          time: '10:15 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: 'agent',
          text: '¡Hola María! Con gusto te ayudo. ¿Cuántas cajas necesitas aproximadamente?',
          time: '10:18 AM',
          status: 'read'
        },
        {
          id: 3,
          sender: 'customer',
          text: 'Necesito unas 20 cajas grandes para mi oficina',
          time: '10:25 AM',
          status: 'read'
        },
        {
          id: 4,
          sender: 'customer',
          text: '¿Cuándo pueden entregar las cajas?',
          time: '10:30 AM',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'CHAT-002',
      customer: {
        name: 'Carlos Mendoza',
        email: 'carlos.m@empresa.com',
        avatar: null,
        status: 'away',
        company: 'Oficinas Reforma'
      },
      lastMessage: {
        text: 'Perfecto, gracias por la información',
        time: '9:45 AM',
        unread: 0,
        type: 'text'
      },
      priority: 'medium',
      assignedTo: 'Ana López',
      tags: ['cliente-frecuente'],
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'Buenos días, quisiera renovar mi contrato',
          time: '9:30 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: 'agent',
          text: 'Buenos días Carlos, claro que sí. Tu contrato actual vence el próximo mes.',
          time: '9:35 AM',
          status: 'read'
        },
        {
          id: 3,
          sender: 'agent',
          text: 'Te envío la propuesta de renovación con un descuento del 10%',
          time: '9:40 AM',
          status: 'read',
          attachment: {
            type: 'pdf',
            name: 'Propuesta_Renovacion_2024.pdf',
            size: '1.2 MB'
          }
        },
        {
          id: 4,
          sender: 'customer',
          text: 'Perfecto, gracias por la información',
          time: '9:45 AM',
          status: 'read'
        }
      ]
    },
    {
      id: 'CHAT-003',
      customer: {
        name: 'Ana Ramírez',
        email: 'ana.ramirez@gmail.com',
        avatar: null,
        status: 'offline',
        company: 'Personal'
      },
      lastMessage: {
        text: 'Enviaste una imagen',
        time: 'Ayer',
        unread: 0,
        type: 'image'
      },
      priority: 'low',
      assignedTo: 'Carlos Ruiz',
      tags: ['seguimiento'],
      messages: []
    }
  ]);

  // Internal Team Chats
  const [teamChats] = useState([
    {
      id: 'TEAM-001',
      name: 'Equipo de Ventas',
      type: 'group',
      members: ['Carlos Ruiz', 'Ana López', 'Luis Martínez'],
      lastMessage: {
        sender: 'Carlos Ruiz',
        text: '¡Cerramos el deal con Constructora Silva! 🎉',
        time: '11:00 AM',
        unread: 5
      },
      icon: 'sales',
      pinned: true,
      messages: [
        {
          id: 1,
          sender: 'Carlos Ruiz',
          senderRole: 'Sales Manager',
          text: 'Buenos días equipo, ¿cómo van los leads de esta semana?',
          time: '9:00 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: 'Ana López',
          senderRole: 'Sales Rep',
          text: 'Tengo 3 demos programadas para hoy',
          time: '9:15 AM',
          status: 'read'
        },
        {
          id: 3,
          sender: 'Luis Martínez',
          senderRole: 'Sales Rep',
          text: 'Yo cerré 2 deals ayer, voy por el tercero',
          time: '10:30 AM',
          status: 'read'
        },
        {
          id: 4,
          sender: 'Carlos Ruiz',
          senderRole: 'Sales Manager',
          text: '¡Cerramos el deal con Constructora Silva! 🎉',
          time: '11:00 AM',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'TEAM-002',
      name: 'Soporte Técnico',
      type: 'group',
      members: ['Miguel Torres', 'Sofia Hernández'],
      lastMessage: {
        sender: 'System',
        text: 'Sofia se unió al canal',
        time: '10:00 AM',
        unread: 0
      },
      icon: 'support',
      pinned: false,
      messages: []
    },
    {
      id: 'TEAM-003',
      name: 'Carlos Ruiz',
      type: 'direct',
      status: 'online',
      lastMessage: {
        sender: 'You',
        text: 'Ok, lo reviso ahora',
        time: '8:30 AM',
        unread: 0
      },
      messages: []
    }
  ]);

  // Combined chats for current tab
  const getCurrentChats = () => {
    if (activeTab === 'customers') {
      return customerChats.filter(chat => 
        chat.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return teamChats.filter(chat => 
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  // Quick Responses
  const quickResponses = [
    '¡Hola! ¿En qué puedo ayudarte?',
    'Claro, con gusto te ayudo con eso.',
    'Dame un momento para verificar esa información.',
    'Gracias por contactarnos, en breve te respondo.',
    'Puedes agendar una llamada en nuestro calendario: tesili.com/agenda'
  ];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Add message logic here
    console.log('Sending message:', messageText);
    setMessageText('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getMessageStatus = (status) => {
    switch(status) {
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Chat Center
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setNotifications(!notifications)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {notifications ? (
                  <Bell className="w-5 h-5 text-gray-400" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setShowNewChatModal(true)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Edit3 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex mt-4">
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === 'customers'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Clientes
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === 'team'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Equipo
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {getCurrentChats().map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-800 cursor-pointer ${
                selectedChat?.id === chat.id ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    {activeTab === 'customers' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : chat.type === 'group' ? (
                      <Users className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  {activeTab === 'customers' && (
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900 ${
                      getStatusColor(chat.customer.status)
                    }`} />
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium truncate">
                      {activeTab === 'customers' ? chat.customer.name : chat.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {chat.lastMessage.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 truncate">
                      {activeTab === 'team' && chat.lastMessage.sender !== 'System' && 
                        `${chat.lastMessage.sender}: `}
                      {chat.lastMessage.text}
                    </p>
                    {chat.lastMessage.unread > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                        {chat.lastMessage.unread}
                      </span>
                    )}
                  </div>
                  {activeTab === 'customers' && chat.tags.length > 0 && (
                    <div className="flex items-center space-x-1 mt-2">
                      {chat.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Status */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900 ${
                  getStatusColor(userStatus)
                }`} />
              </div>
              <div>
                <p className="text-sm font-medium">Tu</p>
                <select 
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}
                  className="text-xs bg-transparent text-gray-400 outline-none"
                >
                  <option value="online">En línea</option>
                  <option value="away">Ausente</option>
                  <option value="offline">Desconectado</option>
                </select>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    {activeTab === 'customers' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : selectedChat.type === 'group' ? (
                      <Users className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  {activeTab === 'customers' && (
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900 ${
                      getStatusColor(selectedChat.customer.status)
                    }`} />
                  )}
                </div>
                <div>
                  <p className="font-semibold">
                    {activeTab === 'customers' ? selectedChat.customer.name : selectedChat.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {activeTab === 'customers' 
                      ? selectedChat.customer.company 
                      : selectedChat.type === 'group' 
                        ? `${selectedChat.members.length} miembros`
                        : 'En línea'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => setShowProfilePanel(!showProfilePanel)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {selectedChat.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'agent' || message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${message.sender === 'agent' || message.sender === 'You' ? 'order-2' : ''}`}>
                  {activeTab === 'team' && message.sender !== 'You' && (
                    <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
                  )}
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'agent' || message.sender === 'You'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    {message.attachment && (
                      <div className="mt-2 p-2 bg-black/20 rounded flex items-center space-x-2">
                        <File className="w-4 h-4" />
                        <div className="flex-1">
                          <p className="text-xs font-medium">{message.attachment.name}</p>
                          <p className="text-xs opacity-70">{message.attachment.size}</p>
                        </div>
                        <Download className="w-4 h-4 cursor-pointer hover:opacity-80" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{message.time}</span>
                    {(message.sender === 'agent' || message.sender === 'You') && (
                      <span className="ml-2">{getMessageStatus(message.status)}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm">escribiendo...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          {activeTab === 'customers' && (
            <div className="px-6 py-2 border-t border-gray-800">
              <div className="flex items-center space-x-2 overflow-x-auto">
                <span className="text-xs text-gray-500">Rápidas:</span>
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => setMessageText(response)}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-xs whitespace-nowrap transition-colors"
                  >
                    {response.substring(0, 30)}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-gray-800 bg-gray-900">
            <div className="flex items-end space-x-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Paperclip className="w-5 h-5 text-gray-400" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => console.log('File selected:', e.target.files[0])}
              />
              <div className="flex-1 relative">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe un mensaje..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                  rows="1"
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
                <button className="absolute right-2 bottom-2 p-1 hover:bg-gray-700 rounded transition-colors">
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Selecciona una conversación
            </h3>
            <p className="text-gray-500">
              Elige un chat de la lista para comenzar a conversar
            </p>
          </div>
        </div>
      )}

      {/* Profile Panel */}
      <AnimatePresence>
        {showProfilePanel && selectedChat && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-gray-900 border-l border-gray-800 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Información</h3>
                <button
                  onClick={() => setShowProfilePanel(false)}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {activeTab === 'customers' && (
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-center font-semibold">{selectedChat.customer.name}</h4>
                    <p className="text-center text-sm text-gray-400">{selectedChat.customer.company}</p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{selectedChat.customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Asignado a: {selectedChat.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Prioridad: {selectedChat.priority}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Etiquetas</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedChat.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      <button className="px-2 py-1 border border-gray-700 text-xs rounded hover:bg-gray-800 transition-colors">
                        + Agregar
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Ver perfil completo</span>
                    </button>
                    <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2">
                      <Archive className="w-4 h-4" />
                      <span>Archivar conversación</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'team' && selectedChat.type === 'group' && (
                <div className="space-y-6">
                  {/* Group Info */}
                  <div>
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-center font-semibold">{selectedChat.name}</h4>
                    <p className="text-center text-sm text-gray-400">{selectedChat.members.length} miembros</p>
                  </div>

                  {/* Members */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-3">Miembros</h5>
                    <div className="space-y-2">
                      {selectedChat.members.map((member) => (
                        <div key={member} className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg transition-colors">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{member}</p>
                            <p className="text-xs text-gray-500">En línea</p>
                          </div>
                        </div>
                      ))}
                      <button className="w-full px-3 py-2 border border-gray-700 rounded-lg text-sm hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Agregar miembro</span>
                      </button>
                    </div>
                  </div>

                  {/* Group Settings */}
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center justify-between">
                      <span>Notificaciones</span>
                      <Volume2 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center justify-between">
                      <span>Archivos compartidos</span>
                      <File className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Chat Modal */}
      <AnimatePresence>
        {showNewChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowNewChatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-6">Nueva Conversación</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tipo</label>
                  <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500">
                    <option>Cliente</option>
                    <option>Miembro del equipo</option>
                    <option>Grupo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nombre/Email</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Buscar o ingresar email..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Mensaje inicial</label>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                    rows="3"
                    placeholder="Escribe tu mensaje..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all">
                  Iniciar Chat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatManager;
