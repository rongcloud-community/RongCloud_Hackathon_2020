import $ from 'jquery'
import queryString from 'query-string'

let $present = null;
let presentCtx = null;

let $video = null;
let $canvas = null;
let ctx = null;
let interval = null;

let fullWidth = null;
let fullHeight = null;

let SCALE = 16;

let scanFrameRate = 0;
let piecesHistory = [];
let piecesTotal = 0;

const loadComponents = async ()=>{
    $present = $('<canvas id="present" style="position: fixed; left: 10%; top: 10%; width: 80%; max-height: 80%;"></canvas>');
    $present.appendTo($("body"));

    $(`<div id="infobox" style="position: fixed; right: 5%; font-size: 30px; bottom: 5%; color: white; text-shadow: black 0.1em 0.1em 0.2em;">
        <div>共收到碎片数量：<span id="piecesTotal"></span></div>
        <div>识别帧率：<span id="fps"></span>帧/秒。</div>
        <div>识别成功帧率：<span id="fpsSuccess"></span>帧/秒。丢包率：<span id="lossRate"></span>%</div>
        <div>延迟：<span id="latency"></span>毫秒。</div>        
    </div>`).appendTo("body");

    setInterval(()=>{
        $("#piecesTotal").text(piecesTotal);
        if (piecesHistory.length > 2){
            const fpsSuccess = Math.floor((piecesHistory.length - 1) * 1000 / (piecesHistory[piecesHistory.length - 1].ts - piecesHistory[0].ts));
            $("#fpsSuccess").text(fpsSuccess);

            const lossRate = Math.floor((1 - (piecesHistory.length / (piecesHistory[piecesHistory.length - 1].cnt - piecesHistory[0].cnt + 1))) * 100);
            $("#lossRate").text(lossRate);

            const latency = piecesHistory[piecesHistory.length - 1].latency;
            $("#latency").text(latency);
        }
    }, 100);

    $video = $('<video id="video" muted playsinline autoplay style="width: 100%;"></video>');
    $video.appendTo($("body"));


    $canvas = $('<canvas id="canvas" style="display: none;"></canvas>');
    $canvas.appendTo($("body"));
    ctx = canvas.getContext('2d');
};

const OpenCamera = async ()=>{
    return new Promise(async (res)=>{
        const userMedia = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment", width: 1000, height: 1000, frameRate: 60}, audio: false});
        await loadComponents();
        $video[0].srcObject = userMedia;
        $video.on("play", ()=>{
            console.log("play");
            $canvas.attr("width", $video.width());
            $canvas.attr("height", $video.height());
            res();
        });
    });    
}

const handleData = (url)=>{
    if (url.indexOf("&x=") == -1){
        console.log("handleData unrecognized url", url);
        return;
    }
    const qs = queryString.parse(url.split("?")[1]);
    // console.log("qs", qs);
    const piece = {
        cnt: parseInt(qs.i),
        fullWidth: parseInt(qs.w),
        fullHeight: parseInt(qs.h),
        sx: parseInt(qs.x),
        sy: parseInt(qs.y),
        img: qs.d,
        ts: parseInt(qs.t),
        latency: Date.now() - parseInt(qs.t)
    };
    if (!piecesHistory.length || piecesHistory[piecesHistory.length - 1].cnt < piece.cnt){
        piecesTotal++;
        piecesHistory.push(piece);
    }else if (piecesHistory[piecesHistory.length - 1].cnt == piece.cnt){
        // 重复块
        return
    }else{
        // 错序
        piecesTotal++;
        piecesHistory = [piece];
    }
    if (piecesHistory.length > 20){
        piecesHistory.shift();
    }
    // console.log("piece", piece);
    if (fullWidth != piece.fullWidth){
        fullWidth = parseInt(piece.fullWidth);
        fullHeight = parseInt(piece.fullHeight);
        $present.attr("width", fullWidth * SCALE);
        $present.attr("height", fullHeight * SCALE);
        presentCtx = $present[0].getContext("2d");
    }
    const pieceWidth = Math.sqrt(piece.img.length / 6);
    for (var i = 0; i < piece.img.length; i +=6){
        presentCtx.fillStyle = `rgba(${parseInt(piece.img.substr(i, 2), 16)}, ${parseInt(piece.img.substr(i + 2, 2), 16)}, ${parseInt(piece.img.substr(i + 4, 2), 16)}, 0.8)`;
        // console.log("presentCtx.fillStyle", presentCtx.fillStyle);
        presentCtx.fillRect((piece.sx + (i / 6 % pieceWidth)) * SCALE, (piece.sy + Math.floor( i / 6 / pieceWidth )) * SCALE, SCALE, SCALE);
        // console.log("presentCtx.fillRect", piece.sx + (i / 6 % pieceWidth), piece.sy + Math.floor( i / 6 / pieceWidth ));
    }
}

const startQRCodeScanner = ()=>{
    const scanRecursive = async ()=>{
        const result = await scanQRCode();
        // console.log("result", result);
        if (result){
            handleData(result);
            // stopQRCodeScanner();
        }
        
        if (!interval){
            console.log("stopped");
        }else{
            interval = setTimeout(scanRecursive, 0);
        }
    };
    interval = setTimeout(scanRecursive, 0);
}

const stopQRCodeScanner = ()=>{
    clearTimeout(interval);
    interval = null;
}

let scanCnt = 0;
const scanQRCode = async ()=>{
    return new Promise((res)=>{
        ctx.drawImage($video[0], 0, 0);
        const img = $canvas[0].toDataURL('image/png');
        qrcode.callback = (text)=>{
            if (text == "error decoding QR Code"){
                res();
            }else{
                res(text);
            }
        };
        scanCnt++;
        qrcode.decode(img);
    });
}
setInterval(()=>{
    scanFrameRate = scanCnt;
    scanCnt = 0;
    $("#fps").text(scanFrameRate);
}, 1000);

const main = async ()=>{
    await OpenCamera();
    startQRCodeScanner();
};

main();