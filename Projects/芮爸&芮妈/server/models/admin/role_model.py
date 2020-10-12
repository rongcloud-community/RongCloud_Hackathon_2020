#coding=utf-8
from libs.db.mongodb import db
from datetime import datetime
import time

#菜单实体类

class Role(object):
    def __init__(self):
        self.collection= db['Role']


    def register(self,json):

        filter={"role_name":json["role_name"]}

        is_found= list(self.collection.find(filter).limit(1))

        if len(is_found):
            return {"status": -1,"msg":"角色名称已存在"}
        else:
            if json["nav_ids"] != '':
                if ',' in json["nav_ids"]:
                    temp_arr = json["nav_ids"].split(',')
                else:
                    temp_arr = [json["nav_ids"]]

                nav_text_arr = []

                for i in temp_arr:
                    nav_text_arr.append(i)

                nav_json = {"text": {"$in": nav_text_arr}}
                nav_res = list(db["Nav"].find(nav_json))

                nav_id_arr = []
                for item in nav_res:
                    item["_id"] = ""
                    nav_id_arr.append(str(int(item["id"])))

                json["nav_ids"] = ','.join(nav_id_arr)

            data={
                "role_name": json["role_name"],
                "id": int(time.time()),
                "create_date": time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
                "nav_ids": json["nav_ids"]
            }

            aid = self.collection.insert(data)

            if aid:
                return  {"status":1,"msg":"success"}
            else:
                return {"status":0,"msg":"未知错误"}


    def getOne(self,json):
        res = list(self.collection.find(json).limit(1))
        if len(res):
            res[0]["_id"] = ""
            return {"status" : 1,"msg":"success","result": res}
        else:
            return {"status":-1,"msg":"找不到信息"}


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
            return {"status": 1, "msg": "success"}
        else:
            return {"status": -1, "msg": "没有找到该信息"}

    def edit(self,json):

        where = {"id": json["id"]}

        if json["nav_ids"] != '':
            if ',' in json["nav_ids"]:
                temp_arr = json["nav_ids"].split(',')
            else:
                temp_arr = [json["nav_ids"]]

            nav_text_arr = []

            for i in temp_arr:
                nav_text_arr.append(i)

            nav_json = {"text": {"$in": nav_text_arr}}
            nav_res = list(db["Nav"].find(nav_json))

            nav_id_arr = []
            for item in nav_res:
                item["_id"] = ""
                nav_id_arr.append(str(int(item["id"])))

            json["nav_ids"] = ','.join(nav_id_arr)

        data = {"$set":{
            "role_name": json["role_name"],
            "nav_ids": json["nav_ids"],
            "update_date":time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
        }}

        uid=self.collection.update(where,data)

        if uid:
            return {"status":1,"msg":"success","result":uid}
        else:
            return {"status": -1, "msg": "未知错误"}

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

        result = list(self.collection.find(filter).sort("create_date", -1).skip(int(rows)*(int(page)-1) if int(page)>1 else 0) .limit(int(rows)))
        count = self.collection.find(filter).count()
        if len(result):
            for item in result:
                item["_id"] = ""
                if item["nav_ids"] !='':
                    if ',' in item["nav_ids"]:
                        temp_arr = item["nav_ids"].split(',')
                    else:
                        temp_arr = [item["nav_ids"]]

                    nav_id_arr = []

                    for i in temp_arr:
                        nav_id_arr.append(int(i))

                    nav_json = {"id": {"$in": nav_id_arr}}

                    nav_res=list(db["Nav"].find(nav_json))
                    nav_text_arr=[]
                    for item1 in nav_res:
                        nav_text_arr.append(item1["text"])

                    item["nav_ids"] = ','.join(nav_text_arr)

        return {"total": count, "rows": result}

    #获取权限列表
    def getRole(self):
        result=list(self.collection.find())
        if len(result):
            for item in result:
                item["_id"] = ""
            return result
        else:
            return {"status": -1, "msg": "获取信息失败", "result": []}




role=Role()
