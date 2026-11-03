import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_GET, require_POST


@require_GET
def sesion(request):
    # React consulta la sesión y obtiene el token para enviar formularios.
    usuario = request.user.username if request.user.is_authenticated else None
    return JsonResponse({'usuario': usuario, 'csrfToken': get_token(request)})


@require_POST
def iniciar_sesion(request):
    try:
        datos = json.loads(request.body)
    except (ValueError, UnicodeDecodeError):
        return JsonResponse({'error': 'Datos inválidos.'}, status=400)
    if not isinstance(datos, dict):
        return JsonResponse({'error': 'Datos inválidos.'}, status=400)
    nombre = datos.get('username')
    clave = datos.get('password')
    if not isinstance(nombre, str) or not isinstance(clave, str) or not nombre or not clave:
        return JsonResponse({'error': 'Complete usuario y contraseña.'}, status=400)
    # authenticate verifica la contraseña; login guarda el usuario en la sesión.
    usuario = authenticate(request, username=nombre, password=clave)
    if usuario is None:
        return JsonResponse({'error': 'Usuario o contraseña incorrectos.'}, status=401)
    login(request, usuario)
    return JsonResponse({'usuario': usuario.username, 'csrfToken': get_token(request)})


@require_POST
def cerrar_sesion(request):
    # logout elimina la sesión del servidor.
    logout(request)
    return JsonResponse({'mensaje': 'Sesión cerrada.'})
