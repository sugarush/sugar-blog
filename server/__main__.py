import os

import handlers
import resource
import seed

from server import server

server.run(host='0.0.0.0', port=os.getenv('PORT', 8001), workers=1)
