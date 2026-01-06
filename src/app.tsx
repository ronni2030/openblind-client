import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. IMPORTACIONES DE IDENTIFICACIÓN
import { CardSetupScreen } from './features/identification-card/screens/CardSetupScreen';
import { CardViewScreen } from './features/identification-card/screens/CardViewScreen';
import { CardUpdateScreen } from './features/identification-card/screens/CardUpdateScreen';

// 2. IMPORTACIONES DE NAVEGACIÓN E HISTORIAL (Las nuevas)
import { DestinationScreen } from './features/navigation/screens/DestinationScreen';
import { HistoryListScreen } from './features/navigation-history/screens/HistoryListScreen';
import { LocationScreen } from './features/navigation/screens/LocationScreen';

// 3. IMPORTACIÓN DEL DASHBOARD (El menú principal)
import { Dashboard } from './features/dashboard/screens/Dashboard';
import { ConnectionTest as ConnectionTestScreen } from './components/ConnectionTest';

function App() {
  return (
    <Router>
      <Routes>
        {/* MENÚ PRINCIPAL: Ahora la raíz es el Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* RUTAS DE IDENTIFICACIÓN */}
        <Route path="/setup-card" element={<CardSetupScreen />} />
        <Route path="/view-card" element={<CardViewScreen />} />
        <Route path="/update-card" element={<CardUpdateScreen />} />

        {/* RUTAS DE NAVEGACIÓN GPS Y VOZ */}
        <Route path="/location" element={<LocationScreen />} />
        <Route path="/new-route" element={<DestinationScreen />} />

        {/* RUTA DE HISTORIAL */}
        <Route path="/history-list" element={<HistoryListScreen />} />

        {/* RUTA DE PRUEBA DE CONEXIÓN */}
        <Route path="/test-connection" element={<ConnectionTestScreen />} />

        {/* REDIRECCIÓN POR DEFECTO: Si la ruta no existe, al inicio */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;