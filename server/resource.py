from server import server

from authentication import Authentication

from models.user import User
from models.post import Post

server.static('/', './application/dist/index.html')
server.static('/', './application/dist')

server.blueprint(Authentication.resource(url_prefix='/v1'))

server.blueprint(User.resource(url_prefix='/v1'))
server.blueprint(Post.resource(url_prefix='/v1'))
