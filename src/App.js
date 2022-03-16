import { useState } from 'react';
import './App.css';
import Settings from './Settings';
import SettingsContext from './SettingsContext';
import Timer from './Timer';

function App() {

  const [ settings, setSettings] = useState(false)  //* Estado de la vista de ajustes
  const [ workMinutes, setWorkMinutes ] = useState(25)  //* Estado inicial de los minutos de enfoque
  const [ breakMinutes, setBreakMinutes ] = useState(5)  //* Estado inicial de los minutos de descanso
  
  return (
    <main>
      <SettingsContext.Provider value={{ //* Se pasa un .Provider para pasar el contexto ya definido y exportado, y con un value como atributo podemos empezar a definir nuestros nuevos contextos que seran pasada a cada una de nuestras ramas sin importar que tan profundo esté
        settings,
        setSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
      {settings ? <Settings /> : <Timer />} //* Componentes condicionales para alternar las vistas entre el cronometro y los ajustes
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
