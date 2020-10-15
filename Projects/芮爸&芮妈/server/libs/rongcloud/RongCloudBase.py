from rongcloud.rongcloud import RongCloud

class RongCloudBase:
    rc = None
    def __init__(self):
        app_key = 'c9kqb3rdc226j' #融云appKEY
        app_secret = '6XjdwCfTicJgSZ' #融云appsecret
        self.rc = RongCloud(app_key,app_secret)