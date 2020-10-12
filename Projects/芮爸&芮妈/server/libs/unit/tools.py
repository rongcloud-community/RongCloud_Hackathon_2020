#coding=utf-8

import hashlib
import base64
import uuid
import json as JSON

class Tools:

    @classmethod
    def md5Encode(self, str=''):
        if str == '':
            return ''
        else:
            m = hashlib.md5()
            m.update(str.encode('utf-8'))
            return m.hexdigest()

    @classmethod
    def bytesToJson(self, bytes=None):
        if bytes is None:
            return ''
        else:
            string = str(bytes, 'utf-8')
            json = JSON.loads(string)
            return json

    @classmethod
    def base64encode(cls, string=None):
        if string == '' or string is None:
            return ''
        else:
            return base64.b64encode(string)

    @classmethod
    def base64decode(cls, string=None):
        if string == '' or string is None:
            return ''
        else:
            return base64.b64decode(string)

    @classmethod
    def create_token(cls):
        return str(uuid.uuid1())