#coding=utf-8

#这个是用于对接webscoket的
from handlers.int.base_handler import BaseWebSocket
import json as JSON
import requests


#from models.int.device_model import device
#from models.int.phone_model import phone

class WebsocketHandler(BaseWebSocket):

    connect_users = set()

    def open(self):
        # 打开连接时将用户保存到connect_users中
        self.connect_users.add(self)

    def on_message(self, message):

        pass

    def on_close(self):
        print("WebSocket closed")
        # 关闭连接时将用户从connect_users中移除
        #device.DeviceDisconnect({"token": self.token})
        #phone.PhoneDisconnect({"token": self.token})
        self.connect_users.remove(self)

    def check_origin(self, origin):
        # 此处用于跨域访问
        return True


    @classmethod
    def send_connect_users(cls, message):
        # 使用@classmethod可以使类方法在调用的时候不用进行实例化
        # 给所有用户推送消息（此处可以根据需要，修改为给指定用户进行推送消息）
        for user in cls.connect_users:
            user.write_message(message)