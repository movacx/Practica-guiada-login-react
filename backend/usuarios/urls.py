from django.urls import path
from . import views

urlpatterns = [
    path('sesion/', views.sesion),
    path('login/', views.iniciar_sesion),
    path('logout/', views.cerrar_sesion),
]
