# Generated by Django 5.0.6 on 2024-09-09 03:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('laundry', '0002_remove_bills_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='billdetail',
            name='price',
        ),
    ]
