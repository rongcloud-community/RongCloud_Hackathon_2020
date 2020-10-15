from libs.rongcloud.RongCloudBase import RongCloudBase


class RongCloudUser(RongCloudBase):

    def register_user(self,user_id, user_name, portrait=''):
        if portrait == '':
            portrait = 'https://www.baidu.com/img/bd_logo1.png?where=super'
        res = self.rc.get_user().register(user_id, user_name, portrait)
        return res

    def update_user(self, user_id, user_name, portrait):
        res = self.rc.get_user().update(user_id, user_name, portrait)
        return res









rc_user = RongCloudUser()

