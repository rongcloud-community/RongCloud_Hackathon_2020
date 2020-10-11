<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>登录</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="../tags/taglib.jsp"%>

  </head>
  <style>
    .pages{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
      .head{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 0px 15px 0 15px;
      }
      .left_em{
          width: 70%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 10px;

      }
      .right_em{
          width: 40%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .right_em img{
          margin-top: 10px;
      }
      .tag_head{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 15px 5px 15px;
      }
      .room_list{
          width: 100%;
      }
      .padfram{
          width: 50%;
          height: 230px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          float: left;
      }
      .inner{
          width: 85%;
          height: 96%;
          border-radius: 9px;
          -moz-box-shadow: 1px 1px 2px #909090;
          -webkit-box-shadow: 1px 1px 2px #909090;
          box-shadow:1px 1px 8px #909090;
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      .buttonfram{
          text-align: center;
          line-height: 40px;
          border-radius: 30px;
          width: 85%;
          background-color: #FDCC08;
          margin-top: 5px;
          margin-bottom: 15px;
      }
      .nav{
          width: 50%;
          height: 50%;
          float: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .nav img{
          width: 50%;
          border-radius: 50%;
          -moz-box-shadow: 1px 1px 6px #909090;
          -webkit-box-shadow: 1px 1px 6px #909090;
          box-shadow:1px 1px 6px #D0D0D0;
      }
      .nav span{
          font-size: 26px;
      }
  </style>
  <body>
  <div class="pages" >
      <div class="head" style="height: 200px;width: 100%;">
          <div class="left_em" style="padding: 5px 5px 10px 5px;height: 100%">
              <strong style="font-size: 38px;">自习室</strong>
              <p style="color: #888888;font-size: 12px;margin-top: 20px;">欢迎您：${param.userId}</p>
              <p style="color: #888888;font-size: 12px;margin-top: 5px;">欢迎加入自习室，请遵守<strong style="color: #FDCC08;margin-left: 2px;">自习守则</strong></p>
          </div>
          <div class="right_em">
              <img src="${ctx}/studyRoom/images/icon_login.png" style="width: 150px;">
          </div>
      </div>
      <div class="roomlist" style="flex: 1;width: 100%">
          <div class="tag_head">
              <span style="color: black;font-size: 14px;" >所有房间</span>
              <span class="iconfont iconyundong" style="font-size: 16px;color: #FDCC08;"><span style="color: black;margin-left: 5px;font-size: 14px;">创建自习室</span></span>
          </div>
          <div class="room_list">
              <% for(int i=0;i<1;i++){ %>
              <div class="padfram" style="">
                  <div class="inner">
                      <div class="idfram" style="height: 20px;margin-top: 10px;">
                          <span style="color: #D0D0D0;font-size: 12px;">·ID：${param.roomId}·</span>
                      </div>
                      <div class="avafram" style="flex: 1;width: 100%">
                          <div class="nav"><img src="${ctx}/images/nav/nav_boy.png" width="20px;"></div>
                          <div class="nav"><div class="addicon"><span class="iconfont iconaddApp"></span></div></div>
                          <div class="nav"><div class="addicon"><span class="iconfont iconaddApp"></span></div></div>
                          <div class="nav"><div class="addicon"><span class="iconfont iconaddApp"></span></div></div>
                      </div>
                      <div class="buttonfram" style="height: 40px;">
                          <span style="font-size: 12px;">进入自习室<span class="iconfont iconxiayibu" style="font-size: 12px;margin-left: 12px;"></span></span>
                      </div>
                  </div>
              </div>
              <%}%>
          </div>
      </div>
      <span style="font-size: 12px;color: #D0D0D0;margin-top: 10px;margin-bottom: 10px;">已经到我的底线啦~</span>
  </div>
  </body>
<script>
    $(".buttonfram").click(function () {
        var liveurl = '${param.liveUrl}'
        var newlive = "";
        for(var c in liveurl){
            if(liveurl[c] == "+"){
                newlive += "%2B"
            }else {
                newlive += liveurl[c]
            }
        }
        location.href = "${ctx}/rong/view?userId=${param.userId}&token=${param.token}&roomId=${param.roomId}&liveUrl="+newlive

    })
</script>

</html>
