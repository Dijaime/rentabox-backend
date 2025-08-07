import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import brain from '@/brain';
import {
  Package, DollarSign, Truck, Clock, PlusCircle, MoreHorizontal,
  ChevronDown, Filter, Search, Download
} from 'lucide-react';
import { motion } from 'framer-motion';

// Types
interface Renta {
  id: number;
  fecha: string;
  cliente: string;
  email: string;
  paquete: string;
  precio_total: string;
  status: string;
  token: string;
}

interface Metricas {
  rentasMes: number;
  ingresosTotal: number;
  entregasPendientes: number;
  recoleccionesProgramadas: number;
}

// Constants
const ESTADOS_DISPONIBLES = [
  { value: 'pendiente', label: 'Pendiente', color: 'bg-yellow-500' },
  { value: 'confirmada', label: 'Confirmada', color: 'bg-blue-500' },
  { value: 'entregada', label: 'Entregada', color: 'bg-purple-500' },
  { value: 'en_uso', label: 'En Uso', color: 'bg-green-500' },
  { value: 'recolectada', label: 'Recolectada', color: 'bg-indigo-500' },
  { value: 'completada', label: 'Completada', color: 'bg-gray-500' },
  { value: 'cancelada', label: 'Cancelada', color: 'bg-red-500' },
];

// Main Component
function Rentas() {
  const [rentas, setRentas] = useState<Renta[]>([]);
  const [loading, setLoading] = useState(true);
  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const navigate = useNavigate();

  const fetchRentas = async () => {
    setLoading(true);
    try {
      const response = await brain.listar_rentas();
      const data = await response.json();
      setRentas(data.rentas || []);
    } catch (error) {
      console.error('Error fetching rentas:', error);
      toast.error('Error al cargar las rentas. Por favor, revisa tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  const calcularMetricas = (data: Renta[]): Metricas => {
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    return {
      rentasMes: data.filter(r => new Date(r.fecha) >= inicioMes).length,
      ingresosTotal: data.reduce((sum, r) => sum + parseFloat(r.precio_total.replace(/[^0-9.-]+/g,"")), 0),
      entregasPendientes: data.filter(r => r.status === 'confirmada').length,
      recoleccionesProgramadas: data.filter(r => r.status === 'en_uso').length
    };
  };
  
  useEffect(() => {
    fetchRentas();
  }, []);

  useEffect(() => {
    if (rentas.length > 0) {
      setMetricas(calcularMetricas(rentas));
    }
  }, [rentas]);

  const handleStatusChange = async (rentaId: number, nuevoEstado: string) => {
    try {
      const response = await brain.actualizar_status_renta({ rentaId, nuevoStatus: nuevoEstado });
      const data = await response.json();

      if (data.success) {
        toast.success(`Estado actualizado a: ${nuevoEstado}`);
        await fetchRentas(); // Refresh list
      } else {
        toast.error('Error al actualizar el estado.');
      }
    } catch (error) {
      toast.error('No se pudo conectar con el servidor para actualizar.');
    }
  };

  const MetricCard = ({ icon, title, value, color }: any) => (
    <motion.div 
      className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm flex items-center space-x-4`}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rentas</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate('/nueva-renta')}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Nueva Renta
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<Package className="w-6 h-6 text-white" />} title="Rentas del Mes" value={metricas?.rentasMes ?? '...'} color="bg-blue-500" />
        <MetricCard icon={<DollarSign className="w-6 h-6 text-white" />} title="Ingresos Totales" value={metricas ? `$${metricas.ingresosTotal.toLocaleString('en-US')}` : '...'} color="bg-green-500" />
        <MetricCard icon={<Truck className="w-6 h-6 text-white" />} title="Entregas Pendientes" value={metricas?.entregasPendientes ?? '...'} color="bg-orange-500" />
        <MetricCard icon={<Clock className="w-6 h-6 text-white" />} title="Recolecciones" value={metricas?.recoleccionesProgramadas ?? '...'} color="bg-pink-500" />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paquete</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8">Cargando rentas...</td></tr>
            ) : rentas.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8">No hay rentas para mostrar.</td></tr>
            ) : (
              rentas.map((renta) => (
                <tr key={renta.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{renta.cliente}</div>
                    <div className="text-xs text-gray-500">{renta.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{renta.paquete}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-300">{renta.token}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-200">{renta.precio_total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${ESTADOS_DISPONIBLES.find(e => e.value === renta.status)?.color ?? 'bg-gray-400'}`}>
                      {renta.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Dropdown for actions */}
                    <select
                      value={renta.status}
                      onChange={(e) => handleStatusChange(renta.id, e.target.value)}
                      className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {ESTADOS_DISPONIBLES.map(estado => (
                        <option key={estado.value} value={estado.value}>{estado.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rentas;
