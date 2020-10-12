#coding=utf-8

from pymongo import MongoClient


class MongoDB(object):

    def __init__(self, dbName, username, password):
        self.host = 'localhost'
        self.port = 27017
        self.dbName = dbName
        self.username = username
        self.password = password

        self.db = self.connect(self.host,self.port,self.dbName,self.username,self.password)

    def connect(self,host,port,dbName,username,password):
       Client= MongoClient(host,port)
       auth=Client["admin"]
       auth.authenticate(username,password)
       return Client[dbName]

    def getDB(self):
        return self.db

db = MongoDB(dbName='int',username='admin',password='mmjacket85123').getDB()

