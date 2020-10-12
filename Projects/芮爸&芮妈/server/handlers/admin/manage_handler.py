#coding=utf-8

#管理员handler类

import tornado.web
import json as JSON
from handlers.admin.base_handler import BaseHandler
from models.admin.manage_model import manage

class ManageHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        self.render("admin/manage.html")

    @tornado.web.authenticated
    def post(self):
        return_data=None

        action = self.get_argument("action", "")

        if action == "getUserInfo":
            user = JSON.loads(self.get_secure_cookie('int'))
            data = {
                "id":  int(user["id"]),
            }

            return_data = manage.getOne(data)

        elif action == "getOne":
            data = {
                "id": int(self.get_argument('id', "")),
            }

            return_data = manage.getOne(data)

        elif action == 'modify':
            user=JSON.loads(self.get_secure_cookie('int'))

            data={
                "id": int(user["id"]),
                "password": self.get_argument("password", "")
            }

            return_data = manage.modify(data)

        elif action == "register":

            data = {
                "username": self.get_argument("username", ""),
                "password": self.get_argument("password", ""),
                "role_id": self.get_argument("role_id", ""),
                "is_login": self.get_argument("is_login", "0"),
                "mobile": self.get_argument("mobile", ""),
                "count": 0
            }
            return_data = manage.register(data)

        elif action == "edit":

            data ={
                "id": int(self.get_argument("id", "")),
                "username": self.get_argument("username", ""),
                 "role_id": self.get_argument("role_id", ""),
                "mobile": self.get_argument("mobile", ""),
                 "is_login": self.get_argument("is_login", "0"),
                 "password":self.get_argument("password",""),
            }

            return_data = manage.edit(data)

        elif action == 'remove':

            data=self.get_argument("ids", "")
            return_data = manage.remove(data)

        elif action == 'getList':
            condition = self.get_argument("condition", "")
            page = self.get_argument("page", "1")
            rows = self.get_argument("rows", "")
            date_from = self.get_argument("date_from", "")
            date_to = self.get_argument("date_to", "")

            return_data = manage.getList(condition,page,rows,date_from,date_to)



        # 这是返回json数据的写法

        if return_data != None:
            self.finish(JSON.dumps(return_data))

