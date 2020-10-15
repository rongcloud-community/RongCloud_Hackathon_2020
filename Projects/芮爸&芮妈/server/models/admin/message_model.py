#coding=utf-8
from libs.db.mongodb import db
from datetime import datetime

from libs.rongcloud.RongCloudMessage import rc_message
from libs.unit.tools import Tools
import time


#用户实体类

class Message(object):
    def __init__(self):

        self.collection = db['UserLog']

    #发送测试短信
    def send_message(self, json):

        admin_user = list(db["User"].find({"username": "admin"}).limit(1))
        admin_user_token=''
        if len(admin_user) > 0:
            admin_user_token = admin_user[0]['token']

        data = {
            "to_user_token": json['to_user_token'],
            'from_user_token': admin_user_token,
            "content": json['content'],
            "create_date": time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
        }

        res = rc_message.send_message(data['to_user_token'], data['from_user_token'], data['content'], {"from_user": data['from_user_token'], "to_user": data["to_user_token"]})

        if res['code'] == 200:
            aid = self.collection.insert(data)
            if aid:
                return {"status": 1, "msg": "success", 'res': res}
            else:
                return {"status": 0, "msg": "发送信息成功,写入数据库失败"}
        else:
            return {"status": -1, "msg": "发送信息失败"}

    #获取信息列表
    def get_message_list(self, json):

        admin_user = list(db["User"].find({"username": "admin"}).limit(1))
        admin_user_token = ''
        if len(admin_user) > 0:
            admin_user_token = admin_user[0]['token']

        filter = {"$or": [
            {"$and": [{"to_user_token": json["user_token"]}, {"from_user_token": admin_user_token}]},
            {"$and": [{"to_user_token": admin_user_token}, {"from_user_token": json["user_token"]}]}
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

    def get_user_log(self, condition='', page=1, rows=10, date_from='', date_to=''):

        filter = {"$or": [{'from_user_token': condition},
                          {'to_user_token': condition}
                          ]}

        result = list(self.collection.find(filter).sort("create_date", -1).skip(int(rows) * (int(page) - 1) if int(page)>1 else 0).limit(int(rows)))
        count = self.collection.find(filter).count()

        if len(result):
            for item in result:
                item["_id"] = ""

                if item['to_user_token'] :
                    user = list(db["User"].find({"token": item['to_user_token']}).limit(1))
                    if len(user) > 0:
                        item['to_user_token'] = user[0]['username']

                if item['from_user_token']:
                    user = list(db["User"].find({"token": item['from_user_token']}).limit(1))
                    if len(user) > 0:
                        item['from_user_token'] = user[0]['username']

        return {"total": count, "rows": result}




message=Message()