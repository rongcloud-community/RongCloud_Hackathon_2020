#coding=utf-8
import tornado.escape
from pycket.session import SessionMixin
import tornado.websocket
import tornado.web



class BaseWebSocket(tornado.websocket.WebSocketHandler, SessionMixin):
    def get_current_user(self):
        pass
#         # if self.session.get("username"):
#         #     return user_model.by_name(self.session.get("username"))
#         # else:
#         #     return None
#           pass


class BaseHandler(tornado.web.RequestHandler, SessionMixin):
    def initialize(self):
        #self.db=dbSession
        pass

    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', 'x-requested-with')
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')



