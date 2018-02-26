from django.db import models


class Title(models.Model):
    name = models.CharField(max_length=300, db_index=True)
    description = models.CharField(max_length=300, db_index=True)
    picture = models.CharField(max_length=300, default="Primero.png")


class Chapter(models.Model):
    chapter = models.IntegerField(unique=False)
    title = models.ForeignKey('titulos_app.Title')
    description = models.CharField(max_length=400)


class Article(models.Model):
    number = models.CharField(max_length=400)
    body = models.CharField(max_length=4600)
    chapter = models.ForeignKey('titulos_app.Chapter')


class ArticleList(models.Model):
    article = models.ForeignKey('titulos_app.Article')
    item = models.CharField(max_length=1000)


class CrimeType(models.Model):
    crime_name = models.CharField(max_length=400)
    description = models.CharField(max_length=400)
    category = models.ForeignKey('titulos_app.Category', default=1)


class Category(models.Model):
    name = models.CharField(max_length=400, db_index=True)


class CategoryCrime(models.Model):
    crime_type = models.ForeignKey('titulos_app.CrimeType')
    chapter = models.ForeignKey('titulos_app.Chapter', default=1)
