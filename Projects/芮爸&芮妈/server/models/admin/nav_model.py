#coding=utf-8
from libs.db.mongodb import db
from datetime import datetime
import time

#菜单实体类

class Nav(object):
    def __init__(self):
        self.collection = db['Nav']

    #新增数据
    def register(self,json):

        is_found = list(self.collection.find({"text": json["text"]}).limit(1))

        if len(is_found):
            return {"status":-1,"msg":"菜单名称已存在"}
        else:
            data={
                "text": json["text"],
                "pid": json["pid"],
                "url": json["url"],
                "id":  int(time.time()),
                "state": json["state"],
                "iconCls": json["iconCls"],
                "create_date":time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
            }

            aid = self.collection.insert(data)
            if aid:
                return {"status":1,"msg":"success"}
            else:
                return {"status": 0, "msg": "新增数据失败"}

    #获取单条记录
    def getOne(self,json):

        res = list(self.collection.find(json).limit(1))
        if len(res):

            res[0]["_id"] = ""
            return {"status":1,"msg":"success","result":res}
        else:

            return {"status": -1, "msg": "没有找到该信息"}

    #删除数据
    def remove(self, data):
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

            return {"status": -1, "msg": "没有找到该信息"}

    #编辑数据
    def edit(self,json):

        where= {"id":json["id"]}
        data={"$set":{
             "text": json["text"],
            "iconCls": json["iconCls"],
            "pid":json['pid'],
            "url":json["url"],
            "update_date":time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        }}

        uid = self.collection.update(where, data)

        if uid:
            return {"status":1,"msg":"success"}

        else:

            return {"status": -1, "msg": "修改失败"}

    #获取列表数据
    def getList(self, condition, page, rows, date_from, date_to, pid=0):

        filter = {"pid": pid}
        if condition != '':
            filter["$or"] = [{"text": {"$regex": "condition"}}, {"url": {"$regex": "condition"}}]

        if date_from != '' and date_to != '':
            filter["create_date"] = {"$gte": date_from, "$lte": date_to}
        elif date_from != '':
            filter["create_date"] = {"$gte": date_from}
        elif date_to != '':
            filter["create_date"] = {"$lte": date_to}

        result = list(self.collection.find(filter).sort("create_date", -1).skip( int(rows) * (int(page) - 1) if int(page)>1 else 0).limit(int(rows)))
        count = self.collection.find(filter).count()
        if len(result):
            for item in result:
                item["_id"] = ""

        return {"total": count, "rows": result}

    #获取前端菜单列表
    def getNav(self,json):

        nav_json={}
        manage_json={"id": json["manage_id"]}

        manage = list(db['Manage'].find(manage_json).limit(1))

        if len(manage):
                role_id=manage[0]['role_id']
                role_json={"id":int(role_id)}
                role = list(db['Role'].find(role_json).limit(1))

                nav_arr = []

                if role[0]['nav_ids'] != '':
                    if ',' in role[0]['nav_ids']:
                        temp_arr = role[0]['nav_ids'].split(',')
                    else:
                        temp_arr = [role[0]['nav_ids']]

                    for i in temp_arr:
                        nav_arr.append(int(i))

                nav_json = {"id":{"$in":nav_arr},"pid": int(json["nav_id"])} if int(json["nav_id"]) > 0 else {"pid": int(json["nav_id"])}

        nav = list(self.collection.find(nav_json))

        if len(nav):
            for item in nav:
                item["_id"] = ""
        return nav


    #获取前端菜单列表
    def getRoleNav(self,json):

        nav_json = {"pid": int(json["nav_id"])} if int(json["nav_id"]) > 0 else {"pid": int(json["nav_id"])}

        nav = list(self.collection.find(nav_json))

        if len(nav):
            for item in nav:
                item["_id"] = ""
        return nav




nav=Nav()

