import $ from 'jquery';
import QRCode from 'qrcode'

import RongIMLib from "../vendor/rongcloud/RongIMLib-2.5.9"
import RongRTC from "../vendor/rongcloud/RongRTC-3.2.6"
import RongCallLib from "../vendor/rongcloud/RongCallLib-3.1.6"

import puzzles from "./puzzles"

let $canvasFull = null;
let ctxFull = null;
let $canvasPart = null;
let ctxPart = null;
let FULL_WIDTH = null;
let FULL_HEIGHT = null;
let PIECE_WIDTH = 5;
let PIECE_HEIGHT = 5;
let $locationDiv = null;
let $canvasQR = null;
let ctxQR = null;
let pieceCnt = 0;
let imgId = null;
let publisherName = null;
let canvasPartHistory = [];
let targetFrameRate = 5;
let sendTimer = null;

const loadComponents = ()=>{
    $('<div id="wrapper1"></div>').appendTo("body");
    $('<div id="wrapper2" style="display: none;"></div>').appendTo("body");

    $('<h1>点解——发送端</h1>').appendTo($("#wrapper1"));
    $('<h3>1. 请在桌面版Chrome上，保持本页面打开，并且只打开一个</h3>').appendTo($("#wrapper1"));
    $('<h3>2. 请输入一个ID。该ID会以出题人的身份上线融云RTC(默认为publisher)：</h3>').appendTo($("#wrapper1"));
    $(`<input type="text" id="publisherName" value="publisher" disabled>`).appendTo($("#wrapper1"));
    $('<h3>3. 请从题库中选择谜题：</h3>').appendTo($("#wrapper1"));
    $('<select id="myth" style="float: left"></select><br/><br/>').appendTo($("#wrapper1"));
    $(`<label>拼图边长： <select id="pieceWidthHeight">
        <option value="1">1x1</option>
        <option value="3"selected>3x3</option>
        <option value="5">5x5</option>
        <option value="6">6x6</option>
        <option value="10">10x10</option>
    </select></label><br/><br/>`).appendTo($("#wrapper1"));
    $('<button id="go" style="float: left">确定</button>').appendTo($("#wrapper1"));

    puzzles.forEach((puzzle, index)=>{
        $("#myth").append(`<option value="${index}">${index + 1}. ${puzzle.answer}</option>`);
    });

    // $('<div id="box"></div>').appendTo($("body"));
    $canvasFull = $('<canvas id="canvasFull" style="float: left;"></canvas>');
    $canvasFull.appendTo($("#wrapper2"));
    ctxFull = $canvasFull[0].getContext("2d");

    $("#go").on("click", async ()=>{
        imgId = parseInt($("#myth").val());
        console.log("选择：", puzzles[imgId]);
        publisherName = $("#publisherName").val();
        $("#wrapper1").hide("slow");
        $("#wrapper2").show("slow");
        PIECE_WIDTH = PIECE_HEIGHT = parseInt($("#pieceWidthHeight").val());
        init();
        $(`<h3>4. <i>${publisherName}已上线。快去频道内呼叫它。</i> </h3>`).prependTo($("#wrapper2"));
        $(`<div id="discription" style="max-width: 900px;"><ul>
        <li>当前图片已被拆分成 <span class="pieceSum"></span>块，并正以<span class="frameRate"></span>块每秒的速度发送。RGB码率<span class="rbgBitrate"></span>kbps</li>
        <li>你可以以任意方式（iOS/Android/Web）加入融云RTC，并呼叫用户 ${publisherName} 查看。该用户会自动接起通话。
        （<a target="_blank" href="https://dimgai.wrtc.dev:8443/demo/">Web版的例子<a>）
        </li>
        <li>作为程序员的你，一定可以用喜欢的编程语言重新拼凑并还原整幅画。</li>
        </ul></div>`).appendTo($("#wrapper2"));
        $(`<div id="qrWrapper" style="float: left;width: 420px;"></div>`).appendTo($("#wrapper2"));
        $(`<div id="debugArea" style="color: grey; max-width: 900px;">
            <h3>调试区域</h3>
            <div><label>目标帧率：<input type="number" step=5 id="targetFrameRate" value="${targetFrameRate}"></abel></div>
            <button id="changeSettings">确定</button>
            <div><br/><br/>————作为GeekOnline活动的一部分，作者已经准备了一个解。使用系统自带相机扫描二维码打开即可（微信不可）。</div>
        </div>`).appendTo($("#wrapper2"));
        setInterval(calcStatus, 500);
        $("#changeSettings").on("click", ()=>{
            targetFrameRate = parseInt($("#targetFrameRate").val());
            canvasPartHistory.splice(0, canvasPartHistory.length - 1);
        });
        

    });

    const calcStatus = ()=>{
        // console.log("calcStatus", canvasPartHistory);
        if (canvasPartHistory.length > 1){
            const totalTime = canvasPartHistory[canvasPartHistory.length - 1].start - canvasPartHistory[0].start;
            const frameRate = Math.ceil(canvasPartHistory.length * 1000 / totalTime);
            $(".frameRate").text(frameRate);
            $(".pieceSum").text(Math.floor(FULL_WIDTH * FULL_HEIGHT / PIECE_WIDTH / PIECE_HEIGHT));
            $(".rbgBitrate").text(Math.floor(frameRate * PIECE_WIDTH * PIECE_HEIGHT * 3 * 8) / 1000);
        }
    }

}

const drawImageOnCanvas = async ()=>{
    return new Promise((res)=>{
        window.$img = $(`<img src="${puzzles[imgId].path}" style="float: left; display:none;">`);
        $img.appendTo($("#wrapper2"));
        resetCanvasPart();
        $img.on("load", ()=>{
            FULL_WIDTH = $img.width();
            FULL_HEIGHT = $img.height();;
            console.log("Img Loaded", FULL_WIDTH, FULL_HEIGHT);
            $canvasFull.attr("width", FULL_WIDTH);
            $canvasFull.attr("height", FULL_HEIGHT);        
            ctxFull.drawImage($img[0], 0, 0, FULL_WIDTH, FULL_HEIGHT);
            pieceCnt = 0;
            res();
        });
    })
}

const drawCanvasPart = async (sx, sy)=>{
    const start = Date.now();
    if (!isFinite(sx)){
        //策略1:随机
        // sx = Math.floor(Math.random() * FULL_WIDTH / PIECE_WIDTH) * PIECE_WIDTH;
        // sy = Math.floor(Math.random() * FULL_HEIGHT / PIECE_HEIGHT) * PIECE_HEIGHT;
        // 策略2:顺序
        sx = PIECE_WIDTH * (pieceCnt % Math.ceil(FULL_WIDTH / PIECE_WIDTH));
        sy = PIECE_HEIGHT * Math.floor(pieceCnt / Math.ceil(FULL_WIDTH / PIECE_WIDTH)) % FULL_HEIGHT;
    }
    pieceCnt++;

    // 转为字符串形式，在此使用RGB
    const RGB = [];
    for (let y = sy; y < sy + PIECE_HEIGHT; y++){
        for (let x = sx; x < sx + PIECE_WIDTH; x++){
            const rgb = ctxFull.getImageData(x, y, 1, 1).data;
            RGB.push(`${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`);
        }
    }
    // console.log("RGB", RGB);
    // 转为QR码
    if (!$canvasQR){
        $canvasQR = $(`<canvas id="canvasQR" width="500" height="500" style="float: left;"></canvas>`);
        $canvasQR.appendTo($($("#qrWrapper")));
        ctxQR = $canvasQR[0].getContext("2d");
    }
    const qrResult = await QRCode.toCanvas($canvasQR[0], `https://dimgai.wrtc.dev:8443?i=${pieceCnt}&x=${sx}&y=${sy}&w=${FULL_WIDTH}&t=${Date.now()}&h=${FULL_HEIGHT}&d=${RGB.join("")}`);
    const info = {pieceCnt, sx, sy, PIECE_WIDTH, PIECE_HEIGHT,start: Date.now(), spent: Date.now() - start};
    canvasPartHistory.push(info);
    if (canvasPartHistory.length > 100){
        canvasPartHistory.shift();
    }

    // 可视化标注拼图，不影响逻辑
    if (!$locationDiv){
        $locationDiv = $("<div>");
        $locationDiv.appendTo($("#wrapper2"));
    }
    $locationDiv.css({
        position: "absolute",
        outline: "4px solid blue",
        width: PIECE_WIDTH,
        height: PIECE_HEIGHT,
        left: $canvasFull.position().left + sx,
        top: $canvasFull.position().top + sy,
    });
}

const resetCanvasPart = async()=>{
    if ($canvasPart){
        $canvasPart.remove();
        $canvasPart = null;
        ctxPart = null;
    }
}

const initRongCloud = async ()=>{
    const appkey = 'sfci50a7sxcgi';
    const token = "aLS51cHek47x8Pm22/4Mpn+vWfe9h5N8oOwJC3JHFHo=@9ekk.cn.rongnav.com;9ekk.cn.rongcfg.com";
    return new Promise(async (res)=>{
        // appKey 可在融云开发者后台获取
        RongIMLib.RongIMClient.init(appkey);
        var config = {
            timeout: 2000,
            RongIMLib: RongIMLib,
            RongRTC: RongRTC
        };
        var rongCallLib = RongCallLib.init(config);

        /***************************** 发布端逻辑 **************************/
        //token 可从开发者后台获取 或 Server API
        RongIMClient.connect(token, {
            onSuccess: function(userId) {
                console.log('Connect successfully. ' + userId);
                // makeCall();
            },
            onTokenIncorrect: function() {
                console.log('token 无效');
            },
            onError: function(errorCode){
                console.log(errorCode);
            }
        });

        var videoWatcher = function(result) {
            console.log("videoWatcher", result);
            var type = result.type;
            // var boxEl = document.getElementById('box');
            if (type === 'added') {
                // 添加音视频节点
                var video = result.data;
                // boxEl.appendChild(video);
            } else if (type === 'removed') {
                // 删除对应音视频节点
                var video = result.data;
                console.log("Video", video);
                // boxEl.removeChild(document.getElementById(video));
            } else if (type == 'leave') {
                // 音视频结束, 清空所有音视频 UI
            }
        };
        rongCallLib.videoWatch(videoWatcher);

        let lastCallTs = null;
        var commandWatcher = function(message) {
            var messageType = message.messageType;
            // 根据消息类型做对应处理
            console.log("commandWatcher", message.messageType, message);
            if (message.messageType === "InviteMessage"){
                if (lastCallTs && (Date.now() - lastCallTs) < 1000){
                    console.log("ignoring call", message);                    
                }else{
                    lastCallTs = Date.now();
                    acceptCall(message);
                    console.log("acceptCall", message);
                }
            }
        };
        rongCallLib.commandWatch(commandWatcher);

        const makeCall = function(){
            var params = {
                conversationType: RongIMLib.ConversationType.PRIVATE,
                targetId: 'subscriber',
                inviteUserIds:['subscriber'],
                mediaType: RongIMLib.VoIPMediaType.MEDIA_VEDIO
            };
            rongCallLib.call(params, function (error) {
                console.log("call", error);
                if (error) {
                    console.error('发起通话失败', error);
                }
            });
        };

        const acceptCall = function(message){
            // params 中的 message 来自 rongCallLib.commandWatch 监听中收到的 InviteMessage。
            var params = {
                conversationType: message.conversationType,
                targetId: message.targetId,
                mediaType: RongIMLib.VoIPMediaType.MEDIA_VIDEO
            };
            rongCallLib.accept(params, function (error) {
                console.log("accept", error);
                if (error) {
                    console.error('接听通话失败', error);
                }
            });
        }

    });
}

const init = async ()=>{
    await drawImageOnCanvas();
    let lastSendTs = Date.now();
    const drawItr = ()=>{
        const interval = Math.floor(1000 / targetFrameRate);
        sendTimer = setTimeout(async ()=>{
            await drawCanvasPart();
            lastSendTs = Date.now();
            if (sendTimer){
                drawItr();
            }
        }, interval - (Date.now() - lastSendTs));
    }
    drawItr();
    setTimeout(()=>{
        initRongCloud();    
    }, 1000);
}

const main = async ()=>{
    loadComponents();
}

main();