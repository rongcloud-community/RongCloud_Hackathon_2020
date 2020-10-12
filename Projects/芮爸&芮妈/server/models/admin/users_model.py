#coding=utf-8
from libs.db.mongodb import db
from datetime import datetime


from libs.unit.tools import Tools
from libs.rongcloud.RongCloudUser import rc_user
import time


#用户实体类

class Users(object):
    def __init__(self):
        self.collection= db['User']

    def getOne(self, json):
        filter = {"token": json["token"]}
        result = list(self.collection.find(filter).limit(1))
        if len(result):
            res = rc_user.register_user(result[0]["token"], result[0]["username"], result[0]["portrait"])

            if res['code'] == 200:
                result[0]["_id"] = ""
                result[0]["im_token"] = res["token"]

            return  {"status": 1, "msg": "success", "result": result}
        else:
            return {"status": -1, "msg": "没有找到该信息"}



    def register(self, json):

        is_found = list(self.collection.find({"username": json["username"]}).limit(1))

        if len(is_found) > 0 :
            return {"status": -1, "msg": "用户名已存在"}
        else:
            is_found = list(self.collection.find({"mobile": json["mobile"]}).limit(1))
            if len(is_found) > 0:
                return {"status": -2, "msg": "用户电话已存在"}
            else:

                data = {
                    "username": json['username'],
                    "password": Tools.md5Encode(json['password']),
                    "create_date": time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
                    "state" : json["state"],
                    "mobile": json["mobile"],
                    "token": Tools.create_token(),
                     #头像链接
                    "portrait": json["portrait"]
                }

                res = rc_user.register_user(data['token'], data['username'], data['portrait'])

                if res['code'] == 200:
                    aid = self.collection.insert(data)
                    if aid:
                        return {"status": 1, "msg": "success", 'res': res}
                    else:
                        return {"status": 0, "msg": "新增数据失败"}
                else:
                    return {"status": -1, "msg": "在融云增加用户失败"}

    def edit(self, json):

        where={"token": json["token"]}

        data={"$set": {
            "state": json["state"],
            "update_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),
            "portrait": json['portrait']
            }
        }

        if json["password"] != '':
            data["$set"]["password"] = Tools.md5Encode(json["password"])

        is_found = list(self.collection.find({"$or": [
            {"$and": [{"username": json["username"]}, {"token": json["token"]}]},
            {"$and": [{"mobile": json["mobile"]}, {"token": json["token"]}]},
        ]}).limit(1))

        if len(is_found) == 0:
            is_user = list(self.collection.find({"username": json["username"]}).limit(1))
            is_mobile = list(self.collection.find({"mobile": json["mobile"]}).limit(1))

            if len(is_user):
                return {"status": -3, "msg": "用户名已存在"}
            else:
                data['$set']['username'] = json['username']
            if len(is_mobile):
                return {"status": -4, "msg": "手机号码已存在"}
            else:
                data['$set']['mobile'] = json['mobile']

        res = rc_user.update_user(json['token'], json['username'], json['portrait'])

        if res['code'] == 200:

            uid = self.collection.update(where, data)

            if uid:
                return {"status": 1, "msg": "success", "res": res}
            else:
                return {"status": -1, "msg": "修改失败"}
        else:
            return {"status": -2, "msg": "修改融云信息失败"}

    # 删除数据
    def remove(self, data):
        if ',' in data:
            temp_arr = data['token'].split(',')
        else:
            temp_arr = [data['token']]

        did = 0
        for i in temp_arr:
            res = self.collection.remove({'token': str(i)})
            if res:
                did += 1

        if did > 0:
            return {"status": 1, "msg": "success"}
        else:
            return {"status": -1, "msg": "没有找到该信息"}

    def getList(self, condition='', page=1, rows=10, date_from='', date_to=''):
        filter={}
        if condition != '':
            filter["$or"] = [{"username": {"$regex": "condition"}},  {"id": {"$regex": "condition"}}]

        if date_from != '' and date_to != '':
            filter["create_date"] = {"$gte": date_from, "$lte": date_to}
        elif date_from != '':
            filter["create_date"] = {"$gte": date_from}
        elif date_to != '':
            filter["create_date"] = {"$lte": date_to}

        result = list(self.collection.find(filter).sort("create_date", -1).skip(int(rows)*(int(page)-1) if int(page)>1 else 0).limit(int(rows)))
        count = self.collection.find(filter).count()
        if len(result):
            for item in result:
                item["_id"] = ""
                if "phone_token" in item:
                    phone = list(db["Phone"].find({"token": item["phone_token"]}).limit(1))
                    if len(phone) > 0:
                        item["phone_token"] = phone[0]["info"]
                else:
                    item["phone_token"] = ""

        return {"total": count, "rows": result}






users=Users()