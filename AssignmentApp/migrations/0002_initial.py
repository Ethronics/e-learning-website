# Generated by Django 5.1 on 2024-08-17 11:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('AssignmentApp', '0001_initial'),
        ('CurriculumApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignments_for_course', to='CurriculumApp.course'),
        ),
    ]
