/*
    璇存槑: 璇峰嬁淇敼 header.js 鍜� footer.js
    鐢ㄩ€�: 鑷姩鎷兼帴鏆撮湶鏂瑰紡
    鍛戒护: grunt release 涓� concat
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
             * 鍦ㄩ粦鍚嶅崟涓€�
             */
            BlacklistStatus[BlacklistStatus["IN_BLACK_LIST"] = 0] = "IN_BLACK_LIST";
            /**
             * 涓嶅湪榛戝悕鍗曚腑銆�
             */
            BlacklistStatus[BlacklistStatus["NOT_IN_BLACK_LIST"] = 1] = "NOT_IN_BLACK_LIST";
        })(RongIMLib.BlacklistStatus || (RongIMLib.BlacklistStatus = {}));
        var BlacklistStatus = RongIMLib.BlacklistStatus;
        (function (ConnectionChannel) {
            ConnectionChannel[ConnectionChannel["XHR_POLLING"] = 0] = "XHR_POLLING";
            ConnectionChannel[ConnectionChannel["WEBSOCKET"] = 1] = "WEBSOCKET";
            //澶栭儴璋冪敤
            ConnectionChannel[ConnectionChannel["HTTP"] = 0] = "HTTP";
            //澶栭儴璋冪敤
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
             * 杩炴帴鎴愬姛銆�
             */
            ConnectionStatus[ConnectionStatus["CONNECTED"] = 0] = "CONNECTED";
            /**
             * 杩炴帴涓€�
             */
            ConnectionStatus[ConnectionStatus["CONNECTING"] = 1] = "CONNECTING";
            /**
             * 鏂紑杩炴帴銆�
             */
            ConnectionStatus[ConnectionStatus["DISCONNECTED"] = 2] = "DISCONNECTED";
            /**
             * 鐢ㄦ埛璐︽埛鍦ㄥ叾浠栬澶囩櫥褰曪紝鏈満浼氳韪㈡帀绾裤€�
             */
            ConnectionStatus[ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"] = 6] = "KICKED_OFFLINE_BY_OTHER_CLIENT";
            /**
             * websocket 杩炴帴澶辫触
             */
            ConnectionStatus[ConnectionStatus["WEBSOCKET_UNAVAILABLE"] = 7] = "WEBSOCKET_UNAVAILABLE";
            /**
             * 缃戠粶涓嶅彲鐢ㄣ€�
             */
            ConnectionStatus[ConnectionStatus["NETWORK_UNAVAILABLE"] = 3] = "NETWORK_UNAVAILABLE";
            /**
             * 鍩熷悕閿欒
             */
            ConnectionStatus[ConnectionStatus["DOMAIN_INCORRECT"] = 12] = "DOMAIN_INCORRECT";
            /**
             *  杩炴帴鍏抽棴銆�
             */
            ConnectionStatus[ConnectionStatus["CONNECTION_CLOSED"] = 4] = "CONNECTION_CLOSED";
            /*
            浜掕涪娆℃暟杩囧锛坈ount > 5锛夛紝姝ゆ椂鍙兘鍑虹幇锛氬湪鍏跺畠浠栬澶囩櫥闄嗘湁 reconnect 閫昏緫
        */
            ConnectionStatus[ConnectionStatus["ULTRALIMIT"] = 1101] = "ULTRALIMIT";
            /*
            寮€濮嬭姹傚鑸�
        */
            ConnectionStatus[ConnectionStatus["REQUEST_NAVI"] = 201] = "REQUEST_NAVI";
            /*
            璇锋眰瀵艰埅缁撴潫
        */
            ConnectionStatus[ConnectionStatus["RESPONSE_NAVI"] = 202] = "RESPONSE_NAVI";
        })(RongIMLib.ConnectionStatus || (RongIMLib.ConnectionStatus = {}));
        var ConnectionStatus = RongIMLib.ConnectionStatus;
        (function (ConversationNotificationStatus) {
            /**
             * 鍏嶆墦鎵扮姸鎬侊紝鍏抽棴瀵瑰簲浼氳瘽鐨勯€氱煡鎻愰啋銆�
             */
            ConversationNotificationStatus[ConversationNotificationStatus["DO_NOT_DISTURB"] = 0] = "DO_NOT_DISTURB";
            /**
             * 鎻愰啋銆�
             */
            ConversationNotificationStatus[ConversationNotificationStatus["NOTIFY"] = 1] = "NOTIFY";
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
            //榛樿鍏虫敞 MC
            ConversationType[ConversationType["APP_PUBLIC_SERVICE"] = 7] = "APP_PUBLIC_SERVICE";
            //鎵嬪伐鍏虫敞 MP
            ConversationType[ConversationType["PUBLIC_SERVICE"] = 8] = "PUBLIC_SERVICE";
        })(RongIMLib.ConversationType || (RongIMLib.ConversationType = {}));
        var ConversationType = RongIMLib.ConversationType;
        (function (DiscussionInviteStatus) {
            /**
             * 寮€鏀鹃個璇枫€�
             */
            DiscussionInviteStatus[DiscussionInviteStatus["OPENED"] = 0] = "OPENED";
            /**
             * 鍏抽棴閭€璇枫€�
             */
            DiscussionInviteStatus[DiscussionInviteStatus["CLOSED"] = 1] = "CLOSED";
        })(RongIMLib.DiscussionInviteStatus || (RongIMLib.DiscussionInviteStatus = {}));
        var DiscussionInviteStatus = RongIMLib.DiscussionInviteStatus;
        (function (ErrorCode) {
            ErrorCode[ErrorCode["RECALL_MESSAGE"] = 25101] = "RECALL_MESSAGE";
            /**
             * 鍙戦€侀鐜囪繃蹇�
             */
            ErrorCode[ErrorCode["SEND_FREQUENCY_TOO_FAST"] = 20604] = "SEND_FREQUENCY_TOO_FAST";
            ErrorCode[ErrorCode["RC_MSG_UNAUTHORIZED"] = 20406] = "RC_MSG_UNAUTHORIZED";
            /**
             * 缇ょ粍 Id 鏃犳晥
             */
            ErrorCode[ErrorCode["RC_DISCUSSION_GROUP_ID_INVALID"] = 20407] = "RC_DISCUSSION_GROUP_ID_INVALID";
            /**
             * 缇ょ粍琚瑷€
             */
            ErrorCode[ErrorCode["FORBIDDEN_IN_GROUP"] = 22408] = "FORBIDDEN_IN_GROUP";
            /**
             * 涓嶅湪璁ㄨ缁勩€�
             */
            ErrorCode[ErrorCode["NOT_IN_DISCUSSION"] = 21406] = "NOT_IN_DISCUSSION";
            /**
             * 涓嶅湪缇ょ粍銆�
             */
            ErrorCode[ErrorCode["NOT_IN_GROUP"] = 22406] = "NOT_IN_GROUP";
            /**
             * 涓嶅湪鑱婂ぉ瀹ゃ€�
             */
            ErrorCode[ErrorCode["NOT_IN_CHATROOM"] = 23406] = "NOT_IN_CHATROOM";
            /**
             *鑱婂ぉ瀹よ绂佽█
             */
            ErrorCode[ErrorCode["FORBIDDEN_IN_CHATROOM"] = 23408] = "FORBIDDEN_IN_CHATROOM";
            /**
             * 鑱婂ぉ瀹や腑鎴愬憳琚涪鍑�
             */
            ErrorCode[ErrorCode["RC_CHATROOM_USER_KICKED"] = 23409] = "RC_CHATROOM_USER_KICKED";
            /**
             * 鑱婂ぉ瀹や笉瀛樺湪
             */
            ErrorCode[ErrorCode["RC_CHATROOM_NOT_EXIST"] = 23410] = "RC_CHATROOM_NOT_EXIST";
            /**
             * 鑱婂ぉ瀹ゆ垚鍛樺凡婊�
             */
            ErrorCode[ErrorCode["RC_CHATROOM_IS_FULL"] = 23411] = "RC_CHATROOM_IS_FULL";
            /**
             * 鑾峰彇鑱婂ぉ瀹や俊鎭弬鏁版棤鏁�
             */
            ErrorCode[ErrorCode["RC_CHATROOM_PATAMETER_INVALID"] = 23412] = "RC_CHATROOM_PATAMETER_INVALID";
            /**
             * 鑱婂ぉ瀹ゅ紓甯�
             */
            ErrorCode[ErrorCode["CHATROOM_GET_HISTORYMSG_ERROR"] = 23413] = "CHATROOM_GET_HISTORYMSG_ERROR";
            /**
             * 娌℃湁鎵撳紑鑱婂ぉ瀹ゆ秷鎭瓨鍌�
             */
            ErrorCode[ErrorCode["CHATROOM_NOT_OPEN_HISTORYMSG_STORE"] = 23414] = "CHATROOM_NOT_OPEN_HISTORYMSG_STORE";
            /**
             * 鏁忔劅璇嶅睆钄�
             */
            ErrorCode[ErrorCode["SENSITIVE_SHIELD"] = 21501] = "SENSITIVE_SHIELD";
            ErrorCode[ErrorCode["SENSITIVE_REPLACE"] = 21502] = "SENSITIVE_REPLACE";
            ErrorCode[ErrorCode["TIMEOUT"] = -1] = "TIMEOUT";
            /**
             * 鏈煡鍘熷洜澶辫触銆�
             */
            ErrorCode[ErrorCode["UNKNOWN"] = -2] = "UNKNOWN";
            /**
             * 鍔犲叆璁ㄨ澶辫触
             */
            ErrorCode[ErrorCode["JOIN_IN_DISCUSSION"] = 21407] = "JOIN_IN_DISCUSSION";
            /**
             * 鍒涘缓璁ㄨ缁勫け璐�
             */
            ErrorCode[ErrorCode["CREATE_DISCUSSION"] = 21408] = "CREATE_DISCUSSION";
            /**
             * 璁剧疆璁ㄨ缁勯個璇风姸鎬佸け璐�
             */
            ErrorCode[ErrorCode["INVITE_DICUSSION"] = 21409] = "INVITE_DICUSSION";
            /**
             *鑾峰彇鐢ㄦ埛澶辫触
             */
            ErrorCode[ErrorCode["GET_USERINFO_ERROR"] = 23407] = "GET_USERINFO_ERROR";
            /**
             * 鍦ㄩ粦鍚嶅崟涓€�
             */
            ErrorCode[ErrorCode["REJECTED_BY_BLACKLIST"] = 405] = "REJECTED_BY_BLACKLIST";
            /**
             * 閫氫俊杩囩▼涓紝褰撳墠 Socket 涓嶅瓨鍦ㄣ€�
             */
            ErrorCode[ErrorCode["RC_NET_CHANNEL_INVALID"] = 30001] = "RC_NET_CHANNEL_INVALID";
            /**
             * Socket 杩炴帴涓嶅彲鐢ㄣ€�
             */
            ErrorCode[ErrorCode["RC_NET_UNAVAILABLE"] = 30002] = "RC_NET_UNAVAILABLE";
            /**
             * 閫氫俊瓒呮椂銆�
             */
            ErrorCode[ErrorCode["RC_MSG_RESP_TIMEOUT"] = 30003] = "RC_MSG_RESP_TIMEOUT";
            /**
             * 瀵艰埅鎿嶄綔鏃讹紝Http 璇锋眰澶辫触銆�
             */
            ErrorCode[ErrorCode["RC_HTTP_SEND_FAIL"] = 30004] = "RC_HTTP_SEND_FAIL";
            /**
             * HTTP 璇锋眰澶辫触銆�
             */
            ErrorCode[ErrorCode["RC_HTTP_REQ_TIMEOUT"] = 30005] = "RC_HTTP_REQ_TIMEOUT";
            /**
             * HTTP 鎺ユ敹澶辫触銆�
             */
            ErrorCode[ErrorCode["RC_HTTP_RECV_FAIL"] = 30006] = "RC_HTTP_RECV_FAIL";
            /**
             * 瀵艰埅鎿嶄綔鐨� HTTP 璇锋眰锛岃繑鍥炰笉鏄�200銆�
             */
            ErrorCode[ErrorCode["RC_NAVI_RESOURCE_ERROR"] = 30007] = "RC_NAVI_RESOURCE_ERROR";
            /**
             * 瀵艰埅鏁版嵁瑙ｆ瀽鍚庯紝鍏朵腑涓嶅瓨鍦ㄦ湁鏁堟暟鎹€�
             */
            ErrorCode[ErrorCode["RC_NODE_NOT_FOUND"] = 30008] = "RC_NODE_NOT_FOUND";
            /**
             * 瀵艰埅鏁版嵁瑙ｆ瀽鍚庯紝鍏朵腑涓嶅瓨鍦ㄦ湁鏁� IP 鍦板潃銆�
             */
            ErrorCode[ErrorCode["RC_DOMAIN_NOT_RESOLVE"] = 30009] = "RC_DOMAIN_NOT_RESOLVE";
            /**
             * 鍒涘缓 Socket 澶辫触銆�
             */
            ErrorCode[ErrorCode["RC_SOCKET_NOT_CREATED"] = 30010] = "RC_SOCKET_NOT_CREATED";
            /**
             * Socket 琚柇寮€銆�
             */
            ErrorCode[ErrorCode["RC_SOCKET_DISCONNECTED"] = 30011] = "RC_SOCKET_DISCONNECTED";
            /**
             * PING 鎿嶄綔澶辫触銆�
             */
            ErrorCode[ErrorCode["RC_PING_SEND_FAIL"] = 30012] = "RC_PING_SEND_FAIL";
            /**
             * PING 瓒呮椂銆�
             */
            ErrorCode[ErrorCode["RC_PONG_RECV_FAIL"] = 30013] = "RC_PONG_RECV_FAIL";
            /**
             * 娑堟伅鍙戦€佸け璐ャ€�
             */
            ErrorCode[ErrorCode["RC_MSG_SEND_FAIL"] = 30014] = "RC_MSG_SEND_FAIL";
            /**
             * 鍋� connect 杩炴帴鏃讹紝鏀跺埌鐨� ACK 瓒呮椂銆�
             */
            ErrorCode[ErrorCode["RC_CONN_ACK_TIMEOUT"] = 31000] = "RC_CONN_ACK_TIMEOUT";
            /**
             * 鍙傛暟閿欒銆�
             */
            ErrorCode[ErrorCode["RC_CONN_PROTO_VERSION_ERROR"] = 31001] = "RC_CONN_PROTO_VERSION_ERROR";
            /**
             * 鍙傛暟閿欒锛孉pp Id 閿欒銆�
             */
            ErrorCode[ErrorCode["RC_CONN_ID_REJECT"] = 31002] = "RC_CONN_ID_REJECT";
            /**
             * 鏈嶅姟鍣ㄤ笉鍙敤銆�
             */
            ErrorCode[ErrorCode["RC_CONN_SERVER_UNAVAILABLE"] = 31003] = "RC_CONN_SERVER_UNAVAILABLE";
            /**
             * Token 閿欒銆�
             */
            ErrorCode[ErrorCode["RC_CONN_USER_OR_PASSWD_ERROR"] = 31004] = "RC_CONN_USER_OR_PASSWD_ERROR";
            /**
             * App Id 涓� Token 涓嶅尮閰嶃€�
             */
            ErrorCode[ErrorCode["RC_CONN_NOT_AUTHRORIZED"] = 31005] = "RC_CONN_NOT_AUTHRORIZED";
            /**
             * 閲嶅畾鍚戯紝鍦板潃閿欒銆�
             */
            ErrorCode[ErrorCode["RC_CONN_REDIRECTED"] = 31006] = "RC_CONN_REDIRECTED";
            /**
             * NAME 涓庡悗鍙版敞鍐屼俊鎭笉涓€鑷淬€�
             */
            ErrorCode[ErrorCode["RC_CONN_PACKAGE_NAME_INVALID"] = 31007] = "RC_CONN_PACKAGE_NAME_INVALID";
            /**
             * APP 琚睆钄姐€佸垹闄ゆ垨涓嶅瓨鍦ㄣ€�
             */
            ErrorCode[ErrorCode["RC_CONN_APP_BLOCKED_OR_DELETED"] = 31008] = "RC_CONN_APP_BLOCKED_OR_DELETED";
            /**
             * 鐢ㄦ埛琚睆钄姐€�
             */
            ErrorCode[ErrorCode["RC_CONN_USER_BLOCKED"] = 31009] = "RC_CONN_USER_BLOCKED";
            /**
             * Disconnect锛岀敱鏈嶅姟鍣ㄨ繑鍥烇紝姣斿鐢ㄦ埛浜掕涪銆�
             */
            ErrorCode[ErrorCode["RC_DISCONN_KICK"] = 31010] = "RC_DISCONN_KICK";
            /**
             * Disconnect锛岀敱鏈嶅姟鍣ㄨ繑鍥烇紝姣斿鐢ㄦ埛浜掕涪銆�
             */
            ErrorCode[ErrorCode["RC_DISCONN_EXCEPTION"] = 31011] = "RC_DISCONN_EXCEPTION";
            /**
             * 鍗忚灞傚唴閮ㄩ敊璇€俼uery锛屼笂浼犱笅杞借繃绋嬩腑鏁版嵁閿欒銆�
             */
            ErrorCode[ErrorCode["RC_QUERY_ACK_NO_DATA"] = 32001] = "RC_QUERY_ACK_NO_DATA";
            /**
             * 鍗忚灞傚唴閮ㄩ敊璇€�
             */
            ErrorCode[ErrorCode["RC_MSG_DATA_INCOMPLETE"] = 32002] = "RC_MSG_DATA_INCOMPLETE";
            /**
             * 鏈皟鐢� init 鍒濆鍖栧嚱鏁般€�
             */
            ErrorCode[ErrorCode["BIZ_ERROR_CLIENT_NOT_INIT"] = 33001] = "BIZ_ERROR_CLIENT_NOT_INIT";
            /**
             * 鏁版嵁搴撳垵濮嬪寲澶辫触銆�
             */
            ErrorCode[ErrorCode["BIZ_ERROR_DATABASE_ERROR"] = 33002] = "BIZ_ERROR_DATABASE_ERROR";
            /**
             * 浼犲叆鍙傛暟鏃犳晥銆�
             */
            ErrorCode[ErrorCode["BIZ_ERROR_INVALID_PARAMETER"] = 33003] = "BIZ_ERROR_INVALID_PARAMETER";
            /**
             * 閫氶亾鏃犳晥銆�
             */
            ErrorCode[ErrorCode["BIZ_ERROR_NO_CHANNEL"] = 33004] = "BIZ_ERROR_NO_CHANNEL";
            /**
             * 閲嶆柊杩炴帴鎴愬姛銆�
             */
            ErrorCode[ErrorCode["BIZ_ERROR_RECONNECT_SUCCESS"] = 33005] = "BIZ_ERROR_RECONNECT_SUCCESS";
            /**
             * 杩炴帴涓紝鍐嶈皟鐢� connect 琚嫆缁濄€�
             */
            ErrorCode[ErrorCode["BIZ_ERROR_CONNECTING"] = 33006] = "BIZ_ERROR_CONNECTING";
            /**
             * 娑堟伅婕父鏈嶅姟鏈紑閫�
             */
            ErrorCode[ErrorCode["MSG_ROAMING_SERVICE_UNAVAILABLE"] = 33007] = "MSG_ROAMING_SERVICE_UNAVAILABLE";
            ErrorCode[ErrorCode["MSG_INSERT_ERROR"] = 33008] = "MSG_INSERT_ERROR";
            ErrorCode[ErrorCode["MSG_DEL_ERROR"] = 33009] = "MSG_DEL_ERROR";
            /**
             * 鍒犻櫎浼氳瘽澶辫触
             */
            ErrorCode[ErrorCode["CONVER_REMOVE_ERROR"] = 34001] = "CONVER_REMOVE_ERROR";
            /**
             *鎷夊彇鍘嗗彶娑堟伅
             */
            ErrorCode[ErrorCode["CONVER_GETLIST_ERROR"] = 34002] = "CONVER_GETLIST_ERROR";
            /**
             * 浼氳瘽鎸囧畾寮傚父
             */
            ErrorCode[ErrorCode["CONVER_SETOP_ERROR"] = 34003] = "CONVER_SETOP_ERROR";
            /**
             * 鑾峰彇浼氳瘽鏈娑堟伅鎬绘暟澶辫触
             */
            ErrorCode[ErrorCode["CONVER_TOTAL_UNREAD_ERROR"] = 34004] = "CONVER_TOTAL_UNREAD_ERROR";
            /**
             * 鑾峰彇鎸囧畾浼氳瘽绫诲瀷鏈娑堟伅鏁板紓甯�
             */
            ErrorCode[ErrorCode["CONVER_TYPE_UNREAD_ERROR"] = 34005] = "CONVER_TYPE_UNREAD_ERROR";
            /**
             * 鑾峰彇鎸囧畾鐢ㄦ埛ID&浼氳瘽绫诲瀷鏈娑堟伅鏁板紓甯�
             */
            ErrorCode[ErrorCode["CONVER_ID_TYPE_UNREAD_ERROR"] = 34006] = "CONVER_ID_TYPE_UNREAD_ERROR";
            ErrorCode[ErrorCode["CONVER_CLEAR_ERROR"] = 34007] = "CONVER_CLEAR_ERROR";
            ErrorCode[ErrorCode["CLEAR_HIS_ERROR"] = 34010] = "CLEAR_HIS_ERROR";
            ErrorCode[ErrorCode["CLEAR_HIS_TYPE_ERROR"] = 34008] = "CLEAR_HIS_TYPE_ERROR";
            ErrorCode[ErrorCode["CLEAR_HIS_TIME_ERROR"] = 34011] = "CLEAR_HIS_TIME_ERROR";
            /*

        */
            ErrorCode[ErrorCode["CONVER_GET_ERROR"] = 34009] = "CONVER_GET_ERROR";
            //缇ょ粍寮傚父淇℃伅
            /**
             *
             */
            ErrorCode[ErrorCode["GROUP_SYNC_ERROR"] = 35001] = "GROUP_SYNC_ERROR";
            /**
             * 鍖归厤缇や俊鎭紓甯�
             */
            ErrorCode[ErrorCode["GROUP_MATCH_ERROR"] = 35002] = "GROUP_MATCH_ERROR";
            //鑱婂ぉ瀹ゅ紓甯�
            /**
             * 鍔犲叆鑱婂ぉ瀹d涓虹┖
             */
            ErrorCode[ErrorCode["CHATROOM_ID_ISNULL"] = 36001] = "CHATROOM_ID_ISNULL";
            /**
             * 鍔犲叆鑱婂ぉ瀹ゅけ璐�
             */
            ErrorCode[ErrorCode["CHARTOOM_JOIN_ERROR"] = 36002] = "CHARTOOM_JOIN_ERROR";
            /**
             * 鎷夊彇鑱婂ぉ瀹ゅ巻鍙叉秷鎭け璐�
             */
            ErrorCode[ErrorCode["CHATROOM_HISMESSAGE_ERROR"] = 36003] = "CHATROOM_HISMESSAGE_ERROR";
            //榛戝悕鍗曞紓甯�
            /**
             * 鍔犲叆榛戝悕鍗曞紓甯�
             */
            ErrorCode[ErrorCode["BLACK_ADD_ERROR"] = 37001] = "BLACK_ADD_ERROR";
            /**
             * 鑾峰緱鎸囧畾浜哄憳鍐嶉粦鍚嶅崟涓殑鐘舵€佸紓甯�
             */
            ErrorCode[ErrorCode["BLACK_GETSTATUS_ERROR"] = 37002] = "BLACK_GETSTATUS_ERROR";
            /**
             * 绉婚櫎榛戝悕鍗曞紓甯�
             */
            ErrorCode[ErrorCode["BLACK_REMOVE_ERROR"] = 37003] = "BLACK_REMOVE_ERROR";
            /**
             * 鑾峰彇鑽夌ǹ澶辫触
             */
            ErrorCode[ErrorCode["DRAF_GET_ERROR"] = 38001] = "DRAF_GET_ERROR";
            /**
             * 淇濆瓨鑽夌ǹ澶辫触
             */
            ErrorCode[ErrorCode["DRAF_SAVE_ERROR"] = 38002] = "DRAF_SAVE_ERROR";
            /**
             * 鍒犻櫎鑽夌ǹ澶辫触
             */
            ErrorCode[ErrorCode["DRAF_REMOVE_ERROR"] = 38003] = "DRAF_REMOVE_ERROR";
            /**
             * 鍏虫敞鍏紬鍙峰け璐�
             */
            ErrorCode[ErrorCode["SUBSCRIBE_ERROR"] = 39001] = "SUBSCRIBE_ERROR";
            /**
             * 鍏虫敞鍏紬鍙峰け璐�
             */
            ErrorCode[ErrorCode["QNTKN_FILETYPE_ERROR"] = 41001] = "QNTKN_FILETYPE_ERROR";
            /**
             * 鑾峰彇涓冪墰token澶辫触
             */
            ErrorCode[ErrorCode["QNTKN_GET_ERROR"] = 41002] = "QNTKN_GET_ERROR";
            /**
             * cookie琚鐢�
             */
            ErrorCode[ErrorCode["COOKIE_ENABLE"] = 51001] = "COOKIE_ENABLE";
            ErrorCode[ErrorCode["GET_MESSAGE_BY_ID_ERROR"] = 61001] = "GET_MESSAGE_BY_ID_ERROR";
            // 娌℃湁娉ㄥ唽DeviveId 涔熷氨鏄敤鎴锋病鏈夌櫥闄�
            ErrorCode[ErrorCode["HAVNODEVICEID"] = 24001] = "HAVNODEVICEID";
            // 宸茬粡瀛樺湪
            ErrorCode[ErrorCode["DEVICEIDISHAVE"] = 24002] = "DEVICEIDISHAVE";
            // 鎴愬姛
            ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
            // 娌℃湁瀵瑰簲鐨勭敤鎴锋垨token
            ErrorCode[ErrorCode["FEILD"] = 24009] = "FEILD";
            // voip涓虹┖
            ErrorCode[ErrorCode["VOIPISNULL"] = 24013] = "VOIPISNULL";
            // 涓嶆敮鎸佺殑Voip寮曟搸
            ErrorCode[ErrorCode["NOENGINETYPE"] = 24010] = "NOENGINETYPE";
            // channleName 鏄┖
            ErrorCode[ErrorCode["NULLCHANNELNAME"] = 24011] = "NULLCHANNELNAME";
            // 鐢熸垚Voipkey澶辫触
            ErrorCode[ErrorCode["VOIPDYANMICERROR"] = 24012] = "VOIPDYANMICERROR";
            // 娌℃湁閰嶇疆voip
            ErrorCode[ErrorCode["NOVOIP"] = 24014] = "NOVOIP";
            // 鏈嶅姟鍣ㄥ唴閮ㄩ敊璇�
            ErrorCode[ErrorCode["INTERNALERRROR"] = 24015] = "INTERNALERRROR";
            //VOIP close
            ErrorCode[ErrorCode["VOIPCLOSE"] = 24016] = "VOIPCLOSE";
            ErrorCode[ErrorCode["CLOSE_BEFORE_OPEN"] = 51001] = "CLOSE_BEFORE_OPEN";
            ErrorCode[ErrorCode["ALREADY_IN_USE"] = 51002] = "ALREADY_IN_USE";
            ErrorCode[ErrorCode["INVALID_CHANNEL_NAME"] = 51003] = "INVALID_CHANNEL_NAME";
            ErrorCode[ErrorCode["VIDEO_CONTAINER_IS_NULL"] = 51004] = "VIDEO_CONTAINER_IS_NULL";
            /**
             * 鍒犻櫎娑堟伅鏁扮粍闀垮害涓� 0 .
             */
            ErrorCode[ErrorCode["DELETE_MESSAGE_ID_IS_NULL"] = 61001] = "DELETE_MESSAGE_ID_IS_NULL";
            /*!
        宸辨柟鍙栨秷宸插彂鍑虹殑閫氳瘽璇锋眰
        */
            ErrorCode[ErrorCode["CANCEL"] = 1] = "CANCEL";
            /*!
         宸辨柟鎷掔粷鏀跺埌鐨勯€氳瘽璇锋眰
         */
            ErrorCode[ErrorCode["REJECT"] = 2] = "REJECT";
            /*!
         宸辨柟鎸傛柇
         */
            ErrorCode[ErrorCode["HANGUP"] = 3] = "HANGUP";
            /*!
         宸辨柟蹇欑
         */
            ErrorCode[ErrorCode["BUSYLINE"] = 4] = "BUSYLINE";
            /*!
         宸辨柟鏈帴鍚�
         */
            ErrorCode[ErrorCode["NO_RESPONSE"] = 5] = "NO_RESPONSE";
            /*!
         宸辨柟涓嶆敮鎸佸綋鍓嶅紩鎿�
         */
            ErrorCode[ErrorCode["ENGINE_UN_SUPPORTED"] = 6] = "ENGINE_UN_SUPPORTED";
            /*!
         宸辨柟缃戠粶鍑洪敊
         */
            ErrorCode[ErrorCode["NETWORK_ERROR"] = 7] = "NETWORK_ERROR";
            /*!
         瀵规柟鍙栨秷宸插彂鍑虹殑閫氳瘽璇锋眰
         */
            ErrorCode[ErrorCode["REMOTE_CANCEL"] = 11] = "REMOTE_CANCEL";
            /*!
         瀵规柟鎷掔粷鏀跺埌鐨勯€氳瘽璇锋眰
         */
            ErrorCode[ErrorCode["REMOTE_REJECT"] = 12] = "REMOTE_REJECT";
            /*!
         閫氳瘽杩囩▼瀵规柟鎸傛柇
         */
            ErrorCode[ErrorCode["REMOTE_HANGUP"] = 13] = "REMOTE_HANGUP";
            /*!
         瀵规柟蹇欑
         */
            ErrorCode[ErrorCode["REMOTE_BUSYLINE"] = 14] = "REMOTE_BUSYLINE";
            /*!
         瀵规柟鏈帴鍚�
         */
            ErrorCode[ErrorCode["REMOTE_NO_RESPONSE"] = 15] = "REMOTE_NO_RESPONSE";
            /*!
         瀵规柟缃戠粶閿欒
         */
            ErrorCode[ErrorCode["REMOTE_ENGINE_UN_SUPPORTED"] = 16] = "REMOTE_ENGINE_UN_SUPPORTED";
            /*!
         瀵规柟缃戠粶閿欒
         */
            ErrorCode[ErrorCode["REMOTE_NETWORK_ERROR"] = 17] = "REMOTE_NETWORK_ERROR";
            /*!
         VoIP 涓嶅彲鐢�
         */
            ErrorCode[ErrorCode["VOIP_NOT_AVALIABLE"] = 18] = "VOIP_NOT_AVALIABLE";
        })(RongIMLib.ErrorCode || (RongIMLib.ErrorCode = {}));
        var ErrorCode = RongIMLib.ErrorCode;
        (function (VoIPMediaType) {
            VoIPMediaType[VoIPMediaType["MEDIA_AUDIO"] = 1] = "MEDIA_AUDIO";
            VoIPMediaType[VoIPMediaType["MEDIA_VEDIO"] = 2] = "MEDIA_VEDIO";
        })(RongIMLib.VoIPMediaType || (RongIMLib.VoIPMediaType = {}));
        var VoIPMediaType = RongIMLib.VoIPMediaType;
        (function (MediaType) {
            /**
             * 鍥剧墖銆�
             */
            MediaType[MediaType["IMAGE"] = 1] = "IMAGE";
            /**
             * 澹伴煶銆�
             */
            MediaType[MediaType["AUDIO"] = 2] = "AUDIO";
            /**
             * 瑙嗛銆�
             */
            MediaType[MediaType["VIDEO"] = 3] = "VIDEO";
            /**
             * 閫氱敤鏂囦欢銆�
             */
            MediaType[MediaType["FILE"] = 100] = "FILE";
        })(RongIMLib.MediaType || (RongIMLib.MediaType = {}));
        var MediaType = RongIMLib.MediaType;
        (function (MessageDirection) {
            /**
             * 鍙戦€佹秷鎭€�
             */
            MessageDirection[MessageDirection["SEND"] = 1] = "SEND";
            /**
             * 鎺ユ敹娑堟伅銆�
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
             * 鏈垵濮嬪寲 RealTimeLocation 瀹炰緥
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NOT_INIT"] = -1] = "RC_REAL_TIME_LOCATION_NOT_INIT";
            /**
             * 鎵ц鎴愬姛銆�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_SUCCESS"] = 0] = "RC_REAL_TIME_LOCATION_SUCCESS";
            /**
             * 鑾峰彇 RealTimeLocation 瀹炰緥鏃惰繑鍥�
             * GPS 鏈墦寮€銆�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_GPS_DISABLED"] = 1] = "RC_REAL_TIME_LOCATION_GPS_DISABLED";
            /**
             * 鑾峰彇 RealTimeLocation 瀹炰緥鏃惰繑鍥�
             * 褰撳墠浼氳瘽涓嶆敮鎸佷綅缃叡浜€�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT"] = 2] = "RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT";
            /**
             * 鑾峰彇 RealTimeLocation 瀹炰緥鏃惰繑鍥�
             * 瀵规柟宸插彂璧蜂綅缃叡浜€�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_IS_ON_GOING"] = 3] = "RC_REAL_TIME_LOCATION_IS_ON_GOING";
            /**
             * Join 鏃惰繑鍥�
             * 褰撳墠浣嶇疆鍏变韩宸茶秴杩囨渶澶ф敮鎸佷汉鏁般€�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT"] = 4] = "RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT";
            /**
             * Join 鏃惰繑鍥�
             * 鍔犲叆浣嶇疆鍏变韩澶辫触銆�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_JOIN_FAILURE"] = 5] = "RC_REAL_TIME_LOCATION_JOIN_FAILURE";
            /**
             * Start 鏃惰繑鍥�
             * 鍙戣捣浣嶇疆鍏变韩澶辫触銆�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_START_FAILURE"] = 6] = "RC_REAL_TIME_LOCATION_START_FAILURE";
            /**
             * 缃戠粶涓嶅彲鐢ㄣ€�
             */
            RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE"] = 7] = "RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE";
        })(RongIMLib.RealTimeLocationErrorCode || (RongIMLib.RealTimeLocationErrorCode = {}));
        var RealTimeLocationErrorCode = RongIMLib.RealTimeLocationErrorCode;
        (function (RealTimeLocationStatus) {
            /**
             * 绌洪棽鐘舵€� 锛堥粯璁ょ姸鎬侊級
             * 瀵规柟鎴栬€呰嚜宸遍兘鏈彂璧蜂綅缃叡浜笟鍔★紝鎴栬€呬綅缃叡浜笟鍔″凡缁撴潫銆�
             */
            RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_IDLE"] = 0] = "RC_REAL_TIME_LOCATION_STATUS_IDLE";
            /**
             * 鍛煎叆鐘舵€� 锛堝緟鍔犲叆锛�
             * 1. 瀵规柟鍙戣捣浜嗕綅缃叡浜笟鍔★紝姝ょ姸鎬佷笅锛岃嚜宸卞彧鑳介€夋嫨鍔犲叆銆�
             * 2. 鑷繁浠庡凡杩炴帴鐨勪綅缃叡浜腑閫€鍑恒€�
             */
            RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_INCOMING"] = 1] = "RC_REAL_TIME_LOCATION_STATUS_INCOMING";
            /**
             * 鍛煎嚭鐘舵€� =锛堣嚜宸卞垱寤猴級
             * 1. 鑷繁鍙戣捣浣嶇疆鍏变韩涓氬姟锛屽鏂瑰彧鑳介€夋嫨鍔犲叆銆�
             * 2. 瀵规柟浠庡凡杩炴帴鐨勪綅缃叡浜笟鍔′腑閫€鍑恒€�
             */
            RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_OUTGOING"] = 2] = "RC_REAL_TIME_LOCATION_STATUS_OUTGOING";
            /**
             * 杩炴帴鐘舵€� 锛堣嚜宸卞姞鍏ワ級
             * 瀵规柟鍔犲叆浜嗚嚜宸卞彂璧风殑浣嶇疆鍏变韩锛屾垨鑰呰嚜宸卞姞鍏ヤ簡瀵规柟鍙戣捣鐨勪綅缃叡浜€�
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
             * 绮剧‘銆�
             */
            SearchType[SearchType["EXACT"] = 0] = "EXACT";
            /**
             * 妯＄硦銆�
             */
            SearchType[SearchType["FUZZY"] = 1] = "FUZZY";
        })(RongIMLib.SearchType || (RongIMLib.SearchType = {}));
        var SearchType = RongIMLib.SearchType;
        (function (SentStatus) {
            /**
             * 鍙戦€佷腑銆�
             */
            SentStatus[SentStatus["SENDING"] = 10] = "SENDING";
            /**
             * 鍙戦€佸け璐ャ€�
             */
            SentStatus[SentStatus["FAILED"] = 20] = "FAILED";
            /**
             * 宸插彂閫併€�
             */
            SentStatus[SentStatus["SENT"] = 30] = "SENT";
            /**
             * 瀵规柟宸叉帴鏀躲€�
             */
            SentStatus[SentStatus["RECEIVED"] = 40] = "RECEIVED";
            /**
             * 瀵规柟宸茶銆�
             */
            SentStatus[SentStatus["READ"] = 50] = "READ";
            /**
             * 瀵规柟宸查攢姣併€�
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
             * token鏃犳晥
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
             * 鍒濆鍖� SDK锛屽湪鏁翠釜搴旂敤鍏ㄥ眬鍙渶瑕佽皟鐢ㄤ竴娆°€�
             * @param appKey    寮€鍙戣€呭悗鍙扮敵璇风殑 AppKey锛岀敤鏉ユ爣璇嗗簲鐢ㄣ€�
             * @param dataAccessProvider 蹇呴』鏄疍ataAccessProvider鐨勫疄渚�
             */
            RongIMClient.init = function (appKey, dataAccessProvider, options, callback) {
                if (RongIMClient._instance) {
                    return RongIMClient._memoryStore.sdkInfo;
                }
                RongIMClient._instance = new RongIMClient();
                options = options || {};
                var protocol = "http://", wsScheme = 'ws://';
                if (location.protocol == 'https:') {
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
                    navi: 'nav2-cn.ronghub.com',
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
                var _sourcePath = {
                    protobuf: 'cdn.ronghub.com/protobuf-2.3.4.min.js'
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
                    snifferTime: 2000
                };
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
                    listenerList: RongIMClient._memoryStore.listenerList,
                    notification: {}
                };
                RongIMClient._memoryStore = tempStore;
                if (dataAccessProvider && Object.prototype.toString.call(dataAccessProvider) == "[object Object]") {
                    RongIMClient._dataAccessProvider = dataAccessProvider;
                }
                else {
                    RongIMClient._dataAccessProvider = new RongIMLib.ServerDataProvider();
                }
                options.appCallback = callback;
                var sdkInfo = RongIMClient._dataAccessProvider.init(appKey, options);
                RongIMClient._memoryStore.sdkInfo = sdkInfo;
                // 鍏煎 c++ 璁剧疆瀵艰埅锛學eb 绔笉鐢熸晥
                RongIMClient._dataAccessProvider.setServerInfo({ navi: location.protocol + options.navi + '/navi.xml' });
                RongIMClient.MessageParams = {
                    TextMessage: { objectName: "RC:TxtMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                    ImageMessage: { objectName: "RC:ImgMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                    DiscussionNotificationMessage: { objectName: "RC:DizNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                    VoiceMessage: { objectName: "RC:VcMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                    RichContentMessage: { objectName: "RC:ImgTextMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                    FileMessage: { objectName: "RC:FileMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                    HandshakeMessage: { objectName: "", msgTag: new RongIMLib.MessageTag(true, true) },
                    UnknownMessage: { objectName: "", msgTag: new RongIMLib.MessageTag(true, true) },
                    LocationMessage: { objectName: "RC:LBSMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                    InformationNotificationMessage: { objectName: "RC:InfoNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                    ContactNotificationMessage: { objectName: "RC:ContactNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                    ProfileNotificationMessage: { objectName: "RC:ProfileNtf", msgTag: new RongIMLib.MessageTag(false, true) },
                    CommandNotificationMessage: { objectName: "RC:CmdNtf", msgTag: new RongIMLib.MessageTag(true, true) },
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
                    ReadReceiptMessage: { objectName: "RC:ReadNtf", msgTag: new RongIMLib.MessageTag(false, false) }
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
                    ReadReceiptMessage: "ReadReceiptMessage"
                };
                RongIMClient.LogFactory = {
                    /**
                     * 涓汉
                     */
                    "-1": {
                        code: "-1",
                        msg: "鏈嶅姟鍣ㄨ秴鏃�"
                    },
                    "-2": {
                        code: "-2",
                        msg: "鏈煡鍘熷洜澶辫触"
                    },
                    "-3": {
                        code: "-3",
                        msg: "鍙傛暟閿欒"
                    },
                    "-4": {
                        code: "-4",
                        msg: "鍙傛暟涓嶆纭垨灏氭湭瀹炰緥鍖�"
                    },
                    "25101": {
                        code: "25101",
                        msg: "鎾ゅ洖娑堟伅鍙傛暟閿欒",
                        desc: "璇锋鏌ユ挙鍥炴秷鎭弬鏁� https://rongcloud.github.io/websdk-demo/api-test.html"
                    },
                    "25102": {
                        code: "25101",
                        msg: "鍙兘鎾ゅ洖鑷彂鍙戦€佺殑娑堟伅"
                    },
                    "20604": {
                        code: "20604",
                        msg: "鍙戦€侀鐜囪繃蹇�",
                        desc: "https://developer.rongcloud.cn/ticket/info/9Q3L6vRKd1cLS7rycA==?type=1"
                    },
                    "20406": {
                        code: "20406",
                        msg: "琚瑷€"
                    },
                    "23407": {
                        code: "23407",
                        msg: "鑾峰彇鐢ㄦ埛澶辫触"
                    },
                    /**
                     * 缇ょ粍
                     */
                    "20407": {
                        code: "20407",
                        msg: "缇ょ粍Id鏃犳晥"
                    },
                    "22408": {
                        code: "22408",
                        msg: "缇ょ粍琚瑷€"
                    },
                    "22406": {
                        code: "22406",
                        msg: "涓嶅湪缇ょ粍"
                    },
                    "35001": {
                        code: "35001",
                        msg: "缇ょ粍鍚屾寮傚父"
                    },
                    "35002": {
                        code: "35002",
                        msg: "鍖归厤缇や俊鎭紓甯�"
                    },
                    /**
                     * 璁ㄨ缁�
                     */
                    "21406": {
                        code: "21406",
                        msg: "涓嶅湪璁ㄨ缁�"
                    },
                    "21407": {
                        code: "21407",
                        msg: "鍔犲叆璁ㄨ澶辫触"
                    },
                    "21408": {
                        code: "21408",
                        msg: "鍒涘缓璁ㄨ缁勫け璐�"
                    },
                    "21409": {
                        code: "21409",
                        msg: "璁剧疆璁ㄨ缁勯個璇风姸鎬佸け璐�"
                    },
                    /**
                     * 鑱婂ぉ瀹�
                     */
                    "23406": {
                        code: "23406",
                        msg: "涓嶅湪鑱婂ぉ瀹�"
                    },
                    "23408": {
                        code: "23408",
                        msg: "鑱婂ぉ瀹よ绂佽█"
                    },
                    "23409": {
                        code: "23409",
                        msg: "鑱婂ぉ瀹や腑鎴愬憳琚涪鍑�"
                    },
                    "23410": {
                        code: "23410",
                        msg: "鑱婂ぉ瀹や笉瀛樺湪"
                    },
                    "23411": {
                        code: "23411",
                        msg: "鑱婂ぉ瀹ゆ垚鍛樺凡婊�"
                    },
                    "23412": {
                        code: "23412",
                        msg: "鑾峰彇鑱婂ぉ瀹や俊鎭弬鏁版棤鏁�"
                    },
                    "23413": {
                        code: "23413",
                        msg: "鑱婂ぉ瀹ゅ紓甯�"
                    },
                    "23414": {
                        code: "23414",
                        msg: "娌℃湁鎵撳紑鑱婂ぉ瀹ゆ秷鎭瓨鍌�"
                    },
                    "36001": {
                        code: "36001",
                        msg: "鍔犲叆鑱婂ぉ瀹d涓虹┖"
                    },
                    "36002": {
                        code: "36002",
                        msg: "鍔犲叆鑱婂ぉ瀹ゅけ璐�"
                    },
                    "36003": {
                        code: "36003",
                        msg: "鎷夊彇鑱婂ぉ瀹ゅ巻鍙叉秷鎭け璐�"
                    },
                    /**
                     * voip
                     */
                    "24001": {
                        code: "24001",
                        msg: "娌℃湁娉ㄥ唽DeviveId 涔熷氨鏄敤鎴锋病鏈夌櫥闄�"
                    },
                    "24002": {
                        code: "24002",
                        msg: "鐢ㄦ埛宸茬粡瀛樺湪"
                    },
                    "0": {
                        code: "0",
                        msg: "鎴愬姛"
                    },
                    "24009": {
                        code: "24009",
                        msg: "娌℃湁瀵瑰簲鐨勭敤鎴锋垨token"
                    },
                    "24013": {
                        code: "24013",
                        msg: "voip涓虹┖"
                    },
                    "24010": {
                        code: "24010",
                        msg: "涓嶆敮鎸佺殑Voip寮曟搸"
                    },
                    "24011": {
                        code: "24011",
                        msg: "channelName 鏄┖"
                    },
                    "24012": {
                        code: "24012",
                        msg: "鐢熸垚Voipkey澶辫触"
                    },
                    "24014": {
                        code: "24014",
                        msg: "娌℃湁閰嶇疆voip"
                    },
                    "24015": {
                        code: "24015",
                        msg: "鏈嶅姟鍣ㄥ唴閮ㄩ敊璇�"
                    },
                    "24016": {
                        code: "24016",
                        msg: "VOIP close"
                    },
                    /**
                     * 閫氳銆佸鑸�
                     */
                    "30001": {
                        code: "30001",
                        msg: "閫氫俊杩囩▼涓紝褰撳墠Socket涓嶅瓨鍦�"
                    },
                    "30002": {
                        code: "30002",
                        msg: "Socket杩炴帴涓嶅彲鐢�"
                    },
                    "30003": {
                        code: "30003",
                        msg: "閫氫俊瓒呮椂"
                    },
                    "30004": {
                        code: "30004",
                        msg: "瀵艰埅鎿嶄綔鏃讹紝Http璇锋眰澶辫触"
                    },
                    "30005": {
                        code: "30005",
                        msg: "HTTP璇锋眰澶辫触"
                    },
                    "30006": {
                        code: "30006",
                        msg: "HTTP鎺ユ敹澶辫触"
                    },
                    "30007": {
                        code: "30007",
                        msg: "瀵艰埅璧勬簮閿欒"
                    },
                    "30008": {
                        code: "30008",
                        msg: "娌℃湁鏈夋晥鏁版嵁"
                    },
                    "30009": {
                        code: "30009",
                        msg: "涓嶅瓨鍦ㄦ湁鏁� IP 鍦板潃"
                    },
                    "30010": {
                        code: "30010",
                        msg: "鍒涘缓 Socket 澶辫触"
                    },
                    "30011": {
                        code: "30011",
                        msg: " Socket 琚柇寮€"
                    },
                    "30012": {
                        code: "30012",
                        msg: "PING 鎿嶄綔澶辫触"
                    },
                    "30013": {
                        code: "30013",
                        msg: "PING 瓒呮椂"
                    },
                    "30014": {
                        code: "30014",
                        msg: "娑堟伅鍙戦€佸け璐�"
                    },
                    "30016": {
                        code: "30016",
                        msg: "娑堟伅澶у皬瓒呴檺锛屾渶澶� 128 KB"
                    },
                    /**
                     * 杩炴帴
                     */
                    "31000": {
                        code: "31000",
                        msg: "鍋� connect 杩炴帴鏃讹紝鏀跺埌鐨� ACK 瓒呮椂"
                    },
                    "31001": {
                        code: "31001",
                        msg: "鍙傛暟閿欒"
                    },
                    "31002": {
                        code: "31002",
                        msg: "鍙傛暟閿欒锛孉pp Id 閿欒"
                    },
                    "31003": {
                        code: "31003",
                        msg: "鏈嶅姟鍣ㄤ笉鍙敤"
                    },
                    "31004": {
                        code: "31004",
                        msg: "Token 閿欒"
                    },
                    "31005": {
                        code: "31005",
                        msg: "App Id 涓� Token 涓嶅尮閰�"
                    },
                    "31006": {
                        code: "31006",
                        msg: "閲嶅畾鍚戯紝鍦板潃閿欒"
                    },
                    "31007": {
                        code: "31007",
                        msg: "NAME 涓庡悗鍙版敞鍐屼俊鎭笉涓€鑷�"
                    },
                    "31008": {
                        code: "31008",
                        msg: "APP 琚睆钄姐€佸垹闄ゆ垨涓嶅瓨鍦�"
                    },
                    "31009": {
                        code: "31009",
                        msg: "鐢ㄦ埛琚睆钄�"
                    },
                    "31010": {
                        code: "31010",
                        msg: "Disconnect锛岀敱鏈嶅姟鍣ㄨ繑鍥烇紝姣斿鐢ㄦ埛浜掕涪"
                    },
                    "31011": {
                        code: "31011",
                        msg: "Disconnect锛岀敱鏈嶅姟鍣ㄨ繑鍥烇紝姣斿鐢ㄦ埛浜掕涪"
                    },
                    /**
                     * 鍗忚
                     */
                    "32001": {
                        code: "32001",
                        msg: "鍗忚灞傚唴閮ㄩ敊璇€俼uery锛屼笂浼犱笅杞借繃绋嬩腑鏁版嵁閿欒"
                    },
                    "32002": {
                        code: "32002",
                        msg: "鍗忚灞傚唴閮ㄩ敊璇�"
                    },
                    /**
                     * BIZ
                     */
                    "33001": {
                        code: "33001",
                        msg: "鏈皟鐢� init 鍒濆鍖栧嚱鏁�"
                    },
                    "33002": {
                        code: "33002",
                        msg: "鏁版嵁搴撳垵濮嬪寲澶辫触"
                    },
                    "33003": {
                        code: "33003",
                        msg: "浼犲叆鍙傛暟鏃犳晥"
                    },
                    "33004": {
                        code: "33004",
                        msg: "閫氶亾鏃犳晥"
                    },
                    "33005": {
                        code: "33005",
                        msg: "閲嶆柊杩炴帴鎴愬姛"
                    },
                    "33006": {
                        code: "33006",
                        msg: "杩炴帴涓紝鍐嶈皟鐢� connect 琚嫆缁�"
                    },
                    "33007": {
                        code: "33007",
                        msg: "娑堟伅婕父鏈嶅姟鏈紑閫�"
                    },
                    "33008": {
                        code: "33008",
                        msg: "娑堟伅娣诲姞澶辫触"
                    },
                    "33009": {
                        code: "33009",
                        msg: "娑堟伅鍒犻櫎澶辫触"
                    },
                    /**
                     * 浼氳瘽
                     */
                    "34001": {
                        code: "34001",
                        msg: "鍒犻櫎浼氳瘽澶辫触"
                    },
                    "34002": {
                        code: "34002",
                        msg: "鎷夊彇鍘嗗彶娑堟伅澶辫触"
                    },
                    "34003": {
                        code: "34003",
                        msg: "浼氳瘽鎸囧畾寮傚父"
                    },
                    "34004": {
                        code: "34004",
                        msg: "鑾峰彇浼氳瘽鏈娑堟伅鎬绘暟澶辫触"
                    },
                    "34005": {
                        code: "34005",
                        msg: "鑾峰彇鎸囧畾浼氳瘽绫诲瀷鏈娑堟伅鏁板紓甯�"
                    },
                    "34006": {
                        code: "34006",
                        msg: "鑾峰彇鎸囧畾鐢ㄦ埛ID&浼氳瘽绫诲瀷鏈娑堟伅鏁板紓甯�"
                    },
                    "34007": {
                        code: "34007",
                        msg: "娓呴櫎浼氳瘽娑堟伅寮傚父"
                    },
                    "34008": {
                        code: "34008",
                        msg: "鑾峰彇浼氳瘽娑堟伅寮傚父"
                    },
                    "34009": {
                        code: "34009",
                        msg: "娓呴櫎鍘嗗彶娑堟伅浼氳瘽绫诲瀷涓嶆纭�"
                    },
                    "34010": {
                        code: "34010",
                        msg: "娓呴櫎鍘嗗彶娑堟伅澶辫触锛岃妫€鏌ヤ紶鍏ュ弬鏁�"
                    },
                    /**
                     * 榛戝悕鍗曞紓甯�
                     */
                    "37001": {
                        code: "37001",
                        msg: "鍔犲叆榛戝悕鍗曞紓甯�"
                    },
                    "37002": {
                        code: "37002",
                        msg: "鑾峰緱鎸囧畾浜哄憳鍐嶉粦鍚嶅崟涓殑鐘舵€佸紓甯�"
                    },
                    "37003": {
                        code: "37003",
                        msg: "绉婚櫎榛戝悕鍗曞紓甯�"
                    },
                    "405": {
                        code: "405",
                        msg: "鍦ㄩ粦鍚嶅崟涓�"
                    },
                    /**
                     * 鑽夌ǹ
                     */
                    "38001": {
                        code: "38001",
                        msg: "鑾峰彇鑽夌ǹ澶辫触"
                    },
                    "38002": {
                        code: "38002",
                        msg: "淇濆瓨鑽夌ǹ澶辫触"
                    },
                    "38003": {
                        code: "38003",
                        msg: "鍒犻櫎鑽夌ǹ澶辫触"
                    },
                    /**
                     * 鍏紬鍙�
                     */
                    "39001": {
                        code: "39001",
                        msg: "鍏虫敞鍏紬鍙峰け璐�"
                    },
                    /**
                     * 鏂囦欢
                     */
                    "41001": {
                        code: "41001",
                        msg: "鏂囦欢绫诲瀷閿欒"
                    },
                    "41002": {
                        code: "41002",
                        msg: "鑾峰彇涓冪墰token澶辫触"
                    },
                    /**
                     *
                     */
                    "51001": {
                        code: "51001",
                        msg: "鏈畨瑁呮垨鏈惎鍔ㄦ彃浠�"
                    },
                    "51002": {
                        code: "51002",
                        msg: "瑙嗛宸茬粡瀛樺湪"
                    },
                    "51003": {
                        code: "51003",
                        msg: "鏃犳晥鐨刢hannelName"
                    },
                    "51004": {
                        code: "51004",
                        msg: "瑙嗛鍐呭涓虹┖"
                    },
                    /**
                     *
                     */
                    "61001": {
                        code: "61001",
                        msg: "鍒犻櫎娑堟伅鏁扮粍闀垮害涓� 0"
                    }
                };
                return sdkInfo;
            };
            ;
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
                    //澶囩敤
                    var error = null;
                    callback(error, instance);
                });
            };
            /**
             * 杩炴帴鏈嶅姟鍣紝鍦ㄦ暣涓簲鐢ㄥ叏灞€鍙渶瑕佽皟鐢ㄤ竴娆★紝鏂嚎鍚� SDK 浼氳嚜鍔ㄩ噸杩炪€�
             *
             * @param token     浠庢湇鍔＄鑾峰彇鐨勭敤鎴疯韩浠戒护鐗岋紙Token锛夈€�
             * @param callback  杩炴帴鍥炶皟锛岃繑鍥炶繛鎺ョ殑鎴愬姛鎴栬€呭け璐ョ姸鎬併€�
             */
            RongIMClient.connect = function (token, _callback, userId, serverConf) {
                RongIMLib.CheckParam.getInstance().check(["string", "object", "string|null|object|global|undefined", "object|null|global|undefined"], "connect", true, arguments);
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
             * 娉ㄥ唽娑堟伅绫诲瀷锛岀敤浜庢敞鍐岀敤鎴疯嚜瀹氫箟鐨勬秷鎭€�
             * 鍐呭缓鐨勬秷鎭被鍨嬪凡缁忔敞鍐岃繃锛屼笉闇€瑕佸啀娆℃敞鍐屻€�
             * 鑷畾涔夋秷鎭０鏄庨渶鏀惧湪鎵ц椤哄簭鏈€楂樼殑浣嶇疆锛堝湪RongIMClient.init(appkey)涔嬪悗鍗冲彲锛�
             * @param objectName  娑堟伅鍐呯疆鍚嶇О
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
             * 璁剧疆杩炴帴鐘舵€佸彉鍖栫殑鐩戝惉鍣ㄣ€�
             *
             * @param listener  杩炴帴鐘舵€佸彉鍖栫殑鐩戝惉鍣ㄣ€�
             */
            RongIMClient.setConnectionStatusListener = function (listener) {
                if (RongIMClient._dataAccessProvider) {
                    RongIMClient._dataAccessProvider.setConnectionStatusListener(listener);
                }
                else {
                    RongIMClient._memoryStore.listenerList.push(listener);
                }
            };
            RongIMClient.statusWatch = function (watcher) {
                if (typeof watcher == 'function') {
                    RongIMClient.statusListeners.push(watcher);
                }
            };
            /**
             * 璁剧疆鎺ユ敹娑堟伅鐨勭洃鍚櫒銆�
             *
             * @param listener  鎺ユ敹娑堟伅鐨勭洃鍚櫒銆�
             */
            RongIMClient.setOnReceiveMessageListener = function (listener) {
                if (RongIMClient._dataAccessProvider) {
                    RongIMClient._dataAccessProvider.setOnReceiveMessageListener(listener);
                }
                else {
                    RongIMClient._memoryStore.listenerList.push(listener);
                }
            };
            /**
             * 娓呯悊鎵€鏈夎繛鎺ョ浉鍏崇殑鍙橀噺
             */
            RongIMClient.prototype.logout = function () {
                RongIMClient._dataAccessProvider.logout();
            };
            /**
             * 鏂紑杩炴帴銆�
             */
            RongIMClient.prototype.disconnect = function () {
                RongIMClient._dataAccessProvider.disconnect();
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
             * 鑾峰彇褰撳墠杩炴帴鐨勭姸鎬併€�
             */
            RongIMClient.prototype.getCurrentConnectionStatus = function () {
                return RongIMClient._dataAccessProvider.getCurrentConnectionStatus();
            };
            /**
             * 鑾峰彇褰撳墠浣跨敤鐨勮繛鎺ラ€氶亾銆�
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
             * 鑾峰彇褰撳墠浣跨敤鐨勬湰鍦板偍瀛樻彁渚涜€呫€� TODO
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
             * 杩囨护鑱婂ぉ瀹ゆ秷鎭紙鎷夊彇鏈€杩戣亰澶╂秷鎭級
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
             * 鑾峰彇褰撳墠杩炴帴鐢ㄦ埛鐨� UserId銆�
             */
            RongIMClient.prototype.getCurrentUserId = function () {
                return RongIMLib.Bridge._client.userId;
            };
            /**
             * 鑾峰彇鏈嶅姟鍣ㄦ椂闂翠笌鏈湴鏃堕棿鐨勫樊鍊硷紝鍗曚綅涓烘绉掋€�
             * 璁＄畻鍏紡锛氬樊鍊� = 鏈湴鏃堕棿姣鏁� - 鏈嶅姟鍣ㄦ椂闂存绉掓暟
             * @param callback  鑾峰彇鐨勫洖璋冿紝杩斿洖宸€笺€�
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
            /**TODO 娓呮鏈湴瀛樺偍鐨勬湭璇绘秷鎭紝鐩墠娓呯┖鍐呭瓨涓殑鏈娑堟伅
             * [clearMessagesUnreadStatus 娓呯┖鎸囧畾浼氳瘽鏈娑堟伅]
             * @param  {ConversationType}        conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                  targetId         [鐢ㄦ埛id]
             * @param  {ResultCallback<boolean>} callback         [杩斿洖鍊硷紝鍙傛暟鍥炶皟]
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
            RongIMClient.prototype.deleteRemoteMessages = function (conversationType, targetId, delMsgs, callback) {
                RongIMLib.CheckParam.getInstance().check(["number", "string|number", "array", "object"], "deleteRemoteMessages", false, arguments);
                if (delMsgs.length == 0) {
                    var errorCode = RongIMLib.ErrorCode.DELETE_MESSAGE_ID_IS_NULL;
                    RongIMClient.logger({
                        code: errorCode,
                        funcName: "deleteRemoteMessages"
                    });
                    callback.onError(RongIMLib.ErrorCode.DELETE_MESSAGE_ID_IS_NULL);
                    return;
                }
                else if (delMsgs.length > 100) {
                    delMsgs.length = 100;
                }
                // 鍚庣画澧炲姞锛屽幓鎺夋敞閲婂嵆鍙�
                callback.onSuccess(true);
                // var modules = new RongIMClient.Protobuf.DeleteMsgInput();
                // modules.setType(conversationType);
                // modules.setConversationId(targetId);
                // modules.setMsgs(delMsgs);
                // RongIMClient.bridge.queryMsg(33, MessageUtil.ArrayForm(modules.toArrayBuffer()), Bridge._client.userId, {
                //     onSuccess: function(info: any) {
                //         callback.onSuccess(true);
                //     },
                //     onError: function(err: any) {
                //         callback.onError(err);
                //     }
                // }, "DeleteMsgOutput");
            };
            /**
             * [deleteMessages 鍒犻櫎娑堟伅璁板綍銆俔
             * @param  {ConversationType}        conversationType [description]
             * @param  {string}                  targetId         [description]
             * @param  {number[]}                messageIds       [description]
             * @param  {ResultCallback<boolean>} callback         [description]
             */
            RongIMClient.prototype.deleteMessages = function (conversationType, targetId, delMsgs, callback) {
                RongIMClient._dataAccessProvider.removeMessage(conversationType, targetId, delMsgs, {
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
            /**
             * [sendMessage 鍙戦€佹秷鎭€俔
             * @param  {ConversationType}        conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                  targetId         [鐩爣Id]
             * @param  {MessageContent}          messageContent   [娑堟伅绫诲瀷]
             * @param  {SendMessageCallback}     sendCallback     []
             * @param  {ResultCallback<Message>} resultCallback   [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             * @param  {string}                  pushContent      []
             * @param  {string}                  pushData         []
             */
            RongIMClient.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType, params) {
                RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object", "object", "undefined|object|null|global|boolean", "undefined|object|null|global|string", "undefined|object|null|global|string", "undefined|object|null|global|number", "undefined|object|null|global"], "sendMessage", false, arguments);
                RongIMClient._dataAccessProvider.sendMessage(conversationType, targetId, messageContent, RongIMClient.logSendCallback(sendCallback, "sendMessage"), mentiondMsg, pushText, appData, methodType, params);
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
             * [sendTextMessage 鍙戦€乀extMessage蹇嵎鏂瑰紡]
             * @param  {string}                  content        [娑堟伅鍐呭]
             * @param  {ResultCallback<Message>} resultCallback [杩斿洖鍊硷紝鍙傛暟鍥炶皟]
             */
            RongIMClient.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
                RongIMClient._dataAccessProvider.sendTextMessage(conversationType, targetId, content, RongIMClient.logSendCallback(sendMessageCallback, "sendTextMessage"));
            };
            RongIMClient.prototype.sendRecallMessage = function (content, sendMessageCallback) {
                var callback = RongIMClient.logSendCallback(sendMessageCallback, "sendRecallMessage");
                var senderUserId = content.senderUserId;
                var userId = RongIMLib.Bridge._client.userId;
                var isOther = (senderUserId != userId);
                if (isOther) {
                    var callback = RongIMClient.logSendCallback(sendMessageCallback, "sendRecallMessage");
                    callback.onError(RongIMLib.ErrorCode.RECALL_MESSAGE, content);
                    return;
                }
                RongIMClient._dataAccessProvider.sendRecallMessage(content, callback);
            };
            /**
             * [insertMessage 鍚戞湰鍦版彃鍏ヤ竴鏉℃秷鎭紝涓嶅彂閫佸埌鏈嶅姟鍣ㄣ€俔
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
            /**
             * [getHistoryMessages 鎷夊彇鍘嗗彶娑堟伅璁板綍銆俔
             * @param  {ConversationType}          conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                    targetId         [鐢ㄦ埛Id]
             * @param  {number|null}               pullMessageTime  [鎷夊彇鍘嗗彶娑堟伅璧峰浣嶇疆(鏍煎紡涓烘绉掓暟)锛屽彲浠ヤ负null]
             * @param  {number}                    count            [鍘嗗彶娑堟伅鏁伴噺]
             * @param  {ResultCallback<Message[]>} callback         [鍥炶皟鍑芥暟]
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
             * [getRemoteHistoryMessages 鎷夊彇鏌愪釜鏃堕棿鎴充箣鍓嶇殑娑堟伅]
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
            /**
             * [hasRemoteUnreadMessages 鏄惁鏈夋湭鎺ユ敹鐨勬秷鎭紝jsonp鏂规硶]
             * @param  {string}          appkey   [appkey]
             * @param  {string}          token    [token]
             * @param  {ConnectCallback} callback [杩斿洖鍊硷紝鍙傛暟鍥炶皟]
             */
            RongIMClient.prototype.hasRemoteUnreadMessages = function (token, callback) {
                RongIMClient._dataAccessProvider.hasRemoteUnreadMessages(token, RongIMClient.logCallback(callback, "hasRemoteUnreadMessages"));
            };
            RongIMClient.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
                RongIMClient._dataAccessProvider.getTotalUnreadCount({
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
             * [getConversationUnreadCount 鎸囧畾澶氱浼氳瘽绫诲瀷鑾峰彇鏈娑堟伅鏁癩
             * @param  {ResultCallback<number>} callback             [杩斿洖鍊硷紝鍙傛暟鍥炶皟銆俔
             * @param  {ConversationType[]}     ...conversationTypes [浼氳瘽绫诲瀷銆俔
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
             * [getUnreadCount 鎸囧畾鐢ㄦ埛銆佷細璇濈被鍨嬬殑鏈娑堟伅鎬绘暟銆俔
             * @param  {ConversationType} conversationType [浼氳瘽绫诲瀷]
             * @param  {string}           targetId         [鐢ㄦ埛Id]
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
             * 娓呮浼氳瘽鏈娑堟伅鏁�
             * @param  {ConversationType}        conversationType 浼氳瘽绫诲瀷
             * @param  {string}                  targetId         鐩爣Id
             * @param  {ResultCallback<boolean>} callback         杩斿洖鍊硷紝鍑芥暟鍥炶皟
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
             * clearTextMessageDraft 娓呴櫎鎸囧畾浼氳瘽鍜屾秷鎭被鍨嬬殑鑽夌ǹ銆�
             * @param  {ConversationType}        conversationType 浼氳瘽绫诲瀷
             * @param  {string}                  targetId         鐩爣Id
             */
            RongIMClient.prototype.clearTextMessageDraft = function (conversationType, targetId) {
                RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "clearTextMessageDraft", false, arguments);
                var key = "darf_" + conversationType + "_" + targetId;
                delete RongIMClient._memoryStore[key];
                return true;
            };
            /**
             * [getTextMessageDraft 鑾峰彇鎸囧畾娑堟伅鍜屼細璇濈殑鑽夌ǹ銆俔
             * @param  {ConversationType}       conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                 targetId         [鐩爣Id]
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
             * @param  {ConversationType}        conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                  targetId         [鐩爣Id]
             * @param  {string}                  value            [鑽夌ǹ鍊糫
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
             * [getConversation 鑾峰彇鎸囧畾浼氳瘽锛屾鏂规硶闇€鍦╣etConversationList涔嬪悗鎵ц]
             * @param  {ConversationType}             conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                       targetId         [鐩爣Id]
             * @param  {ResultCallback<Conversation>} callback         [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
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
             * [pottingConversation 缁勮浼氳瘽鍒楄〃]
             * @param {any} tempConver [涓存椂浼氳瘽]
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
                        conver.latestMessage = RongIMLib.MessageUtil.messageParser(tempConver.msg);
                        conver.latestMessageId = conver.latestMessage.messageId;
                        conver.objectName = conver.latestMessage.objectName;
                        conver.receivedStatus = conver.latestMessage.receivedStatus;
                        conver.receivedTime = conver.latestMessage.receiveTime;
                        conver.sentStatus = conver.latestMessage.sentStatus;
                        conver.sentTime = conver.latestMessage.sentTime;
                        var mentioneds = RongIMClient._storageProvider.getItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conver.conversationType + '_' + conver.targetId);
                        if (mentioneds) {
                            var info = JSON.parse(mentioneds);
                            conver.mentionedMsg = info[tempConver.type + "_" + tempConver.userId];
                        }
                        if (!isUseReplace) {
                            if (RongIMLib.RongUtil.supportLocalStorage()) {
                                var count = RongIMClient._storageProvider.getItem("cu" + RongIMLib.Bridge._client.userId + tempConver.type + tempConver.userId);
                                conver.unreadMessageCount = Number(count);
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
             * [createConversation 鍒涘缓浼氳瘽銆俔
             * @param  {number}  conversationType [浼氳瘽绫诲瀷]
             * @param  {string}  targetId         [鐩爣Id]
             * @param  {string}  converTitle      [浼氳瘽鏍囬]
             * @param  {boolean} islocal          [鏄惁鍚屾鍒版湇鍔″櫒锛宼ure锛氬悓姝ワ紝false:涓嶅悓姝
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
            //TODO 鍒犻櫎鏈湴鍜屾湇鍔″櫒銆佸垹闄ゆ湰鍦板拰鏈嶅姟鍣ㄥ垎寮€
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
             * [getConversationNotificationStatus 鑾峰彇鎸囧畾鐢ㄦ埛鍜屼細璇濈被鍨嬪厤鎻愰啋銆俔
             * @param  {ConversationType}                               conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                                         targetId         [鐩爣Id]
             * @param  {ResultCallback<ConversationNotificationStatus>} callback         [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.getConversationNotificationStatus = function (conversationType, targetId, callback) {
                var params = {
                    conversationType: conversationType,
                    targetId: targetId
                };
                RongIMClient._dataAccessProvider.getConversationNotificationStatus(params, RongIMClient.logCallback(callback, "getConversationNotificationStatus"));
            };
            /**
             * [setConversationNotificationStatus 璁剧疆鎸囧畾鐢ㄦ埛鍜屼細璇濈被鍨嬪厤鎻愰啋銆俔
             * @param  {ConversationType}                               conversationType [浼氳瘽绫诲瀷]
             * @param  {string}                                         targetId         [鐩爣Id]
             * @param  {ResultCallback<ConversationNotificationStatus>} callback         [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
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
             * [getNotificationQuietHours 鑾峰彇鍏嶆彁閱掓秷鎭椂闂淬€俔
             * @param  {GetNotificationQuietHoursCallback} callback [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.getNotificationQuietHours = function (callback) {
                throw new Error("Not implemented yet");
            };
            /**
             * [removeNotificationQuietHours 绉婚櫎鍏嶆彁閱掓秷鎭椂闂淬€俔
             * @param  {GetNotificationQuietHoursCallback} callback [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.removeNotificationQuietHours = function (callback) {
                throw new Error("Not implemented yet");
            };
            /**
             * [setNotificationQuietHours 璁剧疆鍏嶆彁閱掓秷鎭椂闂淬€俔
             * @param  {GetNotificationQuietHoursCallback} callback [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.setNotificationQuietHours = function (startTime, spanMinutes, callback) {
                throw new Error("Not implemented yet");
            };
            // #endregion Notifications
            // #region Discussion
            /**
             * [addMemberToDiscussion   鍔犲叆璁ㄨ缁刔
             * @param  {string}            discussionId [璁ㄨ缁処d]
             * @param  {string[]}          userIdList   [璁ㄨ涓垚鍛榏
             * @param  {OperationCallback} callback     [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) {
                RongIMLib.CheckParam.getInstance().check(["string", "array", "object"], "addMemberToDiscussion", false, arguments);
                RongIMClient._dataAccessProvider.addMemberToDiscussion(discussionId, userIdList, RongIMClient.logCallback(callback, "addMemberToDiscussion"));
            };
            /**
             * [createDiscussion 鍒涘缓璁ㄨ缁刔
             * @param  {string}                   name       [璁ㄨ缁勫悕绉癩
             * @param  {string[]}                 userIdList [璁ㄨ缁勬垚鍛榏
             * @param  {CreateDiscussionCallback} callback   [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.createDiscussion = function (name, userIdList, callback) {
                RongIMLib.CheckParam.getInstance().check(["string", "array", "object"], "createDiscussion", false, arguments);
                RongIMClient._dataAccessProvider.createDiscussion(name, userIdList, callback);
            };
            /**
             * [getDiscussion 鑾峰彇璁ㄨ缁勪俊鎭痌
             * @param  {string}                     discussionId [璁ㄨ缁処d]
             * @param  {ResultCallback<Discussion>} callback     [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.getDiscussion = function (discussionId, callback) {
                RongIMLib.CheckParam.getInstance().check(["string", "object"], "getDiscussion", false, arguments);
                RongIMClient._dataAccessProvider.getDiscussion(discussionId, RongIMClient.logCallback(callback, "getDiscussion"));
            };
            /**
             * [quitDiscussion 閫€鍑鸿璁虹粍]
             * @param  {string}            discussionId [璁ㄨ缁処d]
             * @param  {OperationCallback} callback     [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.quitDiscussion = function (discussionId, callback) {
                RongIMLib.CheckParam.getInstance().check(["string", "object"], "quitDiscussion", false, arguments);
                RongIMClient._dataAccessProvider.quitDiscussion(discussionId, RongIMClient.logCallback(callback, "quitDiscussion"));
            };
            /**
             * [removeMemberFromDiscussion 灏嗘寚瀹氭垚鍛樼Щ闄よ璁虹]
             * @param  {string}            discussionId [璁ㄨ缁処d]
             * @param  {string}            userId       [琚Щ闄ょ殑鐢ㄦ埛Id]
             * @param  {OperationCallback} callback     [杩斿洖鍊硷紝鍙傛暟鍥炶皟]
             */
            RongIMClient.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) {
                RongIMLib.CheckParam.getInstance().check(["string", "string", "object"], "removeMemberFromDiscussion", false, arguments);
                RongIMClient._dataAccessProvider.removeMemberFromDiscussion(discussionId, userId, RongIMClient.logCallback(callback, "removeMemberFromDiscussion"));
            };
            /**
             * [setDiscussionInviteStatus 璁剧疆璁ㄨ缁勯個璇风姸鎬乚
             * @param  {string}                 discussionId [璁ㄨ缁処d]
             * @param  {DiscussionInviteStatus} status       [閭€璇风姸鎬乚
             * @param  {OperationCallback}      callback     [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) {
                RongIMLib.CheckParam.getInstance().check(["string", "number", "object"], "setDiscussionInviteStatus", false, arguments);
                RongIMClient._dataAccessProvider.setDiscussionInviteStatus(discussionId, status, RongIMClient.logCallback(callback, "setDiscussionInviteStatus"));
            };
            /**
             * [setDiscussionName 璁剧疆璁ㄨ缁勫悕绉癩
             * @param  {string}            discussionId [璁ㄨ缁処d]
             * @param  {string}            name         [璁ㄨ缁勫悕绉癩
             * @param  {OperationCallback} callback     [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.setDiscussionName = function (discussionId, name, callback) {
                RongIMLib.CheckParam.getInstance().check(["string", "string", "object"], "setDiscussionName", false, arguments);
                RongIMClient._dataAccessProvider.setDiscussionName(discussionId, name, RongIMClient.logCallback(callback, "setDiscussionName"));
            };
            // #endregion Discussion
            // #region ChatRoom
            /**
             * [鍔犲叆鑱婂ぉ瀹ゃ€俔
             * @param  {string}            chatroomId   [鑱婂ぉ瀹d]
             * @param  {number}            messageCount [鎷夊彇娑堟伅鏁伴噺锛�-1涓轰笉鎷夊幓娑堟伅]
             * @param  {OperationCallback} callback     [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.joinChatRoom = function (chatroomId, messageCount, callback) {
                RongIMLib.CheckParam.getInstance().check(["string|number", "number", "object"], "joinChatRoom", false, arguments);
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
                RongIMLib.CheckParam.getInstance().check(["string|number", "number"], "setChatroomHisMessageTimestamp", false, arguments);
                RongIMClient._dataAccessProvider.setChatroomHisMessageTimestamp(chatRoomId, timestamp);
            };
            RongIMClient.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
                RongIMLib.CheckParam.getInstance().check(["string|number", "number", "number", "object"], "getChatRoomHistoryMessages", false, arguments);
                RongIMClient._dataAccessProvider.getChatRoomHistoryMessages(chatRoomId, count, order, RongIMClient.logCallback(callback, "getChatRoomHistoryMessages"));
            };
            RongIMClient.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
                RongIMLib.CheckParam.getInstance().check(["string|number", "number", "number", "object"], "getChatRoomInfo", false, arguments);
                RongIMClient._dataAccessProvider.getChatRoomInfo(chatRoomId, count, order, RongIMClient.logCallback(callback, "getChatRoomInfo"));
            };
            /**
             * [閫€鍑鸿亰澶╁]
             * @param  {string}            chatroomId [鑱婂ぉ瀹d]
             * @param  {OperationCallback} callback   [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.quitChatRoom = function (chatroomId, callback) {
                RongIMLib.CheckParam.getInstance().check(["string|number", "object"], "quitChatRoom", false, arguments);
                RongIMClient._dataAccessProvider.quitChatRoom(chatroomId, RongIMClient.logCallback(callback, "quitChatRoom"));
            };
            // #endregion ChatRoom
            // #region Public Service
            RongIMClient.prototype.getRemotePublicServiceList = function (callback, pullMessageTime) {
                RongIMClient._dataAccessProvider.getRemotePublicServiceList(RongIMClient.logCallback(callback, "getRemotePublicServiceList"), pullMessageTime);
            };
            /**
             * [getPublicServiceList ]鑾峰彇鏈湴鐨勫叕鍏辫处鍙峰垪琛�
             * @param  {ResultCallback<PublicServiceProfile[]>} callback [杩斿洖鍊硷紝鍙傛暟鍥炶皟]
             */
            RongIMClient.prototype.getPublicServiceList = function (callback) {
                if (RongIMClient._memoryStore.depend.openMp) {
                    RongIMLib.CheckParam.getInstance().check(["object"], "getPublicServiceList", false, arguments);
                    this.getRemotePublicServiceList(RongIMClient.logCallback(callback, "getPublicServiceList"));
                }
            };
            /**
             * [getPublicServiceProfile ]   鑾峰彇鏌愬叕鍏辨湇鍔′俊鎭€�
             * @param  {PublicServiceType}                    publicServiceType [鍏紬鏈嶅姟绫诲瀷銆俔
             * @param  {string}                               publicServiceId   [鍏叡鏈嶅姟 Id銆俔
             * @param  {ResultCallback<PublicServiceProfile>} callback          [鍏叡璐﹀彿淇℃伅鍥炶皟銆俔
             */
            RongIMClient.prototype.getPublicServiceProfile = function (publicServiceType, publicServiceId, callback) {
                if (RongIMClient._memoryStore.depend.openMp) {
                    RongIMLib.CheckParam.getInstance().check(["number", "string|number", "object"], "getPublicServiceProfile", false, arguments);
                    RongIMClient._dataAccessProvider.getPublicServiceProfile(publicServiceType, publicServiceId, RongIMClient.logCallback(callback, "getPublicServiceProfile"));
                }
            };
            /**
             * [pottingPublicSearchType ] 鍏紬濂芥煡璇㈢被鍨�
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
             * [searchPublicService ]鎸夊叕浼楁湇鍔＄被鍨嬫悳绱㈠叕浼楁湇鍔°€�
             * @param  {SearchType}                             searchType [鎼滅储绫诲瀷鏋氫妇銆俔
             * @param  {string}                                 keywords   [鎼滅储鍏抽敭瀛椼€俔
             * @param  {ResultCallback<PublicServiceProfile[]>} callback   [鎼滅储缁撴灉鍥炶皟銆俔
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
             * [searchPublicServiceByType ]鎸夊叕浼楁湇鍔＄被鍨嬫悳绱㈠叕浼楁湇鍔°€�
             * @param  {PublicServiceType}                      publicServiceType [鍏紬鏈嶅姟绫诲瀷銆俔
             * @param  {SearchType}                             searchType        [鎼滅储绫诲瀷鏋氫妇銆俔
             * @param  {string}                                 keywords          [鎼滅储鍏抽敭瀛椼€俔
             * @param  {ResultCallback<PublicServiceProfile[]>} callback          [鎼滅储缁撴灉鍥炶皟銆俔
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
             * [subscribePublicService ] 璁㈤槄鍏紬鍙枫€�
             * @param  {PublicServiceType} publicServiceType [鍏紬鏈嶅姟绫诲瀷銆俔
             * @param  {string}            publicServiceId   [鍏叡鏈嶅姟 Id銆俔
             * @param  {OperationCallback} callback          [璁㈤槄鍏紬鍙峰洖璋冦€俔
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
             * [unsubscribePublicService ] 鍙栨秷璁㈤槄鍏紬鍙枫€�
             * @param  {PublicServiceType} publicServiceType [鍏紬鏈嶅姟绫诲瀷銆俔
             * @param  {string}            publicServiceId   [鍏叡鏈嶅姟 Id銆俔
             * @param  {OperationCallback} callback          [鍙栨秷璁㈤槄鍏紬鍙峰洖璋冦€俔
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
             * [鍔犲叆榛戝悕鍗昡
             * @param  {string}            userId   [灏嗚鍔犲叆榛戝悕鍗曠殑鐢ㄦ埛Id]
             * @param  {OperationCallback} callback [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.addToBlacklist = function (userId, callback) {
                RongIMLib.CheckParam.getInstance().check(["string|number", "object"], "addToBlacklist", false, arguments);
                RongIMClient._dataAccessProvider.addToBlacklist(userId, RongIMClient.logCallback(callback, "addToBlacklist"));
            };
            /**
             * [鑾峰彇榛戝悕鍗曞垪琛╙
             * @param  {GetBlacklistCallback} callback [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.getBlacklist = function (callback) {
                RongIMLib.CheckParam.getInstance().check(["object"], "getBlacklist", false, arguments);
                RongIMClient._dataAccessProvider.getBlacklist(callback);
            };
            /**
             * [寰楀埌鎸囧畾浜哄憳鍐嶉粦鍚嶅崟涓殑鐘舵€乚
             * @param  {string}                          userId   [description]
             * @param  {ResultCallback<BlacklistStatus>} callback [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            //TODO 濡傛灉浜哄憳涓嶅湪榛戝悕鍗曚腑锛岃幏鍙栫姸鎬佷細鍑虹幇寮傚父
            RongIMClient.prototype.getBlacklistStatus = function (userId, callback) {
                RongIMLib.CheckParam.getInstance().check(["string|number", "object"], "getBlacklistStatus", false, arguments);
                RongIMClient._dataAccessProvider.getBlacklistStatus(userId, RongIMClient.logCallback(callback, "getBlacklistStatus"));
            };
            /**
             * [灏嗘寚瀹氱敤鎴风Щ闄ら粦鍚嶅崟]
             * @param  {string}            userId   [灏嗚绉婚櫎鐨勭敤鎴稩d]
             * @param  {OperationCallback} callback [杩斿洖鍊硷紝鍑芥暟鍥炶皟]
             */
            RongIMClient.prototype.removeFromBlacklist = function (userId, callback) {
                RongIMLib.CheckParam.getInstance().check(["string|number", "object"], "removeFromBlacklist", false, arguments);
                RongIMClient._dataAccessProvider.removeFromBlacklist(userId, RongIMClient.logCallback(callback, "removeFromBlacklist"));
            };
            RongIMClient.prototype.getFileToken = function (fileType, callback) {
                RongIMLib.CheckParam.getInstance().check(["number", "object"], "getQngetFileTokenTkn", false, arguments);
                RongIMClient._dataAccessProvider.getFileToken(fileType, RongIMClient.logCallback(callback, "getFileToken"));
            };
            RongIMClient.prototype.getFileUrl = function (fileType, fileName, oriName, callback) {
                RongIMLib.CheckParam.getInstance().check(["number", "string", "string|global|object|null", "object"], "getFileUrl", false, arguments);
                RongIMClient._dataAccessProvider.getFileUrl(fileType, fileName, oriName, RongIMClient.logCallback(callback, "getFileUrl"));
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
                RongIMClient._dataAccessProvider.joinRTCRoom(room, callback);
            };
            RongIMClient.prototype.quitRTCRoom = function (room, callback) {
                RongIMLib.CheckParam.getInstance().check(["object", "object"], "quitRTCRoom", false, arguments);
                RongIMClient._dataAccessProvider.quitRTCRoom(room, callback);
            };
            RongIMClient.prototype.RTCPing = function (room, callback) {
                RongIMLib.CheckParam.getInstance().check(["object", "object"], "RTCPing", false, arguments);
                RongIMClient._dataAccessProvider.RTCPing(room, callback);
            };
            RongIMClient.prototype.setRTCUserData = function (roomId, key, value, isInner, callback, message) {
                RongIMLib.CheckParam.getInstance().check(["string", "string", "string", "boolean", "object", "global|object|null|undefined"], "setRTCUserData", false, arguments);
                RongIMClient._dataAccessProvider.setRTCUserData(roomId, key, value, isInner, callback, message);
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
            RongIMClient.prototype.getNavi = function () {
                return RongIMClient._dataAccessProvider.getNavi();
            };
            RongIMClient.prototype.getRTCToken = function (room, callback) {
                RongIMLib.CheckParam.getInstance().check(["object", "object"], "getRTCToken", false, arguments);
                return RongIMClient._dataAccessProvider.getRTCToken(room, callback);
            };
            RongIMClient.prototype.getAppInfo = function () {
                var appKey = RongIMClient._memoryStore.appKey;
                return {
                    appKey: appKey
                };
            };
            RongIMClient.RTCListener = function () { };
            RongIMClient.LogFactory = {};
            RongIMClient.MessageType = {};
            RongIMClient.RegisterMessage = {};
            RongIMClient._memoryStore = { listenerList: [], isPullFinished: false, syncMsgQueue: [] };
            RongIMClient.isNotPullMsg = false;
            RongIMClient.userStatusObserver = null;
            RongIMClient.sdkver = '2.4.0';
            RongIMClient.otherDeviceLoginCount = 0;
            RongIMClient.serverStore = { index: 0 };
            RongIMClient.isFirstConnect = true;
            RongIMClient.statusListeners = [];
            RongIMClient.userStatusListener = null;
            return RongIMClient;
        })();
        RongIMLib.RongIMClient = RongIMClient;
    })(RongIMLib || (RongIMLib = {}));
//鐢ㄤ簬杩炴帴閫氶亾
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
        var _topic = [
            "invtDiz", "crDiz", "qnUrl", "userInf", "dizInf", "userInf", "joinGrp", "quitDiz", "exitGrp", "evctDiz",
            ["", "ppMsgP", "pdMsgP", "pgMsgP", "chatMsg", "pcMsgP", "", "pmcMsgN", "pmpMsgN", "", "", "", "prMsgS"],
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
                    // 涓存椂鍏煎 Comet 閫昏緫锛孋omet 涓敤鍒�
                    var userId = storage.getItem('rong_current_user');
                    RongIMLib.Navigation.Endpoint = {
                        host: host,
                        userId: userId
                    };
                };
                var connectMap = {
                    ws: function () {
                        // 鎵€鏈夐摼鎺ヨ绠楀櫒锛岃秴杩� 15 绉掑悗璁や负鎵€鏈� CMP 鍦板潃鍧囦笉鍙敤
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
                                };
                                var xhr = RongIMLib.MessageUtil.detectCMP({
                                    url: url,
                                    success: onSuccess,
                                    fail: function (code) {
                                        console.log(code);
                                    }
                                });
                                xhrs.push(xhr);
                            }, time);
                            timers.push(timer);
                        };
                        var snifferCallback = function (url) {
                            var reg = /(http|https):\/\/([^\/]+)/i;
                            var host = url.match(reg)[2];
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
                            }
                        }
                        totalTimer.resume(function () {
                            RongIMLib.Navigation.clear();
                            clearHandler();
                            that.socket.fire("StatusChanged", RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
                        });
                    },
                    comet: function () {
                        var host = servers[0];
                        startConnect(host);
                    }
                };
                var isPolling = depend.isPolling;
                var type = isPolling ? 'comet' : 'ws';
                connectMap[type]();
                //娉ㄥ唽鐘舵€佹敼鍙樿瀵熻€�
                var StatusEvent = Channel._ConnectionStatusListener;
                var hasEvent = (typeof StatusEvent == "object");
                var me = this;
                me.socket.on("StatusChanged", function (code) {
                    if (!hasEvent) {
                        throw new Error("setConnectStatusListener:Parameter format is incorrect");
                    }
                    var isNetworkUnavailable = (code == RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
                    var isWebSocket = !RongIMLib.RongIMClient._memoryStore.depend.isPolling;
                    if (RongIMLib.RongIMClient.isFirstConnect && isNetworkUnavailable && isWebSocket) {
                        code = RongIMLib.ConnectionStatus.WEBSOCKET_UNAVAILABLE;
                    }
                    me.connectionStatus = code;
                    setTimeout(function () {
                        StatusEvent.onChanged(code);
                    });
                    var isDisconnected = (code == RongIMLib.ConnectionStatus.DISCONNECTED);
                    if (isDisconnected) {
                        self.clearHeartbeat();
                    }
                    var isOtherDevice = (code == RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT);
                    if (isOtherDevice) {
                        // 绱鍏朵粬璁惧鐧婚檰娆℃暟锛岃秴杩� 5 娆″悗锛岃嚜鍔ㄩ攢姣佸唴閮ㄥ璞�
                        // 鍒犻櫎浣嶇疆锛歋erverDataProivder.prototype.connect
                        RongIMLib.RongIMClient.otherDeviceLoginCount++;
                    }
                    var isConnected = (code == RongIMLib.ConnectionStatus.CONNECTED);
                    if (isConnected) {
                        RongIMLib.RongIMClient.isFirstConnect = false;
                    }
                    var isWebsocketUnAvailable = (code == RongIMLib.ConnectionStatus.WEBSOCKET_UNAVAILABLE);
                    if (isWebsocketUnAvailable) {
                        me.changeConnectType();
                        RongIMLib.RongIMClient.isFirstConnect = false;
                        RongIMLib.RongIMClient.connect(self.token, RongIMLib.RongIMClient._memoryStore.callback);
                    }
                });
                //娉ㄥ唽message瑙傚療鑰�
                this.socket.on("message", self.handler.handleMessage);
                //娉ㄥ唽鏂紑杩炴帴瑙傚療鑰�
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
             * [checkTransport 杩斿洖閫氶亾绫诲瀷]
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
            //娑堟伅閫氶亾甯搁噺锛屾墍鏈夊拰閫氶亾鐩稿叧鍒ゆ柇鍧囩敤 XHR_POLLING WEBSOCKET涓ゅ睘鎬�
            Socket.XHR_POLLING = "xhr-polling";
            Socket.WEBSOCKET = "websocket";
            return Socket;
        })();
        RongIMLib.Socket = Socket;
        //杩炴帴绔秷鎭疮
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
                    me.channel.disconnect();
                }, this.timeoutMillis);
            };
            Client.prototype.pauseTimer = function () {
                if (this.timeout_) {
                    clearTimeout(this.timeout_);
                    this.timeout_ = 0;
                }
            };
            Client.prototype.connect = function (_callback) {
                //瀹炰緥娑堟伅澶勭悊绫�
                this.handler = new MessageHandler(this);
                //璁剧疆杩炴帴鍥炶皟
                this.handler.setConnectCallback(_callback);
                //瀹炰緥閫氶亾绫诲瀷
                var me = this;
                this.channel = new Channel(function () {
                    RongIMLib.Transportations._TransportType == Socket.WEBSOCKET && me.keepLive();
                }, this);
                //瑙﹀彂鐘舵€佹敼鍙樿瀵熻€�
                this.channel.socket.fire("StatusChanged", RongIMLib.ConnectionStatus.CONNECTING);
                //娌℃湁杩斿洖鍦板潃灏辨墜鍔ㄦ姏鍑洪敊璇�
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
            Client.prototype.publishMessage = function (_topic, _data, _targetId, _callback, _msg) {
                var msgId = RongIMLib.MessageIdHandler.messageIdPlus(this.channel.reconnect);
                if (!msgId) {
                    return;
                }
                var msg = new RongIMLib.PublishMessage(_topic, _data, _targetId);
                msg.setMessageId(msgId);
                if (_callback) {
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
                if (temp.type != 2) {
                    //鏅€氭秷鎭�
                    time = localSyncTime.received;
                    modules = new RongIMLib.RongIMClient.Protobuf.SyncRequestMsg();
                    modules.setIspolling(false);
                    str = "pullMsg";
                    target = this.userId;
                    modules.setSendBoxSyncTime(sentBoxTime);
                }
                else {
                    //鑱婂ぉ瀹ゆ秷鎭�
                    target = temp.chrmId || me.chatroomId;
                    time = RongIMLib.RongIMClient._memoryStore.lastReadTime.get(target + Bridge._client.userId + "CST") || 0;
                    modules = new RongIMLib.RongIMClient.Protobuf.ChrmPullMsg();
                    modules.setCount(0);
                    str = "chrmPull";
                    if (!target) {
                        throw new Error("syncTime:Received messages of chatroom but was not init");
                    }
                }
                //鍒ゆ柇鏈嶅姟鍣ㄧ粰鐨勬椂闂存槸鍚︽秷鎭湰鍦板瓨鍌ㄧ殑鏃堕棿锛屽皬浜庣殑璇濅笉鎵ц鎷夊彇鎿嶄綔锛岃繘琛屼竴涓嬫闃熷垪鎿嶄綔
                if (temp.pulltime <= time) {
                    this.SyncTimeQueue.state = "complete";
                    this.invoke(isPullMsg, target, offlineMsg);
                    return;
                }
                if (isPullMsg && 'setIsPullSend' in modules) {
                    modules.setIsPullSend(true);
                }
                modules.setSyncTime(time);
                //鍙戦€乹ueryMessage璇锋眰
                this.queryMessage(str, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), target, Qos.AT_LEAST_ONCE, {
                    onSuccess: function (collection) {
                        var sync = RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime), symbol = target;
                        //鎶婅繑鍥炴椂闂存埑瀛樺叆鏈湴锛屾櫘閫氭秷鎭痥ey涓簎serid锛岃亰澶╁娑堟伅key涓簎serid锛�'CST'锛泇alue閮戒负鏈嶅姟鍣ㄨ繑鍥炵殑鏃堕棿鎴�
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
                        //鎶婃媺鍙栧埌鐨勬秷鎭€愭潯浼犵粰娑堟伅鐩戝惉鍣�
                        var list = collection.list;
                        var isPullFinished = collection.finished;
                        // chrmPull 娌℃湁 finished 瀛楁锛岃嚜鍔ㄨ缃负鎷夊彇瀹屾垚
                        if (isChrmPull) {
                            isPullFinished = true;
                        }
                        RongIMLib.RongIMClient._memoryStore.isPullFinished = isPullFinished;
                        var connectAckTime = RongIMLib.RongIMClient._memoryStore.connectAckTime;
                        for (var i = 0, len = list.length, count = len; i < len; i++) {
                            count -= 1;
                            var message = list[i];
                            var sentTime = RongIMLib.MessageUtil.int64ToTimestamp(message.dataTime);
                            var isSender = message.direction == RongIMLib.MessageDirection.SEND;
                            var compareTime = isSender ? sentBoxTime : time;
                            if (sentTime > compareTime) {
                                var isSyncMessage = false;
                                var isOffLineMessage = sentTime < connectAckTime;
                                Bridge._client.handler.onReceived(message, undefined, isOffLineMessage, count, isSyncMessage, isPullFinished);
                            }
                        }
                        me.SyncTimeQueue.state = "complete";
                        me.invoke(isPullMsg, target, offlineMsg);
                    },
                    onError: function (error) {
                        me.SyncTimeQueue.state = "complete";
                        me.invoke(isPullMsg, target, offlineMsg);
                    }
                }, "DownStreamMessages");
            };
            Client.prototype.syncTime = function (_type, pullTime, chrmId, offlineMsg) {
                this.SyncTimeQueue.push({ type: _type, pulltime: pullTime, chrmId: chrmId });
                //濡傛灉闃熷垪涓彧鏈変竴涓垚鍛樺苟涓旂姸鎬佸凡缁忓畬鎴愬氨鎵цinvoke鏂规硶
                if (this.SyncTimeQueue.length == 1 && this.SyncTimeQueue.state == "complete") {
                    this.invoke(!_type, chrmId, offlineMsg);
                }
            };
            Client.prototype.__init = function (f) {
                this.handler = new MessageHandler(this);
                //璁剧疆杩炴帴鍥炶皟
                this.handler.setConnectCallback(RongIMLib.RongIMClient._memoryStore.callback);
                this.channel = new Channel(f, this);
            };
            Client.userInfoMapping = {};
            return Client;
        })();
        RongIMLib.Client = Client;
        //杩炴帴绫伙紝瀹炵幇imclient涓巆onnect_client鐨勮繛鎺�
        var Bridge = (function () {
            function Bridge() {
            }
            Bridge.getInstance = function () {
                return new Bridge();
            };
            //杩炴帴鏈嶅姟鍣�
            Bridge.prototype.connect = function (appKey, token, callback) {
                if (!RongIMLib.RongIMClient.Protobuf) {
                    return;
                }
                Bridge._client = new RongIMLib.Navigation().connect(appKey, token, callback);
                return Bridge._client;
            };
            Bridge.prototype.setListener = function (_changer) {
                if (typeof _changer == "object") {
                    if (typeof _changer.onChanged == "function") {
                        Channel._ConnectionStatusListener = _changer;
                    }
                    else if (typeof _changer.onReceived == "function") {
                        Channel._ReceiveMessageListener = _changer;
                    }
                }
            };
            Bridge.prototype.reconnect = function (callabck) {
                Bridge._client.channel.reconnect(callabck);
            };
            Bridge.prototype.disconnect = function () {
                Bridge._client.channel.disconnect(2);
            };
            //鎵цqueryMessage璇锋眰
            Bridge.prototype.queryMsg = function (topic, content, targetId, callback, pbname) {
                if (typeof topic != "string") {
                    topic = _topic[topic];
                }
                Bridge._client.queryMessage(topic, content, targetId, Qos.AT_MOST_ONCE, callback, pbname);
            };
            //鍙戦€佹秷鎭� 鎵цpublishMessage 璇锋眰
            Bridge.prototype.pubMsg = function (topic, content, targetId, callback, msg, methodType) {
                if (typeof methodType == 'number') {
                    if (methodType == RongIMLib.MethodType.CUSTOMER_SERVICE) {
                        Bridge._client.publishMessage("pcuMsgP", content, targetId, callback, msg);
                    }
                    else if (methodType == RongIMLib.MethodType.RECALL) {
                        Bridge._client.publishMessage("recallMsg", content, targetId, callback, msg);
                    }
                }
                else {
                    Bridge._client.publishMessage(_topic[10][topic], content, targetId, callback, msg);
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
            //鎶婂璞℃帹鍏ュ洖璋冨璞￠槦鍒椾腑锛屽苟鍚姩瀹氭椂鍣�
            MessageHandler.prototype.putCallback = function (callbackObj, _publishMessageId, _msg) {
                var item = {
                    Callback: callbackObj,
                    Message: _msg
                };
                item.Callback.resumeTimer();
                this.map[_publishMessageId] = item;
            };
            //璁剧疆杩炴帴鍥炶皟瀵硅薄锛屽惎鍔ㄥ畾鏃跺櫒
            MessageHandler.prototype.setConnectCallback = function (_connectCallback) {
                if (_connectCallback) {
                    this.connectCallback = new RongIMLib.ConnectAck(_connectCallback.onSuccess, _connectCallback.onError, this._client);
                }
            };
            MessageHandler.prototype.onReceived = function (msg, pubAckItem, offlineMsg, leftCount, isSync) {
                //瀹炰綋瀵硅薄
                var entity,
                    //瑙ｆ瀽瀹屾垚鐨勬秷鎭璞�
                    message,
                    //浼氳瘽瀵硅薄
                    con;
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
                    else {
                        if (Bridge._client.sdkVer && Bridge._client.sdkVer == "1.0.0") {
                            return;
                        }
                        entity = RongIMLib.RongIMClient.Protobuf.UpStreamMessage.decode(msg.getData());
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
                        //澶嶇敤瀛楁锛宼argetId 浠ユ涓哄噯
                        entity.groupId = msg.getTargetId();
                        entity.fromUserId = this._client.userId;
                        entity.dataTime = Date.parse(new Date().toString());
                    }
                    if (!entity) {
                        return;
                    }
                }
                var isPullFinished = RongIMLib.RongIMClient._memoryStore.isPullFinished;
                // PullMsg 娌℃湁鎷夊彇瀹屾垚锛屾姏寮冩墍鏈夌洿鍙戝湪绾挎秷鎭紝鎶涘純鐨勬秷鎭細鍦� PullMsg 涓繑鍥�
                if (!isPullFinished && !offlineMsg) {
                    return;
                }
                //瑙ｆ瀽瀹炰綋瀵硅薄涓烘秷鎭璞°€�
                message = RongIMLib.MessageUtil.messageParser(entity, this._onReceived, offlineMsg);
                var isRTCMessage = message.conversationType == 12;
                if (isRTCMessage) {
                    return RongIMLib.RongIMClient.RTCListener(message);
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
                // 璁剧疆浼氳瘽鏃堕棿鎴冲苟涓斿垽鏂槸鍚︿紶閫� message  鍙戦€佹秷鎭湭澶勭悊浼氳瘽鏃堕棿鎴�
                // key锛�'converST_' + 褰撳墠鐢ㄦ埛 + conversationType + targetId
                // RongIMClient._storageProvider.setItem('converST_' + Bridge._client.userId + message.conversationType + message.targetId, message.sentTime);
                var isPersited = (RongIMLib.RongIMClient.MessageParams[message.messageType].msgTag.getMessageTag() > 0);
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
                    if (isReceiver) {
                        con.unreadMessageCount = con.unreadMessageCount + 1;
                        if (RongIMLib.RongUtil.supportLocalStorage()) {
                            var originUnreadCount = RongIMLib.RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + con.conversationType + con.targetId); // 涓庢湰鍦板瓨鍌ㄤ細璇濆悎骞�
                            var newUnreadCount = Number(originUnreadCount) + 1;
                            RongIMLib.RongIMClient._storageProvider.setItem("cu" + Bridge._client.userId + con.conversationType + message.targetId, newUnreadCount);
                            con.unreadMessageCount = newUnreadCount;
                        }
                    }
                    con.receivedTime = new Date().getTime();
                    con.receivedStatus = message.receivedStatus;
                    con.senderUserId = message.sendUserId;
                    con.notificationStatus = RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;
                    con.latestMessageId = message.messageId;
                    con.latestMessage = message;
                    con.sentTime = message.sentTime;
                    RongIMLib.RongIMClient._dataAccessProvider.addConversation(con, { onSuccess: function (data) { }, onError: function () { } });
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
                var d = new Date(), m = d.getMonth() + 1, date = d.getFullYear() + '/' + (m.toString().length == 1 ? '0' + m : m) + '/' + d.getDate();
                //new Date(date).getTime() - message.sentTime < 1 閫昏緫鍒ゆ柇 瓒呰繃 1 澶╂湭鏀剁殑 ReadReceiptRequestMessage 绂荤嚎娑堟伅鑷姩蹇界暐銆�
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
                    var receiptResponseMsg = message.content, uIds = receiptResponseMsg.receiptMessageDic[Bridge._client.userId], sentkey = "", sentObj;
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
                    setTimeout(function () {
                        that._onReceived(message, count, hasMore);
                    });
                }
            };
            MessageHandler.prototype.handleMessage = function (msg) {
                if (!msg) {
                    return;
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
                            //濡傛灉鏄疨ublishMessage灏辨妸璇ュ璞＄粰onReceived鏂规硶鎵ц澶勭悊
                            Bridge._client.handler.onReceived(msg);
                        }
                        break;
                    case "QueryAckMessage":
                        if (msg.getQos() != 0) {
                            Bridge._client.channel.writeAndFlush(new RongIMLib.QueryConMessage(msg.getMessageId()));
                        }
                        var temp = Bridge._client.handler.map[msg.getMessageId()];
                        if (temp) {
                            //鎵ц鍥炶皟鎿嶄綔
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
                            token: entity.token
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
                        return;
                    }
                    if ("GetUserInfoOutput" == pbtype) {
                        //pb绫诲瀷涓篏etUserInfoOutput鐨勮瘽灏辨妸data鏀惧叆userinfo缂撳瓨闃熷垪
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
                        setTimeout(function () { me._cb(userId); }, 500);
                    }
                    RongIMLib.RongIMClient._memoryStore.connectAckTime = timestamp;
                    if (!(new Date().getTime() - timestamp)) {
                        RongIMLib.RongIMClient._memoryStore.deltaTime = 0;
                    }
                    else {
                        RongIMLib.RongIMClient._memoryStore.deltaTime = new Date().getTime() - timestamp;
                    }
                }
                else if (status == 6) {
                    RongIMLib.RongIMClient.getInstance().disconnect();
                    //閲嶅畾鍚� 杩為敊 CMP
                    var me = this;
                    var _client = me._client;
                    var appId = _client.appId, token = _client.token;
                    new RongIMLib.Navigation().getServerEndpoint(token, appId, function () {
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
                window.getServerEndpoint = function (result) {
                    var storage = RongIMLib.RongIMClient._storageProvider;
                    storage.setItem('fullnavi', JSON.stringify(result));
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
                    if (result.voipCallInfo) {
                        var callInfo = JSON.parse(result.voipCallInfo);
                        RongIMLib.RongIMClient._memoryStore.voipStategy = callInfo.strategy;
                        storage.setItem("voipStrategy", callInfo.strategy);
                    }
                    //鏇挎崲鏈湴瀛樺偍鐨勫鑸俊鎭�
                    var openMp = result.openMp;
                    storage.setItem('openMp' + uid, openMp);
                    RongIMLib.RongIMClient._memoryStore.depend.openMp = openMp;
                    var StatusEvent = RongIMLib.Channel._ConnectionStatusListener;
                    StatusEvent.onChanged(RongIMLib.ConnectionStatus.RESPONSE_NAVI);
                };
            }
            Navigation.clear = function () {
                var storage = RongIMLib.RongIMClient._storageProvider;
                storage.removeItem('rc_uid');
                storage.removeItem('serverIndex');
                storage.removeItem('rongSDK');
            };
            Navigation.prototype.connect = function (appId, token, callback) {
                var oldAppId = RongIMLib.RongIMClient._storageProvider.getItem("appId");
                //濡傛灉appid鍜屾湰鍦板瓨鍌ㄧ殑涓嶄竴鏍凤紝娓呯┖鎵€鏈夋湰鍦板瓨鍌ㄦ暟鎹�
                if (oldAppId && oldAppId != appId) {
                    RongIMLib.RongIMClient._storageProvider.clearItem();
                    RongIMLib.RongIMClient._storageProvider.setItem("appId", appId);
                }
                if (!oldAppId) {
                    RongIMLib.RongIMClient._storageProvider.setItem("appId", appId);
                }
                var client = new RongIMLib.Client(token, appId);
                var me = this;
                this.getServerEndpoint(token, appId, function () {
                    client.connect(callback);
                }, callback.onError, true);
                return client;
            };
            Navigation.prototype.getServerEndpoint = function (token, appId, _onsuccess, _onerror, unignore) {
                if (unignore) {
                    //鏍规嵁token鐢熸垚MD5鎴彇8-16涓嬫爣鐨勬暟鎹笌鏈湴瀛樺偍鐨勫鑸俊鎭繘琛屾瘮瀵�
                    //濡傛灉淇℃伅鍜屼笂娆＄殑閫氶亾绫诲瀷閮戒竴鏍凤紝涓嶆墽琛宯avi璇锋眰锛岀敤鏈湴瀛樺偍鐨勫鑸俊鎭繛鎺ユ湇鍔″櫒
                    var uId = md5(token).slice(8, 16);
                    var storage = RongIMLib.RongIMClient._storageProvider;
                    var transportType = storage.getItem("rongSDK");
                    var isSameType = (RongIMLib.Transportations._TransportType == transportType);
                    var _old = storage.getItem('rc_uid');
                    var isSameUser = (_old == uId);
                    var servers = storage.getItem('servers');
                    var hasServers = (typeof servers == 'string');
                    if (isSameUser && isSameType && hasServers) {
                        RongIMLib.RongIMClient._memoryStore.voipStategy = storage.getItem("voipStrategy");
                        var openMp = storage.getItem('openMp' + uId);
                        RongIMLib.RongIMClient._memoryStore.depend.openMp = openMp;
                        _onsuccess();
                        return;
                    }
                }
                Navigation.clear();
                var StatusEvent = RongIMLib.Channel._ConnectionStatusListener;
                StatusEvent.onChanged(RongIMLib.ConnectionStatus.REQUEST_NAVI);
                //瀵艰埅淇℃伅锛屽垏鎹rl瀵硅薄鐨刱ey杩涜绾夸笂绾夸笅娴嬭瘯鎿嶄綔
                var xss = document.createElement("script");
                //杩涜jsonp璇锋眰
                var depend = RongIMLib.RongIMClient._memoryStore.depend;
                var domain = depend.navi;
                var path = (depend.isPolling ? 'cometnavi' : 'navi');
                token = encodeURIComponent(token);
                var sdkver = RongIMLib.RongIMClient.sdkver;
                var random = RongIMLib.RongUtil.getTimestamp();
                var tpl = '{domain}/{path}.js?appId={appId}&token={token}&callBack=getServerEndpoint&v={sdkver}&r={random}';
                var url = RongIMLib.RongUtil.tplEngine(tpl, {
                    domain: domain,
                    path: path,
                    appId: appId,
                    token: token,
                    sdkver: sdkver,
                    random: random
                });
                xss.src = url;
                document.body.appendChild(xss);
                xss.onerror = function () {
                    _onerror(RongIMLib.ConnectionState.TOKEN_INCORRECT);
                };
                if ("onload" in xss) {
                    xss.onload = _onsuccess;
                }
                else {
                    xss.onreadystatechange = function () {
                        xss.readyState == "loaded" && _onsuccess();
                    };
                }
            };
            Navigation.Endpoint = new Object;
            return Navigation;
        })();
        RongIMLib.Navigation = Navigation;
    })(RongIMLib || (RongIMLib = {}));
// TODO: 缁熶竴鍙橀噺銆佹柟娉曠瓑鍛藉悕瑙勮寖
    var RongIMLib;
    (function (RongIMLib) {
        /**
         * 娑堟伅鍩虹被
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
         *杩炴帴娑堟伅绫诲瀷
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
         *杩炴帴搴旂瓟绫诲瀷
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
         *鏂紑娑堟伅绫诲瀷
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
         *璇锋眰娑堟伅淇′护
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
         *鍝嶅簲娑堟伅淇′护
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
         *灏佽MesssageId
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
         *鍙戦€佹秷鎭簲绛旓紙鍙屽悜锛�
         *qos涓�1蹇呴』缁欏嚭搴旂瓟锛堟墍鏈夋秷鎭被鍨嬩竴鏍凤級
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
         *鍙戝竷娑堟伅
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
            //鏄惁鏄叾浠栫鍚屾杩囨潵鐨勬秷鎭�
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
         *璇锋眰鏌ヨ
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
         *璇锋眰鏌ヨ纭
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
         *璇锋眰鏌ヨ搴旂瓟
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
         * 鎶婃秷鎭璞″啓鍏ユ祦涓�
         * 鍙戦€佹秷鎭椂鐢ㄥ埌
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
         * 娴佽浆鎹负娑堟伅瀵硅薄
         * 鏈嶅姟鍣ㄨ繑鍥炴秷鎭椂鐢ㄥ埌
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
         * 浜岃繘鍒跺府鍔╁璞�
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
             * [convertStream 灏嗗弬鏁皒杞寲涓篟ongIMStream瀵硅薄]
             * @param  {any}    x [鍙傛暟]
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
                //褰撳墠娴佹墽琛岀殑璧峰浣嶇疆
                this.position = 0;
                //褰撳墠娴佸啓鍏ョ殑澶氬皯瀛楄妭
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
                    [].push.apply(this.pool, b);
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
             * @param  {string} url [杩炴帴鍦板潃锛氬寘鍚玹oken銆乿ersion]
             */
            function SocketTransportation(_socket) {
                //杩炴帴鐘舵€� true:宸茶繛鎺� false:鏈繛鎺�
                this.connected = false;
                //鏄惁鍏抽棴锛� true:宸插叧闂� false锛氭湭鍏抽棴
                this.isClose = false;
                //瀛樻斁娑堟伅闃熷垪鐨勪复鏃跺彉閲�
                this.queue = [];
                this.empty = new Function;
                this._socket = _socket;
                return this;
            }
            /**
             * [createTransport 鍒涘缓WebScoket瀵硅薄]
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
             * [send 浼犻€佹秷鎭祦]
             * @param  {ArrayBuffer} data [浜岃繘鍒舵秷鎭祦]
             */
            SocketTransportation.prototype.send = function (data) {
                if (!this.connected && !this.isClose) {
                    //褰撻€氶亾涓嶅彲鐢ㄦ椂锛屽姞鍏ユ秷鎭槦鍒�
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
             * [onData 閫氶亾杩斿洖鏁版嵁鏃惰皟鐢ㄧ殑鏂规硶锛岀敤鏉ユ兂涓婂眰浼犻€掓湇鍔″櫒杩斿洖鐨勪簩杩涘埗娑堟伅娴乚
             * @param  {ArrayBuffer}    data [浜岃繘鍒舵秷鎭祦]
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
             * [onClose 閫氶亾鍏抽棴鏃惰Е鍙戠殑鏂规硶]
             */
            SocketTransportation.prototype.onClose = function (ev) {
                var me = this;
                me.isClose = true;
                me.socket = this.empty;
                RongIMLib.Bridge._client.clearHeartbeat();
                if (ev.code == 1006 && !this._status) {
                    me._socket.fire("StatusChanged", RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
                }
                else {
                    me._status = 0;
                }
            };
            /**
             * [onError 閫氶亾鎶ラ敊鏃惰Е鍙戠殑鏂规硶]
             * @param {any} error [鎶涘嚭寮傚父]
             */
            SocketTransportation.prototype.onError = function (error) {
                throw new Error(error);
            };
            /**
             * [addEvent 涓洪€氶亾缁戝畾浜嬩欢]
             */
            SocketTransportation.prototype.addEvent = function () {
                var self = this;
                self.socket.onopen = function () {
                    self.connected = true;
                    self.isClose = false;
                    //閫氶亾鍙互鐢ㄥ悗锛岃皟鐢ㄥ彂閫侀槦鍒楁柟娉曪紝鎶婃墍鏈夌瓑寰楀彂閫佺殑娑堟伅鍙戝嚭
                    self.doQueue();
                    self._socket.fire("connect");
                };
                self.socket.onmessage = function (ev) {
                    //鍒ゆ柇鏁版嵁鏄笉鏄瓧绗︿覆锛屽鏋滄槸瀛楃涓查偅涔堝氨鏄痜lash浼犺繃鏉ョ殑銆�
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
             * [doQueue 娑堟伅闃熷垪锛屾妸闃熷垪涓秷鎭彂鍑篯
             */
            SocketTransportation.prototype.doQueue = function () {
                var self = this;
                for (var i = 0, len = self.queue.length; i < len; i++) {
                    self.send(self.queue[i]);
                }
            };
            /**
             * [disconnect 鏂紑杩炴帴]
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
             * [reconnect 閲嶆柊杩炴帴]
             */
            SocketTransportation.prototype.reconnect = function () {
                this.disconnect();
                this.createTransport(this.url);
            };
            SocketTransportation.prototype.close = function () {
                this.socket.close();
            };
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
                reqest.timeout = 60000;
                reqest.open(method || "GET", RongIMLib.RongIMClient._memoryStore.depend.protocol + url);
                if (method == "POST" && "setRequestHeader" in reqest) {
                    reqest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                }
                return reqest;
            };
            PollingTransportation.prototype.getRequest = function (url, isconnect) {
                var me = this;
                me.xhr = this.requestFactory(url + "&pid=" + encodeURIComponent(me.pid), "GET");
                if ("onload" in me.xhr) {
                    me.xhr.onload = function () {
                        me.xhr.onload = me.empty;
                        if (this.responseText == "lost params") {
                            me.onError();
                        }
                        else {
                            me.onSuccess(this.responseText, isconnect);
                        }
                    };
                    me.xhr.onerror = function () {
                        me.disconnect();
                    };
                }
                else {
                    me.xhr.onreadystatechange = function () {
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
                me.xhr.send();
            };
            /**
             * [send 鍙戦€佹秷鎭紝Method:POST]
             * queue 涓烘秷鎭槦鍒楋紝寰呴€氶亾鍙敤鍙戦€佹墍鏈夌瓑寰呮秷鎭�
             * @param  {string} data [闇€瑕佷紶鍏omet鏍煎紡鏁版嵁锛屾澶勫彧璐熻矗閫氳閫氶亾锛屾暟鎹浆鎹㈠湪澶栧眰澶勭悊]
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
                this.connected = false;
                this.socket.fire("disconnect");
            };
            PollingTransportation.prototype.close = function () {
                this.xhr.abort();
                this.sendxhr = null;
            };
            return PollingTransportation;
        })();
        RongIMLib.PollingTransportation = PollingTransportation;
    })(RongIMLib || (RongIMLib = {}));
//objectname鏄犲皠
    var typeMapping = {
            "RC:TxtMsg": "TextMessage",
            "RC:ImgMsg": "ImageMessage",
            "RC:VcMsg": "VoiceMessage",
            "RC:ImgTextMsg": "RichContentMessage",
            "RC:FileMsg": "FileMessage",
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
            "RCJrmf:RpOpendMsg": "JrmfRedPacketOpenedMessage"
        },
//鑷畾涔夋秷鎭被鍨�
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
        /**
         * 閫氶亾鏍囪瘑绫�
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
            };
            SyncTimeUtil.get = function () {
                var sent = SyncTimeUtil.$getKey({
                    messageDirection: RongIMLib.MessageDirection.SEND
                });
                var received = SyncTimeUtil.$getKey({
                    messageDirection: RongIMLib.MessageDirection.RECEIVE
                });
                var storage = RongIMLib.RongIMClient._storageProvider;
                return {
                    sent: Number(storage.getItem(sent) || 0),
                    received: Number(storage.getItem(received) || 0)
                };
            };
            return SyncTimeUtil;
        })();
        RongIMLib.SyncTimeUtil = SyncTimeUtil;
        var MessageUtil = (function () {
            function MessageUtil() {
            }
            /**
             *4680000 涓簂ocalstorage鏈€灏忓閲�5200000瀛楄妭鐨�90%锛岃秴杩�90%灏嗗垹闄や箣鍓嶈繃鏃╃殑瀛樺偍
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
            //閬嶅巻锛屽彧鑳介亶鍘嗘暟缁�
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
            //娑堟伅杞崲鏂规硶
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
                }
                //鏄犲皠涓哄叿浣撴秷鎭璞�
                if (objectName in typeMapping) {
                    var str = "new RongIMLib." + typeMapping[objectName] + "(de)";
                    message.content = eval(str);
                    message.messageType = typeMapping[objectName];
                }
                else if (objectName in registerMessageTypeMapping) {
                    var str = "new RongIMLib.RongIMClient.RegisterMessage." + registerMessageTypeMapping[objectName] + "(de)";
                    if (isUseDef) {
                        message.content = eval(str).decode(de);
                    }
                    else {
                        message.content = eval(str);
                    }
                    message.messageType = registerMessageTypeMapping[objectName];
                }
                else {
                    message.content = new RongIMLib.UnknownMessage({ content: de, objectName: objectName });
                    message.messageType = "UnknownMessage";
                }
                //鏍规嵁瀹炰綋瀵硅薄璁剧疆message瀵硅薄]
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
                if (entity.direction == 1) {
                    message.messageDirection = RongIMLib.MessageDirection.SEND;
                    message.senderUserId = RongIMLib.Bridge._client.userId;
                }
                else {
                    message.messageDirection = RongIMLib.MessageDirection.RECEIVE;
                }
                message.messageUId = entity.msgId;
                message.receivedTime = new Date().getTime();
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
                return message;
            };
            MessageUtil.detectCMP = function (options) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var status = xhr.status;
                        if (status == 200) {
                            options.success();
                        }
                        else {
                            options.fail(xhr.status);
                        }
                    }
                };
                var method = options.url;
                var url = options.url;
                var method = options.method || 'GET';
                xhr.open(method, url);
                var headers = options.headers;
                for (var key in headers) {
                    var value = headers[key];
                    xhr.setRequestHeader(key, value);
                }
                var body = JSON.stringify(options.body || {});
                xhr.send(body);
                return xhr;
            };
            //閫傞厤SSL
            // static schemeArrs: Array<any> = [["http", "ws"], ["https", "wss"]];
            MessageUtil.sign = { converNum: 1, msgNum: 1, isMsgStart: true, isConvStart: true };
            return MessageUtil;
        })();
        RongIMLib.MessageUtil = MessageUtil;
        /**
         * 宸ュ叿绫�
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
                    method();
                    return false;
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
            return RongInnerTools;
        })();
        RongIMLib.RongInnerTools = RongInnerTools;
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
         * 瀹㈡湇杞崲鍝嶅簲娑堟伅鐨勭被鍨嬪悕
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
         * 瀹㈡湇杞崲娑堟伅鐨勭被鍨嬪悕
         * 姝ゆ秷鎭笉璁″叆鏈娑堟伅鏁�
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
         * 瀹㈡湇鎻℃墜鍝嶅簲娑堟伅鐨勭被鍨嬪悕
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
            function Message(content, conversationType, extra, objectName, messageDirection, messageId, receivedStatus, receivedTime, senderUserId, sentStatus, sentTime, targetId, messageType, messageUId, isLocalMessage, offLineMessage, receiptResponse) {
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
            function Room(id, user) {
                this.id = id;
                this.user = user;
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
            }
            ServerDataProvider.prototype.init = function (appKey, options) {
                new RongIMLib.FeatureDectector(options.appCallback);
            };
            ServerDataProvider.prototype.connect = function (token, callback, userId, option) {
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
                // 娓呴櫎鏈湴瀵艰埅缂撳瓨
                if (option.force) {
                    RongIMLib.RongIMClient._storageProvider.removeItem('servers');
                }
                //寰幆璁剧疆鐩戝惉浜嬩欢锛岃拷鍔犱箣鍚庢竻绌哄瓨鏀句簨浠舵暟鎹�
                for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.listenerList.length; i < len; i++) {
                    RongIMLib.RongIMClient.bridge["setListener"](RongIMLib.RongIMClient._memoryStore.listenerList[i]);
                }
                RongIMLib.RongIMClient._memoryStore.listenerList.length = 0;
                RongIMLib.RongIMClient.bridge.connect(RongIMLib.RongIMClient._memoryStore.appKey, token, {
                    onSuccess: function (data) {
                        setTimeout(function () {
                            callback.onSuccess(data);
                        });
                    },
                    onError: function (e) {
                        if (e == RongIMLib.ConnectionState.TOKEN_INCORRECT || !e) {
                            setTimeout(function () {
                                callback.onTokenIncorrect();
                            });
                        }
                        else {
                            setTimeout(function () {
                                callback.onError(e);
                            });
                        }
                    }
                });
            };
            /*
            config.auto: 榛樿 false, true 鍚敤鑷姩閲嶈繛锛屽惎鐢ㄥ垯涓哄繀閫夊弬鏁�
            config.rate: 閲嶈瘯棰戠巼 [100, 1000, 3000, 6000, 10000, 18000] 鍗曚綅涓烘绉掞紝鍙€�
            config.url: 缃戠粶鍡呮帰鍦板潃 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 鍙€�
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
                                    setTimeout(ping, next);
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
                            //缁撴潫鏍囪瘑
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
                                    RongIMLib.RongIMClient.connect(token, callback);
                                }
                            };
                            repeatConnect(opts);
                        },
                        custom: function () {
                            RongIMLib.RongIMClient.connect(token, callback);
                        }
                    };
                    handler[key]();
                }
            };
            ServerDataProvider.prototype.logout = function () {
                RongIMLib.RongIMClient.bridge.disconnect();
                RongIMLib.RongIMClient.bridge = null;
            };
            ServerDataProvider.prototype.disconnect = function () {
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
            ServerDataProvider.prototype.sendRecallMessage = function (content, sendMessageCallback) {
                var msg = new RongIMLib.RecallCommandMessage({ conversationType: content.conversationType, targetId: content.targetId, sentTime: content.sentTime, messageUId: content.messageUId, extra: content.extra, user: content.user });
                this.sendMessage(content.conversationType, content.senderUserId, msg, sendMessageCallback, false, null, null, 2);
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
                limit 灞炴€�:
                var limit = {
                    time: '鏃堕棿鎴�, 鏈€鍚庝竴娆℃媺鍙栨椂闂�',
                    hasMore: '鏄惁杩樻湁鍘嗗彶娑堟伅, bool 鍊�'
                };
            */
                var limit = historyMessageLimit.get(key) || {};
                var hasMore = limit.hasMore;
                var isFecth = (hasMore || limit.time != timestamp);
                // 姝ｅ簭鑾峰彇娑堟伅鏃朵笉鍋氶檺鍒讹紝闃叉鏈夋柊娑堟伅瀵艰嚧鏃犳硶鑾峰彇
                if (!isFecth && order == 0) {
                    return callback.onSuccess([], hasMore);
                }
                var modules = new RongIMLib.RongIMClient.Protobuf.HistoryMsgInput(), self = this;
                modules.setTargetId(targetId);
                modules.setTime(timestamp);
                modules.setCount(count);
                modules.setOrder(order);
                RongIMLib.RongIMClient.bridge.queryMsg(HistoryMsgType[conversationType], RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), targetId, {
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
                var e = new RongIMLib.RongIMClient.Protobuf.ChrmInput();
                e.setNothing(1);
                RongIMLib.Bridge._client.chatroomId = chatroomId;
                RongIMLib.RongIMClient.bridge.queryMsg(19, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                    onSuccess: function () {
                        setTimeout(function () {
                            callback.onSuccess();
                        });
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
                            onError: function (x) {
                                setTimeout(function () {
                                    callback.onError(RongIMLib.ErrorCode.CHATROOM_HISMESSAGE_ERROR);
                                });
                            }
                        }, "DownStreamMessages");
                    },
                    onError: function (error) {
                        setTimeout(function () {
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
                var e = new RongIMLib.RongIMClient.Protobuf.ChrmInput();
                e.setNothing(1);
                RongIMLib.RongIMClient.bridge.queryMsg(17, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                    onSuccess: function () {
                        setTimeout(function () {
                            callback.onSuccess();
                        });
                    },
                    onError: function (errcode) {
                        setTimeout(function () {
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
            ServerDataProvider.prototype.getFileToken = function (fileType, callback) {
                if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                    });
                    return;
                }
                var modules = new RongIMLib.RongIMClient.Protobuf.GetQNupTokenInput();
                modules.setType(fileType);
                RongIMLib.RongIMClient.bridge.queryMsg(30, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
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
                }, "GetQNupTokenOutput");
            };
            ServerDataProvider.prototype.getFileUrl = function (fileType, fileName, oriName, callback) {
                if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                    });
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
            /*
            methodType 1 : 澶氬鏈�(瀹㈡湇鍚庡彴浣跨敤);   2 : 娑堟伅鎾ゅ洖
            params.userIds : 瀹氬悜娑堟伅鎺ユ敹鑰�
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
                var isGroup = (conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP);
                var modules = new RongIMLib.RongIMClient.Protobuf.UpStreamMessage();
                if (mentiondMsg && isGroup) {
                    modules.setSessionId(7);
                }
                else {
                    modules.setSessionId(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag());
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
                params = params || {};
                var userIds = params.userIds;
                if (isGroup && userIds) {
                    modules.setUserId(userIds);
                }
                modules.setClassname(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName);
                modules.setContent(messageContent.encode());
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
                }, null, methodType);
                sendCallback.onBefore && sendCallback.onBefore(RongIMLib.MessageIdHandler.messageId);
                msg.messageId = RongIMLib.MessageIdHandler.messageId + "";
            };
            ServerDataProvider.prototype.setConnectionStatusListener = function (listener) {
                var watcher = {
                    onChanged: function (status) {
                        listener.onChanged(status);
                        RongIMLib.RongUtil.forEach(RongIMLib.RongIMClient.statusListeners, function (watch) {
                            watch(status);
                        });
                    }
                };
                if (RongIMLib.RongIMClient.bridge) {
                    RongIMLib.RongIMClient.bridge.setListener(watcher);
                }
                else {
                    RongIMLib.RongIMClient._memoryStore.listenerList.push(watcher);
                }
            };
            ServerDataProvider.prototype.setOnReceiveMessageListener = function (listener) {
                if (RongIMLib.RongIMClient.bridge) {
                    RongIMLib.RongIMClient.bridge.setListener(listener);
                }
                else {
                    RongIMLib.RongIMClient._memoryStore.listenerList.push(listener);
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
                //杞崲娑堟伅涓鸿嚜瀹氫箟娑堟伅鍙傛暟鏍煎紡
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
            ServerDataProvider.prototype.removeConversation = function (conversationType, targetId, callback) {
                var mod = new RongIMLib.RongIMClient.Protobuf.RelationsInput();
                mod.setType(conversationType);
                RongIMLib.RongIMClient.bridge.queryMsg(27, RongIMLib.MessageUtil.ArrayForm(mod.toArrayBuffer()), targetId, {
                    onSuccess: function () {
                        var conversations = RongIMLib.RongIMClient._memoryStore.conversationList;
                        var len = conversations.length;
                        for (var i = 0; i < len; i++) {
                            if (conversations[i].conversationType == conversationType && targetId == conversations[i].targetId) {
                                conversations.splice(i, 1);
                                break;
                            }
                        }
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
            ServerDataProvider.prototype.removeMessage = function (conversationType, targetId, messageIds, callback) {
                RongIMLib.RongIMClient.getInstance().deleteRemoteMessages(conversationType, targetId, messageIds, callback);
            };
            ServerDataProvider.prototype.removeLocalMessage = function (conversationType, targetId, timestamps, callback) {
                callback.onSuccess(true);
            };
            ServerDataProvider.prototype.updateMessage = function (message, callback) {
                if (callback) {
                    callback.onSuccess(message);
                }
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
                        // error 1 鍘嗗彶娑堟伅浜戝瓨鍌ㄦ病鏈夊紑閫氥€佷紶鍏ユ椂闂村ぇ浜庢湇鍔″櫒鏃堕棿 娓呴櫎澶辫触锛�1 涓庡叾浠栭敊璇爜鍐茬獊锛屾墍浠ヨ嚜瀹氫箟閿欒鐮佽繑鍥�
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
            // 鍏煎鑰佺増鏈�
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
                            var count = RongIMLib.RongIMClient._storageProvider.getItem("cu" + RongIMLib.Bridge._client.userId + conversationType + targetId);
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
                var isLocalInclude = list.length > count;
                if (!isSync && isLocalInclude) {
                    setTimeout(function () {
                        var localList = list.slice(0, count);
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
                                var count = RongIMLib.RongIMClient._storageProvider.getItem("cu" + RongIMLib.Bridge._client.userId + item.conversationType + item.targetId);
                                if (item.unreadMessageCount == 0) {
                                    item.unreadMessageCount = Number(count);
                                }
                            });
                        }
                        RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList = false;
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
            ServerDataProvider.prototype.getHistoryMessages = function (conversationType, targetId, timestamp, count, callback, objectname, order) {
                var config = {
                    objectname: objectname,
                    order: order
                };
                RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(conversationType, targetId, timestamp, count, callback, config);
            };
            ServerDataProvider.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
                var count = 0;
                var storageProvider = RongIMLib.RongIMClient._storageProvider;
                if (conversationTypes) {
                    RongIMLib.RongUtil.forEach(conversationTypes, function (type) {
                        var unreadKeys = storageProvider.getItemKeyList("cu" + RongIMLib.Bridge._client.userId + type);
                        RongIMLib.RongUtil.forEach(unreadKeys, function (key) {
                            var unread = storageProvider.getItem(key);
                            var unreadCount = Number(unread) || 0;
                            count += unreadCount;
                        });
                    });
                }
                else {
                    var unreadKeys = storageProvider.getItemKeyList("cu" + RongIMLib.Bridge._client.userId);
                    RongIMLib.RongUtil.forEach(unreadKeys, function (key) {
                        var unread = storageProvider.getItem(key);
                        var unreadCount = Number(unread) || 0;
                        count += unreadCount;
                    });
                }
                callback.onSuccess(count);
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
            //鐢变簬 Web 绔湭璇绘秷鎭暟鎸変細璇濈粺璁★紝鎾ゅ洖娑堟伅浼氬鑷存湭璇绘暟涓嶅噯纭紝鎻愪緵璁剧疆鏈鏁版帴鍙ｏ紝妗岄潰鐗堜笉瀹炵幇姝ゆ柟娉�
            ServerDataProvider.prototype.setUnreadCount = function (conversationType, targetId, count) {
                var storageProvider = RongIMLib.RongIMClient._storageProvider;
                var key = "cu" + RongIMLib.Bridge._client.userId + conversationType + targetId;
                storageProvider.setItem(key, count);
            };
            ServerDataProvider.prototype.getUnreadCount = function (conversationType, targetId, callback) {
                var key = "cu" + RongIMLib.Bridge._client.userId + conversationType + targetId;
                var unread = RongIMLib.RongIMClient._storageProvider.getItem(key);
                var unreadCount = Number(unread);
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
                RongIMLib.RongIMClient._storageProvider.removeItem("cu" + RongIMLib.Bridge._client.userId + conversationType + targetId);
                this.getConversation(conversationType, targetId, {
                    onSuccess: function (conver) {
                        if (conver) {
                            conver.unreadMessageCount = 0;
                            me.cleanMentioneds(conver);
                        }
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
            ServerDataProvider.prototype.clearTotalUnreadCount = function (callback) {
                var list = RongIMLib.RongIMClient._memoryStore.conversationList;
                var me = this;
                if (list) {
                    // 娓呴櫎 mentioneds銆佹竻闄� list 涓殑 unreadMessageCount
                    for (var i = 0; i < list.length; i++) {
                        var conver = list[i];
                        if (conver) {
                            conver.unreadMessageCount = 0;
                            me.cleanMentioneds(conver);
                        }
                    }
                }
                // 1. 鑾峰彇鎵€鏈� key 2. 娓呴櫎
                var unreadKeys = RongIMLib.RongIMClient._storageProvider.getItemKeyList("cu" + RongIMLib.Bridge._client.userId);
                RongIMLib.RongUtil.forEach(unreadKeys, function (key) {
                    RongIMLib.RongIMClient._storageProvider.removeItem(key);
                });
                setTimeout(function () {
                    callback.onSuccess(true);
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
                            //TODO 鎵惧嚭鏈€澶ф椂闂�
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
                // 1 鏄搴�,2鏄€掑簭
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
                ;
                RongIMLib.RongIMClient.bridge.queryMsg("rtcRJoin_data", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                    onSuccess: function (result) {
                        var users = {};
                        var list = result.list, token = result.token;
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
                            token: token
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
                RongIMLib.RongIMClient.bridge.queryMsg("rtcPing", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, callback);
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
            ServerDataProvider.prototype.getNavi = function () {
                var navi = RongIMLib.RongIMClient._storageProvider.getItem("fullnavi") || "{}";
                return JSON.parse(navi);
            };
            ServerDataProvider.prototype.getRTCToken = function (room, callback) {
                var modules = new RongIMLib.RongIMClient.Protobuf.RtcInput();
                RongIMLib.RongIMClient.bridge.queryMsg("rtcToken", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), room.id, {
                    onSuccess: function (result) {
                        callback.onSuccess(result);
                    },
                    onError: function (errorCode) {
                        callback.onError(errorCode);
                    }
                }, "RtcTokenOutput");
            };
            return ServerDataProvider;
        })();
        RongIMLib.ServerDataProvider = ServerDataProvider;
    })(RongIMLib || (RongIMLib = {}));
    var RongIMLib;
    (function (RongIMLib) {
        var VCDataProvider = (function () {
            function VCDataProvider(addon) {
                // C++ 闇€瑕佺殑 SDK 鐗堟湰鍙�
                this.version = '2.8.27';
                this.userId = "";
                this.useConsole = false;
                this.appKey = "";
                this.token = "";
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
                // 0 涓嶅瓨涓嶈鏁�  1 鍙瓨涓嶈鏁� 3 瀛樹笖璁℃暟
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
                    userId: userId
                };
                serverConf = serverConf || {};
                var openmp = !!serverConf.openMp;
                var openus = !!serverConf.openUS;
                if (serverConf.type) {
                    this.addon.setEnvironment(true);
                }
                this.addon.connectWithToken(token, userId, serverConf.serverList, openmp, openus);
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
                 ConnectionStatus_KickedOff = 6,	// 鍏朵粬璁惧鐧诲綍
                 ConnectionStatus_Connecting = 10,// 杩炴帴涓�
                 ConnectionStatus_SignUp = 12, // 鏈櫥褰�
                 ConnectionStatus_NetworkUnavailable = 1, // 杩炴帴鏂紑
                 ConnectionStatus_ServerInvalid = 8, // 鏂紑
                 ConnectionStatus_ValidateFailure = 9,//鏂紑
                 ConnectionStatus_Unconnected = 11,//鏂紑
                 ConnectionStatus_DisconnExecption = 31011 //鏂紑
                 RC_NAVI_MALLOC_ERROR   = 30000,//鏂紑
                 RC_NAVI_NET_UNAVAILABLE= 30002,//鏂紑
                 RC_NAVI_SEND_FAIL      = 30004,//鏂紑
                 RC_NAVI_REQ_TIMEOUT    = 30005,//鏂紑
                 RC_NAVI_RECV_FAIL      = 30006,//鏂紑
                 RC_NAVI_RESOURCE_ERROR = 30007,//鏂紑
                 RC_NAVI_NODE_NOT_FOUND = 30008,//鏂紑
                 RC_NAVI_DNS_ERROR      = 30009,//鏂紑
                 */
                me.connectListener = listener;
                this.useConsole && console.log("setConnectionStatusListener");
                me.addon && me.addon.setConnectionStatusListener(function (result) {
                    switch (result) {
                        case 10:
                            setTimeout(function () {
                                listener.onChanged(RongIMLib.ConnectionStatus.CONNECTING);
                            });
                            break;
                        case 31004:
                            setTimeout(function () {
                                me.connectCallback.onTokenIncorrect();
                            });
                            break;
                        case 1:
                        case 8:
                        case 9:
                        case 11:
                        case 12:
                        case 31011:
                        case 30000:
                        case 30002:
                            setTimeout(function () {
                                listener.onChanged(RongIMLib.ConnectionStatus.DISCONNECTED);
                            });
                            break;
                        case 0:
                        case 33005:
                            setTimeout(function () {
                                me.connectCallback.onSuccess(me.userId);
                                listener.onChanged(RongIMLib.ConnectionStatus.CONNECTED);
                            });
                            break;
                        case 6:
                            setTimeout(function () {
                                listener.onChanged(RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT);
                            });
                            break;
                        default:
                            setTimeout(function () {
                                listener.onChanged(result);
                            });
                            break;
                    }
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
                }, users);
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
                //杞崲娑堟伅涓鸿嚜瀹氫箟娑堟伅鍙傛暟鏍煎紡
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
            VCDataProvider.prototype.removeMessage = function (conversationType, targetId, delMsgs, callback) {
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
            // Web 绔帴鍙ｏ紝妗岄潰鐗堟棤闇€瀹炵幇
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
                        // 娌℃湁寮€閫氬巻鍙叉秷鎭簯瀛樺偍
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
                try {
                    var result;
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
            VCDataProvider.prototype.reconnect = function (callback) { };
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
                        throw new Error('鍏紬璐﹀彿鏁版嵁鏍煎紡閿欒: ' + JSON.stringify(error));
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
                    // 鍙栨渶鍚庝竴鏉� @ 娑堟伅,鍘熷洜锛氬拰 web 浜掔浉鍏煎
                    var mention = mentions.pop();
                    conver.mentionedMsg = { uid: mention.messageUid, time: mention.sentTime, mentionedInfo: mention.content.mentionedInfo, sendUserId: mention.senderUserId };
                }
                return conver;
            };
            VCDataProvider.prototype.getRTCUserInfoList = function (room, callback) {
            };
            VCDataProvider.prototype.setRTCUserInfo = function (room, info, callback) {
            };
            VCDataProvider.prototype.removeRTCUserInfo = function (room, info, callback) {
            };
            VCDataProvider.prototype.getRTCUserList = function (room, callback) {
            };
            VCDataProvider.prototype.getRTCRoomInfo = function (room, callback) {
            };
            VCDataProvider.prototype.setRTCRoomInfo = function (room, data, callback) {
            };
            VCDataProvider.prototype.removeRTCRoomInfo = function (room, data, callback) {
            };
            VCDataProvider.prototype.joinRTCRoom = function (room, callback) {
            };
            VCDataProvider.prototype.quitRTCRoom = function (room, callback) {
            };
            VCDataProvider.prototype.RTCPing = function (room, callback) {
            };
            VCDataProvider.prototype.setRTCUserData = function (roomId, key, value, isInner, callback, message) {
            };
            VCDataProvider.prototype.getRTCUserData = function (roomId, key, isInner, callback, message) {
            };
            VCDataProvider.prototype.removeRTCUserData = function (roomId, key, isInner, callback, message) {
            };
            VCDataProvider.prototype.setRTCRoomData = function (roomId, key, value, isInner, callback, message) {
            };
            VCDataProvider.prototype.getRTCRoomData = function (roomId, key, isInner, callback, message) {
            };
            VCDataProvider.prototype.removeRTCRoomData = function (roomId, key, isInner, callback, message) {
            };
            VCDataProvider.prototype.getNavi = function () {
            };
            VCDataProvider.prototype.getRTCToken = function (room, callback) {
            };
            return VCDataProvider;
        })();
        RongIMLib.VCDataProvider = VCDataProvider;
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
            //鍗曚綅锛氬瓧鑺�
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
            //鍗曚綅锛氬瓧鑺�
            LocalStorageProvider.prototype.onOutOfQuota = function () {
                return JSON.stringify(localStorage).length;
            };
            return LocalStorageProvider;
        })();
        RongIMLib.LocalStorageProvider = LocalStorageProvider;
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
                                // 闃叉 IE6銆�7 涓嬪伓鍙戣Е鍙戜袱娆� loaded
                                script.onload = script.onreadystatechange = null;
                                if (callback) {
                                    callback();
                                }
                                if (!callback) {
                                    var token = RongIMLib.RongIMClient._memoryStore.token;
                                    var connectCallback = RongIMLib.RongIMClient._memoryStore.callback;
                                    token && RongIMLib.RongIMClient.connect(token, connectCallback);
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
         * 浼氳瘽宸ュ叿绫汇€�
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
             * [replace 鏇挎崲浼氳瘽]
             * 浼氳瘽鏁扮粍瀛樺湪鐨勬儏鍐典笅璋冪敤add鏂规硶浼氭槸褰撳墠浼氳瘽琚浛鎹笖杩斿洖鍒扮涓€涓綅缃紝瀵艰嚧鐢ㄦ埛鏈湴涓€浜涜缃け鏁堬紝鎵€浠ユ彁渚況eplace鏂规硶
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
                            var msg = "绗�" + (g + 1) + "涓弬鏁伴敊璇�, 閿欒绫诲瀷锛�" + this.getType(c[g]) + " [" + f[g] + "] -> 浣嶇疆:" + position;
                            this.logger("-3", position, msg);
                        }
                    }
                }
                else {
                    var msg = "璇ュ弬鏁颁笉姝ｇ‘鎴栧皻鏈疄渚嬪寲RongIMClient -> 浣嶇疆:" + position;
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
        var RongUtil = (function () {
            function RongUtil() {
            }
            RongUtil.noop = function () { };
            RongUtil.isEmpty = function (obj) {
                var empty = true;
                for (var key in obj) {
                    empty = false;
                    break;
                }
                return empty;
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
                var isXHR = (typeof XMLHttpRequest == 'function');
                var isXDR = (typeof XDomainRequest == 'function');
                var key = isXHR ? 'XMLHttpRequest' : isXDR ? 'XDomainRequest' : 'ActiveXObject';
                return item[key]();
            };
            RongUtil.request = function (opts) {
                var url = opts.url;
                var success = opts.success;
                var error = opts.error;
                var method = opts.method || 'GET';
                var xhr = RongUtil.createXHR();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            success();
                        }
                        else {
                            error();
                        }
                    }
                };
                xhr.open(method, url, true);
                xhr.send(null);
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
            /*
            //杩斿洖鏂板紩鐢紝涓嶇牬鍧忓師濮嬪璞�
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
        var Timer = (function () {
            function Timer(config) {
                this.timeout = 0;
                this.timer = null;
                this.timeout = config.timeout;
            }
            Timer.prototype.resume = function (callback) {
                this.timer = setTimeout(callback, this.timeout);
            };
            Timer.prototype.pause = function () {
                clearTimeout(this.timer);
            };
            return Timer;
        })();
        RongIMLib.Timer = Timer;
        var InnerUtil = (function () {
            function InnerUtil() {
            }
            InnerUtil.getUId = function (token) {
                return md5(token).slice(8, 16);
            };
            return InnerUtil;
        })();
        RongIMLib.InnerUtil = InnerUtil;
    })(RongIMLib || (RongIMLib = {}));

    /*
    璇存槑: 璇峰嬁淇敼 header.js 鍜� footer.js
    鐢ㄩ€�: 鑷姩鎷兼帴鏆撮湶鏂瑰紡
    鍛戒护: grunt release 涓� concat
*/
    return RongIMLib;
});