from pymongo import ASCENDING

from sugar_odm import MongoDBModel, Field
from sugar_api import JSONAPIMixin


class Post(MongoDBModel, JSONAPIMixin):

    __rate__ = ( 10, 'secondly' )

    __acl__ = {
        'administrator': [ 'all' ],
        '$owner': [ 'read', 'update', 'delete' ],
        'user': [ 'read_all', 'read', 'create' ],
        'unauthorized': [ 'read_all', 'read' ]
    }

    __index__ = [
        {
            'keys': [('created', ASCENDING)]
        },
        {
            'keys': [('slug', ASCENDING)],
            'options': {
                'unique': True
            }
        }
    ]

    __database__ = {
        'name': 'sugar-blog'
    }


    created = Field(type=int, required=True)
    owner = Field(required=True)
    slug = Field(required=True)
    title = Field(required=True)
    content = Field(required=True)
