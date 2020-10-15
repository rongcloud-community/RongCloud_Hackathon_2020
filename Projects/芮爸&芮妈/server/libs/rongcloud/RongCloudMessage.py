from libs.rongcloud.RongCloudBase import RongCloudBase


class RongCloudMessage(RongCloudBase):
    def send_message(self,to_user_id, from_user_id, content='', extra=None):
        if content == '':
            content = 'hello I`m test message,just send'
        if extra is None:
            extra = ''
        content = {'content': content, 'extra': extra}

        object_name = 'RC:TxtMsg'   #发送文字信息固定写法

        res = self.rc.get_message().get_private().send(from_user_id, to_user_id, object_name, content)
        return res









rc_message = RongCloudMessage()

