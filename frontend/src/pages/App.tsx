

import { Toaster } from "@/components/ui/sonner"
import Dashboard from "./Dashboard";
import Rentas from "./Rentas";
import Clientes from "./Clientes";
import Reportes from "./Reportes";
import Configuracion from "./Configuracion";
import NuevaRenta from "./NuevaRenta";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  
  return (
    <div>
      <Layout 
        currentView={currentView} 
        onNavigate={setCurrentView}
        user={{ email: 'admin@rentabox.pro', full_name: 'Administrador' }}
      >
        {/* Render the active view based on the state */}
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "rentas" && <Rentas />}
        {currentView === "clientes" && <Clientes />}
        {currentView === "reportes" && <Reportes />}
        {currentView === "configuracion" && <Configuracion />}
        {currentView === "nueva-renta" && <NuevaRenta />}
      </Layout>
      <Toaster />
    </div>
  );
}

export default App;
