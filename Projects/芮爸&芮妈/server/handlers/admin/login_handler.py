#coding=utf-8
#用户登录试图

import tornado.web
import json as JSON
from handlers.admin.base_handler import BaseHandler
from models.admin.manage_model import manage


class LoginHandler(BaseHandler):

    def get(self):
        self.render("admin/login.html", next=self.get_argument("next"))

    def post(self):

        return_data=None

        action = self.get_argument("action", "")

        if action == "login":

            data = {
                  "username": self.get_argument("username", ""),
                  "password": self.get_argument("password", ""),
                  "ip": self.request.remote_ip
                }

            return_data = manage.login(data)

            if return_data["status"] > 0:
                self.set_secure_cookie('int', JSON.dumps(return_data["result"]))

        elif action == "logout":
            self.clear_cookie('int')
            return_data = {"status": 1, "msg": "success", "result": []}
        else:
            return_data = {"status": -1, "msg": "非法操作", "result": []}


        # 这是返回json数据的写法
        self.finish(JSON.dumps(return_data))


