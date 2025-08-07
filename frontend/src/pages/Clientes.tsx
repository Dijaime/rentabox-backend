
import React from 'react';
import { Users, UserPlus, Search, Filter } from 'lucide-react';

function Clientes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Clientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tu base de clientes de RentaBox Pro
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Módulo de Clientes
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Próximamente: Gestión completa de clientes, historial de rentas y comunicación directa
        </p>
      </div>
    </div>
  );
}

export default Clientes;
