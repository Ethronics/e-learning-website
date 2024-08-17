# Generated by Django 5.1 on 2024-08-17 11:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('CurriculumApp', '0002_initial'),
        ('ExamApp', '0001_initial'),
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='examattempt',
            name='student',
            field=models.ForeignKey(limit_choices_to={'role': 'STUDENT'}, on_delete=django.db.models.deletion.CASCADE, to='User.user'),
        ),
        migrations.AddField(
            model_name='exam',
            name='duration',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ExamApp.examduration'),
        ),
        migrations.AddField(
            model_name='examresult',
            name='user',
            field=models.ForeignKey(limit_choices_to={'role': 'STUDENT'}, on_delete=django.db.models.deletion.CASCADE, related_name='StudentExamResult', to='User.user'),
        ),
        migrations.AddField(
            model_name='question',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CurriculumApp.course'),
        ),
        migrations.AddField(
            model_name='exam',
            name='Question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ExamApp.question'),
        ),
        migrations.AlterUniqueTogether(
            name='examattempt',
            unique_together={('student', 'exam', 'attempt_number')},
        ),
    ]
