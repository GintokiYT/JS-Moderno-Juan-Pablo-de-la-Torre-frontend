import { Fragment, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Cita = ({setConsultar}) => {
  const navegacion = useNavigate();
  const { id } = useParams();

  const [cita, setCita] = useState([]);
  
  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const response = await clienteAxios.get('/pacientes/'+id);
        if(response.data === null) return navegacion('/');
        setCita(response.data);
      }
      catch(error) {
        console.log(error.message);
      }
    }
    consultarAPI();
  }, [id, navegacion]);

  if(cita.error === 'Paciente no encontrado') {
    navegacion('/');
  }

  const eliminarCita = async () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, borrarlo!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        // Alerta de eliminado
        Swal.fire(
          '¡Eliminada!',
          'Su archivo ha sido eliminado.',
          'success'
        )
        // Eliminado de la base de datos
        try {
          await clienteAxios.delete('/pacientes/'+id);
            setConsultar(true);
            navegacion('/');
          }
        catch(error) {
          console.log(error.message);
        }
      }
    })
  }

  const { nombre, propietario, telefono, fecha, hora, sintomas } = cita;

  return (  
    <Fragment>
      <h1 className='my-5'>Sobre Cita {nombre}</h1>
      <div className='container mt-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5 d-flex justify-content-center'>
            <Link to={'/'} className='btn btn-success text-uppercase py-2 px-5 font-weight-bold'>Volver</Link>
          </div>
          <div className='col-md-8 mx-auto'>
            <div className='list-group'>
              <div className='p-5 list-group-item list-group-item-action flex-column align-items-center'>
                <div className='d-flex w-100 justify-content-between mb-4'>
                  <h3 className='mb-3 font-weight-bold'>{nombre}</h3>
                  <small className='fecha-alta'>{fecha} - {hora}</small>
                </div>
                <p className='mb-0'>{sintomas}</p>
                <div className='contacto py-3'>
                  <p>Propietario: {propietario}</p>
                  <p>Teléfono: {telefono}</p>
                </div>
                <div className='d-flex'>
                  <button 
                    className='btn btn-danger text-uppercase font-weight-bold py-2 px-5 col'
                    type='button'
                    onClick={eliminarCita}
                  >Eliminar &times;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Cita;