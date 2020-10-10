<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Ai健身</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="tags/taglib.jsp"%>
  </head>

  <style>
      html,body{
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
      }
      .container{
          background-color: white;
          margin: 0 auto;
          width: 100%;
          height: 100%;
      }
      .phead{
          height: 10%;
      }
      .pmid{
          height: 80%;
      }
      .pend{
          height: 10%;
      }
      .login-fram {
          width: 400px;height: 500px;
          position: absolute;background-color: white;
          z-index: 2;
          left: 60%;
          top: 50%;
          margin-top: -250px;
          border-radius: 9px;
          -moz-box-shadow: 2px 2px 10px #909090;
          -webkit-box-shadow: 2px 2px 10px #909090;
          box-shadow:2px 2px 10px #909090;
      }

      .layui-input, .layui-select, .layui-textarea{
          outline-style: none ;
          border:0;
          width: 80%;
          padding: 14px 4px;
          font: 14px/1.14 "Microsoft YaHei","微软雅黑","宋体",helvetica,"Hiragino Sans GB";
          text-indent: 2px;
      }

      .login-user:hover,.login-pass:hover{
          border: 1px solid #3B78DD!important;
      }

      input,.btn{
          outline-style: none ;
          border:0;
          width: 80%;
          padding: 14px 4px;
          font: 14px/1.14 "Microsoft YaHei","微软雅黑","宋体",helvetica,"Hiragino Sans GB";
          text-indent: 2px;
      }
      .btn{
          cursor: pointer;
          background-color: #3B78DD;
      }

      .btn:hover {
          background-color: #1760D7;
      }

      .endspan {
          color: #1760D7;
      }

  </style>

  <body>
    <div class="container">
        <div class="phead" style="display: flex;flex-direction: row ;align-items: center;">
            <div style="margin-left: 20px;display: flex;flex-direction: row;align-items: center" >
                <img src="${ctx}/images/backimg/logo.png" alt="" width="150px">
                <div style="border-left: 1px solid #888888;height: 30px;display: flex;flex-direction: row ;align-items: center;">
                    <p style="margin-left: 10px;color: #888888;font-size: 16px">Klive智能酒店健身服务系统</p>
                </div>
            </div>
            <div class="" style="margin-left: auto;display: flex;flex-direction: row;align-items: center;margin-right:20px;">
                <p style="margin-right:12px;color: #666666;font-size: 12px">关于我们</p>
                <p style="margin-right:12px;color: #666666;font-size: 12px">技术介绍</p>
                    <div style="border-left: 1px solid #888888;display: flex;flex-direction: row ;align-items: center;">
                    <p style="margin-left: 12px;margin-right:12px;color: #666666;font-size: 12px">帮助</p>
                </div>
                <p style="color: #666666;font-size: 12px">意见反馈</p>
            </div>
        </div>
        <div class="pmid">
            <div style="width: 100%;height: 100%;position: relative;">
                <div class="layui-carousel" id="backimg" style="position: absolute;z-index:1">
                    <div carousel-item>
                        <div style="background-image:url(${ctx}/images/backimg/bg01.jpg); background-repeat: no-repeat;background-size: 100%"></div>
                        <div style="background-image:url(${ctx}/images/backimg/bg02.jpg); background-repeat: no-repeat;background-size: 100%"></div>
                        <div style="background-image:url(${ctx}/images/backimg/bg03.jpg); background-repeat: no-repeat;background-size: 100%"></div>
                    </div>
                </div>
                <div class="login-fram" style="display: flex;flex-direction: column;align-items: center;">
                    <div style="height: 8%;margin-left: auto;padding: 10px 10px 0 10px  ;cursor: pointer;">
                        <span id="change-tags" class="iconfont iconqiehuan" style="font-size: 28px;color: #3B78DD;font-weight: bold;"></span>
                    </div>
                    <div class="person-tags" style="width:100%;height: 8%;text-align: center">
                        <p class="" style="color: #333;font-size: 20px;line-height: 28px;font-weight: bold;">个人账户登录</p>
                    </div>
                    <div class="admin-tags" style="width:100%;height: 8%;text-align: center;display: none">
                        <p class="" style="color: #333;font-size: 20px;line-height: 28px;font-weight: bold;">管理账户登录</p>
                    </div>
                    <form class="layui-form user_form" style="width: 100%" action="" lay-filter="lform">

                        <div id="user" class="input-fram-person" style="display: flex;flex-direction: column;justify-items: center;align-items: center;">
                            <div class="login-user" style="width: 342px;height: 46px;display: flex;flex-direction: row;border: 1px solid #DADADA">
                                <div class="u-logo" style="width: 36px;height: 100%;display: flex;flex-direction: row;align-items: center;justify-items: center">
                                    <span class="iconfont icondenglu" style="font-size: 32px;margin-left: 2px;color: #666666"></span>
                                </div>
                                <div class="u-input" style="flex: 1">
                                    <input type="text" id="userId" class="layui-input user_name" placeholder="账号/手机号" lay-verify="required|phone" lay-reqtext="用户名不能为空" autocomplete="off">
                                </div>
                            </div>
                            <div class="login-pass" style="width: 342px;height: 46px;display: flex;flex-direction: row;margin-top:22px;border: 1px solid #DADADA">
                                <div class="p-logo" style="width: 36px;height: 100%;display: flex;flex-direction: row;align-items: center;justify-items: center">
                                    <span class="iconfont iconmima" style="font-size: 32px;margin-left: 2px;color: #666666"></span>
                                </div>
                                <div class="p-input" style="flex: 1">
                                    <input type="password" id="passWord" class="layui-input user_name" lay-verify="required|pass" lay-reqtext="密码不能为空" maxlength="16" placeholder="输入密码">
                                </div>
                            </div>
                        </div>
                        <div style="width:100%;height: 15%;margin-top: 20px;text-align: center">
                            <button class="layui-btn btn" type="button" style="width: 85%;height: 50px;border-radius: 4px;border:0;color: white;font-size: 18px;" lay-submit="" lay-filter="login">登&nbsp;&nbsp;录</button>
                        </div>
                    </form>
                    <form class="layui-form admin_form" style="width: 100%;display: none" action="" lay-filter="aform">
                        <div id="admin" class="input-fram-admin" style="display: flex;flex-direction: column;justify-items: center;align-items: center;padding-left: 50%;margin-left: -50%;">
                            <div class="login-user" style="width: 342px;height: 46px;display: flex;flex-direction: row;border: 1px solid #DADADA">
                                <div class="u-logo" style="width: 36px;height: 100%;display: flex;flex-direction: row;align-items: center;justify-items: center">
                                    <span class="iconfont icondenglu" style="font-size: 32px;margin-left: 2px;color: #666666"></span>
                                </div>
                                <div class="u-input" style="flex: 1">
                                    <input type="text" id="adminId" class="layui-input user_name" placeholder="管理员账户" lay-verify="required|adminname" lay-reqtext="用户名不能为空" autocomplete="off">
                                </div>
                            </div>
                            <div class="login-pass" style="width: 342px;height: 46px;display: flex;flex-direction: row;margin-top:22px;border: 1px solid #DADADA">
                                <div class="p-logo" style="width: 36px;height: 100%;display: flex;flex-direction: row;align-items: center;justify-items: center">
                                    <span class="iconfont iconmima" style="font-size: 32px;margin-left: 2px;color: #666666"></span>
                                </div>
                                <div class="p-input" style="flex: 1">
                                    <input type="password" id="adminPass" class="layui-input user_name" lay-verify="required|pass" lay-reqtext="密码不能为空" maxlength="16" placeholder="输入密码">
                                </div>
                            </div>
                        </div>
                        <div style="width:100%;height: 15%;margin-top: 20px;text-align: center">
                            <button class="layui-btn btn" type="button" style="width: 85%;height: 50px;border-radius: 4px;border:0;color: white;font-size: 18px;" lay-submit="" lay-filter="admin_login">登&nbsp;&nbsp;录</button>
                        </div>
                    </form>
                    <div style="width:100%;height: 15%;display: flex;flex-direction: row;align-items: center;">
                        <div class="for-fram" style="margin-left: 8%;cursor: pointer;"><a class="endspan" href="${ctx}/main/index-find">忘记密码？</a></div>
                        <div class="reg-fram" style="margin-left: auto;margin-right: 8%;cursor: pointer;"><a class="endspan" href="${ctx}/main/index-regs">注册新账号</a></div>
                    </div>
                    <div class="explain" style="position:absolute;bottom: 0;width: 100%;height: 50px;background-color: #FAFAFA;display: block;text-align: center;padding-top: 20px;">
                        <span style="color: #848585;font-size: 12px;">本项目非商用，为个人练习作品，部分数据使用由Keep官网提供</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pend" style="display:flex;flex-direction: column;align-items: center;justify-content: center">
            <div style="display: flex;flex-direction: row;justify-items: center;color: #666666;font-size: 12px">
                <div style=""><p>友情链接:</p></div>
                <div style="margin-left: 10px;margin-right: 10px"><p>keep官网</p></div>
                <div style="border-left: 1px solid #888888;margin-right: 10px;padding-left: 10px"><p style="">Github开源：CMU-Perceptual-Computing-Lab/openpose</p></div>
            </div>
            <div style="margin-top: 5px;color: #666666;font-size: 12px">Copyright © 2020-2021 浙江大学软件学院<strong>415工作室</strong>:Songcd2019@163.com </div>
        </div>
    </div>
    <script>
        function showLoad() {
            return layer.msg('登录中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,offset: 'auto', time:100000});
        }

        function closeLoad(index) {
            layer.close(index);

        }
        function showSuccess() {
            layer.msg('执行成功！',{time: 1000,offset: 'auto'});
        }
        $(document).ready(function () {
            layui.use('carousel', function(){
                var carousel = layui.carousel;
                //建造实例
                carousel.render({
                    elem: '#backimg'
                    ,width: '100%' //设置容器宽度
                    ,height:'100%'
                    ,arrow: 'hover' //始终显示箭头
                    ,anim: 'fade' //切换动画方式
                });
            });

            layui.use(['form', 'layedit','layer'], function() {
                var form = layui.form
                    , layer = layui.layer
                    , layedit = layui.layedit
                    , layer = layui.layer;
                var code = "000000"
                //创建一个编辑器
                var editIndex = layedit.build('LAY_demo_editor');
                //自定义验证规则
                form.verify({
                    title: function (value) {
                        if (value.length < 5) {
                            return '标题至少得5个字符啊';
                        }
                    }
                    , pass: [
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/
                        , '密码必须6到12位，至少包含1个大写字母，1个小写字母和数字，不能含有空格等特殊字符'
                    ]
                    ,adminname: [
                        /^([0-9a-zA-Z\u4E00-\u9FA5]+){4,11}$/
                        ,'用户名必须4到11位，可包含字母、数字以及下划线，不能包含空格'
                    ]
                    , content: function (value) {
                        layedit.sync(editIndex);
                    }
                });
                form.on('submit(login)', function(data){
                    var loginpre = {}
                    $("#user input").each(function () {
                        loginpre[$(this).attr('id')] = $(this).val()
                    })
                    if((loginpre["userId"]!="")&&(loginpre["passWord"]!="")){
                        var sha1_pass = sha1(loginpre["passWord"]);
                        loginpre["passWord"] = sha1_pass;
                        var i;
                        //将数据发送后台
                        $.ajax({
                            //请求方式
                            type : "POST",
                            contentType: "application/json;charset=UTF-8",
                            url : "${ctx}/main/userLogin",
                            data : JSON.stringify(loginpre),
                            datatype:"JSON",
                            beforeSend: function () {
                                i=showLoad();
                            },
                            success : function(re) {
                                if (re.code=="0"){
                                    // layer.msg(re.msg)
                                    closeLoad(i);
                                    location.href="${ctx}/main/login-success?userId="+loginpre["userId"]
                                }else{
                                    layer.msg(re.msg,function () {})
                                }
                            },
                            error : function(e){
                                closeLoad(i);
                                layer.msg('服务器出错');
                            }
                        });
                    }
                    return false;
                });

                form.on('submit(admin_login)', function(data){
                    var loginpre = {}
                    $("#admin input").each(function () {
                        loginpre[$(this).attr('id')] = $(this).val()
                    })
                    if((loginpre["adminId"]!="")&&(loginpre["adminPass"]!="")){
                        var sha1_pass = sha1(loginpre["adminPass"]);
                        loginpre["adminPass"] = sha1_pass;
                        var i;
                        $.ajax({
                            //请求方式
                            type : "POST",
                            contentType: "application/json;charset=UTF-8",
                            url : "${ctx}/main/loginAdmin",
                            data : JSON.stringify(loginpre),
                            datatype:"JSON",
                            beforeSend: function () {
                                i=showLoad();
                            },
                            success : function(re) {
                                if (re.code=="0"){
                                    // layer.msg(re.msg)
                                    closeLoad(i);
                                    location.href="${ctx}/main/admin-frame?adminId="+loginpre["adminId"]
                                }else{
                                    layer.msg(re.msg,function () {})
                                }
                            },
                            error : function(e){
                                closeLoad(i);
                                layer.msg('服务器出错');
                            }
                        });
                    }
                    return false;
                });

            });



            $("#change-tags").click(function () {
                $(".admin_form").toggle(500,"linear",function () {
                    $(".user_form").toggle(500,"linear")
                })
                $(".person-tags").toggle(500,"linear",function () {
                    $(".admin-tags").toggle(500,"linear")
                })
            })
        })
    </script>
  </body>
</html>
