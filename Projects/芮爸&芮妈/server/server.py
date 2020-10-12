#coding=utf-8

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.httpclient
from config import settings
from urls import handlers
from tornado.options import define, options


define("port", default=8001, help="run on the given port ", type=int)
define("log_path", default='/tmp', help="log path ", type=str)
 

 
if __name__=="__main__":
    # 启动tornado实例
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers, **settings)
    http_server = tornado.httpserver.HTTPServer(app, xheaders=True)
    http_server.listen(options.port)

    tornado.ioloop.IOLoop.instance().start()

