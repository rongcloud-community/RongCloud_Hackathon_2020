#coding=utf-8

#消息handler类

from handlers.int.base_handler import BaseHandler
import json as JSON
from models.int.message_model import message
from handlers.int.websocket_handler import WebsocketHandler

class MessageHandler(BaseHandler):

    def get(self):
        pass

    def post(self):
        return_data=None
        action = self.get_argument("action", "")

        #获取消息列表
        if action == 'get_message_list':
            json = {
              "to_user_token": self.get_argument("to_user_id", ""),
              "from_user_token": self.get_argument("from_user_id", ""),
            }

            return_data = message.get_message_list(json)

        #发送消息后执行
        elif action == 'send_message_callback':
            json = {
                "to_user_token": self.get_argument("to_user_id", ""),
                "from_user_token": self.get_argument("from_user_id", ""),
                "content": self.get_argument("content", ""),
            }
            return_data = message.send_message_callback(json)
        # 获取会话列表
        elif action == 'get_conversation_list':
            json = {
                "token": self.get_argument("user_id", "")
            }

            return_data = message.get_conversation_list(json)
        else:
            return_data = {"status": -1, "msg": "非法操作", "result": []}

        self.finish(JSON.dumps(return_data))

