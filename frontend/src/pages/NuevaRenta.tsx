
import React, { useState } from 'react';
import {
  Package, User, MapPin, Calendar, DollarSign, 
  ChevronRight, ChevronLeft, Check, AlertCircle,
  Home, Building, Phone, Mail, Hash, Plus, Minus,
  Truck, Clock, CreditCard, Info, Sparkles, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import brain from "@/brain";

interface FormData {
  // Cliente
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  
  // Direcciones
  direccion_entrega: {
    calle: string;
    interior: string;
    colonia: string;
    alcaldia: string;
    estado: string;
    cp: string;
  };
  direccion_recoleccion: {
    misma: boolean;
    calle: string;
    interior: string;
    colonia: string;
    alcaldia: string;
    estado: string;
    cp: string;
  };
  
  // Servicio
  tipo_servicio: string;
  paquete: string;
  semanas: number;
  
  // Productos adicionales
  cajas_xl: number;
  carritos: number;
  film: number;
  esquineros: number;
  papel_kraft: number;
}

const PAQUETES = [
  {
    id: 'estudio',
    nombre: 'Estudio',
    cajas: 10,
    precio_base: 990,
    precio_semanal: 250,
    ideal: 'Ideal para departamentos pequeños',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '1_recamara',
    nombre: '1 Recámara',
    cajas: 20,
    precio_base: 1490,
    precio_semanal: 350,
    ideal: 'Perfecto para mudanzas medianas',
    color: 'from-green-500 to-green-600'
  },
  {
    id: '2_recamaras',
    nombre: '2 Recámaras',
    cajas: 30,
    precio_base: 1990,
    precio_semanal: 450,
    ideal: 'Para casas y departamentos grandes',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: '3_recamaras',
    nombre: '3 Recámaras',
    cajas: 40,
    precio_base: 2490,
    precio_semanal: 550,
    ideal: 'Solución completa para casas grandes',
    color: 'from-pink-500 to-pink-600'
  }
];

const PRODUCTOS_ADICIONALES = [
  { id: 'cajas_xl', nombre: 'Cajas XL', precio: 45, icon: Package, descripcion: 'Para objetos grandes' },
  { id: 'carritos', nombre: 'Carritos', precio: 150, icon: Truck, descripcion: 'Facilita el transporte' },
  { id: 'film', nombre: 'Film Plástico', precio: 89, icon: Package, descripcion: 'Protección extra' },
  { id: 'esquineros', nombre: 'Esquineros', precio: 25, icon: Package, descripcion: 'Protege las esquinas' },
  { id: 'papel_kraft', nombre: 'Papel Kraft', precio: 35, icon: Package, descripcion: 'Para envolver objetos' }
];

function NuevaRenta() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion_entrega: {
      calle: '',
      interior: '',
      colonia: '',
      alcaldia: '',
      estado: 'CDMX',
      cp: ''
    },
    direccion_recoleccion: {
      misma: true,
      calle: '',
      interior: '',
      colonia: '',
      alcaldia: '',
      estado: 'CDMX',
      cp: ''
    },
    tipo_servicio: 'hogar',
    paquete: 'estudio',
    semanas: 1,
    cajas_xl: 0,
    carritos: 0,
    film: 0,
    esquineros: 0,
    papel_kraft: 0
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: 'Datos Personales', icon: User },
    { number: 2, title: 'Dirección Entrega', icon: MapPin },
    { number: 3, title: 'Dirección Recolección', icon: Building },
    { number: 4, title: 'Selección de Paquete', icon: Package },
    { number: 5, title: 'Productos Adicionales', icon: Plus },
    { number: 6, title: 'Confirmación', icon: Check }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: any = {};
    
    switch(step) {
      case 1:
        if (!formData.nombre) newErrors.nombre = 'Nombre requerido';
        if (!formData.apellidos) newErrors.apellidos = 'Apellidos requeridos';
        if (!formData.email) newErrors.email = 'Email requerido';
        if (!formData.telefono) newErrors.telefono = 'Teléfono requerido';
        break;
      case 2:
        if (!formData.direccion_entrega.calle) newErrors.calle_entrega = 'Calle requerida';
        if (!formData.direccion_entrega.colonia) newErrors.colonia_entrega = 'Colonia requerida';
        if (!formData.direccion_entrega.alcaldia) newErrors.alcaldia_entrega = 'Alcaldía requerida';
        if (!formData.direccion_entrega.cp) newErrors.cp_entrega = 'CP requerido';
        break;
      case 3:
        if (!formData.direccion_recoleccion.misma) {
          if (!formData.direccion_recoleccion.calle) newErrors.calle_recoleccion = 'Calle requerida';
          if (!formData.direccion_recoleccion.colonia) newErrors.colonia_recoleccion = 'Colonia requerida';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const calculateTotal = () => {
    const paquete = PAQUETES.find(p => p.id === formData.paquete);
    if (!paquete) return 0;
    
    let total = paquete.precio_base;
    if (formData.semanas > 1) {
      total += (formData.semanas - 1) * paquete.precio_semanal;
    }
    
    total += formData.cajas_xl * 45;
    total += formData.carritos * 150;
    total += formData.film * 89;
    total += formData.esquineros * 25;
    total += formData.papel_kraft * 35;
    
    return total;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const rentaData = {
        ...formData,
        direccion_recoleccion: formData.direccion_recoleccion.misma
          ? formData.direccion_entrega
          : formData.direccion_recoleccion,
      };

      const response = await brain.crear_renta(rentaData);
      const data = await response.json();

      if (data.success) {
        toast.success(`¡Renta creada! Token: ${data.token_seguridad}`);
        navigate("/rentas");
      } else {
        toast.error(data.mensaje || "Ocurrió un error al crear la renta.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateAdditionalProduct = (product: string, operation: 'add' | 'subtract') => {
    setFormData(prev => ({
      ...prev,
      [product]: operation === 'add' 
        ? prev[product as keyof typeof prev] + 1 
        : Math.max(0, prev[product as keyof typeof prev] - 1)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: currentStep >= step.number ? 1 : 0.8 }}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    currentStep > step.number
                      ? 'bg-green-500 border-green-500'
                      : currentStep === step.number
                      ? 'bg-purple-600 border-purple-600'
                      : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className={`w-6 h-6 ${
                      currentStep === step.number ? 'text-white' : 'text-gray-500'
                    }`} />
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-2 transition-all ${
                    currentStep > step.number
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {steps[currentStep - 1].title}
          </h2>
        </div>
      </div>

      {/* Form Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
      >
        {/* Step 1: Datos Personales */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Juan"
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={formData.apellidos}
                  onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 ${
                    errors.apellidos ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Pérez García"
                />
                {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 ${
                  errors.telefono ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="5512345678"
              />
              {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Dirección de Entrega */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <Info className="w-4 h-4 inline mr-2" />
                Aquí entregaremos las cajas vacías para tu mudanza
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calle y Número
              </label>
              <input
                type="text"
                value={formData.direccion_entrega.calle}
                onChange={(e) => setFormData({
                  ...formData,
                  direccion_entrega: {...formData.direccion_entrega, calle: e.target.value}
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Av. Insurgentes 123"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interior (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.direccion_entrega.interior}
                  onChange={(e) => setFormData({
                    ...formData,
                    direccion_entrega: {...formData.direccion_entrega, interior: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Depto 4B"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Código Postal
                </label>
                <input
                  type="text"
                  value={formData.direccion_entrega.cp}
                  onChange={(e) => setFormData({
                    ...formData,
                    direccion_entrega: {...formData.direccion_entrega, cp: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="06700"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Colonia
                </label>
                <input
                  type="text"
                  value={formData.direccion_entrega.colonia}
                  onChange={(e) => setFormData({
                    ...formData,
                    direccion_entrega: {...formData.direccion_entrega, colonia: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Roma Norte"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alcaldía/Municipio
                </label>
                <input
                  type="text"
                  value={formData.direccion_entrega.alcaldia}
                  onChange={(e) => setFormData({
                    ...formData,
                    direccion_entrega: {...formData.direccion_entrega, alcaldia: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Cuauhtémoc"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Dirección de Recolección */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
              <p className="text-sm text-green-800 dark:text-green-300">
                <Info className="w-4 h-4 inline mr-2" />
                Aquí recogeremos las cajas al finalizar tu renta
              </p>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <input
                type="checkbox"
                id="misma-direccion"
                checked={formData.direccion_recoleccion.misma}
                onChange={(e) => setFormData({
                  ...formData,
                  direccion_recoleccion: {...formData.direccion_recoleccion, misma: e.target.checked}
                })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="misma-direccion" className="text-sm font-medium">
                Usar la misma dirección de entrega
              </label>
            </div>
            
            {!formData.direccion_recoleccion.misma && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                {/* Campos de dirección de recolección similares a entrega */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Calle y Número
                  </label>
                  <input
                    type="text"
                    value={formData.direccion_recoleccion.calle}
                    onChange={(e) => setFormData({
                      ...formData,
                      direccion_recoleccion: {...formData.direccion_recoleccion, calle: e.target.value}
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Av. Reforma 456"
                  />
                </div>
                {/* Más campos... */}
              </motion.div>
            )}
          </div>
        )}

        {/* Step 4: Selección de Paquete */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAQUETES.map((paquete) => (
                <motion.div
                  key={paquete.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({...formData, paquete: paquete.id})}
                  className={`relative p-6 rounded-xl cursor-pointer transition-all ${
                    formData.paquete === paquete.id
                      ? 'ring-2 ring-purple-500 shadow-lg'
                      : 'border border-gray-200 dark:border-gray-700 hover:shadow-md'
                  }`}
                >
                  {formData.paquete === paquete.id && (
                    <div className="absolute top-4 right-4">
                      <Check className="w-6 h-6 text-purple-600" />
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${paquete.color} flex items-center justify-center mb-4`}>
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {paquete.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {paquete.ideal}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Cajas incluidas:</span>
                      <span className="font-medium">{paquete.cajas}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Precio base:</span>
                      <span className="font-bold text-purple-600">${paquete.precio_base}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Semana adicional:</span>
                      <span className="font-medium">${paquete.precio_semanal}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ¿Por cuántas semanas necesitas las cajas?
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setFormData({...formData, semanas: Math.max(1, formData.semanas - 1)})}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold w-12 text-center">{formData.semanas}</span>
                <button
                  onClick={() => setFormData({...formData, semanas: formData.semanas + 1})}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.semanas === 1 ? 'semana' : 'semanas'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Productos Adicionales */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              ¿Necesitas algo más para tu mudanza? Agrega productos adicionales:
            </p>
            
            {PRODUCTOS_ADICIONALES.map((producto) => {
              const Icon = producto.icon;
              const cantidad = formData[producto.id as keyof FormData] as number;
              
              return (
                <div key={producto.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">{producto.nombre}</p>
                      <p className="text-sm text-gray-500">{producto.descripcion}</p>
                      <p className="text-sm font-bold text-purple-600">${producto.precio} c/u</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateAdditionalProduct(producto.id, 'subtract')}
                      className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{cantidad}</span>
                    <button
                      onClick={() => updateAdditionalProduct(producto.id, 'add')}
                      className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 6: Confirmación */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Resumen de tu Renta</h3>
                <Sparkles className="w-6 h-6" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Paquete seleccionado:</span>
                  <span className="font-bold">
                    {PAQUETES.find(p => p.id === formData.paquete)?.nombre}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duración:</span>
                  <span className="font-bold">{formData.semanas} semanas</span>
                </div>
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toLocaleString()} MXN</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Datos del Cliente
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.nombre} {formData.apellidos}<br />
                  {formData.email}<br />
                  {formData.telefono}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Dirección de Entrega
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.direccion_entrega.calle}<br />
                  {formData.direccion_entrega.colonia}, {formData.direccion_entrega.alcaldia}<br />
                  CP: {formData.direccion_entrega.cp}
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                Al confirmar, recibirás un correo con los detalles y un mensaje por WhatsApp con el link de seguimiento.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Anterior
        </button>
        
        {currentStep < 6 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center"
          >
            Siguiente
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center"
          >
            {submitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                </motion.div>
                Procesando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Confirmar Renta
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default NuevaRenta;
