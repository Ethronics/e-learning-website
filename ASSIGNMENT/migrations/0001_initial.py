# Generated by Django 5.1 on 2024-08-11 22:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('CURRICULUM', '0001_initial'),
        ('USER', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='assignmet number, eg, Assignment1', max_length=255)),
                ('description', models.TextField()),
                ('document', models.FileField(blank=True, null=True, upload_to='assignments/')),
                ('deadline', models.DateTimeField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignments', to='CURRICULUM.course')),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignments_creator', to='USER.instructor')),
            ],
            options={
                'ordering': ['-deadline'],
            },
        ),
        migrations.CreateModel(
            name='StudentAssignmentSubmit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.FileField(blank=True, null=True, upload_to='student_assignments/')),
                ('grade', models.IntegerField(blank=True, default=0, null=True)),
                ('submitted_at', models.DateTimeField(auto_now_add=True)),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_assignments', to='ASSIGNMENT.assignment')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignments_submitted', to='USER.student')),
            ],
        ),
    ]
