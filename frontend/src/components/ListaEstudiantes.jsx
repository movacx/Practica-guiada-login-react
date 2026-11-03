function ListaEstudiantes({ estudiantes = [], onEliminar = () => {} }) {
    return (
        <div className='card shadow-sm'>
            <div className='card-body'>
                <h2 className='h4 mb-3'>
                    Estudiantes registrados ({estudiantes.length})
                </h2>

                {estudiantes.length === 0 ? (
                    <p className='text-muted mb-0'>
                        Todavía no hay estudiantes registrados.
                    </p>
                ) : (
                    <div className='table-responsive'>
                        <table className='table table-striped table-hover align-middle'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Correo</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estudiantes.map((estudiante) => (
                                    <tr key={estudiante.id}>
                                        <td>{estudiante.nombre}</td>
                                        <td>{estudiante.edad}</td>
                                        <td>{estudiante.correo}</td>
                                        <td>
                                            <button
                                                type='button'
                                                className='btn btn-danger btn-sm'
                                                onClick={() => onEliminar(estudiante.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaEstudiantes;