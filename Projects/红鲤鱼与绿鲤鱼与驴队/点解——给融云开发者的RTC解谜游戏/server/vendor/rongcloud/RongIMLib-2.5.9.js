/*
    说明: 请勿修改 header.js 和 footer.js
    用途: 自动拼接暴露方式
    命令: grunt release 中 concat
    Release Date: Thu Aug 06 2020 10:56:01 GMT+0800 (China Standard Time)
    CodeVersion: 1bef144686e73384a044c09bf977b12a42b4ff63
*/
(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        var tempIMLib = factory();
        var tempClient = tempIMLib.RongIMClient;
        var isExists = (!!global.RongIMLib);
        if (isExists) {
            var currentClient = RongIMLib.RongIMClient || {};
            for(var key in currentClient){
                tempClient[key] = currentClient[key];
            }
        }
        global.RongIMLib = tempIMLib;
        global.RongIMClient = tempClient;
    }
})(window, function(){
// {WebStart} WebSDK 内容开始的标识, 方便小程序 SDK 定位
// console.warn('SDK VERSION:', '1bef144686e73384a044c09bf977b12a42b4ff63')

var Polling = {
        SetUserStatusInput: function(){
            var a = {};
            this.setStatus = function(b){
                a.status = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        SetUserStatusOutput: function(){
            var a = {};
            this.setNothing = function(b){
                a.nothing = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        GetUserStatusInput: function(){
            var a = {};
            this.setNothing = function(b){
                a.nothing = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },

        GetUserStatusOutput: function(){
            var a = {};
            this.setStatus = function(b){
                a.status = b;
            };
            this.setSubUserId = function(b){
                a.subUserId = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        VoipDynamicInput: function(){
            var a = {};
            this.setEngineType = function(b){
                a.engineType = b;
            };
            this.setChannelName = function(b){
                a.channelName = b;
            };
            this.setChannelExtra = function(b){
                a.channelExtra = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        VoipDynamicOutput: function(){
            var a = {};
            this.setDynamicKey = function(b){
                a.dynamicKey = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        SubUserStatusInput: function(){
            var a = {};
            this.setUserid = function(b){
                a.userid = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        SubUserStatusOutput: function(){
            var a = {};
            this.setNothing = function(b){
               a.nothing = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        CleanHisMsgInput: function(){
            var a = {};
            this.setTargetId = function(b){
                a.targetId = b;
            };
            this.setDataTime = function(b){
                a.dataTime = b;
            };
            this.setConversationType = function(b){
                a.conversationType = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        DeleteMsgInput:function(){
         var a = {};
         this.setType = function(b){
           a.type = b;
         };
         this.setConversationId = function(b){
           a.conversationId = b;
         };
         this.setMsgs = function(b){
           a.msgs = b;
         };
         this.toArrayBuffer = function () {
             return a;
         }
        },
        DeleteMsg:function(){
          var a = {};
          this.setMsgId = function(b){
            a.msgId = b;
          };
          this.setMsgDataTime = function(b){
            a.msgDataTime = b;
          };
          this.setDirect = function(b){
            a.direct = b;
          };
          this.toArrayBuffer = function () {
              return a;
          }
        },
        DeleteMsgOutput:function(){
         var a = {};
         this.setNothing = function(b){
           a.nothing = b;
         };
         this.toArrayBuffer = function () {
             return a;
         }
        },
        SearchMpInput:function(){
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setId = function (b) {
                a.id = b;
            };
            this.toArrayBuffer = function () {
                return a;
            }
        },
        SearchMpOutput:function(){
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.setInfo = function (b) {
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a;
            }
        },
        MpInfo:function(){
            var a = {};
            this.setMpid = function(b){
                a.mpid = b;
            };
            this.setName = function(b){
                a.name = b;
            };
            this.setType = function(b){
                a.type = b;
            };
            this.setTime = function(b){
                a.time = b;
            };
            this.setPortraitUri = function(b){
                a.portraitUrl = b;
            };
            this.setExtra = function(b){
                a.extra = b;
            };
            this.toArrayBuffer = function () {
                return a;
            }
        },
        PullMpInput:function(){
            var a = {};
            this.setMpid = function(b){
                a.mpid = b;
            };
            this.setTime = function(b){
                a.time = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        PullMpOutput:function(){
            var a = {};
            this.setStatus = function(b){
                a.status = b;
            }
            this.setInfo = function(b){
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        MPFollowInput:function(){
            var a = {};
            this.setId = function(b){
                a.id = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        MPFollowOutput:function(){
            var a = {};
            this.setNothing = function(b){
                a.nothing = b;
            };
            this.setInfo = function(b){
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        NotifyMsg: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setTime = function (b) {
                a.time = b;
            };
            this.setChrmId = function(b){
                a.chrmId = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        SyncRequestMsg: function () {
            var a = {};
            this.setSyncTime = function (b) {
                a.syncTime = b || 0;
            };
            this.setIspolling = function (b) {
                a.ispolling = !!b;
            };
            this.setIsweb = function (b) {
                a.isweb = !!b;
            };
            this.setIsPullSend = function (b) {
                a.isPullSend = !!b;
            };
            this.setSendBoxSyncTime = function (b) {
                a.sendBoxSyncTime = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        UpStreamMessage: function () {
            var a = {};
            this.setSessionId = function (b) {
                a.sessionId = b
            };
            this.setClassname = function (b) {
                a.classname = b
            };
            this.setContent = function (b) {
                if (b) a.content = b;
            };
            this.setPushText = function (b) {
                a.pushText = b
            };
            this.setUserId = function(b){
                a.userId = b;
            };
            this.setConfigFlag = function (b) {
                a.configFlag = b;
            };
            this.setAppData = function(b){
                a.appData = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        DownStreamMessages: function () {
            var a = {};
            this.setList = function (b) {
                a.list = b
            };
            this.setSyncTime = function (b) {
                a.syncTime = b;
            };
            this.setFinished = function(b){
                a.finished = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        DownStreamMessage: function () {
            var a = {};
            this.setFromUserId = function (b) {
                a.fromUserId = b
            };
            this.setType = function (b) {
                a.type = b
            };
            this.setGroupId = function (b) {
                a.groupId = b
            };
            this.setClassname = function (b) {
                a.classname = b
            };
            this.setContent = function (b) {
                if (b)
                    a.content = b
            };
            this.setDataTime = function (b) {
                a.dataTime = b;
            };
            this.setStatus = function (b) {
                a.status = b;
            };
            this.setMsgId = function (b) {
                a.msgId = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        CreateDiscussionInput: function () {
            var a = {};
            this.setName = function (b) {
                a.name = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        CreateDiscussionOutput: function () {
            var a = {};
            this.setId = function (b) {
                a.id = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChannelInvitationInput: function () {
            var a = {};
            this.setUsers = function (b) {
                a.users = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        LeaveChannelInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        QueryChatroomInfoInput:function(){
            var a = {};
            this.setCount = function (b) {
                a.count = b;
            };
            this.setOrder = function (b) {
                a.order = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        QueryChatroomInfoOutput:function(){
            var a = {};
            this.setUserTotalNums = function (b) {
                a.userTotalNums = b;
            };
            this.setUserInfos = function (b) {
                a.userInfos = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        ChannelEvictionInput: function () {
            var a = {};
            this.setUser = function (b) {
                a.user = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        RenameChannelInput: function () {
            var a = {};
            this.setName = function (b) {
                a.name = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ChannelInfoInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ChannelInfoOutput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b
            };
            this.setChannelId = function (b) {
                a.channelId = b
            };
            this.setChannelName = function (b) {
                a.channelName = b
            };
            this.setAdminUserId = function (b) {
                a.adminUserId = b
            };
            this.setFirstTenUserIds = function (b) {
                a.firstTenUserIds = b
            };
            this.setOpenStatus = function (b) {
                a.openStatus = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ChannelInfosInput: function () {
            var a = {};
            this.setPage = function (b) {
                a.page = b
            };
            this.setNumber = function (b) {
                a.number = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChannelInfosOutput: function () {
            var a = {};
            this.setChannels = function (b) {
                a.channels = b
            };
            this.setTotal = function (b) {
                a.total = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        MemberInfo: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b
            };
            this.setUserName = function (b) {
                a.userName = b
            };
            this.setUserPortrait = function (b) {
                a.userPortrait = b
            };
            this.setExtension = function (b) {
                a.extension = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupMembersInput: function () {
            var a = {};
            this.setPage = function (b) {
                a.page = b
            };
            this.setNumber = function (b) {
                a.number = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupMembersOutput: function () {
            var a = {};
            this.setMembers = function (b) {
                a.members = b
            };
            this.setTotal = function (b) {
                a.total = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetUserInfoInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetUserInfoOutput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b
            };
            this.setUserName = function (b) {
                a.userName = b
            };
            this.setUserPortrait = function (b) {
                a.userPortrait = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetSessionIdInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetSessionIdOutput: function () {
            var a = {};
            this.setSessionId = function (b) {
                a.sessionId = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetQNupTokenInput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            }
            this.toArrayBuffer = function () {
                return a
            }
        },
        GetQNupTokenOutput: function () {
            var a = {};
            this.setDeadline = function (b) {
                a.deadline = b
            };
            this.setToken = function (b) {
                a.token = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        GetQNdownloadUrlInput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setKey = function (b) {
                a.key = b;
            };
            this.setFileName = function(b){
                a.fileName = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        GetQNdownloadUrlOutput: function () {
            var a = {};
            this.setDownloadUrl = function (b) {
                a.downloadUrl = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        Add2BlackListInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        RemoveFromBlackListInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        QueryBlackListInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        QueryBlackListOutput: function () {
            var a = {};
            this.setUserIds = function (b) {
                a.userIds = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        BlackListStatusInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        BlockPushInput: function () {
            var a = {};
            this.setBlockeeId = function (b) {
                a.blockeeId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ModifyPermissionInput: function () {
            var a = {};
            this.setOpenStatus = function (b) {
                a.openStatus = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupInput: function () {
            var a = {};
            this.setGroupInfo = function (b) {
                for (var i = 0, arr = []; i < b.length; i++) {
                    arr.push({id: b[i].getContent().id, name: b[i].getContent().name})
                }
                a.groupInfo = arr;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupOutput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupInfo: function () {
            var a = {};
            this.setId = function (b) {
                a.id = b;
            };
            this.setName = function (b) {
                a.name = b;
            };
            this.getContent = function () {
                return a;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupHashInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.setGroupHashCode = function (b) {
                a.groupHashCode = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupHashOutput: function () {
            var a = {};
            this.setResult = function (b) {
                a.result = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChrmInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChrmOutput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChrmPullMsg: function () {
            var a = {};
            this.setSyncTime = function (b) {
                a.syncTime = b
            };
            this.setCount = function (b) {
                a.count = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        RelationsInput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setMsg = function(b){
                a.msg = b;
            };
            this.setCount = function(b){
              a.count = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        RelationsOutput: function () {
            var a = {};
            this.setInfo = function (b) {
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        RelationInfo: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.setMsg = function(b){
                a.msg = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        HistoryMessageInput: function () {
            var a={};
            this.setTargetId=function(b){
                a.targetId=b;
            };
            this.setDataTime=function(b){
                a.dataTime=b;
            };
            this.setSize=function(b){
                a.size=b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        HistoryMessagesOuput: function () {
            var a={};
            this.setList=function(b){
                a.list=b;
            };
            this.setSyncTime=function(b){
                a.syncTime=b;
            };
            this.setHasMsg=function(b){
                a.hasMsg=b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        HistoryMsgInput: function(){
            var a = {};
            this.setTargetId = function(b){
                a.targetId = b;
            };
            this.setTime = function(b){
                a.time = b;
            };
            this.setCount = function(b){
                a.count = b;
            };
            this.setOrder = function(b){
                a.order = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        HistoryMsgOuput: function(){
            var a = {};
            this.setList = function(b){
                a.list = b;
            };
            this.setSyncTime = function(b){
                a.syncTime = b;
            };
            this.setHasMsg = function(b){
                a.hasMsg = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        RtcQueryListInput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setOrder = function (b) {
                a.order = b;
            };
        },
        RtcKeyDeleteInput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setKey = function (b) {
                a.key = b;
            };
        },
        RtcValueInfo: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setKey = function (b) {
                a.key = b;
            };
            this.setValue = function (b) {
                a.value = b;
            };
        },
        // RtcUserInfo: function () {
        //     var a = {};
        // },
        RtcUserListOutput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setList = function (b) {
                a.list = b;
            };
            this.setToken = function (b) {
                a.token = b;
            };
        },
        RtcRoomInfoOutput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setRoomId = function (b) {
                a.roomId = b;
            };
            this.setRoomData = function (b) {
                a.roomData = b;
            };
            this.setUserCount = function (b) {
                a.userCount = b;
            };
            this.setList = function (b) {
                a.list = b;
            }
        },
        RtcInput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setRoomType = function (b) {
                a.roomType = b;
            };
            this.setBroadcastType = function (b) {
                a.broadcastType = b;
            }
        },
        // RtcQryInput: function () {
        //     var a = {};
        // },
        RtcQryOutput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setOutInfo = function (b) {
                a.outInfo = b;
            };
        },
        // RtcDelDataInput: function () {
        //     var a = {};
        // },
        RtcDataInput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setInterior = function (b) {
                a.interior = b;
            };
            this.setTarget = function (b) {
                a.target = b;
            };
            this.setKey = function (b) {
                a.key = b;
            };
            this.setObjectName = function (b) {
                a.objectName = b;
            };
            this.setContent = function (b) {
                a.content = b;
            };
        },
        RtcSetDataInput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setInterior = function (b) {
                a.interior = b;
            };
            this.setTarget = function (b) {
                a.target = b;
            };
            this.setKey = function (b) {
                a.key = b;
            };
            this.setValue = function (b) {
                a.value = b;
            };
            this.setObjectName = function (b) {
                a.objectName = b;
            };
            this.setContent = function (b) {
                a.content = b;
            };
        },
        RtcOutput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setNothing = function (b) {
                a.nothing = b;
            };
        },
        RtcTokenOutput: function () {
            var a = {};
            this.toArrayBuffer = function(){
                return a;
            };
            this.setRtcToken = function (b) {
                a.rtcToken = b;
            }
        },
        /**
         * 聊天室 KV 存储
         */

        ChrmNotifyMsg: function () {
            var a = {};
            this.toArrayBuffer = function () {
                return a;
            };
            this.setType = function (b) {
                a.type = b;
            };
            this.setTime = function (b) {
                a.time = b;
            };
            this.setChrmId = function (b) {
                a.chrmId = b;
            };
        },
        ChrmKVEntity: function () {
            var a = {};
            this.toArrayBuffer = function () {
                return a;
            };
            this.setKey = function (key) {
                a.key = key;
            };
            this.setValue = function (value) {
                a.value = value;
            };
            this.setStatus = function (b) {
                a.status = b;
            };
            this.setTimestamp = function (b) {
                a.timestamp = b;
            };
            this.setUid = function (b) {
                a.uid = b;
            };
        },
        SetChrmKV: function () {
            var a = {};
            this.toArrayBuffer = function () {
                return a;
            };
            this.setEntry = function (b) {
                a.entry = b;
            };
            this.setNotification = function (b) {
                a.notification = b.toArrayBuffer();
            };
            this.setBNotify = function (b) {
                a.bNotify = b;
            };
            this.setType = function (b) {
                a.type = b;
            };
        },
        ChrmKVOutput: function () {
            var a = {};
            this.toArrayBuffer = function () {
                return a;
            };
            this.setEntries = function (b) {
                this.entries = b;
            };
            this.setBFullUpdate = function (b) {
                this.bFullUpdate = b;
            };
            this.setSyncTime = function (b) {
                this.syncTime = b;
            };
        },
        QueryChrmKV: function () {
            var a = {};
            this.toArrayBuffer = function () {
                return a;
            };
            this.setTimestamp = function (b) {
                a.timestamp = b;
            };
        },
        DeleteChrmKV: function () {
            var a = {};
            this.toArrayBuffer = function () {
                return a;
            };
            this.setEntry = function (b) {
                a.entry = b;
            };
            this.setBNotify = function (b) {
                a.bNotify = b;
            };
            this.setNotification = function (b) {
                a.notification = b.toArrayBuffer();
            };
            this.setType = function (b) {
                a.type = b;
            };
        }
    };
    for (var f in Polling) {
        Polling[f].decode = function (b) {
            var back = {}, val = JSON.parse(b) || eval("(" + b + ")");
            for (var i in val) {
                back[i]=val[i];
                back["get"+ i.charAt(0).toUpperCase()+i.slice(1)]=function(){
                    return val[i];
                }
            }
            return back;
        }
    }

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define, module */

var md5 = (function () {
    'use strict';

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }
    return md5;
}());

var RongIMLib;
(function (RongIMLib) {
    (function (MentionedType) {
        MentionedType[MentionedType["ALL"] = 1] = "ALL";
        MentionedType[MentionedType["PART"] = 2] = "PART";
    })(RongIMLib.MentionedType || (RongIMLib.MentionedType = {}));
    var MentionedType = RongIMLib.MentionedType;
    (function (MethodType) {
        MethodType[MethodType["CUSTOMER_SERVICE"] = 1] = "CUSTOMER_SERVICE";
        MethodType[MethodType["RECALL"] = 2] = "RECALL";
    })(RongIMLib.MethodType || (RongIMLib.MethodType = {}));
    var MethodType = RongIMLib.MethodType;
    (function (BlacklistStatus) {
        /**
         * 在黑名单中。
         */
        BlacklistStatus[BlacklistStatus["IN_BLACK_LIST"] = 0] = "IN_BLACK_LIST";
        /**
         * 不在黑名单中。
         */
        BlacklistStatus[BlacklistStatus["NOT_IN_BLACK_LIST"] = 1] = "NOT_IN_BLACK_LIST";
    })(RongIMLib.BlacklistStatus || (RongIMLib.BlacklistStatus = {}));
    var BlacklistStatus = RongIMLib.BlacklistStatus;
    (function (ConnectionChannel) {
        ConnectionChannel[ConnectionChannel["XHR_POLLING"] = 0] = "XHR_POLLING";
        ConnectionChannel[ConnectionChannel["WEBSOCKET"] = 1] = "WEBSOCKET";
        //外部调用
        ConnectionChannel[ConnectionChannel["HTTP"] = 0] = "HTTP";
        //外部调用
        ConnectionChannel[ConnectionChannel["HTTPS"] = 1] = "HTTPS";
    })(RongIMLib.ConnectionChannel || (RongIMLib.ConnectionChannel = {}));
    var ConnectionChannel = RongIMLib.ConnectionChannel;
    (function (CustomerType) {
        CustomerType[CustomerType["ONLY_ROBOT"] = 1] = "ONLY_ROBOT";
        CustomerType[CustomerType["ONLY_HUMAN"] = 2] = "ONLY_HUMAN";
        CustomerType[CustomerType["ROBOT_FIRST"] = 3] = "ROBOT_FIRST";
        CustomerType[CustomerType["HUMAN_FIRST"] = 4] = "HUMAN_FIRST";
    })(RongIMLib.CustomerType || (RongIMLib.CustomerType = {}));
    var CustomerType = RongIMLib.CustomerType;
    (function (GetChatRoomType) {
        GetChatRoomType[GetChatRoomType["NONE"] = 0] = "NONE";
        GetChatRoomType[GetChatRoomType["SQQUENCE"] = 1] = "SQQUENCE";
        GetChatRoomType[GetChatRoomType["REVERSE"] = 2] = "REVERSE";
    })(RongIMLib.GetChatRoomType || (RongIMLib.GetChatRoomType = {}));
    var GetChatRoomType = RongIMLib.GetChatRoomType;
    (function (ConnectionStatus) {
        /**
         * 连接成功。
         */
        ConnectionStatus[ConnectionStatus["CONNECTED"] = 0] = "CONNECTED";
        /**
         * 连接中。
         */
        ConnectionStatus[ConnectionStatus["CONNECTING"] = 1] = "CONNECTING";
        /**
         * 断开连接。
         */
        ConnectionStatus[ConnectionStatus["DISCONNECTED"] = 2] = "DISCONNECTED";
        /**
         * 用户账户在其他设备登录，本机会被踢掉线。
         */
        ConnectionStatus[ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"] = 6] = "KICKED_OFFLINE_BY_OTHER_CLIENT";
        /**
         * websocket 连接失败
         */
        ConnectionStatus[ConnectionStatus["WEBSOCKET_UNAVAILABLE"] = 7] = "WEBSOCKET_UNAVAILABLE";
        /**
         * websocket 报错
         */
        ConnectionStatus[ConnectionStatus["WEBSOCKET_ERROR"] = 8] = "WEBSOCKET_ERROR";
        /**
         * 网络不可用。
         */
        ConnectionStatus[ConnectionStatus["NETWORK_UNAVAILABLE"] = 3] = "NETWORK_UNAVAILABLE";
        /**
         * 域名错误
         */
        ConnectionStatus[ConnectionStatus["DOMAIN_INCORRECT"] = 12] = "DOMAIN_INCORRECT";
        /**
         * appkey 不正确
         */
        ConnectionStatus[ConnectionStatus["APPKEY_IS_FAKE"] = 20] = "APPKEY_IS_FAKE";
        /**
        *  连接关闭。
        */
        ConnectionStatus[ConnectionStatus["CONNECTION_CLOSED"] = 4] = "CONNECTION_CLOSED";
        /*
            互踢次数过多（count > 5），此时可能出现：在其它他设备登陆有 reconnect 逻辑
        */
        ConnectionStatus[ConnectionStatus["ULTRALIMIT"] = 1101] = "ULTRALIMIT";
        /*
            开始请求导航
        */
        ConnectionStatus[ConnectionStatus["REQUEST_NAVI"] = 201] = "REQUEST_NAVI";
        /*
            请求导航结束
        */
        ConnectionStatus[ConnectionStatus["RESPONSE_NAVI"] = 202] = "RESPONSE_NAVI";
        /*
            请求导航失败
        */
        ConnectionStatus[ConnectionStatus["RESPONSE_NAVI_ERROR"] = 203] = "RESPONSE_NAVI_ERROR";
        /*
            请求导航超时
        */
        ConnectionStatus[ConnectionStatus["RESPONSE_NAVI_TIMEOUT"] = 204] = "RESPONSE_NAVI_TIMEOUT";
    })(RongIMLib.ConnectionStatus || (RongIMLib.ConnectionStatus = {}));
    var ConnectionStatus = RongIMLib.ConnectionStatus;
    (function (ConversationNotificationStatus) {
        /**
         * 免打扰状态，关闭对应会话的通知提醒。
         */
        ConversationNotificationStatus[ConversationNotificationStatus["DO_NOT_DISTURB"] = 1] = "DO_NOT_DISTURB";
        /**
         * 提醒。
         */
        ConversationNotificationStatus[ConversationNotificationStatus["NOTIFY"] = 2] = "NOTIFY";
    })(RongIMLib.ConversationNotificationStatus || (RongIMLib.ConversationNotificationStatus = {}));
    var ConversationNotificationStatus = RongIMLib.ConversationNotificationStatus;
    (function (ConversationType) {
        ConversationType[ConversationType["NONE"] = 0] = "NONE";
        ConversationType[ConversationType["PRIVATE"] = 1] = "PRIVATE";
        ConversationType[ConversationType["DISCUSSION"] = 2] = "DISCUSSION";
        ConversationType[ConversationType["GROUP"] = 3] = "GROUP";
        ConversationType[ConversationType["CHATROOM"] = 4] = "CHATROOM";
        ConversationType[ConversationType["CUSTOMER_SERVICE"] = 5] = "CUSTOMER_SERVICE";
        ConversationType[ConversationType["SYSTEM"] = 6] = "SYSTEM";
        //默认关注 MC
        ConversationType[ConversationType["APP_PUBLIC_SERVICE"] = 7] = "APP_PUBLIC_SERVICE";
        //手工关注 MP
        ConversationType[ConversationType["PUBLIC_SERVICE"] = 8] = "PUBLIC_SERVICE";
    })(RongIMLib.ConversationType || (RongIMLib.ConversationType = {}));
    var ConversationType = RongIMLib.ConversationType;
    (function (DiscussionInviteStatus) {
        /**
         * 开放邀请。
         */
        DiscussionInviteStatus[DiscussionInviteStatus["OPENED"] = 0] = "OPENED";
        /**
         * 关闭邀请。
         */
        DiscussionInviteStatus[DiscussionInviteStatus["CLOSED"] = 1] = "CLOSED";
    })(RongIMLib.DiscussionInviteStatus || (RongIMLib.DiscussionInviteStatus = {}));
    var DiscussionInviteStatus = RongIMLib.DiscussionInviteStatus;
    (function (ErrorCode) {
        /* 超时 */
        ErrorCode[ErrorCode["TIMEOUT"] = -1] = "TIMEOUT";
        /**
         * 未知原因失败。
         */
        ErrorCode[ErrorCode["UNKNOWN"] = -2] = "UNKNOWN";
        /* 参数错误 */
        ErrorCode[ErrorCode["PARAMETER_ERROR"] = -3] = "PARAMETER_ERROR";
        ErrorCode[ErrorCode["RECALL_MESSAGE"] = 25101] = "RECALL_MESSAGE";
        /**
         * 发送频率过快
         */
        ErrorCode[ErrorCode["SEND_FREQUENCY_TOO_FAST"] = 20604] = "SEND_FREQUENCY_TOO_FAST";
        ErrorCode[ErrorCode["RC_MSG_UNAUTHORIZED"] = 20406] = "RC_MSG_UNAUTHORIZED";
        /**
         * 群组 Id 无效
         */
        ErrorCode[ErrorCode["RC_DISCUSSION_GROUP_ID_INVALID"] = 20407] = "RC_DISCUSSION_GROUP_ID_INVALID";
        /**
         * 群组被禁言
         */
        ErrorCode[ErrorCode["FORBIDDEN_IN_GROUP"] = 22408] = "FORBIDDEN_IN_GROUP";
        /**
         * 不在讨论组。
         */
        ErrorCode[ErrorCode["NOT_IN_DISCUSSION"] = 21406] = "NOT_IN_DISCUSSION";
        /**
         * 不在群组。
         */
        ErrorCode[ErrorCode["NOT_IN_GROUP"] = 22406] = "NOT_IN_GROUP";
        /**
         * 不在聊天室。
         */
        ErrorCode[ErrorCode["NOT_IN_CHATROOM"] = 23406] = "NOT_IN_CHATROOM";
        /**
         *聊天室被禁言
         */
        ErrorCode[ErrorCode["FORBIDDEN_IN_CHATROOM"] = 23408] = "FORBIDDEN_IN_CHATROOM";
        /**
         * 聊天室中成员被踢出
         */
        ErrorCode[ErrorCode["RC_CHATROOM_USER_KICKED"] = 23409] = "RC_CHATROOM_USER_KICKED";
        /**
         * 聊天室不存在
         */
        ErrorCode[ErrorCode["RC_CHATROOM_NOT_EXIST"] = 23410] = "RC_CHATROOM_NOT_EXIST";
        /**
         * 聊天室成员已满
         */
        ErrorCode[ErrorCode["RC_CHATROOM_IS_FULL"] = 23411] = "RC_CHATROOM_IS_FULL";
        /**
         * 获取聊天室信息参数无效
         */
        ErrorCode[ErrorCode["RC_CHATROOM_PATAMETER_INVALID"] = 23412] = "RC_CHATROOM_PATAMETER_INVALID";
        /**
         * 聊天室异常
         */
        ErrorCode[ErrorCode["CHATROOM_GET_HISTORYMSG_ERROR"] = 23413] = "CHATROOM_GET_HISTORYMSG_ERROR";
        /**
         * 没有打开聊天室消息存储
         */
        ErrorCode[ErrorCode["CHATROOM_NOT_OPEN_HISTORYMSG_STORE"] = 23414] = "CHATROOM_NOT_OPEN_HISTORYMSG_STORE";
        /**
         * 聊天室 KV 设置超出最大值(已满, 默认最多设置 100 个)
         */
        ErrorCode[ErrorCode["CHATROOM_KV_EXCEED"] = 23423] = "CHATROOM_KV_EXCEED";
        /**
         * 聊天室 KV 设置失败(kv 已存在, 需覆盖设置)
         */
        ErrorCode[ErrorCode["CHATROOM_KV_OVERWRITE_INVALID"] = 23424] = "CHATROOM_KV_OVERWRITE_INVALID";
        /**
         * 聊天室 KV 存储功能没有开通
         */
        ErrorCode[ErrorCode["CHATROOM_KV_STORE_NOT_OPEN"] = 23426] = "CHATROOM_KV_STORE_NOT_OPEN";
        /**
         * 聊天室Key不存在
         */
        ErrorCode[ErrorCode["CHATROOM_KEY_NOT_EXIST"] = 23427] = "CHATROOM_KEY_NOT_EXIST";
        /**
         * 敏感词屏蔽
         */
        ErrorCode[ErrorCode["SENSITIVE_SHIELD"] = 21501] = "SENSITIVE_SHIELD";
        ErrorCode[ErrorCode["SENSITIVE_REPLACE"] = 21502] = "SENSITIVE_REPLACE";
        /**
         * 加入讨论失败
         */
        ErrorCode[ErrorCode["JOIN_IN_DISCUSSION"] = 21407] = "JOIN_IN_DISCUSSION";
        /**
         * 创建讨论组失败
         */
        ErrorCode[ErrorCode["CREATE_DISCUSSION"] = 21408] = "CREATE_DISCUSSION";
        /**
         * 设置讨论组邀请状态失败
         */
        ErrorCode[ErrorCode["INVITE_DICUSSION"] = 21409] = "INVITE_DICUSSION";
        /**
         *获取用户失败
         */
        ErrorCode[ErrorCode["GET_USERINFO_ERROR"] = 23407] = "GET_USERINFO_ERROR";
        /**
         * 在黑名单中。
         */
        ErrorCode[ErrorCode["REJECTED_BY_BLACKLIST"] = 405] = "REJECTED_BY_BLACKLIST";
        /**
         * 通信过程中，当前 Socket 不存在。
         */
        ErrorCode[ErrorCode["RC_NET_CHANNEL_INVALID"] = 30001] = "RC_NET_CHANNEL_INVALID";
        /**
         * Socket 连接不可用。
         */
        ErrorCode[ErrorCode["RC_NET_UNAVAILABLE"] = 30002] = "RC_NET_UNAVAILABLE";
        /**
         * 通信超时。
         */
        ErrorCode[ErrorCode["RC_MSG_RESP_TIMEOUT"] = 30003] = "RC_MSG_RESP_TIMEOUT";
        /**
         * 导航操作时，Http 请求失败。
         */
        ErrorCode[ErrorCode["RC_HTTP_SEND_FAIL"] = 30004] = "RC_HTTP_SEND_FAIL";
        /**
         * HTTP 请求失败。
         */
        ErrorCode[ErrorCode["RC_HTTP_REQ_TIMEOUT"] = 30005] = "RC_HTTP_REQ_TIMEOUT";
        /**
         * HTTP 接收失败。
         */
        ErrorCode[ErrorCode["RC_HTTP_RECV_FAIL"] = 30006] = "RC_HTTP_RECV_FAIL";
        /**
         * 导航操作的 HTTP 请求，返回不是200。
         */
        ErrorCode[ErrorCode["RC_NAVI_RESOURCE_ERROR"] = 30007] = "RC_NAVI_RESOURCE_ERROR";
        /**
         * 导航数据解析后，其中不存在有效数据。
         */
        ErrorCode[ErrorCode["RC_NODE_NOT_FOUND"] = 30008] = "RC_NODE_NOT_FOUND";
        /**
         * 导航数据解析后，其中不存在有效 IP 地址。
         */
        ErrorCode[ErrorCode["RC_DOMAIN_NOT_RESOLVE"] = 30009] = "RC_DOMAIN_NOT_RESOLVE";
        /**
         * 创建 Socket 失败。
         */
        ErrorCode[ErrorCode["RC_SOCKET_NOT_CREATED"] = 30010] = "RC_SOCKET_NOT_CREATED";
        /**
         * Socket 被断开。
         */
        ErrorCode[ErrorCode["RC_SOCKET_DISCONNECTED"] = 30011] = "RC_SOCKET_DISCONNECTED";
        /**
         * PING 操作失败。
         */
        ErrorCode[ErrorCode["RC_PING_SEND_FAIL"] = 30012] = "RC_PING_SEND_FAIL";
        /**
         * PING 超时。
         */
        ErrorCode[ErrorCode["RC_PONG_RECV_FAIL"] = 30013] = "RC_PONG_RECV_FAIL";
        /**
         * 消息发送失败。
         */
        ErrorCode[ErrorCode["RC_MSG_SEND_FAIL"] = 30014] = "RC_MSG_SEND_FAIL";
        /**
         * JSON 后的消息体超限, 目前最大 128kb
         * */
        ErrorCode[ErrorCode["RC_MSG_CONTENT_EXCEED_LIMIT"] = 30016] = "RC_MSG_CONTENT_EXCEED_LIMIT";
        /**
         * 做 connect 连接时，收到的 ACK 超时。
         */
        ErrorCode[ErrorCode["RC_CONN_ACK_TIMEOUT"] = 31000] = "RC_CONN_ACK_TIMEOUT";
        /**
         * 参数错误。
         */
        ErrorCode[ErrorCode["RC_CONN_PROTO_VERSION_ERROR"] = 31001] = "RC_CONN_PROTO_VERSION_ERROR";
        /**
         * 参数错误，App Id 错误。
         */
        ErrorCode[ErrorCode["RC_CONN_ID_REJECT"] = 31002] = "RC_CONN_ID_REJECT";
        /**
         * 服务器不可用。
         */
        ErrorCode[ErrorCode["RC_CONN_SERVER_UNAVAILABLE"] = 31003] = "RC_CONN_SERVER_UNAVAILABLE";
        /**
         * Token 错误。
         */
        ErrorCode[ErrorCode["RC_CONN_USER_OR_PASSWD_ERROR"] = 31004] = "RC_CONN_USER_OR_PASSWD_ERROR";
        /**
         * App Id 与 Token 不匹配。
         */
        ErrorCode[ErrorCode["RC_CONN_NOT_AUTHRORIZED"] = 31005] = "RC_CONN_NOT_AUTHRORIZED";
        /**
         * 重定向，地址错误。
         */
        ErrorCode[ErrorCode["RC_CONN_REDIRECTED"] = 31006] = "RC_CONN_REDIRECTED";
        /**
         * NAME 与后台注册信息不一致。
         */
        ErrorCode[ErrorCode["RC_CONN_PACKAGE_NAME_INVALID"] = 31007] = "RC_CONN_PACKAGE_NAME_INVALID";
        /**
         * APP 被屏蔽、删除或不存在。
         */
        ErrorCode[ErrorCode["RC_CONN_APP_BLOCKED_OR_DELETED"] = 31008] = "RC_CONN_APP_BLOCKED_OR_DELETED";
        /**
         * 用户被屏蔽。
         */
        ErrorCode[ErrorCode["RC_CONN_USER_BLOCKED"] = 31009] = "RC_CONN_USER_BLOCKED";
        /**
         * Disconnect，由服务器返回，比如用户互踢。
         */
        ErrorCode[ErrorCode["RC_DISCONN_KICK"] = 31010] = "RC_DISCONN_KICK";
        /**
         * Disconnect，由服务器返回，比如用户互踢。
         */
        ErrorCode[ErrorCode["RC_DISCONN_EXCEPTION"] = 31011] = "RC_DISCONN_EXCEPTION";
        /**
         * 协议层内部错误。query，上传下载过程中数据错误。
         */
        ErrorCode[ErrorCode["RC_QUERY_ACK_NO_DATA"] = 32001] = "RC_QUERY_ACK_NO_DATA";
        /**
         * 协议层内部错误。
         */
        ErrorCode[ErrorCode["RC_MSG_DATA_INCOMPLETE"] = 32002] = "RC_MSG_DATA_INCOMPLETE";
        /**
         * 未调用 init 初始化函数。
         */
        ErrorCode[ErrorCode["BIZ_ERROR_CLIENT_NOT_INIT"] = 33001] = "BIZ_ERROR_CLIENT_NOT_INIT";
        /**
         * 数据库初始化失败。
         */
        ErrorCode[ErrorCode["BIZ_ERROR_DATABASE_ERROR"] = 33002] = "BIZ_ERROR_DATABASE_ERROR";
        /**
         * 传入参数无效。
         */
        ErrorCode[ErrorCode["BIZ_ERROR_INVALID_PARAMETER"] = 33003] = "BIZ_ERROR_INVALID_PARAMETER";
        /**
         * 通道无效。
         */
        ErrorCode[ErrorCode["BIZ_ERROR_NO_CHANNEL"] = 33004] = "BIZ_ERROR_NO_CHANNEL";
        /**
         * 重新连接成功。
         */
        ErrorCode[ErrorCode["BIZ_ERROR_RECONNECT_SUCCESS"] = 33005] = "BIZ_ERROR_RECONNECT_SUCCESS";
        /**
         * 连接中，再调用 connect 被拒绝。
         */
        ErrorCode[ErrorCode["BIZ_ERROR_CONNECTING"] = 33006] = "BIZ_ERROR_CONNECTING";
        /**
         * 消息漫游服务未开通
         */
        ErrorCode[ErrorCode["MSG_ROAMING_SERVICE_UNAVAILABLE"] = 33007] = "MSG_ROAMING_SERVICE_UNAVAILABLE";
        ErrorCode[ErrorCode["MSG_INSERT_ERROR"] = 33008] = "MSG_INSERT_ERROR";
        ErrorCode[ErrorCode["MSG_DEL_ERROR"] = 33009] = "MSG_DEL_ERROR";
        /**
         * 删除会话失败
         */
        ErrorCode[ErrorCode["CONVER_REMOVE_ERROR"] = 34001] = "CONVER_REMOVE_ERROR";
        /**
         *拉取历史消息
         */
        ErrorCode[ErrorCode["CONVER_GETLIST_ERROR"] = 34002] = "CONVER_GETLIST_ERROR";
        /**
         * 会话指定异常
         */
        ErrorCode[ErrorCode["CONVER_SETOP_ERROR"] = 34003] = "CONVER_SETOP_ERROR";
        /**
         * 获取会话未读消息总数失败
         */
        ErrorCode[ErrorCode["CONVER_TOTAL_UNREAD_ERROR"] = 34004] = "CONVER_TOTAL_UNREAD_ERROR";
        /**
         * 获取指定会话类型未读消息数异常
         */
        ErrorCode[ErrorCode["CONVER_TYPE_UNREAD_ERROR"] = 34005] = "CONVER_TYPE_UNREAD_ERROR";
        /**
         * 获取指定用户ID&会话类型未读消息数异常
         */
        ErrorCode[ErrorCode["CONVER_ID_TYPE_UNREAD_ERROR"] = 34006] = "CONVER_ID_TYPE_UNREAD_ERROR";
        ErrorCode[ErrorCode["CONVER_CLEAR_ERROR"] = 34007] = "CONVER_CLEAR_ERROR";
        ErrorCode[ErrorCode["CLEAR_HIS_ERROR"] = 34010] = "CLEAR_HIS_ERROR";
        ErrorCode[ErrorCode["CLEAR_HIS_TYPE_ERROR"] = 34008] = "CLEAR_HIS_TYPE_ERROR";
        ErrorCode[ErrorCode["CLEAR_HIS_TIME_ERROR"] = 34011] = "CLEAR_HIS_TIME_ERROR";
        /*
            
        */
        ErrorCode[ErrorCode["CONVER_GET_ERROR"] = 34009] = "CONVER_GET_ERROR";
        //群组异常信息
        /**
         *
         */
        ErrorCode[ErrorCode["GROUP_SYNC_ERROR"] = 35001] = "GROUP_SYNC_ERROR";
        /**
         * 匹配群信息异常
         */
        ErrorCode[ErrorCode["GROUP_MATCH_ERROR"] = 35002] = "GROUP_MATCH_ERROR";
        //聊天室异常
        /**
         * 加入聊天室Id为空
         */
        ErrorCode[ErrorCode["CHATROOM_ID_ISNULL"] = 36001] = "CHATROOM_ID_ISNULL";
        /**
         * 加入聊天室失败
         */
        ErrorCode[ErrorCode["CHARTOOM_JOIN_ERROR"] = 36002] = "CHARTOOM_JOIN_ERROR";
        /**
         * 拉取聊天室历史消息失败
         */
        ErrorCode[ErrorCode["CHATROOM_HISMESSAGE_ERROR"] = 36003] = "CHATROOM_HISMESSAGE_ERROR";
        /**
         * 聊天室 kv 未找到
         * */
        ErrorCode[ErrorCode["CHATROOM_KV_NOT_FOUND"] = 36004] = "CHATROOM_KV_NOT_FOUND";
        //黑名单异常
        /**
         * 加入黑名单异常
         */
        ErrorCode[ErrorCode["BLACK_ADD_ERROR"] = 37001] = "BLACK_ADD_ERROR";
        /**
         * 获得指定人员再黑名单中的状态异常
         */
        ErrorCode[ErrorCode["BLACK_GETSTATUS_ERROR"] = 37002] = "BLACK_GETSTATUS_ERROR";
        /**
         * 移除黑名单异常
         */
        ErrorCode[ErrorCode["BLACK_REMOVE_ERROR"] = 37003] = "BLACK_REMOVE_ERROR";
        /**
         * 获取草稿失败
         */
        ErrorCode[ErrorCode["DRAF_GET_ERROR"] = 38001] = "DRAF_GET_ERROR";
        /**
         * 保存草稿失败
         */
        ErrorCode[ErrorCode["DRAF_SAVE_ERROR"] = 38002] = "DRAF_SAVE_ERROR";
        /**
         * 删除草稿失败
         */
        ErrorCode[ErrorCode["DRAF_REMOVE_ERROR"] = 38003] = "DRAF_REMOVE_ERROR";
        /**
         * 关注公众号失败
         */
        ErrorCode[ErrorCode["SUBSCRIBE_ERROR"] = 39001] = "SUBSCRIBE_ERROR";
        /**
         * 关注公众号失败
         */
        ErrorCode[ErrorCode["QNTKN_FILETYPE_ERROR"] = 41001] = "QNTKN_FILETYPE_ERROR";
        /**
         * 获取七牛token失败
         */
        ErrorCode[ErrorCode["QNTKN_GET_ERROR"] = 41002] = "QNTKN_GET_ERROR";
        /**
         * cookie被禁用
         */
        ErrorCode[ErrorCode["COOKIE_ENABLE"] = 51001] = "COOKIE_ENABLE";
        ErrorCode[ErrorCode["GET_MESSAGE_BY_ID_ERROR"] = 61001] = "GET_MESSAGE_BY_ID_ERROR";
        // 没有注册DeviveId 也就是用户没有登陆
        ErrorCode[ErrorCode["HAVNODEVICEID"] = 24001] = "HAVNODEVICEID";
        // 已经存在
        ErrorCode[ErrorCode["DEVICEIDISHAVE"] = 24002] = "DEVICEIDISHAVE";
        // 成功
        ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
        // 没有对应的用户或token
        ErrorCode[ErrorCode["FEILD"] = 24009] = "FEILD";
        // voip为空
        ErrorCode[ErrorCode["VOIPISNULL"] = 24013] = "VOIPISNULL";
        // 不支持的Voip引擎
        ErrorCode[ErrorCode["NOENGINETYPE"] = 24010] = "NOENGINETYPE";
        // channleName 是空
        ErrorCode[ErrorCode["NULLCHANNELNAME"] = 24011] = "NULLCHANNELNAME";
        // 生成Voipkey失败
        ErrorCode[ErrorCode["VOIPDYANMICERROR"] = 24012] = "VOIPDYANMICERROR";
        // 没有配置voip
        ErrorCode[ErrorCode["NOVOIP"] = 24014] = "NOVOIP";
        // 服务器内部错误
        ErrorCode[ErrorCode["INTERNALERRROR"] = 24015] = "INTERNALERRROR";
        //VOIP close
        ErrorCode[ErrorCode["VOIPCLOSE"] = 24016] = "VOIPCLOSE";
        ErrorCode[ErrorCode["CLOSE_BEFORE_OPEN"] = 51001] = "CLOSE_BEFORE_OPEN";
        ErrorCode[ErrorCode["ALREADY_IN_USE"] = 51002] = "ALREADY_IN_USE";
        ErrorCode[ErrorCode["INVALID_CHANNEL_NAME"] = 51003] = "INVALID_CHANNEL_NAME";
        ErrorCode[ErrorCode["VIDEO_CONTAINER_IS_NULL"] = 51004] = "VIDEO_CONTAINER_IS_NULL";
        /**
        * 删除消息数组长度为 0 .
        */
        ErrorCode[ErrorCode["DELETE_MESSAGE_ID_IS_NULL"] = 61001] = "DELETE_MESSAGE_ID_IS_NULL";
        /*!
        己方取消已发出的通话请求
        */
        ErrorCode[ErrorCode["CANCEL"] = 1] = "CANCEL";
        /*!
         己方拒绝收到的通话请求
         */
        ErrorCode[ErrorCode["REJECT"] = 2] = "REJECT";
        /*!
         己方挂断
         */
        ErrorCode[ErrorCode["HANGUP"] = 3] = "HANGUP";
        /*!
         己方忙碌
         */
        ErrorCode[ErrorCode["BUSYLINE"] = 4] = "BUSYLINE";
        /*!
         己方未接听
         */
        ErrorCode[ErrorCode["NO_RESPONSE"] = 5] = "NO_RESPONSE";
        /*!
         己方不支持当前引擎
         */
        ErrorCode[ErrorCode["ENGINE_UN_SUPPORTED"] = 6] = "ENGINE_UN_SUPPORTED";
        /*!
         己方网络出错
         */
        ErrorCode[ErrorCode["NETWORK_ERROR"] = 7] = "NETWORK_ERROR";
        /*!
         对方取消已发出的通话请求
         */
        ErrorCode[ErrorCode["REMOTE_CANCEL"] = 11] = "REMOTE_CANCEL";
        /*!
         对方拒绝收到的通话请求
         */
        ErrorCode[ErrorCode["REMOTE_REJECT"] = 12] = "REMOTE_REJECT";
        /*!
         通话过程对方挂断
         */
        ErrorCode[ErrorCode["REMOTE_HANGUP"] = 13] = "REMOTE_HANGUP";
        /*!
         对方忙碌
         */
        ErrorCode[ErrorCode["REMOTE_BUSYLINE"] = 14] = "REMOTE_BUSYLINE";
        /*!
         对方未接听
         */
        ErrorCode[ErrorCode["REMOTE_NO_RESPONSE"] = 15] = "REMOTE_NO_RESPONSE";
        /*!
         对方网络错误
         */
        ErrorCode[ErrorCode["REMOTE_ENGINE_UN_SUPPORTED"] = 16] = "REMOTE_ENGINE_UN_SUPPORTED";
        /*!
         对方网络错误
         */
        ErrorCode[ErrorCode["REMOTE_NETWORK_ERROR"] = 17] = "REMOTE_NETWORK_ERROR";
        /*!
         VoIP 不可用
         */
        ErrorCode[ErrorCode["VOIP_NOT_AVALIABLE"] = 18] = "VOIP_NOT_AVALIABLE";
    })(RongIMLib.ErrorCode || (RongIMLib.ErrorCode = {}));
    var ErrorCode = RongIMLib.ErrorCode;
    (function (VoIPMediaType) {
        VoIPMediaType[VoIPMediaType["MEDIA_AUDIO"] = 1] = "MEDIA_AUDIO";
        VoIPMediaType[VoIPMediaType["MEDIA_VEDIO"] = 2] = "MEDIA_VEDIO";
        VoIPMediaType[VoIPMediaType["MEDIA_VIDEO"] = 2] = "MEDIA_VIDEO";
    })(RongIMLib.VoIPMediaType || (RongIMLib.VoIPMediaType = {}));
    var VoIPMediaType = RongIMLib.VoIPMediaType;
    (function (MediaType) {
        /**
         * 图片。
         */
        MediaType[MediaType["IMAGE"] = 1] = "IMAGE";
        /**
         * 声音。
         */
        MediaType[MediaType["AUDIO"] = 2] = "AUDIO";
        /**
         * 视频。
         */
        MediaType[MediaType["VIDEO"] = 3] = "VIDEO";
        /**
         * 通用文件。
         */
        MediaType[MediaType["FILE"] = 100] = "FILE";
    })(RongIMLib.MediaType || (RongIMLib.MediaType = {}));
    var MediaType = RongIMLib.MediaType;
    (function (MessageDirection) {
        /**
         * 发送消息。
         */
        MessageDirection[MessageDirection["SEND"] = 1] = "SEND";
        /**
         * 接收消息。
         */
        MessageDirection[MessageDirection["RECEIVE"] = 2] = "RECEIVE";
    })(RongIMLib.MessageDirection || (RongIMLib.MessageDirection = {}));
    var MessageDirection = RongIMLib.MessageDirection;
    (function (FileType) {
        FileType[FileType["IMAGE"] = 1] = "IMAGE";
        FileType[FileType["AUDIO"] = 2] = "AUDIO";
        FileType[FileType["VIDEO"] = 3] = "VIDEO";
        FileType[FileType["FILE"] = 4] = "FILE";
    })(RongIMLib.FileType || (RongIMLib.FileType = {}));
    var FileType = RongIMLib.FileType;
    (function (RealTimeLocationErrorCode) {
        /**
         * 未初始化 RealTimeLocation 实例
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NOT_INIT"] = -1] = "RC_REAL_TIME_LOCATION_NOT_INIT";
        /**
         * 执行成功。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_SUCCESS"] = 0] = "RC_REAL_TIME_LOCATION_SUCCESS";
        /**
         * 获取 RealTimeLocation 实例时返回
         * GPS 未打开。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_GPS_DISABLED"] = 1] = "RC_REAL_TIME_LOCATION_GPS_DISABLED";
        /**
         * 获取 RealTimeLocation 实例时返回
         * 当前会话不支持位置共享。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT"] = 2] = "RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT";
        /**
         * 获取 RealTimeLocation 实例时返回
         * 对方已发起位置共享。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_IS_ON_GOING"] = 3] = "RC_REAL_TIME_LOCATION_IS_ON_GOING";
        /**
         * Join 时返回
         * 当前位置共享已超过最大支持人数。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT"] = 4] = "RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT";
        /**
         * Join 时返回
         * 加入位置共享失败。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_JOIN_FAILURE"] = 5] = "RC_REAL_TIME_LOCATION_JOIN_FAILURE";
        /**
         * Start 时返回
         * 发起位置共享失败。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_START_FAILURE"] = 6] = "RC_REAL_TIME_LOCATION_START_FAILURE";
        /**
         * 网络不可用。
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE"] = 7] = "RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE";
    })(RongIMLib.RealTimeLocationErrorCode || (RongIMLib.RealTimeLocationErrorCode = {}));
    var RealTimeLocationErrorCode = RongIMLib.RealTimeLocationErrorCode;
    (function (RealTimeLocationStatus) {
        /**
         * 空闲状态 （默认状态）
         * 对方或者自己都未发起位置共享业务，或者位置共享业务已结束。
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_IDLE"] = 0] = "RC_REAL_TIME_LOCATION_STATUS_IDLE";
        /**
         * 呼入状态 （待加入）
         * 1. 对方发起了位置共享业务，此状态下，自己只能选择加入。
         * 2. 自己从已连接的位置共享中退出。
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_INCOMING"] = 1] = "RC_REAL_TIME_LOCATION_STATUS_INCOMING";
        /**
         * 呼出状态 =（自己创建）
         * 1. 自己发起位置共享业务，对方只能选择加入。
         * 2. 对方从已连接的位置共享业务中退出。
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_OUTGOING"] = 2] = "RC_REAL_TIME_LOCATION_STATUS_OUTGOING";
        /**
         * 连接状态 （自己加入）
         * 对方加入了自己发起的位置共享，或者自己加入了对方发起的位置共享。
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_CONNECTED"] = 3] = "RC_REAL_TIME_LOCATION_STATUS_CONNECTED";
    })(RongIMLib.RealTimeLocationStatus || (RongIMLib.RealTimeLocationStatus = {}));
    var RealTimeLocationStatus = RongIMLib.RealTimeLocationStatus;
    (function (ReceivedStatus) {
        ReceivedStatus[ReceivedStatus["READ"] = 1] = "READ";
        ReceivedStatus[ReceivedStatus["LISTENED"] = 2] = "LISTENED";
        ReceivedStatus[ReceivedStatus["DOWNLOADED"] = 4] = "DOWNLOADED";
        ReceivedStatus[ReceivedStatus["RETRIEVED"] = 8] = "RETRIEVED";
        ReceivedStatus[ReceivedStatus["UNREAD"] = 0] = "UNREAD";
    })(RongIMLib.ReceivedStatus || (RongIMLib.ReceivedStatus = {}));
    var ReceivedStatus = RongIMLib.ReceivedStatus;
    (function (ReadStatus) {
        ReadStatus[ReadStatus["READ"] = 1] = "READ";
        ReadStatus[ReadStatus["LISTENED"] = 2] = "LISTENED";
        ReadStatus[ReadStatus["DOWNLOADED"] = 4] = "DOWNLOADED";
        ReadStatus[ReadStatus["RETRIEVED"] = 8] = "RETRIEVED";
        ReadStatus[ReadStatus["UNREAD"] = 0] = "UNREAD";
    })(RongIMLib.ReadStatus || (RongIMLib.ReadStatus = {}));
    var ReadStatus = RongIMLib.ReadStatus;
    (function (SearchType) {
        /**
         * 精确。
         */
        SearchType[SearchType["EXACT"] = 0] = "EXACT";
        /**
         * 模糊。
         */
        SearchType[SearchType["FUZZY"] = 1] = "FUZZY";
    })(RongIMLib.SearchType || (RongIMLib.SearchType = {}));
    var SearchType = RongIMLib.SearchType;
    (function (SentStatus) {
        /**
         * 发送中。
         */
        SentStatus[SentStatus["SENDING"] = 10] = "SENDING";
        /**
         * 发送失败。
         */
        SentStatus[SentStatus["FAILED"] = 20] = "FAILED";
        /**
         * 已发送。
         */
        SentStatus[SentStatus["SENT"] = 30] = "SENT";
        /**
         * 对方已接收。
         */
        SentStatus[SentStatus["RECEIVED"] = 40] = "RECEIVED";
        /**
         * 对方已读。
         */
        SentStatus[SentStatus["READ"] = 50] = "READ";
        /**
         * 对方已销毁。
         */
        SentStatus[SentStatus["DESTROYED"] = 60] = "DESTROYED";
    })(RongIMLib.SentStatus || (RongIMLib.SentStatus = {}));
    var SentStatus = RongIMLib.SentStatus;
    (function (ConnectionState) {
        ConnectionState[ConnectionState["ACCEPTED"] = 0] = "ACCEPTED";
        ConnectionState[ConnectionState["UNACCEPTABLE_PROTOCOL_VERSION"] = 1] = "UNACCEPTABLE_PROTOCOL_VERSION";
        ConnectionState[ConnectionState["IDENTIFIER_REJECTED"] = 2] = "IDENTIFIER_REJECTED";
        ConnectionState[ConnectionState["SERVER_UNAVAILABLE"] = 3] = "SERVER_UNAVAILABLE";
        /**
         * token无效
         */
        ConnectionState[ConnectionState["TOKEN_INCORRECT"] = 4] = "TOKEN_INCORRECT";
        ConnectionState[ConnectionState["NOT_AUTHORIZED"] = 5] = "NOT_AUTHORIZED";
        ConnectionState[ConnectionState["REDIRECT"] = 6] = "REDIRECT";
        ConnectionState[ConnectionState["PACKAGE_ERROR"] = 7] = "PACKAGE_ERROR";
        ConnectionState[ConnectionState["APP_BLOCK_OR_DELETE"] = 8] = "APP_BLOCK_OR_DELETE";
        ConnectionState[ConnectionState["BLOCK"] = 9] = "BLOCK";
        ConnectionState[ConnectionState["TOKEN_EXPIRE"] = 10] = "TOKEN_EXPIRE";
        ConnectionState[ConnectionState["DEVICE_ERROR"] = 11] = "DEVICE_ERROR";
    })(RongIMLib.ConnectionState || (RongIMLib.ConnectionState = {}));
    var ConnectionState = RongIMLib.ConnectionState;
    (function (RTCAPIType) {
        RTCAPIType[RTCAPIType["ROOM"] = 1] = "ROOM";
        RTCAPIType[RTCAPIType["PERSON"] = 2] = "PERSON";
    })(RongIMLib.RTCAPIType || (RongIMLib.RTCAPIType = {}));
    var RTCAPIType = RongIMLib.RTCAPIType;
    (function (ChatroomEntityOpt) {
        ChatroomEntityOpt[ChatroomEntityOpt["UPDATE"] = 1] = "UPDATE";
        ChatroomEntityOpt[ChatroomEntityOpt["DELETE"] = 2] = "DELETE";
    })(RongIMLib.ChatroomEntityOpt || (RongIMLib.ChatroomEntityOpt = {}));
    var ChatroomEntityOpt = RongIMLib.ChatroomEntityOpt;
    (function (ChatroomEntityLimit) {
        ChatroomEntityLimit[ChatroomEntityLimit["KEY"] = 128] = "KEY";
        ChatroomEntityLimit[ChatroomEntityLimit["VALUE"] = 4096] = "VALUE";
    })(RongIMLib.ChatroomEntityLimit || (RongIMLib.ChatroomEntityLimit = {}));
    var ChatroomEntityLimit = RongIMLib.ChatroomEntityLimit;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var RongIMClient = (function () {
        function RongIMClient() {
        }
        RongIMClient.getInstance = function () {
            if (!RongIMClient._instance) {
                throw new Error("RongIMClient is not initialized. Call .init() method first.");
            }
            return RongIMClient._instance;
        };
        RongIMClient.showError = function (errorInfo) {
            var hasConsole = (console && console.error);
            if (hasConsole) {
                console.error(JSON.stringify(errorInfo));
            }
        };
        RongIMClient.logger = function (params) {
            var code = params.code;
            var errorInfo = RongIMClient.LogFactory[code] || params;
            errorInfo.funcName = params.funcName;
            errorInfo.msg = params.msg || errorInfo.msg;
            if (RongIMClient._memoryStore.depend.showError) {
                RongIMClient.showError(errorInfo);
            }
        };
        RongIMClient.logCallback = function (callback, funcName) {
            return {
                onSuccess: callback.onSuccess,
                onError: function (errorCode) {
                    RongIMClient.logger({
                        code: errorCode,
                        funcName: funcName
                    });
                    callback.onError(errorCode);
                }
            };
        };
        ;
        RongIMClient.logSendCallback = function (callback, funcName) {
            return {
                onSuccess: callback.onSuccess,
                onError: function (errorCode, result) {
                    RongIMClient.logger({
                        code: errorCode,
                        funcName: funcName
                    });
                    callback.onError(errorCode, result);
                },
                onBefore: callback.onBefore
            };
        };
        ;
        /**
         * 初始化 SDK，在整个应用全局只需要调用一次。
         * @param appKey    开发者后台申请的 AppKey，用来标识应用。
         * @param dataAccessProvider 必须是DataAccessProvider的实例
         */
        RongIMClient.init = function (appKey, dataAccessProvider, options, callback) {
            RongIMClient.statusListeners = [];
            RongIMClient.messageListeners = [];
            RongIMClient.settingListeners = [];
            RongIMClient.conversationStatusListeners = [];
            if (RongIMClient._instance) {
                return RongIMClient._memoryStore.sdkInfo;
            }
            RongIMClient._instance = new RongIMClient();
            options = options || {};
            var protocol = "http://", wsScheme = 'ws://';
            var isLocationInvalid = typeof location !== 'object'; // 未找到全局 location 变量, 则协议为 https. 比如小程序
            if (isLocationInvalid || location.protocol == 'https:') {
                wsScheme = 'wss://';
                protocol = 'https://';
            }
            var isPolling = false;
            if (typeof WebSocket != 'function') {
                isPolling = true;
            }
            var isIntegrity = function () {
                //iOS 9 
                var hasWS = (typeof WebSocket);
                var integrity = (typeof WebSocket.OPEN == 'number');
                return (hasWS && integrity);
            };
            if (typeof WebSocket == 'object' && isIntegrity()) {
                isPolling = false;
            }
            var supportUserData = function () {
                var element = document.documentElement;
                return element.addBehavior;
            };
            if (RongIMLib.RongUtil.supportLocalStorage()) {
                RongIMClient._storageProvider = new RongIMLib.LocalStorageProvider();
            }
            else if (supportUserData()) {
                RongIMClient._storageProvider = new RongIMLib.UserDataProvider();
            }
            else {
                RongIMClient._storageProvider = new RongIMLib.MemeoryProvider();
            }
            var serverIndex = RongIMClient._storageProvider.getItem('serverIndex');
            RongIMClient.serverStore.index = serverIndex || 0;
            var pathTmpl = '{0}{1}';
            var _serverPath = {
                api: 'api.cn.ronghub.com'
            };
            RongIMLib.RongUtil.forEach(_serverPath, function (path, key) {
                _serverPath[key] = RongIMLib.RongUtil.stringFormat(pathTmpl, [protocol, path]);
            });
            RongIMLib.RongUtil.forEach(_serverPath, function (path, key) {
                var hasProto = (key in options);
                var config = {
                    path: options[key],
                    tmpl: pathTmpl,
                    protocol: protocol,
                    sub: true
                };
                path = hasProto ? RongIMLib.RongUtil.formatProtoclPath(config) : path;
                options[key] = path;
            });
            var navigaters = options.navigaters || [];
            if (options.navi) {
                navigaters = [options.navi];
            }
            if (!options.navi && RongIMLib.RongUtil.isEqual(navigaters.length, 0)) {
                navigaters = ['nav.cn.ronghub.com', 'nav2-cn.ronghub.com'];
            }
            var _sourcePath = {
                protobuf: 'cdn.ronghub.com/protobuf-2.3.9.min.js'
            };
            RongIMLib.RongUtil.forEach(_sourcePath, function (path, key) {
                _sourcePath[key] = RongIMLib.RongUtil.stringFormat(pathTmpl, [protocol, path]);
            });
            RongIMLib.RongUtil.extend(_sourcePath, options);
            var _defaultOpts = {
                isPolling: isPolling,
                wsScheme: wsScheme,
                protocol: protocol,
                showError: true,
                openMp: true,
                snifferTime: 2000,
                naviTimeout: 5000,
                navigaters: navigaters,
                maxNaviRetry: 10,
                isNaviJSONP: false,
                isWSPingJSONP: false,
                isNotifyConversationList: false,
                maxConversationCount: 300,
                cmpUrl: '' // 若传入 cmpUrl, 则优先链接此地址
            };
            delete options.navigaters;
            RongIMLib.RongUtil.extend(_defaultOpts, options);
            if (RongIMLib.RongUtil.isFunction(options.protobuf)) {
                RongIMClient.Protobuf = options.protobuf;
            }
            RongIMClient.userStatusObserver = new RongIMLib.RongObserver();
            var pather = new RongIMLib.FeaturePatcher();
            pather.patchAll();
            var tempStore = {
                token: "",
                callback: null,
                lastReadTime: new RongIMLib.LimitableMap(),
                historyMessageLimit: new RongIMLib.MemoryCache(),
                conversationList: [],
                isFullConversations: false,
                appKey: appKey,
                publicServiceMap: new RongIMLib.PublicServiceMap(),
                providerType: 1,
                deltaTime: 0,
                filterMessages: [],
                isSyncRemoteConverList: true,
                otherDevice: false,
                custStore: {},
                converStore: { latestMessage: {} },
                connectAckTime: 0,
                voipStategy: 0,
                isFirstPingMsg: true,
                depend: options,
                notification: {},
                networkUnavailable: false,
                loggerSwitch: options.loggerSwitch || 'on',
                autoReconnectTimer: null // 自动重连定时器编号
            };
            RongIMClient._memoryStore = tempStore;
            var isCPlusSDK = dataAccessProvider && Object.prototype.toString.call(dataAccessProvider) == "[object Object]";
            if (isCPlusSDK) {
                RongIMClient._dataAccessProvider = dataAccessProvider;
            }
            else {
                RongIMClient._dataAccessProvider = new RongIMLib.ServerDataProvider();
            }
            options.appCallback = callback;
            var sdkInfo = RongIMClient._dataAccessProvider.init(appKey, options);
            RongIMClient._memoryStore.sdkInfo = sdkInfo;
            if (isCPlusSDK) {
                // 兼容 c++ 设置导航，Web 端不生效
                RongIMClient._dataAccessProvider.setServerInfo({ navi: location.protocol + options.navi + '/navi.xml' });
            }
            RongIMClient.MessageParams = {
                TextMessage: { objectName: "RC:TxtMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                ImageMessage: { objectName: "RC:ImgMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                DiscussionNotificationMessage: { objectName: "RC:DizNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                VoiceMessage: { objectName: "RC:VcMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                ReferenceMessage: { objectName: "RC:ReferenceMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                RichContentMessage: { objectName: "RC:ImgTextMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                FileMessage: { objectName: "RC:FileMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                HQVoiceMessage: { objectName: "RC:HQVCMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                GIFMessage: { objectName: "RC:GIFMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                SightMessage: { objectName: "RC:SightMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                HandshakeMessage: { objectName: "", msgTag: new RongIMLib.MessageTag(true, true) },
                UnknownMessage: { objectName: "", msgTag: new RongIMLib.MessageTag(true, true) },
                LocationMessage: { objectName: "RC:LBSMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                InformationNotificationMessage: { objectName: "RC:InfoNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                ContactNotificationMessage: { objectName: "RC:ContactNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                ProfileNotificationMessage: { objectName: "RC:ProfileNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                CommandNotificationMessage: { objectName: "RC:CmdNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                PublicServiceRichContentMessage: { objectName: "RC:PSImgTxtMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                PublicServiceMultiRichContentMessage: { objectName: "RC:PSMultiImgTxtMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                JrmfRedPacketMessage: { objectName: "RCJrmf:RpMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                JrmfRedPacketOpenedMessage: { objectName: "RCJrmf:RpOpendMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                GroupNotificationMessage: { objectName: "RC:GrpNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                CommandMessage: { objectName: "RC:CmdMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                TypingStatusMessage: { objectName: "RC:TypSts", msgTag: new RongIMLib.MessageTag(false, false) },
                PublicServiceCommandMessage: { objectName: "RC:PSCmd", msgTag: new RongIMLib.MessageTag(false, false) },
                RecallCommandMessage: { objectName: "RC:RcCmd", msgTag: new RongIMLib.MessageTag(false, true) },
                SyncReadStatusMessage: { objectName: "RC:SRSMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                ReadReceiptRequestMessage: { objectName: "RC:RRReqMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                ReadReceiptResponseMessage: { objectName: "RC:RRRspMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                ChangeModeResponseMessage: { objectName: "RC:CsChaR", msgTag: new RongIMLib.MessageTag(false, false) },
                ChangeModeMessage: { objectName: "RC:CSCha", msgTag: new RongIMLib.MessageTag(false, false) },
                EvaluateMessage: { objectName: "RC:CsEva", msgTag: new RongIMLib.MessageTag(false, false) },
                CustomerContact: { objectName: "RC:CsContact", msgTag: new RongIMLib.MessageTag(false, false) },
                HandShakeMessage: { objectName: "RC:CsHs", msgTag: new RongIMLib.MessageTag(false, false) },
                HandShakeResponseMessage: { objectName: "RC:CsHsR", msgTag: new RongIMLib.MessageTag(false, false) },
                SuspendMessage: { objectName: "RC:CsSp", msgTag: new RongIMLib.MessageTag(false, false) },
                TerminateMessage: { objectName: "RC:CsEnd", msgTag: new RongIMLib.MessageTag(false, false) },
                CustomerStatusUpdateMessage: { objectName: "RC:CsUpdate", msgTag: new RongIMLib.MessageTag(false, false) },
                ReadReceiptMessage: { objectName: "RC:ReadNtf", msgTag: new RongIMLib.MessageTag(false, false) },
                RCCombineMessage: { objectName: "RC:CombineMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                ChrmKVNotificationMessage: { objectName: 'RC:chrmKVNotiMsg', msgTag: new RongIMLib.MessageTag(false, false) },
                LogCommandMessage: { objectName: 'RC:LogCmdMsg', msgTag: new RongIMLib.MessageTag(false, false) }
            };
            RongIMClient.MessageParams["AcceptMessage"] = { objectName: "RC:VCAccept", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["RingingMessage"] = { objectName: "RC:VCRinging", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["SummaryMessage"] = { objectName: "RC:VCSummary", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["HungupMessage"] = { objectName: "RC:VCHangup", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["InviteMessage"] = { objectName: "RC:VCInvite", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["MediaModifyMessage"] = { objectName: "RC:VCModifyMedia", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["MemberModifyMessage"] = { objectName: "RC:VCModifyMem", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageType = {
                TextMessage: "TextMessage",
                ImageMessage: "ImageMessage",
                ReferenceMessage: "ReferenceMessage",
                DiscussionNotificationMessage: "DiscussionNotificationMessage",
                VoiceMessage: "VoiceMessage",
                RichContentMessage: "RichContentMessage",
                HandshakeMessage: "HandshakeMessage",
                UnknownMessage: "UnknownMessage",
                LocationMessage: "LocationMessage",
                InformationNotificationMessage: "InformationNotificationMessage",
                ContactNotificationMessage: "ContactNotificationMessage",
                ProfileNotificationMessage: "ProfileNotificationMessage",
                CommandNotificationMessage: "CommandNotificationMessage",
                CommandMessage: "CommandMessage",
                TypingStatusMessage: "TypingStatusMessage",
                ChangeModeResponseMessage: "ChangeModeResponseMessage",
                ChangeModeMessage: "ChangeModeMessage",
                EvaluateMessage: "EvaluateMessage",
                HandShakeMessage: "HandShakeMessage",
                HandShakeResponseMessage: "HandShakeResponseMessage",
                SuspendMessage: "SuspendMessage",
                TerminateMessage: "TerminateMessage",
                CustomerContact: "CustomerContact",
                CustomerStatusUpdateMessage: "CustomerStatusUpdateMessage",
                SyncReadStatusMessage: "SyncReadStatusMessage",
                ReadReceiptRequestMessage: "ReadReceiptRequestMessage",
                ReadReceiptResponseMessage: "ReadReceiptResponseMessage",
                FileMessage: 'FileMessage',
                HQVoiceMessage: 'HQVoiceMessage',
                GIFMessage: 'GIFMessage',
                SightMessage: 'SightMessage',
                AcceptMessage: "AcceptMessage",
                RingingMessage: "RingingMessage",
                SummaryMessage: "SummaryMessage",
                HungupMessage: "HungupMessage",
                InviteMessage: "InviteMessage",
                MediaModifyMessage: "MediaModifyMessage",
                MemberModifyMessage: "MemberModifyMessage",
                JrmfRedPacketMessage: "JrmfRedPacketMessage",
                JrmfRedPacketOpenedMessage: "JrmfRedPacketOpenedMessage",
                GroupNotificationMessage: "GroupNotificationMessage",
                PublicServiceRichContentMessage: "PublicServiceRichContentMessage",
                PublicServiceMultiRichContentMessage: "PublicServiceMultiRichContentMessage",
                PublicServiceCommandMessage: "PublicServiceCommandMessage",
                RecallCommandMessage: "RecallCommandMessage",
                ReadReceiptMessage: "ReadReceiptMessage",
                RCCombineMessage: "RCCombineMessage",
                ChrmKVNotificationMessage: 'ChrmKVNotificationMessage',
                LogCommandMessage: 'LogCommandMessage'
            };
            RongIMClient.LogFactory = {
                /**
                 * 个人
                 */
                "-1": {
                    code: "-1",
                    msg: "服务器超时"
                },
                "-2": {
                    code: "-2",
                    msg: "未知原因失败"
                },
                "-3": {
                    code: "-3",
                    msg: "参数错误"
                },
                "-4": {
                    code: "-4",
                    msg: "参数不正确或尚未实例化"
                },
                "25101": {
                    code: "25101",
                    msg: "撤回消息参数错误",
                    desc: "请检查撤回消息参数 https://rongcloud.github.io/websdk-demo/api-test.html"
                },
                "25102": {
                    code: "25101",
                    msg: "只能撤回自发发送的消息"
                },
                "20604": {
                    code: "20604",
                    msg: "发送频率过快",
                    desc: "https://developer.rongcloud.cn/ticket/info/9Q3L6vRKd1cLS7rycA==?type=1"
                },
                "20406": {
                    code: "20406",
                    msg: "被禁言"
                },
                "23407": {
                    code: "23407",
                    msg: "获取用户失败"
                },
                /**
                 * 群组
                 */
                "20407": {
                    code: "20407",
                    msg: "群组Id无效"
                },
                "22408": {
                    code: "22408",
                    msg: "群组被禁言"
                },
                "22406": {
                    code: "22406",
                    msg: "不在群组"
                },
                "35001": {
                    code: "35001",
                    msg: "群组同步异常"
                },
                "35002": {
                    code: "35002",
                    msg: "匹配群信息异常"
                },
                /**
                 * 讨论组
                 */
                "21406": {
                    code: "21406",
                    msg: "不在讨论组"
                },
                "21407": {
                    code: "21407",
                    msg: "加入讨论失败"
                },
                "21408": {
                    code: "21408",
                    msg: "创建讨论组失败"
                },
                "21409": {
                    code: "21409",
                    msg: "设置讨论组邀请状态失败"
                },
                /**
                 * 聊天室
                 */
                "23406": {
                    code: "23406",
                    msg: "不在聊天室"
                },
                "23408": {
                    code: "23408",
                    msg: "聊天室被禁言"
                },
                "23409": {
                    code: "23409",
                    msg: "聊天室中成员被踢出"
                },
                "23410": {
                    code: "23410",
                    msg: "聊天室不存在"
                },
                "23411": {
                    code: "23411",
                    msg: "聊天室成员已满"
                },
                "23412": {
                    code: "23412",
                    msg: "获取聊天室信息参数无效"
                },
                "23413": {
                    code: "23413",
                    msg: "聊天室异常"
                },
                "23414": {
                    code: "23414",
                    msg: "没有打开聊天室消息存储"
                },
                "36001": {
                    code: "36001",
                    msg: "加入聊天室Id为空"
                },
                "36002": {
                    code: "36002",
                    msg: "加入聊天室失败"
                },
                "36003": {
                    code: "36003",
                    msg: "拉取聊天室历史消息失败"
                },
                /**
                 * voip
                 */
                "24001": {
                    code: "24001",
                    msg: "没有注册DeviveId 也就是用户没有登陆"
                },
                "24002": {
                    code: "24002",
                    msg: "用户已经存在"
                },
                "0": {
                    code: "0",
                    msg: "成功"
                },
                "24009": {
                    code: "24009",
                    msg: "没有对应的用户或token"
                },
                "24013": {
                    code: "24013",
                    msg: "voip为空"
                },
                "24010": {
                    code: "24010",
                    msg: "不支持的Voip引擎"
                },
                "24011": {
                    code: "24011",
                    msg: "channelName 是空"
                },
                "24012": {
                    code: "24012",
                    msg: "生成Voipkey失败"
                },
                "24014": {
                    code: "24014",
                    msg: "没有配置voip"
                },
                "24015": {
                    code: "24015",
                    msg: "服务器内部错误"
                },
                "24016": {
                    code: "24016",
                    msg: "VOIP close"
                },
                /**
                 * 通讯、导航
                 */
                "30001": {
                    code: "30001",
                    msg: "通信过程中，当前Socket不存在"
                },
                "30002": {
                    code: "30002",
                    msg: "Socket连接不可用"
                },
                "30003": {
                    code: "30003",
                    msg: "通信超时"
                },
                "30004": {
                    code: "30004",
                    msg: "导航操作时，Http请求失败"
                },
                "30005": {
                    code: "30005",
                    msg: "HTTP请求失败"
                },
                "30006": {
                    code: "30006",
                    msg: "HTTP接收失败"
                },
                "30007": {
                    code: "30007",
                    msg: "导航资源错误"
                },
                "30008": {
                    code: "30008",
                    msg: "没有有效数据"
                },
                "30009": {
                    code: "30009",
                    msg: "不存在有效 IP 地址"
                },
                "30010": {
                    code: "30010",
                    msg: "创建 Socket 失败"
                },
                "30011": {
                    code: "30011",
                    msg: " Socket 被断开"
                },
                "30012": {
                    code: "30012",
                    msg: "PING 操作失败"
                },
                "30013": {
                    code: "30013",
                    msg: "PING 超时"
                },
                "30014": {
                    code: "30014",
                    msg: "消息发送失败"
                },
                "30016": {
                    code: "30016",
                    msg: "消息大小超限，最大 128 KB"
                },
                /**
                 * 连接
                 */
                "31000": {
                    code: "31000",
                    msg: "做 connect 连接时，收到的 ACK 超时"
                },
                "31001": {
                    code: "31001",
                    msg: "参数错误"
                },
                "31002": {
                    code: "31002",
                    msg: "参数错误，App Id 错误"
                },
                "31003": {
                    code: "31003",
                    msg: "服务器不可用"
                },
                "31004": {
                    code: "31004",
                    msg: "Token 错误"
                },
                "31005": {
                    code: "31005",
                    msg: "App Id 与 Token 不匹配"
                },
                "31006": {
                    code: "31006",
                    msg: "重定向，地址错误"
                },
                "31007": {
                    code: "31007",
                    msg: "NAME 与后台注册信息不一致"
                },
                "31008": {
                    code: "31008",
                    msg: "APP 被屏蔽、删除或不存在"
                },
                "31009": {
                    code: "31009",
                    msg: "用户被屏蔽"
                },
                "31010": {
                    code: "31010",
                    msg: "Disconnect，由服务器返回，比如用户互踢"
                },
                "31011": {
                    code: "31011",
                    msg: "Disconnect，由服务器返回，比如用户互踢"
                },
                /**
                 * 协议
                 */
                "32001": {
                    code: "32001",
                    msg: "协议层内部错误。query，上传下载过程中数据错误"
                },
                "32002": {
                    code: "32002",
                    msg: "协议层内部错误"
                },
                /**
                 * BIZ
                 */
                "33001": {
                    code: "33001",
                    msg: "未调用 init 初始化函数"
                },
                "33002": {
                    code: "33002",
                    msg: "数据库初始化失败"
                },
                "33003": {
                    code: "33003",
                    msg: "传入参数无效"
                },
                "33004": {
                    code: "33004",
                    msg: "通道无效"
                },
                "33005": {
                    code: "33005",
                    msg: "重新连接成功"
                },
                "33006": {
                    code: "33006",
                    msg: "连接中，再调用 connect 被拒绝"
                },
                "33007": {
                    code: "33007",
                    msg: "消息漫游服务未开通"
                },
                "33008": {
                    code: "33008",
                    msg: "消息添加失败"
                },
                "33009": {
                    code: "33009",
                    msg: "消息删除失败"
                },
                /**
                 * 会话
                 */
                "34001": {
                    code: "34001",
                    msg: "删除会话失败"
                },
                "34002": {
                    code: "34002",
                    msg: "拉取历史消息失败"
                },
                "34003": {
                    code: "34003",
                    msg: "会话指定异常"
                },
                "34004": {
                    code: "34004",
                    msg: "获取会话未读消息总数失败"
                },
                "34005": {
                    code: "34005",
                    msg: "获取指定会话类型未读消息数异常"
                },
                "34006": {
                    code: "34006",
                    msg: "获取指定用户ID&会话类型未读消息数异常"
                },
                "34007": {
                    code: "34007",
                    msg: "清除会话消息异常"
                },
                "34008": {
                    code: "34008",
                    msg: "获取会话消息异常"
                },
                "34009": {
                    code: "34009",
                    msg: "清除历史消息会话类型不正确"
                },
                "34010": {
                    code: "34010",
                    msg: "清除历史消息失败，请检查传入参数"
                },
                /**
                 * 黑名单异常
                 */
                "37001": {
                    code: "37001",
                    msg: "加入黑名单异常"
                },
                "37002": {
                    code: "37002",
                    msg: "获得指定人员再黑名单中的状态异常"
                },
                "37003": {
                    code: "37003",
                    msg: "移除黑名单异常"
                },
                "405": {
                    code: "405",
                    msg: "在黑名单中"
                },
                /**
                 * 草稿
                 */
                "38001": {
                    code: "38001",
                    msg: "获取草稿失败"
                },
                "38002": {
                    code: "38002",
                    msg: "保存草稿失败"
                },
                "38003": {
                    code: "38003",
                    msg: "删除草稿失败"
                },
                /**
                 * 公众号
                 */
                "39001": {
                    code: "39001",
                    msg: "关注公众号失败"
                },
                /**
                 * 文件
                 */
                "41001": {
                    code: "41001",
                    msg: "文件类型错误"
                },
                "41002": {
                    code: "41002",
                    msg: "获取七牛token失败"
                },
                /**
                 *
                 */
                "51001": {
                    code: "51001",
                    msg: "未安装或未启动插件"
                },
                "51002": {
                    code: "51002",
                    msg: "视频已经存在"
                },
                "51003": {
                    code: "51003",
                    msg: "无效的channelName"
                },
                "51004": {
                    code: "51004",
                    msg: "视频内容为空"
                },
                /**
                 *
                 */
                "61001": {
                    code: "61001",
                    msg: "删除消息数组长度为 0"
                }
            };
            var handler = function (message, uris, callback) {
                var userId = message.senderUserId;
                var _uris = RongIMClient.roomInfo.users[userId].uris || '[]';
                if (RongIMLib.RongUtil.isString(_uris)) {
                    _uris = JSON.parse(_uris);
                }
                var tUris = JSON.parse(JSON.stringify(_uris));
                RongIMLib.RongUtil.forEach(tUris, function (_uri, index) {
                    RongIMLib.RongUtil.forEach(uris, function (uri) {
                        if (uri.uri == _uri.uri) {
                            callback(_uri, uri, _uris, index);
                        }
                    });
                });
                RongIMClient.roomInfo.users[userId].uris = JSON.stringify(_uris);
            };
            var RTCMessage = {
                RTCPublishResourceMessage: function (message, uris) {
                    var userId = message.senderUserId;
                    var user = RongIMClient.roomInfo.users[userId];
                    if (!user) {
                        user = {};
                        RongIMClient.roomInfo.users[userId] = {};
                    }
                    var _uris = user.uris || '[]';
                    if (RongIMLib.RongUtil.isString(_uris)) {
                        _uris = JSON.parse(_uris);
                    }
                    _uris = _uris.concat(uris);
                    RongIMClient.roomInfo.users[userId].uris = JSON.stringify(_uris);
                },
                RTCUnpublishResourceMessage: function (message, uris) {
                    handler(message, uris, function (_uri, uri, _uris, index) {
                        _uris.splice(index, 1);
                    });
                },
                RTCModifyResourceMessage: function (message, uris) {
                    handler(message, uris, function (_uri, uri) {
                        _uri.state = uri.state;
                    });
                },
                RTCUserChangeMessage: function (message) {
                    var content = message.content;
                    var users = content.users;
                    var UserState = {
                        JOINED: 0,
                        LEFT: 1,
                        OFFLINE: 2
                    };
                    RongIMLib.RongUtil.forEach(users, function (user) {
                        var state = user.state;
                        var userId = user.userId;
                        switch (+state) {
                            case UserState.JOINED:
                                RongIMClient.roomInfo.users[userId] = {};
                                break;
                            case UserState.LEFT:
                            case UserState.OFFLINE:
                                delete RongIMClient.roomInfo.users[userId];
                                break;
                        }
                    });
                }
            };
            RongIMClient.RTCInnerListener = function (message) {
                var func = RTCMessage[message.messageType] || function () { };
                var content = message.content;
                var uris = content.uris;
                func(message, uris);
            };
            RongIMClient.Conversation = RongIMClient._dataAccessProvider.Conversation;
            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_INIT_O, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                    appKey: appKey
                } });
            return sdkInfo;
        };
        ;
        RongIMClient.setProtocol = function (protocol) {
            RongIMClient._memoryStore.depend = RongIMClient._memoryStore.depend || {};
            var HttpProtocol = RongIMClient.HttpProtocol;
            var WsProtocol = RongIMClient.WsProtocol;
            if (protocol === HttpProtocol.http) {
                RongIMClient._memoryStore.depend.protocol = HttpProtocol.http;
                RongIMClient._memoryStore.depend.wsScheme = WsProtocol.ws;
            }
            else {
                RongIMClient._memoryStore.depend.protocol = HttpProtocol.https;
                RongIMClient._memoryStore.depend.wsScheme = WsProtocol.wss;
            }
        };
        RongIMClient.getProtocol = function () {
            RongIMClient._memoryStore.depend = RongIMClient._memoryStore.depend || {};
            var depend = RongIMClient._memoryStore.depend;
            var protocol = depend.protocol, wsScheme = depend.wsScheme;
            if (!protocol || !wsScheme) {
                protocol = RongIMClient.HttpProtocol.https;
                wsScheme = RongIMClient.WsProtocol.wss;
            }
            return {
                protocol: protocol,
                wsScheme: wsScheme
            };
        };
        /**
            var config = {
                appkey: appkey,
                token: token,
                dataAccessProvider:dataAccessProvider,
                opts: opts
            };
            callback(_instance, userId);
        */
        RongIMClient.initApp = function (config, callback) {
            RongIMClient.init(config.appkey, config.dataAccessProvider, config.opts, function () {
                var instance = RongIMClient._instance;
                //备用
                var error = null;
                callback(error, instance);
            });
        };
        /**
         * 连接服务器，在整个应用全局只需要调用一次，断线后 SDK 会自动重连。
         *
         * @param token     从服务端获取的用户身份令牌（Token）。
         * @param callback  连接回调，返回连接的成功或者失败状态。
         */
        RongIMClient.connect = function (token, _callback, userId, serverConf) {
            RongIMLib.CheckParam.getInstance().check(["string", "object", "string|null|object|global|undefined", "object|null|global|undefined"], "connect", true, arguments);
            if (RongIMLib.IMHandler.isIncludeNavi(token)) {
                var protocol = RongIMClient._memoryStore.depend.protocol;
                var currentNavs = RongIMClient._memoryStore.depend.navigaters;
                var navList = RongIMLib.IMHandler.getNavsByToken(token, protocol);
                token = RongIMLib.IMHandler.getToken(token);
                RongIMClient._memoryStore.depend.navigaters = RongIMLib.RongUtil.concat(navList, currentNavs, true);
            }
            var connectCallback = {
                onSuccess: _callback.onSuccess,
                onTokenIncorrect: _callback.onTokenIncorrect,
                onError: function (errorCode) {
                    RongIMClient.logger({
                        code: errorCode,
                        funcName: "connect"
                    });
                    _callback.onError(errorCode);
                }
            };
            RongIMClient._dataAccessProvider.connect(token, connectCallback, userId, serverConf);
        };
        RongIMClient.reconnect = function (callback, config) {
            var connectCallback = {
                onSuccess: callback.onSuccess,
                onTokenIncorrect: callback.onTokenIncorrect,
                onError: function (errorCode) {
                    RongIMClient.logger({
                        code: errorCode,
                        funcName: "connect"
                    });
                    callback.onError(errorCode);
                }
            };
            RongIMClient._dataAccessProvider.reconnect(connectCallback, config);
        };
        /**
         * 注册消息类型，用于注册用户自定义的消息。
         * 内建的消息类型已经注册过，不需要再次注册。
         * 自定义消息声明需放在执行顺序最高的位置（在RongIMClient.init(appkey)之后即可）
         * @param objectName  消息内置名称
         */
        RongIMClient.registerMessageType = function (messageType, objectName, messageTag, messageContent, searchProps) {
            RongIMClient._dataAccessProvider.registerMessageType(messageType, objectName, messageTag, messageContent, searchProps);
            RongIMClient.RegisterMessage[messageType].messageName = messageType;
            RongIMClient.MessageType[messageType] = messageType;
            RongIMClient.MessageParams[messageType] = { objectName: objectName, msgTag: messageTag };
        };
        RongIMClient.prototype.registerMessageTypes = function (types) {
            types = types || {};
            RongIMClient._dataAccessProvider.registerMessageTypes(types);
        };
        /**
         * 设置连接状态变化的监听器。
         *
         * @param listener  连接状态变化的监听器。
         */
        RongIMClient.setConnectionStatusListener = function (listener) {
            if (RongIMClient._dataAccessProvider) {
                RongIMClient._dataAccessProvider.setConnectionStatusListener(listener);
            }
            else {
                if (RongIMLib.RongUtil.isObject(listener) && RongIMLib.RongUtil.isFunction(listener.onChanged)) {
                    RongIMClient.statusListeners.push(listener.onChanged);
                }
            }
        };
        RongIMClient.setConversationStatusListener = function (listener) {
            if (listener && listener.onChanged && RongIMLib.RongUtil.isFunction(listener.onChanged)) {
                RongIMClient.conversationStatusListeners.push(listener.onChanged);
            }
        };
        RongIMClient.statusWatch = function (watcher) {
            if (RongIMLib.RongUtil.isFunction(watcher)) {
                RongIMClient.statusListeners.push(watcher);
            }
        };
        RongIMClient.watch = function (watchers) {
            watchers = watchers || {};
            var setting = watchers.setting;
            if (RongIMLib.RongUtil.isFunction(setting)) {
                RongIMClient.settingListeners.push(setting);
            }
        };
        /**
         * 设置接收消息的监听器。
         *
         * @param listener  接收消息的监听器。
         */
        RongIMClient.setOnReceiveMessageListener = function (listener) {
            if (RongIMClient._dataAccessProvider) {
                RongIMClient._dataAccessProvider.setOnReceiveMessageListener(listener);
            }
            else {
                if (RongIMLib.RongUtil.isObject(listener) && RongIMLib.RongUtil.isFunction(listener.onReceived)) {
                    RongIMClient.messageListeners.push(listener.onReceived);
                }
            }
        };
        /**
         * 清理所有连接相关的变量
         */
        RongIMClient.prototype.logout = function () {
            RongIMClient._dataAccessProvider.logout();
        };
        /**
         * 断开连接。
         */
        RongIMClient.prototype.disconnect = function () {
            RongIMClient._dataAccessProvider.disconnect();
            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_DISC_O, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM });
        };
        RongIMClient.prototype.startCustomService = function (custId, callback, content) {
            if (!custId || !callback)
                return;
            var msg = new RongIMLib.HandShakeMessage(content);
            var me = this;
            RongIMLib.RongIMClient._memoryStore.custStore["isInit"] = true;
            RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.CUSTOMER_SERVICE, custId, msg, {
                onSuccess: function (data) {
                    if (data.isBlack) {
                        callback.onError();
                        me.stopCustomeService(custId, {
                            onSuccess: function () { },
                            onError: function () { }
                        });
                    }
                    else {
                        callback.onSuccess();
                    }
                },
                onError: function () {
                    callback.onError();
                },
                onBefore: function () { }
            });
        };
        RongIMClient.prototype.stopCustomeService = function (custId, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.SuspendMessage({ sid: session.sid, uid: session.uid, pid: session.pid });
            this.sendCustMessage(custId, msg, {
                onSuccess: function () {
                    // delete RongIMClient._memoryStore.custStore[custId];
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError();
                    });
                }
            });
        };
        RongIMClient.prototype.switchToHumanMode = function (custId, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.ChangeModeMessage({ sid: session.sid, uid: session.uid, pid: session.pid });
            this.sendCustMessage(custId, msg, callback);
        };
        RongIMClient.prototype.evaluateRebotCustomService = function (custId, isRobotResolved, sugest, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.EvaluateMessage({ sid: session.sid, uid: session.uid, pid: session.pid, isRobotResolved: isRobotResolved, sugest: sugest, type: 0 });
            this.sendCustMessage(custId, msg, callback);
        };
        RongIMClient.prototype.evaluateHumanCustomService = function (custId, humanValue, sugest, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.EvaluateMessage({ sid: session.sid, uid: session.uid, pid: session.pid, humanValue: humanValue, sugest: sugest, type: 1 });
            this.sendCustMessage(custId, msg, callback);
        };
        RongIMClient.prototype.sendCustMessage = function (custId, msg, callback) {
            RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.CUSTOMER_SERVICE, custId, msg, {
                onSuccess: function (data) {
                    callback.onSuccess();
                },
                onError: function () {
                    callback.onError();
                },
                onBefore: function () { }
            });
        };
        /**
         * 获取当前连接的状态。
         */
        RongIMClient.prototype.getCurrentConnectionStatus = function () {
            return RongIMClient._dataAccessProvider.getCurrentConnectionStatus();
        };
        /**
         * 获取当前使用的连接通道。
         */
        RongIMClient.prototype.getConnectionChannel = function () {
            if (RongIMLib.Transportations._TransportType == RongIMLib.Socket.XHR_POLLING) {
                return RongIMLib.ConnectionChannel.XHR_POLLING;
            }
            else if (RongIMLib.Transportations._TransportType == RongIMLib.Socket.WEBSOCKET) {
                return RongIMLib.ConnectionChannel.WEBSOCKET;
            }
        };
        /**
         * 获取当前使用的本地储存提供者。 TODO
         */
        RongIMClient.prototype.getStorageProvider = function () {
            if (RongIMClient._memoryStore.providerType == 1) {
                return "ServerDataProvider";
            }
            else {
                return "OtherDataProvider";
            }
        };
        /**
         * 过滤聊天室消息（拉取最近聊天消息）
         * @param {string[]} msgFilterNames
         */
        RongIMClient.prototype.setFilterMessages = function (msgFilterNames) {
            if (Object.prototype.toString.call(msgFilterNames) == "[object Array]") {
                RongIMClient._memoryStore.filterMessages = msgFilterNames;
            }
        };
        RongIMClient.prototype.getAgoraDynamicKey = function (engineType, channelName, callback) {
            RongIMClient._dataAccessProvider.getAgoraDynamicKey(engineType, channelName, callback);
        };
        /**
         * 获取当前连接用户的 UserId。
         */
        RongIMClient.prototype.getCurrentUserId = function () {
            return RongIMLib.Bridge._client.userId;
        };
        /**
         * 获取服务器时间与本地时间的差值，单位为毫秒。
         * 计算公式：差值 = 本地时间毫秒数 - 服务器时间毫秒数
         * @param callback  获取的回调，返回差值。
         */
        RongIMClient.prototype.getDeltaTime = function () {
            return RongIMClient._dataAccessProvider.getDelaTime();
        };
        // #region Message
        RongIMClient.prototype.getMessage = function (messageId, callback) {
            RongIMClient._dataAccessProvider.getMessage(messageId, RongIMClient.logCallback(callback, "getMessage"));
        };
        RongIMClient.prototype.deleteLocalMessages = function (conversationType, targetId, messageIds, callback) {
            RongIMClient._dataAccessProvider.removeLocalMessage(conversationType, targetId, messageIds, RongIMClient.logCallback(callback, "deleteLocalMessages"));
        };
        RongIMClient.prototype.updateMessage = function (message, callback) {
            RongIMClient._dataAccessProvider.updateMessage(message, RongIMClient.logCallback(callback, "updateMessage"));
        };
        RongIMClient.prototype.clearData = function () {
            return RongIMClient._dataAccessProvider.clearData();
        };
        RongIMClient.prototype.clearMessages = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.clearMessages(conversationType, targetId, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "clearMessages"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        /**TODO 清楚本地存储的未读消息，目前清空内存中的未读消息
         * [clearMessagesUnreadStatus 清空指定会话未读消息]
         * @param  {ConversationType}        conversationType [会话类型]
         * @param  {string}                  targetId         [用户id]
         * @param  {ResultCallback<boolean>} callback         [返回值，参数回调]
         */
        RongIMClient.prototype.clearMessagesUnreadStatus = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.updateMessages(conversationType, targetId, "readStatus", null, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "clearMessagesUnreadStatus"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        // deleteRemoteMessages(conversationType: ConversationType, targetId: string, delMsgs: DeleteMessage[], callback: ResultCallback<boolean>) {
        //     CheckParam.getInstance().check(["number", "string|number", "array", "object"], "deleteRemoteMessages", false, arguments);
        //     if (delMsgs.length == 0) {
        //         var errorCode = ErrorCode.DELETE_MESSAGE_ID_IS_NULL;
        //         RongIMClient.logger({
        //             code: errorCode,
        //             funcName: "deleteRemoteMessages"
        //         });
        //         callback.onError(ErrorCode.DELETE_MESSAGE_ID_IS_NULL);
        //         return;
        //     } else if (delMsgs.length > 100) {
        //         delMsgs.length = 100;
        //     }
        //     // 后续增加，去掉注释即可
        //     callback.onSuccess(true);
        //     // var modules = new RongIMClient.Protobuf.DeleteMsgInput();
        //     // modules.setType(conversationType);
        //     // modules.setConversationId(targetId);
        //     // modules.setMsgs(delMsgs);
        //     // RongIMClient.bridge.queryMsg(33, MessageUtil.ArrayForm(modules.toArrayBuffer()), Bridge._client.userId, {
        //     //     onSuccess: function(info: any) {
        //     //         callback.onSuccess(true);
        //     //     },
        //     //     onError: function(err: any) {
        //     //         callback.onError(err);
        //     //     }
        //     // }, "DeleteMsgOutput");
        // }
        /**
         * [deleteMessages 删除消息记录。]
         * @param  {ConversationType}        conversationType [description]
         * @param  {string}                  targetId         [description]
         * @param  {number[]}                messageIds       [description]
         * @param  {ResultCallback<boolean>} callback         [description]
         */
        RongIMClient.prototype.deleteMessages = function (conversationType, targetId, messages, callback) {
            RongIMClient._dataAccessProvider.removeMessage(conversationType, targetId, messages, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "deleteMessages"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.sendLocalMessage = function (message, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "sendLocalMessage", false, arguments);
            RongIMClient._dataAccessProvider.updateMessage(message);
            this.sendMessage(message.conversationType, message.targetId, message.content, RongIMClient.logSendCallback(callback, "sendLocalMessage"));
        };
        RongIMClient.prototype.getPullSetting = function (callback, version) {
            RongIMClient._dataAccessProvider.getPullSetting(callback, version);
        };
        RongIMClient.prototype.setOfflineMessageDuration = function (duration, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "object"], "setOfflineMessageDuration", true, arguments);
            RongIMClient._dataAccessProvider.setOfflineMessageDuration(duration, callback);
        };
        /**
         * [sendMessage 发送消息。]
         * @param  {ConversationType}        conversationType [会话类型]
         * @param  {string}                  targetId         [目标Id]
         * @param  {MessageContent}          messageContent   [消息类型]
         * @param  {SendMessageCallback}     sendCallback     []
         * @param  {ResultCallback<Message>} resultCallback   [返回值，函数回调]
         * @param  {string}                  pushContent      []
         * @param  {string}                  pushData         []
         */
        RongIMClient.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType, params) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "object", "object", "undefined|object|null|global|boolean", "undefined|object|null|global|string", "undefined|object|null|global|string", "undefined|object|null|global|number", "undefined|object|null|global|boolean"], "sendMessage", false, arguments);
            if (!RongIMLib.RongUtil.isString(targetId)) {
                return sendCallback.onError(RongIMLib.ErrorCode.PARAMETER_ERROR);
            }
            RongIMClient._dataAccessProvider.sendMessage(conversationType, targetId, messageContent, RongIMClient.logSendCallback(sendCallback, "sendMessage"), mentiondMsg, pushText, appData, methodType, params);
        };
        RongIMClient.prototype.setConversationStatus = function (type, targetId, statusItem, callback) {
            RongIMClient._dataAccessProvider.setConversationStatus(type, targetId, statusItem, callback);
        };
        RongIMClient.prototype.sendReceiptResponse = function (conversationType, targetId, sendCallback) {
            RongIMClient._dataAccessProvider.sendReceiptResponse(conversationType, targetId, RongIMClient.logSendCallback(sendCallback, "sendReceiptResponse"));
        };
        RongIMClient.prototype.sendTypingStatusMessage = function (conversationType, targetId, messageName, sendCallback) {
            RongIMClient._dataAccessProvider.sendTypingStatusMessage(conversationType, targetId, messageName, RongIMClient.logSendCallback(sendCallback, "sendTypingStatusMessage"));
        };
        /**
         * [sendStatusMessage description]
         * @param  {MessageContent}          messageContent [description]
         * @param  {SendMessageCallback}     sendCallback   [description]
         * @param  {ResultCallback<Message>} resultCallback [description]
         */
        RongIMClient.prototype.sendStatusMessage = function (messageContent, sendCallback, resultCallback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [sendTextMessage 发送TextMessage快捷方式]
         * @param  {string}                  content        [消息内容]
         * @param  {ResultCallback<Message>} resultCallback [返回值，参数回调]
         */
        RongIMClient.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
            RongIMClient._dataAccessProvider.sendTextMessage(conversationType, targetId, content, RongIMClient.logSendCallback(sendMessageCallback, "sendTextMessage"));
        };
        RongIMClient.prototype.sendRecallMessage = function (content, sendMessageCallback, params) {
            var callback = RongIMClient.logSendCallback(sendMessageCallback, "sendRecallMessage");
            var senderUserId = content.senderUserId;
            var userId = RongIMLib.Bridge._client.userId;
            var isOther = (senderUserId != userId);
            if (isOther) {
                var callback = RongIMClient.logSendCallback(sendMessageCallback, "sendRecallMessage");
                callback.onError(RongIMLib.ErrorCode.RECALL_MESSAGE, content);
                return;
            }
            RongIMClient._dataAccessProvider.sendRecallMessage(content, callback, params);
        };
        /**
         * [insertMessage 向本地插入一条消息，不发送到服务器。]
         * @param  {ConversationType}        conversationType [description]
         * @param  {string}                  targetId         [description]
         * @param  {string}                  senderUserId     [description]
         * @param  {MessageContent}          content          [description]
         * @param  {ResultCallback<Message>} callback         [description]
         */
        RongIMClient.prototype.insertMessage = function (conversationType, targetId, content, callback) {
            RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, content, RongIMClient.logCallback(callback, "insertMessage"));
        };
        RongIMClient.prototype.setMessageContent = function (messageId, content, objectName) {
            RongIMClient._dataAccessProvider.setMessageContent(messageId, content, objectName);
        };
        ;
        RongIMClient.prototype.setMessageSearchField = function (messageId, content, searchFiles) {
            RongIMClient._dataAccessProvider.setMessageSearchField(messageId, content, searchFiles);
        };
        ;
        /**
         * [getHistoryMessages 拉取历史消息记录。]
         * @param  {ConversationType}          conversationType [会话类型]
         * @param  {string}                    targetId         [用户Id]
         * @param  {number|null}               pullMessageTime  [拉取历史消息起始位置(格式为毫秒数)，可以为null]
         * @param  {number}                    count            [历史消息数量]
         * @param  {ResultCallback<Message[]>} callback         [回调函数]
         * @param  {string}                    objectName       [objectName]
         */
        RongIMClient.prototype.getHistoryMessages = function (conversationType, targetId, timestamp, count, callback, objectname, order) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "number|null|global|object", "number", "object", "undefined|object|null|global|string", "number|null|global|object"], "getHistoryMessages", false, arguments);
            if (count > 20) {
                throw new Error("HistroyMessage count must be less than or equal to 20!");
            }
            if (conversationType.valueOf() < 0) {
                throw new Error("ConversationType must be greater than -1");
            }
            RongIMClient._dataAccessProvider.getHistoryMessages(conversationType, targetId, timestamp, count, RongIMClient.logCallback(callback, "getHistoryMessages"), objectname, order);
        };
        /**
         * [getRemoteHistoryMessages 拉取某个时间戳之前的消息]
         * @param  {ConversationType}          conversationType [description]
         * @param  {string}                    targetId         [description]
         * @param  {Date}                      dateTime         [description]
         * @param  {number}                    count            [description]
         * @param  {ResultCallback<Message[]>} callback         [description]
         */
        RongIMClient.prototype.getRemoteHistoryMessages = function (conversationType, targetId, timestamp, count, callback, config) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "number|null|global|object", "number", "object", "undefined|null|global|object"], "getRemoteHistoryMessages", false, arguments);
            var funcName = "getRemoteHistoryMessages";
            var log = {
                errorCode: RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR,
                funcName: "getRemoteHistoryMessages"
            };
            if (count > 20) {
                RongIMClient.logger(log);
                callback.onError(RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR);
                return;
            }
            if (conversationType.valueOf() < 0) {
                RongIMClient.logger(log);
                callback.onError(RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR);
                return;
            }
            RongIMClient._dataAccessProvider.getRemoteHistoryMessages(conversationType, targetId, timestamp, count, RongIMClient.logCallback(callback, funcName), config);
        };
        RongIMClient.prototype.clearHistoryMessages = function (params, callback) {
            RongIMClient._dataAccessProvider.clearHistoryMessages(params, callback);
        };
        RongIMClient.prototype.clearRemoteHistoryMessages = function (params, callback) {
            RongIMClient._dataAccessProvider.clearRemoteHistoryMessages(params, RongIMClient.logCallback(callback, "clearRemoteHistoryMessages"));
        };
        RongIMClient.prototype.deleteRemoteMessages = function (conversationType, targetId, messages, callback) {
            RongIMClient._dataAccessProvider.deleteRemoteMessages(conversationType, targetId, messages, RongIMClient.logCallback(callback, "deleteRemoteMessages"));
        };
        /**
         * [hasRemoteUnreadMessages 是否有未接收的消息，jsonp方法]
         * @param  {string}          appkey   [appkey]
         * @param  {string}          token    [token]
         * @param  {ConnectCallback} callback [返回值，参数回调]
         */
        RongIMClient.prototype.hasRemoteUnreadMessages = function (token, callback) {
            RongIMClient._dataAccessProvider.hasRemoteUnreadMessages(token, RongIMClient.logCallback(callback, "hasRemoteUnreadMessages"));
        };
        RongIMClient.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
            return RongIMClient._dataAccessProvider.getTotalUnreadCount({
                onSuccess: function (count) {
                    setTimeout(function () {
                        callback.onSuccess(count);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "getTotalUnreadCount"
                        });
                        callback.onError(errorCode);
                    });
                }
            }, conversationTypes);
        };
        /**
         * [getConversationUnreadCount 指定多种会话类型获取未读消息数]
         * @param  {ResultCallback<number>} callback             [返回值，参数回调。]
         * @param  {ConversationType[]}     ...conversationTypes [会话类型。]
         */
        RongIMClient.prototype.getConversationUnreadCount = function (conversationTypes, callback) {
            RongIMClient._dataAccessProvider.getConversationUnreadCount(conversationTypes, {
                onSuccess: function (count) {
                    setTimeout(function () {
                        callback.onSuccess(count);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "getConversationUnreadCount"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        /**
         * [getUnreadCount 指定用户、会话类型的未读消息总数。]
         * @param  {ConversationType} conversationType [会话类型]
         * @param  {string}           targetId         [用户Id]
         */
        RongIMClient.prototype.getUnreadCount = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.getUnreadCount(conversationType, targetId, {
                onSuccess: function (count) {
                    setTimeout(function () {
                        callback.onSuccess(count);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "getUnreadCount"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.setUnreadCount = function (conversationType, targetId, count) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "number"], "setUnreadCount", false, arguments);
            RongIMClient._dataAccessProvider.setUnreadCount(conversationType, targetId, count);
        };
        RongIMClient.prototype.clearUnreadCountByTimestamp = function (conversationType, targetId, timestamp, callback) {
            RongIMClient._dataAccessProvider.clearUnreadCountByTimestamp(conversationType, targetId, timestamp, RongIMClient.logCallback(callback, "clearUnreadCountByTimestamp"));
        };
        /**
         * 清楚会话未读消息数
         * @param  {ConversationType}        conversationType 会话类型
         * @param  {string}                  targetId         目标Id
         * @param  {ResultCallback<boolean>} callback         返回值，函数回调
         */
        RongIMClient.prototype.clearUnreadCount = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.clearUnreadCount(conversationType, targetId, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "clearUnreadCount"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.clearTotalUnreadCount = function (callback) {
            RongIMClient._dataAccessProvider.clearTotalUnreadCount({
                onSuccess: function (bool) {
                    callback.onSuccess(bool);
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: 'clearTotalUnreadCount'
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.clearLocalStorage = function (callback) {
            RongIMClient._storageProvider.clearItem();
            callback();
        };
        RongIMClient.prototype.setMessageExtra = function (messageId, value, callback) {
            RongIMClient._dataAccessProvider.setMessageExtra(messageId, value, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "setMessageExtra"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.setMessageReceivedStatus = function (messageUId, receivedStatus, callback) {
            RongIMClient._dataAccessProvider.setMessageReceivedStatus(messageUId, receivedStatus, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "setMessageReceivedStatus"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.setMessageStatus = function (conersationType, targetId, timestamp, status, callback) {
            RongIMClient._dataAccessProvider.setMessageStatus(conersationType, targetId, timestamp, status, RongIMClient.logCallback(callback, "setMessageStatus"));
        };
        RongIMClient.prototype.setMessageSentStatus = function (messageId, sentStatus, callback) {
            RongIMClient._dataAccessProvider.setMessageSentStatus(messageId, sentStatus, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "setMessageSentStatus"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        // #endregion Message
        // #region TextMessage Draft
        /**
         * clearTextMessageDraft 清除指定会话和消息类型的草稿。
         * @param  {ConversationType}        conversationType 会话类型
         * @param  {string}                  targetId         目标Id
         */
        RongIMClient.prototype.clearTextMessageDraft = function (conversationType, targetId) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "clearTextMessageDraft", false, arguments);
            var key = "darf_" + conversationType + "_" + targetId;
            delete RongIMClient._memoryStore[key];
            return true;
        };
        /**
         * [getTextMessageDraft 获取指定消息和会话的草稿。]
         * @param  {ConversationType}       conversationType [会话类型]
         * @param  {string}                 targetId         [目标Id]
         */
        RongIMClient.prototype.getTextMessageDraft = function (conversationType, targetId) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "getTextMessageDraft", false, arguments);
            if (targetId == "" || conversationType < 0) {
                throw new Error("params error : " + RongIMLib.ErrorCode.DRAF_GET_ERROR);
            }
            var key = "darf_" + conversationType + "_" + targetId;
            return RongIMClient._memoryStore[key];
        };
        /**
         * [saveTextMessageDraft description]
         * @param  {ConversationType}        conversationType [会话类型]
         * @param  {string}                  targetId         [目标Id]
         * @param  {string}                  value            [草稿值]
         */
        RongIMClient.prototype.saveTextMessageDraft = function (conversationType, targetId, value) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "string", "object"], "saveTextMessageDraft", false, arguments);
            var key = "darf_" + conversationType + "_" + targetId;
            RongIMClient._memoryStore[key] = value;
            return true;
        };
        // #endregion TextMessage Draft
        // #region Conversation
        RongIMClient.prototype.searchConversationByContent = function (keyword, callback, conversationTypes) {
            RongIMClient._dataAccessProvider.searchConversationByContent(keyword, RongIMClient.logCallback(callback, "searchConversationByContent"), conversationTypes);
        };
        RongIMClient.prototype.searchMessageByContent = function (conversationType, targetId, keyword, timestamp, count, total, callback) {
            RongIMClient._dataAccessProvider.searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total, RongIMClient.logCallback(callback, "searchMessageByContent"));
        };
        RongIMClient.prototype.clearCache = function () {
            RongIMClient._dataAccessProvider.clearCache();
        };
        RongIMClient.prototype.clearConversations = function (callback) {
            var conversationTypes = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                conversationTypes[_i - 1] = arguments[_i];
            }
            if (conversationTypes.length == 0) {
                conversationTypes = [RongIMLib.ConversationType.CHATROOM,
                    RongIMLib.ConversationType.CUSTOMER_SERVICE,
                    RongIMLib.ConversationType.DISCUSSION,
                    RongIMLib.ConversationType.GROUP,
                    RongIMLib.ConversationType.PRIVATE,
                    RongIMLib.ConversationType.SYSTEM,
                    RongIMLib.ConversationType.PUBLIC_SERVICE,
                    RongIMLib.ConversationType.APP_PUBLIC_SERVICE];
            }
            RongIMClient._dataAccessProvider.clearConversations(conversationTypes, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "clearConversations"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        /**
         * [getConversation 获取指定会话，此方法需在getConversationList之后执行]
         * @param  {ConversationType}             conversationType [会话类型]
         * @param  {string}                       targetId         [目标Id]
         * @param  {ResultCallback<Conversation>} callback         [返回值，函数回调]
         */
        RongIMClient.prototype.getConversation = function (conversationType, targetId, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "getConversation", false, arguments);
            RongIMClient._dataAccessProvider.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    setTimeout(function () {
                        callback.onSuccess(conver);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: error,
                            funcName: "getConversation"
                        });
                        callback.onError(error);
                    });
                }
            });
        };
        /**
         * [pottingConversation 组装会话列表]
         * @param {any} tempConver [临时会话]
         * conver_conversationType_targetId_no.
         * msg_conversationType_targetId_no.
         */
        RongIMClient.prototype.pottingConversation = function (tempConver) {
            var self = this, isUseReplace = false;
            RongIMClient._dataAccessProvider.getConversation(tempConver.type, tempConver.userId, {
                onSuccess: function (conver) {
                    if (!conver) {
                        conver = new RongIMLib.Conversation();
                    }
                    else {
                        isUseReplace = true;
                    }
                    conver.conversationType = tempConver.type;
                    conver.targetId = tempConver.userId;
                    if (tempConver.msg) {
                        conver.latestMessage = RongIMLib.MessageUtil.messageParser(tempConver.msg);
                        conver.latestMessageId = conver.latestMessage.messageId;
                        conver.objectName = conver.latestMessage.objectName;
                        conver.receivedStatus = conver.latestMessage.receivedStatus;
                        conver.receivedTime = conver.latestMessage.receiveTime;
                        conver.sentStatus = conver.latestMessage.sentStatus;
                        conver.sentTime = conver.latestMessage.sentTime;
                    }
                    var mentioneds = RongIMClient._storageProvider.getItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conver.conversationType + '_' + conver.targetId);
                    if (mentioneds) {
                        var info = JSON.parse(mentioneds);
                        conver.mentionedMsg = info[tempConver.type + "_" + tempConver.userId];
                    }
                    if (!isUseReplace) {
                        if (RongIMLib.RongUtil.supportLocalStorage()) {
                            // var count = RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + tempConver.type + tempConver.userId);
                            conver.unreadMessageCount = RongIMLib.UnreadCountHandler.get(tempConver.type, tempConver.userId);
                        }
                        else {
                            conver.unreadMessageCount = 0;
                        }
                    }
                    if (conver.conversationType == RongIMLib.ConversationType.DISCUSSION) {
                        self.getDiscussion(tempConver.userId, {
                            onSuccess: function (info) {
                                conver.conversationTitle = info.name;
                            },
                            onError: function (error) { }
                        });
                    }
                    var status = RongIMClient._dataAccessProvider.conversationStatusManager.get(tempConver.type, tempConver.userId);
                    conver.notificationStatus = status.notificationStatus;
                    conver.isTop = status.isTop;
                    RongIMClient._dataAccessProvider.addConversation(conver, { onSuccess: function (data) { } });
                },
                onError: function (error) { }
            });
        };
        RongIMClient.prototype.addConversation = function (conversation, callback) {
            RongIMClient._dataAccessProvider.addConversation(conversation, callback);
        };
        RongIMClient.prototype.sortConversationList = function (conversationList) {
            var convers = [];
            for (var i = 0, len = conversationList.length; i < len; i++) {
                if (!conversationList[i]) {
                    continue;
                }
                if (conversationList[i].isTop) {
                    convers.push(conversationList[i]);
                    conversationList.splice(i, 1);
                    continue;
                }
                for (var j = 0; j < len - i - 1; j++) {
                    if (conversationList[j].sentTime < conversationList[j + 1].sentTime) {
                        var swap = conversationList[j];
                        conversationList[j] = conversationList[j + 1];
                        conversationList[j + 1] = swap;
                    }
                }
            }
            return RongIMClient._memoryStore.conversationList = convers.concat(conversationList);
        };
        RongIMClient.prototype.getConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            RongIMLib.CheckParam.getInstance().check(["object", "null|undefined|array|object|global", "number|undefined|null|object|global", "boolean|undefined|null|object|global"], "getConversationList", false, arguments);
            var me = this;
            RongIMClient._dataAccessProvider.getConversationList({
                onSuccess: function (data) {
                    if (conversationTypes || RongIMClient._dataAccessProvider) {
                        setTimeout(function () {
                            callback.onSuccess(data);
                        });
                    }
                    else {
                        setTimeout(function () {
                            callback.onSuccess(RongIMClient._memoryStore.conversationList);
                        });
                    }
                },
                onError: function (error) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: error,
                            funcName: "getConversationList"
                        });
                        callback.onError(error);
                    });
                }
            }, conversationTypes, count, isGetHiddenConvers);
        };
        RongIMClient.prototype.getRemoteConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            RongIMLib.CheckParam.getInstance().check(["object", "null|array|object|global", "number|undefined|null|object|global", "boolean|undefined|null|object|global"], "getRemoteConversationList", false, arguments);
            RongIMClient._dataAccessProvider.getRemoteConversationList(RongIMClient.logCallback(callback, "getRemoteConversationList"), conversationTypes, count, isGetHiddenConvers);
        };
        RongIMClient.prototype.updateConversation = function (conversation) {
            return RongIMClient._dataAccessProvider.updateConversation(conversation);
        };
        /**
         * [createConversation 创建会话。]
         * @param  {number}  conversationType [会话类型]
         * @param  {string}  targetId         [目标Id]
         * @param  {string}  converTitle      [会话标题]
         * @param  {boolean} islocal          [是否同步到服务器，ture：同步，false:不同步]
         */
        RongIMClient.prototype.createConversation = function (conversationType, targetId, converTitle) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "string"], "createConversation", false, arguments);
            var conver = new RongIMLib.Conversation();
            // var unreadContent: string = RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + conversationType + targetId);
            // var unreadCount = Number(unreadContent) || 0;
            conver.targetId = targetId;
            conver.conversationType = conversationType;
            conver.conversationTitle = converTitle;
            conver.latestMessage = {};
            conver.unreadMessageCount = 0;
            return conver;
        };
        //TODO 删除本地和服务器、删除本地和服务器分开
        RongIMClient.prototype.removeConversation = function (conversationType, targetId, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "removeConversation", false, arguments);
            RongIMClient._dataAccessProvider.removeConversation(conversationType, targetId, RongIMClient.logCallback(callback, "removeConversation"));
        };
        RongIMClient.prototype.setConversationHidden = function (conversationType, targetId, isHidden) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "boolean"], "setConversationHidden", false, arguments);
            RongIMClient._dataAccessProvider.setConversationHidden(conversationType, targetId, isHidden);
        };
        RongIMClient.prototype.setConversationToTop = function (conversationType, targetId, isTop, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "boolean", "object"], "setConversationToTop", false, arguments);
            RongIMClient._dataAccessProvider.setConversationToTop(conversationType, targetId, isTop, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "setConversationToTop"
                        });
                        callback.onError(errorCode);
                    });
                }
            });
        };
        // #endregion Conversation
        // #region Notifications
        /**
         * [getConversationNotificationStatus 获取指定用户和会话类型免提醒。]
         * @param  {ConversationType}                               conversationType [会话类型]
         * @param  {string}                                         targetId         [目标Id]
         * @param  {ResultCallback<ConversationNotificationStatus>} callback         [返回值，函数回调]
         */
        RongIMClient.prototype.getConversationNotificationStatus = function (conversationType, targetId, callback) {
            var params = {
                conversationType: conversationType,
                targetId: targetId
            };
            RongIMClient._dataAccessProvider.getConversationNotificationStatus(params, RongIMClient.logCallback(callback, "getConversationNotificationStatus"));
        };
        /**
         * [setConversationNotificationStatus 设置指定用户和会话类型免提醒。]
         * @param  {ConversationType}                               conversationType [会话类型]
         * @param  {string}                                         targetId         [目标Id]
         * @param  {ResultCallback<ConversationNotificationStatus>} callback         [返回值，函数回调]
         */
        RongIMClient.prototype.setConversationNotificationStatus = function (conversationType, targetId, notificationStatus, callback) {
            var params = {
                conversationType: conversationType,
                targetId: targetId,
                status: status
            };
            RongIMClient._dataAccessProvider.setConversationNotificationStatus(params, RongIMClient.logCallback(callback, "setConversationNotificationStatus"));
        };
        /**
         * [getNotificationQuietHours 获取免提醒消息时间。]
         * @param  {GetNotificationQuietHoursCallback} callback [返回值，函数回调]
         */
        RongIMClient.prototype.getNotificationQuietHours = function (callback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [removeNotificationQuietHours 移除免提醒消息时间。]
         * @param  {GetNotificationQuietHoursCallback} callback [返回值，函数回调]
         */
        RongIMClient.prototype.removeNotificationQuietHours = function (callback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [setNotificationQuietHours 设置免提醒消息时间。]
         * @param  {GetNotificationQuietHoursCallback} callback [返回值，函数回调]
         */
        RongIMClient.prototype.setNotificationQuietHours = function (startTime, spanMinutes, callback) {
            throw new Error("Not implemented yet");
        };
        // #endregion Notifications
        // #region Discussion
        /**
         * [addMemberToDiscussion   加入讨论组]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {string[]}          userIdList   [讨论中成员]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */
        RongIMClient.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "object"], "addMemberToDiscussion", false, arguments);
            RongIMClient._dataAccessProvider.addMemberToDiscussion(discussionId, userIdList, RongIMClient.logCallback(callback, "addMemberToDiscussion"));
        };
        /**
         * [createDiscussion 创建讨论组]
         * @param  {string}                   name       [讨论组名称]
         * @param  {string[]}                 userIdList [讨论组成员]
         * @param  {CreateDiscussionCallback} callback   [返回值，函数回调]
         */
        RongIMClient.prototype.createDiscussion = function (name, userIdList, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "object"], "createDiscussion", false, arguments);
            RongIMClient._dataAccessProvider.createDiscussion(name, userIdList, callback);
        };
        /**
         * [getDiscussion 获取讨论组信息]
         * @param  {string}                     discussionId [讨论组Id]
         * @param  {ResultCallback<Discussion>} callback     [返回值，函数回调]
         */
        RongIMClient.prototype.getDiscussion = function (discussionId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "getDiscussion", false, arguments);
            RongIMClient._dataAccessProvider.getDiscussion(discussionId, RongIMClient.logCallback(callback, "getDiscussion"));
        };
        /**
         * [quitDiscussion 退出讨论组]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */
        RongIMClient.prototype.quitDiscussion = function (discussionId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "quitDiscussion", false, arguments);
            RongIMClient._dataAccessProvider.quitDiscussion(discussionId, RongIMClient.logCallback(callback, "quitDiscussion"));
        };
        /**
         * [removeMemberFromDiscussion 将指定成员移除讨论租]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {string}            userId       [被移除的用户Id]
         * @param  {OperationCallback} callback     [返回值，参数回调]
         */
        RongIMClient.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "string", "object"], "removeMemberFromDiscussion", false, arguments);
            RongIMClient._dataAccessProvider.removeMemberFromDiscussion(discussionId, userId, RongIMClient.logCallback(callback, "removeMemberFromDiscussion"));
        };
        /**
         * [setDiscussionInviteStatus 设置讨论组邀请状态]
         * @param  {string}                 discussionId [讨论组Id]
         * @param  {DiscussionInviteStatus} status       [邀请状态]
         * @param  {OperationCallback}      callback     [返回值，函数回调]
         */
        RongIMClient.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "object"], "setDiscussionInviteStatus", false, arguments);
            RongIMClient._dataAccessProvider.setDiscussionInviteStatus(discussionId, status, RongIMClient.logCallback(callback, "setDiscussionInviteStatus"));
        };
        /**
         * [setDiscussionName 设置讨论组名称]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {string}            name         [讨论组名称]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */
        RongIMClient.prototype.setDiscussionName = function (discussionId, name, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "string", "object"], "setDiscussionName", false, arguments);
            RongIMClient._dataAccessProvider.setDiscussionName(discussionId, name, RongIMClient.logCallback(callback, "setDiscussionName"));
        };
        // #endregion Discussion
        // #region ChatRoom
        /**
         * [加入聊天室。]
         * @param  {string}            chatroomId   [聊天室Id]
         * @param  {number}            messageCount [拉取消息数量，-1为不拉去消息]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */
        RongIMClient.prototype.joinChatRoom = function (chatroomId, messageCount, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "object"], "joinChatRoom", false, arguments);
            if (chatroomId == "") {
                setTimeout(function () {
                    var errorCode = RongIMLib.ErrorCode.CHATROOM_ID_ISNULL;
                    RongIMClient.logger({
                        code: errorCode,
                        funcName: "joinChatRoom"
                    });
                    callback.onError(RongIMLib.ErrorCode.CHATROOM_ID_ISNULL);
                });
                return;
            }
            RongIMClient._dataAccessProvider.joinChatRoom(chatroomId, messageCount, RongIMClient.logCallback(callback, "joinChatRoom"));
        };
        RongIMClient.prototype.setDeviceInfo = function (device) {
            RongIMClient._dataAccessProvider.setDeviceInfo(device);
        };
        RongIMClient.prototype.setChatroomHisMessageTimestamp = function (chatRoomId, timestamp) {
            RongIMLib.CheckParam.getInstance().check(["string", "number"], "setChatroomHisMessageTimestamp", false, arguments);
            RongIMClient._dataAccessProvider.setChatroomHisMessageTimestamp(chatRoomId, timestamp);
        };
        RongIMClient.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "number", "object"], "getChatRoomHistoryMessages", false, arguments);
            RongIMClient._dataAccessProvider.getChatRoomHistoryMessages(chatRoomId, count, order, RongIMClient.logCallback(callback, "getChatRoomHistoryMessages"));
        };
        RongIMClient.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "number", "object"], "getChatRoomInfo", false, arguments);
            RongIMClient._dataAccessProvider.getChatRoomInfo(chatRoomId, count, order, RongIMClient.logCallback(callback, "getChatRoomInfo"));
        };
        /**
         * [退出聊天室]
         * @param  {string}            chatroomId [聊天室Id]
         * @param  {OperationCallback} callback   [返回值，函数回调]
         */
        RongIMClient.prototype.quitChatRoom = function (chatroomId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "quitChatRoom", false, arguments);
            RongIMClient._dataAccessProvider.quitChatRoom(chatroomId, RongIMClient.logCallback(callback, "quitChatRoom"));
        };
        RongIMClient.prototype.setChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            RongIMLib.CheckParam.getInstance().check(['string', 'object', 'object'], 'setChatroomEntry', false, arguments);
            RongIMClient._dataAccessProvider.setChatroomEntry(chatroomId, chatroomEntry, RongIMClient.logCallback(callback, "setChatroomEntry"));
        };
        RongIMClient.prototype.forceSetChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            RongIMLib.CheckParam.getInstance().check(['string', 'object', 'object'], 'setChatroomEntry', false, arguments);
            RongIMClient._dataAccessProvider.forceSetChatroomEntry(chatroomId, chatroomEntry, RongIMClient.logCallback(callback, "setChatroomEntry"));
        };
        RongIMClient.prototype.getChatroomEntry = function (chatroomId, key, callback) {
            RongIMLib.CheckParam.getInstance().check(['string', 'string', 'object'], 'getChatroomEntry', false, arguments);
            RongIMClient._dataAccessProvider.getChatroomEntry(chatroomId, key, RongIMClient.logCallback(callback, "setChatroomEntry"));
        };
        RongIMClient.prototype.getAllChatroomEntries = function (chatroomId, callback) {
            RongIMLib.CheckParam.getInstance().check(['string', 'object'], 'getAllChatroomEntries', false, arguments);
            RongIMClient._dataAccessProvider.getAllChatroomEntries(chatroomId, RongIMClient.logCallback(callback, "setChatroomEntry"));
        };
        RongIMClient.prototype.removeChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            RongIMLib.CheckParam.getInstance().check(['string', 'object', 'object'], 'removeChatroomEntry', false, arguments);
            RongIMClient._dataAccessProvider.removeChatroomEntry(chatroomId, chatroomEntry, RongIMClient.logCallback(callback, "setChatroomEntry"));
        };
        RongIMClient.prototype.forceRemoveChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            RongIMLib.CheckParam.getInstance().check(['string', 'object', 'object'], 'removeChatroomEntry', false, arguments);
            RongIMClient._dataAccessProvider.forceRemoveChatroomEntry(chatroomId, chatroomEntry, RongIMClient.logCallback(callback, "setChatroomEntry"));
        };
        // #endregion ChatRoom
        // #region Public Service
        RongIMClient.prototype.getRemotePublicServiceList = function (callback, pullMessageTime) {
            RongIMClient._dataAccessProvider.getRemotePublicServiceList(RongIMClient.logCallback(callback, "getRemotePublicServiceList"), pullMessageTime);
        };
        /**
         * [getPublicServiceList ]获取本地的公共账号列表
         * @param  {ResultCallback<PublicServiceProfile[]>} callback [返回值，参数回调]
         */
        RongIMClient.prototype.getPublicServiceList = function (callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["object"], "getPublicServiceList", false, arguments);
                this.getRemotePublicServiceList(RongIMClient.logCallback(callback, "getPublicServiceList"));
            }
        };
        /**
         * [getPublicServiceProfile ]   获取某公共服务信息。
         * @param  {PublicServiceType}                    publicServiceType [公众服务类型。]
         * @param  {string}                               publicServiceId   [公共服务 Id。]
         * @param  {ResultCallback<PublicServiceProfile>} callback          [公共账号信息回调。]
         */
        RongIMClient.prototype.getPublicServiceProfile = function (publicServiceType, publicServiceId, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "getPublicServiceProfile", false, arguments);
                RongIMClient._dataAccessProvider.getPublicServiceProfile(publicServiceType, publicServiceId, RongIMClient.logCallback(callback, "getPublicServiceProfile"));
            }
        };
        /**
         * [pottingPublicSearchType ] 公众好查询类型
         * @param  {number} bussinessType [ 0-all 1-mp 2-mc]
         * @param  {number} searchType    [0-exact 1-fuzzy]
         */
        RongIMClient.prototype.pottingPublicSearchType = function (bussinessType, searchType) {
            if (RongIMClient._memoryStore.depend.openMp) {
                var bits = 0;
                if (bussinessType == 0) {
                    bits |= 3;
                    if (searchType == 0) {
                        bits |= 12;
                    }
                    else {
                        bits |= 48;
                    }
                }
                else if (bussinessType == 1) {
                    bits |= 1;
                    if (searchType == 0) {
                        bits |= 8;
                    }
                    else {
                        bits |= 32;
                    }
                }
                else {
                    bits |= 2;
                    if (bussinessType == 0) {
                        bits |= 4;
                    }
                    else {
                        bits |= 16;
                    }
                }
                return bits;
            }
        };
        /**
         * [searchPublicService ]按公众服务类型搜索公众服务。
         * @param  {SearchType}                             searchType [搜索类型枚举。]
         * @param  {string}                                 keywords   [搜索关键字。]
         * @param  {ResultCallback<PublicServiceProfile[]>} callback   [搜索结果回调。]
         */
        RongIMClient.prototype.searchPublicService = function (searchType, keywords, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "searchPublicService", false, arguments);
                var modules = new RongIMClient.Protobuf.SearchMpInput();
                modules.setType(this.pottingPublicSearchType(0, searchType));
                modules.setId(keywords);
                RongIMClient.bridge.queryMsg(29, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, RongIMClient.logCallback(callback, "searchPublicService"), "SearchMpOutput");
            }
        };
        /**
         * [searchPublicServiceByType ]按公众服务类型搜索公众服务。
         * @param  {PublicServiceType}                      publicServiceType [公众服务类型。]
         * @param  {SearchType}                             searchType        [搜索类型枚举。]
         * @param  {string}                                 keywords          [搜索关键字。]
         * @param  {ResultCallback<PublicServiceProfile[]>} callback          [搜索结果回调。]
         */
        RongIMClient.prototype.searchPublicServiceByType = function (publicServiceType, searchType, keywords, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "number", "string", "object"], "searchPublicServiceByType", false, arguments);
                var type = publicServiceType == RongIMLib.ConversationType.APP_PUBLIC_SERVICE ? 2 : 1;
                var modules = new RongIMClient.Protobuf.SearchMpInput();
                modules.setType(this.pottingPublicSearchType(type, searchType));
                modules.setId(keywords);
                RongIMClient.bridge.queryMsg(29, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, RongIMClient.logCallback(callback, "searchPublicServiceByType"), "SearchMpOutput");
            }
        };
        /**
         * [subscribePublicService ] 订阅公众号。
         * @param  {PublicServiceType} publicServiceType [公众服务类型。]
         * @param  {string}            publicServiceId   [公共服务 Id。]
         * @param  {OperationCallback} callback          [订阅公众号回调。]
         */
        RongIMClient.prototype.subscribePublicService = function (publicServiceType, publicServiceId, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "subscribePublicService", false, arguments);
                var modules = new RongIMClient.Protobuf.MPFollowInput(), me = this, follow = publicServiceType == RongIMLib.ConversationType.APP_PUBLIC_SERVICE ? "mcFollow" : "mpFollow";
                modules.setId(publicServiceId);
                RongIMClient.bridge.queryMsg(follow, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                    onSuccess: function () {
                        me.getRemotePublicServiceList({
                            onSuccess: function () { },
                            onError: function () { }
                        });
                        callback.onSuccess();
                    },
                    onError: function (code) {
                        var errorCode = code;
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "subscribePublicService"
                        });
                        callback.onError(code);
                    }
                }, "MPFollowOutput");
            }
        };
        /**
         * [unsubscribePublicService ] 取消订阅公众号。
         * @param  {PublicServiceType} publicServiceType [公众服务类型。]
         * @param  {string}            publicServiceId   [公共服务 Id。]
         * @param  {OperationCallback} callback          [取消订阅公众号回调。]
         */
        RongIMClient.prototype.unsubscribePublicService = function (publicServiceType, publicServiceId, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "unsubscribePublicService", false, arguments);
                var modules = new RongIMClient.Protobuf.MPFollowInput(), me = this, follow = publicServiceType == RongIMLib.ConversationType.APP_PUBLIC_SERVICE ? "mcUnFollow" : "mpUnFollow";
                modules.setId(publicServiceId);
                RongIMClient.bridge.queryMsg(follow, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                    onSuccess: function () {
                        RongIMClient._memoryStore.publicServiceMap.remove(publicServiceType, publicServiceId);
                        callback.onSuccess();
                    },
                    onError: function (code) {
                        var errorCode = code;
                        RongIMClient.logger({
                            code: errorCode,
                            funcName: "unsubscribePublicService"
                        });
                        callback.onError(code);
                    }
                }, "MPFollowOutput");
            }
        };
        // #endregion Public Service
        // #region Blacklist
        /**
         * [加入黑名单]
         * @param  {string}            userId   [将被加入黑名单的用户Id]
         * @param  {OperationCallback} callback [返回值，函数回调]
         */
        RongIMClient.prototype.addToBlacklist = function (userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string|number", "object"], "addToBlacklist", false, arguments);
            RongIMClient._dataAccessProvider.addToBlacklist(userId, RongIMClient.logCallback(callback, "addToBlacklist"));
        };
        /**
         * [获取黑名单列表]
         * @param  {GetBlacklistCallback} callback [返回值，函数回调]
         */
        RongIMClient.prototype.getBlacklist = function (callback) {
            RongIMLib.CheckParam.getInstance().check(["object"], "getBlacklist", false, arguments);
            RongIMClient._dataAccessProvider.getBlacklist(callback);
        };
        /**
         * [得到指定人员再黑名单中的状态]
         * @param  {string}                          userId   [description]
         * @param  {ResultCallback<BlacklistStatus>} callback [返回值，函数回调]
         */
        //TODO 如果人员不在黑名单中，获取状态会出现异常
        RongIMClient.prototype.getBlacklistStatus = function (userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string|number", "object"], "getBlacklistStatus", false, arguments);
            RongIMClient._dataAccessProvider.getBlacklistStatus(userId, RongIMClient.logCallback(callback, "getBlacklistStatus"));
        };
        /**
         * [将指定用户移除黑名单]
         * @param  {string}            userId   [将被移除的用户Id]
         * @param  {OperationCallback} callback [返回值，函数回调]
         */
        RongIMClient.prototype.removeFromBlacklist = function (userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string|number", "object"], "removeFromBlacklist", false, arguments);
            RongIMClient._dataAccessProvider.removeFromBlacklist(userId, RongIMClient.logCallback(callback, "removeFromBlacklist"));
        };
        RongIMClient.prototype.getFileToken = function (fileType, callback, fileName) {
            RongIMLib.CheckParam.getInstance().check(["number", "object", "undefined|null|string"], "getQngetFileTokenTkn", false, arguments);
            RongIMClient._dataAccessProvider.getFileToken(fileType, RongIMClient.logCallback(callback, "getFileToken"), fileName);
        };
        RongIMClient.prototype.getFileUrl = function (fileType, fileName, oriName, callback, data) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "string|global|object|null", "object", "undefined|null|object"], "getFileUrl", false, arguments);
            RongIMClient._dataAccessProvider.getFileUrl(fileType, fileName, oriName, RongIMClient.logCallback(callback, "getFileUrl"), data);
        };
        ;
        // #endregion Blacklist
        // #region Real-time Location Service
        RongIMClient.prototype.addRealTimeLocationListener = function (conversationType, targetId, listener) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.getRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.getRealTimeLocationCurrentState = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.getRealTimeLocationParticipants = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.joinRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.quitRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.startRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.updateRealTimeLocationStatus = function (conversationType, targetId, latitude, longitude) {
            throw new Error("Not implemented yet");
        };
        // #endregion Real-time Location Service
        // # startVoIP
        RongIMClient.prototype.startCall = function (converType, targetId, userIds, mediaType, extra, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string|number", "array", "number", "string", "object"], "startCall", false, arguments);
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.startCall(converType, targetId, userIds, mediaType, extra, RongIMClient.logCallback(callback, "startCall"));
            }
            else {
                var errorCode = RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE;
                RongIMClient.logger({
                    code: errorCode,
                    funcName: "startCall"
                });
                callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);
            }
        };
        RongIMClient.prototype.joinCall = function (mediaType, callback) {
            RongIMLib.CheckParam.getInstance().check(['number', 'object'], "joinCall", false, arguments);
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.joinCall(mediaType, RongIMClient.logCallback(callback, "joinCall"));
            }
            else {
                var errorCode = RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE;
                RongIMClient.logger({
                    code: errorCode,
                    funcName: "joinCall"
                });
                callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);
            }
        };
        RongIMClient.prototype.hungupCall = function (converType, targetId, reason) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "number"], "hungupCall", false, arguments);
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.hungupCall(converType, targetId, reason);
            }
        };
        RongIMClient.prototype.changeMediaType = function (converType, targetId, mediaType, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "number", "object"], "changeMediaType", false, arguments);
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.changeMediaType(converType, targetId, mediaType, RongIMClient.logCallback(callback, "changeMediaType"));
            }
            else {
                var errorCode = RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE;
                RongIMClient.logger({
                    code: errorCode,
                    funcName: "changeMediaType"
                });
                callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);
            }
        };
        // # endVoIP
        RongIMClient.prototype.getUnreadMentionedMessages = function (conversationType, targetId) {
            return RongIMClient._dataAccessProvider.getUnreadMentionedMessages(conversationType, targetId);
        };
        RongIMClient.prototype.clearListeners = function () {
            RongIMClient._dataAccessProvider.clearListeners();
        };
        // UserStatus start
        RongIMClient.prototype.getUserStatus = function (userId, callback) {
            RongIMClient._dataAccessProvider.getUserStatus(userId, RongIMClient.logCallback(callback, "getUserStatus"));
        };
        RongIMClient.prototype.setUserStatus = function (status, callback) {
            RongIMClient._dataAccessProvider.setUserStatus(status, RongIMClient.logCallback(callback, "setUserStatus"));
        };
        RongIMClient.prototype.setUserStatusListener = function (params, callback) {
            var userIds = params.userIds;
            var multiple = params.multiple;
            RongIMClient.userStatusObserver.watch({
                key: userIds,
                func: callback,
                multiple: multiple
            });
            RongIMClient._dataAccessProvider.setUserStatusListener(params, callback);
        };
        // UserStaus end
        // RTC start
        RongIMClient.messageWatch = function (watcher) {
            RongIMClient.RTCListener = watcher;
        };
        RongIMClient.messageSignalWatch = function (watcher) {
            RongIMClient.RTCSignalLisener = watcher;
        };
        /*
            var data = {
                key1: 123,
                key2: 345
            };
        */
        RongIMClient.prototype.getRTCUserInfoList = function (room, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "getRTCUserInfoList", false, arguments);
            RongIMClient._dataAccessProvider.getRTCUserInfoList(room, callback);
        };
        RongIMClient.prototype.getRTCUserList = function (room, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "getRTCUserList", false, arguments);
            RongIMClient._dataAccessProvider.getRTCUserList(room, callback);
        };
        RongIMClient.prototype.setRTCUserInfo = function (room, info, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object", "object"], "setRTCUserInfo", false, arguments);
            RongIMClient._dataAccessProvider.setRTCUserInfo(room, info, callback);
        };
        RongIMClient.prototype.removeRTCUserInfo = function (room, info, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object", "object"], "removeRTCUserInfo", false, arguments);
            RongIMClient._dataAccessProvider.removeRTCUserInfo(room, info, callback);
        };
        RongIMClient.prototype.getRTCRoomInfo = function (room, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "getRTCRoomInfo", false, arguments);
            RongIMClient._dataAccessProvider.getRTCRoomInfo(room, callback);
        };
        RongIMClient.prototype.setRTCRoomInfo = function (room, info, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object", "object"], "setRTCRoomInfo", false, arguments);
            RongIMClient._dataAccessProvider.setRTCRoomInfo(room, info, callback);
        };
        RongIMClient.prototype.removeRTCRoomInfo = function (room, info, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object", "object"], "removeRTCRoomInfo", false, arguments);
            RongIMClient._dataAccessProvider.removeRTCRoomInfo(room, info, callback);
        };
        RongIMClient.prototype.joinRTCRoom = function (room, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "joinRTCRoom", false, arguments);
            if (RongIMClient.isJoinedRTCRoom) {
                return callback.onSuccess(RongIMClient.roomInfo);
            }
            RongIMClient._dataAccessProvider.joinRTCRoom(room, {
                onSuccess: function (result) {
                    RongIMClient.roomInfo = result;
                    RongIMClient.isJoinedRTCRoom = true;
                    callback.onSuccess(result);
                },
                onError: callback.onError
            });
        };
        RongIMClient.prototype.quitRTCRoom = function (room, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "quitRTCRoom", false, arguments);
            RongIMClient.isJoinedRTCRoom = false;
            RongIMClient._dataAccessProvider.quitRTCRoom(room, {
                onSuccess: function () {
                    RongIMClient.roomInfo = {
                        users: {},
                        token: ''
                    };
                    callback.onSuccess(true);
                },
                onError: callback.onError
            });
        };
        RongIMClient.prototype.RTCPing = function (room, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "RTCPing", false, arguments);
            RongIMClient._dataAccessProvider.RTCPing(room, callback);
        };
        RongIMClient.prototype.setRTCUserData = function (roomId, key, value, isInner, callback, message) {
            RongIMLib.CheckParam.getInstance().check(["string", "string", "string", "boolean", "object", "global|object|null|undefined"], "setRTCUserData", false, arguments);
            RongIMClient._dataAccessProvider.setRTCUserData(roomId, key, value, isInner, callback, message);
        };
        RongIMClient.prototype.setRTCUserTotalRes = function (roomId, message, valueInfo, objectName, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", 'object', "string", "string", "object"], "setRTCUserTotalRes", false, arguments);
            RongIMClient._dataAccessProvider.setRTCUserTotalRes(roomId, message, valueInfo, objectName, callback);
        };
        RongIMClient.prototype.getRTCUserData = function (roomId, keys, isInner, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "boolean", "object", "global|object|null"], "getRTCUserData", false, arguments);
            RongIMClient._dataAccessProvider.getRTCUserData(roomId, keys, isInner, callback);
        };
        RongIMClient.prototype.removeRTCUserData = function (roomId, keys, isInner, callback, message) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "boolean", "object", "global|object|null|undefined"], "removeRTCUserData", false, arguments);
            RongIMClient._dataAccessProvider.removeRTCUserData(roomId, keys, isInner, callback, message);
        };
        RongIMClient.prototype.setRTCRoomData = function (roomId, key, value, isInner, callback, message) {
            RongIMLib.CheckParam.getInstance().check(["string", "string", "string", "boolean", "object", "global|object|null|undefined"], "setRTCRoomData", false, arguments);
            RongIMClient._dataAccessProvider.setRTCRoomData(roomId, key, value, isInner, callback, message);
        };
        RongIMClient.prototype.getRTCRoomData = function (roomId, keys, isInner, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "boolean", "object"], "getRTCRoomData", false, arguments);
            RongIMClient._dataAccessProvider.getRTCRoomData(roomId, keys, isInner, callback);
        };
        RongIMClient.prototype.removeRTCRoomData = function (roomId, keys, isInner, callback, message) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "boolean", "object", "global|object|null|undefined"], "removeRTCRoomData", false, arguments);
            RongIMClient._dataAccessProvider.removeRTCRoomData(roomId, keys, isInner, callback, message);
        };
        RongIMClient.prototype.setRTCOutData = function (roomId, data, type, callback, message) {
            RongIMClient._dataAccessProvider.setRTCOutData(roomId, data, type, callback, message);
        };
        // 信令 SDK 新增
        RongIMClient.prototype.getRTCOutData = function (roomId, userIds, callback) {
            RongIMClient._dataAccessProvider.getRTCOutData(roomId, userIds, callback);
        };
        RongIMClient.prototype.getNavi = function () {
            return RongIMClient._dataAccessProvider.getNavi();
        };
        RongIMClient.prototype.getRTCToken = function (room, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "getRTCToken", false, arguments);
            return RongIMClient._dataAccessProvider.getRTCToken(room, callback);
        };
        RongIMClient.prototype.setRTCState = function (room, content, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object", "object"], "setRTCState", false, arguments);
            return RongIMClient._dataAccessProvider.setRTCState(room, content, callback);
        };
        RongIMClient.prototype.getAppInfo = function () {
            var appKey = RongIMClient._memoryStore.appKey;
            return {
                appKey: appKey
            };
        };
        RongIMClient.prototype.getSDKInfo = function () {
            return {
                version: RongIMClient.sdkver
            };
        };
        RongIMClient.HttpProtocol = {
            http: 'http://',
            https: 'https://'
        };
        RongIMClient.WsProtocol = {
            ws: 'ws://',
            wss: 'wss://'
        };
        RongIMClient.RTCListener = function () { };
        RongIMClient.RTCInnerListener = function () { };
        RongIMClient.RTCSignalLisener = function () { };
        RongIMClient.MaxMessageContentBytes = 131072; // 128kb
        RongIMClient.NavMarkInToken = '@';
        RongIMClient.NavSeparatorInToken = ';';
        RongIMClient.NavExpiredTime = 7200000; // 2 小时
        RongIMClient.currentServer = '';
        RongIMClient.LogFactory = {};
        RongIMClient.MessageType = {};
        RongIMClient.RegisterMessage = {};
        RongIMClient._memoryStore = { isPullFinished: false, syncMsgQueue: [] };
        RongIMClient.isNotPullMsg = false;
        RongIMClient.userStatusObserver = null;
        RongIMClient.sdkver = '2.5.9';
        RongIMClient.otherDeviceLoginCount = 0;
        RongIMClient.serverStore = { index: 0 };
        RongIMClient.isFirstConnect = true;
        RongIMClient.roomInfo = {
            users: {},
            token: ''
        };
        RongIMClient.invalidWsUrls = [];
        RongIMClient.isJoinedRTCRoom = false;
        RongIMClient.statusListeners = [];
        RongIMClient.messageListeners = [];
        RongIMClient.settingListeners = [];
        RongIMClient.conversationStatusListeners = [];
        RongIMClient.userStatusListener = null;
        return RongIMClient;
    })();
    RongIMLib.RongIMClient = RongIMClient;
})(RongIMLib || (RongIMLib = {}));
//用于连接通道
var RongIMLib;
(function (RongIMLib) {
    (function (Qos) {
        Qos[Qos["AT_MOST_ONCE"] = 0] = "AT_MOST_ONCE";
        Qos[Qos["AT_LEAST_ONCE"] = 1] = "AT_LEAST_ONCE";
        Qos[Qos["EXACTLY_ONCE"] = 2] = "EXACTLY_ONCE";
        Qos[Qos["DEFAULT"] = 3] = "DEFAULT";
    })(RongIMLib.Qos || (RongIMLib.Qos = {}));
    var Qos = RongIMLib.Qos;
    (function (Type) {
        Type[Type["CONNECT"] = 1] = "CONNECT";
        Type[Type["CONNACK"] = 2] = "CONNACK";
        Type[Type["PUBLISH"] = 3] = "PUBLISH";
        Type[Type["PUBACK"] = 4] = "PUBACK";
        Type[Type["QUERY"] = 5] = "QUERY";
        Type[Type["QUERYACK"] = 6] = "QUERYACK";
        Type[Type["QUERYCON"] = 7] = "QUERYCON";
        Type[Type["SUBSCRIBE"] = 8] = "SUBSCRIBE";
        Type[Type["SUBACK"] = 9] = "SUBACK";
        Type[Type["UNSUBSCRIBE"] = 10] = "UNSUBSCRIBE";
        Type[Type["UNSUBACK"] = 11] = "UNSUBACK";
        Type[Type["PINGREQ"] = 12] = "PINGREQ";
        Type[Type["PINGRESP"] = 13] = "PINGRESP";
        Type[Type["DISCONNECT"] = 14] = "DISCONNECT";
    })(RongIMLib.Type || (RongIMLib.Type = {}));
    var Type = RongIMLib.Type;
    RongIMLib.StatusTopic = (function () {
        var ConversationType = RongIMLib.ConversationType;
        var topic = {};
        topic[ConversationType.PRIVATE] = 'ppMsgS';
        topic[ConversationType.GROUP] = 'pgMsgS';
        return topic;
    })();
    var _topic = [
        "invtDiz", "crDiz", "qnUrl", "userInf", "dizInf", "userInf", "joinGrp", "quitDiz", "exitGrp", "evctDiz",
        ["", "ppMsgP", "pdMsgP", "pgMsgP", "chatMsg", "pcMsgP", "", "pmcMsgN", "pmpMsgN", "", "", "", "prMsgS", "prMsgP"],
        "pdOpen", "rename", "uGcmpr", "qnTkn", "destroyChrm", "createChrm", "exitChrm", "queryChrm",
        "joinChrm", "pGrps", "addBlack", "rmBlack", "getBlack", "blackStat",
        "addRelation", "qryRelation", "delRelation", "pullMp", "schMp", "qnTkn",
        "qnUrl", "qryVoipK", "delMsg", "qryCHMsg", "getUserStatus", "setUserStatus",
        "subUserStatus", "cleanHisMsg"
    ];
    var Channel = (function () {
        function Channel(cb, self) {
            this.connectionStatus = -1;
            var appId = self.appId;
            var token = encodeURIComponent(self.token);
            var sdkVer = self.sdkVer;
            var apiVer = self.apiVer;
            this.self = self;
            this.socket = Socket.getInstance().createServer();
            var that = this;
            var storage = RongIMLib.RongIMClient._storageProvider;
            var servers = storage.getItem('servers');
            servers = JSON.parse(servers) || [];
            var depend = RongIMLib.RongIMClient._memoryStore.depend;
            var customCmpUrl = depend.cmpUrl;
            if (RongIMLib.RongUtil.isValidWsUrl(customCmpUrl)) {
                servers = [customCmpUrl];
            }
            else {
                servers = RongIMLib.RongUtil.getValidWsUrlList(servers);
            }
            var startConnect = function (host) {
                var tpl = '{host}/websocket?appId={appId}&token={token}&sdkVer={sdkVer}&apiVer={apiVer}';
                that.url = RongIMLib.RongUtil.tplEngine(tpl, {
                    host: host,
                    appId: appId,
                    token: token,
                    sdkVer: sdkVer,
                    apiVer: apiVer
                });
                that.socket.connect(that.url, cb);
                // 临时兼容 Comet 逻辑，Comet 中用到
                var userId = storage.getItem('rong_current_user');
                RongIMLib.Navigation.Endpoint = {
                    host: host,
                    userId: userId
                };
            };
            var connectMap = {
                get: function () {
                    // 所有链接计算器，超过 15 秒后认为所有 CMP 地址均不可用
                    var totalTimer = new RongIMLib.Timer({
                        timeout: 1 * 1000 * 15
                    });
                    var timers = [];
                    var xhrs = [];
                    var isFinished = false;
                    var clearHandler = function () {
                        for (var i = 0; i < timers.length; i++) {
                            var timer = timers[i];
                            clearTimeout(timer);
                        }
                        for (var i = 0; i < xhrs.length; i++) {
                            var xhr = xhrs[i];
                            xhr.abort();
                        }
                        timers.length = 0;
                        xhrs.length = 0;
                    };
                    var request = function (config, callback) {
                        var url = config.url;
                        var time = config.time;
                        if (isFinished) {
                            return;
                        }
                        var timer = setTimeout(function () {
                            var onSuccess = function () {
                                if (isFinished) {
                                    return;
                                }
                                clearHandler();
                                isFinished = true;
                                totalTimer.pause();
                                callback(url);
                                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_PING_WS_R, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                                        url: url
                                    } });
                            };
                            var xhr = RongIMLib.MessageUtil.detectCMP({
                                url: url,
                                success: onSuccess,
                                fail: function (code) {
                                    console.log(code);
                                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_PING_WS_R, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                                            url: url,
                                            code: code
                                        } });
                                }
                            });
                            xhrs.push(xhr);
                        }, time);
                        timers.push(timer);
                    };
                    var snifferCallback = function (url) {
                        var reg = /(http|https):\/\/([^\/]+)/i;
                        var host = url.match(reg)[2];
                        RongIMLib.RongIMClient.currentServer = host;
                        startConnect(host);
                    };
                    var snifferTpl = '{protocol}{server}/ping?r={random}';
                    for (var i = 0; i < servers.length; i++) {
                        var server = servers[i];
                        if (server) {
                            server = RongIMLib.RongUtil.tplEngine(snifferTpl, {
                                protocol: depend.protocol,
                                server: server,
                                random: RongIMLib.RongUtil.getTimestamp()
                            });
                            request({
                                url: server,
                                time: i * 1000
                            }, snifferCallback);
                            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_PING_WS_T, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                                    url: server
                                } });
                        }
                    }
                    totalTimer.resume(function () {
                        RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_PING_WS_R, level: RongIMLib.LoggerLevel.F, type: RongIMLib.LoggerType.IM, content: {
                                desc: 'all websocket addresses are unavailable',
                                cmp: servers,
                                ConnectionStatus: RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE,
                                available: false
                            } });
                        clearHandler();
                        for (var i = 0; i < servers.length; i++) {
                            RongIMLib.RongIMClient.invalidWsUrls.push(servers[i]);
                        }
                        var storeServers = storage.getItem('servers');
                        try {
                            storeServers = JSON.parse(storeServers);
                            !RongIMLib.RongUtil.getValidWsUrlList(storeServers).length && RongIMLib.Navigation.clear();
                        }
                        catch (e) { }
                        that.socket.fire("StatusChanged", RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
                    });
                },
                element: function () {
                    var totalTimer = new RongIMLib.Timer({
                        timeout: 1 * 1000 * 15
                    });
                    var timers = [];
                    var elements = [];
                    var isFinished = false;
                    var clearHandler = function () {
                        for (var i = 0; i < timers.length; i++) {
                            var timer = timers[i];
                            clearTimeout(timer);
                        }
                        for (var i = 0; i < elements.length; i++) {
                            var el = elements[i];
                            document.body.removeChild(el);
                        }
                    };
                    var request = function (config, callback) {
                        var url = config.url;
                        var time = config.time;
                        if (isFinished) {
                            return;
                        }
                        var timer = setTimeout(function () {
                            var el = document.createElement('script');
                            el.src = url;
                            document.body.appendChild(el);
                            el.onerror = function () {
                                if (isFinished) {
                                    return;
                                }
                                clearHandler();
                                isFinished = true;
                                totalTimer.pause();
                                var url = el.src;
                                callback(url);
                            };
                            elements.push(el);
                        }, time);
                        timers.push(timer);
                    };
                    var snifferCallback = function (url) {
                        var reg = /(http|https):\/\/([^\/]+)/i;
                        var host = url.match(reg)[2];
                        startConnect(host);
                    };
                    var snifferTpl = '//{server}/{path}';
                    for (var i = 0; i < servers.length; i++) {
                        var server = RongIMLib.RongUtil.tplEngine(snifferTpl, {
                            server: servers[i],
                            path: i
                        });
                        request({
                            url: server,
                            time: i * 1000
                        }, snifferCallback);
                    }
                    totalTimer.resume(function () {
                        for (var i = 0; i < servers.length; i++) {
                            RongIMLib.RongIMClient.invalidWsUrls.push(servers[i]);
                        }
                        clearHandler();
                        that.socket.fire("StatusChanged", RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
                    });
                }
            };
            var isWSPingJSONP = depend.isWSPingJSONP;
            var connectType = isWSPingJSONP ? 'element' : 'get';
            connectMap[connectType]();
            //注册状态改变观察者
            var StatusEvent = Channel._ConnectionStatusListener;
            var hasEvent = (typeof StatusEvent == "object");
            var me = this;
            me.socket.on("StatusChanged", function (code) {
                if (RongIMLib.Bridge && RongIMLib.Bridge._client && RongIMLib.Bridge._client.channel && me !== RongIMLib.Bridge._client.channel) {
                    me.connectionStatus = code;
                    return;
                }
                if (!hasEvent) {
                    throw new Error("setConnectStatusListener:Parameter format is incorrect");
                }
                var isNetworkUnavailable = (code == RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
                var isWebSocket = !RongIMLib.RongIMClient._memoryStore.depend.isPolling;
                if (RongIMLib.RongIMClient.isFirstConnect && isNetworkUnavailable && isWebSocket) {
                    code = RongIMLib.ConnectionStatus.WEBSOCKET_UNAVAILABLE;
                }
                if (isNetworkUnavailable) {
                    var storage = RongIMLib.RongIMClient._storageProvider;
                    var servers = storage.getItem('servers');
                    servers = JSON.parse(servers);
                    var currentServer = RongIMLib.RongIMClient.currentServer;
                    if (currentServer) {
                        var index = RongIMLib.RongUtil.indexOf(servers, currentServer);
                        // 如果 currentServer 是 servers 的最后一个，不再替换位置
                        if (!RongIMLib.RongUtil.isEqual(index, -1)) {
                            var server = servers.splice(index, 1)[0];
                            servers.push(server);
                            storage.setItem('servers', JSON.stringify(servers));
                        }
                    }
                }
                me.connectionStatus = code;
                setTimeout(function () {
                    StatusEvent.onChanged(code);
                    var unReportCodes = [RongIMLib.ConnectionStatus.CONNECTING, RongIMLib.ConnectionStatus.REQUEST_NAVI, RongIMLib.ConnectionStatus.RESPONSE_NAVI];
                    var isReportCode = RongIMLib.RongUtil.indexOf(unReportCodes, code) === -1;
                    if (isReportCode) {
                        RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_NETC_S, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                                ConnectionStatus: code,
                                available: false
                            } });
                    }
                });
                var isDisconnected = (code == RongIMLib.ConnectionStatus.DISCONNECTED);
                if (isDisconnected) {
                    self.clearHeartbeat();
                }
                var isOtherDevice = (code == RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT);
                if (isOtherDevice) {
                    // 累计其他设备登陆次数，超过 5 次后，自动销毁内部对象
                    // 删除位置：ServerDataProivder.prototype.connect
                    RongIMLib.RongIMClient.otherDeviceLoginCount++;
                }
                var isConnected = (code == RongIMLib.ConnectionStatus.CONNECTED);
                if (isConnected) {
                    RongIMLib.RongIMClient.isFirstConnect = false;
                }
                var isWebsocketUnAvailable = (code == RongIMLib.ConnectionStatus.WEBSOCKET_UNAVAILABLE);
                if (isWebsocketUnAvailable) {
                    if (RongIMLib.RongUtil.getValidWsUrlList(servers).length) {
                        RongIMLib.RongIMClient._storageProvider.setItem("rongSDK", RongIMLib.Transportations._TransportType);
                        RongIMLib.RongIMClient.connect(self.token, RongIMLib.RongIMClient._memoryStore.callback);
                    }
                    else {
                        me.changeConnectType();
                        RongIMLib.RongIMClient.isFirstConnect = false;
                        RongIMLib.RongIMClient.connect(self.token, RongIMLib.RongIMClient._memoryStore.callback);
                    }
                }
            });
            //注册message观察者
            this.socket.on("message", self.handler.handleMessage);
            //注册断开连接观察者
            this.socket.on("disconnect", function (status) {
                that.socket.fire("StatusChanged", status ? status : 2);
            });
        }
        Channel.prototype.changeConnectType = function () {
            RongIMLib.RongIMClient._memoryStore.depend.isPolling = !RongIMLib.RongIMClient._memoryStore.depend.isPolling;
            new RongIMLib.FeatureDectector();
        };
        Channel.prototype.writeAndFlush = function (val) {
            this.socket.send(val);
        };
        Channel.prototype.reconnect = function (callback) {
            RongIMLib.MessageIdHandler.clearMessageId();
            this.socket = this.socket.reconnect();
            if (callback) {
                this.self.reconnectObj = callback;
            }
        };
        Channel.prototype.disconnect = function (status) {
            this.socket.disconnect(status);
        };
        return Channel;
    })();
    RongIMLib.Channel = Channel;
    var Socket = (function () {
        function Socket() {
            this.socket = null;
            this._events = {};
        }
        Socket.getInstance = function () {
            return new Socket();
        };
        Socket.prototype.connect = function (url, cb) {
            if (this.socket) {
                if (url) {
                    RongIMLib.RongIMClient._storageProvider.setItem("rongSDK", this.checkTransport());
                    this.on("connect", cb || new Function);
                }
                if (url) {
                    this.currentURL = url;
                }
                this.socket.createTransport(url);
            }
            return this;
        };
        Socket.prototype.createServer = function () {
            var transport = this.getTransport(this.checkTransport());
            if (transport === null) {
                throw new Error("the channel was not supported");
            }
            return transport;
        };
        Socket.prototype.getTransport = function (transportType) {
            if (transportType == Socket.XHR_POLLING) {
                this.socket = new RongIMLib.PollingTransportation(this);
            }
            else if (transportType == Socket.WEBSOCKET) {
                this.socket = new RongIMLib.SocketTransportation(this);
            }
            return this;
        };
        Socket.prototype.send = function (data) {
            if (this.socket) {
                if (this.checkTransport() == Socket.WEBSOCKET) {
                    this.socket.send(data);
                }
                else {
                    this.socket.send(this._encode(data));
                }
            }
        };
        Socket.prototype.onMessage = function (data) {
            this.fire("message", data);
        };
        Socket.prototype.disconnect = function (status) {
            this.socket.disconnect(status);
            this.fire("disconnect", status);
            return this;
        };
        Socket.prototype.reconnect = function () {
            if (this.currentURL && RongIMLib.RongIMClient._storageProvider.getItem("rongSDK")) {
                return this.connect(this.currentURL, null);
            }
            else {
                throw new Error("reconnect:no have URL");
            }
        };
        /**
         * [checkTransport 返回通道类型]
         */
        Socket.prototype.checkTransport = function () {
            if (RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                RongIMLib.Transportations._TransportType = Socket.XHR_POLLING;
            }
            return RongIMLib.Transportations._TransportType;
        };
        Socket.prototype.fire = function (x, args) {
            if (x in this._events) {
                for (var i = 0, ii = this._events[x].length; i < ii; i++) {
                    this._events[x][i](args);
                }
            }
            return this;
        };
        Socket.prototype.on = function (x, func) {
            if (!(typeof func == "function" && x)) {
                return this;
            }
            if (x in this._events) {
                RongIMLib.MessageUtil.indexOf(this._events, func) == -1 && this._events[x].push(func);
            }
            else {
                this._events[x] = [func];
            }
            return this;
        };
        Socket.prototype.removeEvent = function (x, fn) {
            if (x in this._events) {
                for (var a = 0, l = this._events[x].length; a < l; a++) {
                    if (this._events[x][a] == fn) {
                        this._events[x].splice(a, 1);
                    }
                }
            }
            return this;
        };
        Socket.prototype._encode = function (x) {
            var str = "?messageid=" + x.getMessageId() + "&header=" + x.getHeaderFlag() + "&sessionid=" + RongIMLib.RongIMClient._storageProvider.getItem("sId" + RongIMLib.Navigation.Endpoint.userId);
            if (!/(PubAckMessage|QueryConMessage)/.test(x._name)) {
                str += "&topic=" + x.getTopic() + "&targetid=" + (x.getTargetId() || "");
            }
            return {
                url: str,
                data: "getData" in x ? x.getData() : ""
            };
        };
        //消息通道常量，所有和通道相关判断均用 XHR_POLLING WEBSOCKET两属性
        Socket.XHR_POLLING = "xhr-polling";
        Socket.WEBSOCKET = "websocket";
        return Socket;
    })();
    RongIMLib.Socket = Socket;
    //连接端消息累
    var Client = (function () {
        function Client(token, appId) {
            this.timeoutMillis = 6000;
            this.timeout_ = 0;
            this.sdkVer = '';
            this.apiVer = Math.floor(Math.random() * 1e6);
            this.channel = null;
            this.handler = null;
            this.userId = "";
            this.reconnectObj = {};
            this.heartbeat = 0;
            this.pullMsgHearbeat = 0;
            this.chatroomId = "";
            this.SyncTimeQueue = [];
            this.cacheMessageIds = [];
            this.token = token;
            this.appId = appId;
            this.SyncTimeQueue.state = "complete";
            this.sdkVer = RongIMLib.RongIMClient.sdkver;
        }
        Client.prototype.resumeTimer = function () {
            var me = this;
            this.timeout_ = setTimeout(function () {
                me.channel.disconnect(RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
            }, this.timeoutMillis);
        };
        Client.prototype.pauseTimer = function () {
            if (this.timeout_) {
                clearTimeout(this.timeout_);
                this.timeout_ = 0;
            }
        };
        Client.prototype.connect = function (_callback) {
            //实例消息处理类
            this.handler = new MessageHandler(this);
            //设置连接回调
            this.handler.setConnectCallback(_callback);
            //实例通道类型
            var me = this;
            this.channel = new Channel(function () {
                RongIMLib.Transportations._TransportType == Socket.WEBSOCKET && me.keepLive();
            }, this);
            //触发状态改变观察者
            this.channel.socket.fire("StatusChanged", RongIMLib.ConnectionStatus.CONNECTING);
            //没有返回地址就手动抛出错误
            //_callback.onError(ConnectionState.NOT_AUTHORIZED);
        };
        Client.prototype.checkSocket = function (callback) {
            var me = this;
            me.channel.writeAndFlush(new RongIMLib.PingReqMessage());
            var count = 0;
            var checkTimeout = setInterval(function () {
                if (!RongIMLib.RongIMClient._memoryStore.isFirstPingMsg) {
                    clearInterval(checkTimeout);
                    callback.onSuccess();
                }
                else {
                    if (count > 15) {
                        clearInterval(checkTimeout);
                        callback.onError();
                    }
                }
                count++;
            }, 100);
        };
        Client.prototype.keepLive = function () {
            if (this.heartbeat > 0) {
                clearInterval(this.heartbeat);
            }
            var me = this;
            me.heartbeat = setInterval(function () {
                me.resumeTimer();
                me.channel.writeAndFlush(new RongIMLib.PingReqMessage());
            }, 30000);
            if (me.pullMsgHearbeat > 0) {
                clearInterval(me.pullMsgHearbeat);
            }
            me.pullMsgHearbeat = setInterval(function () {
                me.syncTime(true, undefined, undefined, false);
            }, 180000);
        };
        Client.prototype.clearHeartbeat = function () {
            clearInterval(this.heartbeat);
            this.heartbeat = 0;
            this.pauseTimer();
            clearInterval(this.pullMsgHearbeat);
            this.pullMsgHearbeat = 0;
        };
        Client.prototype.publishMessage = function (_topic, _data, _targetId, _callback, _msg, option) {
            option = option || {};
            var isNoAck = option.isNoAck;
            var hasCallback = !!_callback;
            var msgId = RongIMLib.MessageIdHandler.messageIdPlus(this.channel.reconnect);
            if (!msgId) {
                return;
            }
            var msg = new RongIMLib.PublishMessage(_topic, _data, _targetId);
            msg.setMessageId(msgId);
            if (isNoAck) {
                msg.setQos(Qos.AT_LEAST_ONCE);
                _callback.onSuccess(msg);
            }
            else if (hasCallback) {
                msg.setQos(Qos.AT_LEAST_ONCE);
                this.handler.putCallback(new RongIMLib.PublishCallback(_callback.onSuccess, _callback.onError), msg.getMessageId(), _msg);
            }
            else {
                msg.setQos(Qos.AT_MOST_ONCE);
            }
            this.channel.writeAndFlush(msg);
        };
        Client.prototype.queryMessage = function (_topic, _data, _targetId, _qos, _callback, pbtype) {
            if (_topic == "userInf") {
                if (Client.userInfoMapping[_targetId]) {
                    _callback.onSuccess(Client.userInfoMapping[_targetId]);
                    return;
                }
            }
            var msgId = RongIMLib.MessageIdHandler.messageIdPlus(this.channel.reconnect);
            if (!msgId) {
                return;
            }
            var msg = new RongIMLib.QueryMessage(_topic, _data, _targetId);
            msg.setMessageId(msgId);
            msg.setQos(_qos);
            this.handler.putCallback(new RongIMLib.QueryCallback(_callback.onSuccess, _callback.onError), msg.getMessageId(), pbtype);
            this.channel.writeAndFlush(msg);
        };
        Client.prototype.invoke = function (isPullMsg, chrmId, offlineMsg) {
            var time, modules, str, me = this, target, temp = this.SyncTimeQueue.shift();
            if (temp == undefined) {
                return;
            }
            this.SyncTimeQueue.state = "pending";
            var localSyncTime = RongIMLib.SyncTimeUtil.get();
            var sentBoxTime = localSyncTime.sent;
            var isPullChatroom = temp.type === 2;
            if (temp.type != 2) {
                //普通消息
                time = localSyncTime.received;
                modules = new RongIMLib.RongIMClient.Protobuf.SyncRequestMsg();
                modules.setIspolling(false);
                str = "pullMsg";
                target = this.userId;
                modules.setSendBoxSyncTime(sentBoxTime);
            }
            else {
                //聊天室消息
                target = temp.chrmId || me.chatroomId;
                time = RongIMLib.RongIMClient._memoryStore.lastReadTime.get(target + Bridge._client.userId + "CST") || 0;
                modules = new RongIMLib.RongIMClient.Protobuf.ChrmPullMsg();
                modules.setCount(0);
                str = "chrmPull";
                if (!target) {
                    var errorMsg = "syncTime:Received messages of chatroom but was not init";
                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_CHRM_PULL_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                            msg: errorMsg
                        } });
                    throw new Error(errorMsg);
                }
            }
            //判断服务器给的时间是否消息本地存储的时间，小于的话不执行拉取操作，进行一下步队列操作
            if (temp.pulltime <= time) {
                this.SyncTimeQueue.state = "complete";
                this.invoke(isPullMsg, target, offlineMsg);
                return;
            }
            if (isPullMsg && 'setIsPullSend' in modules) {
                modules.setIsPullSend(true);
            }
            modules.setSyncTime(time);
            //发送queryMessage请求
            this.queryMessage(str, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), target, Qos.AT_LEAST_ONCE, {
                onSuccess: function (collection) {
                    var sync = RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime), symbol = target;
                    //把返回时间戳存入本地，普通消息key为userid，聊天室消息key为userid＋'CST'；value都为服务器返回的时间戳
                    var isChrmPull = str == 'chrmPull';
                    if (isChrmPull) {
                        symbol += Bridge._client.userId + "CST";
                        RongIMLib.RongIMClient._memoryStore.lastReadTime.set(symbol, sync);
                    }
                    else {
                        var storage = RongIMLib.RongIMClient._storageProvider;
                        if (sync > storage.getItem(symbol)) {
                            storage.setItem(symbol, sync);
                        }
                    }
                    //把拉取到的消息逐条传给消息监听器
                    var list = collection.list;
                    var isPullFinished = collection.finished;
                    // chrmPull 没有 finished 字段，自动设置为拉取完成
                    if (isChrmPull) {
                        isPullFinished = true;
                    }
                    // 兼容长轮训 finished 为空的造成丢消息情况
                    if (typeof isPullFinished == 'undefined') {
                        isPullFinished = true;
                    }
                    RongIMLib.RongIMClient._memoryStore.isPullFinished = isPullFinished;
                    var connectAckTime = RongIMLib.RongIMClient._memoryStore.connectAckTime;
                    var len = list.length;
                    for (var i = 0, count = len; i < len; i++) {
                        count -= 1;
                        var message = list[i];
                        var sentTime = RongIMLib.MessageUtil.int64ToTimestamp(message.dataTime);
                        var isSender = message.direction == RongIMLib.MessageDirection.SEND;
                        var compareTime = isSender ? sentBoxTime : time;
                        if (sentTime > compareTime || isPullChatroom) {
                            var isSyncMessage = false;
                            var isOffLineMessage = sentTime < connectAckTime;
                            try {
                                Bridge._client.handler.onReceived(message, undefined, isOffLineMessage, count, isSyncMessage, isPullFinished);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    if (len <= 200 && str == 'pullMsg') {
                        var Conversation = RongIMLib.RongIMClient._dataAccessProvider.Conversation;
                        var conversationList = RongIMLib.RongIMClient._memoryStore.conversationList;
                        Conversation._notify(conversationList);
                    }
                    me.SyncTimeQueue.state = "complete";
                    me.invoke(isPullMsg, target, offlineMsg);
                },
                onError: function (error) {
                    me.SyncTimeQueue.state = "complete";
                    me.invoke(isPullMsg, target, offlineMsg);
                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_QUERY_MSG_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                            action: 'invoke -> queryMessage',
                            error: error
                        } });
                }
            }, "DownStreamMessages");
        };
        Client.prototype.syncTime = function (_type, pullTime, chrmId, offlineMsg) {
            this.SyncTimeQueue.push({ type: _type, pulltime: pullTime, chrmId: chrmId });
            //如果队列中只有一个成员并且状态已经完成就执行invoke方法
            if (this.SyncTimeQueue.length == 1 && this.SyncTimeQueue.state == "complete") {
                this.invoke(!_type, chrmId, offlineMsg);
            }
        };
        Client.prototype.__init = function (f) {
            this.handler = new MessageHandler(this);
            //设置连接回调
            this.handler.setConnectCallback(RongIMLib.RongIMClient._memoryStore.callback);
            this.channel = new Channel(f, this);
        };
        Client.prototype.clearCacheMessageIds = function () {
            this.cacheMessageIds = [];
        };
        Client.userInfoMapping = {};
        return Client;
    })();
    RongIMLib.Client = Client;
    //连接类，实现imclient与connect_client的连接
    var Bridge = (function () {
        function Bridge() {
        }
        Bridge.getInstance = function () {
            return new Bridge();
        };
        //连接服务器
        Bridge.prototype.connect = function (appKey, token, callback) {
            if (!RongIMLib.RongIMClient.Protobuf) {
                return;
            }
            Bridge._client = new RongIMLib.Navigation().connect(appKey, token, callback);
            return Bridge._client;
        };
        Bridge.prototype.setListener = function () {
            Channel._ConnectionStatusListener = {
                onChanged: function (status) {
                    RongIMLib.RongUtil.forEach(RongIMLib.RongIMClient.statusListeners, function (watch) {
                        RongIMLib.RongUtil.isFunction(watch) && watch(status);
                    });
                    if (status == RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE) {
                        RongIMLib.RongIMClient._memoryStore.networkUnavailable = true;
                    }
                }
            };
            Channel._ReceiveMessageListener = {
                onReceived: function (msg, count, hasMore) {
                    RongIMLib.RongUtil.forEach(RongIMLib.RongIMClient.messageListeners, function (watch) {
                        RongIMLib.RongUtil.isFunction(watch) && watch(msg, count, hasMore);
                    });
                }
            };
        };
        Bridge.prototype.reconnect = function (callabck) {
            Bridge._client.channel.reconnect(callabck);
        };
        Bridge.prototype.disconnect = function () {
            Bridge._client.channel.disconnect(2);
        };
        //执行queryMessage请求
        Bridge.prototype.queryMsg = function (topic, content, targetId, callback, pbname) {
            if (typeof topic != "string") {
                topic = _topic[topic];
            }
            Bridge._client.queryMessage(topic, content, targetId, Qos.AT_MOST_ONCE, callback, pbname);
        };
        //发送消息 执行publishMessage 请求
        Bridge.prototype.pubMsg = function (topic, content, targetId, callback, msg, methodType, params) {
            params = params || {};
            if (typeof methodType == 'number') {
                if (methodType == RongIMLib.MethodType.CUSTOMER_SERVICE) {
                    Bridge._client.publishMessage("pcuMsgP", content, targetId, callback, msg);
                }
                else if (methodType == RongIMLib.MethodType.RECALL) {
                    Bridge._client.publishMessage("recallMsg", content, targetId, callback, msg);
                }
            }
            else {
                var isStatusMessage = params.isStatus;
                var statusTopic = RongIMLib.StatusTopic[topic];
                if (isStatusMessage && statusTopic) {
                    Bridge._client.publishMessage(statusTopic, content, targetId, callback, msg, {
                        isNoAck: true
                    });
                }
                else {
                    Bridge._client.publishMessage(_topic[10][topic], content, targetId, callback, msg); // 非状态消息, 逻辑不变
                }
            }
        };
        return Bridge;
    })();
    RongIMLib.Bridge = Bridge;
    var MessageHandler = (function () {
        function MessageHandler(client) {
            this.map = {};
            this.connectCallback = null;
            if (!Channel._ReceiveMessageListener) {
                throw new Error("please set onReceiveMessageListener");
            }
            this._onReceived = Channel._ReceiveMessageListener.onReceived;
            this._client = client;
            this.syncMsgMap = new Object;
        }
        //把对象推入回调对象队列中，并启动定时器
        MessageHandler.prototype.putCallback = function (callbackObj, _publishMessageId, _msg) {
            var item = {
                Callback: callbackObj,
                Message: _msg
            };
            item.Callback.resumeTimer();
            this.map[_publishMessageId] = item;
        };
        //设置连接回调对象，启动定时器
        MessageHandler.prototype.setConnectCallback = function (_connectCallback) {
            if (_connectCallback) {
                this.connectCallback = new RongIMLib.ConnectAck(_connectCallback.onSuccess, _connectCallback.onError, this._client);
            }
        };
        MessageHandler.prototype.handleChrmKVPullMsg = function (msg) {
            try {
                var pbtype = 'NotifyMsg';
                var data = RongIMLib.CallbackMapping.getInstance().mapping(RongIMLib.RongIMClient.Protobuf[pbtype].decode(msg.data), pbtype);
                var timestamp = RongIMLib.MessageUtil.int64ToTimestamp(data.time);
                if (data.type === 2) {
                    RongIMLib.ChrmKVHandler.pull(data.chrmId, timestamp);
                }
                else if (data.type === 3) {
                    RongIMLib.RongIMClient._dataAccessProvider.conversationStatusManager.pull({
                        time: timestamp
                    });
                }
            }
            catch (e) {
            }
        };
        MessageHandler.prototype.onReceived = function (msg, pubAckItem, offlineMsg, leftCount, isSync) {
            if (!msg) {
                return;
            }
            //实体对象
            var entity, 
            //解析完成的消息对象
            message, 
            //会话对象
            con, 
            // 是否为直发消息
            isStraightMsg = false;
            if (msg._name != "PublishMessage") {
                entity = msg;
                RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId, RongIMLib.MessageUtil.int64ToTimestamp(entity.dataTime));
            }
            else {
                if (msg.getTopic() == "s_ntf") {
                    entity = RongIMLib.RongIMClient.Protobuf.NotifyMsg.decode(msg.getData());
                    this._client.syncTime(entity.type, RongIMLib.MessageUtil.int64ToTimestamp(entity.time), entity.chrmId);
                    return;
                }
                else if (msg.getTopic() == "s_msg") {
                    isStraightMsg = true;
                    entity = RongIMLib.RongIMClient.Protobuf.DownStreamMessage.decode(msg.getData());
                    var timestamp = RongIMLib.MessageUtil.int64ToTimestamp(entity.dataTime);
                    RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId, timestamp);
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.get(this._client.userId, timestamp);
                }
                else if (msg.getTopic() == "s_stat") {
                    entity = RongIMLib.RongIMClient.Protobuf.GetUserStatusOutput.decode(msg.getData());
                    entity = RongIMLib.RongInnerTools.convertUserStatus(entity);
                    RongIMLib.RongIMClient.userStatusObserver.notify({
                        key: entity.userId,
                        entity: entity
                    });
                    return;
                }
                else if (msg.getTopic() === 's_cmd') {
                    this.handleChrmKVPullMsg(msg);
                    return;
                }
                else {
                    if (Bridge._client.sdkVer && Bridge._client.sdkVer == "1.0.0") {
                        return;
                    }
                    try {
                        entity = RongIMLib.RongIMClient.Protobuf.UpStreamMessage.decode(msg.getData());
                    }
                    catch (e) {
                        RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_DECODE_MSG_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: { stack: e, msg: 'MessageHandler -> onReceived' } });
                        return;
                    }
                    var tmpTopic = msg.getTopic();
                    var tmpType = tmpTopic.substr(0, 2);
                    if (tmpType == "pp") {
                        entity.type = 1;
                    }
                    else if (tmpType == "pd") {
                        entity.type = 2;
                    }
                    else if (tmpType == "pg") {
                        entity.type = 3;
                    }
                    else if (tmpType == "ch") {
                        entity.type = 4;
                    }
                    else if (tmpType == "pc") {
                        entity.type = 5;
                    }
                    //复用字段，targetId 以此为准
                    entity.groupId = msg.getTargetId();
                    entity.fromUserId = this._client.userId;
                    entity.dataTime = Date.parse(new Date().toString());
                }
                if (!entity) {
                    return;
                }
            }
            var isPullFinished = RongIMLib.RongIMClient._memoryStore.isPullFinished;
            // PullMsg 没有拉取完成，抛弃所有直发在线消息，抛弃的消息会在 PullMsg 中返回
            if (!isPullFinished && !offlineMsg && isStraightMsg) {
                return;
            }
            //解析实体对象为消息对象。
            message = RongIMLib.MessageUtil.messageParser(entity, this._onReceived, offlineMsg);
            var isRTCMessage = message.conversationType == 12;
            if (isRTCMessage) {
                RongIMLib.RongIMClient.RTCListener(message);
                RongIMLib.RongIMClient.RTCInnerListener(message);
                RongIMLib.RongIMClient.RTCSignalLisener(message);
                return;
            }
            var isRecall = (msg.getTopic && msg.getTopic() == "recallMsg");
            if (isRecall) {
                var content = message.content;
                message.conversationType = content.conversationType;
                message.targetId = content.targetId;
                message.messageId = null;
            }
            if (pubAckItem) {
                message.messageUId = pubAckItem.getMessageUId();
                message.sentTime = pubAckItem.getTimestamp();
                RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId, message.sentTime);
            }
            if (message === null) {
                return;
            }
            var isChatroomMessage = message.conversationType == RongIMLib.ConversationType.CHATROOM;
            if (!isChatroomMessage) {
                var msgTag = RongIMLib.RongIMClient.MessageParams[message.messageType].msgTag.getMessageTag();
                if (msgTag >= 0) {
                    RongIMLib.SyncTimeUtil.set(message);
                }
                var isSend = (message.messageDirection == RongIMLib.MessageDirection.SEND);
                if (isSend) {
                    var storageProvider = RongIMLib.RongIMClient._storageProvider;
                    var userId = RongIMLib.Bridge._client.userId;
                    var lastSentTime = storageProvider.getItem('last_sentTime_' + userId) || 0;
                    if (message.sentTime <= lastSentTime && !isSync) {
                        return;
                    }
                }
            }
            // 设置会话时间戳并且判断是否传递 message  发送消息未处理会话时间戳
            // key：'converST_' + 当前用户 + conversationType + targetId
            // RongIMClient._storageProvider.setItem('converST_' + Bridge._client.userId + message.conversationType + message.targetId, message.sentTime);
            // var isPersited = (RongIMClient.MessageParams[message.messageType].msgTag.getMessageTag() > 0);
            var msgTag = RongIMLib.RongIMClient.MessageParams[message.messageType].msgTag.getMessageTag();
            var isPersited = msgTag === 3 || msgTag === 2;
            if (isPersited) {
                con = RongIMLib.RongIMClient._dataAccessProvider.getConversation(message.conversationType, message.targetId, {
                    onSuccess: function () { },
                    onError: function () { }
                });
                if (!con) {
                    con = RongIMLib.RongIMClient.getInstance().createConversation(message.conversationType, message.targetId, "");
                }
                if (message.messageDirection == RongIMLib.MessageDirection.RECEIVE && (entity.status & 64) == 64) {
                    var mentioneds = RongIMLib.RongIMClient._storageProvider.getItem("mentioneds_" + Bridge._client.userId + '_' + message.conversationType + '_' + message.targetId);
                    var key = message.conversationType + '_' + message.targetId, info = {};
                    if (message.content && message.content.mentionedInfo) {
                        info[key] = { uid: message.messageUId, time: message.sentTime, mentionedInfo: message.content.mentionedInfo };
                        RongIMLib.RongIMClient._storageProvider.setItem("mentioneds_" + Bridge._client.userId + '_' + message.conversationType + '_' + message.targetId, JSON.stringify(info));
                        mentioneds = JSON.stringify(info);
                    }
                    if (mentioneds) {
                        var info = JSON.parse(mentioneds);
                        con.mentionedMsg = info[key];
                    }
                }
                var isReceiver = message.messageDirection == RongIMLib.MessageDirection.RECEIVE;
                if (isReceiver && message.senderUserId != Bridge._client.userId) {
                    con.unreadMessageCount = con.unreadMessageCount + 1;
                    if (RongIMLib.RongUtil.supportLocalStorage()) {
                        // var originUnreadCount = RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + con.conversationType + con.targetId); // 与本地存储会话合并
                        // var newUnreadCount = Number(originUnreadCount) + 1;
                        // RongIMClient._storageProvider.setItem("cu" + Bridge._client.userId + con.conversationType + message.targetId, newUnreadCount);
                        var newUnreadCount = RongIMLib.UnreadCountHandler.add(con.conversationType, message.targetId, 1, message.sentTime);
                        con.unreadMessageCount = newUnreadCount;
                    }
                }
                var receivedTime = new Date().getTime();
                con.receivedTime = RongIMLib.MessageUtil.getCheckedTime(receivedTime);
                con.receivedStatus = message.receivedStatus;
                con.senderUserId = message.sendUserId;
                con.notificationStatus = RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;
                con.isTop = false;
                con.latestMessageId = message.messageId;
                con.latestMessage = message;
                con.sentTime = message.sentTime;
                RongIMLib.RongIMClient._dataAccessProvider.addConversation(con, { onSuccess: function (data) {
                        if (!offlineMsg) {
                            var Conversation_1 = RongIMLib.RongIMClient._dataAccessProvider.Conversation;
                            var conversationList = RongIMLib.RongIMClient._memoryStore.conversationList;
                            Conversation_1._notify(conversationList);
                        }
                    }, onError: function () { } });
            }
            if (message.conversationType == RongIMLib.ConversationType.CUSTOMER_SERVICE && (message.messageType == "ChangeModeResponseMessage" || message.messageType == "SuspendMessage" || message.messageType == "HandShakeResponseMessage" ||
                message.messageType == "TerminateMessage" || message.messageType == "CustomerStatusUpdateMessage" || message.messageType == "TextMessage" || message.messageType == "InformationNotificationMessage")) {
                if (!RongIMLib.RongIMClient._memoryStore.custStore["isInit"]) {
                    return;
                }
            }
            if (message.conversationType == RongIMLib.ConversationType.CUSTOMER_SERVICE && message.messageType != "HandShakeResponseMessage") {
                if (!RongIMLib.RongIMClient._memoryStore.custStore[message.targetId]) {
                    return;
                }
                if (message.messageType == "TerminateMessage") {
                    if (RongIMLib.RongIMClient._memoryStore.custStore[message.targetId].sid != message.content.sid) {
                        return;
                    }
                }
            }
            if (message.messageType === RongIMLib.RongIMClient.MessageType["HandShakeResponseMessage"]) {
                var session = message.content.data;
                RongIMLib.RongIMClient._memoryStore.custStore[message.targetId] = session;
                if (session.serviceType == RongIMLib.CustomerType.ONLY_HUMAN || session.serviceType == RongIMLib.CustomerType.HUMAN_FIRST) {
                    if (session.notAutoCha == "1") {
                        RongIMLib.RongIMClient.getInstance().switchToHumanMode(message.targetId, {
                            onSuccess: function () { },
                            onError: function () { }
                        });
                    }
                }
            }
            if (RongIMLib.LoggerUtil.isLogCmdMsg(message)) {
                RongIMLib.Logger.reportMNLog(message.content);
                return;
            }
            var d = new Date(), m = d.getMonth() + 1, date = d.getFullYear() + '/' + (m.toString().length == 1 ? '0' + m : m) + '/' + d.getDate();
            //new Date(date).getTime() - message.sentTime < 1 逻辑判断 超过 1 天未收的 ReadReceiptRequestMessage 离线消息自动忽略。
            var dealtime = new Date(date).getTime() - message.sentTime < 0;
            if (RongIMLib.RongUtil.supportLocalStorage() && message.messageType === RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"] && dealtime && message.messageDirection == RongIMLib.MessageDirection.SEND) {
                var sentkey = Bridge._client.userId + message.content.messageUId + "SENT";
                RongIMLib.RongIMClient._storageProvider.setItem(sentkey, JSON.stringify({ count: 0, dealtime: message.sentTime, userIds: {} }));
            }
            else if (RongIMLib.RongUtil.supportLocalStorage() && message.messageType === RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"] && dealtime) {
                var reckey = Bridge._client.userId + message.conversationType + message.targetId + 'RECEIVED', recData = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(reckey));
                if (recData) {
                    if (message.senderUserId in recData) {
                        if (recData[message.senderUserId].uIds && recData[message.senderUserId].uIds && recData[message.senderUserId].uIds.indexOf(message.content.messageUId) == -1) {
                            recData[message.senderUserId].uIds.push(message.content.messageUId);
                            recData[message.senderUserId].dealtime = message.sentTime;
                            recData[message.senderUserId].isResponse = false;
                            RongIMLib.RongIMClient._storageProvider.setItem(reckey, JSON.stringify(recData));
                        }
                        else {
                            return;
                        }
                    }
                    else {
                        var objSon = { uIds: [message.content.messageUId], dealtime: message.sentTime, isResponse: false };
                        recData[message.senderUserId] = objSon;
                        RongIMLib.RongIMClient._storageProvider.setItem(reckey, JSON.stringify(recData));
                    }
                }
                else {
                    var obj = {};
                    obj[message.senderUserId] = { uIds: [message.content.messageUId], dealtime: message.sentTime, isResponse: false };
                    RongIMLib.RongIMClient._storageProvider.setItem(reckey, JSON.stringify(obj));
                }
            }
            if (RongIMLib.RongUtil.supportLocalStorage() && message.messageType === RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"] && dealtime) {
                var receiptResponseMsg = message.content;
                if (RongIMLib.RongUtil.isUndefined(receiptResponseMsg) || RongIMLib.RongUtil.isNull(receiptResponseMsg)) {
                    receiptResponseMsg = new RongIMLib.ReadReceiptResponseMessage({});
                }
                var receiptMessageDic = receiptResponseMsg.receiptMessageDic || {}, uIds = receiptMessageDic[Bridge._client.userId], sentkey = "", sentObj;
                message.receiptResponse || (message.receiptResponse = {});
                if (uIds) {
                    var cbuIds = [];
                    for (var i = 0, len = uIds.length; i < len; i++) {
                        sentkey = Bridge._client.userId + uIds[i] + "SENT";
                        sentObj = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(sentkey));
                        if (sentObj && !(message.senderUserId in sentObj.userIds)) {
                            cbuIds.push(uIds[i]);
                            sentObj.count += 1;
                            sentObj.userIds[message.senderUserId] = message.sentTime;
                            message.receiptResponse[uIds[i]] = sentObj.count;
                            RongIMLib.RongIMClient._storageProvider.setItem(sentkey, JSON.stringify(sentObj));
                        }
                    }
                    receiptResponseMsg.receiptMessageDic[Bridge._client.userId] = cbuIds;
                    message.content = receiptResponseMsg;
                }
            }
            var that = this;
            if (RongIMLib.RongIMClient._voipProvider && ['AcceptMessage', 'RingingMessage', 'HungupMessage', 'InviteMessage', 'MediaModifyMessage', 'MemberModifyMessage'].indexOf(message.messageType) > -1) {
                setTimeout(function () {
                    RongIMLib.RongIMClient._voipProvider.onReceived(message);
                });
            }
            else {
                var count = leftCount || 0;
                var hasMore = !isPullFinished;
                try {
                    that._onReceived(message, count, hasMore);
                }
                catch (e) {
                    console.error(e);
                }
            }
        };
        MessageHandler.prototype.handleMessage = function (msg) {
            if (!msg) {
                return;
            }
            if (msg && RongIMLib.RongUtil.isObject(msg) && msg.timestamp) {
                RongIMLib.MessageUtil.setDeltaTime(msg.timestamp);
            }
            switch (msg._name) {
                case "ConnAckMessage":
                    Bridge._client.handler.connectCallback.process(msg.getStatus(), msg.getUserId(), msg.getTimestamp());
                    break;
                case "PublishMessage":
                    if (!msg.getSyncMsg() && msg.getQos() != 0) {
                        Bridge._client.channel.writeAndFlush(new RongIMLib.PubAckMessage(msg.getMessageId()));
                    }
                    // TODO && ->
                    if (msg.getSyncMsg() && !RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                        Bridge._client.handler.syncMsgMap[msg.getMessageId()] = msg;
                    }
                    else {
                        //如果是PublishMessage就把该对象给onReceived方法执行处理
                        Bridge._client.handler.onReceived(msg);
                    }
                    break;
                case "QueryAckMessage":
                    if (msg.getQos() != 0) {
                        Bridge._client.channel.writeAndFlush(new RongIMLib.QueryConMessage(msg.getMessageId()));
                    }
                    var temp = Bridge._client.handler.map[msg.getMessageId()];
                    if (temp) {
                        //执行回调操作
                        temp.Callback.process(msg.getStatus(), msg.getData(), msg.getDate(), temp.Message);
                        delete Bridge._client.handler.map[msg.getMessageId()];
                    }
                    break;
                case "PubAckMessage":
                    var item = Bridge._client.handler.map[msg.getMessageId()];
                    if (item) {
                        item.Callback.process(msg.getStatus() || 0, msg.getMessageUId(), msg.getTimestamp(), item.Message, msg.getMessageId());
                        delete Bridge._client.handler.map[msg.getMessageId()];
                    }
                    else {
                        var userId = RongIMLib.Bridge._client.userId;
                        RongIMLib.RongIMClient._storageProvider.setItem('last_sentTime_' + userId, msg.timestamp);
                        Bridge._client.handler.onReceived(Bridge._client.handler.syncMsgMap[msg.messageId], msg, null, null, true);
                        delete Bridge._client.handler.syncMsgMap[msg.getMessageId()];
                    }
                    break;
                case "PingRespMessage":
                    if (RongIMLib.RongIMClient._memoryStore.isFirstPingMsg) {
                        RongIMLib.RongIMClient._memoryStore.isFirstPingMsg = false;
                    }
                    else {
                        Bridge._client.pauseTimer();
                    }
                    break;
                case "DisconnectMessage":
                    Bridge._client.channel.disconnect(msg.getStatus());
                    break;
                default:
                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_CATCH_UNKNOWN_MSG_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                            action: 'MessageHandler -> handleMessage',
                            msg: msg
                        } });
            }
        };
        return MessageHandler;
    })();
    RongIMLib.MessageHandler = MessageHandler;
})(RongIMLib || (RongIMLib = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../dts/helper.d.ts"/>
var RongIMLib;
(function (RongIMLib) {
    var MessageCallback = (function () {
        function MessageCallback(error) {
            this.timeout = null;
            this.onError = null;
            if (error && typeof error == "number") {
                this.timeoutMillis = error;
            }
            else {
                this.timeoutMillis = 30000;
                this.onError = error;
            }
        }
        MessageCallback.prototype.resumeTimer = function () {
            var me = this;
            if (this.timeoutMillis > 0 && !this.timeout) {
                this.timeout = setTimeout(function () {
                    me.readTimeOut(true);
                }, this.timeoutMillis);
            }
        };
        MessageCallback.prototype.pauseTimer = function () {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        };
        MessageCallback.prototype.readTimeOut = function (isTimeout) {
            if (isTimeout && this.onError) {
                this.onError(RongIMLib.ErrorCode.TIMEOUT);
            }
            else {
                this.pauseTimer();
            }
        };
        return MessageCallback;
    })();
    RongIMLib.MessageCallback = MessageCallback;
    var CallbackMapping = (function () {
        function CallbackMapping() {
            this.publicServiceList = [];
        }
        CallbackMapping.getInstance = function () {
            return new CallbackMapping();
        };
        CallbackMapping.prototype.pottingProfile = function (item) {
            var temp;
            this.profile = new RongIMLib.PublicServiceProfile();
            temp = JSON.parse(item.extra);
            this.profile.isGlobal = temp.isGlobal;
            this.profile.introduction = temp.introduction;
            this.profile.menu = temp.menu;
            this.profile.hasFollowed = temp.follow;
            this.profile.publicServiceId = item.mpid;
            this.profile.name = item.name;
            this.profile.portraitUri = item.portraitUrl;
            this.profile.conversationType = item.type == "mc" ? RongIMLib.ConversationType.APP_PUBLIC_SERVICE : RongIMLib.ConversationType.PUBLIC_SERVICE;
            this.publicServiceList.push(this.profile);
        };
        CallbackMapping.prototype.mapping = function (entity, tag) {
            switch (tag) {
                case "GetUserInfoOutput":
                    var userInfo = new RongIMLib.UserInfo(entity.userId, entity.userName, entity.userPortrait);
                    return userInfo;
                case "GetQNupTokenOutput":
                    return {
                        deadline: RongIMLib.MessageUtil.int64ToTimestamp(entity.deadline),
                        token: entity.token,
                        bosToken: entity.bosToken,
                        bosDate: entity.bosDate,
                        path: entity.path
                    };
                case "GetQNdownloadUrlOutput":
                    return {
                        downloadUrl: entity.downloadUrl
                    };
                case "CreateDiscussionOutput":
                    return entity.id;
                case "ChannelInfoOutput":
                    var disInfo = new RongIMLib.Discussion();
                    disInfo.creatorId = entity.adminUserId;
                    disInfo.id = entity.channelId;
                    disInfo.memberIdList = entity.firstTenUserIds;
                    disInfo.name = entity.channelName;
                    disInfo.isOpen = entity.openStatus;
                    return disInfo;
                case "GroupHashOutput":
                    return entity.result;
                case "QueryBlackListOutput":
                    return entity.userIds;
                case "SearchMpOutput":
                case "PullMpOutput":
                    if (entity.info) {
                        var self = this;
                        Array.forEach(entity.info, function (item) {
                            setTimeout(function () {
                                self.pottingProfile(item);
                            }, 100);
                        });
                    }
                    return this.publicServiceList;
                default:
                    return entity;
            }
        };
        return CallbackMapping;
    })();
    RongIMLib.CallbackMapping = CallbackMapping;
    var PublishCallback = (function (_super) {
        __extends(PublishCallback, _super);
        function PublishCallback(_cb, _timeout) {
            _super.call(this, _timeout);
            this._cb = _cb;
            this._timeout = _timeout;
        }
        PublishCallback.prototype.process = function (_status, messageUId, timestamp, _msg, messageId) {
            this.readTimeOut();
            if (_status == 0) {
                if (_msg) {
                    _msg.setSentStatus = _status;
                }
                var isPullFinished = RongIMLib.RongIMClient._memoryStore.isPullFinished;
                if (isPullFinished) {
                    var userId = RongIMLib.Bridge._client.userId;
                    var stroageProvider = RongIMLib.RongIMClient._storageProvider;
                    stroageProvider.setItem('last_sentTime_' + userId, timestamp);
                    RongIMLib.SyncTimeUtil.set({
                        messageDirection: RongIMLib.MessageDirection.SEND,
                        sentTime: timestamp
                    });
                }
                this._cb({ messageUId: messageUId, timestamp: timestamp, messageId: messageId });
            }
            else {
                this._timeout(_status, {
                    messageUId: messageUId,
                    sentTime: timestamp
                });
            }
        };
        PublishCallback.prototype.readTimeOut = function (x) {
            MessageCallback.prototype.readTimeOut.call(this, x);
        };
        return PublishCallback;
    })(MessageCallback);
    RongIMLib.PublishCallback = PublishCallback;
    var QueryCallback = (function (_super) {
        __extends(QueryCallback, _super);
        function QueryCallback(_cb, _timeout) {
            _super.call(this, _timeout);
            this._cb = _cb;
            this._timeout = _timeout;
        }
        QueryCallback.prototype.process = function (status, data, serverTime, pbtype) {
            this.readTimeOut();
            if (pbtype && data && status == 0) {
                try {
                    data = CallbackMapping.getInstance().mapping(RongIMLib.RongIMClient.Protobuf[pbtype].decode(data), pbtype);
                }
                catch (e) {
                    this._timeout(RongIMLib.ErrorCode.UNKNOWN);
                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_DECODE_QUERY_DATA_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                            stack: e,
                            msg: 'QueryCallback -> process'
                        } });
                    return;
                }
                if ("GetUserInfoOutput" == pbtype) {
                    //pb类型为GetUserInfoOutput的话就把data放入userinfo缓存队列
                    RongIMLib.Client.userInfoMapping[data.userId] = data;
                }
                this._cb(data);
            }
            else {
                status > 0 ? this._timeout(status) : this._cb(status);
            }
        };
        QueryCallback.prototype.readTimeOut = function (x) {
            MessageCallback.prototype.readTimeOut.call(this, x);
        };
        return QueryCallback;
    })(MessageCallback);
    RongIMLib.QueryCallback = QueryCallback;
    var ConnectAck = (function (_super) {
        __extends(ConnectAck, _super);
        function ConnectAck(_cb, _timeout, client) {
            _super.call(this, _timeout);
            this._client = client;
            this._cb = _cb;
            this._timeout = _timeout;
        }
        ConnectAck.prototype.process = function (status, userId, timestamp) {
            this.readTimeOut();
            if (status == 0) {
                this._client.userId = userId;
                var self = this;
                if (!RongIMLib.RongIMClient._memoryStore.depend.isPolling && RongIMLib.RongIMClient._memoryStore.isFirstPingMsg) {
                    RongIMLib.Bridge._client.checkSocket({
                        onSuccess: function () {
                            if (!RongIMLib.RongIMClient.isNotPullMsg) {
                                self._client.syncTime(undefined, undefined, undefined, true);
                            }
                        },
                        onError: function () {
                            RongIMLib.RongIMClient._memoryStore.isFirstPingMsg = false;
                            RongIMLib.RongIMClient.getInstance().disconnect();
                            RongIMLib.RongIMClient.connect(RongIMLib.RongIMClient._memoryStore.token, RongIMLib.RongIMClient._memoryStore.callback);
                        }
                    });
                }
                else {
                    if (!RongIMLib.RongIMClient.isNotPullMsg) {
                        self._client.syncTime(undefined, undefined, undefined, true);
                    }
                }
                RongIMLib.Bridge._client.channel.socket.fire("StatusChanged", 0);
                if (this._client.reconnectObj.onSuccess) {
                    this._client.reconnectObj.onSuccess(userId);
                    delete this._client.reconnectObj.onSuccess;
                }
                else {
                    var me = this;
                    me._cb(userId);
                    // setTimeout(function() { me._cb(userId); }, 500);
                    var depend = RongIMLib.RongIMClient._memoryStore.depend;
                    var maxConversationCount = depend.maxConversationCount;
                    var isNotifyConversationList = depend.isNotifyConversationList;
                    isNotifyConversationList && RongIMLib.RongIMClient._dataAccessProvider.getRemoteConversationList({
                        onSuccess: function (conversationList) {
                            var Conversation = RongIMLib.RongIMClient._dataAccessProvider.Conversation;
                            Conversation._notify(conversationList);
                        },
                        onError: function (code) {
                            console.log('内部获取列表失败: %d', code);
                        }
                    }, null, maxConversationCount);
                }
                RongIMLib.RongIMClient._memoryStore.connectAckTime = timestamp;
                RongIMLib.MessageUtil.setDeltaTime(timestamp);
            }
            else if (status == 6) {
                RongIMLib.RongIMClient.getInstance().disconnect();
                //重定向 连错 CMP
                var me = this;
                var _client = me._client;
                var appId = _client.appId, token = _client.token;
                new RongIMLib.Navigation().requestNavi(token, appId, function () {
                    _client.clearHeartbeat();
                    var newClient = new RongIMLib.Client(token, appId);
                    RongIMLib.Bridge._client = newClient;
                    newClient.__init(function () {
                        RongIMLib.Transportations._TransportType == "websocket" && newClient.keepLive();
                    });
                }, me._timeout, false);
            }
            else {
                RongIMLib.Bridge._client.channel.socket.socket._status = status;
                if (this._client.reconnectObj.onError) {
                    this._client.reconnectObj.onError(status);
                    delete this._client.reconnectObj.onError;
                }
                else {
                    this._timeout(status);
                }
            }
        };
        ConnectAck.prototype.readTimeOut = function (x) {
            MessageCallback.prototype.readTimeOut.call(this, x);
        };
        return ConnectAck;
    })(MessageCallback);
    RongIMLib.ConnectAck = ConnectAck;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var Navigation = (function () {
        function Navigation() {
        }
        Navigation.clear = function () {
            var storage = RongIMLib.RongIMClient._storageProvider;
            storage.removeItem('rc_uid');
            storage.removeItem('serverIndex');
            storage.removeItem('rongSDK');
        };
        Navigation.prototype.getNaviSuccess = function (result, naviUrl) {
            var storage = RongIMLib.RongIMClient._storageProvider;
            storage.setItem('fullnavi', JSON.stringify(result));
            var successNaviProtocol = RongIMLib.RongUtil.getUrlProtocol(naviUrl);
            // navi 请求成功后, 根据 navi 协议头, 设置连接 websocket 协议头
            RongIMLib.RongIMClient.setProtocol(successNaviProtocol);
            storage.setItem(Navigation.StoreProtocolKey, successNaviProtocol);
            var server = result.server;
            if (server) {
                server += ',';
            }
            var backupServer = result.backupServer || '';
            var tpl = '{server}{backupServer}';
            var servers = RongIMLib.RongUtil.tplEngine(tpl, {
                server: server,
                backupServer: backupServer
            });
            servers = servers.split(',');
            storage.setItem('servers', JSON.stringify(servers));
            var token = RongIMLib.RongIMClient._memoryStore.token;
            var uid = RongIMLib.InnerUtil.getUId(token);
            storage.setItem('rc_uid', uid);
            var userId = result.userId;
            storage.setItem('current_user', userId);
            storage.setItem('navi_time', RongIMLib.RongUtil.getTimestamp());
            if (result.voipCallInfo) {
                var callInfo = JSON.parse(result.voipCallInfo);
                RongIMLib.RongIMClient._memoryStore.voipStategy = callInfo.strategy;
                storage.setItem("voipStrategy", callInfo.strategy);
            }
            var uploadDomains = {
                qiniu: result.uploadServer || '',
                bos: result.bosAddr || ''
            };
            storage.setItem('upload_domains', JSON.stringify(uploadDomains));
            //替换本地存储的导航信息 
            var openMp = result.openMp;
            storage.setItem('openMp' + uid, openMp);
            RongIMLib.RongIMClient._memoryStore.depend.openMp = openMp;
        };
        ;
        Navigation.prototype.connect = function (appId, token, callback) {
            var oldAppId = RongIMLib.RongIMClient._storageProvider.getItem("appId");
            //如果appid和本地存储的不一样，清空所有本地存储数据
            if (oldAppId && oldAppId != appId) {
                RongIMLib.RongIMClient._storageProvider.clearItem();
                RongIMLib.RongIMClient._storageProvider.setItem("appId", appId);
            }
            if (!oldAppId) {
                RongIMLib.RongIMClient._storageProvider.setItem("appId", appId);
            }
            var client = new RongIMLib.Client(token, appId);
            this.requestNavi(token, appId, function () {
                client.connect(callback);
            }, callback.onError, true);
            return client;
        };
        Navigation.prototype.requestNavi = function (token, appId, _onsuccess, _onerror, unignore) {
            if (unignore) {
                //根据token生成MD5截取8-16下标的数据与本地存储的导航信息进行比对
                //如果信息和上次的通道类型都一样，不执行navi请求，用本地存储的导航信息连接服务器
                var uId = md5(token).slice(8, 16);
                var storage = RongIMLib.RongIMClient._storageProvider;
                var transportType = storage.getItem("rongSDK");
                var isSameType = (RongIMLib.Transportations._TransportType == transportType);
                var _old = storage.getItem('rc_uid');
                var isSameUser = (_old == uId);
                var servers = storage.getItem('servers');
                var hasServers = (typeof servers == 'string');
                var currentTime = RongIMLib.RongUtil.getTimestamp();
                var naviSavedTime = Number(storage.getItem('navi_time')) || 0;
                var isNotExpired = currentTime - naviSavedTime < RongIMLib.RongIMClient.NavExpiredTime;
                if (isSameUser && isSameType && hasServers && RongIMLib.RongUtil.hasValidWsUrl(servers) && isNotExpired) {
                    RongIMLib.RongIMClient._memoryStore.voipStategy = storage.getItem("voipStrategy");
                    var openMp = storage.getItem('openMp' + uId);
                    RongIMLib.RongIMClient._memoryStore.depend.openMp = openMp;
                    var storageProtocol = storage.getItem(Navigation.StoreProtocolKey);
                    storageProtocol && RongIMLib.RongIMClient.setProtocol(storageProtocol);
                    _onsuccess();
                    return;
                }
            }
            Navigation.clear();
            RongIMLib.RongIMClient.invalidWsUrls = [];
            var context = this;
            var StatusEvent = RongIMLib.Channel._ConnectionStatusListener;
            var depend = RongIMLib.RongIMClient._memoryStore.depend;
            var navigaters = depend.navigaters;
            var naviTimeout = depend.naviTimeout;
            var maxNaviRetry = depend.maxNaviRetry;
            var isNaviJSONP = depend.isNaviJSONP;
            var isWSPingJSONP = depend.isWSPingJSONP;
            var isSupportRequestHeaders = RongIMLib.RongUtil.isSupportRequestHeaders();
            var isRequestJSONP = !isSupportRequestHeaders || isNaviJSONP;
            var requestFunc = isRequestJSONP ? context.requestJSONP : context.request;
            var timer = new RongIMLib.Timer({
                timeout: naviTimeout
            });
            var internalRetry = 1;
            var isRange = function () {
                return internalRetry >= maxNaviRetry;
            };
            var indexTools = new RongIMLib.IndexTools({
                items: navigaters,
                onwheel: function () {
                    internalRetry += 1;
                }
            });
            var consume = function () {
                if (isRange()) {
                    if (isNaviJSONP && isWSPingJSONP) {
                        return _onerror(RongIMLib.ConnectionStatus.RESPONSE_NAVI_ERROR);
                    }
                    // 所有导航请求失败，及所有重试失败后，返回预埋导航配置信息，进行连接。预埋导航配置仅适用公有云环境，私有云仍直接抛出
                    var naviResp = RongIMLib.FixedNaviRespHandler.getResp();
                    var naviHost = navigaters[0];
                    context.getNaviSuccess(naviResp, RongIMLib.RongUtil.getValidNavi(naviHost));
                    _onsuccess();
                    return;
                }
                var index = indexTools.get();
                var navi = navigaters[index];
                navi = RongIMLib.RongUtil.getValidNavi(navi);
                indexTools.add();
                RongIMLib.LoggerUtil.recordFatalLogOfNavi(internalRetry, navigaters);
                var success = function (result) {
                    timer.pause();
                    StatusEvent.onChanged(RongIMLib.ConnectionStatus.RESPONSE_NAVI);
                    var code = result.code;
                    if (RongIMLib.RongUtil.isEqual(code, 200)) {
                        context.getNaviSuccess(result, navi);
                        _onsuccess();
                    }
                    if (RongIMLib.RongUtil.isEqual(code, 401)) {
                        _onerror(RongIMLib.ConnectionState.TOKEN_INCORRECT);
                    }
                    if (RongIMLib.RongUtil.isEqual(code, 403)) {
                        StatusEvent.onChanged(RongIMLib.ConnectionStatus.APPKEY_IS_FAKE);
                    }
                };
                var error = function (status) {
                    if (RongIMLib.RongUtil.isEqual(status, 0)) {
                        return;
                    }
                    timer.pause();
                    StatusEvent.onChanged(RongIMLib.ConnectionStatus.RESPONSE_NAVI_ERROR);
                    consume();
                };
                StatusEvent.onChanged(RongIMLib.ConnectionStatus.REQUEST_NAVI);
                var xhr = requestFunc.call(context, navi, appId, token, success, error);
                timer.resume(function () {
                    StatusEvent.onChanged(RongIMLib.ConnectionStatus.RESPONSE_NAVI_TIMEOUT);
                    xhr.abort();
                    consume();
                });
            };
            consume();
            RongIMLib.Logger.loggerCache.isNewNavi = true;
        };
        Navigation.prototype.getPath = function (navi, appId, token, callbackName) {
            var depend = RongIMLib.RongIMClient._memoryStore.depend;
            var path = (depend.isPolling ? 'cometnavi' : 'navi');
            token = encodeURIComponent(token);
            var sdkver = RongIMLib.RongIMClient.sdkver;
            var random = RongIMLib.RongUtil.getTimestamp();
            var tpl = '{navi}/{path}.js?appId={appId}&token={token}&callBack={callback}&v={sdkver}&r={random}';
            var url = RongIMLib.RongUtil.tplEngine(tpl, {
                navi: navi,
                path: path,
                appId: appId,
                token: token,
                sdkver: sdkver,
                random: random,
                callback: callbackName
            });
            return url;
        };
        Navigation.prototype.request = function (navi, appId, token, success, error) {
            var url = this.getPath(navi, appId, token, 'getServerEndpoint');
            var requestType = "HTTP";
            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_GETN_T, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                    url: url,
                    requestType: requestType
                } });
            return RongIMLib.RongUtil.request({
                url: url,
                success: function (result) {
                    result = result.replace('getServerEndpoint(', '').replace(');', '');
                    // 兼容私有云无分号
                    var lastIndex = result.lastIndexOf(')');
                    var maxIndex = result.length - 1;
                    if (lastIndex == maxIndex) {
                        result = result.substr(0, lastIndex);
                    }
                    result = JSON.parse(result);
                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_GETN_R, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                            code: 0,
                            result: result,
                            url: url,
                            requestType: requestType
                        } });
                    success(result);
                },
                error: function (status, result) {
                    if (status == 401 || status == 403) {
                        success(JSON.parse(result));
                    }
                    else {
                        error(status);
                    }
                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_GETN_R, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                            code: status,
                            result: result,
                            url: url,
                            requestType: requestType
                        } });
                }
            });
        };
        Navigation.prototype.requestJSONP = function (navi, appId, token, success, error) {
            var callbackName = 'getServerEndpoint';
            var requestType = "JSONP";
            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_GETN_T, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                    url: url,
                    requestType: requestType
                } });
            var loggerResult = function (status, result) {
                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_GETN_R, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                        code: status,
                        result: result,
                        url: url,
                        requestType: requestType
                    } });
            };
            window.getServerEndpoint = function (result) {
                var code = result.code;
                loggerResult(code, result);
                if (code !== 200) {
                    return error(RongIMLib.ConnectionState.TOKEN_INCORRECT);
                }
                success(result);
            };
            var url = this.getPath(navi, appId, token, callbackName);
            var xss = document.createElement('script');
            xss.src = url;
            document.body.appendChild(xss);
            xss.onerror = function () {
                error(RongIMLib.ConnectionState.TOKEN_INCORRECT);
                loggerResult(RongIMLib.ConnectionState.TOKEN_INCORRECT, {});
            };
        };
        Navigation.StoreProtocolKey = 'navprotocol';
        Navigation.Endpoint = new Object;
        return Navigation;
    })();
    RongIMLib.Navigation = Navigation;
})(RongIMLib || (RongIMLib = {}));
// TODO: 统一变量、方法等命名规范
var RongIMLib;
(function (RongIMLib) {
    /**
     * 消息基类
     */
    var BaseMessage = (function () {
        function BaseMessage(arg) {
            this._name = "BaseMessage";
            this.lengthSize = 0;
            if (arg instanceof RongIMLib.Header) {
                this._header = arg;
            }
            else {
                this._header = new RongIMLib.Header(arg, false, RongIMLib.Qos.AT_MOST_ONCE, false);
            }
        }
        BaseMessage.prototype.read = function (In, length) {
            this.readMessage(In, length);
        };
        BaseMessage.prototype.write = function (Out) {
            var binaryHelper = new RongIMLib.BinaryHelper();
            var out = binaryHelper.convertStream(Out);
            this._headerCode = this.getHeaderFlag();
            out.write(this._headerCode);
            this.writeMessage(out);
            return out;
        };
        BaseMessage.prototype.getHeaderFlag = function () {
            return this._header.encode();
        };
        BaseMessage.prototype.getLengthSize = function () {
            return this.lengthSize;
        };
        BaseMessage.prototype.toBytes = function () {
            return this.write([]).getBytesArray();
        };
        BaseMessage.prototype.isRetained = function () {
            return this._header.retain;
        };
        BaseMessage.prototype.setRetained = function (retain) {
            this._header.retain = retain;
        };
        BaseMessage.prototype.setQos = function (qos) {
            this._header.qos = Object.prototype.toString.call(qos) == "[object Object]" ? qos : RongIMLib.Qos[qos];
        };
        BaseMessage.prototype.setDup = function (dup) {
            this._header.dup = dup;
        };
        BaseMessage.prototype.isDup = function () {
            return this._header.dup;
        };
        BaseMessage.prototype.getType = function () {
            return this._header.type;
        };
        BaseMessage.prototype.getQos = function () {
            return this._header.qos;
        };
        BaseMessage.prototype.messageLength = function () {
            return 0;
        };
        BaseMessage.prototype.writeMessage = function (out) { };
        BaseMessage.prototype.readMessage = function (In, length) { };
        BaseMessage.prototype.init = function (args) {
            var valName, nana, me = this;
            for (nana in args) {
                if (!args.hasOwnProperty(nana)) {
                    continue;
                }
                valName = nana.replace(/^\w/, function (x) {
                    var tt = x.charCodeAt(0);
                    return "set" + (tt >= 0x61 ? String.fromCharCode(tt & ~32) : x);
                });
                if (valName in me) {
                    if (nana == "status") {
                        me[valName](disconnectStatus[args[nana]] ? disconnectStatus[args[nana]] : args[nana]);
                    }
                    else {
                        me[valName](args[nana]);
                    }
                }
            }
        };
        return BaseMessage;
    })();
    RongIMLib.BaseMessage = BaseMessage;
    /**
     *连接消息类型
     */
    var ConnectMessage = (function (_super) {
        __extends(ConnectMessage, _super);
        function ConnectMessage(header) {
            _super.call(this, arguments.length == 0 || arguments.length == 3 ? RongIMLib.Type.CONNECT : arguments[0]);
            this._name = "ConnectMessage";
            this.CONNECT_HEADER_SIZE = 12;
            this.protocolId = "RCloud";
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this.protocolVersion = 3;
            switch (arguments.length) {
                case 0:
                case 1:
                case 3:
                    if (!arguments[0] || arguments[0].length > 64) {
                        throw new Error("ConnectMessage:Client Id cannot be null and must be at most 64 characters long: " + arguments[0]);
                    }
                    this.clientId = arguments[0];
                    this.cleanSession = arguments[1];
                    this.keepAlive = arguments[2];
                    break;
            }
        }
        ConnectMessage.prototype.messageLength = function () {
            var payloadSize = this.binaryHelper.toMQttString(this.clientId).length;
            payloadSize += this.binaryHelper.toMQttString(this.willTopic).length;
            payloadSize += this.binaryHelper.toMQttString(this.will).length;
            payloadSize += this.binaryHelper.toMQttString(this.appId).length;
            payloadSize += this.binaryHelper.toMQttString(this.token).length;
            return payloadSize + this.CONNECT_HEADER_SIZE;
        };
        ConnectMessage.prototype.readMessage = function (stream) {
            this.protocolId = stream.readUTF();
            this.protocolVersion = stream.readByte();
            var cFlags = stream.readByte();
            this.hasAppId = (cFlags & 128) > 0;
            this.hasToken = (cFlags & 64) > 0;
            this.retainWill = (cFlags & 32) > 0;
            this.willQos = cFlags >> 3 & 3;
            this.hasWill = (cFlags & 4) > 0;
            this.cleanSession = (cFlags & 32) > 0;
            this.keepAlive = stream.read() * 256 + stream.read();
            this.clientId = stream.readUTF();
            if (this.hasWill) {
                this.willTopic = stream.readUTF();
                this.will = stream.readUTF();
            }
            if (this.hasAppId) {
                try {
                    this.appId = stream.readUTF();
                }
                catch (ex) {
                    throw new Error(ex);
                }
            }
            if (this.hasToken) {
                try {
                    this.token = stream.readUTF();
                }
                catch (ex) {
                    throw new Error(ex);
                }
            }
            return stream;
        };
        ConnectMessage.prototype.writeMessage = function (out) {
            var stream = this.binaryHelper.convertStream(out);
            stream.writeUTF(this.protocolId);
            stream.write(this.protocolVersion);
            var flags = this.cleanSession ? 2 : 0;
            flags |= this.hasWill ? 4 : 0;
            flags |= this.willQos ? this.willQos >> 3 : 0;
            flags |= this.retainWill ? 32 : 0;
            flags |= this.hasToken ? 64 : 0;
            flags |= this.hasAppId ? 128 : 0;
            stream.write(flags);
            stream.writeChar(this.keepAlive);
            stream.writeUTF(this.clientId);
            if (this.hasWill) {
                stream.writeUTF(this.willTopic);
                stream.writeUTF(this.will);
            }
            if (this.hasAppId) {
                stream.writeUTF(this.appId);
            }
            if (this.hasToken) {
                stream.writeUTF(this.token);
            }
            return stream;
        };
        return ConnectMessage;
    })(BaseMessage);
    RongIMLib.ConnectMessage = ConnectMessage;
    /**
     *连接应答类型
     */
    var ConnAckMessage = (function (_super) {
        __extends(ConnAckMessage, _super);
        function ConnAckMessage(header) {
            _super.call(this, arguments.length == 0 ? RongIMLib.Type.CONNACK : arguments.length == 1 ? arguments[0] instanceof RongIMLib.Header ? arguments[0] : RongIMLib.Type.CONNACK : null);
            this._name = "ConnAckMessage";
            this.MESSAGE_LENGTH = 2;
            this.binaryHelper = new RongIMLib.BinaryHelper();
            var me = this;
            switch (arguments.length) {
                case 0:
                case 1:
                    if (!(arguments[0] instanceof RongIMLib.Header)) {
                        if (arguments[0] in RongIMLib.ConnectionState) {
                            if (arguments[0] == null) {
                                throw new Error("ConnAckMessage:The status of ConnAskMessage can't be null");
                            }
                            me.setStatus(arguments[0]);
                        }
                    }
                    break;
            }
        }
        ;
        ConnAckMessage.prototype.messageLength = function () {
            var length = this.MESSAGE_LENGTH;
            if (this.userId) {
                length += this.binaryHelper.toMQttString(this.userId).length;
            }
            return length;
        };
        ;
        ConnAckMessage.prototype.readMessage = function (_in, msglength) {
            _in.read();
            var result = +_in.read();
            if (result >= 0 && result <= 12) {
                this.setStatus(result);
            }
            else {
                throw new Error("Unsupported CONNACK code:" + result);
            }
            if (msglength > this.MESSAGE_LENGTH) {
                this.setUserId(_in.readUTF());
                var sessionId = _in.readUTF();
                var timestamp = _in.readLong();
                this.setTimestamp(timestamp);
            }
        };
        ;
        ConnAckMessage.prototype.writeMessage = function (out) {
            var stream = this.binaryHelper.convertStream(out);
            stream.write(128);
            switch (+status) {
                case 0:
                case 1:
                case 2:
                case 5:
                case 6:
                    stream.write(+status);
                    break;
                case 3:
                case 4:
                    stream.write(3);
                    break;
                default:
                    throw new Error("Unsupported CONNACK code:" + status);
            }
            if (this.userId) {
                stream.writeUTF(this.userId);
            }
            return stream;
        };
        ;
        ConnAckMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        ;
        ConnAckMessage.prototype.setUserId = function (_userId) {
            this.userId = _userId;
        };
        ;
        ConnAckMessage.prototype.getStatus = function () {
            return this.status;
        };
        ;
        ConnAckMessage.prototype.getUserId = function () {
            return this.userId;
        };
        ;
        ConnAckMessage.prototype.setTimestamp = function (x) {
            this.timestrap = x;
        };
        ;
        ConnAckMessage.prototype.getTimestamp = function () {
            return this.timestrap;
        };
        return ConnAckMessage;
    })(BaseMessage);
    RongIMLib.ConnAckMessage = ConnAckMessage;
    /**
     *断开消息类型
     */
    var DisconnectMessage = (function (_super) {
        __extends(DisconnectMessage, _super);
        function DisconnectMessage(header) {
            _super.call(this, header instanceof RongIMLib.Header ? header : RongIMLib.Type.DISCONNECT);
            this._name = "DisconnectMessage";
            this.MESSAGE_LENGTH = 2;
            this.binaryHelper = new RongIMLib.BinaryHelper();
            if (!(header instanceof RongIMLib.Header)) {
                if (header in RongIMLib.ConnectionStatus) {
                    this.status = header;
                }
            }
        }
        DisconnectMessage.prototype.messageLength = function () {
            return this.MESSAGE_LENGTH;
        };
        DisconnectMessage.prototype.readMessage = function (_in) {
            _in.read();
            var result = +_in.read();
            if (result >= 0 && result <= 5) {
                this.setStatus(disconnectStatus[result] ? disconnectStatus[result] : result);
            }
            else {
                throw new Error("Unsupported CONNACK code:" + result);
            }
        };
        DisconnectMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            out.write(0);
            if (+status >= 1 && +status <= 3) {
                out.write((+status) - 1);
            }
            else {
                throw new Error("Unsupported CONNACK code:" + status);
            }
        };
        DisconnectMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        ;
        DisconnectMessage.prototype.getStatus = function () {
            return this.status;
        };
        ;
        return DisconnectMessage;
    })(BaseMessage);
    RongIMLib.DisconnectMessage = DisconnectMessage;
    /**
     *请求消息信令
     */
    var PingReqMessage = (function (_super) {
        __extends(PingReqMessage, _super);
        function PingReqMessage(header) {
            _super.call(this, (header && header instanceof RongIMLib.Header) ? header : RongIMLib.Type.PINGREQ);
            this._name = "PingReqMessage";
        }
        return PingReqMessage;
    })(BaseMessage);
    RongIMLib.PingReqMessage = PingReqMessage;
    /**
     *响应消息信令
     */
    var PingRespMessage = (function (_super) {
        __extends(PingRespMessage, _super);
        function PingRespMessage(header) {
            _super.call(this, (header && header instanceof RongIMLib.Header) ? header : RongIMLib.Type.PINGRESP);
            this._name = "PingRespMessage";
        }
        return PingRespMessage;
    })(BaseMessage);
    RongIMLib.PingRespMessage = PingRespMessage;
    /**
     *封装MesssageId
     */
    var RetryableMessage = (function (_super) {
        __extends(RetryableMessage, _super);
        function RetryableMessage(argu) {
            _super.call(this, argu);
            this._name = "RetryableMessage";
            this.binaryHelper = new RongIMLib.BinaryHelper();
        }
        RetryableMessage.prototype.messageLength = function () {
            return 2;
        };
        RetryableMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out), Id = this.getMessageId(), lsb = Id & 255, msb = (Id & 65280) >> 8;
            out.write(msb);
            out.write(lsb);
            return out;
        };
        RetryableMessage.prototype.readMessage = function (_in, msgLength) {
            var msgId = _in.read() * 256 + _in.read();
            this.setMessageId(parseInt(msgId, 10));
        };
        RetryableMessage.prototype.setMessageId = function (_messageId) {
            this.messageId = _messageId;
        };
        RetryableMessage.prototype.getMessageId = function () {
            return this.messageId;
        };
        return RetryableMessage;
    })(BaseMessage);
    RongIMLib.RetryableMessage = RetryableMessage;
    /**
     *发送消息应答（双向）
     *qos为1必须给出应答（所有消息类型一样）
     */
    var PubAckMessage = (function (_super) {
        __extends(PubAckMessage, _super);
        function PubAckMessage(header) {
            _super.call(this, (header instanceof RongIMLib.Header) ? header : RongIMLib.Type.PUBACK);
            this.msgLen = 2;
            this.date = 0;
            this.millisecond = 0;
            this.timestamp = 0;
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this._name = "PubAckMessage";
            if (!(header instanceof RongIMLib.Header)) {
                _super.prototype.setMessageId.call(this, header);
            }
        }
        PubAckMessage.prototype.messageLength = function () {
            return this.msgLen;
        };
        PubAckMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            RetryableMessage.prototype.writeMessage.call(this, out);
        };
        PubAckMessage.prototype.readMessage = function (_in, msgLength) {
            RetryableMessage.prototype.readMessage.call(this, _in);
            this.date = _in.readInt();
            this.status = _in.read() * 256 + _in.read();
            this.millisecond = _in.read() * 256 + _in.read();
            this.timestamp = this.date * 1000 + this.millisecond;
            this.messageUId = _in.readUTF();
        };
        PubAckMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        PubAckMessage.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        PubAckMessage.prototype.setMessageUId = function (messageUId) {
            this.messageUId = messageUId;
        };
        PubAckMessage.prototype.getStatus = function () {
            return this.status;
        };
        PubAckMessage.prototype.getDate = function () {
            return this.date;
        };
        PubAckMessage.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        PubAckMessage.prototype.getMessageUId = function () {
            return this.messageUId;
        };
        return PubAckMessage;
    })(RetryableMessage);
    RongIMLib.PubAckMessage = PubAckMessage;
    /**
     *发布消息
     */
    var PublishMessage = (function (_super) {
        __extends(PublishMessage, _super);
        function PublishMessage(header, two, three) {
            _super.call(this, (arguments.length == 1 && header instanceof RongIMLib.Header) ? header : arguments.length == 3 ? RongIMLib.Type.PUBLISH : 0);
            this._name = "PublishMessage";
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this.syncMsg = false;
            if (arguments.length == 3) {
                this.topic = header;
                this.targetId = three;
                this.data = typeof two == "string" ? this.binaryHelper.toMQttString(two) : two;
            }
        }
        PublishMessage.prototype.messageLength = function () {
            var length = 10;
            length += this.binaryHelper.toMQttString(this.topic).length;
            length += this.binaryHelper.toMQttString(this.targetId).length;
            length += this.data.length;
            return length;
        };
        PublishMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            out.writeUTF(this.topic);
            out.writeUTF(this.targetId);
            RetryableMessage.prototype.writeMessage.apply(this, arguments);
            out.write(this.data);
        };
        ;
        PublishMessage.prototype.readMessage = function (_in, msgLength) {
            var pos = 6;
            this.date = _in.readInt();
            this.topic = _in.readUTF();
            pos += this.binaryHelper.toMQttString(this.topic).length;
            this.targetId = _in.readUTF();
            pos += this.binaryHelper.toMQttString(this.targetId).length;
            RetryableMessage.prototype.readMessage.apply(this, arguments);
            this.data = new Array(msgLength - pos);
            this.data = _in.read(this.data);
        };
        ;
        PublishMessage.prototype.setTopic = function (x) {
            this.topic = x;
        };
        PublishMessage.prototype.setData = function (x) {
            this.data = x;
        };
        PublishMessage.prototype.setTargetId = function (x) {
            this.targetId = x;
        };
        PublishMessage.prototype.setDate = function (x) {
            this.date = x;
        };
        PublishMessage.prototype.setSyncMsg = function (x) {
            this.syncMsg = x;
        };
        //是否是其他端同步过来的消息
        PublishMessage.prototype.getSyncMsg = function () {
            return this.syncMsg;
        };
        PublishMessage.prototype.getTopic = function () {
            return this.topic;
        };
        PublishMessage.prototype.getData = function () {
            return this.data;
        };
        PublishMessage.prototype.getTargetId = function () {
            return this.targetId;
        };
        PublishMessage.prototype.getDate = function () {
            return this.date;
        };
        return PublishMessage;
    })(RetryableMessage);
    RongIMLib.PublishMessage = PublishMessage;
    /**
     *请求查询
     */
    var QueryMessage = (function (_super) {
        __extends(QueryMessage, _super);
        function QueryMessage(header, two, three) {
            _super.call(this, header instanceof RongIMLib.Header ? header : arguments.length == 3 ? RongIMLib.Type.QUERY : null);
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this._name = "QueryMessage";
            if (arguments.length == 3) {
                this.data = typeof two == "string" ? this.binaryHelper.toMQttString(two) : two;
                this.topic = header;
                this.targetId = three;
            }
        }
        QueryMessage.prototype.messageLength = function () {
            var length = 0;
            length += this.binaryHelper.toMQttString(this.topic).length;
            length += this.binaryHelper.toMQttString(this.targetId).length;
            length += 2;
            length += this.data.length;
            return length;
        };
        QueryMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            out.writeUTF(this.topic);
            out.writeUTF(this.targetId);
            RetryableMessage.prototype.writeMessage.call(this, out);
            out.write(this.data);
        };
        QueryMessage.prototype.readMessage = function (_in, msgLength) {
            var pos = 0;
            this.topic = _in.readUTF();
            this.targetId = _in.readUTF();
            pos += this.binaryHelper.toMQttString(this.topic).length;
            pos += this.binaryHelper.toMQttString(this.targetId).length;
            this.readMessage.apply(this, arguments);
            pos += 2;
            this.data = new Array(msgLength - pos);
            _in.read(this.data);
        };
        QueryMessage.prototype.setTopic = function (x) {
            this.topic = x;
        };
        QueryMessage.prototype.setData = function (x) {
            this.data = x;
        };
        QueryMessage.prototype.setTargetId = function (x) {
            this.targetId = x;
        };
        QueryMessage.prototype.getTopic = function () {
            return this.topic;
        };
        QueryMessage.prototype.getData = function () {
            return this.data;
        };
        QueryMessage.prototype.getTargetId = function () {
            return this.targetId;
        };
        return QueryMessage;
    })(RetryableMessage);
    RongIMLib.QueryMessage = QueryMessage;
    /**
     *请求查询确认
     */
    var QueryConMessage = (function (_super) {
        __extends(QueryConMessage, _super);
        function QueryConMessage(messageId) {
            _super.call(this, (messageId instanceof RongIMLib.Header) ? messageId : RongIMLib.Type.QUERYCON);
            this._name = "QueryConMessage";
            if (!(messageId instanceof RongIMLib.Header)) {
                _super.prototype.setMessageId.call(this, messageId);
            }
        }
        return QueryConMessage;
    })(RetryableMessage);
    RongIMLib.QueryConMessage = QueryConMessage;
    /**
     *请求查询应答
     */
    var QueryAckMessage = (function (_super) {
        __extends(QueryAckMessage, _super);
        function QueryAckMessage(header) {
            _super.call(this, header);
            this._name = "QueryAckMessage";
            this.binaryHelper = new RongIMLib.BinaryHelper();
        }
        QueryAckMessage.prototype.readMessage = function (In, msgLength) {
            RetryableMessage.prototype.readMessage.call(this, In);
            this.date = In.readInt();
            this.setStatus(In.read() * 256 + In.read());
            if (msgLength > 0) {
                this.data = new Array(msgLength - 8);
                this.data = In.read(this.data);
            }
        };
        QueryAckMessage.prototype.getData = function () {
            return this.data;
        };
        QueryAckMessage.prototype.getStatus = function () {
            return this.status;
        };
        QueryAckMessage.prototype.getDate = function () {
            return this.date;
        };
        QueryAckMessage.prototype.setDate = function (x) {
            this.date = x;
        };
        QueryAckMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        QueryAckMessage.prototype.setData = function (x) {
            this.data = x;
        };
        return QueryAckMessage;
    })(RetryableMessage);
    RongIMLib.QueryAckMessage = QueryAckMessage;
})(RongIMLib || (RongIMLib = {}));
/// <reference path="../../dts/helper.d.ts"/>
var RongIMLib;
(function (RongIMLib) {
    /**
     * 把消息对象写入流中
     * 发送消息时用到
     */
    var MessageOutputStream = (function () {
        function MessageOutputStream(_out) {
            var binaryHelper = new RongIMLib.BinaryHelper();
            this.out = binaryHelper.convertStream(_out);
        }
        MessageOutputStream.prototype.writeMessage = function (msg) {
            if (msg instanceof RongIMLib.BaseMessage) {
                msg.write(this.out);
            }
        };
        return MessageOutputStream;
    })();
    RongIMLib.MessageOutputStream = MessageOutputStream;
    /**
     * 流转换为消息对象
     * 服务器返回消息时用到
     */
    var MessageInputStream = (function () {
        function MessageInputStream(In, isPolling) {
            if (!isPolling) {
                var _in = new RongIMLib.BinaryHelper().convertStream(In);
                this.flags = _in.readByte();
                this._in = _in;
            }
            else {
                this.flags = In["headerCode"];
            }
            this.header = new RongIMLib.Header(this.flags);
            this.isPolling = isPolling;
            this.In = In;
        }
        MessageInputStream.prototype.readMessage = function () {
            switch (this.header.getType()) {
                case 1:
                    this.msg = new RongIMLib.ConnectMessage(this.header);
                    break;
                case 2:
                    this.msg = new RongIMLib.ConnAckMessage(this.header);
                    break;
                case 3:
                    this.msg = new RongIMLib.PublishMessage(this.header);
                    this.msg.setSyncMsg(this.header.getSyncMsg());
                    break;
                case 4:
                    this.msg = new RongIMLib.PubAckMessage(this.header);
                    break;
                case 5:
                    this.msg = new RongIMLib.QueryMessage(this.header);
                    break;
                case 6:
                    this.msg = new RongIMLib.QueryAckMessage(this.header);
                    break;
                case 7:
                    this.msg = new RongIMLib.QueryConMessage(this.header);
                    break;
                case 9:
                case 11:
                case 13:
                    this.msg = new RongIMLib.PingRespMessage(this.header);
                    break;
                case 8:
                case 10:
                case 12:
                    this.msg = new RongIMLib.PingReqMessage(this.header);
                    break;
                case 14:
                    this.msg = new RongIMLib.DisconnectMessage(this.header);
                    break;
                default:
                    throw new Error("No support for deserializing " + this.header.getType() + " messages");
            }
            if (this.isPolling) {
                this.msg.init(this.In);
            }
            else {
                this.msg.read(this._in, this.In.length - 1);
            }
            return this.msg;
        };
        return MessageInputStream;
    })();
    RongIMLib.MessageInputStream = MessageInputStream;
    var Header = (function () {
        function Header(_type, _retain, _qos, _dup) {
            this.retain = false;
            this.qos = RongIMLib.Qos.AT_LEAST_ONCE;
            this.dup = false;
            this.syncMsg = false;
            if (_type && +_type == _type && arguments.length == 1) {
                this.retain = (_type & 1) > 0;
                this.qos = (_type & 6) >> 1;
                this.dup = (_type & 8) > 0;
                this.type = (_type >> 4) & 15;
                this.syncMsg = (_type & 8) == 8;
            }
            else {
                this.type = _type;
                this.retain = _retain;
                this.qos = _qos;
                this.dup = _dup;
            }
        }
        Header.prototype.getSyncMsg = function () {
            return this.syncMsg;
        };
        Header.prototype.getType = function () {
            return this.type;
        };
        Header.prototype.encode = function () {
            var me = this;
            switch (this.qos) {
                case RongIMLib.Qos[0]:
                    me.qos = RongIMLib.Qos.AT_MOST_ONCE;
                    break;
                case RongIMLib.Qos[1]:
                    me.qos = RongIMLib.Qos.AT_LEAST_ONCE;
                    break;
                case RongIMLib.Qos[2]:
                    me.qos = RongIMLib.Qos.EXACTLY_ONCE;
                    break;
                case RongIMLib.Qos[3]:
                    me.qos = RongIMLib.Qos.DEFAULT;
                    break;
            }
            var _byte = (this.type << 4);
            _byte |= this.retain ? 1 : 0;
            _byte |= this.qos << 1;
            _byte |= this.dup ? 8 : 0;
            return _byte;
        };
        Header.prototype.toString = function () {
            return "Header [type=" + this.type + ",retain=" + this.retain + ",qos=" + this.qos + ",dup=" + this.dup + "]";
        };
        return Header;
    })();
    RongIMLib.Header = Header;
    /**
     * 二进制帮助对象
     */
    var BinaryHelper = (function () {
        function BinaryHelper() {
        }
        BinaryHelper.prototype.writeUTF = function (str, isGetBytes) {
            var back = [], byteSize = 0;
            for (var i = 0, len = str.length; i < len; i++) {
                var code = str.charCodeAt(i);
                if (code >= 0 && code <= 127) {
                    byteSize += 1;
                    back.push(code);
                }
                else if (code >= 128 && code <= 2047) {
                    byteSize += 2;
                    back.push((192 | (31 & (code >> 6))));
                    back.push((128 | (63 & code)));
                }
                else if (code >= 2048 && code <= 65535) {
                    byteSize += 3;
                    back.push((224 | (15 & (code >> 12))));
                    back.push((128 | (63 & (code >> 6))));
                    back.push((128 | (63 & code)));
                }
            }
            for (var i = 0, len = back.length; i < len; i++) {
                if (back[i] > 255) {
                    back[i] &= 255;
                }
            }
            if (isGetBytes) {
                return back;
            }
            if (byteSize <= 255) {
                return [0, byteSize].concat(back);
            }
            else {
                return [byteSize >> 8, byteSize & 255].concat(back);
            }
        };
        BinaryHelper.prototype.readUTF = function (arr) {
            if (Object.prototype.toString.call(arr) == "[object String]") {
                return arr;
            }
            var UTF = "", _arr = arr;
            for (var i = 0, len = _arr.length; i < len; i++) {
                if (_arr[i] < 0) {
                    _arr[i] += 256;
                }
                ;
                var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
                if (v && one.length == 8) {
                    var bytesLength = v[0].length, 
                    // store = _arr[i].toString(2).slice(7 - bytesLength);
                    store = '';
                    for (var st = 0; st < bytesLength; st++) {
                        store += _arr[st + i].toString(2).slice(2);
                    }
                    UTF += String.fromCharCode(parseInt(store, 2));
                    i += bytesLength - 1;
                }
                else {
                    UTF += String.fromCharCode(_arr[i]);
                }
            }
            return UTF;
        };
        /**
         * [convertStream 将参数x转化为RongIMStream对象]
         * @param  {any}    x [参数]
         */
        BinaryHelper.prototype.convertStream = function (x) {
            if (x instanceof RongIMStream) {
                return x;
            }
            else {
                return new RongIMStream(x);
            }
        };
        BinaryHelper.prototype.toMQttString = function (str) {
            return this.writeUTF(str);
        };
        return BinaryHelper;
    })();
    RongIMLib.BinaryHelper = BinaryHelper;
    var RongIMStream = (function () {
        function RongIMStream(arr) {
            //当前流执行的起始位置
            this.position = 0;
            //当前流写入的多少字节
            this.writen = 0;
            this.poolLen = 0;
            this.binaryHelper = new BinaryHelper();
            this.pool = arr;
            this.poolLen = arr.length;
        }
        RongIMStream.prototype.check = function () {
            return this.position >= this.pool.length;
        };
        RongIMStream.prototype.readInt = function () {
            if (this.check()) {
                return -1;
            }
            var end = "";
            for (var i = 0; i < 4; i++) {
                var t = this.pool[this.position++].toString(16);
                if (t.length == 1) {
                    t = "0" + t;
                }
                end += t.toString(16);
            }
            return parseInt(end, 16);
        };
        RongIMStream.prototype.readLong = function () {
            if (this.check()) {
                return -1;
            }
            var end = "";
            for (var i = 0; i < 8; i++) {
                var t = this.pool[this.position++].toString(16);
                if (t.length == 1) {
                    t = "0" + t;
                }
                end += t;
            }
            return parseInt(end, 16);
        };
        RongIMStream.prototype.readTimestamp = function () {
            if (this.check()) {
                return -1;
            }
            var end = "";
            for (var i = 0; i < 8; i++) {
                end += this.pool[this.position++].toString(16);
            }
            end = end.substring(2, 8);
            return parseInt(end, 16);
        };
        RongIMStream.prototype.readUTF = function () {
            if (this.check()) {
                return -1;
            }
            var big = (this.readByte() << 8) | this.readByte();
            return this.binaryHelper.readUTF(this.pool.subarray(this.position, this.position += big));
        };
        RongIMStream.prototype.readByte = function () {
            if (this.check()) {
                return -1;
            }
            var val = this.pool[this.position++];
            if (val > 255) {
                val &= 255;
            }
            return val;
        };
        RongIMStream.prototype.read = function (bytesArray) {
            if (bytesArray) {
                return this.pool.subarray(this.position, this.poolLen);
            }
            else {
                return this.readByte();
            }
        };
        RongIMStream.prototype.write = function (_byte) {
            var b = _byte;
            if (Object.prototype.toString.call(b).toLowerCase() == "[object array]") {
                try {
                    this.pool = this.pool.concat(b);
                }
                catch (e) {
                    [].push.apply(this.pool, b);
                }
            }
            else {
                if (+b == b) {
                    if (b > 255) {
                        b &= 255;
                    }
                    this.pool.push(b);
                    this.writen++;
                }
            }
            return b;
        };
        RongIMStream.prototype.writeChar = function (v) {
            if (+v != v) {
                throw new Error("writeChar:arguments type is error");
            }
            this.write(v >> 8 & 255);
            this.write(v & 255);
            this.writen += 2;
        };
        RongIMStream.prototype.writeUTF = function (str) {
            var val = this.binaryHelper.writeUTF(str);
            [].push.apply(this.pool, val);
            this.writen += val.length;
        };
        RongIMStream.prototype.toComplements = function () {
            var _tPool = this.pool;
            for (var i = 0; i < this.poolLen; i++) {
                if (_tPool[i] > 128) {
                    _tPool[i] -= 256;
                }
            }
            return _tPool;
        };
        RongIMStream.prototype.getBytesArray = function (isCom) {
            if (isCom) {
                return this.toComplements();
            }
            return this.pool;
        };
        return RongIMStream;
    })();
    RongIMLib.RongIMStream = RongIMStream;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var SocketTransportation = (function () {
        /**
         * [constructor]
         * @param  {string} url [连接地址：包含token、version]
         */
        function SocketTransportation(_socket) {
            //连接状态 true:已连接 false:未连接
            this.connected = false;
            //是否关闭： true:已关闭 false：未关闭
            this.isClose = false;
            //存放消息队列的临时变量
            this.queue = [];
            this.empty = new Function;
            this._socket = _socket;
            return this;
        }
        /**
         * [createTransport 创建WebScoket对象]
         */
        SocketTransportation.prototype.createTransport = function (url, method) {
            if (!url) {
                throw new Error("URL can't be empty");
            }
            ;
            this.url = url;
            var depend = RongIMLib.RongIMClient._memoryStore.depend;
            var wsScheme = depend.wsScheme;
            var tpl = '{wsScheme}{url}';
            url = RongIMLib.RongUtil.tplEngine(tpl, {
                wsScheme: wsScheme,
                url: url
            });
            this.socket = new WebSocket(url);
            this.socket.binaryType = "arraybuffer";
            this.addEvent();
            return this.socket;
        };
        /**
         * [send 传送消息流]
         * @param  {ArrayBuffer} data [二进制消息流]
         */
        SocketTransportation.prototype.send = function (data) {
            if (!this.connected && !this.isClose) {
                //当通道不可用时，加入消息队列
                this.queue.push(data);
                return;
            }
            if (this.isClose) {
                this._socket.fire("StatusChanged", RongIMLib.ConnectionStatus.CONNECTION_CLOSED);
                return;
            }
            var stream = new RongIMLib.RongIMStream([]), msg = new RongIMLib.MessageOutputStream(stream);
            msg.writeMessage(data);
            var val = stream.getBytesArray(true);
            var binary = new Int8Array(val);
            this.socket.send(binary.buffer);
            return this;
        };
        /**
         * [onData 通道返回数据时调用的方法，用来想上层传递服务器返回的二进制消息流]
         * @param  {ArrayBuffer}    data [二进制消息流]
         */
        SocketTransportation.prototype.onData = function (data) {
            if (RongIMLib.MessageUtil.isArray(data)) {
                this._socket.onMessage(new RongIMLib.MessageInputStream(data).readMessage());
            }
            else {
                this._socket.onMessage(new RongIMLib.MessageInputStream(RongIMLib.MessageUtil.ArrayFormInput(data)).readMessage());
            }
            return "";
        };
        /**
         * [onClose 通道关闭时触发的方法]
         */
        SocketTransportation.prototype.onClose = function (ev) {
            var me = this;
            me.isClose = true;
            me.socket = this.empty;
            RongIMLib.Bridge._client.clearHeartbeat();
            if (ev.code == 1006 && !this._status) {
                var currentTime = new Date().getTime();
                if (!me.connectedTime || (currentTime - me.connectedTime <= SocketTransportation.MinConnectTime)) {
                    var host = RongIMLib.RongUtil.getUrlHost(me.url);
                    RongIMLib.RongIMClient.invalidWsUrls.push(host);
                }
                me._socket.fire("StatusChanged", RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
            }
            else {
                me._status = 0;
            }
        };
        /**
         * [onError 通道报错时触发的方法]
         * @param {any} error [抛出异常]
         */
        SocketTransportation.prototype.onError = function (error) {
            this._socket.fire("StatusChanged", RongIMLib.ConnectionStatus.WEBSOCKET_ERROR);
            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_WS_ERR_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                    error: RongIMLib.ConnectionStatus.WEBSOCKET_ERROR,
                    msg: 'SocketTransportation -> onError'
                } });
            throw new Error(error);
        };
        /**
         * [addEvent 为通道绑定事件]
         */
        SocketTransportation.prototype.addEvent = function () {
            var self = this;
            self.socket.onopen = function () {
                self.connected = true;
                self.isClose = false;
                //通道可以用后，调用发送队列方法，把所有等得发送的消息发出
                self.doQueue();
                self._socket.fire("connect");
                self.connectedTime = new Date().getTime();
            };
            self.socket.onmessage = function (ev) {
                //判断数据是不是字符串，如果是字符串那么就是flash传过来的。
                if (typeof ev.data == "string") {
                    self.onData(ev.data.split(","));
                }
                else {
                    self.onData(ev.data);
                }
            };
            self.socket.onerror = function (ev) {
                self.onError(ev);
            };
            self.socket.onclose = function (ev) {
                self.onClose(ev);
            };
        };
        /**
         * [doQueue 消息队列，把队列中消息发出]
         */
        SocketTransportation.prototype.doQueue = function () {
            var self = this;
            for (var i = 0, len = self.queue.length; i < len; i++) {
                self.send(self.queue[i]);
            }
        };
        /**
         * [disconnect 断开连接]
         */
        SocketTransportation.prototype.disconnect = function (status) {
            var me = this;
            if (me.socket.readyState) {
                me.isClose = true;
                if (status) {
                    me._status = status;
                }
                me.socket.close();
            }
        };
        /**
         * [reconnect 重新连接]
         */
        SocketTransportation.prototype.reconnect = function () {
            this.disconnect();
            this.createTransport(this.url);
        };
        SocketTransportation.prototype.close = function () {
            this.socket.close();
        };
        // 最短链接时长(若 5000ms 内, ws 自动断开, 此 ws 地址置为不可用)
        SocketTransportation.MinConnectTime = 5000;
        return SocketTransportation;
    })();
    RongIMLib.SocketTransportation = SocketTransportation;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var PollingTransportation = (function () {
        function PollingTransportation(socket) {
            this.empty = new Function;
            this.connected = false;
            this.pid = +new Date + Math.random() + "";
            this.queue = [];
            this.socket = socket;
            return this;
        }
        PollingTransportation.prototype.createTransport = function (url, method) {
            if (!url) {
                throw new Error("Url is empty,Please check it!");
            }
            ;
            this.url = url;
            var sid = RongIMLib.RongIMClient._storageProvider.getItem("sId" + RongIMLib.Navigation.Endpoint.userId), me = this;
            if (sid) {
                setTimeout(function () {
                    me.onSuccess("{\"status\":0,\"userId\":\"" + RongIMLib.Navigation.Endpoint.userId + "\",\"headerCode\":32,\"messageId\":0,\"sessionid\":\"" + sid + "\"}");
                    me.connected = true;
                }, 500);
                return this;
            }
            this.getRequest(url, true);
            return this;
        };
        PollingTransportation.prototype.requestFactory = function (url, method, multipart) {
            var reqest = this.XmlHttpRequest();
            if (multipart) {
                reqest.multipart = true;
            }
            // reqest.timeout = 60000;
            reqest.open(method || "GET", RongIMLib.RongIMClient._memoryStore.depend.protocol + url);
            if (method == "POST" && "setRequestHeader" in reqest) {
                reqest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
            }
            return reqest;
        };
        PollingTransportation.prototype.getRequest = function (url, isconnect) {
            var me = this;
            me.xhr = this.requestFactory(url + "&pid=" + encodeURIComponent(me.pid), "GET");
            var timer = new RongIMLib.Timer({ timeout: 45000 });
            if ("onload" in me.xhr) {
                me.xhr.onload = function () {
                    timer.pause();
                    me.xhr.onload = me.empty;
                    if (this.responseText == "lost params") {
                        me.onError();
                    }
                    else {
                        me.onSuccess(this.responseText, isconnect);
                    }
                };
                me.xhr.onerror = function () {
                    timer.pause();
                    me.disconnect();
                };
            }
            else {
                me.xhr.onreadystatechange = function () {
                    timer.pause();
                    if (me.xhr.readyState == 4) {
                        me.xhr.onreadystatechange = me.empty;
                        if (/^(200|202)$/.test(me.xhr.status)) {
                            me.onSuccess(me.xhr.responseText, isconnect);
                        }
                        else if (/^(400|403)$/.test(me.xhr.status)) {
                            me.onError();
                        }
                        else {
                            me.disconnect();
                        }
                    }
                };
            }
            timer.resume(function () {
                me.onError();
            });
            me.xhr.send();
        };
        /**
         * [send 发送消息，Method:POST]
         * queue 为消息队列，待通道可用发送所有等待消息
         * @param  {string} data [需要传入comet格式数据，此处只负责通讯通道，数据转换在外层处理]
         */
        PollingTransportation.prototype.send = function (data) {
            var me = this;
            var _send = me.sendxhr = this.requestFactory(RongIMLib.Navigation.Endpoint.host + "/websocket" + data.url + "&pid=" + encodeURIComponent(me.pid), "POST");
            if ("onload" in _send) {
                _send.onload = function () {
                    _send.onload = me.empty;
                    me.onData(_send.responseText);
                };
                _send.onerror = function () {
                    _send.onerror = me.empty;
                };
            }
            else {
                _send.onreadystatechange = function () {
                    if (_send.readyState == 4) {
                        this.onreadystatechange = this.empty;
                        if (/^(202|200)$/.test(_send.status)) {
                            me.onData(_send.responseText);
                        }
                    }
                };
            }
            _send.send(JSON.stringify(data.data));
        };
        PollingTransportation.prototype.onData = function (data, header) {
            if (!data || data == "lost params") {
                return;
            }
            var self = this, val = JSON.parse(data);
            if (val.userId) {
                RongIMLib.Navigation.Endpoint.userId = val.userId;
            }
            if (header) {
                RongIMLib.RongIMClient._storageProvider.setItem("sId" + RongIMLib.Navigation.Endpoint.userId, header);
            }
            if (!RongIMLib.MessageUtil.isArray(val)) {
                val = [val];
            }
            Array.forEach(val, function (m) {
                self.socket.fire("message", new RongIMLib.MessageInputStream(m, true).readMessage());
            });
            return "";
        };
        PollingTransportation.prototype.XmlHttpRequest = function () {
            var hasCORS = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest(), self = this;
            if ("undefined" != typeof XMLHttpRequest && hasCORS) {
                return new XMLHttpRequest();
            }
            else if ("undefined" != typeof XDomainRequest) {
                return new XDomainRequest();
            }
            else {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        };
        PollingTransportation.prototype.onClose = function () {
            if (this.xhr) {
                if (this.xhr.onload) {
                    this.xhr.onreadystatechange = this.xhr.onload = this.empty;
                }
                else {
                    this.xhr.onreadystatechange = this.empty;
                }
                this.xhr.abort();
                this.xhr = null;
            }
            if (this.sendxhr) {
                if (this.sendxhr.onload) {
                    this.sendxhr.onreadystatechange = this.sendxhr.onload = this.empty;
                }
                else {
                    this.sendxhr.onreadystatechange = this.empty;
                }
                this.sendxhr.abort();
                this.sendxhr = null;
            }
        };
        PollingTransportation.prototype.disconnect = function () {
            RongIMLib.RongIMClient._storageProvider.removeItem("sId" + RongIMLib.Navigation.Endpoint.userId);
            RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId + "msgId");
            this.onClose();
        };
        PollingTransportation.prototype.reconnect = function () {
            this.disconnect();
            this.createTransport(this.url);
        };
        PollingTransportation.prototype.onSuccess = function (responseText, isconnect) {
            var txt = responseText.match(/"sessionid":"\S+?(?=")/);
            this.onData(responseText, txt ? txt[0].slice(13) : 0);
            if (/"headerCode":-32,/.test(responseText)) {
                RongIMLib.RongIMClient._storageProvider.removeItem("sId" + RongIMLib.Navigation.Endpoint.userId);
                RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId + "msgId");
                return;
            }
            this.getRequest(RongIMLib.Navigation.Endpoint.host + "/pullmsg.js?sessionid=" + RongIMLib.RongIMClient._storageProvider.getItem("sId" + RongIMLib.Navigation.Endpoint.userId) + "&timestrap=" + encodeURIComponent(new Date().getTime() + Math.random() + ""));
            this.connected = true;
            isconnect && this.socket.fire("connect");
        };
        PollingTransportation.prototype.onError = function () {
            RongIMLib.RongIMClient._storageProvider.removeItem("sId" + RongIMLib.Navigation.Endpoint.userId);
            RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId + "msgId");
            this.onClose();
            if (this.connected) {
                this.connected = false;
                var code = RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE;
                this.socket.fire("disconnect", code);
            }
        };
        PollingTransportation.prototype.close = function () {
            this.xhr.abort();
            this.sendxhr = null;
        };
        return PollingTransportation;
    })();
    RongIMLib.PollingTransportation = PollingTransportation;
})(RongIMLib || (RongIMLib = {}));
//objectname映射
var typeMapping = {
    "RC:TxtMsg": "TextMessage",
    "RC:ImgMsg": "ImageMessage",
    "RC:VcMsg": "VoiceMessage",
    "RC:ImgTextMsg": "RichContentMessage",
    "RC:ReferenceMsg": "ReferenceMessage",
    "RC:FileMsg": "FileMessage",
    "RC:HQVCMsg": "HQVoiceMessage",
    "RC:GIFMsg": "GIFMessage",
    "RC:SightMsg": "SightMessage",
    "RC:LBSMsg": "LocationMessage",
    "RC:InfoNtf": "InformationNotificationMessage",
    "RC:ContactNtf": "ContactNotificationMessage",
    "RC:ProfileNtf": "ProfileNotificationMessage",
    "RC:CmdNtf": "CommandNotificationMessage",
    "RC:DizNtf": "DiscussionNotificationMessage",
    "RC:CmdMsg": "CommandMessage",
    "RC:TypSts": "TypingStatusMessage",
    "RC:CsChaR": "ChangeModeResponseMessage",
    "RC:CsHsR": "HandShakeResponseMessage",
    "RC:CsEnd": "TerminateMessage",
    "RC:CsSp": "SuspendMessage",
    "RC:CsUpdate": "CustomerStatusUpdateMessage",
    "RC:ReadNtf": "ReadReceiptMessage",
    "RC:VCAccept": "AcceptMessage",
    "RC:VCRinging": "RingingMessage",
    "RC:VCSummary": "SummaryMessage",
    "RC:VCHangup": "HungupMessage",
    "RC:VCInvite": "InviteMessage",
    "RC:VCModifyMedia": "MediaModifyMessage",
    "RC:VCModifyMem": "MemberModifyMessage",
    "RC:CsContact": "CustomerContact",
    "RC:PSImgTxtMsg": "PublicServiceRichContentMessage",
    "RC:PSMultiImgTxtMsg": "PublicServiceMultiRichContentMessage",
    "RC:GrpNtf": "GroupNotificationMessage",
    "RC:PSCmd": "PublicServiceCommandMessage",
    "RC:RcCmd": "RecallCommandMessage",
    "RC:SRSMsg": "SyncReadStatusMessage",
    "RC:RRReqMsg": "ReadReceiptRequestMessage",
    "RC:RRRspMsg": "ReadReceiptResponseMessage",
    "RCJrmf:RpMsg": "JrmfRedPacketMessage",
    "RCJrmf:RpOpendMsg": "JrmfRedPacketOpenedMessage",
    "RC:CombineMsg": "RCCombineMessage",
    "RC:chrmKVNotiMsg": "ChrmKVNotificationMessage",
    "RC:LogCmdMsg": "LogCommandMessage"
}, 
//自定义消息类型
registerMessageTypeMapping = {}, HistoryMsgType = {
    4: "qryCMsg",
    2: "qryDMsg",
    3: "qryGMsg",
    1: "qryPMsg",
    6: "qrySMsg",
    7: "qryPMsg",
    8: "qryPMsg",
    5: "qryCMsg"
}, disconnectStatus = { 1: 6 };
var RongIMLib;
(function (RongIMLib) {
    // 业务层公共方法处理
    var IMHandler = (function () {
        function IMHandler() {
        }
        IMHandler.isIncludeNavi = function (token) {
            var navMarkIndex = RongIMLib.RongUtil.indexOf(token, RongIMLib.RongIMClient.NavMarkInToken);
            var hasNavMark = navMarkIndex !== -1;
            return hasNavMark;
        };
        IMHandler.getToken = function (token) {
            var isIncludeNavi = IMHandler.isIncludeNavi(token);
            if (isIncludeNavi) {
                var navMarkIndex = RongIMLib.RongUtil.indexOf(token, RongIMLib.RongIMClient.NavMarkInToken);
                ;
                token = token.substring(0, navMarkIndex + 1);
            }
            return token;
        };
        IMHandler.getNavsByToken = function (token, protocol) {
            var isIncludeNavi = IMHandler.isIncludeNavi(token);
            var navUrlList = [];
            if (isIncludeNavi) {
                var navMarkIndex = RongIMLib.RongUtil.indexOf(token, RongIMLib.RongIMClient.NavMarkInToken);
                ;
                var navsText = token.substring(navMarkIndex + 1, token.length);
                var navDomains = navsText.split(RongIMLib.RongIMClient.NavSeparatorInToken);
                RongIMLib.RongUtil.forEach(navDomains, function (domain) {
                    if (RongIMLib.RongUtil.isEmpty(domain)) {
                        return;
                    }
                    var navUrl = RongIMLib.RongUtil.formatProtoclPath({
                        path: domain, protocol: protocol, sub: true
                    });
                    navUrlList.push(navUrl);
                });
            }
            return navUrlList;
        };
        IMHandler.getConversationKey = function (type, id) {
            return type + '_' + id;
        };
        return IMHandler;
    })();
    RongIMLib.IMHandler = IMHandler;
    ;
    /**
     * 通道标识类
     */
    var Transportations = (function () {
        function Transportations() {
        }
        Transportations._TransportType = RongIMLib.Socket.WEBSOCKET;
        return Transportations;
    })();
    RongIMLib.Transportations = Transportations;
    var SyncTimeUtil = (function () {
        function SyncTimeUtil() {
        }
        SyncTimeUtil.$getKey = function (message) {
            var client = RongIMLib.Bridge._client;
            var userId = client.userId;
            var direction = (message.messageDirection == 1 ? 'send' : 'receive');
            var appkey = RongIMLib.RongIMClient._memoryStore.appKey;
            var tpl = '{appkey}_{userId}_{direction}box';
            return RongIMLib.RongUtil.tplEngine(tpl, {
                appkey: appkey,
                userId: userId,
                direction: direction
            });
        };
        SyncTimeUtil.set = function (message) {
            var key = SyncTimeUtil.$getKey(message);
            var sentTime = message.sentTime;
            var storage = RongIMLib.RongIMClient._storageProvider;
            storage.setItem(key, sentTime);
            // 向缓存中也设置拉消息时间戳
            SyncTimeUtil._syncTimeCache[key] = sentTime;
        };
        SyncTimeUtil.get = function () {
            var sent = SyncTimeUtil.$getKey({
                messageDirection: RongIMLib.MessageDirection.SEND
            });
            var received = SyncTimeUtil.$getKey({
                messageDirection: RongIMLib.MessageDirection.RECEIVE
            });
            /**
             * 先从缓存中获取时间戳，如果缓存中没有再从 localstorage 中取。
             * 避免多端重连都从 localstorage 中取时间戳，重连成功时间不一致导致后重连的用户拉消息有断档情况
            */
            var pullMsgTimeBox = SyncTimeUtil._syncTimeCache;
            var storage = RongIMLib.RongIMClient._storageProvider;
            if (RongIMLib.RongUtil.isEmpty(pullMsgTimeBox)) {
                pullMsgTimeBox[sent] = storage.getItem(sent);
                pullMsgTimeBox[received] = storage.getItem(received);
            }
            return {
                sent: Number(pullMsgTimeBox[sent] || 0),
                received: Number(pullMsgTimeBox[received] || 0)
            };
        };
        SyncTimeUtil._syncTimeCache = {};
        return SyncTimeUtil;
    })();
    RongIMLib.SyncTimeUtil = SyncTimeUtil;
    var MessageUtil = (function () {
        function MessageUtil() {
        }
        /**
         *4680000 为localstorage最小容量5200000字节的90%，超过90%将删除之前过早的存储
         */
        MessageUtil.checkStorageSize = function () {
            return JSON.stringify(localStorage).length < 4680000;
        };
        MessageUtil.getFirstKey = function (obj) {
            var str = "";
            for (var key in obj) {
                str = key;
                break;
            }
            return str;
        };
        MessageUtil.isEmpty = function (obj) {
            var empty = true;
            for (var key in obj) {
                empty = false;
                break;
            }
            return empty;
        };
        MessageUtil.ArrayForm = function (typearray) {
            if (Object.prototype.toString.call(typearray) == "[object ArrayBuffer]") {
                var arr = new Int8Array(typearray);
                return [].slice.call(arr);
            }
            return typearray;
        };
        MessageUtil.ArrayFormInput = function (typearray) {
            if (Object.prototype.toString.call(typearray) == "[object ArrayBuffer]") {
                var arr = new Uint8Array(typearray);
                return arr;
            }
            return typearray;
        };
        MessageUtil.indexOf = function (arr, item, from) {
            for (var l = arr.length, i = (from < 0) ? Math.max(0, +from) : from || 0; i < l; i++) {
                if (arr[i] == item) {
                    return i;
                }
            }
            return -1;
        };
        MessageUtil.isArray = function (obj) {
            return Object.prototype.toString.call(obj) == "[object Array]";
        };
        //遍历，只能遍历数组
        MessageUtil.forEach = function (arr, func) {
            if ([].forEach) {
                return function (arr, func) {
                    [].forEach.call(arr, func);
                };
            }
            else {
                return function (arr, func) {
                    for (var i = 0; i < arr.length; i++) {
                        func.call(arr, arr[i], i, arr);
                    }
                };
            }
        };
        MessageUtil.remove = function (array, func) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (func(array[i])) {
                    return array.splice(i, 1)[0];
                }
            }
            return null;
        };
        MessageUtil.int64ToTimestamp = function (obj, isDate) {
            if (obj.low === undefined) {
                return obj;
            }
            var low = obj.low;
            if (low < 0) {
                low += 0xffffffff + 1;
            }
            low = low.toString(16);
            var timestamp = parseInt(obj.high.toString(16) + "00000000".replace(new RegExp("0{" + low.length + "}$"), low), 16);
            if (isDate) {
                return new Date(timestamp);
            }
            return timestamp;
        };
        // 下行消息状态位判断, 第 10 位为 disableNotification 开关（ 上行为第 6 位 ）
        MessageUtil.isDisableNotification = function (status) {
            return Boolean(status & 0x200);
        };
        //消息转换方法
        MessageUtil.messageParser = function (entity, onReceived, offlineMsg) {
            var message = new RongIMLib.Message(), content = entity.content, de, objectName = entity.classname, val, isUseDef = false;
            try {
                if (RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                    val = new RongIMLib.BinaryHelper().readUTF(content.offset ? MessageUtil.ArrayForm(content.buffer).slice(content.offset, content.limit) : content);
                    de = JSON.parse(val);
                }
                else {
                    val = new RongIMLib.BinaryHelper().readUTF(content.offset ? MessageUtil.ArrayFormInput(content.buffer).subarray(content.offset, content.limit) : content);
                    de = JSON.parse(val);
                }
            }
            catch (ex) {
                de = val;
                isUseDef = true;
                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_PARSE_MSG_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                        stack: ex,
                        msg: 'MessageUtil -> messageParser'
                    } });
            }
            var IMLib = RongIMLib;
            //映射为具体消息对象
            if (objectName in typeMapping) {
                var typeName = typeMapping[objectName];
                message.content = new IMLib[typeName](de);
                message.messageType = typeMapping[objectName];
            }
            else if (objectName in registerMessageTypeMapping) {
                var typeName = registerMessageTypeMapping[objectName];
                var regMsg = new IMLib.RongIMClient.RegisterMessage[typeName](de);
                if (isUseDef) {
                    message.content = regMsg.decode(de);
                }
                else {
                    message.content = regMsg;
                }
                message.messageType = registerMessageTypeMapping[objectName];
            }
            else {
                message.content = new RongIMLib.UnknownMessage({ content: de, objectName: objectName });
                message.messageType = "UnknownMessage";
            }
            //根据实体对象设置message对象]
            var dateTime = MessageUtil.int64ToTimestamp(entity.dataTime);
            if (dateTime > 0) {
                message.sentTime = dateTime;
            }
            else {
                message.sentTime = +new Date;
            }
            message.senderUserId = entity.fromUserId;
            message.conversationType = entity.type;
            if (entity.fromUserId == RongIMLib.Bridge._client.userId) {
                message.targetId = entity.groupId;
            }
            else {
                message.targetId = (/^[234]$/.test(entity.type || entity.getType()) ? entity.groupId : message.senderUserId);
            }
            var selfUserId = RongIMLib.Bridge._client.userId;
            // 解决多端在线收自己发的消息时, messageDirection 为 2(接收), 导致未读数增加
            var isSelfSend = entity.direction == 1 || message.senderUserId === selfUserId;
            if (isSelfSend) {
                message.messageDirection = RongIMLib.MessageDirection.SEND;
                message.senderUserId = RongIMLib.Bridge._client.userId;
            }
            else {
                message.messageDirection = RongIMLib.MessageDirection.RECEIVE;
            }
            // 自己给自己发的消息, messageDirection 为 2(接收)
            var isSelfToSelf = message.senderUserId === selfUserId && message.targetId === selfUserId;
            if (isSelfToSelf) {
                message.messageDirection = RongIMLib.MessageDirection.RECEIVE;
            }
            var receivedTime = new Date().getTime();
            message.messageUId = entity.msgId;
            message.receivedTime = RongIMLib.MessageUtil.getCheckedTime(receivedTime);
            message.messageId = (message.conversationType + "_" + ~~(Math.random() * 0xffffff));
            message.objectName = objectName;
            message.receivedStatus = RongIMLib.ReceivedStatus.READ;
            if ((entity.status & 2) == 2) {
                message.receivedStatus = RongIMLib.ReceivedStatus.RETRIEVED;
            }
            message.offLineMessage = offlineMsg ? true : false;
            if (!offlineMsg) {
                if (RongIMLib.RongIMClient._memoryStore.connectAckTime > message.sentTime) {
                    message.offLineMessage = true;
                }
            }
            try {
                var status = MessageUtil.int64ToTimestamp(entity.status);
                message.disableNotification = MessageUtil.isDisableNotification(status);
            }
            catch (error) {
                message.disableNotification = false;
            }
            return message;
        };
        MessageUtil.detectCMP = function (options) {
            options.error = options.fail;
            return RongIMLib.RongUtil.request(options);
        };
        MessageUtil.setDeltaTime = function (serverTime) {
            try {
                RongIMLib.RongIMClient._memoryStore.deltaTime = new Date().getTime() - serverTime;
            }
            catch (e) { }
        };
        MessageUtil.getDeltaTime = function () {
            var _memoryStore = RongIMLib.RongIMClient._memoryStore || {};
            return _memoryStore.deltaTime || 0;
        };
        MessageUtil.getCheckedTime = function (time) {
            var deltaTime = MessageUtil.getDeltaTime();
            return time - deltaTime;
        };
        //适配SSL
        // static schemeArrs: Array<any> = [["http", "ws"], ["https", "wss"]];
        MessageUtil.sign = { converNum: 1, msgNum: 1, isMsgStart: true, isConvStart: true };
        return MessageUtil;
    })();
    RongIMLib.MessageUtil = MessageUtil;
    /**
     * 工具类
     */
    var MessageIdHandler = (function () {
        function MessageIdHandler() {
        }
        MessageIdHandler.init = function () {
            this.messageId = +(RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.Navigation.Endpoint.userId + "msgId") || RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId + "msgId", 0) || 0);
        };
        MessageIdHandler.messageIdPlus = function (method) {
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && this.init();
            if (this.messageId >= 65535) {
                this.messageId = 0;
            }
            this.messageId++;
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId + "msgId", this.messageId);
            return this.messageId;
        };
        MessageIdHandler.clearMessageId = function () {
            this.messageId = 0;
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId + "msgId", this.messageId);
        };
        MessageIdHandler.getMessageId = function () {
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && this.init();
            return this.messageId;
        };
        MessageIdHandler.messageId = 0;
        return MessageIdHandler;
    })();
    RongIMLib.MessageIdHandler = MessageIdHandler;
    var ChrmKVCaches = (function () {
        function ChrmKVCaches() {
            this.time = 0;
            this.cache = {};
        }
        ChrmKVCaches.prototype.setTime = function (time) {
            this.time = time;
        };
        ChrmKVCaches.prototype.getTime = function () {
            return this.time;
        };
        ChrmKVCaches.prototype.setValue = function (kvContent) {
            var key = kvContent.key, timestamp = kvContent.timestamp;
            this.cache[key] = this.cache[key] || {};
            this.cache[key] = {
                value: kvContent.value,
                userId: kvContent.userId,
                isDeleted: false,
                timestamp: timestamp
            };
        };
        ChrmKVCaches.prototype.removeValue = function (kvContent) {
            var key = kvContent.key, timestamp = kvContent.timestamp;
            this.cache[key] = this.cache[key] || {};
            var cache = this.cache[key];
            this.cache[key] = RongIMLib.RongUtil.extend(cache, {
                isDeleted: true,
                userId: kvContent.userId,
                timestamp: timestamp
            });
        };
        ChrmKVCaches.prototype.getValue = function (key) {
            this.cache[key] = this.cache[key] || {};
            var cache = this.cache[key];
            return cache.isDeleted ? null : cache.value;
        };
        ChrmKVCaches.prototype.getAllKV = function () {
            var kv = {};
            RongIMLib.RongUtil.forEach(this.cache, function (item, key) {
                if (!item.isDeleted) {
                    kv[key] = item.value;
                }
            });
            return kv;
        };
        ChrmKVCaches.prototype.getSetUserId = function (key) {
            this.cache[key] = this.cache[key] || {};
            return this.cache[key].userId;
        };
        ChrmKVCaches.prototype.isKeyExisted = function (key) {
            this.cache[key] = this.cache[key] || {};
            var cache = this.cache[key];
            var hasValue = !RongIMLib.RongUtil.isEmpty(cache.value);
            return hasValue && !cache.isDeleted;
        };
        ChrmKVCaches.prototype.clear = function () {
            this.cache = {};
        };
        return ChrmKVCaches;
    })();
    var chrmKVCaches = {};
    var chrmKVProsumerCaches = {};
    var getKVCache = function (chrmId) {
        var chrmKVCache = chrmKVCaches[chrmId];
        if (!chrmKVCache) {
            chrmKVCache = chrmKVCaches[chrmId] = new ChrmKVCaches();
        }
        return chrmKVCache;
    };
    var getKVProsumer = function (chrmId) {
        var kvProsumer = chrmKVProsumerCaches[chrmId];
        if (!kvProsumer) {
            kvProsumer = chrmKVProsumerCaches[chrmId] = new RongIMLib.RongUtil.Prosumer();
        }
        return kvProsumer;
    };
    var ChrmKVHandler = (function () {
        function ChrmKVHandler() {
        }
        ChrmKVHandler.pull = function (chrmId, time) {
            var prosumer = getKVProsumer(chrmId);
            var event = RongIMLib.RongIMClient._dataAccessProvider.pullChatroomEntry;
            prosumer.produce({ event: event, chrmId: chrmId, time: time });
            prosumer.consume(function (params, next) {
                var event = params.event, chrmId = params.chrmId, time = params.time;
                var kvCache = getKVCache(chrmId);
                var currentTime = kvCache.getTime();
                var isKVNeedUpdated = currentTime < time;
                if (isKVNeedUpdated) {
                    event(chrmId, currentTime, {
                        onSuccess: function (result) {
                            ChrmKVHandler.setEntries(chrmId, result);
                            next();
                        },
                        onError: next
                    });
                }
                else {
                    next();
                }
            });
        };
        ChrmKVHandler.setEntries = function (chrmId, entity) {
            var entries = entity.entries, isFullUpdate = entity.bFullUpdate, syncTime = entity.syncTime;
            var event = isFullUpdate ? ChrmKVHandler.setFullEntries : ChrmKVHandler.setIncreEntries;
            var kvCache = getKVCache(chrmId);
            syncTime = MessageUtil.int64ToTimestamp(syncTime);
            if (RongIMLib.RongUtil.isArray(entries)) {
                RongIMLib.RongUtil.forEach(entries, function (item) {
                    var setTime = item.timestamp;
                    if (!RongIMLib.RongUtil.isNumber(setTime)) {
                        item.timestamp = MessageUtil.int64ToTimestamp(setTime);
                    }
                });
            }
            kvCache.setTime(syncTime); // 更新拉取时间
            event(chrmId, entries); // 更新 kv 值
        };
        ChrmKVHandler.setEntry = function (chrmId, chatroomEntry, status, userId) {
            var kvCache = getKVCache(chrmId);
            var timestamp = chatroomEntry.timestamp || +new Date();
            var isDelete = RongInnerTools.getChrmEntityByStatus(status).isDelete;
            var eventName = isDelete ? 'removeValue' : 'setValue';
            kvCache[eventName]({
                key: chatroomEntry.key,
                value: chatroomEntry.value,
                userId: userId,
                timestamp: timestamp
            });
        };
        ChrmKVHandler.setFullEntries = function (chrmId, entries) {
            var kvCache = getKVCache(chrmId);
            kvCache.clear();
            RongIMLib.RongUtil.forEach(entries, function (entity) {
                entity.timestamp = MessageUtil.int64ToTimestamp(entity.timestamp);
                kvCache.setValue({
                    key: entity.key,
                    value: entity.value,
                    userId: entity.uid,
                    timestamp: entity.timestamp
                });
            });
        };
        ChrmKVHandler.setIncreEntries = function (chrmId, entries) {
            var kvCache = getKVCache(chrmId);
            var currentUserId = RongIMLib.RongIMClient.getInstance().getCurrentUserId();
            var optEvent = function (entity, isOverwrite, eventName) {
                var key = entity.key, value = entity.value;
                var isLatestedKeySetBySelf = kvCache.getSetUserId(key) === currentUserId;
                var isKeyNotExist = !kvCache.isKeyExisted(key);
                /*
                    1. 需覆盖时, 不管 key 是否已存在, 都直接设置
                    2. 不覆盖时, 必须最后一次 key 为自己设置的或此 key 还未设置过, 才能继续
                 */
                if (isOverwrite || isLatestedKeySetBySelf || isKeyNotExist) {
                    kvCache[eventName]({
                        key: key,
                        value: value,
                        userId: entity.uid,
                        timestamp: entity.timestamp
                    });
                }
            };
            RongIMLib.RongUtil.forEach(entries, function (entity) {
                var entityContent = RongInnerTools.getChrmEntityByStatus(entity.status);
                var eventName = entityContent.isDelete ? 'removeValue' : 'setValue';
                optEvent(entity, entityContent.isOverwrite, eventName);
            });
        };
        ChrmKVHandler.getEntityValue = function (chrmId, key) {
            var kvCache = getKVCache(chrmId);
            return kvCache.getValue(key);
        };
        ChrmKVHandler.getAllEntityValue = function (chrmId) {
            var kvCache = getKVCache(chrmId);
            return kvCache.getAllKV();
        };
        ChrmKVHandler.isKeyValid = function (key) {
            return /^[A-Za-z0-9_=+-]+$/.test(key);
        };
        return ChrmKVHandler;
    })();
    RongIMLib.ChrmKVHandler = ChrmKVHandler;
    var AutoDeleteCode = 0x0001;
    var OverwriteCode = 0x0002;
    var DeleteOperationCode = 0x0004;
    var RongInnerTools = (function () {
        function RongInnerTools() {
        }
        RongInnerTools.convertUserStatus = function (entity) {
            entity = RongIMLib.RongUtil.rename(entity, { subUserId: 'userId' });
            var status = JSON.parse(entity.status);
            var us = status.us;
            if (!us) {
                return entity;
            }
            entity.status = RongIMLib.RongUtil.rename(us, { o: 'online', 'p': 'platform', s: 'status' });
            return entity;
        };
        RongInnerTools.getChrmEntityStatus = function (entity, chatroomOpt) {
            var status = 0;
            // 是否自动清理
            if (entity.isAutoDelete) {
                status = status | AutoDeleteCode;
            }
            // 是否覆盖
            if (entity.isOverwrite) {
                status = status | OverwriteCode;
            }
            // 操作类型
            switch (chatroomOpt) {
                case RongIMLib.ChatroomEntityOpt.DELETE:
                    status = status | DeleteOperationCode;
                    break;
                default:
                    break;
            }
            return status;
        };
        RongInnerTools.getChrmEntityByStatus = function (status) {
            var isDelete = !!(status & DeleteOperationCode);
            var entityOpt = isDelete ? RongIMLib.ChatroomEntityOpt.DELETE : RongIMLib.ChatroomEntityOpt.UPDATE;
            return {
                isAutoDelete: !!(status & AutoDeleteCode),
                isOverwrite: !!(status & OverwriteCode),
                entityOpt: entityOpt,
                isDelete: isDelete
            };
        };
        return RongInnerTools;
    })();
    RongIMLib.RongInnerTools = RongInnerTools;
    var UnreadCountHandler = (function () {
        function UnreadCountHandler() {
        }
        UnreadCountHandler.getKey = function (type, targetId) {
            var selfId = RongIMLib.RongIMClient.getInstance().getCurrentUserId();
            return RongIMLib.RongUtil.tplEngine(UnreadCountHandler.KeyTemp, {
                selfId: selfId,
                type: type,
                targetId: targetId
            });
        };
        UnreadCountHandler.getDetailByKey = function (key) {
            var detail = { count: 0, sentTime: 0 };
            var value = RongIMLib.RongIMClient._storageProvider.getItem(key);
            if (!value) {
                return detail;
            }
            value += '';
            var unreadItems = value.split('_');
            var hasUnderline = unreadItems.length > 1;
            detail.count = Number(unreadItems[0]);
            if (hasUnderline) {
                detail.sentTime = Number(unreadItems[1]);
            }
            return detail;
        };
        UnreadCountHandler.getDetail = function (type, targetId) {
            var key = UnreadCountHandler.getKey(type, targetId);
            var detail = UnreadCountHandler.getDetailByKey(key);
            return detail;
        };
        UnreadCountHandler.set = function (type, id, count, sentTime) {
            var key = UnreadCountHandler.getKey(type, id);
            var value = sentTime ? RongIMLib.RongUtil.tplEngine(UnreadCountHandler.ValueTemp, {
                count: count,
                sentTime: sentTime
            }) : count;
            RongIMLib.RongIMClient._storageProvider.setItem(key, value);
            return count;
        };
        UnreadCountHandler.add = function (type, id, plusCount, sentTime) {
            var detail = UnreadCountHandler.getDetail(type, id), count = detail.count, oldSentTime = detail.sentTime;
            if (sentTime && sentTime > oldSentTime) {
                count = count + plusCount;
                UnreadCountHandler.set(type, id, count, sentTime);
            }
            return count;
        };
        UnreadCountHandler.get = function (type, id) {
            var detail = UnreadCountHandler.getDetail(type, id);
            return detail.count;
        };
        UnreadCountHandler.getAll = function (types) {
            var total = 0;
            var selfId = RongIMLib.RongIMClient.getInstance().getCurrentUserId();
            var setTotal = function (keyList) {
                RongIMLib.RongUtil.forEach(keyList, function (key) {
                    var detail = UnreadCountHandler.getDetailByKey(key);
                    total += detail.count;
                });
            };
            if (types) {
                RongIMLib.RongUtil.forEach(types, function (type) {
                    var key = UnreadCountHandler.getKey(type, '');
                    var unreadKeys = RongIMLib.RongIMClient._storageProvider.getItemKeyList(key);
                    setTotal(unreadKeys);
                });
            }
            else {
                var key = UnreadCountHandler.getKey('', '');
                var unreadKeys = RongIMLib.RongIMClient._storageProvider.getItemKeyList(key);
                setTotal(unreadKeys);
            }
            return total;
        };
        UnreadCountHandler.remove = function (type, targetId) {
            var key = UnreadCountHandler.getKey(type, targetId);
            RongIMLib.RongIMClient._storageProvider.removeItem(key);
        };
        UnreadCountHandler.clear = function () {
            var key = UnreadCountHandler.getKey('', '');
            var keyList = RongIMLib.RongIMClient._storageProvider.getItemKeyList(key);
            RongIMLib.RongUtil.forEach(keyList, function (key) {
                RongIMLib.RongIMClient._storageProvider.removeItem(key);
            });
        };
        UnreadCountHandler.KeyTemp = 'cu{selfId}{type}{targetId}';
        UnreadCountHandler.ValueTemp = '{count}_{sentTime}';
        return UnreadCountHandler;
    })();
    RongIMLib.UnreadCountHandler = UnreadCountHandler;
    var ConversationStatusStoreUserKey = '{appkey}{userId}constas';
    var ConversationStatusPullTimeStoreKey = 'time';
    var ConversationStatusManager = (function () {
        function ConversationStatusManager(option) {
            this.updatedStatus = []; // 更新的会话状态
            this.statusShangeObserver = new RongIMLib.Observer();
            this.pullProsumer = new RongIMLib.RongUtil.Prosumer();
            var appkey = option.appkey, userId = option.userId;
            this.option = option;
            this.storageKey = RongIMLib.RongUtil.tplEngine(ConversationStatusStoreUserKey, {
                appkey: appkey, userId: userId
            });
        }
        ConversationStatusManager.prototype._formatUpdatedStatus = function (status, type, targetId) {
            var updatedStatus = {
                conversationType: type,
                targetId: targetId
            };
            delete status.isLastInAPull;
            return RongIMLib.RongUtil.extend(updatedStatus, status);
        };
        ConversationStatusManager.prototype.watchChanged = function (event) {
            this.statusShangeObserver.add(event);
        };
        ConversationStatusManager.prototype.set = function (type, targetId, status) {
            var currentStatus = this.get(type, targetId);
            var updateTime = status.updateTime, isLastInAPull = status.isLastInAPull;
            if (updateTime >= currentStatus.updateTime) {
                var allStatus = RongIMLib.RongUtil.Storage.get(this.storageKey) || {};
                var conversationStoreKey = IMHandler.getConversationKey(type, targetId);
                var storeStatus = allStatus[conversationStoreKey] || {};
                RongIMLib.RongUtil.forEach(status, function (val, key) {
                    if (!RongIMLib.RongUtil.isUndefined(val)) {
                        storeStatus[key] = val;
                    }
                });
                allStatus[conversationStoreKey] = storeStatus;
                RongIMLib.RongUtil.Storage.set(this.storageKey, allStatus);
                var updatedStatusItem = this._formatUpdatedStatus(status, type, targetId);
                this.updatedStatus.push(updatedStatusItem);
                RongIMLib.RongIMClient.getInstance().pottingConversation({
                    type: type,
                    userId: targetId
                });
            }
            isLastInAPull && this.statusShangeObserver.emit(this.updatedStatus);
            this.updatedStatus = [];
        };
        ConversationStatusManager.prototype.get = function (type, targetId) {
            var allStatus = RongIMLib.RongUtil.Storage.get(this.storageKey) || {};
            var conversationStoreKey = IMHandler.getConversationKey(type, targetId);
            var status = allStatus[conversationStoreKey] || {};
            var notificationStatus = status.notificationStatus, isTop = status.isTop, updateTime = status.updateTime;
            return {
                notificationStatus: notificationStatus || RongIMLib.ConversationNotificationStatus.NOTIFY,
                isTop: isTop || false,
                updateTime: updateTime || 0
            };
        };
        ConversationStatusManager.prototype.pull = function (option) {
            if (RongIMLib.RongIMClient._memoryStore.depend.isPolling)
                return; //长轮训关闭会话状态设置
            option = option || {};
            var self = this;
            var _a = this, server = _a.option.server, pullProsumer = _a.pullProsumer, storageKey = _a.storageKey;
            pullProsumer.produce(option);
            pullProsumer.consume(function (params, next) {
                var allStatus = RongIMLib.RongUtil.Storage.get(storageKey) || {};
                var lastUpdateTime = allStatus[ConversationStatusPullTimeStoreKey] || 0;
                var updateTime = params.time, isForce = params.isForce;
                if (lastUpdateTime > updateTime && !isForce) {
                    return next();
                }
                server.pullConversationStatus(lastUpdateTime, {
                    onStatus: function (type, id, conversationStatus) {
                        self.set(type, id, conversationStatus);
                    },
                    onSuccess: function (updateTime) {
                        var allStatus = RongIMLib.RongUtil.Storage.get(storageKey) || {};
                        allStatus[ConversationStatusPullTimeStoreKey] = updateTime; // 更新拉取时间戳
                        RongIMLib.RongUtil.Storage.set(self.storageKey, allStatus);
                        next();
                    },
                    onError: next
                });
            });
        };
        return ConversationStatusManager;
    })();
    RongIMLib.ConversationStatusManager = ConversationStatusManager;
    var FixedNaviRespHandler = (function () {
        function FixedNaviRespHandler() {
        }
        FixedNaviRespHandler.modifyVoipCallInfoByAppKey = function () {
            var me = this;
            try {
                var naviResp = me.baseResp;
                var appKey = RongIMLib.RongIMClient._memoryStore.appKey;
                var voipCallInfo = naviResp.voipCallInfo;
                var parseVoipCallInfo = JSON.parse(voipCallInfo);
                RongIMLib.RongUtil.forEach(parseVoipCallInfo.callEngine, function (item) {
                    if (item.engineType === 3) {
                        item.vendorKey = appKey;
                    }
                });
                var jsonVoipCallInfo = JSON.stringify(parseVoipCallInfo);
                naviResp.voipCallInfo = jsonVoipCallInfo;
            }
            catch (error) {
            }
            return naviResp;
        };
        FixedNaviRespHandler.modifyCmpByProtocol = function () {
            var me = this;
            var protocol = RongIMLib.RongIMClient._memoryStore.depend.protocol;
            var isHTTP = protocol === RongIMLib.RongIMClient.HttpProtocol.http;
            var cmpHost = isHTTP ? me.preparedCMP.WS : me.preparedCMP.WSS;
            me.baseResp.backupServer = cmpHost;
        };
        FixedNaviRespHandler.genUserId = function () {
            var token = RongIMLib.RongIMClient._memoryStore.token;
            var uid = RongIMLib.InnerUtil.getUId(token);
            return uid;
        };
        FixedNaviRespHandler.getResp = function () {
            var me = this;
            me.modifyCmpByProtocol();
            var naviResp = me.modifyVoipCallInfoByAppKey();
            naviResp.userId = me.genUserId();
            return naviResp;
        };
        FixedNaviRespHandler.baseResp = {
            isFixedNaviResp: true,
            code: 200,
            userId: '',
            server: '',
            backupServer: '',
            voipCallInfo: '{"strategy":1,"callEngine":[{"engineType":4,"mediaServer":"https://rtc-info.ronghub.com","maxStreamCount":20},{"engineType":3,"vendorKey":"","signKey":"","blinkCMPServer":"rtccmp.ronghub.com:80","blinkSnifferServer":"rtccmp.ronghub.com:80"}]}',
            kvStorage: 1,
            uploadServer: 'upload.qiniup.com',
            openMp: 1,
            openUS: 1,
            logSwitch: 1,
            logPolicy: '{"url": "logcollection.ronghub.com","level": 1,"itv": 6,"times": 5}',
            bosAddr: 'gz.bcebos.com'
        };
        FixedNaviRespHandler.preparedCMP = {
            WSS: 'wsap-cn.ronghub.com:443',
            WS: 'wsap-cn.ronghub.com:80'
        };
        return FixedNaviRespHandler;
    })();
    RongIMLib.FixedNaviRespHandler = FixedNaviRespHandler;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var MessageContent = (function () {
        function MessageContent(data) {
            throw new Error("This method is abstract, you must implement this method in inherited class.");
        }
        MessageContent.obtain = function () {
            throw new Error("This method is abstract, you must implement this method in inherited class.");
        };
        return MessageContent;
    })();
    RongIMLib.MessageContent = MessageContent;
    var NotificationMessage = (function (_super) {
        __extends(NotificationMessage, _super);
        function NotificationMessage() {
            _super.apply(this, arguments);
        }
        return NotificationMessage;
    })(MessageContent);
    RongIMLib.NotificationMessage = NotificationMessage;
    var StatusMessage = (function (_super) {
        __extends(StatusMessage, _super);
        function StatusMessage() {
            _super.apply(this, arguments);
        }
        return StatusMessage;
    })(MessageContent);
    RongIMLib.StatusMessage = StatusMessage;
    var ModelUtil = (function () {
        function ModelUtil() {
        }
        ModelUtil.modelClone = function (object) {
            var obj = {};
            for (var item in object) {
                if (item != "messageName" && "encode" != item) {
                    obj[item] = object[item];
                }
            }
            return obj;
        };
        ModelUtil.modleCreate = function (fields, msgType) {
            // if (fields.length < 1) {
            //     throw new Error("Array is empty  -> registerMessageType.modleCreate");
            // }
            var Object = function (message) {
                var me = this;
                for (var index in fields) {
                    me[fields[index]] = message[fields[index]];
                }
                Object.prototype.messageName = msgType;
                Object.prototype.encode = function () {
                    return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
                };
            };
            return Object;
        };
        return ModelUtil;
    })();
    RongIMLib.ModelUtil = ModelUtil;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var CustomerStatusMessage = (function () {
        function CustomerStatusMessage(message) {
            this.messageName = "CustomerStatusMessage";
            this.status = message.status;
        }
        CustomerStatusMessage.obtain = function () {
            return null;
        };
        CustomerStatusMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CustomerStatusMessage;
    })();
    RongIMLib.CustomerStatusMessage = CustomerStatusMessage;
    /**
     * 客服转换响应消息的类型名
     */
    var ChangeModeResponseMessage = (function () {
        function ChangeModeResponseMessage(message) {
            this.messageName = "ChangeModeResponseMessage";
            this.code = message.code;
            this.data = message.data;
            this.msg = message.msg;
        }
        ChangeModeResponseMessage.obtain = function () {
            return null;
        };
        ChangeModeResponseMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ChangeModeResponseMessage;
    })();
    RongIMLib.ChangeModeResponseMessage = ChangeModeResponseMessage;
    /**
     * 客服转换消息的类型名
     * 此消息不计入未读消息数
     */
    var ChangeModeMessage = (function () {
        function ChangeModeMessage(message) {
            this.messageName = "ChangeModeMessage";
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
        }
        ChangeModeMessage.obtain = function () {
            return null;
        };
        ChangeModeMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ChangeModeMessage;
    })();
    RongIMLib.ChangeModeMessage = ChangeModeMessage;
    var CustomerStatusUpdateMessage = (function () {
        function CustomerStatusUpdateMessage(message) {
            this.messageName = "CustomerStatusUpdateMessage";
            this.serviceStatus = message.serviceStatus;
            this.sid = message.sid;
        }
        CustomerStatusUpdateMessage.obtain = function () {
            return null;
        };
        CustomerStatusUpdateMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CustomerStatusUpdateMessage;
    })();
    RongIMLib.CustomerStatusUpdateMessage = CustomerStatusUpdateMessage;
    var HandShakeMessage = (function () {
        function HandShakeMessage(message) {
            this.messageName = "HandShakeMessage";
            if (message) {
                this.requestInfo = message.requestInfo;
                this.userInfo = message.userInfo;
            }
        }
        HandShakeMessage.obtain = function () {
            return null;
        };
        HandShakeMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return HandShakeMessage;
    })();
    RongIMLib.HandShakeMessage = HandShakeMessage;
    var CustomerContact = (function () {
        function CustomerContact(message) {
            this.messageName = "CustomerContact";
            this.page = message.page;
            this.nickName = message.nickName;
            this.routingInfo = message.routingInfo;
            this.info = message.info;
            this.requestInfo = message.requestInfo;
        }
        CustomerContact.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CustomerContact;
    })();
    RongIMLib.CustomerContact = CustomerContact;
    var EvaluateMessage = (function () {
        function EvaluateMessage(message) {
            this.messageName = "EvaluateMessage";
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
            this.source = message.source;
            this.suggest = message.suggest;
            this.isresolve = message.isresolve;
            this.type = message.type;
        }
        EvaluateMessage.obtain = function () {
            return null;
        };
        EvaluateMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return EvaluateMessage;
    })();
    RongIMLib.EvaluateMessage = EvaluateMessage;
    /**
     * 客服握手响应消息的类型名
     */
    var HandShakeResponseMessage = (function () {
        function HandShakeResponseMessage(message) {
            this.messageName = "HandShakeResponseMessage";
            this.msg = message.msg;
            this.status = message.status;
            this.data = message.data;
        }
        HandShakeResponseMessage.obtain = function () {
            return null;
        };
        HandShakeResponseMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return HandShakeResponseMessage;
    })();
    RongIMLib.HandShakeResponseMessage = HandShakeResponseMessage;
    var SuspendMessage = (function () {
        function SuspendMessage(message) {
            this.messageName = "SuspendMessage";
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
        }
        SuspendMessage.obtain = function () {
            return null;
        };
        SuspendMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return SuspendMessage;
    })();
    RongIMLib.SuspendMessage = SuspendMessage;
    var TerminateMessage = (function () {
        function TerminateMessage(message) {
            this.messageName = "TerminateMessage";
            this.code = message.code;
            this.msg = message.msg;
            this.sid = message.sid;
        }
        TerminateMessage.obtain = function () {
            return null;
        };
        TerminateMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return TerminateMessage;
    })();
    RongIMLib.TerminateMessage = TerminateMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var IsTypingStatusMessage = (function () {
        function IsTypingStatusMessage(data) {
            this.messageName = "IsTypingStatusMessage";
            var msg = data;
        }
        IsTypingStatusMessage.prototype.encode = function () {
            return undefined;
        };
        IsTypingStatusMessage.prototype.getMessage = function () {
            return null;
        };
        return IsTypingStatusMessage;
    })();
    RongIMLib.IsTypingStatusMessage = IsTypingStatusMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var InformationNotificationMessage = (function () {
        function InformationNotificationMessage(message) {
            this.messageName = "InformationNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> InformationNotificationMessage.");
            }
            this.message = message.message;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
        }
        InformationNotificationMessage.obtain = function (message) {
            return new InformationNotificationMessage({ message: message, extra: "" });
        };
        InformationNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return InformationNotificationMessage;
    })();
    RongIMLib.InformationNotificationMessage = InformationNotificationMessage;
    var CommandMessage = (function () {
        function CommandMessage(message) {
            this.messageName = "CommandMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> CommandMessage.");
            }
            try {
                if (Object.prototype.toString.call(message.data) == "[object String]") {
                    this.data = JSON.parse(message.data);
                }
                else {
                    this.data = message.data;
                }
            }
            catch (e) {
                this.data = message.data;
                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_INIT_CMD_MSG_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                        stack: e,
                        msg: message.data
                    } });
            }
            this.name = message.name;
            this.extra = message.extra;
        }
        CommandMessage.obtain = function (data) {
            return new CommandMessage({ data: data, extra: "" });
        };
        CommandMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CommandMessage;
    })();
    RongIMLib.CommandMessage = CommandMessage;
    var ContactNotificationMessage = (function () {
        function ContactNotificationMessage(message) {
            this.messageName = "ContactNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ContactNotificationMessage.");
            }
            this.operation = message.operation;
            this.targetUserId = message.targetUserId;
            this.message = message.message;
            this.extra = message.extra;
            this.sourceUserId = message.sourceUserId;
            if (message.user) {
                this.user = message.user;
            }
        }
        ContactNotificationMessage.obtain = function (operation, sourceUserId, targetUserId, message) {
            return new InformationNotificationMessage({ operation: operation, sourceUserId: sourceUserId, targetUserId: targetUserId, message: message });
        };
        ContactNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        ContactNotificationMessage.CONTACT_OPERATION_ACCEPT_RESPONSE = "ContactOperationAcceptResponse";
        ContactNotificationMessage.CONTACT_OPERATION_REJECT_RESPONSE = "ContactOperationRejectResponse";
        ContactNotificationMessage.CONTACT_OPERATION_REQUEST = "ContactOperationRequest";
        return ContactNotificationMessage;
    })();
    RongIMLib.ContactNotificationMessage = ContactNotificationMessage;
    var ProfileNotificationMessage = (function () {
        function ProfileNotificationMessage(message) {
            this.messageName = "ProfileNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ProfileNotificationMessage.");
            }
            this.operation = message.operation;
            try {
                if (Object.prototype.toString.call(message.data) == "[object String]") {
                    this.data = JSON.parse(message.data);
                }
                else {
                    this.data = message.data;
                }
            }
            catch (e) {
                this.data = message.data;
                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_INIT_PROFILE_MSG_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                        stack: e,
                        msg: message.data
                    } });
            }
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
        }
        ProfileNotificationMessage.obtain = function (operation, data) {
            return new ProfileNotificationMessage({ operation: operation, data: data });
        };
        ProfileNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ProfileNotificationMessage;
    })();
    RongIMLib.ProfileNotificationMessage = ProfileNotificationMessage;
    var CommandNotificationMessage = (function () {
        function CommandNotificationMessage(message) {
            this.messageName = "CommandNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ProfileNotificationMessage.");
            }
            try {
                if (Object.prototype.toString.call(message.data) == "[object String]") {
                    this.data = JSON.parse(message.data);
                }
                else {
                    this.data = message.data;
                }
            }
            catch (e) {
                this.data = message.data;
                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_INIT_CMD_NOTI_MSG_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                        stack: e,
                        msg: message.data
                    } });
            }
            this.name = message.name;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
        }
        CommandNotificationMessage.obtain = function (name, data) {
            return new CommandNotificationMessage({ name: name, data: data, extra: "" });
        };
        CommandNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CommandNotificationMessage;
    })();
    RongIMLib.CommandNotificationMessage = CommandNotificationMessage;
    var DiscussionNotificationMessage = (function () {
        function DiscussionNotificationMessage(message) {
            this.messageName = "DiscussionNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> DiscussionNotificationMessage.");
            }
            this.extra = message.extra;
            this.extension = message.extension;
            this.type = message.type;
            this.isHasReceived = message.isHasReceived;
            this.operation = message.operation;
            this.user = message.user;
            if (message.user) {
                this.user = message.user;
            }
        }
        DiscussionNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return DiscussionNotificationMessage;
    })();
    RongIMLib.DiscussionNotificationMessage = DiscussionNotificationMessage;
    var GroupNotificationMessage = (function () {
        function GroupNotificationMessage(msg) {
            this.messageName = "GroupNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> GroupNotificationMessage.");
            }
            msg.operatorUserId && (this.operatorUserId = msg.operatorUserId);
            msg.operation && (this.operation = msg.operation);
            msg.data && (this.data = msg.data);
            msg.message && (this.message = msg.message);
            msg.extra && (this.extra = msg.extra);
        }
        GroupNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return GroupNotificationMessage;
    })();
    RongIMLib.GroupNotificationMessage = GroupNotificationMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var TextMessage = (function () {
        function TextMessage(message) {
            this.messageName = "TextMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> TextMessage.");
            }
            this.content = message.content;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
            if (message.burnDuration) {
                this.burnDuration = message.burnDuration;
            }
        }
        TextMessage.obtain = function (text) {
            return new TextMessage({ extra: "", content: text });
        };
        TextMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return TextMessage;
    })();
    RongIMLib.TextMessage = TextMessage;
    var TypingStatusMessage = (function () {
        function TypingStatusMessage(message) {
            this.messageName = "TypingStatusMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> TypingStatusMessage.");
            }
            this.typingContentType = message.typingContentType;
            this.data = message.data;
        }
        TypingStatusMessage.obtain = function (typingContentType, data) {
            return new TypingStatusMessage({ typingContentType: typingContentType, data: data });
        };
        TypingStatusMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return TypingStatusMessage;
    })();
    RongIMLib.TypingStatusMessage = TypingStatusMessage;
    var ReadReceiptMessage = (function () {
        function ReadReceiptMessage(message) {
            this.messageName = "ReadReceiptMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ReadReceiptMessage.");
            }
            this.lastMessageSendTime = message.lastMessageSendTime;
            this.messageUId = message.messageUId;
            this.type = message.type;
        }
        ReadReceiptMessage.obtain = function (messageUId, lastMessageSendTime, type) {
            return new ReadReceiptMessage({ messageUId: messageUId, lastMessageSendTime: lastMessageSendTime, type: type });
        };
        ReadReceiptMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ReadReceiptMessage;
    })();
    RongIMLib.ReadReceiptMessage = ReadReceiptMessage;
    var VoiceMessage = (function () {
        function VoiceMessage(message) {
            this.messageName = "VoiceMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> VoiceMessage.");
            }
            this.content = message.content;
            this.duration = message.duration;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
            if (message.burnDuration) {
                this.burnDuration = message.burnDuration;
            }
        }
        VoiceMessage.obtain = function (base64Content, duration) {
            return new VoiceMessage({ content: base64Content, duration: duration, extra: "" });
        };
        VoiceMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return VoiceMessage;
    })();
    RongIMLib.VoiceMessage = VoiceMessage;
    var RecallCommandMessage = (function () {
        function RecallCommandMessage(message) {
            this.messageName = "RecallCommandMessage";
            this.messageUId = message.messageUId;
            this.conversationType = message.conversationType;
            this.targetId = message.targetId;
            this.sentTime = message.sentTime;
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
        }
        RecallCommandMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return RecallCommandMessage;
    })();
    RongIMLib.RecallCommandMessage = RecallCommandMessage;
    var ImageMessage = (function () {
        function ImageMessage(message) {
            this.messageName = "ImageMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ImageMessage.");
            }
            this.content = message.content;
            this.imageUri = message.imageUri;
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
            if (message.burnDuration) {
                this.burnDuration = message.burnDuration;
            }
        }
        ImageMessage.obtain = function (content, imageUri) {
            return new ImageMessage({ content: content, imageUri: imageUri, extra: "" });
        };
        ImageMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ImageMessage;
    })();
    RongIMLib.ImageMessage = ImageMessage;
    var LocationMessage = (function () {
        function LocationMessage(message) {
            this.messageName = "LocationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> LocationMessage.");
            }
            this.latitude = message.latitude;
            this.longitude = message.longitude;
            this.poi = message.poi;
            this.content = message.content;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        LocationMessage.obtain = function (latitude, longitude, poi, content) {
            return new LocationMessage({ latitude: latitude, longitude: longitude, poi: poi, content: content, extra: "" });
        };
        LocationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return LocationMessage;
    })();
    RongIMLib.LocationMessage = LocationMessage;
    var RichContentMessage = (function () {
        function RichContentMessage(message) {
            this.messageName = "RichContentMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> RichContentMessage.");
            }
            this.title = message.title;
            this.content = message.content;
            this.imageUri = message.imageUri;
            this.extra = message.extra;
            this.url = message.url;
            if (message.user) {
                this.user = message.user;
            }
        }
        RichContentMessage.obtain = function (title, content, imageUri, url) {
            return new RichContentMessage({ title: title, content: content, imageUri: imageUri, url: url, extra: "" });
        };
        RichContentMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return RichContentMessage;
    })();
    RongIMLib.RichContentMessage = RichContentMessage;
    var JrmfRedPacketMessage = (function () {
        function JrmfRedPacketMessage(message) {
            this.messageName = 'JrmfRedPacketMessage';
            message && (this.message = message);
        }
        JrmfRedPacketMessage.prototype.encode = function () {
            return "";
        };
        return JrmfRedPacketMessage;
    })();
    RongIMLib.JrmfRedPacketMessage = JrmfRedPacketMessage;
    var JrmfRedPacketOpenedMessage = (function () {
        function JrmfRedPacketOpenedMessage(message) {
            this.messageName = 'JrmfRedPacketOpenedMessage';
            message && (this.message = message);
        }
        JrmfRedPacketOpenedMessage.prototype.encode = function () {
            return "";
        };
        return JrmfRedPacketOpenedMessage;
    })();
    RongIMLib.JrmfRedPacketOpenedMessage = JrmfRedPacketOpenedMessage;
    var UnknownMessage = (function () {
        function UnknownMessage(message) {
            this.messageName = "UnknownMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> UnknownMessage.");
            }
            this.message = message;
        }
        UnknownMessage.prototype.encode = function () {
            return "";
        };
        return UnknownMessage;
    })();
    RongIMLib.UnknownMessage = UnknownMessage;
    var PublicServiceCommandMessage = (function () {
        function PublicServiceCommandMessage(message) {
            this.messageName = "PublicServiceCommandMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> PublicServiceCommandMessage.");
            }
            this.content = message.content;
            this.extra = message.extra;
            this.menuItem = message.menuItem;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        PublicServiceCommandMessage.obtain = function (item) {
            return new PublicServiceCommandMessage({ content: "", command: "", menuItem: item, extra: "" });
        };
        PublicServiceCommandMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return PublicServiceCommandMessage;
    })();
    RongIMLib.PublicServiceCommandMessage = PublicServiceCommandMessage;
    var PublicServiceMultiRichContentMessage = (function () {
        function PublicServiceMultiRichContentMessage(messages) {
            this.messageName = "PublicServiceMultiRichContentMessage";
            this.richContentMessages = messages;
        }
        PublicServiceMultiRichContentMessage.prototype.encode = function () {
            return null;
        };
        return PublicServiceMultiRichContentMessage;
    })();
    RongIMLib.PublicServiceMultiRichContentMessage = PublicServiceMultiRichContentMessage;
    var SyncReadStatusMessage = (function () {
        function SyncReadStatusMessage(message) {
            this.messageName = "SyncReadStatusMessage";
            message.lastMessageSendTime && (this.lastMessageSendTime = message.lastMessageSendTime);
        }
        SyncReadStatusMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return SyncReadStatusMessage;
    })();
    RongIMLib.SyncReadStatusMessage = SyncReadStatusMessage;
    var ReadReceiptRequestMessage = (function () {
        function ReadReceiptRequestMessage(message) {
            this.messageName = "ReadReceiptRequestMessage";
            message.messageUId && (this.messageUId = message.messageUId);
        }
        ReadReceiptRequestMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ReadReceiptRequestMessage;
    })();
    RongIMLib.ReadReceiptRequestMessage = ReadReceiptRequestMessage;
    var ReadReceiptResponseMessage = (function () {
        function ReadReceiptResponseMessage(message) {
            this.messageName = "ReadReceiptResponseMessage";
            message.receiptMessageDic && (this.receiptMessageDic = message.receiptMessageDic);
        }
        ReadReceiptResponseMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ReadReceiptResponseMessage;
    })();
    RongIMLib.ReadReceiptResponseMessage = ReadReceiptResponseMessage;
    var PublicServiceRichContentMessage = (function () {
        function PublicServiceRichContentMessage(message) {
            this.messageName = "PublicServiceRichContentMessage";
            this.richContentMessage = message;
        }
        PublicServiceRichContentMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return PublicServiceRichContentMessage;
    })();
    RongIMLib.PublicServiceRichContentMessage = PublicServiceRichContentMessage;
    var FileMessage = (function () {
        function FileMessage(message) {
            this.messageName = "FileMessage";
            message.name && (this.name = message.name);
            message.size && (this.size = message.size);
            message.type && (this.type = message.type);
            message.fileUrl && (this.fileUrl = message.fileUrl);
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
        }
        FileMessage.obtain = function (msg) {
            return new FileMessage({ name: msg.name, size: msg.size, type: msg.type, fileUrl: msg.fileUrl });
        };
        FileMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return FileMessage;
    })();
    RongIMLib.FileMessage = FileMessage;
    var HQVoiceMessage = (function () {
        function HQVoiceMessage(message) {
            this.messageName = "HQVoiceMessage";
            this.type = message.type || 'aac';
            message.localPath && (this.localPath = message.localPath);
            message.remoteUrl && (this.remoteUrl = message.remoteUrl);
            message.duration && (this.duration = message.duration);
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
            message.burnDuration && (this.burnDuration = message.burnDuration);
        }
        HQVoiceMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return HQVoiceMessage;
    })();
    RongIMLib.HQVoiceMessage = HQVoiceMessage;
    var AcceptMessage = (function () {
        function AcceptMessage(message) {
            this.messageName = "AcceptMessage";
            this.mediaId = message.mediaId;
            this.callId = message.callId;
            this.mediaType = message.mediaType;
            this.mode = message.mode;
            this.subInfo = message.subInfo;
        }
        AcceptMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return AcceptMessage;
    })();
    RongIMLib.AcceptMessage = AcceptMessage;
    var RingingMessage = (function () {
        function RingingMessage(message) {
            this.messageName = "RingingMessage";
            this.callId = message.callId;
        }
        RingingMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return RingingMessage;
    })();
    RongIMLib.RingingMessage = RingingMessage;
    var SummaryMessage = (function () {
        function SummaryMessage(message) {
            this.messageName = "SummaryMessage";
            this.caller = message.caller;
            this.inviter = message.inviter;
            this.mediaType = message.mediaType;
            this.memberIdList = message.memberIdList;
            this.startTime = message.startTime;
            this.connectedTime = message.connectedTime;
            this.duration = message.duration;
            this.status = message.status;
        }
        SummaryMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return SummaryMessage;
    })();
    RongIMLib.SummaryMessage = SummaryMessage;
    var HungupMessage = (function () {
        function HungupMessage(message) {
            this.messageName = "HungupMessage";
            this.callId = message.callId;
            this.reason = message.reason;
            this.mode = message.mode;
            this.subInfo = message.subInfo;
        }
        HungupMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return HungupMessage;
    })();
    RongIMLib.HungupMessage = HungupMessage;
    var InviteMessage = (function () {
        function InviteMessage(message) {
            this.messageName = "InviteMessage";
            this.mediaId = message.mediaId;
            this.callId = message.callId;
            this.engineType = message.engineType;
            this.channelInfo = message.channelInfo;
            this.mediaType = message.mediaType;
            this.extra = message.extra;
            this.inviteUserIds = message.inviteUserIds;
            this.observerUserIds = message.observerUserIds;
            this.mode = message.mode;
            this.subInfo = message.subInfo;
        }
        InviteMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return InviteMessage;
    })();
    RongIMLib.InviteMessage = InviteMessage;
    var MediaModifyMessage = (function () {
        function MediaModifyMessage(message) {
            this.messageName = "MediaModifyMessage";
            this.callId = message.callId;
            this.mediaType = message.mediaType;
            this.mode = message.mode;
            this.subInfo = message.subInfo;
        }
        MediaModifyMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return MediaModifyMessage;
    })();
    RongIMLib.MediaModifyMessage = MediaModifyMessage;
    var MemberModifyMessage = (function () {
        function MemberModifyMessage(message) {
            this.messageName = "MemberModifyMessage";
            this.modifyMemType = message.modifyMemType;
            this.callId = message.callId;
            this.caller = message.caller;
            this.engineType = message.engineType;
            this.channelInfo = message.channelInfo;
            this.mediaType = message.mediaType;
            this.extra = message.extra;
            this.inviteUserIds = message.inviteUserIds;
            this.existedMemberStatusList = message.existedMemberStatusList;
            this.existedUserPofiles = message.existedUserPofiles;
            this.observerUserIds = message.observerUserIds;
            this.mode = message.mode;
            this.subInfo = message.subInfo;
        }
        MemberModifyMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return MemberModifyMessage;
    })();
    RongIMLib.MemberModifyMessage = MemberModifyMessage;
    var RCCombineMessage = (function () {
        function RCCombineMessage(message) {
            this.messageName = "RCCombineMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> RCCombineMessage.");
            }
            this.nameList = message.nameList;
            this.remoteUrl = message.remoteUrl;
            if (message.user) {
                this.user = message.user;
            }
            this.conversationType = message.conversationType;
            this.summaryList = message.summaryList;
        }
        RCCombineMessage.obtain = function (remoteUrl, nameList, summaryList, conversationType) {
            return new RCCombineMessage({ extra: "", content: remoteUrl, nameList: nameList, summaryList: summaryList, conversationType: conversationType });
        };
        RCCombineMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return RCCombineMessage;
    })();
    RongIMLib.RCCombineMessage = RCCombineMessage;
    var ChrmKVNotificationMessage = (function () {
        function ChrmKVNotificationMessage(message) {
            this.messageName = "ChrmKVNotificationMessage";
            message.key && (this.key = message.key);
            message.value && (this.value = message.value);
            message.type && (this.type = message.type);
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
        }
        ChrmKVNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ChrmKVNotificationMessage;
    })();
    RongIMLib.ChrmKVNotificationMessage = ChrmKVNotificationMessage;
    var LogCommandMessage = (function () {
        function LogCommandMessage(message) {
            this.messageName = "LogCommandMessage";
            message.uri && (this.uri = message.uri);
            message.logId && (this.logId = message.logId);
            message.platform && (this.platform = message.platform);
            message.packageName && (this.packageName = message.packageName);
            message.startTime && (this.startTime = message.startTime);
            message.endTime && (this.endTime = message.endTime);
            message.user && (this.user = message.user);
        }
        LogCommandMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return LogCommandMessage;
    })();
    RongIMLib.LogCommandMessage = LogCommandMessage;
    var ReferenceMessage = (function () {
        function ReferenceMessage(message) {
            this.messageName = "ReferenceMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ReferenceMessage.");
            }
            this.content = message.content;
            this.referMsgUserId = message.referMsgUserId;
            this.referMsg = message.referMsg;
            this.objName = message.objName;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        ReferenceMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ReferenceMessage;
    })();
    RongIMLib.ReferenceMessage = ReferenceMessage;
    var GIFMessage = (function () {
        function GIFMessage(message) {
            this.messageName = "GIFMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ReferenceMessage.");
            }
            this.gifDataSize = message.gifDataSize;
            this.localPath = message.localPath;
            this.remoteUrl = message.remoteUrl;
            this.width = message.width;
            this.height = message.height;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        GIFMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return GIFMessage;
    })();
    RongIMLib.GIFMessage = GIFMessage;
    var SightMessage = (function () {
        function SightMessage(message) {
            this.messageName = "SightMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ReferenceMessage.");
            }
            this.sightUrl = message.sightUrl;
            this.content = message.content;
            this.duration = message.duration;
            this.size = message.size;
            this.name = message.name;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        SightMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return SightMessage;
    })();
    RongIMLib.SightMessage = SightMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var ChannelInfo = (function () {
        function ChannelInfo(Id, Key) {
            this.Id = Id;
            this.Key = Key;
        }
        return ChannelInfo;
    })();
    RongIMLib.ChannelInfo = ChannelInfo;
    var UserStatus = (function () {
        function UserStatus(platform, online, status) {
            this.platform = platform;
            this.online = online;
            this.status = status;
        }
        return UserStatus;
    })();
    RongIMLib.UserStatus = UserStatus;
    var MentionedInfo = (function () {
        function MentionedInfo(type, userIdList, mentionedContent) {
        }
        return MentionedInfo;
    })();
    RongIMLib.MentionedInfo = MentionedInfo;
    var DeleteMessage = (function () {
        function DeleteMessage(msgId, msgDataTime, direct) {
            this.msgId = msgId;
            this.msgDataTime = msgDataTime;
            this.direct = direct;
        }
        return DeleteMessage;
    })();
    RongIMLib.DeleteMessage = DeleteMessage;
    var CustomServiceConfig = (function () {
        function CustomServiceConfig(isBlack, companyName, companyUrl) {
        }
        return CustomServiceConfig;
    })();
    RongIMLib.CustomServiceConfig = CustomServiceConfig;
    var CustomServiceSession = (function () {
        function CustomServiceSession(uid, cid, pid, isQuited, type, adminHelloWord, adminOfflineWord) {
        }
        return CustomServiceSession;
    })();
    RongIMLib.CustomServiceSession = CustomServiceSession;
    var Conversation = (function () {
        function Conversation(conversationTitle, conversationType, draft, isTop, latestMessage, latestMessageId, notificationStatus, objectName, receivedStatus, receivedTime, senderUserId, senderUserName, sentStatus, sentTime, targetId, unreadMessageCount, senderPortraitUri, isHidden, mentionedMsg, hasUnreadMention, _readTime) {
            this.conversationTitle = conversationTitle;
            this.conversationType = conversationType;
            this.draft = draft;
            this.isTop = isTop;
            this.latestMessage = latestMessage;
            this.latestMessageId = latestMessageId;
            this.notificationStatus = notificationStatus;
            this.objectName = objectName;
            this.receivedStatus = receivedStatus;
            this.receivedTime = receivedTime;
            this.senderUserId = senderUserId;
            this.senderUserName = senderUserName;
            this.sentStatus = sentStatus;
            this.sentTime = sentTime;
            this.targetId = targetId;
            this.unreadMessageCount = unreadMessageCount;
            this.senderPortraitUri = senderPortraitUri;
            this.isHidden = isHidden;
            this.mentionedMsg = mentionedMsg;
            this.hasUnreadMention = hasUnreadMention;
            this._readTime = _readTime;
        }
        Conversation.prototype.setTop = function () {
            RongIMLib.RongIMClient._dataAccessProvider.addConversation(this, { onSuccess: function (data) { } });
        };
        return Conversation;
    })();
    RongIMLib.Conversation = Conversation;
    var Discussion = (function () {
        function Discussion(creatorId, id, memberIdList, name, isOpen) {
            this.creatorId = creatorId;
            this.id = id;
            this.memberIdList = memberIdList;
            this.name = name;
            this.isOpen = isOpen;
        }
        return Discussion;
    })();
    RongIMLib.Discussion = Discussion;
    var Group = (function () {
        function Group(id, name, portraitUri) {
            this.id = id;
            this.name = name;
            this.portraitUri = portraitUri;
        }
        return Group;
    })();
    RongIMLib.Group = Group;
    var Message = (function () {
        function Message(content, conversationType, extra, objectName, messageDirection, messageId, receivedStatus, receivedTime, senderUserId, sentStatus, sentTime, targetId, messageType, messageUId, isLocalMessage, offLineMessage, receiptResponse, disableNotification) {
            this.content = content;
            this.conversationType = conversationType;
            this.extra = extra;
            this.objectName = objectName;
            this.messageDirection = messageDirection;
            this.messageId = messageId;
            this.receivedStatus = receivedStatus;
            this.receivedTime = receivedTime;
            this.senderUserId = senderUserId;
            this.sentStatus = sentStatus;
            this.sentTime = sentTime;
            this.targetId = targetId;
            this.messageType = messageType;
            this.messageUId = messageUId;
            this.isLocalMessage = isLocalMessage;
            this.offLineMessage = offLineMessage;
            this.receiptResponse = receiptResponse;
            this.disableNotification = disableNotification;
        }
        return Message;
    })();
    RongIMLib.Message = Message;
    var MessageTag = (function () {
        function MessageTag(isCounted, isPersited) {
            this.isCounted = isCounted;
            this.isPersited = isPersited;
        }
        MessageTag.prototype.getMessageTag = function () {
            if (this.isCounted && this.isPersited) {
                return 3;
            }
            else if (this.isCounted) {
                return 2;
            }
            else if (this.isPersited) {
                return 1;
            }
            else if (!this.isCounted && !this.isPersited) {
                return 0;
            }
        };
        MessageTag.getTagByStatus = function (status) {
            var statusMap = {
                3: {
                    isCounted: true,
                    isPersited: true
                },
                2: {
                    isCounted: true,
                    isPersited: false
                },
                1: {
                    isCounted: true,
                    isPersited: true
                },
                0: {
                    isCounted: true,
                    isPersited: true
                }
            };
            return statusMap[status] || statusMap[3];
        };
        return MessageTag;
    })();
    RongIMLib.MessageTag = MessageTag;
    var PublicServiceMenuItem = (function () {
        function PublicServiceMenuItem(id, name, type, sunMenuItems, url) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.sunMenuItems = sunMenuItems;
            this.url = url;
        }
        return PublicServiceMenuItem;
    })();
    RongIMLib.PublicServiceMenuItem = PublicServiceMenuItem;
    // TODO: TBD
    var PublicServiceProfile = (function () {
        function PublicServiceProfile(conversationType, introduction, menu, name, portraitUri, publicServiceId, hasFollowed, isGlobal) {
            this.conversationType = conversationType;
            this.introduction = introduction;
            this.menu = menu;
            this.name = name;
            this.portraitUri = portraitUri;
            this.publicServiceId = publicServiceId;
            this.hasFollowed = hasFollowed;
            this.isGlobal = isGlobal;
        }
        return PublicServiceProfile;
    })();
    RongIMLib.PublicServiceProfile = PublicServiceProfile;
    var UserInfo = (function () {
        function UserInfo(id, name, portraitUri) {
            this.id = id;
            this.name = name;
            this.portraitUri = portraitUri;
        }
        return UserInfo;
    })();
    RongIMLib.UserInfo = UserInfo;
    var User = (function () {
        function User(id, token) {
            this.id = id;
            this.token = token;
        }
        return User;
    })();
    RongIMLib.User = User;
    var Room = (function () {
        function Room(id, user, mode, broadcastType, type) {
            this.id = id;
            this.user = user;
            this.mode = mode;
            this.broadcastType = broadcastType;
            this.type = type;
        }
        return Room;
    })();
    RongIMLib.Room = Room;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var ServerDataProvider = (function () {
        function ServerDataProvider() {
            this.userStatusListener = null;
            this.Conversation = {
                watcher: new RongIMLib.Observer(),
                watch: function (_watcher) {
                    this.watcher.add(_watcher);
                    var conversationList = RongIMLib.RongIMClient._memoryStore.conversationList;
                    this.watcher.emit(conversationList);
                },
                unwatch: function (_watcher) {
                    this.watcher.remove(_watcher);
                },
                _notify: function (conversationList) {
                    this.watcher.emit(conversationList);
                }
            };
        }
        ServerDataProvider.prototype.init = function (appKey, options) {
            new RongIMLib.FeatureDectector(options.appCallback);
        };
        ServerDataProvider.prototype.connect = function (token, callback, userId, option) {
            var self = this;
            RongIMLib.Logger.reportRTLog();
            option = option || {};
            var isReconnect = option.isReconnect;
            var isIgnoreReportStart = option.isIgnoreReportStart;
            var StartReportTag = isReconnect ? RongIMLib.LoggerTag.IM.L_RECO_T : RongIMLib.LoggerTag.IM.A_CONN_T;
            var EndReportTag = isReconnect ? RongIMLib.LoggerTag.IM.L_RECO_R : RongIMLib.LoggerTag.IM.A_CONN_R;
            !isIgnoreReportStart && RongIMLib.Logger.writeLog({ tag: StartReportTag, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: { "token": token } });
            RongIMLib.RongIMClient.bridge = RongIMLib.Bridge.getInstance();
            RongIMLib.RongIMClient._memoryStore.token = token;
            RongIMLib.RongIMClient._memoryStore.callback = callback;
            userId = userId || '';
            option = option || {};
            var isConnecting = false, isConnected = false;
            if (RongIMLib.Bridge._client && RongIMLib.Bridge._client.channel) {
                isConnecting = (RongIMLib.Bridge._client.channel.connectionStatus == RongIMLib.ConnectionStatus.CONNECTING);
                isConnected = (RongIMLib.Bridge._client.channel.connectionStatus == RongIMLib.ConnectionStatus.CONNECTED);
            }
            if (isConnected || isConnecting) {
                return;
            }
            var isGreater = (RongIMLib.RongIMClient.otherDeviceLoginCount > 5);
            if (isGreater) {
                callback.onError(RongIMLib.ConnectionStatus.ULTRALIMIT);
                return;
            }
            // 清除本地导航缓存
            if (option.force) {
                RongIMLib.RongIMClient._storageProvider.removeItem('servers');
            }
            RongIMLib.RongIMClient.bridge.setListener();
            RongIMLib.RongIMClient.bridge.connect(RongIMLib.RongIMClient._memoryStore.appKey, token, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                        RongIMLib.RongIMClient._memoryStore.networkUnavailable = false;
                        RongIMLib.Logger.loggerCache.userId = data;
                        RongIMLib.Logger.writeLog({ tag: EndReportTag, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: { desc: 'connection succeeded' } });
                        self.conversationStatusManager = new RongIMLib.ConversationStatusManager({
                            appkey: RongIMLib.RongIMClient._memoryStore.appKey,
                            userId: data,
                            server: self
                        });
                        self.conversationStatusManager.watchChanged(function (status) {
                            RongIMLib.RongUtil.forEach(RongIMLib.RongIMClient.conversationStatusListeners, function (event) {
                                event(status);
                            });
                        });
                        self.conversationStatusManager.pull({
                            isForce: true
                        });
                    });
                    var storage = RongIMLib.RongIMClient._storageProvider;
                    var fullnavi = storage.getItem('fullnavi') || '{}';
                    try {
                        fullnavi = JSON.parse(fullnavi);
                    }
                    catch (e) {
                        fullnavi = {};
                    }
                    var isAutoPull = fullnavi.openUS;
                    isAutoPull && self.getVoipInfo({
                        onSuccess: function (VoipInfo) {
                            try {
                                VoipInfo && RongIMLib.RongUtil.forEach(RongIMLib.RongIMClient.settingListeners, function (listener) {
                                    listener({ VoipInfo: VoipInfo }); // 与 3.x 保持一致, 方便后续 3.x 兼容
                                });
                                if (VoipInfo) {
                                    var fullnavi_1 = storage.getItem('fullnavi') || '{}';
                                    fullnavi_1 = JSON.parse(fullnavi_1);
                                    fullnavi_1.voipCallInfo = VoipInfo;
                                    storage.setItem('fullnavi', JSON.stringify(fullnavi_1));
                                }
                            }
                            catch (e) {
                            }
                        },
                        onError: function () {
                            // do nothing
                        }
                    });
                },
                onError: function (e) {
                    if (e == RongIMLib.ConnectionState.TOKEN_INCORRECT || !e) {
                        setTimeout(function () {
                            callback.onTokenIncorrect();
                            RongIMLib.Logger.writeLog({ tag: EndReportTag, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: { ConnectionState: RongIMLib.ConnectionState.TOKEN_INCORRECT } });
                        });
                    }
                    else {
                        setTimeout(function () {
                            callback.onError(e);
                            RongIMLib.Logger.writeLog({ tag: EndReportTag, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: { code: e } });
                        });
                    }
                }
            });
        };
        /*
            config.auto: 默认 false, true 启用自动重连，启用则为必选参数
            config.rate: 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
            config.url: 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
        */
        ServerDataProvider.prototype.reconnect = function (callback, config) {
            var store = RongIMLib.RongIMClient._memoryStore;
            var token = store.token;
            if (!token) {
                throw new Error('reconnect: token is empty.');
            }
            if (RongIMLib.Bridge._client && RongIMLib.Bridge._client.channel && RongIMLib.Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTED && RongIMLib.Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTING) {
                config = config || {};
                var key = config.auto ? 'auto' : 'custom';
                var handler = {
                    auto: function () {
                        var repeatConnect = function (options) {
                            var step = options.step();
                            var done = 'done';
                            var url = options.url;
                            var ping = function () {
                                RongIMLib.RongUtil.request({
                                    url: url,
                                    success: function () {
                                        options.done();
                                    },
                                    error: function () {
                                        repeat();
                                    }
                                });
                            };
                            var repeat = function () {
                                var next = step();
                                if (next == 'done') {
                                    var error = RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE;
                                    options.done(error);
                                    return;
                                }
                                var timer = setTimeout(ping, next);
                                RongIMLib.RongIMClient._memoryStore.autoReconnectTimer = timer;
                            };
                            repeat();
                        };
                        var protocol = RongIMLib.RongIMClient._memoryStore.depend.protocol;
                        var url = config.url || 'cdn.ronghub.com/RongIMLib-2.2.6.min.js';
                        var pathConfig = {
                            protocol: protocol,
                            path: url
                        };
                        url = RongIMLib.RongUtil.formatProtoclPath(pathConfig);
                        var rate = config.rate || [100, 1000, 3000, 6000, 10000, 18000];
                        //结束标识
                        rate.push('done');
                        var opts = {
                            url: url,
                            step: function () {
                                var index = 0;
                                return function () {
                                    var time = rate[index];
                                    index++;
                                    return time;
                                };
                            },
                            done: function (error) {
                                if (error) {
                                    callback.onError(error);
                                    return;
                                }
                                RongIMLib.RongIMClient.connect(token, callback, null, {
                                    isIgnoreReportStart: true,
                                    isReconnect: true
                                });
                            }
                        };
                        repeatConnect(opts);
                    },
                    custom: function () {
                        RongIMLib.RongIMClient.connect(token, callback, null, {
                            isIgnoreReportStart: true,
                            isReconnect: true
                        });
                    }
                };
                handler[key]();
            }
            else {
                var _client = RongIMLib.Bridge._client || {};
                var _channel = _client.channel || {};
                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_RECO_E, level: RongIMLib.LoggerLevel.E, type: RongIMLib.LoggerType.IM, content: {
                        msg: {
                            connectionStatus: _channel.connectionStatus
                        },
                        action: 'reconnect'
                    } });
            }
        };
        ServerDataProvider.prototype.logout = function () {
            RongIMLib.RongIMClient.bridge.disconnect();
            RongIMLib.RongIMClient.bridge = null;
        };
        ServerDataProvider.prototype.disconnect = function () {
            var timer = RongIMLib.RongIMClient._memoryStore.autoReconnectTimer;
            timer && clearTimeout(timer);
            RongIMLib.RongIMClient.bridge.disconnect();
        };
        ServerDataProvider.prototype.sendReceiptResponse = function (conversationType, targetId, sendCallback) {
            var rspkey = RongIMLib.Bridge._client.userId + conversationType + targetId + 'RECEIVED', me = this;
            if (RongIMLib.RongUtil.supportLocalStorage()) {
                var valObj = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(rspkey));
                if (valObj) {
                    var vals = [];
                    for (var key in valObj) {
                        var tmp = {};
                        tmp[key] = valObj[key].uIds;
                        valObj[key].isResponse || vals.push(tmp);
                    }
                    if (vals.length == 0) {
                        sendCallback.onSuccess();
                        return;
                    }
                    var interval = setInterval(function () {
                        if (vals.length == 1) {
                            clearInterval(interval);
                        }
                        var obj = vals.splice(0, 1)[0];
                        var rspMsg = new RongIMLib.ReadReceiptResponseMessage({ receiptMessageDic: obj });
                        me.sendMessage(conversationType, targetId, rspMsg, {
                            onSuccess: function (msg) {
                                var senderUserId = RongIMLib.MessageUtil.getFirstKey(obj);
                                valObj[senderUserId].isResponse = true;
                                RongIMLib.RongIMClient._storageProvider.setItem(rspkey, JSON.stringify(valObj));
                                sendCallback.onSuccess(msg);
                            },
                            onError: function (error, msg) {
                                sendCallback.onError(error, msg);
                            }
                        });
                    }, 200);
                }
                else {
                    sendCallback.onSuccess();
                }
            }
            else {
                sendCallback.onSuccess();
            }
        };
        ServerDataProvider.prototype.sendTypingStatusMessage = function (conversationType, targetId, messageName, sendCallback) {
            var me = this;
            if (messageName in RongIMLib.RongIMClient.MessageParams) {
                me.sendMessage(conversationType, targetId, RongIMLib.TypingStatusMessage.obtain(RongIMLib.RongIMClient.MessageParams[messageName].objectName, ""), {
                    onSuccess: function () {
                        setTimeout(function () {
                            sendCallback.onSuccess();
                        });
                    },
                    onError: function (errorCode) {
                        setTimeout(function () {
                            sendCallback.onError(errorCode, null);
                        });
                    },
                    onBefore: function () { }
                });
            }
        };
        ServerDataProvider.prototype.sendRecallMessage = function (content, sendMessageCallback, params) {
            params = params || {};
            var msg = new RongIMLib.RecallCommandMessage({ conversationType: content.conversationType, targetId: content.targetId, sentTime: content.sentTime, messageUId: content.messageUId, extra: content.extra, user: content.user });
            this.sendMessage(content.conversationType, content.senderUserId, msg, sendMessageCallback, false, null, null, 2, params);
        };
        ServerDataProvider.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
            var msgContent = RongIMLib.TextMessage.obtain(content);
            this.sendMessage(conversationType, targetId, msgContent, sendMessageCallback);
        };
        ServerDataProvider.prototype.getRemoteHistoryMessages = function (conversationType, targetId, timestamp, count, callback, config) {
            if (count <= 1) {
                throw new Error("the count must be greater than 1.");
            }
            config = config || {};
            var order = config.order || 0;
            var getKey = function () {
                return [conversationType, targetId, '_', order].join('');
            };
            var key = getKey();
            if (!RongIMLib.RongUtil.isNumber(timestamp)) {
                timestamp = RongIMLib.RongIMClient._memoryStore.lastReadTime.get(key);
            }
            var memoryStore = RongIMLib.RongIMClient._memoryStore;
            var historyMessageLimit = memoryStore.historyMessageLimit;
            /*
                limit 属性:
                var limit = {
                    time: '时间戳, 最后一次拉取时间',
                    hasMore: '是否还有历史消息, bool 值'
                };
            */
            var limit = historyMessageLimit.get(key) || {};
            var hasMore = limit.hasMore;
            var isFecth = (hasMore || limit.time != timestamp);
            // 正序获取消息时不做限制，防止有新消息导致无法获取
            if (!isFecth && order == 0) {
                return callback.onSuccess([], hasMore);
            }
            var modules = new RongIMLib.RongIMClient.Protobuf.HistoryMsgInput(), self = this;
            modules.setTargetId(targetId);
            modules.setTime(timestamp);
            modules.setCount(count);
            modules.setOrder(order);
            var topic = HistoryMsgType[conversationType] || HistoryMsgType[RongIMLib.ConversationType.PRIVATE];
            RongIMLib.RongIMClient.bridge.queryMsg(topic, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), targetId, {
                onSuccess: function (data) {
                    var fetchTime = RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime);
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set(key, fetchTime);
                    historyMessageLimit.set(key, {
                        hasMore: !!data.hasMsg,
                        time: fetchTime
                    });
                    var list = data.list.reverse(), tempMsg = null, tempDir;
                    var read = RongIMLib.SentStatus.READ;
                    if (RongIMLib.RongUtil.supportLocalStorage()) {
                        for (var i = 0, len = list.length; i < len; i++) {
                            tempMsg = RongIMLib.MessageUtil.messageParser(list[i]);
                            tempDir = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.Bridge._client.userId + tempMsg.messageUId + "SENT"));
                            if (tempDir) {
                                tempMsg.receiptResponse || (tempMsg.receiptResponse = {});
                                tempMsg.receiptResponse[tempMsg.messageUId] = tempDir.count;
                            }
                            tempMsg.sentStatus = read;
                            tempMsg.targetId = targetId;
                            list[i] = tempMsg;
                        }
                    }
                    else {
                        for (var i = 0, len = list.length; i < len; i++) {
                            var tempMsg = RongIMLib.MessageUtil.messageParser(list[i]);
                            tempMsg.sentStatus = read;
                            list[i] = tempMsg;
                        }
                    }
                    setTimeout(function () {
                        callback.onSuccess(list, !!data.hasMsg);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            }, "HistoryMessagesOuput");
        };
        ServerDataProvider.prototype.hasRemoteUnreadMessages = function (token, callback) {
            var xss = null;
            window.RCCallback = function (x) {
                setTimeout(function () { callback.onSuccess(!!+x.status); });
                xss.parentNode.removeChild(xss);
            };
            xss = document.createElement("script");
            xss.src = RongIMLib.RongIMClient._memoryStore.depend.api + "/message/exist.js?appKey=" + encodeURIComponent(RongIMLib.RongIMClient._memoryStore.appKey) + "&token=" + encodeURIComponent(token) + "&callBack=RCCallback&_=" + RongIMLib.RongUtil.getTimestamp();
            document.body.appendChild(xss);
            xss.onerror = function () {
                setTimeout(function () { callback.onError(RongIMLib.ErrorCode.UNKNOWN); });
                xss.parentNode.removeChild(xss);
            };
        };
        ServerDataProvider.prototype.getRemoteConversationList = function (callback, conversationTypes, count) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RelationsInput(), self = this;
            modules.setType(1);
            if (typeof count == 'undefined') {
                modules.setCount(0);
            }
            else {
                modules.setCount(count);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(26, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (list) {
                    if (list.info) {
                        list.info = list.info.reverse();
                        for (var i = 0, len = list.info.length; i < len; i++) {
                            RongIMLib.RongIMClient.getInstance().pottingConversation(list.info[i]);
                        }
                    }
                    var conversations = RongIMLib.RongIMClient._memoryStore.conversationList;
                    setTimeout(function () {
                        if (conversationTypes) {
                            return callback.onSuccess(self.filterConversations(conversationTypes, conversations));
                        }
                        callback.onSuccess(conversations);
                    });
                },
                onError: function (error) {
                    callback.onError(error);
                }
            }, "RelationsOutput");
        };
        ServerDataProvider.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.ChannelInvitationInput();
            modules.setUsers(userIdList);
            RongIMLib.RongIMClient.bridge.queryMsg(0, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.createDiscussion = function (name, userIdList, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.CreateDiscussionInput(), self = this;
            modules.setName(name);
            RongIMLib.RongIMClient.bridge.queryMsg(1, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (discussId) {
                    if (userIdList.length > 0) {
                        self.addMemberToDiscussion(discussId, userIdList, {
                            onSuccess: function () { },
                            onError: function (error) {
                                setTimeout(function () {
                                    callback.onError(error);
                                });
                            }
                        });
                    }
                    setTimeout(function () {
                        callback.onSuccess(discussId);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            }, "CreateDiscussionOutput");
        };
        ServerDataProvider.prototype.getDiscussion = function (discussionId, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.ChannelInfoInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(4, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            }, "ChannelInfoOutput");
        };
        ServerDataProvider.prototype.quitDiscussion = function (discussionId, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.LeaveChannelInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(7, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        ServerDataProvider.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.ChannelEvictionInput();
            modules.setUser(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(9, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        ServerDataProvider.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.ModifyPermissionInput();
            modules.setOpenStatus(status.valueOf());
            RongIMLib.RongIMClient.bridge.queryMsg(11, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function (x) {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                }, onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.setDiscussionName = function (discussionId, name, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RenameChannelInput();
            modules.setName(name);
            RongIMLib.RongIMClient.bridge.queryMsg(12, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            });
        };
        ServerDataProvider.prototype.joinChatRoom = function (chatroomId, messageCount, callback) {
            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_JCTR_T, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                    chatroomId: chatroomId
                } });
            var e = new RongIMLib.RongIMClient.Protobuf.ChrmInput();
            e.setNothing(1);
            RongIMLib.Bridge._client.chatroomId = chatroomId;
            RongIMLib.RongIMClient.bridge.queryMsg(19, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                onSuccess: function () {
                    var navi = RongIMLib.RongIMClient.getInstance().getNavi();
                    var isOpenKVStorage = navi.kvStorage;
                    if (isOpenKVStorage) {
                        RongIMLib.RongIMClient._dataAccessProvider.pullChatroomEntry(chatroomId, 0, {
                            onSuccess: function (result) {
                                RongIMLib.ChrmKVHandler.setEntries(chatroomId, result);
                                setTimeout(function () {
                                    callback.onSuccess();
                                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_JCTR_R, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                                            chatroomId: chatroomId
                                        } });
                                });
                            },
                            onError: function (errorCode) {
                                setTimeout(function () {
                                    callback.onError(errorCode);
                                    RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_JCTR_R, level: RongIMLib.LoggerLevel.W, type: RongIMLib.LoggerType.IM, content: {
                                            chatroomId: chatroomId,
                                            error: errorCode
                                        } });
                                });
                            }
                        });
                    }
                    else {
                        setTimeout(function () {
                            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_JCTR_R, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                                    chatroomId: chatroomId
                                } });
                            callback.onSuccess();
                        });
                    }
                    var modules = new RongIMLib.RongIMClient.Protobuf.ChrmPullMsg();
                    messageCount == 0 && (messageCount = -1);
                    modules.setCount(messageCount);
                    modules.setSyncTime(0);
                    RongIMLib.Bridge._client.queryMessage("chrmPull", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatroomId, 1, {
                        onSuccess: function (collection) {
                            var list = collection.list;
                            var sync = RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime);
                            var latestMessage = list[list.length - 1];
                            if (latestMessage) {
                                latestMessage = RongIMLib.MessageUtil.messageParser(latestMessage);
                                sync = latestMessage.sentTime;
                            }
                            RongIMLib.RongIMClient._memoryStore.lastReadTime.set(chatroomId + RongIMLib.Bridge._client.userId + "CST", sync);
                            var _client = RongIMLib.Bridge._client;
                            for (var i = 0, mlen = list.length; i < mlen; i++) {
                                var uId = 'R' + list[i].msgId;
                                if (!(uId in _client.cacheMessageIds)) {
                                    _client.cacheMessageIds[uId] = true;
                                    var cacheUIds = RongIMLib.RongUtil.keys(_client.cacheMessageIds);
                                    if (cacheUIds.length > 10) {
                                        uId = cacheUIds[0];
                                        delete _client.cacheMessageIds[uId];
                                    }
                                    if (RongIMLib.RongIMClient._memoryStore.filterMessages.length > 0) {
                                        for (var j = 0, flen = RongIMLib.RongIMClient._memoryStore.filterMessages.length; j < flen; j++) {
                                            if (RongIMLib.RongIMClient.MessageParams[RongIMLib.RongIMClient._memoryStore.filterMessages[j]].objectName != list[i].classname) {
                                                _client.handler.onReceived(list[i]);
                                            }
                                        }
                                    }
                                    else {
                                        _client.handler.onReceived(list[i]);
                                    }
                                }
                            }
                        },
                        onError: function (errcode) {
                            setTimeout(function () {
                                callback.onError(errcode);
                            });
                        }
                    }, "DownStreamMessages");
                },
                onError: function (error) {
                    setTimeout(function () {
                        RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_JCTR_R, level: RongIMLib.LoggerLevel.W, type: RongIMLib.LoggerType.IM, content: {
                                chatroomId: chatroomId,
                                error: error
                            } });
                        callback.onError(error);
                    });
                }
            }, "ChrmOutput");
        };
        ServerDataProvider.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.QueryChatroomInfoInput();
            modules.setCount(count);
            modules.setOrder(order);
            RongIMLib.RongIMClient.bridge.queryMsg("queryChrmI", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatRoomId, {
                onSuccess: function (ret) {
                    var userInfos = ret.userInfos;
                    userInfos.forEach(function (item) {
                        item.time = RongIMLib.MessageUtil.int64ToTimestamp(item.time);
                    });
                    setTimeout(function () {
                        callback.onSuccess(ret);
                    });
                },
                onError: function (errcode) {
                    setTimeout(function () {
                        callback.onError(errcode);
                    });
                }
            }, "QueryChatroomInfoOutput");
        };
        ServerDataProvider.prototype.quitChatRoom = function (chatroomId, callback) {
            RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_QCTR_T, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                    chatroomId: chatroomId
                } });
            var e = new RongIMLib.RongIMClient.Protobuf.ChrmInput();
            e.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(17, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                onSuccess: function () {
                    RongIMLib.Bridge._client && RongIMLib.Bridge._client.clearCacheMessageIds();
                    setTimeout(function () {
                        RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_QCTR_R, level: RongIMLib.LoggerLevel.I, type: RongIMLib.LoggerType.IM, content: {
                                chatroomId: chatroomId
                            } });
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    setTimeout(function () {
                        RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.A_QCTR_R, level: RongIMLib.LoggerLevel.W, type: RongIMLib.LoggerType.IM, content: {
                                chatroomId: chatroomId,
                                error: errcode
                            } });
                        callback.onError(errcode);
                    });
                }
            }, "ChrmOutput");
        };
        ServerDataProvider.prototype.setChatroomHisMessageTimestamp = function (chatRoomId, timestamp) {
            RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_' + chatRoomId, timestamp);
        };
        ServerDataProvider.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.HistoryMsgInput();
            modules.setTargetId(chatRoomId);
            var timestamp = RongIMLib.RongIMClient._memoryStore.lastReadTime.get('chrhis_' + chatRoomId) || 0;
            modules.setTime(timestamp);
            modules.setCount(count);
            modules.setOrder(order);
            RongIMLib.RongIMClient.bridge.queryMsg(34, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_' + chatRoomId, RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime));
                    var list = data.list.reverse();
                    for (var i = 0, len = list.length; i < len; i++) {
                        list[i] = RongIMLib.MessageUtil.messageParser(list[i]);
                    }
                    setTimeout(function () {
                        callback.onSuccess(list, !!data.hasMsg);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            }, "HistoryMsgOuput");
        };
        ServerDataProvider.prototype.setChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            var opt = RongIMLib.ChatroomEntityOpt.UPDATE;
            var key = chatroomEntry.key, value = chatroomEntry.value;
            var isKeyInValid = !RongIMLib.RongUtil.isLengthLimit(key, RongIMLib.ChatroomEntityLimit.KEY, 1) || !RongIMLib.ChrmKVHandler.isKeyValid(key);
            var isValueInValid = !RongIMLib.RongUtil.isLengthLimit(value, RongIMLib.ChatroomEntityLimit.VALUE, 1);
            if (isKeyInValid || isValueInValid) {
                setTimeout(function () {
                    callback.onError(RongIMLib.ErrorCode.BIZ_ERROR_INVALID_PARAMETER);
                });
            }
            else {
                this.refreshChatroomEntry(chatroomId, chatroomEntry, opt, callback);
            }
        };
        ServerDataProvider.prototype.forceSetChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            chatroomEntry.isOverwrite = true;
            this.setChatroomEntry(chatroomId, chatroomEntry, callback);
        };
        ServerDataProvider.prototype.removeChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            var opt = RongIMLib.ChatroomEntityOpt.DELETE;
            var key = chatroomEntry.key;
            var isKeyInValid = !RongIMLib.RongUtil.isLengthLimit(key, RongIMLib.ChatroomEntityLimit.KEY, 1) || !RongIMLib.ChrmKVHandler.isKeyValid(key);
            if (isKeyInValid) {
                setTimeout(function () {
                    callback.onError(RongIMLib.ErrorCode.BIZ_ERROR_INVALID_PARAMETER);
                });
            }
            else {
                this.refreshChatroomEntry(chatroomId, chatroomEntry, opt, callback);
            }
        };
        ServerDataProvider.prototype.forceRemoveChatroomEntry = function (chatroomId, chatroomEntry, callback) {
            chatroomEntry.isOverwrite = true;
            this.removeChatroomEntry(chatroomId, chatroomEntry, callback);
        };
        ServerDataProvider.prototype.refreshChatroomEntry = function (chatroomId, chatroomEntry, chatroomEntryOpt, callback) {
            var modules, topic;
            var key = chatroomEntry.key, value = chatroomEntry.value || '', extra = chatroomEntry.notificationExtra;
            if (chatroomEntryOpt === RongIMLib.ChatroomEntityOpt.DELETE) {
                modules = new RongIMLib.RongIMClient.Protobuf.DeleteChrmKV();
                topic = 'delKV';
            }
            else {
                modules = new RongIMLib.RongIMClient.Protobuf.SetChrmKV();
                topic = 'setKV';
            }
            var status = RongIMLib.RongInnerTools.getChrmEntityStatus(chatroomEntry, chatroomEntryOpt);
            var currentUserId = RongIMLib.RongIMClient.getInstance().getCurrentUserId();
            var entry = {
                key: key,
                value: value,
                uid: currentUserId
            };
            if (status) {
                entry.status = status;
            }
            modules.setEntry(entry);
            if (chatroomEntry.isSendNotification) {
                modules.setBNotify(true);
                var msgModules = new RongIMLib.RongIMClient.Protobuf.UpStreamMessage();
                var msg = new RongIMLib.ChrmKVNotificationMessage({
                    key: key,
                    value: value,
                    extra: extra,
                    type: chatroomEntryOpt
                });
                msgModules.setSessionId(RongIMLib.RongIMClient.MessageParams[msg.messageName].msgTag.getMessageTag());
                msgModules.setClassname(RongIMLib.RongIMClient.MessageParams[msg.messageName].objectName);
                msgModules.setContent(msg.encode());
                modules.setNotification(msgModules);
                // 默认设置为 聊天室消息
                modules.setType(RongIMLib.ConversationType.CHATROOM);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(topic, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatroomId, {
                onSuccess: function (ret) {
                    var currentUserId = RongIMLib.RongIMClient.getInstance().getCurrentUserId();
                    RongIMLib.ChrmKVHandler.setEntry(chatroomId, chatroomEntry, status, currentUserId);
                    setTimeout(function () {
                        callback.onSuccess(!!ret);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            }, 'ChrmOutput');
        };
        ServerDataProvider.prototype.getChatroomEntry = function (chatroomId, key, callback) {
            var value = RongIMLib.ChrmKVHandler.getEntityValue(chatroomId, key);
            setTimeout(function () {
                if (RongIMLib.RongUtil.isEmpty(value)) {
                    callback.onError(RongIMLib.ErrorCode.CHATROOM_KEY_NOT_EXIST);
                }
                else {
                    callback.onSuccess(value);
                }
            });
        };
        ServerDataProvider.prototype.getAllChatroomEntries = function (chatroomId, callback) {
            setTimeout(function () {
                var entries = RongIMLib.ChrmKVHandler.getAllEntityValue(chatroomId);
                callback.onSuccess(entries);
            });
        };
        ServerDataProvider.prototype.pullChatroomEntry = function (chatroomId, time, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.QueryChrmKV();
            modules.setTimestamp(time);
            RongIMLib.RongIMClient.bridge.queryMsg('pullKV', RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatroomId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            }, "ChrmKVOutput");
        };
        ServerDataProvider.prototype.setMessageStatus = function (conversationType, targetId, timestamp, status, callback) {
            setTimeout(function () {
                callback.onSuccess(true);
            });
        };
        ServerDataProvider.prototype.addToBlacklist = function (userId, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.Add2BlackListInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(21, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.getBlacklist = function (callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.QueryBlackListInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(23, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (list) {
                    setTimeout(function () {
                        callback.onSuccess(list);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            }, "QueryBlackListOutput");
        };
        ServerDataProvider.prototype.getBlacklistStatus = function (userId, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.BlackListStatusInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(24, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    setTimeout(function () {
                        callback.onSuccess(RongIMLib.BlacklistStatus[status]);
                    });
                }, onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.removeFromBlacklist = function (userId, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RemoveFromBlackListInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(22, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.getFileToken = function (fileType, callback, fileName) {
            if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                setTimeout(function () {
                    callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                });
                return;
            }
            var fileName = RongIMLib.RongUtil.generateUploadFileName(fileType, fileName);
            // 获取上传地址
            var domains = RongIMLib.RongIMClient._storageProvider.getItem('upload_domains') || '{}';
            var modules = new RongIMLib.RongIMClient.Protobuf.GetQNupTokenInput();
            modules.setType(fileType);
            modules.setKey(fileName);
            RongIMLib.RongIMClient.bridge.queryMsg(30, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (res) {
                    setTimeout(function () {
                        var data = RongIMLib.RongUtil.extend(JSON.parse(domains), res);
                        callback.onSuccess(data);
                    });
                },
                onError: function (errcode) {
                    setTimeout(function () {
                        callback.onError(errcode);
                    });
                }
            }, "GetQNupTokenOutput");
        };
        ServerDataProvider.prototype.getFileUrl = function (fileType, fileName, oriName, callback, data) {
            var data = data || {};
            if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                setTimeout(function () {
                    callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                });
                return;
            }
            if (data.isBosRes) {
                callback.onSuccess(data);
                return;
            }
            var modules = new RongIMLib.RongIMClient.Protobuf.GetQNdownloadUrlInput();
            modules.setType(fileType);
            modules.setKey(fileName);
            if (oriName) {
                modules.setFileName(oriName);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(31, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errcode) {
                    setTimeout(function () {
                        callback.onError(errcode);
                    });
                }
            }, "GetQNdownloadUrlOutput");
        };
        ServerDataProvider.prototype.getVoipInfo = function (callback) {
            if (RongIMLib.RongIMClient._memoryStore.depend.isPolling)
                return; //长轮训关闭实时配置，IE 现不支持音视频
            // 获取最新值
            return this.getPullSetting({
                onSuccess: function (result) {
                    result = result || {};
                    var items = result.items || [];
                    var voipInfo = null;
                    for (var i = 0, max = items.length; i < max; i++) {
                        var item = items[i];
                        if (item.key === 'VoipInfo') {
                            var value = item.value;
                            if (RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                                value = new RongIMLib.BinaryHelper().readUTF(value.offset ? RongIMLib.MessageUtil.ArrayForm(value.buffer).slice(value.offset, value.limit) : value);
                            }
                            else {
                                value = new RongIMLib.BinaryHelper().readUTF(value.offset ? RongIMLib.MessageUtil.ArrayFormInput(value.buffer).subarray(value.offset, value.limit) : value);
                            }
                            voipInfo = value;
                        }
                    }
                    callback.onSuccess(voipInfo);
                },
                onError: callback.onError
            }, 0);
        };
        ServerDataProvider.prototype.getPullSetting = function (callback, version) {
            var modules = new RongIMLib.RongIMClient.Protobuf.PullUserSettingInput();
            version = version || parseInt(RongIMLib.RongIMClient.sdkver);
            modules.setVersion(version);
            RongIMLib.RongIMClient.bridge.queryMsg('pullUS', RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (result) {
                    result = result || {};
                    result.version = RongIMLib.MessageUtil.int64ToTimestamp(result.version);
                    setTimeout(function () {
                        callback.onSuccess(result);
                    });
                },
                onError: function (errcode) {
                    setTimeout(function () {
                        callback.onError(errcode);
                    });
                }
            }, 'PullUserSettingOutput');
        };
        ServerDataProvider.prototype.setOfflineMessageDuration = function (duration, callback) {
            this.getPullSetting({
                onSuccess: function (result) {
                    /**
                     * GetQNupTokenOutput 第一位为 int64, 第二位为 string, 与设置离线消息一致
                     * 为避免修改 Protobuf 带来的更新成本. 仅复用, 不重新命名
                    */
                    var modules = new RongIMLib.RongIMClient.Protobuf.GetQNupTokenOutput();
                    var version = result.version;
                    modules.setDeadline(version);
                    modules.setToken(duration + '');
                    RongIMLib.RongIMClient.bridge.queryMsg('setOfflineMsgDur', RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                        onSuccess: function (data) {
                            setTimeout(function () {
                                callback.onSuccess(data);
                            });
                        },
                        onError: function (errcode) {
                            setTimeout(function () {
                                callback.onError(errcode);
                            });
                        }
                    });
                },
                onError: callback.onError
            });
        };
        /*
            methodType 1 : 多客服(客服后台使用);   2 : 消息撤回
            params.userIds : 定向消息接收者
        */
        ServerDataProvider.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType, params) {
            if (!RongIMLib.Bridge._client.channel) {
                setTimeout(function () {
                    sendCallback.onError(RongIMLib.ErrorCode.RC_NET_UNAVAILABLE, null);
                });
                return;
            }
            if (!RongIMLib.Bridge._client.channel.socket.socket.connected) {
                setTimeout(function () {
                    sendCallback.onError(RongIMLib.ErrorCode.TIMEOUT, null);
                });
                throw new Error("connect is timeout! postion:sendMessage");
            }
            params = params || {};
            var isGroup = (conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP);
            var modules = new RongIMLib.RongIMClient.Protobuf.UpStreamMessage();
            var sessionId;
            if (mentiondMsg && isGroup) {
                sessionId = 7;
                params.disableNotification && (sessionId = sessionId | 0x20);
                modules.setSessionId(sessionId);
            }
            else {
                sessionId = RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag();
                params.disableNotification && (sessionId = sessionId | 0x20);
                modules.setSessionId(sessionId);
            }
            pushText && modules.setPushText(pushText);
            appData && modules.setAppData(appData);
            if (isGroup && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]) {
                var rspMsg = messageContent;
                if (rspMsg.receiptMessageDic) {
                    var ids = [];
                    for (var key in rspMsg.receiptMessageDic) {
                        ids.push(key);
                    }
                    modules.setUserId(ids);
                }
            }
            if (isGroup && messageContent.messageName == RongIMLib.RongIMClient.MessageType["SyncReadStatusMessage"]) {
                modules.setUserId(RongIMLib.Bridge._client.userId);
            }
            var userIds = params.userIds;
            if (userIds) {
                modules.setUserId(userIds);
            }
            var flag = 0;
            if (params.isPush || params.isVoipPush) {
                flag |= 0x01;
            }
            if (params.isFilerWhiteBlacklist) {
                flag |= 0x02;
            }
            modules.setConfigFlag(flag);
            modules.setClassname(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName);
            var encodedContent = messageContent.encode();
            if (RongIMLib.RongUtil.getByteLength(encodedContent) > RongIMLib.RongIMClient.MaxMessageContentBytes) {
                setTimeout(function () {
                    sendCallback.onError(RongIMLib.ErrorCode.RC_MSG_CONTENT_EXCEED_LIMIT);
                });
                return;
            }
            modules.setContent(encodedContent);
            var content = modules.toArrayBuffer();
            if (Object.prototype.toString.call(content) == "[object ArrayBuffer]") {
                content = [].slice.call(new Int8Array(content));
            }
            var me = this, msg = new RongIMLib.Message();
            var c = this.getConversation(conversationType, targetId);
            if (RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag() == 3) {
                if (!c) {
                    c = RongIMLib.RongIMClient.getInstance().createConversation(conversationType, targetId, "");
                }
                c.sentTime = new Date().getTime();
                c.sentStatus = RongIMLib.SentStatus.SENDING;
                c.senderUserName = "";
                c.senderUserId = RongIMLib.Bridge._client.userId;
                c.notificationStatus = RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;
                c.latestMessage = msg;
                c.unreadMessageCount = 0;
                RongIMLib.RongIMClient._dataAccessProvider.addConversation(c, { onSuccess: function (data) { } });
            }
            RongIMLib.RongIMClient._memoryStore.converStore = c;
            msg.content = messageContent;
            msg.conversationType = conversationType;
            msg.senderUserId = RongIMLib.Bridge._client.userId;
            msg.objectName = RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName;
            msg.targetId = targetId;
            msg.sentTime = new Date().getTime();
            msg.messageDirection = RongIMLib.MessageDirection.SEND;
            msg.sentStatus = RongIMLib.SentStatus.SENT;
            msg.messageType = messageContent.messageName;
            msg.disableNotification = params.disableNotification || false;
            RongIMLib.RongIMClient.bridge.pubMsg(conversationType.valueOf(), content, targetId, {
                onSuccess: function (data) {
                    if (data && data.timestamp) {
                        RongIMLib.RongIMClient._memoryStore.lastReadTime.set('converST_' + RongIMLib.Bridge._client.userId + conversationType + targetId, data.timestamp);
                    }
                    if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"]) {
                        var reqMsg = msg.content;
                        var sentkey = RongIMLib.Bridge._client.userId + reqMsg.messageUId + "SENT";
                        RongIMLib.RongIMClient._storageProvider.setItem(sentkey, JSON.stringify({ count: 0, dealtime: data.timestamp, userIds: {} }));
                    }
                    if (RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag() == 3) {
                        var cacheConversation = RongIMLib.RongIMClient._memoryStore.converStore;
                        cacheConversation.sentStatus = msg.sentStatus;
                        cacheConversation.latestMessage = msg;
                        me.updateConversation(cacheConversation);
                        var Conversation = RongIMLib.RongIMClient._dataAccessProvider.Conversation;
                        Conversation._notify(RongIMLib.RongIMClient._memoryStore.conversationList);
                        RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, msg, {
                            onSuccess: function (ret) {
                                msg = ret;
                                msg.messageUId = data.messageUId;
                                msg.sentTime = data.timestamp;
                                msg.sentStatus = RongIMLib.SentStatus.SENT;
                                msg.messageId = data.messageId;
                                RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);
                            },
                            onError: function () { }
                        });
                    }
                    setTimeout(function () {
                        cacheConversation && me.updateConversation(cacheConversation);
                        msg.sentTime = data.timestamp;
                        msg.messageUId = data.messageUId;
                        sendCallback.onSuccess(msg);
                    });
                },
                onError: function (errorCode, _msg) {
                    msg.sentStatus = RongIMLib.SentStatus.FAILED;
                    if (_msg) {
                        msg.messageUId = _msg.messageUId;
                        msg.sentTime = _msg.sentTime;
                    }
                    if (RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag() == 3) {
                        RongIMLib.RongIMClient._memoryStore.converStore.latestMessage = msg;
                    }
                    RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, msg, {
                        onSuccess: function (ret) {
                            msg.messageId = ret.messageId;
                            RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);
                        },
                        onError: function () { }
                    });
                    setTimeout(function () {
                        sendCallback.onError(errorCode, msg);
                    });
                }
            }, null, methodType, params);
            sendCallback.onBefore && sendCallback.onBefore(RongIMLib.MessageIdHandler.messageId);
            msg.messageId = RongIMLib.MessageIdHandler.messageId + "";
        };
        ServerDataProvider.prototype.setConnectionStatusListener = function (listener) {
            if (RongIMLib.RongUtil.isObject(listener) && RongIMLib.RongUtil.isFunction(listener.onChanged)) {
                RongIMLib.RongIMClient.statusListeners.push(listener.onChanged);
            }
        };
        ServerDataProvider.prototype.setOnReceiveMessageListener = function (listener) {
            if (RongIMLib.RongUtil.isObject(listener) && RongIMLib.RongUtil.isFunction(listener.onReceived)) {
                RongIMLib.RongIMClient.messageListeners.push(listener.onReceived);
            }
        };
        ServerDataProvider.prototype.registerMessageType = function (messageType, objectName, messageTag, messageContent, searchProps) {
            if (!messageType) {
                throw new Error("messageType can't be empty,postion -> registerMessageType");
            }
            if (!objectName) {
                throw new Error("objectName can't be empty,postion -> registerMessageType");
            }
            if (Object.prototype.toString.call(messageContent) == "[object Array]") {
                var regMsg = RongIMLib.ModelUtil.modleCreate(messageContent, messageType);
                RongIMLib.RongIMClient.RegisterMessage[messageType] = regMsg;
            }
            else if (Object.prototype.toString.call(messageContent) == "[object Function]" || Object.prototype.toString.call(messageContent) == "[object Object]") {
                if (!messageContent.encode) {
                    throw new Error("encode method has not realized or messageName is undefined-> registerMessageType");
                }
                if (!messageContent.decode) {
                    throw new Error("decode method has not realized -> registerMessageType");
                }
            }
            else {
                throw new Error("The index of 3 parameter was wrong type  must be object or function or array-> registerMessageType");
            }
            registerMessageTypeMapping[objectName] = messageType;
        };
        ServerDataProvider.prototype.registerMessageTypes = function (messages) {
            var types = [];
            var getProtos = function (proto) {
                var protos = [];
                for (var p in proto) {
                    protos.push(p);
                }
                return protos;
            };
            //转换消息为自定义消息参数格式
            for (var name in messages) {
                var message = messages[name];
                var proto = message.proto;
                var protos = getProtos(proto);
                var flag = message.flag || 3;
                var tag = RongIMLib.MessageTag.getTagByStatus(flag);
                flag = new RongIMLib.MessageTag(tag.isCounted, tag.isPersited);
                types.push({
                    type: name,
                    name: message.name,
                    flag: flag,
                    protos: protos
                });
            }
            var register = function (message) {
                var type = message.type;
                var name = message.name;
                var flag = message.flag;
                var protos = message.protos;
                RongIMLib.RongIMClient.registerMessageType(type, name, flag, protos);
            };
            for (var i = 0, len = types.length; i < len; i++) {
                var message = types[i];
                register(message);
            }
        };
        /**
         * 向缓存会话列表内添加新会话或更新会话
        */
        ServerDataProvider.prototype.addConversation = function (conversation, callback) {
            var isAdd = true;
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.conversationList.length; i < len; i++) {
                if (RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationType === conversation.conversationType && RongIMLib.RongIMClient._memoryStore.conversationList[i].targetId === conversation.targetId) {
                    // RongIMClient._memoryStore.conversationList[i] = conversation;
                    RongIMLib.RongIMClient._memoryStore.conversationList.unshift(RongIMLib.RongIMClient._memoryStore.conversationList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                RongIMLib.RongIMClient._memoryStore.conversationList.unshift(conversation);
            }
            callback && callback.onSuccess(true);
        };
        /**
         * 更新缓存会话字段
        */
        ServerDataProvider.prototype.updateConversation = function (conversation) {
            var conver;
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.conversationList.length; i < len; i++) {
                var item = RongIMLib.RongIMClient._memoryStore.conversationList[i];
                if (conversation.conversationType === item.conversationType && conversation.targetId === item.targetId) {
                    conversation.conversationTitle && (item.conversationTitle = conversation.conversationTitle);
                    conversation.senderUserName && (item.senderUserName = conversation.senderUserName);
                    conversation.senderPortraitUri && (item.senderPortraitUri = conversation.senderPortraitUri);
                    conversation.latestMessage && (item.latestMessage = conversation.latestMessage);
                    conversation.sentStatus && (item.sentStatus = conversation.sentStatus);
                    break;
                }
            }
            return conver;
        };
        /**
         * 移除 IM Server 端会话,并清除缓存内会话
        */
        ServerDataProvider.prototype.removeConversation = function (conversationType, targetId, callback) {
            var mod = new RongIMLib.RongIMClient.Protobuf.RelationsInput();
            mod.setType(conversationType);
            RongIMLib.RongIMClient.bridge.queryMsg(27, RongIMLib.MessageUtil.ArrayForm(mod.toArrayBuffer()), targetId, {
                onSuccess: function () {
                    var isRemoved = false;
                    var conversations = RongIMLib.RongIMClient._memoryStore.conversationList;
                    var len = conversations.length;
                    for (var i = 0; i < len; i++) {
                        if (conversations[i].conversationType == conversationType && targetId == conversations[i].targetId) {
                            conversations.splice(i, 1);
                            isRemoved = true;
                            break;
                        }
                    }
                    isRemoved && RongIMLib.RongIMClient._dataAccessProvider.Conversation._notify(RongIMLib.RongIMClient._memoryStore.conversationList);
                    callback.onSuccess(true);
                }, onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.getMessage = function (messageId, callback) {
            callback.onSuccess(new RongIMLib.Message());
        };
        ServerDataProvider.prototype.addMessage = function (conversationType, targetId, message, callback) {
            if (callback) {
                callback.onSuccess(message);
            }
        };
        ServerDataProvider.prototype.removeMessage = function (conversationType, targetId, messages, callback) {
            RongIMLib.RongIMClient.getInstance().deleteRemoteMessages(conversationType, targetId, messages, callback);
        };
        ServerDataProvider.prototype.removeLocalMessage = function (conversationType, targetId, timestamps, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.updateMessage = function (message, callback) {
            if (callback) {
                callback.onSuccess(message);
            }
        };
        ServerDataProvider.prototype.deleteRemoteMessages = function (conversationType, targetId, messages, callback) {
            if (!RongIMLib.RongIMClient.Protobuf.DeleteMsgInput) {
                throw new Error('SDK Protobuf version is too low');
            }
            var modules = new RongIMLib.RongIMClient.Protobuf.DeleteMsgInput();
            var msgs = [];
            RongIMLib.RongUtil.forEach(messages, function (msg) {
                msgs.push({
                    msgId: msg.messageUId,
                    msgDataTime: msg.sentTime,
                    direct: msg.messageDirection
                });
            });
            modules.setType(conversationType);
            modules.setConversationId(targetId);
            modules.setMsgs(msgs);
            RongIMLib.RongIMClient.bridge.queryMsg('delMsg', RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), targetId, {
                onSuccess: function (result) {
                    callback.onSuccess(result);
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            }, 'DeleteMsgOutput');
        };
        ServerDataProvider.prototype.clearRemoteHistoryMessages = function (params, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.CleanHisMsgInput();
            var conversationType = params.conversationType;
            var _topic = {
                1: 'cleanPMsg',
                2: 'cleanDMsg',
                3: 'cleanGMsg',
                5: 'cleanCMsg',
                6: 'cleanSMsg'
            };
            var topic = _topic[conversationType];
            if (!topic) {
                callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TYPE_ERROR);
                return;
            }
            var timestamp = params.timestamp;
            if (typeof timestamp != 'number') {
                callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TIME_ERROR);
                return;
            }
            modules.setDataTime(timestamp);
            var targetId = params.targetId;
            modules.setTargetId(targetId);
            RongIMLib.RongIMClient.bridge.queryMsg(topic, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), targetId, {
                onSuccess: function (result) {
                    callback.onSuccess(!result);
                }, onError: function (error) {
                    // error 1 历史消息云存储没有开通、传入时间大于服务器时间 清除失败，1 与其他错误码冲突，所以自定义错误码返回
                    if (error == 1) {
                        error = RongIMLib.ErrorCode.CLEAR_HIS_ERROR;
                    }
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.clearHistoryMessages = function (params, callback) {
            this.clearRemoteHistoryMessages(params, callback);
        };
        // 兼容老版本
        ServerDataProvider.prototype.clearMessages = function (conversationType, targetId, callback) {
        };
        ServerDataProvider.prototype.updateMessages = function (conversationType, targetId, key, value, callback) {
            var me = this;
            if (key == "readStatus") {
                if (RongIMLib.RongIMClient._memoryStore.conversationList.length > 0) {
                    me.getConversationList({
                        onSuccess: function (list) {
                            Array.forEach(list, function (conver) {
                                if (conver.conversationType == conversationType && conver.targetId == targetId) {
                                    conver.unreadMessageCount = 0;
                                }
                            });
                        },
                        onError: function (errorCode) {
                            setTimeout(function () {
                                callback.onError(errorCode);
                            });
                        }
                    }, null);
                }
            }
            setTimeout(function () {
                callback.onSuccess(true);
            });
        };
        ServerDataProvider.prototype.getConversation = function (conversationType, targetId, callback) {
            var conver = null;
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.conversationList.length; i < len; i++) {
                if (RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationType == conversationType && RongIMLib.RongIMClient._memoryStore.conversationList[i].targetId == targetId) {
                    conver = RongIMLib.RongIMClient._memoryStore.conversationList[i];
                    if (RongIMLib.RongUtil.supportLocalStorage()) {
                        // var count = RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + conversationType + targetId);
                        var count = RongIMLib.UnreadCountHandler.get(conversationType, targetId);
                        if (conver.unreadMessageCount == 0) {
                            conver.unreadMessageCount = Number(count);
                        }
                    }
                }
            }
            setTimeout(function () {
                callback && callback.onSuccess(conver);
            });
            return conver;
        };
        ServerDataProvider.prototype.filterConversations = function (types, list) {
            var conversaions = [];
            RongIMLib.RongUtil.forEach(types, function (type) {
                RongIMLib.RongUtil.forEach(list, function (conversation) {
                    if (conversation.conversationType == type) {
                        conversaions.push(conversation);
                    }
                });
            });
            return conversaions;
        };
        ServerDataProvider.prototype.getConversationList = function (callback, conversationTypes, count, isHidden) {
            var that = this;
            var isSync = RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList;
            var list = RongIMLib.RongIMClient._memoryStore.conversationList;
            if (!RongIMLib.RongUtil.isNumber(count)) {
                count = 200;
            }
            var isLocalInclude = list.length >= count;
            if (!isSync && (isLocalInclude || RongIMLib.RongIMClient._memoryStore.isFullConversations)) {
                setTimeout(function () {
                    var _list = JSON.parse(JSON.stringify(list));
                    var localList = _list.slice(0, count);
                    if (conversationTypes) {
                        localList = that.filterConversations(conversationTypes, localList);
                    }
                    callback.onSuccess(localList);
                });
                return;
            }
            RongIMLib.RongIMClient.getInstance().getRemoteConversationList({
                onSuccess: function (list) {
                    if (RongIMLib.RongUtil.supportLocalStorage()) {
                        Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (item) {
                            // var count = RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + item.conversationType + item.targetId);
                            var count = RongIMLib.UnreadCountHandler.get(item.conversationType, item.targetId);
                            if (item.unreadMessageCount == 0) {
                                item.unreadMessageCount = Number(count);
                            }
                        });
                    }
                    RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList = false;
                    var isFullConversations = count > list.length;
                    RongIMLib.RongIMClient._memoryStore.isFullConversations = isFullConversations;
                    setTimeout(function () {
                        callback.onSuccess(list);
                    });
                },
                onError: function (errorcode) {
                    setTimeout(function () {
                        callback.onError(errorcode);
                    });
                }
            }, conversationTypes, count, isHidden);
        };
        ServerDataProvider.prototype.clearCache = function () {
            var memoryStore = RongIMLib.RongIMClient._memoryStore || {};
            memoryStore.conversationList = [];
            memoryStore.isSyncRemoteConverList = true;
        };
        ServerDataProvider.prototype.clearConversations = function (conversationTypes, callback) {
            Array.forEach(conversationTypes, function (conversationType) {
                Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (conver) {
                    if (conversationType == conver.conversationType) {
                        RongIMLib.RongIMClient.getInstance().removeConversation(conver.conversationType, conver.targetId, { onSuccess: function () { }, onError: function () { } });
                    }
                });
            });
            setTimeout(function () {
                callback.onSuccess(true);
            });
        };
        ServerDataProvider.prototype.setMessageContent = function (messageId, content, objectname) {
        };
        ;
        ServerDataProvider.prototype.setMessageSearchField = function (messageId, content, searchFiles) {
        };
        ;
        ServerDataProvider.prototype.getHistoryMessages = function (conversationType, targetId, timestamp, count, callback, objectname, order) {
            var config = {
                objectname: objectname,
                order: order
            };
            RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(conversationType, targetId, timestamp, count, callback, config);
        };
        ServerDataProvider.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
            var count = RongIMLib.UnreadCountHandler.getAll(conversationTypes);
            callback.onSuccess(count);
            return count;
        };
        ServerDataProvider.prototype.getConversationUnreadCount = function (conversationTypes, callback) {
            var count = 0;
            Array.forEach(conversationTypes, function (converType) {
                Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (conver) {
                    if (conver.conversationType == converType) {
                        count += conver.unreadMessageCount;
                    }
                });
            });
            setTimeout(function () {
                callback.onSuccess(count);
            });
        };
        //由于 Web 端未读消息数按会话统计，撤回消息会导致未读数不准确，提供设置未读数接口，桌面版不实现此方法
        ServerDataProvider.prototype.setUnreadCount = function (conversationType, targetId, count, sentTime) {
            sentTime = sentTime || new Date().getTime();
            RongIMLib.UnreadCountHandler.set(conversationType, targetId, count, sentTime);
        };
        ServerDataProvider.prototype.getUnreadCount = function (conversationType, targetId, callback) {
            var unreadCount = RongIMLib.UnreadCountHandler.get(conversationType, targetId);
            setTimeout(function () {
                callback.onSuccess(unreadCount || 0);
            });
        };
        ServerDataProvider.prototype.cleanMentioneds = function (conver) {
            if (conver) {
                conver.mentionedMsg = null;
                var targetId = conver.targetId;
                var conversationType = conver.conversationType;
                var mentioneds = RongIMLib.RongIMClient._storageProvider.getItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId);
                if (mentioneds) {
                    var info = JSON.parse(mentioneds);
                    delete info[conversationType + "_" + targetId];
                    if (!RongIMLib.MessageUtil.isEmpty(info)) {
                        RongIMLib.RongIMClient._storageProvider.setItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId, JSON.stringify(info));
                    }
                    else {
                        RongIMLib.RongIMClient._storageProvider.removeItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId);
                    }
                }
            }
        };
        ServerDataProvider.prototype.clearUnreadCountByTimestamp = function (conversationType, targetId, timestamp, callback) {
            setTimeout(function () {
                callback.onSuccess(true);
            });
        };
        ServerDataProvider.prototype.clearUnreadCount = function (conversationType, targetId, callback) {
            var me = this;
            // RongIMClient._storageProvider.removeItem("cu" + Bridge._client.userId + conversationType + targetId);
            RongIMLib.UnreadCountHandler.remove(conversationType, targetId);
            this.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    conver = conver || new RongIMLib.Conversation();
                    var isNotifyConversation = conver.unreadMessageCount;
                    if (conver) {
                        conver.unreadMessageCount = 0;
                        me.cleanMentioneds(conver);
                    }
                    setTimeout(function () {
                        callback.onSuccess(true);
                        isNotifyConversation && RongIMLib.RongIMClient._dataAccessProvider.Conversation._notify(RongIMLib.RongIMClient._memoryStore.conversationList);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.clearTotalUnreadCount = function (callback) {
            var list = RongIMLib.RongIMClient._memoryStore.conversationList;
            var me = this;
            var isNotifyConversation = false;
            if (list) {
                // 清除 mentioneds、清除 list 中的 unreadMessageCount
                for (var i = 0; i < list.length; i++) {
                    var conver = list[i];
                    if (conver) {
                        isNotifyConversation = conver.unreadMessageCount ? true : isNotifyConversation;
                        conver.unreadMessageCount = 0;
                        me.cleanMentioneds(conver);
                    }
                }
            }
            RongIMLib.UnreadCountHandler.clear();
            setTimeout(function () {
                callback.onSuccess(true);
                isNotifyConversation && RongIMLib.RongIMClient._dataAccessProvider.Conversation._notify(RongIMLib.RongIMClient._memoryStore.conversationList);
            });
        };
        ServerDataProvider.prototype.setConversationToTop = function (conversationType, targetId, isTop, callback) {
            var me = this;
            this.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    conver.isTop = isTop;
                    me.addConversation(conver, callback);
                    setTimeout(function () {
                        callback.onSuccess(true);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        ServerDataProvider.prototype.getConversationNotificationStatus = function (params, callback) {
            var targetId = params.targetId;
            var conversationType = params.conversationType;
            var notification = RongIMLib.RongIMClient._memoryStore.notification;
            var getKey = function () {
                return conversationType + '_' + targetId;
            };
            var key = getKey();
            var status = notification[key];
            if (typeof status == 'number') {
                callback.onSuccess(status);
                return;
            }
            var topics = {
                1: 'qryPPush',
                3: 'qryDPush'
            };
            var topic = topics[conversationType];
            if (!topic) {
                var error = 8001;
                callback.onError(error);
                return;
            }
            var modules = new RongIMLib.RongIMClient.Protobuf.BlockPushInput();
            modules.setBlockeeId(targetId);
            var userId = RongIMLib.Bridge._client.userId;
            var success = function (status) {
                notification[key] = status;
                setTimeout(function () {
                    callback.onSuccess(status);
                });
            };
            RongIMLib.RongIMClient.bridge.queryMsg(topic, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    success(status);
                }, onError: function (e) {
                    if (e == 1) {
                        success(e);
                    }
                    else {
                        setTimeout(function () {
                            callback.onError(e);
                        });
                    }
                }
            });
        };
        ServerDataProvider.prototype.setConversationStatus = function (type, targetId, statusItem, callback) {
            var self = this;
            var modules = new RongIMLib.RongIMClient.Protobuf.SessionStateModifyReq();
            var userId = RongIMLib.Bridge._client.userId;
            var time = +new Date();
            var stateItemModules = [];
            if (!RongIMLib.RongUtil.isUndefined(statusItem.notificationStatus)) {
                var isNotDisturbe = statusItem.notificationStatus === RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;
                stateItemModules.push({
                    sessionStateType: 1,
                    value: isNotDisturbe ? '1' : '0'
                });
            }
            if (!RongIMLib.RongUtil.isUndefined(statusItem.isTop)) {
                stateItemModules.push({
                    sessionStateType: 2,
                    value: statusItem.isTop ? '1' : '0'
                });
            }
            var stateModules = {
                type: type,
                channelId: targetId,
                time: time,
                stateItem: stateItemModules
            };
            modules.setVersion(time);
            modules.setState([stateModules]);
            RongIMLib.RongIMClient.bridge.queryMsg('setSeAtt', RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (result) {
                    var time = RongIMLib.MessageUtil.int64ToTimestamp(result.version);
                    statusItem.updateTime = time;
                    statusItem.isLastInAPull = true;
                    self.conversationStatusManager.set(type, targetId, statusItem);
                    setTimeout(function () {
                        callback.onSuccess(time);
                    });
                },
                onError: function (e) {
                    setTimeout(function () {
                        callback.onError(e);
                    });
                }
            }, 'SessionStateModifyResp');
        };
        ServerDataProvider.prototype.pullConversationStatus = function (time, callback) {
            time = time || 0;
            var modules = new RongIMLib.RongIMClient.Protobuf.SessionReq();
            modules.setTime(time);
            var userId = RongIMLib.Bridge._client.userId;
            RongIMLib.RongIMClient.bridge.queryMsg('pullSeAtts', RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (result) {
                    var sessionStateList = result.state, lastTime = result.version;
                    var sessionLength = sessionStateList.length;
                    RongIMLib.RongUtil.forEach(sessionStateList, function (state, index) {
                        var type = state.type, targetId = state.channelId, updateTime = state.time, stateItem = state.stateItem;
                        var isSilent = false, isTop = false;
                        RongIMLib.RongUtil.forEach(stateItem, function (item) {
                            var sessionStateType = item.sessionStateType, value = item.value;
                            if (sessionStateType === 1) {
                                isSilent = !!Number(value);
                            }
                            if (sessionStateType === 2) {
                                isTop = !!Number(value);
                            }
                        });
                        var isLastInAPull = index === sessionLength - 1;
                        callback.onStatus(type, targetId, {
                            notificationStatus: isSilent ? RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB : RongIMLib.ConversationNotificationStatus.NOTIFY,
                            isTop: isTop,
                            updateTime: RongIMLib.MessageUtil.int64ToTimestamp(updateTime),
                            isLastInAPull: isLastInAPull
                        });
                    });
                    callback.onSuccess(RongIMLib.MessageUtil.int64ToTimestamp(lastTime));
                },
                onError: function (e) {
                    setTimeout(function () {
                        callback.onError(e);
                    });
                }
            }, 'SessionStates');
        };
        ServerDataProvider.prototype.setConversationNotificationStatus = function (params, callback) {
            var conversationType = params.conversationType;
            var targetId = params.targetId;
            var status = params.status;
            var getKey = function () {
                return conversationType + '_' + status;
            };
            var topics = {
                '1_1': 'blkPPush',
                '3_1': 'blkDPush',
                '1_0': 'unblkPPush',
                '3_0': 'unblkDPush'
            };
            var key = getKey();
            var notification = RongIMLib.RongIMClient._memoryStore.notification;
            notification[key] = status;
            var topic = topics[key];
            if (!topic) {
                var error = 8001;
                setTimeout(function () {
                    callback.onError(error);
                });
                return;
            }
            var modules = new RongIMLib.RongIMClient.Protobuf.BlockPushInput();
            modules.setBlockeeId(targetId);
            var userId = RongIMLib.Bridge._client.userId;
            RongIMLib.RongIMClient.bridge.queryMsg(topic, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    setTimeout(function () {
                        callback.onSuccess(status);
                    });
                }, onError: function (e) {
                    setTimeout(function () {
                        callback.onError(e);
                    });
                }
            });
        };
        ServerDataProvider.prototype.getUserStatus = function (userId, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.GetUserStatusInput();
            userId = RongIMLib.Bridge._client.userId;
            RongIMLib.RongIMClient.bridge.queryMsg(35, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    status = RongIMLib.RongInnerTools.convertUserStatus(status);
                    setTimeout(function () {
                        callback.onSuccess(status);
                    });
                }, onError: function (e) {
                    setTimeout(function () {
                        callback.onError(e);
                    });
                }
            }, 'GetUserStatusOutput');
            // callback.onSuccess(new UserStatus());
        };
        ServerDataProvider.prototype.setUserStatus = function (status, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.SetUserStatusInput();
            var userId = RongIMLib.Bridge._client.userId;
            if (status) {
                modules.setStatus(status);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(36, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    setTimeout(function () {
                        callback.onSuccess(true);
                    });
                }, onError: function (e) {
                    setTimeout(function () {
                        callback.onError(e);
                    });
                }
            }, 'SetUserStatusOutput');
        };
        ServerDataProvider.prototype.subscribeUserStatus = function (userIds, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.SubUserStatusInput();
            var userId = RongIMLib.Bridge._client.userId;
            modules.setUserid(userIds);
            RongIMLib.RongIMClient.bridge.queryMsg(37, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    setTimeout(function () {
                        callback && callback.onSuccess(true);
                    });
                }, onError: function (e) {
                    setTimeout(function () {
                        callback && callback.onError(e);
                    });
                }
            }, 'SubUserStatusOutput');
        };
        ServerDataProvider.prototype.setUserStatusListener = function (params, callback) {
            RongIMLib.RongIMClient.userStatusListener = callback;
            var userIds = params.userIds || [];
            if (userIds.length) {
                RongIMLib.RongIMClient._dataAccessProvider.subscribeUserStatus(userIds);
            }
        };
        ServerDataProvider.prototype.clearListeners = function () {
        };
        ServerDataProvider.prototype.setServerInfo = function (info) {
        };
        ServerDataProvider.prototype.getUnreadMentionedMessages = function (conversationType, targetId) {
            return null;
        };
        ServerDataProvider.prototype.setConversationHidden = function (conversationType, targetId, isHidden) {
        };
        ServerDataProvider.prototype.setMessageExtra = function (messageId, value, callback) {
            setTimeout(function () {
                callback.onSuccess(true);
            });
        };
        ServerDataProvider.prototype.setMessageReceivedStatus = function (messageId, receivedStatus, callback) {
            setTimeout(function () {
                callback.onSuccess(true);
            });
        };
        ServerDataProvider.prototype.setMessageSentStatus = function (messageId, sentStatus, callback) {
            setTimeout(function () {
                callback.onSuccess(true);
            });
        };
        ServerDataProvider.prototype.getAllConversations = function (callback) {
            setTimeout(function () {
                callback.onSuccess([]);
            });
        };
        ServerDataProvider.prototype.getConversationByContent = function (keywords, callback) {
            setTimeout(function () {
                callback.onSuccess([]);
            });
        };
        ServerDataProvider.prototype.getMessagesFromConversation = function (conversationType, targetId, keywords, callback) {
            setTimeout(function () {
                callback.onSuccess([]);
            });
        };
        ServerDataProvider.prototype.searchConversationByContent = function (keyword, callback, conversationTypes) {
            setTimeout(function () {
                callback.onSuccess([]);
            });
        };
        ServerDataProvider.prototype.searchMessageByContent = function (conversationType, targetId, keyword, timestamp, count, total, callback) {
            setTimeout(function () {
                callback.onSuccess([]);
            });
        };
        ServerDataProvider.prototype.getDelaTime = function () {
            return RongIMLib.RongIMClient._memoryStore.deltaTime;
        };
        ServerDataProvider.prototype.getCurrentConnectionStatus = function () {
            var client = RongIMLib.Bridge._client || {};
            var channel = client.channel || {};
            var status = RongIMLib.ConnectionStatus.CONNECTION_CLOSED;
            if (typeof channel.connectionStatus == 'number') {
                status = channel.connectionStatus;
            }
            return status;
        };
        ServerDataProvider.prototype.getAgoraDynamicKey = function (engineType, channelName, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.VoipDynamicInput();
            modules.setEngineType(engineType);
            modules.setChannelName(channelName);
            RongIMLib.RongIMClient.bridge.queryMsg(32, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (result) {
                    setTimeout(function () {
                        callback.onSuccess(result);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            }, "VoipDynamicOutput");
        };
        ServerDataProvider.prototype.setDeviceInfo = function (deviceId) {
        };
        ServerDataProvider.prototype.setEnvironment = function (isPrivate) {
        };
        ServerDataProvider.prototype.clearData = function () {
            return true;
        };
        ServerDataProvider.prototype.getPublicServiceProfile = function (publicServiceType, publicServiceId, callback) {
            var profile = RongIMLib.RongIMClient._memoryStore.publicServiceMap.get(publicServiceType, publicServiceId);
            setTimeout(function () {
                callback.onSuccess(profile);
            });
        };
        ServerDataProvider.prototype.getRemotePublicServiceList = function (callback, pullMessageTime) {
            if (RongIMLib.RongIMClient._memoryStore.depend.openMp) {
                var modules = new RongIMLib.RongIMClient.Protobuf.PullMpInput(), self = this;
                if (!pullMessageTime) {
                    modules.setTime(0);
                }
                else {
                    modules.setTime(pullMessageTime);
                }
                modules.setMpid("");
                RongIMLib.RongIMClient.bridge.queryMsg(28, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                    onSuccess: function (data) {
                        //TODO 找出最大时间
                        // self.lastReadTime.set(conversationType + targetId, MessageUtil.int64ToTimestamp(data.syncTime));
                        RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList.length = 0;
                        RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList = data;
                        setTimeout(function () {
                            callback && callback.onSuccess(data);
                        });
                    },
                    onError: function (errorCode) {
                        setTimeout(function () {
                            callback && callback.onError(errorCode);
                        });
                    }
                }, "PullMpOutput");
            }
        };
        ServerDataProvider.prototype.getRTCUserInfoList = function (room, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcQueryListInput();
            // 1 是正序,2是倒序
            modules.setOrder(2);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcUData", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function (result) {
                    var users = {};
                    var list = result.list;
                    RongIMLib.RongUtil.forEach(list, function (item) {
                        var userId = item.userId;
                        var tmpData = {};
                        RongIMLib.RongUtil.forEach(item.userData, function (data) {
                            var key = data.key;
                            var value = data.value;
                            tmpData[key] = value;
                        });
                        users[userId] = tmpData;
                    });
                    callback.onSuccess(users);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            }, "RtcUserListOutput");
        };
        ServerDataProvider.prototype.getRTCUserList = function (room, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcQueryListInput();
            modules.setOrder(2);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcUList", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function (result) {
                    callback.onSuccess({
                        users: result.list
                    });
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            }, "RtcUserListOutput");
        };
        ServerDataProvider.prototype.setRTCUserInfo = function (room, info, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcValueInfo();
            modules.setKey(info.key);
            modules.setValue(info.value);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcUPut", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function () {
                    callback.onSuccess(true);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            });
        };
        ServerDataProvider.prototype.removeRTCUserInfo = function (room, info, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcKeyDeleteInput();
            var keys = info.keys || [];
            if (!RongIMLib.RongUtil.isArray(keys)) {
                keys = [keys];
            }
            modules.setKey(keys);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcUDel", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function () {
                    callback.onSuccess(true);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            });
        };
        ServerDataProvider.prototype.getRTCRoomInfo = function (room, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcQueryListInput();
            modules.setOrder(2);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcRInfo", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function (result) {
                    var room = {
                        id: result.roomId,
                        total: result.userCount
                    };
                    RongIMLib.RongUtil.forEach(result.roomData, function (data) {
                        room[data.key] = data.value;
                    });
                    callback.onSuccess(room);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            }, "RtcRoomInfoOutput");
        };
        ServerDataProvider.prototype.setRTCRoomInfo = function (room, info, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcValueInfo();
            modules.setKey(info.key);
            modules.setValue(info.value);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcRPut", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function () {
                    callback.onSuccess(true);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            });
        };
        ServerDataProvider.prototype.removeRTCRoomInfo = function (room, info, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcKeyDeleteInput();
            var keys = info.keys || [];
            if (!RongIMLib.RongUtil.isArray(keys)) {
                keys = [keys];
            }
            modules.setKey(keys);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcRDel", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function () {
                    callback.onSuccess(true);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            });
        };
        ServerDataProvider.prototype.joinRTCRoom = function (room, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcInput();
            var mode = room.mode || 0;
            modules.setRoomType(mode);
            if (room.broadcastType) {
                modules.setBroadcastType(room.broadcastType);
            }
            RongIMLib.RongIMClient.bridge.queryMsg("rtcRJoin_data", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function (result) {
                    var users = {};
                    var list = result.list, token = result.token, sessionId = result.sessionId;
                    RongIMLib.RongUtil.forEach(list, function (item) {
                        var userId = item.userId;
                        var tmpData = {};
                        RongIMLib.RongUtil.forEach(item.userData, function (data) {
                            var key = data.key;
                            var value = data.value;
                            tmpData[key] = value;
                        });
                        users[userId] = tmpData;
                    });
                    callback.onSuccess({
                        users: users,
                        token: token,
                        sessionId: sessionId
                    });
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            }, "RtcUserListOutput");
        };
        ServerDataProvider.prototype.quitRTCRoom = function (room, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.SetUserStatusInput();
            RongIMLib.RongIMClient.bridge.queryMsg("rtcRExit", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function () {
                    callback.onSuccess(true);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            });
        };
        ServerDataProvider.prototype.RTCPing = function (room, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcInput();
            var mode = room.mode || 0;
            modules.setRoomType(mode);
            if (room.broadcastType) {
                modules.setBroadcastType(room.broadcastType);
            }
            RongIMLib.RongIMClient.bridge.queryMsg("rtcPing", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, callback);
        };
        /**
         * 全量订阅资源修改
         * @param roomId 房间 Id
         * @param message 增量数据
         * @param valueInfo 全量资源信息
         * @param objectName 消息名称
         * @param callback
         */
        ServerDataProvider.prototype.setRTCTotalRes = function (roomId, message, valueInfo, objectName, callback) {
            // 全量 URI 新增
            // 全量发布中
            // valueInfo: key 为 uris，值为 全量的订阅信息
            // content: key 为增量数据消息 RCRTC:ModifyResource，value 为增量订阅信息
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcUserSetDataInput();
            modules.setObjectName(objectName);
            // content
            var val = new RongIMLib.RongIMClient.Protobuf.RtcValueInfo();
            val.setKey(message.name);
            val.setValue(message.content);
            modules.setContent(val);
            // valueInfo
            val = new RongIMLib.RongIMClient.Protobuf.RtcValueInfo();
            val.setKey('uris');
            val.setValue(valueInfo);
            modules.setValueInfo(val);
            var arrayBuff = RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer());
            RongIMLib.RongIMClient.bridge.queryMsg("userSetData", arrayBuff, roomId, callback, "RtcOutput");
        };
        ServerDataProvider.prototype.setRTCData = function (roomId, key, value, isInner, apiType, callback, message) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcSetDataInput();
            modules.setInterior(isInner);
            modules.setTarget(apiType);
            modules.setKey(key);
            modules.setValue(value);
            message = message || {};
            var name = message.name;
            var content = message.content;
            if (name) {
                modules.setObjectName(name);
            }
            if (content) {
                if (!RongIMLib.RongUtil.isString(content)) {
                    content = JSON.stringify(content);
                }
                modules.setContent(content);
            }
            RongIMLib.RongIMClient.bridge.queryMsg("rtcSetData", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), roomId, callback, "RtcOutput");
        };
        ServerDataProvider.prototype.getRTCData = function (roomId, keys, isInner, apiType, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcDataInput();
            modules.setInterior(isInner);
            modules.setTarget(apiType);
            modules.setKey(keys);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcQryData", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), roomId, {
                onSuccess: function (result) {
                    var props = {};
                    var list = result.outInfo;
                    RongIMLib.RongUtil.forEach(list, function (item) {
                        props[item.key] = item.value;
                    });
                    callback.onSuccess(props);
                },
                onError: callback.onError
            }, "RtcQryOutput");
        };
        ServerDataProvider.prototype.removeRTCData = function (roomId, keys, isInner, apiType, callback, message) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcDataInput();
            modules.setInterior(isInner);
            modules.setTarget(apiType);
            modules.setKey(keys);
            message = message || {};
            var name = message.name;
            var content = message.content;
            if (name) {
                modules.setObjectName(name);
            }
            if (content) {
                if (!RongIMLib.RongUtil.isString(content)) {
                    content = JSON.stringify(content);
                }
                modules.setContent(content);
            }
            RongIMLib.RongIMClient.bridge.queryMsg("rtcDelData", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), roomId, callback, "RtcOutput");
        };
        ServerDataProvider.prototype.setRTCUserData = function (roomId, key, value, isInner, callback, message) {
            this.setRTCData(roomId, key, value, isInner, RongIMLib.RTCAPIType.PERSON, callback, message);
        };
        ServerDataProvider.prototype.setRTCUserTotalRes = function (roomId, message, valueInfo, objectName, callback) {
            this.setRTCTotalRes(roomId, message, valueInfo, objectName, callback);
        };
        ServerDataProvider.prototype.getRTCUserData = function (roomId, keys, isInner, callback, message) {
            this.getRTCData(roomId, keys, isInner, RongIMLib.RTCAPIType.PERSON, callback);
        };
        ServerDataProvider.prototype.removeRTCUserData = function (roomId, keys, isInner, callback, message) {
            this.removeRTCData(roomId, keys, isInner, RongIMLib.RTCAPIType.PERSON, callback, message);
        };
        ServerDataProvider.prototype.setRTCRoomData = function (roomId, key, value, isInner, callback, message) {
            this.setRTCData(roomId, key, value, isInner, RongIMLib.RTCAPIType.ROOM, callback, message);
        };
        ServerDataProvider.prototype.getRTCRoomData = function (roomId, keys, isInner, callback, message) {
            this.getRTCData(roomId, keys, isInner, RongIMLib.RTCAPIType.ROOM, callback);
        };
        ServerDataProvider.prototype.removeRTCRoomData = function (roomId, keys, isInner, callback, message) {
            this.removeRTCData(roomId, keys, isInner, RongIMLib.RTCAPIType.ROOM, callback, message);
        };
        // 信令 SDK 新增
        ServerDataProvider.prototype.setRTCOutData = function (roomId, data, type, callback, message) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcSetOutDataInput();
            modules.setTarget(type);
            if (!RongIMLib.RongUtil.isArray(data)) {
                data = [data];
            }
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.key) {
                    item.key = item.key.toString();
                }
                if (item.value) {
                    item.value = item.value.toString();
                }
            }
            modules.setValueInfo(data);
            message = message || {};
            var name = message.name;
            var content = message.content;
            if (name) {
                modules.setObjectName(name);
            }
            if (content) {
                if (!RongIMLib.RongUtil.isString(content)) {
                    content = JSON.stringify(content);
                }
                modules.setContent(content);
            }
            RongIMLib.RongIMClient.bridge.queryMsg("rtcSetOutData", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), roomId, callback, "RtcOutput");
        };
        // 信令 SDK 新增
        ServerDataProvider.prototype.getRTCOutData = function (roomId, userIds, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcQryUserOutDataInput();
            modules.setUserId(userIds);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcQryUserOutData", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), roomId, callback, "RtcUserOutDataOutput");
        };
        ServerDataProvider.prototype.getNavi = function () {
            var navi = RongIMLib.RongIMClient._storageProvider.getItem("fullnavi") || "{}";
            return JSON.parse(navi);
        };
        ServerDataProvider.prototype.getRTCToken = function (room, callback) {
            var modules = new RongIMLib.RongIMClient.Protobuf.RtcInput();
            var mode = room.mode || 0;
            modules.setRoomType(mode);
            if (room.broadcastType) {
                modules.setBroadcastType(room.broadcastType);
            }
            RongIMLib.RongIMClient.bridge.queryMsg("rtcToken", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function (result) {
                    callback.onSuccess(result);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            }, "RtcTokenOutput");
        };
        ServerDataProvider.prototype.setRTCState = function (room, content, callback) {
            // MCFollowInput 为 PB 复用，字段：一个必传 string（第一位）
            var modules = new RongIMLib.RongIMClient.Protobuf.MCFollowInput();
            var report = content.report;
            modules.setId(report);
            RongIMLib.RongIMClient.bridge.queryMsg("rtcUserState", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                onSuccess: function (result) {
                    callback.onSuccess(result);
                },
                onError: function (errorCode) {
                    callback.onError(errorCode);
                }
            }, "RtcOutput");
        };
        return ServerDataProvider;
    })();
    RongIMLib.ServerDataProvider = ServerDataProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var VCDataProvider = (function () {
        function VCDataProvider(addon) {
            this.Conversation = {
                watcher: new RongIMLib.Observer(),
                watch: function (_watcher) {
                },
                unwatch: function (_watcher) {
                },
                _notify: function (conversationList) {
                }
            };
            // C++ 需要的 SDK 版本号
            this.version = '2.8.27';
            this.userId = "";
            this.useConsole = false;
            this.appKey = "";
            this.token = "";
            this.connectionStatus = RongIMLib.ConnectionStatus.DISCONNECTED;
            this.addon = addon;
        }
        VCDataProvider.prototype.init = function (appKey, config) {
            this.appKey = appKey;
            this.useConsole && console.log("init");
            config = config || {};
            config.version = this.version;
            var sdkInfo = this.addon.initWithAppkey(appKey, config.dbPath, config);
            if (sdkInfo) {
                sdkInfo = JSON.parse(sdkInfo);
            }
            // 0 不存不计数  1 只存不计数 3 存且计数
            this.addon.registerMessageType("RC:VcMsg", 3);
            this.addon.registerMessageType("RC:ImgTextMsg", 3);
            this.addon.registerMessageType("RC:FileMsg", 3);
            this.addon.registerMessageType("RC:LBSMsg", 3);
            this.addon.registerMessageType("RC:PSImgTxtMsg", 3);
            this.addon.registerMessageType("RC:PSMultiImgTxtMsg", 3);
            this.addon.registerMessageType("RCJrmf:RpMsg", 3);
            this.addon.registerMessageType("RCJrmf:RpOpendMsg", 1);
            this.addon.registerMessageType("RC:GrpNtf", 1);
            this.addon.registerMessageType("RC:DizNtf", 0);
            this.addon.registerMessageType("RC:InfoNtf", 0);
            this.addon.registerMessageType("RC:ContactNtf", 0);
            this.addon.registerMessageType("RC:ProfileNtf", 0);
            this.addon.registerMessageType("RC:CmdNtf", 0);
            this.addon.registerMessageType("RC:CmdMsg", 0);
            this.addon.registerMessageType("RC:TypSts", 0);
            this.addon.registerMessageType("RC:CsChaR", 0);
            this.addon.registerMessageType("RC:CsHsR", 0);
            this.addon.registerMessageType("RC:CsEnd", 0);
            this.addon.registerMessageType("RC:CsSp", 0);
            this.addon.registerMessageType("RC:CsUpdate", 0);
            this.addon.registerMessageType("RC:CsContact", 0);
            this.addon.registerMessageType("RC:ReadNtf", 0);
            this.addon.registerMessageType("RC:VCAccept", 0);
            this.addon.registerMessageType("RC:VCRinging", 0);
            this.addon.registerMessageType("RC:VCSummary", 0);
            this.addon.registerMessageType("RC:VCHangup", 0);
            this.addon.registerMessageType("RC:VCInvite", 0);
            this.addon.registerMessageType("RC:VCModifyMedia", 0);
            this.addon.registerMessageType("RC:VCModifyMem", 0);
            this.addon.registerMessageType("RC:PSCmd", 0);
            this.addon.registerMessageType("RC:RcCmd", 0);
            this.addon.registerMessageType("RC:SRSMsg", 0);
            this.addon.registerMessageType("RC:RRReqMsg", 0);
            this.addon.registerMessageType("RC:RRRspMsg", 0);
            return sdkInfo;
        };
        VCDataProvider.prototype.connect = function (token, callback, userId, serverConf) {
            this.useConsole && console.log("connect");
            this.userId = userId;
            this.connectCallback = callback;
            RongIMLib.Bridge._client = {
                userId: userId,
                token: token
            };
            serverConf = serverConf || {};
            var openmp = !!serverConf.openMp;
            var openus = !!serverConf.openUS;
            if (serverConf.type) {
                this.addon.setEnvironment(true);
            }
            var me = this;
            // this.addon.connectWithToken(token, userId, serverConf.serverList, openmp, openus);
            this.addon.connectWithToken(token, userId, function (userId) {
                me.userId = userId;
                RongIMLib.Bridge._client.userId = userId;
            });
        };
        VCDataProvider.prototype.setConversationStatus = function (type, targetId, statusItem, callback) {
        };
        VCDataProvider.prototype.setServerInfo = function (info) {
            'setServerInfo' in this.addon && this.addon.setServerInfo(info.navi);
        };
        VCDataProvider.prototype.logout = function () {
            this.useConsole && console.log("logout");
            this.disconnect();
        };
        VCDataProvider.prototype.disconnect = function () {
            this.useConsole && console.log("disconnect");
            this.connectionStatus = RongIMLib.ConnectionStatus.DISCONNECTED;
            this.addon.disconnect(true);
        };
        VCDataProvider.prototype.clearListeners = function () {
            this.addon.setOnReceiveStatusListener();
            this.addon.setConnectionStatusListener();
            this.addon.setOnReceiveMessageListener();
        };
        VCDataProvider.prototype.clearData = function () {
            this.useConsole && console.log("clearData");
            return this.addon.clearData();
        };
        VCDataProvider.prototype.setConnectionStatusListener = function (listener) {
            var me = this;
            /**
            ConnectionStatus_TokenIncorrect = 31004,
            ConnectionStatus_Connected = 0,
            ConnectionStatus_KickedOff = 6,	// 其他设备登录
            ConnectionStatus_Connecting = 10,// 连接中
            ConnectionStatus_SignUp = 12, // 未登录
            ConnectionStatus_NetworkUnavailable = 1, // 连接断开
            ConnectionStatus_ServerInvalid = 8, // 断开
            ConnectionStatus_ValidateFailure = 9,//断开
            ConnectionStatus_Unconnected = 11,//断开
            ConnectionStatus_DisconnExecption = 31011 //断开
            RC_NAVI_MALLOC_ERROR   = 30000,//断开
            RC_NAVI_NET_UNAVAILABLE= 30002,//断开
            RC_NAVI_SEND_FAIL      = 30004,//断开
            RC_NAVI_REQ_TIMEOUT    = 30005,//断开
            RC_NAVI_RECV_FAIL      = 30006,//断开
            RC_NAVI_RESOURCE_ERROR = 30007,//断开
            RC_NAVI_NODE_NOT_FOUND = 30008,//断开
            RC_NAVI_DNS_ERROR      = 30009,//断开
            */
            me.connectListener = listener;
            this.useConsole && console.log("setConnectionStatusListener");
            me.addon && me.addon.setConnectionStatusListener(function (result) {
                var isCurrentConnected = me.connectionStatus === RongIMLib.ConnectionStatus.CONNECTED;
                var code = result;
                switch (result) {
                    case 10:
                        code = RongIMLib.ConnectionStatus.CONNECTING;
                        break;
                    case 31004:
                        setTimeout(function () {
                            me.connectCallback.onTokenIncorrect();
                        });
                        return;
                    case 1:
                    case 8:
                    case 9:
                    case 11:
                    case 12:
                    case 31011:
                    case 30000:
                    case 30002:
                    case 30010:
                        if (!isCurrentConnected) {
                            return;
                        }
                        code = RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE;
                        break;
                    case 0:
                    case 33005:
                        code = RongIMLib.ConnectionStatus.CONNECTED;
                        setTimeout(function () {
                            me.connectCallback.onSuccess(me.userId);
                        });
                        break;
                    case 6:
                        code = RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT;
                        break;
                    default:
                        code = result;
                        break;
                }
                me.connectionStatus = code;
                setTimeout(function () {
                    listener.onChanged(code);
                });
            });
        };
        VCDataProvider.prototype.setOnReceiveMessageListener = function (listener) {
            var me = this, localCount = 0;
            me.messageListener = listener;
            this.useConsole && console.log("setOnReceiveMessageListener");
            me.addon && me.addon.setOnReceiveMessageListener(function (result, leftCount, offline, hasMore) {
                var message = me.buildMessage(result);
                message.offLineMessage = offline;
                setTimeout(function () {
                    var voipMsgTypes = ['AcceptMessage', 'RingingMessage', 'HungupMessage', 'InviteMessage', 'MediaModifyMessage', 'MemberModifyMessage'];
                    var isVoIPMsg = voipMsgTypes.indexOf(message.messageType) > -1;
                    if (isVoIPMsg) {
                        RongIMLib.RongIMClient._voipProvider && RongIMLib.RongIMClient._voipProvider.onReceived(message);
                    }
                    else if (message.conversationType == 12) {
                        RongIMLib.RongIMClient.RTCListener(message);
                        RongIMLib.RongIMClient.RTCInnerListener(message);
                        RongIMLib.RongIMClient.RTCSignalLisener(message);
                    }
                    else {
                        listener.onReceived(message, leftCount, hasMore);
                    }
                });
            });
        };
        VCDataProvider.prototype.sendTypingStatusMessage = function (conversationType, targetId, messageName, sendCallback) {
            var me = this;
            this.useConsole && console.log("sendTypingStatusMessage");
            if (messageName in RongIMLib.RongIMClient.MessageParams) {
                me.sendMessage(conversationType, targetId, RongIMLib.TypingStatusMessage.obtain(RongIMLib.RongIMClient.MessageParams[messageName].objectName, ""), {
                    onSuccess: function () {
                        setTimeout(function () {
                            sendCallback.onSuccess();
                        });
                    },
                    onError: function (errorCode) {
                        setTimeout(function () {
                            sendCallback.onError(errorCode, null);
                        });
                    },
                    onBefore: function () { }
                });
            }
        };
        VCDataProvider.prototype.setMessageStatus = function (conversationType, targetId, timestamp, status, callback) {
            this.addon.updateMessageReceiptStatus(conversationType, targetId, timestamp);
            callback.onSuccess(true);
        };
        VCDataProvider.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
            var msgContent = RongIMLib.TextMessage.obtain(content);
            this.useConsole && console.log("sendTextMessage");
            this.sendMessage(conversationType, targetId, msgContent, sendMessageCallback);
        };
        VCDataProvider.prototype.getRemoteHistoryMessages = function (conversationType, targetId, timestamp, count, callback, config) {
            try {
                var me = this;
                me.useConsole && console.log("getRemoteHistoryMessages");
                me.addon.getRemoteHistoryMessages(conversationType, targetId, timestamp ? timestamp : 0, count, function (ret, hasMore) {
                    var list = ret ? JSON.parse(ret).list : [], msgs = [];
                    list.reverse();
                    for (var i = 0, len = list.length; i < len; i++) {
                        var message = me.buildMessage(list[i].obj);
                        message.sentStatus = RongIMLib.SentStatus.READ;
                        msgs[i] = message;
                    }
                    callback.onSuccess(msgs, hasMore ? true : false);
                }, function (errorCode) {
                    callback.onError(errorCode);
                });
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.getRemoteConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            try {
                this.useConsole && console.log("getRemoteConversationList");
                var converTypes = conversationTypes || [1, 2, 3, 4, 5, 6, 7, 8];
                var result = this.addon.getConversationList(converTypes);
                var list = JSON.parse(result).list, convers = [], me = this, index = 0;
                list.reverse();
                isGetHiddenConvers = typeof isGetHiddenConvers === 'boolean' ? isGetHiddenConvers : false;
                for (var i = 0, len_1 = list.length; i < len_1; i++) {
                    var tmpObj = list[i].obj, obj = JSON.parse(tmpObj);
                    if (obj != "") {
                        if (obj.isHidden == 1 && isGetHiddenConvers) {
                            continue;
                        }
                        convers[index] = me.buildConversation(tmpObj);
                        index++;
                    }
                }
                convers.reverse();
                var len = convers.length;
                count = count || len;
                if (len > count) {
                    convers.length = count;
                }
                callback.onSuccess(convers);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.removeConversation = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("removeConversation");
                this.addon.removeConversation(conversationType, targetId);
                var conversations = RongIMLib.RongIMClient._memoryStore.conversationList;
                var len = conversations.length;
                for (var i = 0; i < len; i++) {
                    if (conversations[i].conversationType == conversationType && targetId == conversations[i].targetId) {
                        conversations.splice(i, 1);
                        break;
                    }
                }
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.joinChatRoom = function (chatRoomId, messageCount, callback) {
            this.useConsole && console.log("joinChatRoom");
            this.addon.joinChatRoom(chatRoomId, messageCount, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.quitChatRoom = function (chatRoomId, callback) {
            this.useConsole && console.log("quitChatRoom");
            this.addon.quitChatRoom(chatRoomId, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.setChatroomEntry = function (chatroomId, chatroomEntry, callback) {
        };
        VCDataProvider.prototype.forceSetChatroomEntry = function (chatroomId, chatroomEntry, callback) {
        };
        VCDataProvider.prototype.getChatroomEntry = function (chatroomId, key, callback) {
        };
        VCDataProvider.prototype.getAllChatroomEntries = function (chatroomId, callback) {
        };
        VCDataProvider.prototype.removeChatroomEntry = function (chatroomId, chatroomEntry, callback) {
        };
        VCDataProvider.prototype.forceRemoveChatroomEntry = function (chatroomId, chatroomEntry, callback) {
        };
        VCDataProvider.prototype.pullChatroomEntry = function (chatroomId, time, callback) {
        };
        VCDataProvider.prototype.addToBlacklist = function (userId, callback) {
            this.useConsole && console.log("addToBlacklist");
            this.addon.addToBlacklist(userId, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.getBlacklist = function (callback) {
            this.useConsole && console.log("getBlacklist");
            this.addon.getBlacklist(function (blacklistors) {
                callback.onSuccess(blacklistors);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.getBlacklistStatus = function (userId, callback) {
            this.useConsole && console.log("getBlacklistStatus");
            this.addon.getBlacklistStatus(userId, function (result) {
                callback.onSuccess(result);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.removeFromBlacklist = function (userId, callback) {
            this.useConsole && console.log("removeFromBlacklist");
            this.addon.removeFromBlacklist(userId, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType, params) {
            var me = this, users = [];
            me.useConsole && console.log("sendMessage");
            params = params || {};
            var isGroup = (conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP);
            if (isGroup && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]) {
                users = [];
                var rspMsg = messageContent;
                if (rspMsg.receiptMessageDic) {
                    var ids = [];
                    for (var key in rspMsg.receiptMessageDic) {
                        ids.push(key);
                    }
                    users = ids;
                }
            }
            if (isGroup && messageContent.messageName == RongIMLib.RongIMClient.MessageType["SyncReadStatusMessage"]) {
                users = [];
                users.push(me.userId);
            }
            var userIds = params.userIds;
            if (isGroup && userIds) {
                users = userIds;
            }
            var msg = me.addon.sendMessage(conversationType, targetId, RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName, messageContent.encode(), pushText || "", appData || "", function (progress) {
            }, function (message, code) {
                var msg = me.buildMessage(message);
                var errorCode = RongIMLib.ErrorCode.SENSITIVE_REPLACE;
                if (code == errorCode) {
                    return sendCallback.onError(errorCode, msg);
                }
                sendCallback.onSuccess(msg);
            }, function (message, code) {
                sendCallback.onError(code, me.buildMessage(message));
            }, users, mentiondMsg);
            var tempMessage = JSON.parse(msg);
            sendCallback.onBefore && sendCallback.onBefore(tempMessage.messageId);
            RongIMLib.MessageIdHandler.messageId = tempMessage.messageId;
        };
        VCDataProvider.prototype.registerMessageType = function (messageType, objectName, messageTag, messageContent, searchProps) {
            this.useConsole && console.log("registerMessageType");
            this.addon.registerMessageType(objectName, messageTag.getMessageTag(), searchProps);
            var regMsg = RongIMLib.ModelUtil.modleCreate(messageContent, messageType);
            RongIMLib.RongIMClient.RegisterMessage[messageType] = regMsg;
            RongIMLib.RongIMClient.RegisterMessage[messageType].messageName = messageType;
            registerMessageTypeMapping[objectName] = messageType;
            RongIMLib.RongIMClient.MessageType[messageType] = messageType;
            RongIMLib.RongIMClient.MessageParams[messageType] = { objectName: objectName, msgTag: messageTag };
            typeMapping[objectName] = messageType;
        };
        VCDataProvider.prototype.registerMessageTypes = function (messages) {
            var types = [];
            var getProtos = function (proto) {
                var protos = [];
                for (var p in proto) {
                    protos.push(p);
                }
                return protos;
            };
            //转换消息为自定义消息参数格式
            for (var name in messages) {
                var message = messages[name];
                var proto = message.proto;
                var protos = getProtos(proto);
                var flag = message.flag || 3;
                var tag = RongIMLib.MessageTag.getTagByStatus(flag);
                flag = new RongIMLib.MessageTag(tag.isCounted, tag.isPersited);
                types.push({
                    type: name,
                    name: message.name,
                    flag: flag,
                    protos: protos
                });
            }
            var register = function (message) {
                var type = message.type;
                var name = message.name;
                var flag = message.flag;
                var protos = message.protos;
                RongIMLib.RongIMClient.registerMessageType(type, name, flag, protos);
            };
            for (var i = 0, len = types.length; i < len; i++) {
                var message = types[i];
                register(message);
            }
        };
        VCDataProvider.prototype.addMessage = function (conversationType, targetId, message, callback) {
            this.useConsole && console.log("addMessage");
            var direction = message.direction;
            var msg = this.addon.insertMessage(conversationType, targetId, message.senderUserId, message.objectName, JSON.stringify(message.content), function () {
                callback.onSuccess(me.buildMessage(msg));
            }, function () {
                callback.onError(RongIMLib.ErrorCode.MSG_INSERT_ERROR);
            }, direction), me = this;
        };
        VCDataProvider.prototype.removeMessage = function (conversationType, targetId, messages, callback) {
        };
        VCDataProvider.prototype.deleteRemoteMessages = function (conversationType, targetId, messages, callback) {
        };
        VCDataProvider.prototype.removeLocalMessage = function (conversationType, targetId, timestamps, callback) {
            try {
                this.useConsole && console.log("removeLocalMessage");
                this.addon.deleteMessages(timestamps);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.getMessage = function (messageId, callback) {
            try {
                this.useConsole && console.log("getMessage");
                var msg = this.buildMessage(this.addon.getMessage(messageId));
                callback.onSuccess(msg);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.clearMessages = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("clearMessages");
                this.addon.clearMessages(conversationType, targetId);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        // Web 端接口，桌面版无需实现
        VCDataProvider.prototype.setUnreadCount = function (conversationType, targetId, count) {
        };
        VCDataProvider.prototype.getConversation = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("getConversation");
                var ret = this.addon.getConversation(conversationType, targetId);
                callback.onSuccess(this.buildConversation(ret));
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.getConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            this.useConsole && console.log("getConversationList");
            this.getRemoteConversationList(callback, conversationTypes, count, isGetHiddenConvers);
        };
        VCDataProvider.prototype.clearCache = function () {
            var memoryStore = RongIMLib.RongIMClient._memoryStore || {};
            memoryStore.conversationList = [];
            memoryStore.isSyncRemoteConverList;
        };
        VCDataProvider.prototype.clearConversations = function (conversationTypes, callback) {
            try {
                this.useConsole && console.log("clearConversations");
                this.addon.clearConversations();
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.setMessageContent = function (messageId, content, objectName) {
            content = JSON.stringify(content);
            this.addon.setMessageContent(messageId, content, objectName);
        };
        VCDataProvider.prototype.setMessageSearchField = function (messageId, content, searchFiles) {
            this.addon.setMessageSearchField(messageId, content, searchFiles);
        };
        VCDataProvider.prototype.getHistoryMessages = function (conversationType, targetId, timestamp, count, callback, objectname, direction) {
            this.useConsole && console.log("getHistoryMessages");
            if (count <= 0) {
                callback.onError(RongIMLib.ErrorCode.TIMEOUT);
                return;
            }
            objectname = objectname || '';
            direction = typeof direction == 'undefined' || direction;
            try {
                var ret = this.addon.getHistoryMessages(conversationType, targetId, timestamp ? timestamp : 0, count, objectname, direction);
                var list = ret ? JSON.parse(ret).list : [], msgs = [], me = this;
                list.reverse();
                for (var i = 0, len = list.length; i < len; i++) {
                    var message = me.buildMessage(list[i].obj);
                    msgs[i] = message;
                }
                callback.onSuccess(msgs, len == count);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.clearRemoteHistoryMessages = function (params, callback) {
            var conversationType = params.conversationType;
            var targetId = params.targetId;
            var timestamp = params.timestamp;
            var _topic = {
                1: true,
                2: true,
                3: true,
                5: true,
                6: true
            };
            var topic = _topic[conversationType];
            if (!topic) {
                callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TYPE_ERROR);
                return;
            }
            if (typeof timestamp != 'number') {
                callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TIME_ERROR);
                return;
            }
            this.addon.clearRemoteHistoryMessages(+conversationType, targetId, timestamp, function () {
                callback.onSuccess(true);
            }, function (errorCode) {
                if (errorCode == 1) {
                    // 没有开通历史消息云存储
                    errorCode = RongIMLib.ErrorCode.CLEAR_HIS_ERROR;
                }
                callback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.clearHistoryMessages = function (params, callback) {
            var conversationType = +params.conversationType;
            var targetId = params.targetId;
            try {
                this.addon.clearMessages(conversationType, targetId);
                var isSuccess = true;
                callback.onSuccess(isSuccess);
            }
            catch (e) {
                console.log(e);
                callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_ERROR);
            }
        };
        VCDataProvider.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
            var result = 0;
            try {
                this.useConsole && console.log("getTotalUnreadCount");
                if (conversationTypes) {
                    result = this.addon.getTotalUnreadCount(conversationTypes);
                }
                else {
                    result = this.addon.getTotalUnreadCount();
                }
                callback.onSuccess(result);
            }
            catch (e) {
                callback.onError(e);
            }
            return result;
        };
        VCDataProvider.prototype.getConversationUnreadCount = function (conversationTypes, callback) {
            this.useConsole && console.log("getConversationUnreadCount");
            this.getTotalUnreadCount(callback, conversationTypes);
        };
        VCDataProvider.prototype.getUnreadCount = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("getUnreadCount");
                var result = this.addon.getUnreadCount(conversationType, targetId);
                callback.onSuccess(result);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.clearUnreadCount = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("clearUnreadCount");
                var result = this.addon.clearUnreadCount(conversationType, targetId);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.clearTotalUnreadCount = function (callback) {
            this.useConsole && console.log("clearTotalUnreadCount");
        };
        VCDataProvider.prototype.clearUnreadCountByTimestamp = function (conversationType, targetId, timestamp, callback) {
            try {
                this.useConsole && console.log("clearUnreadCountByTimestamp");
                var result = this.addon.clearUnreadCountByTimestamp(conversationType, targetId, timestamp);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.setConversationToTop = function (conversationType, targetId, isTop, callback) {
            try {
                this.useConsole && console.log("setConversationToTop");
                this.addon.setConversationToTop(conversationType, targetId, isTop);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.setConversationHidden = function (conversationType, targetId, isHidden) {
            this.addon.setConversationHidden(conversationType, targetId, isHidden);
        };
        VCDataProvider.prototype.setMessageReceivedStatus = function (messageId, receivedStatus, callback) {
            try {
                this.useConsole && console.log("setMessageReceivedStatus");
                this.addon.setMessageReceivedStatus(messageId, receivedStatus);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.setMessageSentStatus = function (messageId, sentStatus, callback) {
            try {
                this.useConsole && console.log("setMessageSentStatus");
                this.addon.setMessageSentStatus(messageId, sentStatus);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.getFileToken = function (fileType, callback) {
            this.useConsole && console.log("getFileToken");
            this.addon.getUploadToken(fileType, function (token) {
                callback.onSuccess({ token: token });
            }, function (errorCode) {
                callback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.getFileUrl = function (fileType, fileName, oriName, callback) {
            this.useConsole && console.log("getFileUrl");
            this.addon.getDownloadUrl(fileType, fileName, oriName, function (url) {
                callback.onSuccess({ downloadUrl: url });
            }, function (errorCode) {
                callback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.getPullSetting = function (callback) {
            this.useConsole && console.log("getPullSetting");
        };
        VCDataProvider.prototype.setOfflineMessageDuration = function (duration, callback) {
            this.useConsole && console.log("setOfflineMessageDuration");
        };
        VCDataProvider.prototype.searchConversationByContent = function (keyword, callback, conversationTypes) {
            var converTypes = [];
            if (typeof conversationTypes == 'undefined') {
                converTypes = [1, 2, 3, 4, 5, 6, 7];
            }
            else {
                converTypes = conversationTypes;
            }
            try {
                this.useConsole && console.log("searchConversationByContent");
                var result = this.addon.searchConversationByContent(converTypes, keyword);
                var list = JSON.parse(result).list, convers = [], me = this;
                list.reverse();
                for (var i = 0, len = list.length; i < len; i++) {
                    convers[i] = me.buildConversation(list[i].obj);
                }
                callback.onSuccess(convers);
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.searchMessageByContent = function (conversationType, targetId, keyword, timestamp, count, total, callback) {
            var me = this;
            try {
                this.useConsole && console.log("searchMessageByContent");
                this.addon.searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total, function (ret, matched) {
                    var list = ret ? JSON.parse(ret).list : [], msgs = [];
                    list.reverse();
                    for (var i = 0, len = list.length; i < len; i++) {
                        msgs[i] = me.buildMessage(list[i].obj);
                    }
                    callback.onSuccess(msgs, matched);
                });
            }
            catch (e) {
                callback.onError(e);
            }
        };
        VCDataProvider.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
            this.useConsole && console.log("getChatRoomInfo");
            this.addon.getChatroomInfo(chatRoomId, count, order, function (ret, count) {
                var list = ret ? JSON.parse(ret).list : [], chatRoomInfo = { userInfos: [], userTotalNums: count };
                if (list.length > 0) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        chatRoomInfo.userInfos.push(JSON.parse(list[i].obj));
                    }
                }
                callback.onSuccess(chatRoomInfo);
            }, function (errcode) {
                callback.onError(errcode);
            });
        };
        VCDataProvider.prototype.setChatroomHisMessageTimestamp = function (chatRoomId, timestamp) {
        };
        VCDataProvider.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
        };
        VCDataProvider.prototype.getDelaTime = function () {
            return this.addon.getDeltaTime();
        };
        VCDataProvider.prototype.getUserStatus = function (userId, callback) {
            var me = this;
            this.addon.getUserStatus(userId, function (status) {
                var entity = RongIMLib.RongInnerTools.convertUserStatus({
                    status: status,
                    userId: ''
                });
                callback.onSuccess(entity);
            }, function (code) {
                callback.onError(code);
            });
        };
        VCDataProvider.prototype.setUserStatus = function (status, callback) {
            this.addon.setUserStatus(status, function () {
                callback.onSuccess(true);
            }, function (code) {
                callback.onError(code);
            });
        };
        VCDataProvider.prototype.subscribeUserStatus = function (userIds, callback) {
            this.addon.subscribeUserStatus(userIds, function () {
                callback && callback.onSuccess(true);
            }, function (code) {
                callback && callback.onError(code);
            });
        };
        VCDataProvider.prototype.setUserStatusListener = function (params, callback) {
            var me = this;
            this.addon.setOnReceiveStatusListener(function (userId, status) {
                var entity = RongIMLib.RongInnerTools.convertUserStatus({
                    userId: userId,
                    status: status
                });
                RongIMLib.RongIMClient.userStatusObserver.notify({
                    key: userId,
                    entity: entity
                });
            });
            var userIds = params.userIds || [];
            if (userIds.length) {
                RongIMLib.RongIMClient._dataAccessProvider.subscribeUserStatus(userIds);
            }
        };
        VCDataProvider.prototype.getUnreadMentionedMessages = function (conversationType, targetId) {
            var me = this;
            var mentions = JSON.parse(me.addon.getUnreadMentionedMessages(conversationType, targetId)).list;
            for (var i = 0, len = mentions.length; i < len; i++) {
                var temp = JSON.parse(mentions[i].obj);
                temp.content = JSON.parse(temp.content);
                mentions[i] = temp;
            }
            return mentions;
        };
        VCDataProvider.prototype.hasRemoteUnreadMessages = function (token, callback) {
            callback.onSuccess(false);
        };
        VCDataProvider.prototype.sendRecallMessage = function (content, sendMessageCallback) {
            var me = this;
            me.addon.recallMessage("RC:RcCmd", JSON.stringify(content), content.push || "", function () {
                content.objectName = 'RC:RcCmd';
                sendMessageCallback.onSuccess(me.buildMessage(JSON.stringify(content)));
            }, function (errorCode) {
                sendMessageCallback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.updateMessage = function (message, callback) { };
        VCDataProvider.prototype.updateMessages = function (conversationType, targetId, key, value, callback) { };
        VCDataProvider.prototype.reconnect = function (callback) {
            var token = RongIMLib.Bridge._client.token;
            this.disconnect();
            this.connect(token, callback);
        };
        VCDataProvider.prototype.sendReceiptResponse = function (conversationType, targetId, sendCallback) { };
        VCDataProvider.prototype.setMessageExtra = function (messageId, value, callback) { };
        VCDataProvider.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) { };
        VCDataProvider.prototype.createDiscussion = function (name, userIdList, callback) { };
        VCDataProvider.prototype.getDiscussion = function (discussionId, callback) { };
        VCDataProvider.prototype.quitDiscussion = function (discussionId, callback) { };
        VCDataProvider.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) { };
        VCDataProvider.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) { };
        VCDataProvider.prototype.setDiscussionName = function (discussionId, name, callback) { };
        VCDataProvider.prototype.setEnvironment = function (isPrivate) {
            this.addon.setEnvironment(isPrivate);
        };
        VCDataProvider.prototype.addConversation = function (conversation, callback) { };
        VCDataProvider.prototype.updateConversation = function (conversation) {
            return null;
        };
        VCDataProvider.prototype.getConversationNotificationStatus = function (params, callback) {
            var conversationType = params.conversationType;
            var targetId = params.targetId;
            var notification = RongIMLib.RongIMClient._memoryStore.notification;
            var key = conversationType + '_' + targetId;
            var status = notification[key];
            if (typeof status == 'number') {
                callback.onSuccess(status);
                return;
            }
            this.addon.getConversationNotificationStatus(conversationType, targetId, function (status) {
                notification[key] = status;
                callback.onSuccess(status);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.setConversationNotificationStatus = function (params, callback) {
            var conversationType = params.conversationType;
            var targetId = params.targetId;
            var status = params.status;
            var notification = RongIMLib.RongIMClient._memoryStore.notification;
            var key = conversationType + '_' + targetId;
            notification[key] = status;
            var notify = !!status;
            this.addon.setConversationNotificationStatus(conversationType, targetId, notify, function () {
                callback.onSuccess(status);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.getCurrentConnectionStatus = function () {
            return this.addon.getConnectionStatus();
        };
        VCDataProvider.prototype.getAgoraDynamicKey = function (engineType, channelName, callback) {
            var extra = "";
            this.addon.getVoIPKey(engineType, channelName, extra, function (token) {
                callback.onSuccess(token);
            }, function (errorCode) {
                callback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.getPublicServiceProfile = function (publicServiceType, publicServiceId, callback) {
            var profile = RongIMLib.RongIMClient._memoryStore.publicServiceMap.get(publicServiceType, publicServiceId);
            callback.onSuccess(profile);
        };
        VCDataProvider.prototype.setDeviceInfo = function (device) {
            var id = device.id || '';
            this.addon.setDeviceId(id);
        };
        VCDataProvider.prototype.getRemotePublicServiceList = function (callback, pullMessageTime) {
            var publicList = [];
            var ret = this.addon.getAccounts();
            var transformProto = function (ret) {
                var result = {
                    hasFollowed: false,
                    isGlobal: false,
                    menu: null
                };
                if (!ret.obj) {
                    var error = { error: ret };
                    throw new Error('公众账号数据格式错误: ' + JSON.stringify(error));
                }
                var obj = JSON.parse(ret.obj);
                var protoMap = {
                    aType: 'conversationType',
                    aId: 'publicServiceId',
                    aName: 'introduction',
                    aUri: 'portraitUri',
                    follow: 'hasFollowed',
                    isGlobal: 'isGlobal'
                };
                for (var key in obj) {
                    var val = obj[key];
                    if (key == 'aExtra') {
                        var extra = JSON.parse(val);
                        result["hasFollowed"] = extra.follow;
                        result["isGlobal"] = extra.isGlobal;
                        result["menu"] = extra.menu;
                    }
                    var uId = protoMap[key];
                    if (uId) {
                        result[uId] = val;
                    }
                }
                return result;
            };
            if (ret) {
                ret = JSON.parse(ret);
                var list = ret.list;
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list[i];
                    item = transformProto(item);
                    publicList.push(item);
                }
            }
            if (publicList.length > 0) {
                RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList.length = 0;
                RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList = publicList;
            }
            callback.onSuccess(RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList);
        };
        VCDataProvider.prototype.buildMessage = function (result) {
            var message = new RongIMLib.Message(), ret = JSON.parse(result);
            message.conversationType = ret.conversationType;
            message.targetId = ret.targetId;
            message.messageDirection = ret.direction;
            message.senderUserId = ret.senderUserId;
            if (ret.direction == RongIMLib.MessageDirection.RECEIVE) {
                message.receivedStatus = ret.status;
            }
            else if (ret.direction == RongIMLib.MessageDirection.SEND) {
                message.sentStatus = ret.status;
            }
            message.sentTime = ret.sentTime;
            message.objectName = ret.objectName;
            var content = ret.content ? JSON.parse(ret.content) : ret.content;
            var messageType = typeMapping[ret.objectName] || registerMessageTypeMapping[ret.objectName];
            if (content) {
                content.messageName = messageType;
            }
            message.content = content;
            message.messageId = ret.messageId;
            message.messageUId = ret.messageUid;
            message.messageType = messageType;
            return message;
        };
        VCDataProvider.prototype.buildConversation = function (val) {
            if (val === '') {
                return null;
            }
            var conver = new RongIMLib.Conversation(), c = JSON.parse(val), lastestMsg = c.lastestMsg ? this.buildMessage(c.lastestMsg) : {};
            conver.conversationTitle = c.title;
            conver.conversationType = c.conversationType;
            conver.draft = c.draft;
            conver.isTop = c.isTop;
            conver.isHidden = c.isHidden;
            lastestMsg.conversationType = c.conversationType;
            lastestMsg.targetId = c.targetId;
            conver.latestMessage = lastestMsg;
            conver.latestMessageId = lastestMsg.messageId;
            conver.latestMessage.messageType = typeMapping[lastestMsg.objectName] || registerMessageTypeMapping[lastestMsg.objectName];
            conver.objectName = lastestMsg.objectName;
            conver.receivedStatus = RongIMLib.ReceivedStatus.READ;
            conver.sentTime = lastestMsg.sentTime;
            conver.senderUserId = lastestMsg.senderUserId;
            conver.sentStatus = lastestMsg.status;
            conver.targetId = c.targetId;
            conver.unreadMessageCount = c.unreadCount;
            conver.hasUnreadMention = c.m_hasUnreadMention;
            var mentions = this.getUnreadMentionedMessages(c.conversationType, c.targetId);
            if (mentions.length > 0) {
                // 取最后一条 @ 消息,原因：和 web 互相兼容
                var mention = mentions.pop();
                conver.mentionedMsg = { uid: mention.messageUid, time: mention.sentTime, mentionedInfo: mention.content.mentionedInfo, sendUserId: mention.senderUserId };
            }
            return conver;
        };
        VCDataProvider.prototype.getRTCUserInfoList = function (room, callback) {
            this.addon.getRTCUsers(room.id, 1, function (result) {
                callback.onSuccess(result);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.getRTCRoomInfo = function (room, callback) {
            var order = 2;
            this.addon.getRTCResouce(room.id, order, function (result) {
                callback.onSuccess(JSON.parse(result));
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.joinRTCRoom = function (room, callback) {
            var id = room.id;
            var type = room.type || 0;
            this.addon.joinRTCRoom(id, type, function (result, token) {
                var res = JSON.parse(result);
                var users = {};
                var list = res.list;
                RongIMLib.RongUtil.forEach(list, function (item) {
                    var userId = item.id;
                    var tmpData = {};
                    RongIMLib.RongUtil.forEach(item.data, function (data) {
                        var key = data.key;
                        var value = data.value;
                        tmpData[key] = value;
                    });
                    users[userId] = tmpData;
                });
                callback.onSuccess({
                    users: users,
                    token: token
                });
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.quitRTCRoom = function (room, callback) {
            this.addon.exitRTCRoom(room.id, function () {
                callback.onSuccess(true);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.RTCPing = function (room, callback) {
            this.addon.sendRTCPing(room.id, function () {
                callback.onSuccess(true);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.setRTCData = function (roomId, key, value, isInner, apiType, callback, message) {
            var context = this;
            var hanlders = {
                room_inner: function (roomId, key, value, name, content, success, error) {
                    context.addon.setRTCInnerData(roomId, RongIMLib.RTCAPIType.ROOM, key, value, name, content, success, error);
                },
                room_outer: function (roomId, key, value, name, content, success, error) {
                    context.addon.setRTCOuterData(roomId, RongIMLib.RTCAPIType.ROOM, key, value, name, content, success, error);
                },
                user_inner: function (roomId, key, value, name, content, success, error) {
                    context.addon.setRTCInnerData(roomId, RongIMLib.RTCAPIType.PERSON, key, value, name, content, success, error);
                },
                user_outer: function (roomId, key, value, name, content, success, error) {
                    context.addon.setRTCOuterData(roomId, RongIMLib.RTCAPIType.PERSON, key, value, name, content, success, error);
                }
            };
            var type = RongIMLib.RTCAPIType.PERSON == apiType ? 'user' : 'room';
            var direction = isInner ? 'inner' : 'outer';
            var tpl = '{type}_{direction}';
            var name = RongIMLib.RongUtil.tplEngine(tpl, {
                type: type,
                direction: direction
            });
            var handler = hanlders[name];
            if (handler) {
                message = message || {};
                var name = message.name;
                var content = message.content;
                handler(roomId, key, value, name, content, function () {
                    callback.onSuccess(true);
                }, function (code) {
                    callback.onError(code);
                });
            }
        };
        VCDataProvider.prototype.setRTCRoomData = function (roomId, key, value, isInner, callback, message) {
            this.setRTCData(roomId, key, value, isInner, RongIMLib.RTCAPIType.ROOM, callback, message);
        };
        VCDataProvider.prototype.getRTCData = function (roomId, keys, isInner, apiType, callback) {
            var context = this;
            var hanlders = {
                room_inner: function (roomId, keys, success, error) {
                    context.addon.getRTCInnerData(roomId, RongIMLib.RTCAPIType.ROOM, keys, success, error);
                },
                room_outer: function (roomId, keys, success, error) {
                    context.addon.getRTCOuterData(roomId, RongIMLib.RTCAPIType.ROOM, keys, success, error);
                }
            };
            var type = RongIMLib.RTCAPIType.PERSON == apiType ? 'user' : 'room';
            var direction = isInner ? 'inner' : 'outer';
            var tpl = '{type}_{direction}';
            var name = RongIMLib.RongUtil.tplEngine(tpl, {
                type: type,
                direction: direction
            });
            var handler = hanlders[name];
            if (handler) {
                handler(roomId, keys, function (result) {
                    var res = JSON.parse(result);
                    var props = {};
                    var list = res.list;
                    RongIMLib.RongUtil.forEach(list, function (item) {
                        props[item.key] = item.value;
                    });
                    callback.onSuccess(props);
                }, function (code) {
                    callback.onError(code);
                });
            }
        };
        VCDataProvider.prototype.getRTCRoomData = function (roomId, keys, isInner, callback, message) {
            this.getRTCData(roomId, keys, isInner, RongIMLib.RTCAPIType.ROOM, callback);
        };
        VCDataProvider.prototype.removeRTCData = function (roomId, keys, isInner, apiType, callback, message) {
            var context = this;
            var hanlders = {
                room_inner: function (roomId, keys, name, content, success, error) {
                    context.addon.deleteRTCInnerData(roomId, RongIMLib.RTCAPIType.ROOM, keys, name, content, success, error);
                },
                room_outer: function (roomId, keys, name, content, success, error) {
                    context.addon.deleteRTCOuterData(roomId, RongIMLib.RTCAPIType.ROOM, keys, name, content, success, error);
                },
                user_inner: function (roomId, keys, name, content, success, error) {
                },
                user_outer: function (roomId, keys, name, content, success, error) {
                }
            };
            var type = RongIMLib.RTCAPIType.PERSON == apiType ? 'user' : 'room';
            var direction = isInner ? 'inner' : 'outer';
            var tpl = '{type}_{direction}';
            var name = RongIMLib.RongUtil.tplEngine(tpl, {
                type: type,
                direction: direction
            });
            var handler = hanlders[name];
            if (handler) {
                message = message || {};
                var name = message.name || '';
                var content = message.content || '';
                handler(roomId, keys, name, content, function () {
                    callback.onSuccess(true);
                }, function (code) {
                    callback.onError(code);
                });
            }
        };
        VCDataProvider.prototype.removeRTCRoomData = function (roomId, keys, isInner, callback, message) {
            this.removeRTCData(roomId, keys, isInner, RongIMLib.RTCAPIType.ROOM, callback);
        };
        VCDataProvider.prototype.getNavi = function () {
            var nav = this.addon.getNav();
            return nav[this.userId];
        };
        // 信令 SDK 新增
        VCDataProvider.prototype.setRTCOutData = function (roomId, data, type, callback, message) {
        };
        // 信令 SDK 新增
        VCDataProvider.prototype.getRTCOutData = function (roomId, userId, callback) {
        };
        VCDataProvider.prototype.setRTCUserInfo = function (room, info, callback) {
        };
        VCDataProvider.prototype.removeRTCUserInfo = function (room, info, callback) {
        };
        VCDataProvider.prototype.getRTCUserList = function (room, callback) {
        };
        VCDataProvider.prototype.setRTCRoomInfo = function (room, data, callback) {
        };
        VCDataProvider.prototype.removeRTCRoomInfo = function (room, data, callback) {
        };
        VCDataProvider.prototype.setRTCUserData = function (roomId, key, value, isInner, callback, message) {
            this.setRTCData(roomId, key, value, isInner, RongIMLib.RTCAPIType.PERSON, callback, message);
        };
        VCDataProvider.prototype.setRTCUserTotalRes = function (roomId, message, valueInfo, objectName, callback) {
            // TODO
        };
        VCDataProvider.prototype.getRTCUserData = function (roomId, key, isInner, callback, message) {
        };
        VCDataProvider.prototype.removeRTCUserData = function (roomId, key, isInner, callback, message) {
        };
        VCDataProvider.prototype.getRTCToken = function (room, callback) {
        };
        VCDataProvider.prototype.setRTCState = function (room, content, callback) {
        };
        return VCDataProvider;
    })();
    RongIMLib.VCDataProvider = VCDataProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    (function (LoggerLevel) {
        LoggerLevel[LoggerLevel["F"] = 0] = "F";
        LoggerLevel[LoggerLevel["E"] = 1] = "E";
        LoggerLevel[LoggerLevel["W"] = 2] = "W";
        LoggerLevel[LoggerLevel["I"] = 3] = "I";
        LoggerLevel[LoggerLevel["D"] = 4] = "D"; //debug
    })(RongIMLib.LoggerLevel || (RongIMLib.LoggerLevel = {}));
    var LoggerLevel = RongIMLib.LoggerLevel;
    (function (LoggerStoreSize) {
        LoggerStoreSize[LoggerStoreSize["ADVANCED"] = 500] = "ADVANCED";
        LoggerStoreSize[LoggerStoreSize["LOW"] = 500] = "LOW";
    })(RongIMLib.LoggerStoreSize || (RongIMLib.LoggerStoreSize = {}));
    var LoggerStoreSize = RongIMLib.LoggerStoreSize;
    var LoggerType = (function () {
        function LoggerType() {
        }
        LoggerType.IM = 'IM';
        LoggerType.RTC = 'RTC';
        return LoggerType;
    })();
    RongIMLib.LoggerType = LoggerType;
    var LoggerTag = (function () {
        function LoggerTag() {
        }
        /**
         * 三段式关键字: "发起方-任务类型-结果类型"
         * A: App 层，L: Lib 层，N: 调用 Native 层接口，P: Protocol 层
         * O: 操作，S: 状态，T: 任务，R: 结果，E: 错误
         */
        LoggerTag.IM = {
            A_INIT_O: 'A-init-O',
            A_CONN_T: 'A-connect-T',
            A_CONN_R: 'A-connect-R',
            A_CONN_E: 'A-connect-E',
            L_RECO_T: 'L-reconnect-T',
            L_RECO_R: 'L-reconnect-R',
            L_RECO_E: 'L-reconnect-E',
            L_GETN_T: 'L-get_navi-T',
            L_GETN_R: 'L-get_navi-R',
            L_PING_WS_T: 'L-ping_ws-T',
            L_PING_WS_R: 'L-ping_ws-R',
            L_NETC_S: 'L-network_changed-S',
            A_DISC_O: 'A-disconnect-O',
            A_JCTR_T: 'A-join_chatroom-T',
            A_JCTR_R: 'A-join_chatroom-R',
            A_QCTR_T: 'A-quit_chatroom-T',
            A_QCTR_R: 'A-quit_chatroom-R',
            A_INIT_CMD_MSG_E: 'A-instantiate_command_message-E',
            A_INIT_PROFILE_MSG_E: 'A-instantiate_profile_notify_message-E',
            A_INIT_CMD_NOTI_MSG_E: 'A-instantiate_command_notify_message-E',
            L_CHRM_PULL_E: 'L-chatroom_pull-E',
            L_QUERY_MSG_E: 'L-query_message-E',
            L_DECODE_MSG_E: 'L-decode_upstream_message-E',
            L_CATCH_UNKNOWN_MSG_E: 'L-catch_unknown_message-E',
            L_DECODE_QUERY_DATA_E: 'L-decode_query_data-E',
            L_PARSE_MSG_E: 'L-parse_message-E',
            L_WS_ERR_E: 'L-websocket-error-E',
            G_CRAW_E: 'G-crash-E',
            G_UP_LOG_S: 'G-upload_log-S',
            G_UP_LOG_E: 'G-upload_log-E'
        };
        return LoggerTag;
    })();
    RongIMLib.LoggerTag = LoggerTag;
    var LoggerReportType = (function () {
        function LoggerReportType() {
        }
        LoggerReportType.REAL_TIME_LOG = 'RealTimeLog';
        LoggerReportType.MSG_NOTIF_LOG = 'MessageNotificationLog';
        return LoggerReportType;
    })();
    RongIMLib.LoggerReportType = LoggerReportType;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var Logger = (function () {
        function Logger() {
        }
        Logger.writeLog = function (log) {
            var self = this;
            if (RongIMLib.RongIMClient._memoryStore.loggerSwitch === "off") {
                return;
            }
            var networkUnavailable = RongIMLib.RongIMClient._memoryStore.networkUnavailable;
            var isLowLevelBro = RongIMLib.LoggerUtil.isLowLevelBro();
            log.time = new Date().getTime();
            log.sessionId = RongIMLib.LoggerUtil.getSessionId();
            log.content = log.content && JSON.stringify(log.content);
            if (networkUnavailable) {
                if (log.level == RongIMLib.LoggerLevel.E || log.level == RongIMLib.LoggerLevel.W) {
                    log.level = RongIMLib.LoggerLevel.I;
                }
            }
            self.logStore.push(log);
            var _handleOverflowLog = function (size) {
                if (self.logStore.length > size) {
                    var delLength = self.logStore.length - size;
                    self.logStore.splice(0, delLength);
                }
            };
            if (isLowLevelBro) {
                _handleOverflowLog(RongIMLib.LoggerStoreSize.LOW);
            }
            else {
                _handleOverflowLog(RongIMLib.LoggerStoreSize.ADVANCED);
            }
        };
        Logger.reportRTLog = function () {
            var self = this;
            var isUserCloseLogger = RongIMLib.RongIMClient._memoryStore.loggerSwitch === "off";
            if (self.loggerCache.hasStarted || isUserCloseLogger) {
                return;
            }
            self.loggerCache.hasStarted = true;
            var policy = this.defaultLogPolicy;
            var isDefaultUpload = true;
            var currentTime = 1;
            var _robustUpload = function () {
                var isOpen = policy.logSwitch;
                var itv = policy.itv * 1000;
                var times = policy.times;
                var url = policy.url;
                var level = policy.level;
                var realItv = itv * Math.pow(2, currentTime - 1);
                if (currentTime < times) {
                    currentTime++;
                }
                if (!isOpen) {
                    return;
                }
                setTimeout(function () {
                    var csvLog = RongIMLib.LoggerUtil.handleLog({ level: level, type: RongIMLib.LoggerReportType.REAL_TIME_LOG });
                    var encodeCsvLog = RongIMLib.TextCompressor.compress(csvLog);
                    var entireUrl = RongIMLib.LoggerUtil.getEntireUrl({ url: url, type: RongIMLib.LoggerReportType.REAL_TIME_LOG });
                    if (self.loggerCache.isNewNavi) {
                        currentTime = 1;
                        policy = RongIMLib.LoggerUtil.getNaviPolicy();
                        self.loggerCache.isNewNavi = false;
                    }
                    if (isDefaultUpload) {
                        currentTime = 1;
                        isDefaultUpload = false;
                        policy = RongIMLib.LoggerUtil.getNaviPolicy(); // 更新 navi 中配置下次用
                    }
                    if (csvLog.length == 0) {
                        policy = RongIMLib.LoggerUtil.getNaviPolicy();
                        _robustUpload();
                        return;
                    }
                    RongIMLib.RongUtil.request({
                        url: entireUrl,
                        method: 'POST',
                        body: encodeCsvLog,
                        timeout: policy.timeout * 1000,
                        success: function (data) {
                            Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.G_UP_LOG_S, level: RongIMLib.LoggerLevel.D, type: RongIMLib.LoggerType.IM, content: {
                                    desc: 'report real-time log'
                                } });
                            //第一次成功后，如果导航有数据使用导航数据，导航无数据关闭上传。第二次上传成功后返回数据使用返回数据
                            if (!isOpen) {
                                return;
                            }
                            if (data) {
                                data = JSON.parse(data);
                                policy.itv = data.nextTime;
                                policy.level = data.level;
                                policy.logSwitch = data.logSwitch;
                                currentTime = 1;
                            }
                            _robustUpload();
                        },
                        error: function (status, resText) {
                            _robustUpload();
                            Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.G_UP_LOG_E, level: RongIMLib.LoggerLevel.D, type: RongIMLib.LoggerType.IM, content: {
                                    desc: 'report real-time log',
                                    status: status,
                                    resText: resText
                                } });
                        }
                    });
                }, realItv);
            };
            _robustUpload();
        };
        Logger.reportMNLog = function (policy) {
            var self = this;
            var currentTime = 1;
            var connectTime = RongIMLib.RongIMClient._memoryStore.connectAckTime;
            if (policy.platform !== 'Web' || policy.logId === self.loggerCache.logId) {
                return;
            }
            self.loggerCache.logId = policy.logId;
            var _robustUpload = function () {
                var itv = 5000;
                var times = 3;
                itv = itv * Math.pow(2, currentTime - 2);
                if (currentTime === 1) {
                    itv = 0;
                }
                if (currentTime <= times) {
                    currentTime++;
                }
                else {
                    return;
                }
                setTimeout(function () {
                    var csvLog = RongIMLib.LoggerUtil.handleLog({ level: RongIMLib.LoggerLevel.D, startTime: policy.startTime, endTime: policy.endTime, type: RongIMLib.LoggerReportType.MSG_NOTIF_LOG });
                    if (csvLog.length === 0 && policy.endTime < connectTime) {
                        //没有日志且连接时间大于日志消息结束时间，说明此日志消息过期，无需上传
                        return;
                    }
                    else if (csvLog.length === 0 && policy.endTime > connectTime) {
                        //没有日志且连接时间小于日志消息结束时间，说明用户连接时间在需要获取的时间内,没有日志上传 nodata
                        csvLog = 'nodata';
                    }
                    var encodeCsvLog = RongIMLib.TextCompressor.compress(csvLog);
                    var entireUrl = RongIMLib.LoggerUtil.getEntireUrl({ url: policy.uri, logId: policy.logId, type: RongIMLib.LoggerReportType.MSG_NOTIF_LOG });
                    RongIMLib.RongUtil.request({
                        url: entireUrl,
                        method: 'POST',
                        body: encodeCsvLog,
                        timeout: self.defaultLogPolicy.timeout * 1000,
                        success: function () {
                            Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.G_UP_LOG_S, level: RongIMLib.LoggerLevel.D, type: RongIMLib.LoggerType.IM, content: {
                                    desc: 'report message notification log'
                                } });
                        },
                        error: function (status, resText) {
                            _robustUpload();
                            Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.G_UP_LOG_E, level: RongIMLib.LoggerLevel.D, type: RongIMLib.LoggerType.IM, content: {
                                    desc: 'report message notification log',
                                    status: status,
                                    resText: resText
                                } });
                        }
                    });
                }, itv);
            };
            _robustUpload();
        };
        Logger.logStore = [];
        Logger.defaultLogPolicy = {
            "logSwitch": 1,
            "url": 'logcollection.ronghub.com/',
            "level": RongIMLib.LoggerLevel.E,
            "itv": 20,
            "times": 5,
            "timeout": 15
        };
        Logger.loggerCache = {
            userId: '',
            logId: 'none',
            isNewNavi: false,
            hasStarted: false
        };
        return Logger;
    })();
    RongIMLib.Logger = Logger;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var LoggerUtil = (function () {
        function LoggerUtil() {
        }
        LoggerUtil.isLowLevelBro = function () {
            var flag = false;
            var bro = RongIMLib.RongUtil.getBrower();
            if (bro.type == 'IE' && bro.version < 9) {
                flag = true;
            }
            return flag;
        };
        LoggerUtil.isRealTimeLogType = function (type) {
            return type === RongIMLib.LoggerReportType.REAL_TIME_LOG;
        };
        LoggerUtil.handleLog = function (conf) {
            var self = this;
            var csvLog = '';
            var logs = RongIMLib.Logger.logStore;
            var lastIndex = 0;
            if (self.isRealTimeLogType(conf.type)) {
                RongIMLib.RongUtil.forEach(logs, function (log, index) {
                    if (log.time > self.lastTime && log.level <= conf.level) {
                        csvLog += self.genCSVLog(log);
                        lastIndex = index;
                    }
                });
                if (csvLog.length !== 0) {
                    self.lastTime = logs[lastIndex].time;
                }
            }
            else {
                RongIMLib.RongUtil.forEach(logs, function (log) {
                    if (log.level <= conf.level && log.time >= conf.startTime && log.time <= conf.endTime) {
                        csvLog += self.genCSVLog(log);
                    }
                });
            }
            return csvLog;
        };
        LoggerUtil.getNaviPolicy = function () {
            var navi = RongIMLib.RongIMClient._storageProvider.getItem("fullnavi") || "{}";
            var fullNavi = navi && JSON.parse(navi);
            var policy = {};
            var logPolicy = fullNavi.logPolicy || "{}";
            var logSwitch = fullNavi.logSwitch;
            policy = logPolicy && JSON.parse(logPolicy);
            policy.logSwitch = logSwitch;
            return policy;
        };
        LoggerUtil.genDeviceId = function () {
            var deviceId = '';
            var key = 'deviceId';
            var isSupportLS = RongIMLib.RongUtil.supportLocalStorage();
            var isSupportSS = RongIMLib.RongUtil.supportSessionStorage();
            var loggerStorage;
            if (isSupportLS) {
                loggerStorage = new RongIMLib.LocalStorageProvider();
            }
            else if (isSupportSS) {
                loggerStorage = new RongIMLib.sessionStorageProvider();
            }
            else {
                loggerStorage = new RongIMLib.MemeoryProvider();
            }
            var hasDeviceId = loggerStorage.getItem(key);
            if (hasDeviceId) {
                deviceId = loggerStorage.getItem(key);
            }
            else {
                loggerStorage.removeItem(key);
                var uuid = RongIMLib.RongUtil.getUUID22();
                loggerStorage.setItem(key, uuid);
                deviceId = uuid;
            }
            return deviceId;
        };
        LoggerUtil.getSessionId = function () {
            var sessionId = '';
            var key = 'sessionId';
            var sessionStorage;
            var isSupportSS = RongIMLib.RongUtil.supportSessionStorage();
            if (isSupportSS) {
                sessionStorage = new RongIMLib.sessionStorageProvider();
            }
            else {
                sessionStorage = new RongIMLib.MemeoryProvider();
            }
            var hasSessionId = sessionStorage.getItem(key);
            if (hasSessionId) {
                sessionId = sessionStorage.getItem(key);
            }
            else {
                sessionStorage.removeItem(key);
                var val = RongIMLib.RongUtil.getUUID22();
                sessionStorage.setItem(key, val);
                sessionId = val;
            }
            return sessionId;
        };
        LoggerUtil.getDeviceInfo = function () {
            var self = this;
            var browerInfo = RongIMLib.RongUtil.getBrower();
            var sessionId = self.getSessionId().slice(0, 10);
            var infoTpl = '{brower}|{version}|{sessionId}';
            return RongIMLib.RongUtil.tplEngine(infoTpl, {
                brower: browerInfo.type,
                version: browerInfo.version,
                sessionId: sessionId
            });
        };
        LoggerUtil.getEntireUrl = function (opt) {
            var self = this;
            var tLogTpl = '{protocol}{url}?version={version}&appkey={appkey}&userId={userId}&deviceId={deviceId}&deviceInfo={deviceInfo}&platform={platform}';
            var mLogTpl = '{protocol}{url}?version={version}&appkey={appkey}&userId={userId}&logId={logId}&deviceId={deviceId}&deviceInfo={deviceInfo}&platform={platform}';
            var entireUrl = '';
            var protocol = "https://";
            if (location.protocol == "http:") {
                protocol = "http://";
            }
            var paramObj = {
                protocol: protocol,
                url: opt.url,
                version: RongIMLib.RongIMClient.sdkver || 'Unknown version',
                appkey: RongIMLib.RongIMClient._memoryStore.appKey || 'Unknown appkey',
                deviceId: self.genDeviceId(),
                deviceInfo: self.getDeviceInfo(),
                platform: 'Web',
                userId: RongIMLib.Logger.loggerCache.userId || ''
            };
            if (self.isRealTimeLogType(opt.type)) {
                entireUrl = RongIMLib.RongUtil.tplEngine(tLogTpl, paramObj);
            }
            else {
                entireUrl = RongIMLib.RongUtil.tplEngine(mLogTpl, RongIMLib.RongUtil.extend(paramObj, {
                    logId: opt.logId
                }));
            }
            return entireUrl;
        };
        LoggerUtil.genCSVLog = function (log) {
            var tpl = '{sessionId},{time},{type},{level},{tag},{content}\n';
            if (log.content) {
                var content = '"' + log.content.replace(/\"/g, '""') + '"';
            }
            var csvLog = RongIMLib.RongUtil.tplEngine(tpl, {
                sessionId: log.sessionId,
                time: log.time,
                type: log.type,
                level: log.level,
                tag: log.tag,
                content: content || '""'
            });
            return csvLog;
        };
        LoggerUtil.isLogCmdMsg = function (message) {
            var flag = false;
            if (message.messageType === RongIMLib.RongIMClient.MessageType["LogCommandMessage"] && message.senderUserId === 'rongcloudsystem') {
                flag = true;
            }
            return flag;
        };
        LoggerUtil.recordFatalLogOfNavi = function (internalRetry, navigators) {
            if (internalRetry === 3) {
                RongIMLib.Logger.writeLog({ tag: RongIMLib.LoggerTag.IM.L_GETN_R, level: RongIMLib.LoggerLevel.F, type: RongIMLib.LoggerType.IM, content: {
                        desc: 'Request navigation failed 3 times',
                        navigators: navigators
                    } });
            }
        };
        LoggerUtil.lastTime = 0;
        return LoggerUtil;
    })();
    RongIMLib.LoggerUtil = LoggerUtil;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var MemeoryProvider = (function () {
        function MemeoryProvider() {
            this._memeoryStore = {};
            this.prefix = "rong_";
        }
        MemeoryProvider.prototype.setItem = function (composedKey, object) {
            this._memeoryStore[composedKey] = decodeURIComponent(object);
        };
        MemeoryProvider.prototype.getItem = function (composedKey) {
            return this._memeoryStore[composedKey];
        };
        MemeoryProvider.prototype.removeItem = function (composedKey) {
            if (this.getItem(composedKey)) {
                delete this._memeoryStore[composedKey];
            }
        };
        MemeoryProvider.prototype.getItemKey = function (regStr) {
            var me = this, item = null, reg = new RegExp(regStr + "\\w+");
            for (var key in me._memeoryStore) {
                var arr = key.match(reg);
                if (arr) {
                    item = key;
                }
            }
            return item;
        };
        MemeoryProvider.prototype.getItemKeyList = function (regStr) {
            var prefix = this.prefix;
            var me = this, itemList = [], reg = new RegExp(regStr + "\\w+");
            for (var key in me._memeoryStore) {
                var arr = key.match(reg);
                if (arr) {
                    key = key.substring(prefix.length);
                    itemList.push(key);
                }
            }
            return itemList;
        };
        MemeoryProvider.prototype.clearItem = function () {
            var me = this;
            for (var key in me._memeoryStore) {
                delete me._memeoryStore[key];
            }
        };
        //单位：字节
        MemeoryProvider.prototype.onOutOfQuota = function () {
            return 4 * 1024;
        };
        return MemeoryProvider;
    })();
    RongIMLib.MemeoryProvider = MemeoryProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var LocalStorageProvider = (function () {
        // static _instance: LocalStorageProvider = new LocalStorageProvider();
        function LocalStorageProvider() {
            this.prefix = 'rong_';
            this._host = "";
            var d = new Date(), m = d.getMonth() + 1, date = d.getFullYear() + '/' + (m.toString().length == 1 ? '0' + m : m) + '/' + d.getDate(), nowDate = new Date(date).getTime();
            for (var key in localStorage) {
                if (key.lastIndexOf('RECEIVED') > -1) {
                    var recObj = JSON.parse(localStorage.getItem(key));
                    for (var key_1 in recObj) {
                        nowDate - recObj[key_1].dealtime > 0 && (delete recObj[key_1]);
                    }
                    if (RongIMLib.RongUtil.isEmpty(recObj)) {
                        localStorage.removeItem(key);
                    }
                    else {
                        localStorage.setItem(key, JSON.stringify(recObj));
                    }
                }
                if (key.lastIndexOf('SENT') > -1) {
                    var sentObj = JSON.parse(localStorage.getItem(key));
                    nowDate - sentObj.dealtime > 0 && (localStorage.removeItem(key));
                }
            }
        }
        LocalStorageProvider.prototype.setItem = function (composedKey, object) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                localStorage.setItem(composedKey, object);
            }
        };
        LocalStorageProvider.prototype.getItem = function (composedKey) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                return localStorage.getItem(composedKey ? composedKey : "");
            }
            return "";
        };
        LocalStorageProvider.prototype.getItemKey = function (composedStr) {
            var item = "";
            var _key = this.prefix + composedStr;
            for (var key in localStorage) {
                if (key.indexOf(_key) == 0) {
                    item = key;
                    break;
                }
            }
            return item;
        };
        LocalStorageProvider.prototype.getItemKeyList = function (composedStr) {
            var itemList = [];
            var prefix = this.prefix;
            var _key = prefix + composedStr;
            for (var key in localStorage) {
                if (key.indexOf(_key) == 0) {
                    key = key.substring(prefix.length);
                    itemList.push(key);
                }
            }
            return itemList;
        };
        LocalStorageProvider.prototype.removeItem = function (composedKey) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                localStorage.removeItem(composedKey.toString());
            }
        };
        LocalStorageProvider.prototype.clearItem = function () {
            var me = this;
            for (var key in localStorage) {
                if (key.indexOf(me.prefix) > -1) {
                    me.removeItem(key);
                }
            }
        };
        //单位：字节
        LocalStorageProvider.prototype.onOutOfQuota = function () {
            return JSON.stringify(localStorage).length;
        };
        return LocalStorageProvider;
    })();
    RongIMLib.LocalStorageProvider = LocalStorageProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var sessionStorageProvider = (function () {
        function sessionStorageProvider() {
            this.prefix = 'rong_';
            this._host = "";
        }
        sessionStorageProvider.prototype.setItem = function (composedKey, object) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                sessionStorage.setItem(composedKey, object);
            }
        };
        sessionStorageProvider.prototype.getItem = function (composedKey) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                return sessionStorage.getItem(composedKey ? composedKey : "");
            }
            return '';
        };
        sessionStorageProvider.prototype.getItemKey = function (composedStr) {
            var item = "";
            var _key = this.prefix + composedStr;
            for (var key in sessionStorage) {
                if (key.indexOf(_key) == 0) {
                    item = key;
                    break;
                }
            }
            return item;
        };
        sessionStorageProvider.prototype.getItemKeyList = function (composedStr) {
            var itemList = [];
            var prefix = this.prefix;
            var _key = prefix + composedStr;
            for (var key in sessionStorage) {
                if (key.indexOf(_key) == 0) {
                    key = key.substring(prefix.length);
                    itemList.push(key);
                }
            }
            return itemList;
        };
        sessionStorageProvider.prototype.removeItem = function (composedKey) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                sessionStorage.removeItem(composedKey.toString());
            }
        };
        sessionStorageProvider.prototype.clearItem = function () {
            var me = this;
            for (var key in sessionStorage) {
                if (key.indexOf(me.prefix) > -1) {
                    me.removeItem(key);
                }
            }
        };
        sessionStorageProvider.prototype.onOutOfQuota = function () {
            return JSON.stringify(sessionStorage).length;
        };
        return sessionStorageProvider;
    })();
    RongIMLib.sessionStorageProvider = sessionStorageProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var UserDataProvider = (function () {
        function UserDataProvider() {
            this.opersistName = 'RongIMLib';
            this.keyManager = 'RongUserDataKeyManager';
            this._host = "";
            this.prefix = "rong_";
            this.oPersist = document.createElement("div");
            this.oPersist.style.display = "none";
            this.oPersist.style.behavior = "url('#default#userData')";
            document.body.appendChild(this.oPersist);
            this.oPersist.load(this.opersistName);
        }
        UserDataProvider.prototype.setItem = function (key, value) {
            key && key.indexOf(this.prefix) == -1 && (key = this.prefix + key);
            this.oPersist.setAttribute(key, value);
            var keyNames = this.getItem(this.keyManager);
            keyNames ? keyNames.indexOf(key) == -1 && (keyNames += ',' + key) : (keyNames = key);
            this.oPersist.setAttribute(this.prefix + this.keyManager, keyNames);
            this.oPersist.save(this.opersistName);
        };
        UserDataProvider.prototype.getItem = function (key) {
            key && key.indexOf(this.prefix) == -1 && (key = this.prefix + key);
            return key ? this.oPersist.getAttribute(key) : key;
        };
        UserDataProvider.prototype.removeItem = function (key) {
            key && key.indexOf(this.prefix) == -1 && (key = this.prefix + key);
            this.oPersist.removeAttribute(key);
            this.oPersist.save(this.opersistName);
            var keyNames = this.getItem(this.keyManager), keyNameArray = keyNames && keyNames.split(',') || [];
            for (var i = 0, len = keyNameArray.length; i < len; i++) {
                if (keyNameArray[i] == key) {
                    keyNameArray.splice(i, 1);
                }
            }
            this.oPersist.setAttribute(this.prefix + this.keyManager, keyNameArray.join(','));
            this.oPersist.save(this.opersistName);
        };
        UserDataProvider.prototype.getItemKey = function (composedStr) {
            var item = null, keyNames = this.getItem(this.keyManager), keyNameArray = keyNames && keyNames.split(',') || [], me = this;
            var _key = this.prefix + composedStr;
            if (keyNameArray.length) {
                for (var i = 0, len = keyNameArray.length; i < len; i++) {
                    if (keyNameArray[i] && keyNameArray[i].indexOf(_key) == 0) {
                        item = keyNameArray[i];
                        break;
                    }
                }
            }
            return item;
        };
        UserDataProvider.prototype.getItemKeyList = function (composedStr) {
            var itemList = [], keyNames = this.getItem(this.keyManager), keyNameArray = keyNames && keyNames.split(',') || [];
            var prefix = this.prefix;
            var _key = prefix + composedStr;
            if (keyNameArray.length) {
                for (var i = 0, len = keyNameArray.length; i < len; i++) {
                    if (keyNameArray[i] && keyNameArray[i].indexOf(_key) == 0) {
                        var keyName = keyNameArray[i];
                        keyName = keyName.substring(prefix.length);
                        itemList.push(keyNameArray[i]);
                    }
                }
            }
            return itemList;
        };
        UserDataProvider.prototype.clearItem = function () {
            var keyNames = this.getItem(this.keyManager), keyNameArray = [], me = this;
            keyNames && (keyNameArray = keyNames.split(','));
            if (keyNameArray.length) {
                for (var i = 0, len = keyNameArray.length; i < len; i++) {
                    keyNameArray[i] && me.removeItem(keyNameArray[i]);
                }
                me.removeItem(me.keyManager);
            }
        };
        UserDataProvider.prototype.onOutOfQuota = function () {
            return 10 * 1024 * 1024;
        };
        return UserDataProvider;
    })();
    RongIMLib.UserDataProvider = UserDataProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var FeatureDectector = (function () {
        function FeatureDectector(callback) {
            this.script = document.createElement("script");
            this.head = document.getElementsByTagName("head")[0];
            if ("WebSocket" in window && "ArrayBuffer" in window && WebSocket.prototype.CLOSED === 3 && !RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                RongIMLib.Transportations._TransportType = RongIMLib.Socket.WEBSOCKET;
                if (!RongIMLib.RongIMClient.Protobuf) {
                    var url = RongIMLib.RongIMClient._memoryStore.depend.protobuf;
                    var script = this.script;
                    script.src = url;
                    this.head.appendChild(script);
                    script.onload = script.onreadystatechange = function () {
                        var isLoaded = (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete');
                        if (isLoaded) {
                            // 防止 IE6、7 下偶发触发两次 loaded
                            script.onload = script.onreadystatechange = null;
                            if (callback) {
                                callback();
                            }
                            if (!callback) {
                                var token = RongIMLib.RongIMClient._memoryStore.token;
                                var connectCallback = RongIMLib.RongIMClient._memoryStore.callback;
                                token && RongIMLib.RongIMClient.connect(token, connectCallback, null, {
                                    isIgnoreReportStart: true
                                });
                            }
                        }
                    };
                }
            }
            else {
                RongIMLib.Transportations._TransportType = "xhr-polling";
                RongIMLib.RongIMClient.Protobuf = Polling;
            }
        }
        return FeatureDectector;
    })();
    RongIMLib.FeatureDectector = FeatureDectector;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var FeaturePatcher = (function () {
        function FeaturePatcher() {
        }
        FeaturePatcher.prototype.patchAll = function () {
            this.patchJSON();
            this.patchForEach();
        };
        FeaturePatcher.prototype.patchForEach = function () {
            if (!Array.forEach) {
                Array.forEach = function (arr, func) {
                    for (var i = 0; i < arr.length; i++) {
                        func.call(arr, arr[i], i, arr);
                    }
                };
            }
        };
        FeaturePatcher.prototype.patchJSON = function () {
            if (!window["JSON"]) {
                window["JSON"] = (function () {
                    function JSON() {
                    }
                    JSON.parse = function (sJSON) {
                        return eval('(' + sJSON + ')');
                    };
                    JSON.stringify = function (value) {
                        return this.str("", { "": value });
                    };
                    JSON.str = function (key, holder) {
                        var i, k, v, length, mind = "", partial, value = holder[key], me = this;
                        if (value && typeof value === "object" && typeof value.toJSON === "function") {
                            value = value.toJSON(key);
                        }
                        switch (typeof value) {
                            case "string":
                                return me.quote(value);
                            case "number":
                                return isFinite(value) ? String(value) : "null";
                            case "boolean":
                            case "null":
                                return String(value);
                            case "object":
                                if (!value) {
                                    return "null";
                                }
                                partial = [];
                                if (Object.prototype.toString.apply(value) === "[object Array]") {
                                    length = value.length;
                                    for (i = 0; i < length; i += 1) {
                                        partial[i] = me.str(i, value) || "null";
                                    }
                                    v = partial.length === 0 ? "[]" : "[" + partial.join(",") + "]";
                                    return v;
                                }
                                for (k in value) {
                                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                                        v = me.str(k, value);
                                        if (v) {
                                            partial.push(me.quote(k) + ":" + v);
                                        }
                                    }
                                }
                                v = partial.length === 0 ? "{}" : "{" + partial.join(",") + "}";
                                return v;
                        }
                    };
                    JSON.quote = function (string) {
                        var me = this;
                        me.rx_escapable.lastIndex = 0;
                        return me.rx_escapable.test(string) ? '"' + string.replace(me.rx_escapable, function (a) {
                            var c = me.meta[a];
                            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                        }) + '"' : '"' + string + '"';
                    };
                    JSON.rx_escapable = new RegExp('[\\\"\\\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]', "g");
                    JSON.meta = {
                        "\b": "\\b",
                        "	": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "''": "\\''",
                        "\\": "\\\\"
                    };
                    return JSON;
                })();
            }
        };
        return FeaturePatcher;
    })();
    RongIMLib.FeaturePatcher = FeaturePatcher;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var ScriptLoader = (function () {
        function ScriptLoader() {
        }
        ScriptLoader.prototype.load = function (src, onLoad, onError) {
            var script = document.createElement("script");
            script.async = true;
            if (onLoad) {
                if (script.addEventListener) {
                    script.addEventListener("load", function (event) {
                        var target = event.target || event.srcElement;
                        onLoad(target.src);
                    }, false);
                }
                else if (script.readyState) {
                    script.onreadystatechange = function (event) {
                        var target = event.srcElement;
                        onLoad(target.src);
                    };
                }
            }
            if (onError) {
                script.onerror = function (event) {
                    var target = event.target || event.srcElement;
                    onError(target.src);
                };
            }
            (document.head || document.getElementsByTagName("head")[0]).appendChild(script);
            script.src = src;
        };
        return ScriptLoader;
    })();
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var PublicServiceMap = (function () {
        function PublicServiceMap() {
            this.publicServiceList = [];
        }
        PublicServiceMap.prototype.get = function (publicServiceType, publicServiceId) {
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (this.publicServiceList[i].conversationType == publicServiceType && publicServiceId == this.publicServiceList[i].publicServiceId) {
                    return this.publicServiceList[i];
                }
            }
        };
        PublicServiceMap.prototype.add = function (publicServiceProfile) {
            var isAdd = true, me = this;
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == publicServiceProfile.conversationType && publicServiceProfile.publicServiceId == me.publicServiceList[i].publicServiceId) {
                    this.publicServiceList.unshift(this.publicServiceList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                this.publicServiceList.unshift(publicServiceProfile);
            }
        };
        PublicServiceMap.prototype.replace = function (publicServiceProfile) {
            var me = this;
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == publicServiceProfile.conversationType && publicServiceProfile.publicServiceId == me.publicServiceList[i].publicServiceId) {
                    me.publicServiceList.splice(i, 1, publicServiceProfile);
                    break;
                }
            }
        };
        PublicServiceMap.prototype.remove = function (conversationType, publicServiceId) {
            var me = this;
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == conversationType && publicServiceId == me.publicServiceList[i].publicServiceId) {
                    this.publicServiceList.splice(i, 1);
                    break;
                }
            }
        };
        return PublicServiceMap;
    })();
    RongIMLib.PublicServiceMap = PublicServiceMap;
    /**
     * 会话工具类。
     */
    var ConversationMap = (function () {
        function ConversationMap() {
            this.conversationList = [];
        }
        ConversationMap.prototype.get = function (conversavtionType, targetId) {
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType == conversavtionType && this.conversationList[i].targetId == targetId) {
                    return this.conversationList[i];
                }
            }
            return null;
        };
        ConversationMap.prototype.add = function (conversation) {
            var isAdd = true;
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.unshift(this.conversationList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                this.conversationList.unshift(conversation);
            }
        };
        /**
         * [replace 替换会话]
         * 会话数组存在的情况下调用add方法会是当前会话被替换且返回到第一个位置，导致用户本地一些设置失效，所以提供replace方法
         */
        ConversationMap.prototype.replace = function (conversation) {
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.splice(i, 1, conversation);
                    break;
                }
            }
        };
        ConversationMap.prototype.remove = function (conversation) {
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.splice(i, 1);
                    break;
                }
            }
        };
        return ConversationMap;
    })();
    RongIMLib.ConversationMap = ConversationMap;
    var CheckParam = (function () {
        function CheckParam() {
        }
        CheckParam.getInstance = function () {
            if (!CheckParam._instance) {
                CheckParam._instance = new CheckParam();
            }
            return CheckParam._instance;
        };
        CheckParam.prototype.logger = function (code, funcName, msg) {
            RongIMLib.RongIMClient.logger({
                code: code,
                funcName: funcName,
                msg: msg
            });
        };
        CheckParam.prototype.check = function (f, position, d, c) {
            if (RongIMLib.RongIMClient._dataAccessProvider || d) {
                for (var g = 0, e = c.length; g < e; g++) {
                    if (!new RegExp(this.getType(c[g])).test(f[g])) {
                        // throw new Error("The index of " + g + " parameter was wrong type " + this.getType(c[g]) + " [" + f[g] + "] -> position:" + position);
                        var msg = "第" + (g + 1) + "个参数错误, 错误类型：" + this.getType(c[g]) + " [" + f[g] + "] -> 位置:" + position;
                        this.logger("-3", position, msg);
                    }
                }
            }
            else {
                var msg = "该参数不正确或尚未实例化RongIMClient -> 位置:" + position;
                this.logger("-4", position, msg);
            }
        };
        CheckParam.prototype.getType = function (str) {
            var temp = Object.prototype.toString.call(str).toLowerCase();
            return temp.slice(8, temp.length - 1);
        };
        CheckParam.prototype.checkCookieDisable = function () {
            document.cookie = "checkCookie=1";
            var arr = document.cookie.match(new RegExp("(^| )checkCookie=([^;]*)(;|$)")), isDisable = false;
            if (!arr) {
                isDisable = true;
            }
            document.cookie = "checkCookie=1;expires=Thu, 01-Jan-1970 00:00:01 GMT";
            return isDisable;
        };
        return CheckParam;
    })();
    RongIMLib.CheckParam = CheckParam;
    var LimitableMap = (function () {
        function LimitableMap(limit) {
            this.map = {};
            this.keys = [];
            this.limit = limit || 10;
        }
        LimitableMap.prototype.set = function (key, value) {
            this.map[key] = value;
        };
        LimitableMap.prototype.get = function (key) {
            return this.map[key] || 0;
        };
        LimitableMap.prototype.remove = function (key) {
            delete this.map[key];
        };
        return LimitableMap;
    })();
    RongIMLib.LimitableMap = LimitableMap;
    var MemoryCache = (function () {
        function MemoryCache() {
            this.cache = {};
        }
        MemoryCache.prototype.set = function (key, value) {
            this.cache[key] = value;
        };
        MemoryCache.prototype.get = function (key) {
            return this.cache[key];
        };
        MemoryCache.prototype.remove = function (key) {
            delete this.cache[key];
        };
        return MemoryCache;
    })();
    RongIMLib.MemoryCache = MemoryCache;
    var RongAjax = (function () {
        function RongAjax(options) {
            var me = this;
            me.xmlhttp = null;
            me.options = options;
            var hasCORS = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
            if ("undefined" != typeof XMLHttpRequest && hasCORS) {
                me.xmlhttp = new XMLHttpRequest();
            }
            else if ("undefined" != typeof XDomainRequest) {
                me.xmlhttp = new XDomainRequest();
            }
            else {
                me.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        RongAjax.prototype.send = function (callback) {
            var me = this;
            me.options.url || (me.options.url = "http://upload.qiniu.com/putb64/-1");
            me.xmlhttp.onreadystatechange = function () {
                if (me.xmlhttp.readyState == 4) {
                    if (me.options.type) {
                        callback();
                    }
                    else {
                        callback(JSON.parse(me.xmlhttp.responseText.replace(/'/g, '"')));
                    }
                }
            };
            me.xmlhttp.open("POST", me.options.url, true);
            me.xmlhttp.withCredentials = false;
            if ("setRequestHeader" in me.xmlhttp) {
                if (me.options.type) {
                    me.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                }
                else {
                    me.xmlhttp.setRequestHeader("Content-type", "application/octet-stream");
                    me.xmlhttp.setRequestHeader('Authorization', "UpToken " + me.options.token);
                }
            }
            me.xmlhttp.send(me.options.type ? "appKey=" + me.options.appKey + "&deviceId=" + me.options.deviceId + "&timestamp=" + me.options.timestamp + "&deviceInfo=" + me.options.deviceInfo + "&privateInfo=" + JSON.stringify(me.options.privateInfo) : me.options.base64);
        };
        return RongAjax;
    })();
    RongIMLib.RongAjax = RongAjax;
    function Prosumer() {
        var data = [], isConsuming = false;
        this.produce = function (res) {
            data.push(res);
        };
        this.consume = function (callback, finished) {
            if (isConsuming) {
                return;
            }
            isConsuming = true;
            var next = function () {
                var res = data.shift();
                if (RongUtil.isUndefined(res)) {
                    isConsuming = false;
                    finished && finished();
                    return;
                }
                callback(res, next);
            };
            next();
        };
        this.isExeuting = function () {
            return isConsuming;
        };
    }
    var RongUtil = (function () {
        function RongUtil() {
        }
        RongUtil.noop = function () { };
        RongUtil.isEmpty = function (obj) {
            var result = true;
            if (RongUtil.isObject(obj)) {
                RongUtil.forEach(obj, function () {
                    result = false;
                });
            }
            if (RongUtil.isString(obj) || RongUtil.isArray(obj)) {
                return obj.length === 0;
            }
            if (RongUtil.isNumber(obj)) {
                return obj === 0;
            }
            return result;
        };
        RongUtil.isLengthLimit = function (str, maxLen, minLen) {
            minLen = minLen || 0;
            var strLen = str.length;
            return strLen <= maxLen && strLen >= minLen;
        };
        RongUtil.MD5 = function (str, key, raw) {
            return md5(str, key, raw);
        };
        RongUtil.isObject = function (obj) {
            return Object.prototype.toString.call(obj) == '[object Object]';
        };
        RongUtil.isArray = function (array) {
            return Object.prototype.toString.call(array) == '[object Array]';
        };
        RongUtil.isString = function (array) {
            return Object.prototype.toString.call(array) == '[object String]';
        };
        RongUtil.isFunction = function (fun) {
            return Object.prototype.toString.call(fun) == '[object Function]';
        };
        ;
        RongUtil.isUndefined = function (str) {
            return Object.prototype.toString.call(str) == '[object Undefined]';
        };
        ;
        RongUtil.isNull = function (val) {
            return Object.prototype.toString.call(val) == '[object Null]';
        };
        RongUtil.isEqual = function (a, b) {
            return a === b;
        };
        ;
        RongUtil.indexOf = function (arrs, item) {
            var index = -1;
            for (var i = 0; i < arrs.length; i++) {
                if (item === arrs[i]) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        RongUtil.stringFormat = function (tmpl, vals) {
            for (var i = 0, len = vals.length; i < len; i++) {
                var val = vals[i], reg = new RegExp("\\{" + (i) + "\\}", "g");
                tmpl = tmpl.replace(reg, val);
            }
            return tmpl;
        };
        RongUtil.tplEngine = function (temp, data, regexp) {
            if (!(Object.prototype.toString.call(data) === "[object Array]")) {
                data = [data];
            }
            var ret = [];
            for (var i = 0, j = data.length; i < j; i++) {
                ret.push(replaceAction(data[i]));
            }
            return ret.join("");
            function replaceAction(object) {
                return temp.replace(regexp || (/{([^}]+)}/g), function (match, name) {
                    if (match.charAt(0) == '\\') {
                        return match.slice(1);
                    }
                    return (object[name] != undefined) ? object[name] : '{' + name + '}';
                });
            }
        };
        ;
        RongUtil.forEach = function (obj, callback) {
            callback = callback || RongUtil.noop;
            var loopObj = function () {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        callback(obj[key], key, obj);
                    }
                }
            };
            var loopArr = function () {
                for (var i = 0, len = obj.length; i < len; i++) {
                    callback(obj[i], i);
                }
            };
            if (RongUtil.isObject(obj)) {
                loopObj();
            }
            if (RongUtil.isArray(obj)) {
                loopArr();
            }
        };
        RongUtil.extend = function (source, target, callback, force) {
            RongUtil.forEach(source, function (val, key) {
                var hasProto = (key in target);
                if (force && hasProto) {
                    target[key] = val;
                }
                if (!hasProto) {
                    target[key] = val;
                }
            });
            return target;
        };
        RongUtil.createXHR = function () {
            var item = {
                XMLHttpRequest: function () {
                    return new XMLHttpRequest();
                },
                XDomainRequest: function () {
                    return new XDomainRequest();
                },
                ActiveXObject: function () {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            };
            var isXHR = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
            var isXDR = typeof XDomainRequest == 'function' || typeof XDomainRequest == 'object';
            var key = isXHR ? 'XMLHttpRequest' : isXDR ? 'XDomainRequest' : 'ActiveXObject';
            return item[key]();
        };
        RongUtil.request = function (opts) {
            var url = opts.url;
            var body = opts.body;
            var success = opts.success;
            var error = opts.error || RongUtil.noop;
            var method = opts.method || 'GET';
            var timeout = opts.timeout;
            var xhr = RongUtil.createXHR();
            if ('onload' in xhr) {
                xhr.onload = function () {
                    xhr.onload = RongUtil.noop;
                    success(xhr.responseText);
                };
                xhr.onerror = function () {
                    error(xhr.status, xhr.responseText);
                    xhr.onerror = RongUtil.noop;
                };
            }
            else {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var status = xhr.status;
                        if (status == 200) {
                            success(xhr.responseText);
                        }
                        else {
                            error(status, xhr.responseText);
                        }
                    }
                };
            }
            xhr.open(method, url, true);
            if (timeout) {
                xhr.timeout = timeout;
            }
            if (body) {
                xhr.send(body);
                return xhr;
            }
            xhr.send(null);
            return xhr;
        };
        RongUtil.getLocalProtocol = function () {
            var isLocationInvalid = typeof location !== 'object'; // 未找到全局 location 变量, 则协议为 https. 比如小程序
            if (isLocationInvalid || location.protocol === 'https:') {
                return 'https://';
            }
            else {
                return 'http://';
            }
        };
        RongUtil.formatProtoclPath = function (config) {
            var path = config.path;
            var protocol = config.protocol;
            var tmpl = config.tmpl || '{0}{1}';
            var sub = config.sub;
            var flag = '://';
            var index = path.indexOf(flag);
            var hasProtocol = (index > -1);
            if (hasProtocol) {
                index += flag.length;
                path = path.substring(index);
            }
            if (sub) {
                index = path.indexOf('/');
                var hasPath = (index > -1);
                if (hasPath) {
                    path = path.substr(0, index);
                }
            }
            return RongUtil.stringFormat(tmpl, [protocol, path]);
        };
        ;
        RongUtil.getValidNavi = function (naviHost) {
            var HttpProtocol = RongIMLib.RongIMClient.HttpProtocol;
            var flag = '://';
            var index = naviHost.indexOf(flag);
            var hasProtocol = index > -1;
            var navi = naviHost;
            if (!hasProtocol) {
                var protocol = RongIMLib.RongIMClient.getProtocol().protocol;
                navi = protocol + naviHost;
            }
            var naviProtocol = RongUtil.getUrlProtocol(navi), localProtocol = RongUtil.getLocalProtocol();
            // 本地为 https, 但却传入 http 时, 强制转化为 https
            if (naviProtocol === HttpProtocol.http && localProtocol === 'https://') {
                navi = RongUtil.formatProtoclPath({
                    path: navi,
                    tmpl: '{0}{1}',
                    protocol: HttpProtocol.https,
                    sub: true
                });
            }
            return navi;
        };
        RongUtil.getUrlProtocol = function (url) {
            var flag = '://';
            var index = url.indexOf(flag);
            if (index > -1) {
                return url.substring(0, index + flag.length);
            }
            else {
                return 'https://';
            }
            ;
        };
        RongUtil.getUrlHost = function (url) {
            var index = RongUtil.indexOf(url, '/');
            return url.substring(0, index);
        };
        RongUtil.supportLocalStorage = function () {
            var support = false;
            if (typeof localStorage == 'object') {
                try {
                    var key = 'RC_TMP_KEY', value = 'RC_TMP_VAL';
                    localStorage.setItem(key, value);
                    var localVal = localStorage.getItem(key);
                    if (localVal == value) {
                        support = true;
                    }
                }
                catch (err) {
                    console.log('localStorage is disabled.');
                }
            }
            return support;
        };
        RongUtil.supportSessionStorage = function () {
            var support = false;
            if (typeof sessionStorage == 'object') {
                try {
                    var key = 'RC_TMP_KEY', value = 'RC_TMP_VAL';
                    sessionStorage.setItem(key, value);
                    var localVal = sessionStorage.getItem(key);
                    if (localVal == value) {
                        support = true;
                    }
                }
                catch (err) {
                    console.log('sessionStorage is disabled.');
                }
            }
            return support;
        };
        /*
            //返回新引用，不破坏原始对象
            rename({n: 'martin'}, {n: 'name'}); => {name: 'martin'}
            rename([{n: 'martin'}, {a: 18}], {n: 'name', a: 'age'});
            => [{name: 'martin'}, {age: 18}]
        */
        RongUtil.rename = function (origin, newNames) {
            var isObject = RongUtil.isObject(origin);
            if (isObject) {
                origin = [origin];
            }
            origin = JSON.parse(JSON.stringify(origin));
            var updateProperty = function (val, key, obj) {
                delete obj[key];
                key = newNames[key];
                obj[key] = val;
            };
            RongUtil.forEach(origin, function (item) {
                RongUtil.forEach(item, function (val, key, obj) {
                    var isRename = (key in newNames);
                    (isRename ? updateProperty : RongUtil.noop)(val, key, obj);
                });
            });
            return isObject ? origin[0] : origin;
        };
        RongUtil.some = function (arrs, callback) {
            var has = false;
            for (var i = 0, len = arrs.length; i < len; i++) {
                if (callback(arrs[i])) {
                    has = true;
                    break;
                }
            }
            return has;
        };
        RongUtil.keys = function (obj) {
            var props = [];
            for (var key in obj) {
                props.push(key);
            }
            return props;
        };
        RongUtil.isNumber = function (num) {
            return Object.prototype.toString.call(num) == '[object Number]';
        };
        RongUtil.getTimestamp = function () {
            var date = new Date();
            return date.getTime();
        };
        RongUtil.isSupportRequestHeaders = function () {
            var userAgent = navigator.userAgent;
            var isIE = window.ActiveXObject || 'ActiveXObject' in window;
            if (isIE) {
                var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp['$1']);
                return fIEVersion > 9;
            }
            return true;
        };
        RongUtil.hasValidWsUrl = function (urls) {
            try {
                urls = JSON.parse(urls);
            }
            catch (e) {
                return false;
            }
            var validUrlList = RongUtil.getValidWsUrlList(urls);
            return validUrlList.length > 0;
        };
        RongUtil.getValidWsUrlList = function (urls) {
            var invalidWsUrls = RongIMLib.RongIMClient.invalidWsUrls;
            var validUrlList = [];
            RongUtil.forEach(urls, function (url) {
                if (RongUtil.indexOf(invalidWsUrls, url) === -1) {
                    validUrlList.push(url);
                }
            });
            return validUrlList;
        };
        RongUtil.isValidWsUrl = function (url) {
            var invalidWsUrls = RongIMLib.RongIMClient.invalidWsUrls;
            return invalidWsUrls.indexOf(url) === -1 && !RongUtil.isEmpty(url);
        };
        RongUtil.getBrower = function () {
            var userAgent = navigator.userAgent;
            var version;
            var type;
            /* 记录各浏览器名字和匹配条件 */
            var condition = {
                IE: /rv:([\d.]+)\) like Gecko|MSIE ([\d.]+)/,
                Edge: /Edge\/([\d.]+)/,
                Firefox: /Firefox\/([\d.]+)/,
                Opera: /(?:OPERA|OPR).([\d.]+)/,
                WeChat: /MicroMessenger\/([\d.]+)/,
                QQBrowser: /QQBrowser\/([\d.]+)/,
                Chrome: /Chrome\/([\d.]+)/,
                Safari: /Version\/([\d.]+).*Safari/,
                iOSChrome: /Mobile\/([\d.]+).*Safari/
            };
            for (var key in condition) {
                if (!condition.hasOwnProperty(key))
                    continue;
                var browserContent;
                if (browserContent = userAgent.match(condition[key])) {
                    type = key;
                    version = browserContent[1] || browserContent[2];
                    break;
                }
            }
            return {
                type: type || 'UnKonw',
                version: version || 'UnKonw'
            };
        };
        RongUtil.string10to64 = function (number) {
            var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZa0'.split(''), radix = chars.length + 1, qutient = +number, arr = [];
            do {
                var mod = qutient % radix;
                qutient = (qutient - mod) / radix;
                arr.unshift(chars[mod]);
            } while (qutient);
            return arr.join('');
        };
        RongUtil.getUUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        /* 获取 22 位的 UUID */
        RongUtil.getUUID22 = function () {
            var uuid = this.getUUID();
            uuid = uuid.replace(/-/g, '') + 'a';
            uuid = parseInt(uuid, 16);
            uuid = this.string10to64(uuid);
            if (uuid.length > 22) {
                uuid = uuid.slice(0, 22);
            }
            if (uuid.length < 22) {
                var len = 22 - uuid.length;
                for (var i = 0; i < len; i++) {
                    uuid = uuid + '0';
                }
            }
            return uuid;
        };
        RongUtil.getByteLength = function (str, charset) {
            charset = charset || 'utf-8';
            var total = 0, chatCode;
            if (charset === 'utf-16') {
                for (var i = 0, max = str.length; i < max; i++) {
                    chatCode = str.charCodeAt(i);
                    if (chatCode <= 0xffff) {
                        total += 2;
                    }
                    else {
                        total += 4;
                    }
                }
            }
            else {
                for (var i = 0, max = str.length; i < max; i++) {
                    chatCode = str.charCodeAt(i);
                    if (chatCode < 0x007f) {
                        total += 1;
                    }
                    else if (chatCode <= 0x07ff) {
                        total += 2;
                    }
                    else if (chatCode <= 0xffff) {
                        total += 3;
                    }
                    else {
                        total += 4;
                    }
                }
            }
            return total;
        };
        RongUtil.concat = function (before, after, isDedup) {
            RongUtil.forEach(after, function (item) {
                if (!isDedup || RongUtil.indexOf(before, item) === -1) {
                    before.push(item);
                }
            });
            return before;
        };
        RongUtil.getCurrentDate = function (seperator) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            return RongUtil.tplEngine('{year}{seperator}{month}{seperator}{day}', {
                year: year,
                month: month,
                day: day,
                seperator: seperator
            });
        };
        RongUtil.generateUploadFileName = function (type, fileName) {
            var tpl = '{type}__RC-{date}_{random}_{timestamp}{uuid}{extension}';
            var random = Math.floor((Math.random() * 1000) % 10000);
            var uuid = this.getUUID();
            var fileNameArr, extension;
            if (fileName) {
                fileNameArr = fileName.split('.');
                extension = '.' + fileNameArr[fileNameArr.length - 1];
            }
            return RongUtil.tplEngine(tpl, {
                type: type,
                date: RongUtil.getCurrentDate('-'),
                random: random,
                uuid: uuid,
                timestamp: RongUtil.getTimestamp(),
                extension: extension || ''
            });
        };
        RongUtil.Prosumer = Prosumer;
        RongUtil.Storage = {
            set: function (key, value) {
                try {
                    RongIMLib.RongIMClient._storageProvider.setItem(key, JSON.stringify(value));
                }
                catch (e) { }
            },
            get: function (key) {
                var value = RongIMLib.RongIMClient._storageProvider.getItem(key);
                try {
                    return JSON.parse(value);
                }
                catch (e) {
                    return {};
                }
            }
        };
        return RongUtil;
    })();
    RongIMLib.RongUtil = RongUtil;
    /*
        var observer = new RongObserver();
        observer.watch({
            key: 'key',
            func: function(entity){
                
            }
        });

    */
    var RongObserver = (function () {
        function RongObserver() {
            this.watchers = {};
        }
        RongObserver.prototype.genUId = function (key) {
            var time = new Date().getTime();
            return [key, time].join('_');
        };
        RongObserver.prototype.watch = function (params) {
            var me = this;
            var key = params.key;
            var multiple = params.multiple;
            key = RongUtil.isArray(key) ? key : [key];
            var func = params.func;
            RongUtil.forEach(key, function (k) {
                k = multiple ? me.genUId(k) : k;
                me.watchers[k] = func;
            });
        };
        RongObserver.prototype.notify = function (params) {
            var me = this;
            var key = params.key;
            var entity = params.entity;
            for (var k in me.watchers) {
                var isNotify = (k.indexOf(key) == 0);
                if (isNotify) {
                    me.watchers[k](entity);
                }
            }
        };
        RongObserver.prototype.remove = function () {
        };
        return RongObserver;
    })();
    RongIMLib.RongObserver = RongObserver;
    var Observer = (function () {
        function Observer() {
            this.observers = [];
        }
        Observer.prototype.add = function (observer, force) {
            if (force) {
                this.observers = [observer];
            }
            if (RongUtil.isFunction(observer)) {
                this.observers.push(observer);
            }
        };
        Observer.prototype.emit = function (data) {
            RongUtil.forEach(this.observers, function (observer) {
                observer(data);
            });
        };
        Observer.prototype.clear = function () {
            this.observers = [];
        };
        Observer.prototype.checkIndexOutBound = function (index, bound) {
            var isOutBound = (index > -1 && index < bound);
            return isOutBound;
        };
        Observer.prototype.removeAt = function (index) {
            var isOutBound = this.checkIndexOutBound(index, this.observers.length);
            if (isOutBound) {
                this.observers.splice(index, 1);
            }
        };
        Observer.prototype.remove = function (observer) {
            var me = this;
            if (!observer) {
                me.clear();
                return;
            }
            if (!RongUtil.isFunction(observer)) {
                return;
            }
            var observerList = me.observers;
            for (var i = observerList.length - 1; i >= 0; i--) {
                if (observer === observerList[i]) {
                    me.removeAt(i);
                }
            }
        };
        return Observer;
    })();
    RongIMLib.Observer = Observer;
    var Timer = (function () {
        function Timer(config) {
            this.timeout = 0;
            this.timers = [];
            this.timeout = config.timeout;
        }
        Timer.prototype.resume = function (callback) {
            var timer = setTimeout(callback, this.timeout);
            this.timers.push(timer);
        };
        Timer.prototype.pause = function () {
            RongUtil.forEach(this.timers, function (timer) {
                clearTimeout(timer);
            });
        };
        return Timer;
    })();
    RongIMLib.Timer = Timer;
    var IndexTools = (function () {
        function IndexTools(config) {
            this.items = [];
            this.index = 0;
            this.onwheel = function () { };
            this.items = config.items;
            this.onwheel = config.onwheel;
        }
        IndexTools.prototype.get = function () {
            var context = this;
            var items = context.items;
            var index = context.index;
            var isWheel = index >= items.length;
            if (isWheel) {
                context.onwheel();
            }
            return isWheel ? 0 : index;
        };
        IndexTools.prototype.add = function () {
            this.index += 1;
        };
        return IndexTools;
    })();
    RongIMLib.IndexTools = IndexTools;
    var InnerUtil = (function () {
        function InnerUtil() {
        }
        InnerUtil.getUId = function (token) {
            return md5(token).slice(8, 16);
        };
        return InnerUtil;
    })();
    RongIMLib.InnerUtil = InnerUtil;
    var Base64 = (function () {
        function Base64() {
        }
        Base64.utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        Base64.utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = 0, c1 = 0, c2 = 0, c3;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        };
        Base64.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = this.utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
            }
            return output;
        };
        Base64.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this.utf8_decode(output);
            return output;
        };
        Base64.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        return Base64;
    })();
    RongIMLib.Base64 = Base64;
    var TextCompressor = (function () {
        function TextCompressor() {
        }
        TextCompressor.compress = function (data) {
            var self = this;
            var map = {};
            //构建一个用于反向查询字符位置的 map
            for (var p = 0; p < data.length - 1; p++) {
                var c1 = data.charAt(p);
                var c2 = data.charAt(p + 1);
                var c = c1 + c2;
                if (!map.hasOwnProperty(c)) {
                    map[c] = [p];
                    continue;
                }
                map[c].push(p);
            }
            var compressedData = [], normalBlockBuffer = [];
            //编码未压缩数据块
            var encodeNormalBlock = function () {
                if (normalBlockBuffer.length > 0) {
                    var normalBlock = normalBlockBuffer.join('');
                    normalBlockBuffer = [];
                    if (normalBlock.length > 26) {
                        var normalExtBlockLength = self.numberEncode(normalBlock.length);
                        var normalExtBlockHeader = String.fromCharCode(self.dataType.NormalExt | normalExtBlockLength.length);
                        compressedData.push(normalExtBlockHeader + normalExtBlockLength);
                    }
                    else {
                        var normalBlockHeader = String.fromCharCode(self.dataType.Normal | normalBlock.length);
                        compressedData.push(normalBlockHeader);
                    }
                    compressedData.push(normalBlock);
                }
            };
            var i = 0;
            while (i < data.length) {
                var r = self.indexOf(map, data, i);
                if (r.length < 2) {
                    normalBlockBuffer.push(data.charAt(i++));
                    continue;
                }
                if (r.length < 4) {
                    normalBlockBuffer.push(data.substr(i, r.length));
                    i += r.length;
                    continue;
                }
                var offset = self.numberEncode(i - r.offset);
                var length = self.numberEncode(r.length);
                //欲压缩的数据与数据编码后的长度一致，则不进行压缩
                if (offset.length + length.length >= r.length) {
                    normalBlockBuffer.push(data.substr(i, r.length));
                    i += r.length;
                    continue;
                }
                //编码未压缩数据块
                encodeNormalBlock();
                //编码压缩数据块
                var compressedBlockHeader = String.fromCharCode(self.dataType.Compressed | (offset.length << 2) | length.length);
                compressedData.push(compressedBlockHeader + offset + length);
                i += r.length;
            }
            //编码剩余未压缩数据块
            encodeNormalBlock();
            //在数据尾部添加校验和
            var dataLengthTo62 = self.numberEncode(data.length);
            var tailBlockHeader = String.fromCharCode(self.dataType.Tail | dataLengthTo62.length);
            compressedData.push(tailBlockHeader + dataLengthTo62);
            return compressedData.join('');
        };
        TextCompressor.uncompress = function (data) {
            var self = this;
            var i = 0;
            var result = "";
            label1: do {
                var header = data.charCodeAt(i++);
                var headerType = header & self.dataType.Mark;
                var headerVal = header & 0xF;
                switch (headerType) {
                    case self.dataType.Compressed:
                        var p1 = headerVal >> 2;
                        var p2 = headerVal & 3;
                        if (p1 == 0 || p2 == 0) {
                            throw new Error("Data parsing error,at " + i);
                        }
                        var offset = self.numberDecode(data.substr(i, p1));
                        var len = self.numberDecode(data.substr(i += p1, p2));
                        offset = result.length - offset;
                        if (offset + len > result.length) {
                            throw new Error("Data parsing error,at " + i);
                        }
                        i += p2;
                        result += result.substr(offset, len);
                        break;
                    case self.dataType.Tail:
                        var num = self.numberDecode(data.substr(i, headerVal));
                        if (num != result.length) {
                            console.log(result.length);
                            console.log(num);
                            throw new Error("Data parsing error,at " + i);
                        }
                        i += headerVal;
                        break label1;
                    case self.dataType.NormalExt:
                        var num = self.numberDecode(data.substr(i, headerVal));
                        result += data.substr(i += headerVal, num);
                        i += num;
                        break;
                    case self.dataType.Normal:
                        result += data.substr(i, headerVal);
                        i += headerVal;
                        break;
                    case self.dataType.Mark:
                        if (headerVal > 10) {
                            throw new Error("Data parsing error,at " + i);
                        }
                        result += data.substr(i, 16 + headerVal);
                        i += (16 + headerVal);
                        break;
                    default:
                        throw new Error("Data parsing error,at " + i + " header:" + headerType);
                }
            } while (i < data.length);
            return result;
        };
        TextCompressor.indexOf = function (map, source, fromIndex) {
            var self = this;
            var result = {
                length: 0,
                offset: -1
            };
            var sourceLength = source.length;
            if (fromIndex >= source.length - 1) {
                return result;
            }
            var c1 = source.charAt(fromIndex);
            var c2 = source.charAt(fromIndex + 1);
            var items = map[c1 + c2];
            if (items[0] == fromIndex) {
                return result;
            }
            var space1 = source.length - fromIndex;
            var lastChar;
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                var space2 = fromIndex - item;
                if (space2 > self.max) {
                    continue;
                }
                var end = Math.min(space1, space2);
                if (end <= result.length) {
                    break;
                }
                if (result.length > 2) {
                    if (source.charAt(item + result.length - 1) != source.charAt(fromIndex + result.length - 1)) {
                        continue;
                    }
                }
                var m = 2;
                for (var j = m; j < end; j++) {
                    if (source.charAt(item + j) == source.charAt(fromIndex + j)) {
                        m++;
                    }
                    else {
                        break;
                    }
                }
                if (m >= result.length) {
                    result.length = m;
                    result.offset = item;
                }
            }
            return result;
        };
        /*
        * 将数字转化为 62 进制字符串。
        */
        TextCompressor.numberEncode = function (num) {
            var self = this;
            var result = [], remainder = 0;
            do {
                remainder = num % self.scale;
                result.push(self.chars.charAt(remainder));
                num = (num - remainder) / self.scale;
            } while (num > 0);
            return result.join('');
        };
        /*
        * 将 62 进制字符串还原为数字。
        */
        TextCompressor.numberDecode = function (str) {
            var self = this;
            var num = 0, index = 0;
            for (var i = str.length - 1; i >= 0; i--) {
                index = self.chars.indexOf(str.charAt(i));
                if (index == -1) {
                    throw new Error("decode number error, data is \"" + str + "\"");
                }
                num = num * self.scale + index;
            }
            return num;
        };
        TextCompressor.dataType = {
            Tail: 0x30,
            Compressed: 0x40,
            NormalExt: 0x50,
            Normal: 0x60,
            Mark: 0x70
        };
        TextCompressor.chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        TextCompressor.scale = TextCompressor.chars.length;
        TextCompressor.max = 238327;
        return TextCompressor;
    })();
    RongIMLib.TextCompressor = TextCompressor;
})(RongIMLib || (RongIMLib = {}));

// {WebEnd} WebSDK 内容开始的标识, 方便小程序 SDK 定位
/*
    说明: 请勿修改 header.js 和 footer.js
    用途: 自动拼接暴露方式
    命令: grunt release 中 concat    
*/
    return RongIMLib;
});