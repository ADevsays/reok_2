from django import forms # type: ignore
from django.contrib.auth.forms import UserCreationForm, UserChangeForm # type: ignore
from .models import CustomUser, CarPlates, CameraConfig # type: ignore

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'rut')

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'rut')

class CameraConfigForm(forms.ModelForm):
    class Meta:
        model = CameraConfig
        fields = ('camera1_url', 'camera2_url', 'camera3_url')
        labels= {
            'camera1_url': "URL de la Cámara 1", 
            'camera2_url': "URL de la Cámara 2", 
            'camera3_url': "URL de la Cámara 3"
        }
        widgets = {
            'camera1_url': forms.TextInput(attrs={'placeholder': 'http://192.168.1.100:8080'}),
            'camera2_url': forms.TextInput(attrs={'placeholder': 'http://192.168.1.100:8080'}),
            'camera3_url': forms.TextInput(attrs={'placeholder': 'http://192.168.1.100:8080'}),
        }