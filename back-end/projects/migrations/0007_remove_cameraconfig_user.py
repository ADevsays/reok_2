# Generated by Django 5.0.6 on 2024-07-03 18:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_alter_cameraconfig_camera1_url_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cameraconfig',
            name='user',
        ),
    ]