import graphene
from graphene import relay, ObjectType, AbstractType
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Title, Chapter, Article, ArticleList, CategoryCrime, Category, CrimeType


class TitleType(DjangoObjectType):
    class Meta:
        model = Title


class ChapterType(DjangoObjectType):
    class Meta:
        model = Chapter


class TitleNode(DjangoObjectType):
    class Meta:
        model = Title
        filter_fields = ['name', 'description']
        interfaces = (relay.Node, )


class ArticleListNode(DjangoObjectType):
    class Meta:
        model = ArticleList
        filter_fields = ['article', 'item']
        interfaces = (relay.Node, )


class ChapterNode(DjangoObjectType):
    class Meta:
        model = Chapter
        filter_fields = ['chapter', 'title']
        interfaces = (relay.Node, )


class ArticleNode(DjangoObjectType):
    class Meta:
        model = Article
        filter_fields = ['number', 'body', 'chapter']
        interfaces = (relay.Node, )


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = ['name']
        interfaces = (relay.Node, )


class CrimeTypeNode(DjangoObjectType):
    class Meta:
        model = CrimeType
        filter_fields = ['crime_name', 'description', 'category']
        interfaces = (relay.Node, )


class CategoryCrimeNode(DjangoObjectType):
    class Meta:
        model = CategoryCrime
        filter_fields = ['crime_type', 'chapter']
        interfaces = (relay.Node, )


class test(ObjectType):
    value = graphene.String()

    def resolve_value(self, info):
        return value


class Query(object):

    title2 = graphene.Field(test, id=graphene.Int(), name=graphene.String())
    all_tit = graphene.List(TitleType)

    def resolve_title2(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if name is not None:
            return name
            # Title.objects.get(name=name)
        if id is not None:
            return Title.objects.get(pk=id)
        return None

    def resolve_all_tit(self, info, **kwargs):
        return Title.objects.all()

    all_chap = graphene.List(ChapterType)

    def resolve_all_chap(self, info, **kwargs):
        return Chapter.objects.all()

    title = relay.Node.Field(TitleNode)
    all_titles = DjangoFilterConnectionField(TitleNode)

    chapter = relay.Node.Field(ChapterNode)
    all_Chapters = DjangoFilterConnectionField(ChapterNode)

    articleList = relay.Node.Field(ArticleListNode)
    all_Articles_List = DjangoFilterConnectionField(ArticleListNode)

    article = relay.Node.Field(ArticleNode)
    all_Articles = DjangoFilterConnectionField(ArticleNode)

    category = relay.Node.Field(CategoryNode)
    all_Category = DjangoFilterConnectionField(CategoryNode)

    crime_type = relay.Node.Field(CrimeTypeNode)
    all_Crime_Type = DjangoFilterConnectionField(CrimeTypeNode)

    category_crime = relay.Node.Field(CategoryCrimeNode)
    all_Category_Crime = DjangoFilterConnectionField(CategoryCrimeNode)
