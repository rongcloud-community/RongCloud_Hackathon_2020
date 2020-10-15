#coding=utf-8
import os

settings = dict(
    debug=True,  # 设置debug启动方式
    template_path=os.path.join(os.path.dirname(__file__),"templates"),  # 设置模板路径
    static_path=os.path.join(os.path.dirname(__file__),"static"),  # 设置静态文件路径
    static_url_prefix = "/static/",
    login_url="/admin/login",  #重定向到登录页面
    # packet的配置
    pycket ={
        "engine": "redis",  # 配置存储类型
        "storage": {
            "host": "localhost",
            "port": 6379,
            "db_sessions": 5,
            "db_notifications": 11,
            "max_connections": 2 ** 31
        },
        "cookies": {
            "expires_days": 30,
            "max_age": 360
        }
    },
    cookie_secret="aaa",
    xscf_cookies=True
)


