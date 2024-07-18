from django.http import JsonResponse # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.contrib.auth import login, authenticate, logout # type: ignore
from .forms import CustomUserCreationForm  # Asegúrate de importar tu formulario personalizado
import json

@csrf_exempt  
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = CustomUserCreationForm(data)
        
        if form.is_valid():
            user = form.save()
            login(request, user)
            
            response_data = {
                'user_id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'rut': user.rut,
                'is_employee': False
            }
            
            return JsonResponse(response_data)
        
        errors = form.errors.as_json()
        return JsonResponse({'error': errors}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            response_data = {
                'user_id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'rut': user.rut,
                'is_employee': user.is_employee
            }
            return JsonResponse(response_data)
        
        return JsonResponse({'error': 'Credenciales inválidas'}, status=401)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)
    
@csrf_exempt
def logout_user(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Se cerró la sesión correctamente!'}, status=200)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
