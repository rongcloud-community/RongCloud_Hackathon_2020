#coding=utf-8

#用户handler类

import tornado.web
import json as JSON
from handlers.admin.base_handler import BaseHandler
from models.admin.message_model import message

class MessageHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        pass

    @tornado.web.authenticated
    def post(self):
        return_data=None

        action = self.get_argument("action", "")

        #发送信息
        if action == "send_message":

            data = {
                'to_user_token': self.get_argument('to_user_token', ''),
                'content': self.get_argument('content', '')
            }

            return_data = message.send_message(data)

        #获取信息列表
        elif action == 'get_message_list':
            data = {
                "user_token": self.get_argument('user_token', ''),
            }
            return_data = message.get_message_list(data)

        elif action == 'get_user_log':
            condition = self.get_argument("token", "")
            page = self.get_argument("page", "1")
            rows = self.get_argument("rows", "")
            date_from = self.get_argument("date_from", "")
            date_to = self.get_argument("date_to", "")

            return_data = message.get_user_log(condition, page, rows, date_from, date_to)


        # 这是返回json数据的写法

        if return_data != None:
            self.finish(JSON.dumps(return_data))

