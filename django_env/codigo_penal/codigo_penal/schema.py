import graphene

from titulos_app.schema import Query


class Query(Query,graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)
