# Generated by Django 5.1.5 on 2025-02-23 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatportfolio', '0002_remove_botresponse_message_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_message', models.CharField(max_length=5000)),
                ('response', models.CharField(max_length=5000)),
            ],
        ),
        migrations.DeleteModel(
            name='Botresponse',
        ),
        migrations.DeleteModel(
            name='Usermessage',
        ),
    ]
