let csrfToken = '';

// Vite envía las peticiones /api al servidor Django.
export async function autenticar(ruta, datos) {
    const respuesta = await fetch(`/api/${ruta}/`, {
        method: datos ? 'POST' : 'GET',
        credentials: 'same-origin',
        headers: datos ? {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        } : {},
        body: datos ? JSON.stringify(datos) : undefined,
    });
    const resultado = await respuesta.json();
    if (!respuesta.ok) throw new Error(resultado.error || 'No se pudo completar la solicitud.');
    if (resultado.csrfToken) csrfToken = resultado.csrfToken;
    return resultado;
}
