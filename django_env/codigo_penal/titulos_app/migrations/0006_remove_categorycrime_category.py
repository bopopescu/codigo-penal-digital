# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-25 23:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('titulos_app', '0005_auto_20171125_2302'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categorycrime',
            name='category',
        ),
    ]