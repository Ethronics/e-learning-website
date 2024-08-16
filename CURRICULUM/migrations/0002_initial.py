# Generated by Django 5.1 on 2024-08-14 18:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('CURRICULUM', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='instructor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='course_instructor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='curriculum',
            name='courses',
            field=models.ManyToManyField(to='CURRICULUM.course'),
        ),
        migrations.AddField(
            model_name='enrollment',
            name='curriculum',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CURRICULUM.curriculum'),
        ),
        migrations.AddField(
            model_name='enrollment',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='lab',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CURRICULUM.course'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CURRICULUM.course'),
        ),
        migrations.AddField(
            model_name='result',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CURRICULUM.course'),
        ),
    ]
