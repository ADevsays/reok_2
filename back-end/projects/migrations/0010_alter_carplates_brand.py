# Generated by Django 3.2.25 on 2024-07-05 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0009_alter_customuser_rut'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carplates',
            name='brand',
            field=models.CharField(max_length=55),
        ),
    ]
