import hashlib, os

from pymongo import ASCENDING

from sugar_odm import MongoDBModel, Field
from sugar_api import JSONAPIMixin


class User(MongoDBModel, JSONAPIMixin):

    __rate__ = ( 10, 'secondly' )

    __acl__ = {
        'self': ['read', 'update', 'delete'],
        'administrator': ['all'],
        'other': ['read'],
        'unauthorized': ['read']
    }

    __get__ = {
        'groups': ['self', 'administrator']
    }

    __set__ = {
        'username': ['self', 'administrator', 'unauthorized'],
        'password': ['self', 'administrator', 'unauthorized'],
        'groups': ['administrator']
    }

    __index__ = [
        {
            'keys': [('username', ASCENDING)],
            'options': {
                'unique': True
            }
        },
        {
            'keys': [('username', ASCENDING), ('password', ASCENDING)]
        }
    ]

    __connection__ = {
        'host': os.getenv('MONGODB_URI', 'mongodb://localhost:27017'),
        'retrywrites': False
    }

    __database__ = {
        'name': os.getenv('MONGODB_DB', 'sugar-blog')
    }

    username = Field(required=True, validated='validate_username')
    password = Field(
        required=True,
        computed='encrypt_password',
        validated='validate_password',
        validated_before_computed=True
    )

    groups = Field(type=list, computed='default_groups', computed_empty=True)

    def on_render(self, data, token):
        del data['attributes']['password']

    def default_groups(self):
        return [ 'user' ]

    def encrypt_password(self):
        if self.password == 'hashed-':
            raise Exception('Invalid password.')

        if self.password.startswith('hashed-'):
            return self.password

        return f'hashed-{hashlib.sha256(self.password.encode()).hexdigest()}'

    def validate_username(self, value):
        if len(value) < 8:
            raise Exception('Username cannot be less than eight characters.')

    def validate_password(self, value):
        if len(value) < 8:
            raise Exception('Password cannot be less than eight characters.')
