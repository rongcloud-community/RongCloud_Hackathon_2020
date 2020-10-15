#coding=utf-8

from libs.db.mongodb import db
from datetime import datetime
from libs.unit.tools import Tools
from libs.rongcloud.RongCloudUser import rc_user
import time

#用户实体类

def recombination(func):
    def wapper(self, json):
        if "password" in json:
            json["password"] = Tools.md5Encode(json["password"])
        return func(self, json)
    return wapper


class User(object):

    def __init__(self):
        self.collection = db['User']

    #用户登录
    @recombination
    def login(self, json):
        if json["username"].isdigit():
            login_data = {"mobile": json["username"], "password": json["password"]}
        else:
            login_data = {"username": json["username"], "password": json["password"]}

        result = list(self.collection.find(login_data).limit(1))

        if len(result):
            if result[0]["state"] == 0:
                return {"status":-3,"msg":"用户没有被激活,请联系管理员!"}
            elif result[0]["state"] == 2:
                return {"status":-2,"msg":"用户正在审核中,请联系管理员!"}
            else:

                res = rc_user.register_user(result[0]['token'], result[0]['username'], result[0]['portrait'])
                if res['code'] == 200:
                    where = {"token": result[0]["token"]}
                    save_data = {"$set": {
                        "update_date": time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
                        "last_date": time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
                        "ip": json["ip"]
                        }
                    }
                    self.collection.update(where, save_data)

                    res["username"] = result[0]["username"]
                    res["portrait"] = result[0]["portrait"]
                    res["mobile"] = result[0]["mobile"]


                    return {"status": 1, "msg": "success", "res": res}
                else:
                    return {"status": -4, "msg": "融云获取用户token错误!"}
        else:
            return {"status": -1, "msg": "用户名或密码错误!"}

    #用户注册
    @recombination
    def register(self, json):
        filter = {"$or": [{"username": json["username"]}, {"mobile": json["mobile"]}]}
        is_found = list(self.collection.find(filter))
        if len(is_found):
            return {"status": -1, "msg": "用户名或手机号码已存在"}
        else:
            data = {
                "state": int(1),
                "create_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),
                "token": Tools.md5Encode(str(int(time.time()))),
                "username": json["username"],
                "password": json["password"],
                "mobile": json["mobile"],
                "portrait": json["portrait"]
            }

            res = rc_user.register_user(data['token'], data['username'], data['portrait'])
            if res['code'] == 200:

                aid = self.collection.insert(data)

                res["username"] = data["username"]
                res["portrait"] = data["portrait"]
                res["mobile"] = data["mobile"]

                if aid:
                    return {"status": 1, "msg": "success", "res": res}
                else:
                    return {"status":0,"msg":"未知错误,请联系管理员"}

    def modify(self, json):

        find_data={"token":json["token"], "password":Tools.md5Encode(json["old_password"])}
        is_found=list(self.collection.find(find_data).limit(1))
        if len(is_found):
            save_data={"$set": {
                "password": Tools.md5Encode(json["new_password"]),
                "update_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
            }}
            uid=self.collection.update(find_data,save_data)
            if uid:
                return {"status":1,"msg":"success"}
            else:
                return {"status":-2,"msg":"修改失败"}
        else:
            return {"status":-1,"msg":"找不到该信息"}


    def modifyInformation(self, json):
        find_data = {"token": json["token"], "mobile": json["new_mobile"]}
        is_found = list(self.collection.find(find_data).limit(1))
        save_data = {"$set": {"portrait": json["portrait"],
                              "update_date": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))}}
        if len(is_found):
            save_data["$set"]["mobile"] = json["new_mobile"]

        res = rc_user.update_user(json['token'], json['username'], json['portrait'])

        if res['code'] == 200:

            uid = self.collection.update({"token": json["token"]}, save_data)
            if uid:
                return {"status": 1, "msg": "success"}
            else:
                return {"status": -2, "msg": "修改失败"}
        else:
            return {"status": -1, "msg": "融云用户信息修改失败"}


    #所有方法必须经过用户登录检测
    @classmethod
    def checkin(self, token):
        res = list(db['User'].find({"token": token}).limit(1))
        if len(res):
            return True
        else:
            return False

user=User()