#coding=utf-8

#菜单handler类

import tornado.web,time
import json as JSON
from handlers.admin.base_handler import BaseHandler
from models.admin.nav_model import nav



class NavHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):

        self.render("admin/nav.html")

    @tornado.web.authenticated
    def post(self):
        return_data=None

        action=self.get_argument("action", "")

        if action == "getNav":

            user = JSON.loads(self.get_secure_cookie('int'))
            data = {
                "manage_id": user["id"],
                "nav_id": self.get_argument("id", "0")
            }
            return_data = nav.getNav(data)

        elif action == "getRoleNav":

            data = {

                "nav_id": self.get_argument("id", "0")
            }
            return_data = nav.getRoleNav(data)

        elif action == "register":

            data = {
                "text": self.get_argument("text", ""),
                "pid": 0,
                "url": "",
                "state": "closed",
                "iconCls": self.get_argument("iconCls", ""),
            }

            return_data = nav.register(data)

        elif action == "getOne":
            data = {
                "id": int(self.get_argument('id', "")),
            }
            return_data = nav.getOne(data)

        elif action == "edit":

            data = {
                "id": int(self.get_argument("id", "")),
                "text": self.get_argument("text", ""),
                "iconCls": self.get_argument("iconCls", ""),
                "pid": 0,
                "url": "",

            }

            return_data = nav.edit(data)

        elif action == 'remove':
            data = self.get_argument("ids", "")
            return_data = nav.remove(data)

        elif action == 'getList':

            condition = self.get_argument("condition", "")
            page = self.get_argument("page", "1")
            rows = self.get_argument("rows", "")
            date_from = self.get_argument("date_from", "")
            date_to = self.get_argument("date_to", "")

            return_data = nav.getList(condition, page, rows, date_from, date_to)

        elif action == 'getPidList':

            condition = self.get_argument("condition", "")
            pid = int(self.get_argument("pid","0"))
            page = self.get_argument("page", "1")
            rows = self.get_argument("rows", "")
            date_from = self.get_argument("date_from", "")
            date_to = self.get_argument("date_to", "")

            return_data = nav.getList(condition, page, rows, date_from, date_to, pid)

        elif action == 'pid_register':

            data = {
                "text": self.get_argument("text", ""),
                "pid": int(self.get_argument("pid", "")),
                "url": self.get_argument("url", ""),
                "state": "open",
                "iconCls": self.get_argument("iconCls", ""),
            }

            return_data = nav.register(data)

        elif action == "pid_edit":

            data = {
                "id": int(self.get_argument("id", "")),
                "text": self.get_argument("text", ""),
                "iconCls": self.get_argument("iconCls", ""),
                "url": self.get_argument("url", ""),
                "pid": int(self.get_argument("pid", "")),
            }

            return_data = nav.edit(data)
        # 这是返回json数据的写法
        self.finish(JSON.dumps(return_data))

