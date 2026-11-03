import { useState } from 'react';
import { autenticar } from '../services/auth';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);

    async function ingresar(evento) {
        evento.preventDefault();
        setError('');
        setEnviando(true);
        try {
            const datos = await autenticar('login', { username, password });
            onLogin(datos.usuario);
        } catch (error) {
            setError(error.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div className="card mx-auto" style={{ maxWidth: 400 }}>
            <div className="card-body">
                <h1 className="h4">Iniciar sesión</h1>
                <form onSubmit={ingresar}>
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input id="usuario" className="form-control mb-3" autoComplete="username"
                        value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="clave" className="form-label">Contraseña</label>
                    <input id="clave" type="password" className="form-control mb-3" autoComplete="current-password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error && <p className="text-danger" role="alert">{error}</p>}
                    <button className="btn btn-primary" disabled={enviando}>
                        {enviando ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
