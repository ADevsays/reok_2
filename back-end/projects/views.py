# import cv2
# import time
# import yaml
# from django.db import IntegrityError
# from django.shortcuts import redirect, render, get_object_or_404
# from django.contrib.auth import login, logout, authenticate
# from django.contrib.auth.decorators import c
# from django.http import StreamingHttpResponse, HttpResponse, JsonResponse
# from django.contrib.auth.forms import AuthenticationForm
# from django.views.decorators.csrf import csrf_exempt

# from .scanner import start_detection, stop_detection, save_data
# from .forms import CustomUserCreationForm, CameraConfigForm, CustomUserChangeForm
# from .models import CustomUser, CarPlates, CameraConfig

# detection_thread = None

# caps = []


# def home(request):
#     return render(request, 'home.html')

# @csrf_exempt
# def signup(request):
#     if request.method == 'POST':
#         form = CustomUserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             login(request, user)
#             if user.is_employee:
#                 return redirect('employee')
#             else:
#                 return redirect('user_profile')
#     else:
#         form = CustomUserCreationForm()
#     return render(request, 'signup.html', {'form': form})   

# def signout(request):
#     logout(request)
#     return redirect('home')

# def signin(request):
#     if request.method == 'GET':
#         return render(request, 'signin.html', {
#             'form': AuthenticationForm
#         })
#     else:
#         user = authenticate(request, username=request.POST['username'], 
#                             password=request.POST['password'])
#         if user is None:
#             return render(request, 'signin.html', {
#                 'form': AuthenticationForm,
#                 'error': 'Usuario o Contraseña son incorrectos'
#             })
#         else:
#             login(request, user)
#             if user.is_employee:
#                 return redirect('employee')
#             else:
#                 return redirect('user_profile')

# @login_required
# def employee(request):
#     user = request.user
#     camera_config = CameraConfig.objects.get(user=user)

#     if request.method == 'POST':
#         form = CameraConfigForm(request.POST, instance=camera_config)

#         if form.is_valid():
#             camera_config = form.save(commit=False)
#             camera_config.user = user 
#             camera_config.save()
#     else:
#         form = CameraConfigForm(instance=camera_config)

#     if not user.is_employee:
#         return redirect("/")

#     return render(request, 'employee.html', {'user': user, 'form': form})

# @login_required
# def user_profile(request):
    
#     return render(request, 'user_profile.html', {'user': request.user})

# def video_feed(request):
#     global caps
#     camera_id = int(request.GET.get("camera"))-1
#     if not caps:
#         return HttpResponse(status=503)

#     return StreamingHttpResponse(gen(camera_id), content_type='multipart/x-mixed-replace; boundary=frame')


# @login_required
# @csrf_exempt
# def start_detection_view(request):
#     global caps
#     camera_config = get_object_or_404(CameraConfig, user=request.user)
   
#     if request.method == "POST":
#         camera_urls = [
#                     camera_config.camera1_url,
#                     camera_config.camera2_url,
#                     camera_config.camera3_url,
#                 ]
#         caps = start_detection(camera_urls)
#         print(caps)
#         return HttpResponse("Detection started.")


# @login_required
# def check_off_cam(request):
    
#     try:
#         last_car_plate = CarPlates.objects.latest('id')
#         # Serializar solo el objeto ID del último registro
#         car_plate_data = {
#             "plate_number": last_car_plate.plate_number,
#             "img": last_car_plate.image_path
#         }
        
#         return JsonResponse(car_plate_data)
#     except CarPlates.DoesNotExist:
#         return JsonResponse({'error': 'No car plates found'})


# @login_required
# @csrf_exempt
# def stop_detection_view(request):
#     global caps
#     stop_detection(caps)
#     return HttpResponse("Detection stopped.")

# def update_yaml(camera_urls):
#     config_file = "config.yaml"

#     with open(config_file, "r") as file:
#         config_data = yaml.safe_load(file)

#     for i, url in enumerate(camera_urls, start=1):
#         config_data[f'camera{i}']['url'] = url

#     with open(config_file, 'w') as file:
#         yaml.dump(config_data, file)

# def gen(camera_id):
#     global caps, save_data
#     if not caps:
#         return None
    
#     while caps[camera_id].isOpened():
#         ret, frame = caps[camera_id].read()
#         if not ret:
#             break
        
#         if save_data:
#             break
        

#         _, jpeg = cv2.imencode('.jpg', frame)
#         frame_bytes = jpeg.tobytes()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')

# def detect_plate(request):
#     if request.method == 'POST':
#         plate_number = request.POST.get('plate_number')
#         user = CustomUser.objects.filter(username=plate_number).first()
        
#         if not user:
#             return JsonResponse({'status': 'new', 'message': 'Placa no encontrada. ¿Desea crear un nuevo registro?'})
        
#         car_year = request.POST.get('car_year', 0)
#         brand = request.POST.get('brand', 'Unknown')
#         model = request.POST.get('model', 'Unknown')
#         car_type = request.POST.get('car_type', 'Unknown')
#         image_path = request.POST.get('image_path', '')
        
#         car_plate, created = CarPlates.objects.get_or_create(
#             plate_number=plate_number,
#             user=user,
#             defaults={
#                 'car_year': car_year,
#                 'brand': brand,
#                 'model': model,
#                 'car_type': car_type,
#                 'image_path': image_path
#             }
#         )
        
#         if created:
#             message = 'Nueva placa detectada y guardada.'
#         else:
#             message = 'Placa existente detectada.'
        
#         return JsonResponse({'status': 'success', 'message': message})
    
#     return JsonResponse({'status': 'error', 'message': 'Método no permitido.'})

# @login_required
# def create_user(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         plate_number = request.POST.get('plate_number')
#         car_year = request.POST.get('car_year')
#         brand = request.POST.get('brand')
#         model = request.POST.get('model')
#         car_type = request.POST.get('car_type')

#         user = CustomUser.objects.create_user(username=username, password=password)
#         CarPlates.objects.create(
#             plate_number=plate_number,
#             user=user,
#             car_year=car_year,
#             brand=brand,
#             model=model,
#             car_type=car_type,
#             image_path=f"images/{plate_number}_{int(time.time())}.jpg"
#         )
        
#         return JsonResponse({'status': 'success', 'message': 'Usuario y placa creados correctamente.'})
    
#     return JsonResponse({'status': 'error', 'message': 'Método no permitido.'})

# @login_required
# def camera_config(request):
#     if request.method == 'POST':
#         form = CameraConfigForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('employee')
#     else:
#         form = CameraConfigForm()
#     return render(request, 'camera_config.html', {'form': form})

# @login_required
# def update_user(request):
#     if request.method == 'POST':
#         form = CustomUserChangeForm(request.POST, instance=request.user)
#         if form.is_valid():
#             form.save()
#             return redirect('user_profile')
#     else:
#         form = CustomUserChangeForm(instance=request.user)
#     return render(request, 'update_user.html', {'form': form})