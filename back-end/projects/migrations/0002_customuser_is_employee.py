# Generated by Django 5.0.6 on 2024-07-03 04:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_employee',
            field=models.BooleanField(default=False),
        ),
    ]
