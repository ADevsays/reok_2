import cv2
import threading
import re
import pytesseract
import time
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import CarPlates


def validate_plate(plate_number):
    patterns = [
        re.compile(r'^[A-Z]{2}[A-Z]{2}\d{2}$'),  
        re.compile(r'^[A-Z]{2}\d{2}[A-Z]{2}$'),  
        re.compile(r'^[A-Z]{2}\d{4}$'),          
        re.compile(r'^[A-Z]{4}\d{2}$'),          
    ]

    plate_number = plate_number.replace(" ", "").upper()

    for pattern in patterns:
        if pattern.match(plate_number):
            return True

    return False

# save_data = {}
# is_detecting = False
# cap = []
# User = get_user_model()
# active_camera_index = None

# def start_detection(camera_urls):
#     global is_detecting, cap, active_camera_index
#     if not is_detecting:
#         is_detecting = True
#         cap = [cv2.VideoCapture(int(url)) 
#                 if url.isdigit() 
#                 else cv2.VideoCapture(url)
#                 for url in camera_urls 
#                 if url is not None]
#         threads = [threading.Thread(target=detect, args=(c, i)) for i, c in enumerate(cap)]
#         active_camera_index = 0
#         for t in threads:
#             t.start()
#         return cap

# def stop_detection(cap):
#     global is_detecting
#     is_detecting = False
#     if cap:
#         for c in cap:
#             if c.isOpened():
#                 c.release()
#         cap = []

# def clean_plate_number(plate_number):
#     plate_number = re.sub(r'\W+', '', plate_number).upper()
#     return plate_number


# def save_plate(plate_number, frame):
#     global save_data
#     if not save_data:
#         date_time = timezone.now()
#         user, created = User.objects.get_or_create(username=plate_number)
#         image_path = f"media/car_images/{plate_number}{int(time.time())}.jpg"
#         cv2.imwrite(image_path, frame)
#         CarPlates.objects.get_or_create(
#             plate_number=plate_number,
#             user=user,
#             defaults={
#                 'car_year': 0,
#                 'brand': "Test Brand",
#                 'model': "Test Model",
#                 'car_type': "Test Type",
#                 'image_path': image_path,
#                 'date_time': date_time
#             }
#         )
#         save_data = {
#             "plate": plate_number,
#             "img": "image_path"
#         }

#         print("guardado", plate_number)
    

# def detect(current_cap, camera_id):
#     global is_detecting, active_camera_index, cap

#     while is_detecting and current_cap.isOpened():
#         ret, frame = current_cap.read()
#         if not ret:
#             break

#         if camera_id != active_camera_index:
#             time.sleep(0.5)
#             continue

#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
#         custom_config = r'-c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 --oem 3 --psm 11'
#         plate_number_alphanumeric = pytesseract.image_to_string(binary, config=custom_config)
#         plate_number_clean = clean_plate_number(plate_number_alphanumeric)

#         if validate_plate(plate_number_clean):
#             save_plate(plate_number_clean, frame)

#         active_camera_index = (active_camera_index + 1) % len(cap)
#         time.sleep(1)

#     current_cap.release()
