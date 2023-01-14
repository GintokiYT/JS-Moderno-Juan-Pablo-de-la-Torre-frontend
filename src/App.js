import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import clienteAxios from './config/axios';

// Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

const App = () => {

  // State de la aplicacion
  const [citas, setCitas] = useState([]);
  const [consultar, setConsultar] = useState(true);

  useEffect(() => {
    if(consultar) {
      const consultarAPI = async () => {
        try {
          const response = await clienteAxios.get('/pacientes');
          setCitas(response.data);
          setConsultar(false);
        }
        catch(error) {
          console.log(error.message);
        }
      }
      consultarAPI();
    }
  }, [consultar]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          exact path='/' 
          element={<Pacientes citas={citas}/>}
        />
        <Route 
          exact path='/nueva' 
          element={<NuevaCita setConsultar={setConsultar}/>}
        />
        <Route 
          exact path='/cita/:id' 
          element={<Cita setConsultar={setConsultar}/>}
        />
        <Route
          exact path='*'
          element={<Pacientes citas={citas}/>}
        />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
