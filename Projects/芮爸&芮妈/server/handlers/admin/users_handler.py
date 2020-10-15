#coding=utf-8

#用户handler类

import tornado.web
import json as JSON
from handlers.admin.base_handler import BaseHandler
from models.admin.users_model import users

class UsersHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        self.render("admin/users.html")

    @tornado.web.authenticated
    def post(self):
        return_data=None

        action = self.get_argument("action", "")

        if action == "getOne":

            data = {
                "token": self.get_argument('token', ""),
            }

            return_data = users.getOne(data)

        elif action == 'register':
            data = {
                "username": self.get_argument('username', ''),
                "password": self.get_argument('password', ''),
                "mobile": self.get_argument('mobile', ''),
                "portrait": self.get_argument("portrait", ""),
                "state": int(self.get_argument('state', '0')),
            }
            return_data = users.register(data)

        elif action == "edit":

            data = {
                "token": self.get_argument("token", ""),
                "state": int(self.get_argument("state", "0")),
                "password": self.get_argument("password", ""),
                "mobile": self.get_argument("mobile", ""),
                "username": self.get_argument("username", ""),
                "portrait": self.get_argument("portrait", "")
            }

            return_data = users.edit(data)

        elif action == 'getList':

            condition = self.get_argument("condition", "")
            page = self.get_argument("page", "1")
            rows = self.get_argument("rows", "")
            date_from = self.get_argument("date_from", "")
            date_to = self.get_argument("date_to", "")

            return_data = users.getList(condition,page,rows,date_from,date_to)

        elif action == 'remove':
            data = {
                "token": self.get_argument('token', '')
            }

            return_data = users.remove(data)



        # 这是返回json数据的写法

        if return_data != None:
            self.finish(JSON.dumps(return_data))

