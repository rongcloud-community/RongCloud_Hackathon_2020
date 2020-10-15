#coding=utf-8

from libs.db.mongodb import db
from datetime import datetime
from libs.unit.tools import Tools
from models.int.user_model import user as UserModel
from libs.rongcloud.RongCloudMessage import rc_message
import time

#消息实体类

class Message(object):

    def __init__(self):
        self.collection = db['UserLog']

    #获取信息列表
    def get_message_list(self, json):

       if UserModel.checkin(json["from_user_token"]):

           filter = {"$or": [
               {"$and": [{"to_user_token": json["to_user_token"]}, {"from_user_token": json['from_user_token']}]},
               {"$and": [{"to_user_token": json['from_user_token']}, {"from_user_token": json["to_user_token"]}]}
           ]}
           result = list(self.collection.find(filter))

           if len(result):
               for item in result:
                   item["_id"] = ''
                   if item['to_user_token']:
                       user = list(db["User"].find({"token": item['to_user_token']}).limit(1))
                       if len(user) > 0:
                           item['to_user_name'] = user[0]['username']
                           item['to_user_portrait'] = user[0]['portrait']

                   if item['from_user_token']:
                       user = list(db["User"].find({"token": item['from_user_token']}).limit(1))
                       if len(user) > 0:
                           item['from_user_name'] = user[0]['username']
                           item['from_user_portrait'] = user[0]['portrait']

               return {"status": 1, 'msg': 'success', 'res': result}
           else:
               return {"status": 1, 'msg': 'success', 'res': []}

       else:
           return {"status": -1, "msg": "非法用户!"}

    #获取会话列表
    def get_conversation_list(self, json):

        if UserModel.checkin(json["token"]):
            filter = {"token": {"$ne": json["token"]}}
            users = list(db["User"].find(filter))

            if len(users):
                for item in users:

                    item["_id"] = ''
                    item["message_date"] = ""
                    if item["token"]:
                        message_filter = {"$or": [
                            {"$and": [{"from_user_token": json["token"]}, {"to_user_token": item["token"]}]},
                            {"$and": [{"from_user_token": item["token"]}, {"to_user_token": json["token"]}]}
                        ]}
                        message_list = list(self.collection.find(message_filter).sort("create_date", -1).limit(1))

                        if len(message_list):
                            item["message_date"] = message_list[0]["create_date"]

            return {"status": 1, "msg": "success", "res": users}
        else:
            return {"status": -1, "msg": "非法用户!"}

    #发送信息后执行
    def send_message_callback(self, json):
       if UserModel.checkin(json['from_user_token']):
            data = {
               "to_user_token": json['to_user_token'],
               'from_user_token': json['from_user_token'],
               "content": json['content'],
               "create_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),
            }

            aid = self.collection.insert(data)
            if aid:
                 return {"status": 1, "msg": "success"}
            else:
                return {"status": 0, "msg": "写入信息失败"}

       else:
          return {"status": -1, "msg": "非法用户!"}




message=Message()