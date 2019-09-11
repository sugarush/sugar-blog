from sugar_odm import MongoDB

from server import server

from models.user import User


@server.listener('before_server_start')
async def before_server_start(app, loop):
    user = await User.find_one({ 'username': 'administrator' })

    if not user:
        await User.add({
            'username': 'administrator',
            'password': 'administrator',
            'groups': [ 'administrator' ]
        })
