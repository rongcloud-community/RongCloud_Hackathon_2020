# -*- coding:utf-8 -*-

#admin下 这是主页
import tornado.web
from handlers.admin.base_handler import BaseHandler


class IndexHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render("admin/index.html")
