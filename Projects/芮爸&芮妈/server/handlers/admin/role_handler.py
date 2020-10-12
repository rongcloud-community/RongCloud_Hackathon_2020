#coding=utf-8

#权限handler类

import tornado.web,time
import json as JSON
from handlers.admin.base_handler import BaseHandler
from models.admin.role_model import role


class RoleHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):

        self.render("admin/role.html")

    @tornado.web.authenticated
    def post(self):
        return_data=None

        action=self.get_argument("action","")

        if action == "getRole":

            return_data = role.getRole()

        elif action == 'getList':

            condition = self.get_argument("condition", "")
            page = self.get_argument("page", "1")
            rows = self.get_argument("rows", "")
            date_from = self.get_argument("date_from", "")
            date_to = self.get_argument("date_to", "")

            return_data = role.getList(condition, page, rows, date_from, date_to)
        elif action == "getOne":
            data = {
                "id": int(self.get_argument('id', "")),
            }

            return_data = role.getOne(data)
        elif action == "register":

            data = {
                "role_name": self.get_argument("role_name", ""),
                "nav_ids": self.get_argument("nav_ids", "")
            }

            return_data = role.register(data)

        elif action == "edit":

            data={
                "id":int(self.get_argument("id", "")),
                "role_name": self.get_argument("role_name", ""),
                "nav_ids": self.get_argument("nav_ids", ""),
            }

            return_data = role.edit(data)

        elif action == 'remove':

            data = self.get_argument("ids", "")
            return_data = role.remove(data)

        # 这是返回json数据的写法
        self.finish(JSON.dumps(return_data))

