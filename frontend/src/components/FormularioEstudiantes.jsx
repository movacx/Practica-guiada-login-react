import { useState } from 'react';

function FormularioEstudiante({ onRegistrar = () => {} }) {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [correo, setCorreo] = useState('');

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        const nombreLimpio = nombre.trim();
        const correoLimpio = correo.trim();
        const edadNumero = Number(edad);

        if (
            !nombreLimpio ||
            !correoLimpio ||
            edad === '' ||
            !Number.isInteger(edadNumero) ||
            edadNumero < 1 ||
            edadNumero > 120
        ) {
            alert('Complete correctamente todos los campos!');
            return;
        }

        const nuevoEstudiante = {
            id: crypto.randomUUID(),
            nombre: nombreLimpio,
            edad: edadNumero,
            correo: correoLimpio,
        };

        onRegistrar(nuevoEstudiante);
        setNombre('');
        setCorreo('');
        setEdad('');
    };

    return (
        <div className='card shadow-sm mb-4'>
            <div className='card-body'>
                <h2 className='h4 mb-3'>Nuevo Estudiante</h2>

                <form onSubmit={manejarEnvio}>
                    <div className='row g-3'>
                        <div className='col-md-6'>
                            <label htmlFor='nombre' className='form-label'>
                                Nombre Completo
                            </label>
                            <input
                                type='text'
                                id='nombre'
                                className='form-control'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className='col-md-3'>
                            <label htmlFor='edad' className='form-label'>
                                Edad
                            </label>
                            <input
                                type='number'
                                id='edad'
                                className='form-control'
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                                min='1'
                                max='120'
                                step='1'
                                required
                            />
                        </div>

                        <div className='col-md-6'>
                            <label htmlFor='correo' className='form-label'>
                                Correo Electrónico
                            </label>
                            <input
                                type='email'
                                id='correo'
                                className='form-control'
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>

                        <div className='col-12'>
                            <button type='submit' className='btn btn-primary'>
                                Registrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioEstudiante;