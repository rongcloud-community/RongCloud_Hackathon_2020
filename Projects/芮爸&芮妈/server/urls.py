#coding=utf-8

from handlers.admin.index_handler import IndexHandler as AdminIndexHandler
from handlers.admin.login_handler import LoginHandler as AdminLoginHandler
from handlers.admin.manage_handler import ManageHandler as AdminManageHandler
from handlers.admin.role_handler import RoleHandler as AdminRoleHandler
from handlers.admin.nav_handler import NavHandler as AdminNavHandler
from handlers.admin.users_handler import UsersHandler as AdminUsersHandler
from handlers.admin.message_handler import MessageHandler as AdminMessageHandler


from handlers.int.users_handler import UsersHandler as IntUsersHandler
from handlers.int.message_handler import MessageHandler as IntMessageHandler
from handlers.int.websocket_handler import WebsocketHandler as IntWebsocketHandler



#用于URL地址注册

handlers = [

    (r'/int/users', IntUsersHandler),
    (r'/int/message', IntMessageHandler),
    (r'/int/websocket', IntWebsocketHandler),

    (r'/admin', AdminIndexHandler),
    (r'/admin/login', AdminLoginHandler),
    (r'/admin/manage', AdminManageHandler),
    (r'/admin/role', AdminRoleHandler),
    (r'/admin/nav', AdminNavHandler),
    (r'/admin/users', AdminUsersHandler),
    (r'/admin/message', AdminMessageHandler),





]


