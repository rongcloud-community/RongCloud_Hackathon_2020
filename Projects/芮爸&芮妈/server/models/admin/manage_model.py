#coding=utf-8
from libs.db.mongodb import db
from datetime import datetime
from libs.unit.tools import Tools
import time

#管理员实体类

def recombination(func):
    def wapper(self, json):
        if "password" in json:
            json["password"] = Tools.md5Encode(json["password"])
        return func(self, json)
    return wapper


class Manage(object):
    def __init__(self):
        self.collection = db['Manage']

    @recombination
    def login(self, json):
        if json["username"].isdigit():
            filter = {"mobile":json["username"],"password": json["password"]}
        else:
            filter = {"username":json["username"],"password": json["password"]}

        result = list(self.collection.find(filter).limit(1))

        if len(result):
            result[0]["_id"] = ""
            if int(result[0]["is_login"]) == 1:
                where = {"id": result[0]["id"]}
                save_data={"$set":{
                    "update_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),
                    "count": int(result[0]['count'])+1,
                    "last_ip": json["ip"],
                    "last_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
                }
                }
                self.collection.update(where,save_data)
                return {"status":1,"msg":"success","result":result[0]}
            else:
                return {"status": -1, "msg": "您的账号已被冻结,请联系管理员"}
        else:
            return {"status":0,"msg":"用户名或密码错误"}

    @recombination
    def register(self,json):

        filter={"username": json["username"]}
        is_found = list(self.collection.find(filter).limit(1))

        if len(is_found):
            return {"status":-1,"msg":"管理员名称已存在"}

        else:
            data={
                "id":int(time.time()),
                "username": json["username"],
                "password": json["password"],
                "role_id": json["role_id"],
                "is_login": json["is_login"],
                "mobile":json["mobile"],
                "create_date": time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
                "count": 0
            }

            aid=self.collection.insert(data)
            if aid:
                return {"status":1,"msg":"success","result":aid}
            else:
                return {"status" : -1 ,"msg" : "新增数据失败"}


    def getOne(self,json):
        res = list(self.collection.find(json).limit(1))
        if len(res):
            res[0]["_id"] = ""
            return  {"status":1,"msg":"success","result":res}

        else:
            return {"status":-1,"msg":"没有找到相关信息"}


    def remove(self,data):
        if ',' in data:
            temp_arr = data.split(',')
        else:
            temp_arr = [data]

        id_arr = []

        for i in temp_arr:
            id_arr.append(int(i))

        json = {"id": {"$in": id_arr}}

        res = self.collection.remove(json)

        if res:
            return {"status":1,"msg":"success","result":res}

        else:
            return {"status":-1,"msg":"没有找到相关信息"}


    @recombination
    def edit(self, json):

        where = {"id": json['id']}
        data = {"$set": {
            "update_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),
            "mobile": json["mobile"],
            "role_id": json["role_id"],
            "is_login": json["is_login"],
        }}

        if json["password"] != '':
            data["$set"]["password"] = json["password"]

        uid = self.collection.update(where,data)

        if uid:
            return  {"status":1,"msg":"success","result":uid}

        else:
            return {"status": -1, "msg": "修改失败"}

    @recombination
    def modify(self, json):
        where = {"id": json['id']}

        data = {"$set": {
            "update_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),
        }}

        if json["password"] != '':
            data["$set"]["password"] = json["password"]

        uid = self.collection.update(where, data)

        if uid:
            return  {"status":1,"msg":"success","result":uid}
        else:
            return {"status": -1, "msg": "修改失败"}


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

        result = list(self.collection.find(filter).sort("create_date", -1).skip(int(rows)*(int(page)-1) if int(page) > 1 else 0).limit(int(rows)))
        count = self.collection.find(filter).count()
        if len(result):
            for item in result:
                item["_id"] = ""
                role = list(db["Role"].find({"id": int(item["role_id"])}).limit(1))
                if len(role):
                    item["role_id"] = role[0]["role_name"]
                else:
                    item["role_id"] = '未分配权限'

        return {"total": count, "rows": result}

manage=Manage()