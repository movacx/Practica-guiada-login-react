import { useEffect, useState } from 'react';
import Encabezado from './components/Encabezado.jsx';
import FormularioEstudiante from './components/FormularioEstudiantes.jsx';
import ListaEstudiantes from './components/ListaEstudiantes.jsx';
import Mensaje from './components/Mensaje.jsx';

import Login from './components/Login.jsx';
import { autenticar } from './services/auth';

function App() {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [errorSesion, setErrorSesion] = useState('');

    // Al recargar, Django indica si la sesión sigue activa.
    useEffect(() => {
        autenticar('sesion')
            .then((datos) => setUsuario(datos.usuario))
            .catch(() => setErrorSesion('No se pudo conectar con Django. Recarga para reintentar.'))
            .finally(() => setCargando(false));
    }, []);

    async function salir() {
        try {
            await autenticar('logout', {});
            setUsuario(null);
            setEstudiantes([]);
            setMensaje('');
        } catch (error) {
            setMensaje(error.message);
        }
    }

    const [estudiantes, setEstudiantes] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const registrarEstudiante = (nuevoEstudiante) => {
        setEstudiantes((anteriores) => [
            ...anteriores,
            nuevoEstudiante,
        ]);
        setMensaje(`Se registró a ${nuevoEstudiante.nombre}`);
    };

    const eliminarEstudiante = (id)=>{
        setEstudiantes((anteriores)=>
            anteriores.filter((estudiantes)=> estudiantes.id !== id)
        );
        setMensaje('Estudiante eliminado correctamente');
    }

    if (cargando) return <p className="container py-5">Cargando...</p>;
    if (errorSesion) return <p className="container py-5" role="alert">{errorSesion}</p>;
    if (!usuario) return <div className="container py-5"><Login onLogin={setUsuario} /></div>;

    return (
        <div className='container py-5'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <span>Hola, {usuario}</span>
                <button className="btn btn-outline-danger" onClick={salir}>Cerrar sesión</button>
            </div>
            <Encabezado />
            <FormularioEstudiante onRegistrar={registrarEstudiante} />
            <Mensaje texto={mensaje} />
            <ListaEstudiantes
                estudiantes={estudiantes}
                onEliminar={eliminarEstudiante}
            />
        </div>
    );
}

export default App;