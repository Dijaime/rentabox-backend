
import React from 'react';
import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react';

function Reportes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reportes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Análisis y métricas de tu negocio
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Centro de Reportes
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Próximamente: Dashboards interactivos, métricas de rendimiento y reportes personalizados
        </p>
      </div>
    </div>
  );
}

export default Reportes;
