# Generated by Django 3.2.25 on 2024-07-19 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0014_order_timer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='rut',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
