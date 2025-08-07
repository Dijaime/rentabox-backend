
import React from 'react';
import { Settings, SlidersHorizontal, Bell } from 'lucide-react';

function Configuracion() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Configuración
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Ajusta las preferencias de tu sistema RentaBox Pro
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Centro de Configuración
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Próximamente: Ajustes de cuenta, precios, notificaciones y más
        </p>
      </div>
    </div>
  );
}

export default Configuracion;
