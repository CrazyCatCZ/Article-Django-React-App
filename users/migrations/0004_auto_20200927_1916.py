# Generated by Django 3.0.8 on 2020-09-27 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200927_1910'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-date']},
        ),
    ]
