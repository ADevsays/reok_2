from django.http import JsonResponse # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.contrib.auth import login, authenticate, logout # type: ignore
from .forms import CustomUserCreationForm  # Asegúrate de importar tu formulario personalizado
import json
import numpy as np
import cv2 #type: ignore
import threading
import base64
import pytesseract #type:ignore
import re
from .scanner import validate_plate
from django.shortcuts import get_object_or_404 #type: ignore
from .models import CustomUser, CarPlates, WashStatus

frame_queue = []
is_detecting = False

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


@csrf_exempt
def plate_detector(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            img_data = data['frame']
            img_data = img_data.split(',')[1]  
            img_bytes = base64.b64decode(img_data)

            image = np.frombuffer(img_bytes, dtype=np.uint8)
            image = cv2.imdecode(image, cv2.IMREAD_COLOR)

            if image is not None:
                gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
                custom_config = r'-c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 --oem 3 --psm 11'
                plate_number_alphanumeric = pytesseract.image_to_string(binary, config=custom_config)
                plate_number_clean = re.sub(r'\W+', '', plate_number_alphanumeric).upper()

                success = validate_plate(plate_number_clean)

                return JsonResponse({"status": success, "plate": plate_number_clean})

            return JsonResponse({"error": "Invalid image"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def push_plate_user(request):
    try:
        data = json.loads(request.body)
        rut = data.get('rut')
        plate_number = data.get('plate_number')
        status = data.get('state')  
    except (KeyError, json.JSONDecodeError):
        return JsonResponse({'error': 'Faltan parámetros o error de JSON'}, status=400)

    valid_statuses = ['ENTERED', 'WASHING', 'FINISHED', 'EXIT']
    if status not in valid_statuses:
        return JsonResponse({'error': 'Estado no válido'}, status=400)
    
    user = get_object_or_404(CustomUser, rut=rut)
    car_plate, created = CarPlates.objects.get_or_create(
        user=user,
        defaults={'plate_number': plate_number}
    )

    if not created:
        car_plate.plate_number = plate_number
        car_plate.save()
        wash_status, created = WashStatus.objects.get_or_create(
        car_plate=car_plate,
        defaults={'status': status}
    )
    wash_status, created = WashStatus.objects.get_or_create(
        car_plate=car_plate,
        defaults={'status': status}
    )

    if not created:
        wash_status.status = status
        wash_status.save()

    reponse_data = {
        'username': user.username,
        'rut': user.rut,
        'plate': car_plate.plate_number,
        'status': wash_status.status
    }

    return JsonResponse(reponse_data)

@csrf_exempt
def get_user_by_rut(request, rut):
    if request.method != 'GET':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    user = get_object_or_404(CustomUser, rut=rut)
    car_plate = CarPlates.objects.filter(user=user).first()

    if not car_plate:
        return JsonResponse({"status": "NO_CLIENT"})

    wash_status = WashStatus.objects.filter(car_plate=car_plate).first()
    if not wash_status:
        return JsonResponse({'error': 'No se encontró un estado de lavado asociado a la placa'}, status=404)
    
    response_data = {
        'plate_number': car_plate.plate_number,
        'status': wash_status.status
    }

    return JsonResponse(response_data)

@csrf_exempt

def update_status(request):
    try:
        data = json.loads(request.body)
        status = data.get('status')
        rut = data.get('rut')
    except (KeyError, json.JSONDecodeError):
        return JsonResponse({'error': 'Faltan parámetros o error de JSON'}, status=400)
    
    user = get_object_or_404(CustomUser, rut=rut)
    
    car_plate = CarPlates.objects.filter(user=user).first()
    if not car_plate:
        return JsonResponse({'error': 'No se encontró una placa asociada al usuario'}, status=404)
    
    wash_status, created = WashStatus.objects.get_or_create(
        car_plate=car_plate,
        defaults={'status': status}
    )

    if not created and wash_status.status != status:
        wash_status.status = status
        wash_status.save()

    return JsonResponse({"success": "Status cambiado"})