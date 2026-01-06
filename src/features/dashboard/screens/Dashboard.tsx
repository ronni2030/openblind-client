//diseño que ve el usuario en el dashboard principal
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../shared/components/layout/Layout';

// 2. Subimos 3 niveles para llegar a 'src', luego bajamos a shared/utils
import { speak } from '../../../shared/utils/voiceUtils';
export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // 1. Al entrar, dar la bienvenida y preguntar
    const welcomeAndListen = async () => {
      await speak("Bienvenido a Open Blind. ¿Qué deseas hacer? ¿Navegación, Historial, Tarjeta?");
      startVoiceCommand();
    };
    welcomeAndListen();
  }, []);

  const startVoiceCommand = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = async (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Comando recibido:", command);

      // Lógica de navegación por voz
      if (command.includes("navegación") || command.includes("navegar")) {
        await speak("Abriendo navegación");
        navigate('/new-route');
      }
      else if (command.includes("historial") || command.includes("rutas")) {
        await speak("Abriendo historial");
        navigate('/history-list');
      }
      else if (command.includes("tarjeta") || command.includes("identificación")) {
        await speak("Mostrando tu tarjeta");
        navigate('/view-card');
      }
     
      else {
        await speak("No te entendí. Por favor, di navegación, historial,o, tarjeta");
        // Reintentar si no entendió
        setTimeout(() => startVoiceCommand(), 2000);
      }
    };

    recognition.start();
  };

  return (
    <Layout>
      <header className="drip-header">
        <h1>{isListening ? "🎤 ESCUCHANDO..." : "OPEN BLIND"}</h1>
      </header>

      <div className="dashboard-container">
        {/* Botón Navegación - Principal */}
        <button
          className="big-button primary"
          onClick={() => navigate('/new-route')}
          style={{ minHeight: '190px', marginBottom: '10px' }}
        >
          <span style={{ fontSize: '70px' }}>📍</span>
          <span style={{ fontSize: '24px', letterSpacing: '2px', fontWeight: '800' }}>NAVEGACIÓN</span>
        </button>

        <div className="dashboard-grid">
          {/* Botón Historial */}
          <button
            className="big-button secondary"
            onClick={() => navigate('/history-list')}
            style={{ minHeight: '160px' }}
          >
            <span style={{ fontSize: '45px' }}>📜</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>HISTORIAL</span>
          </button>

          {/* Botón Tarjeta */}
          <button
            className="big-button accent"
            onClick={() => navigate('/view-card')}
            style={{ minHeight: '160px' }}
          >
            <span style={{ fontSize: '45px' }}>🆔</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>MI TARJETA</span>
          </button>
        </div>

        {/* Support Card / Help */}
        <div className="info-card" style={{ marginTop: '15px' }}>
          <p className="opacity-60 text-xs uppercase font-bold tracking-widest mb-2">
            Comandos sugeridos:
          </p>
          <p className="text-accent font-bold text-lg">
            "Navegación", "Ver mi tarjeta", "Historial"
          </p>
        </div>
      </div>

    </Layout>
  );
};