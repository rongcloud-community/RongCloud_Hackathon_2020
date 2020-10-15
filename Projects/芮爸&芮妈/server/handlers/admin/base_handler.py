# -*- coding:utf-8 -*-

#admin 的base，所有admin下的handler都继承

import tornado.escape
from pycket.session import SessionMixin
import tornado.websocket
import tornado.web
import json as JSON


class BaseWebSocket(tornado.websocket.WebSocketHandler, SessionMixin):
    def get_current_user(self):  #重写get_current_user方法
        #return self.session.get('user_info',None)
        return self.get_argument('int', '')


class BaseHandler(tornado.web.RequestHandler,SessionMixin):

    def get_current_user(self):    #重写get_current_user方法 使用cookie来验证
        return self.get_secure_cookie("int")


class DataEncoder(JSON.JSONEncoder):
    def default(self,obj):
        if isinstance(obj, bytes):
            return str(obj, encoding='utf-8')
        return JSON.JSONEncoder.default(self, obj)