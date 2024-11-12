# Generated by Django 5.0.4 on 2024-11-01 06:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flight_name', models.CharField(max_length=100)),
                ('flight_number', models.CharField(max_length=10, unique=True)),
                ('source', models.CharField(max_length=100)),
                ('destination', models.CharField(max_length=100)),
                ('departure', models.DateTimeField()),
                ('arrival', models.DateTimeField()),
                ('duration', models.DurationField()),
                ('status', models.CharField(choices=[('AVAILABLE', 'Available'), ('FULL', 'Full')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('age', models.IntegerField()),
                ('gender', models.CharField(max_length=10)),
                ('phone_number', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticket_id', models.CharField(max_length=20, unique=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('seat_no', models.CharField(max_length=10)),
                ('booked_time', models.DateTimeField(auto_now_add=True)),
                ('travel_class', models.CharField(choices=[('ECONOMY', 'Economy'), ('BUSINESS', 'Business'), ('PREMIUM', 'Premium')], max_length=10)),
                ('flight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flightapp.flight')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flightapp.user')),
            ],
        ),
    ]