#coding=utf-8

#用户handler类

from handlers.int.base_handler import BaseHandler
import json as JSON
from models.int.user_model import user
from handlers.int.websocket_handler import WebsocketHandler

class UsersHandler(BaseHandler):

    def get(self):
        pass

    def post(self):
        return_data=None
        action = self.get_argument("action", "")

        if action == 'login':
            json = {
              "username": self.get_argument("username", ""),
              "password": self.get_argument("password", ""),
              "ip": self.request.remote_ip
            }

            return_data = user.login(json)

        elif action == 'register':
            json = {
                "username": self.get_argument("username", ""),
                "password": self.get_argument("password", ""),
                "mobile": self.get_argument("mobile", ""),
                "ip": self.request.remote_ip,
                "portrait": self.get_argument("portrait", ""),
            }
            return_data = user.register(json)

        elif action == 'modify':
            json = {
                "token": self.get_argument("user_id", ""),
                "old_password": self.get_argument("old_password", ""),
                "new_password": self.get_argument("new_password", ""),
            }

            return_data = user.modify(json)

        elif action == 'modifyInformation':
            json = {
                "token": self.get_argument("user_id", ""),
                "username": self.get_argument("username", ""),
                "new_mobile": self.get_argument("new_mobile", ""),
                "portrait": self.get_argument("portrait", ""),
            }

            return_data = user.modifyInformation(json)

        else:
            return_data = {"status": -1, "msg": "非法操作", "result": []}

        self.finish(JSON.dumps(return_data))

