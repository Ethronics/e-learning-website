# Generated by Django 5.1 on 2024-08-17 11:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('CurriculumApp', '0002_initial'),
        ('QuizApp', '0001_initial'),
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='instructor',
            field=models.ForeignKey(limit_choices_to={'role': 'INSTRUCTOR'}, on_delete=django.db.models.deletion.PROTECT, related_name='quiz_creator', to='User.user'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='lesson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CurriculumApp.lesson'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='Question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='QuizApp.quiz_question'),
        ),
        migrations.AddField(
            model_name='quizresult',
            name='Quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='QuizApp.quiz'),
        ),
    ]
