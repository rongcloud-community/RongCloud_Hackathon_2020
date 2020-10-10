<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/12
  Time: 16:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Ai健身</title>
    <meta name="renderer" content="webkit" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
    <%@ include file="../tags/taglib.jsp"%>
</head>
<style>
    html,body{
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: -apple-system,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","Microsoft JhengHei","Source Han Sans SC","Noto Sans CJK SC","Source Han Sans CN","Noto Sans SC","Source Han Sans TC","Noto Sans CJK TC","WenQuanYi Micro Hei",SimSun,sans-serif;
    }
    .container{
        background-color: white;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
    .phead{
        height: 10%;
        border-bottom: 1px solid #888888;
        -moz-box-shadow: 2px 2px 10px #909090;
        -webkit-box-shadow: 2px 2px 10px #909090;
        box-shadow:2px 2px 10px #909090;
    }
    .pmid{
        height: 82%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .pmid .mid-fram {
        width: 520px;
        height: 80%;
        margin-top: 3%;

    }
    .pend{
        height: 8%;
        background-color: #FAFAFA;
    }

    .layui-input, .layui-select, .layui-textarea{
        width: 99%;
        height: 56px;
        border-radius: 4px;
        border: 1px solid #aaa;
        padding: 14px 4px;
        background: 0 0;
        text-align: left;
        font-size: 20px;
        line-height: 50px;
        text-indent: 12px;
    }
    .layui-input:hover, .layui-textarea:hover {
        border-color: #3B78DD!important;
    }

    .phone-label {
        height: 54px;
        width:30%;
        border-radius: 4px;
        border: 1px solid #aaa;
        margin-right: auto;
        margin-top: 22px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }
    .phonebtn {
        height: 54px;
        width: 61.5%;
        border-radius: 4px;
        border: 0;
        margin-left: auto;
        margin-top: 22px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: white;
        cursor: pointer;
    }

    /*.btn:hover {*/
    /*    background-color: #1760D7;*/
    /*}*/

    .btn-sub {
        height: 54px;
        width: 100%;
        border-radius: 4px;
        border: 0;
        margin-top: 22px;
        font-size: 24px;
        color: white;
        cursor: pointer;
        background-color: #3B78DD;
    }

    .btn .btn-sub{
        cursor: pointer;
        background-color: #3B78DD;
    }

    .btn-sub:hover{
        background-color: #1760D7;
    }

</style>

<body>
    <div class="container">
        <div class="phead" style="display: flex;flex-direction: row ;align-items: center;">
            <div style="margin-left: 20px;display: flex;flex-direction: row;align-items: center" >
                <img src="${ctx}/images/backimg/logo.png" alt="" width="150px">
                <div style="border-left: 1px solid #888888;height: 30px;display: flex;flex-direction: row ;align-items: center;">
                    <p style="margin-left: 10px;color: #888888;font-size: 16px">账户注册</p>
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
        <div class="pmid" style="">
            <div class="mid-fram" style="background-color: white">
                <div class="cnt-tags">
                    <span class="" style="margin-top: 10px;font-size: 44px;margin-right: auto">欢迎注册Ai佳健身</span>
                </div>
                <div class="cnt-tags" style="display: flex;flex-direction: row;justify-items: center;align-items: center">
                    <span class="title-tags1" style="margin-top: 10px;font-size: 28px;">个人账户注册</span>
                    <span class="title-tags2" style="margin-top: 10px;font-size: 28px;display:none;">管理账户注册</span>
                    <div class="change-tags" style="margin-left: auto;text-align: center;padding-top: 12px;cursor: pointer;">
                        <span class="" style="font-size: 16px;color: #3B78DD">切换身份</span>
                        <span class="iconfont iconchange" style="font-size: 16px;color: #3B78DD"></span>
                    </div>
                </div>
                <form class="layui-form userform" style="display: block;width: 100%;margin-top: 22px;" action="" lay-filter="uform">
                    <div id="user" class="input-fram-person" style="display: flex;flex-direction: column;justify-items: center;align-items: center">
                        <input type="text" id="username" class="layui-input" lay-verify="required|username" lay-reqtext="用户名不能为空" autocomplete="off" placeholder="用户名">
                        <input type="password" id="userpass" style="margin-top: 22px;" class="layui-input" lay-verify="required|pass" lay-reqtext="密码不能为空" autocomplete="off" placeholder="输入密码" maxlength="16">
                        <div style="display: flex;flex-direction: row;width: 100%">
                            <div class="phone-label" style="">+86</div>
                            <input type="text" id="phonefram" style="margin-top: 22px;width: 62%;margin-left: auto" class="layui-input" autocomplete="off" placeholder="手机号码" lay-reqtext="手机号码不能为空" maxlength="11" lay-verify="required|phone">
                        </div>
                        <div style="display: flex;flex-direction: row;width: 100%">
                            <input type="text" id="code" style="margin-top: 22px;width: 28.5%;margin-right: auto" class="layui-input" placeholder="验证码" autocomplete="off" maxlength="6">
                            <button type="button" id="phben" class="btn phonebtn" style="" lay-submit="" lay-filter="phonebtn" disabled=True>发送短信验证码</button>
                        </div>
                    </div>
                    <button type="button" class="layui-btn btn-sub" lay-submit="" lay-filter="reg">立即注册</button>
                    <div style="margin-top: 8px">
                        <span style="font-size: 13px;color: #888888;">已有账号？立即</span><a href="${ctx}/main" style="font-size: 13px;color: #3B78DD;font-weight: bold;cursor: pointer;">登录</a>
                    </div>
                </form>
                <form class="layui-form adminform" style="display: block;width: 100%;margin-top: 22px;display:none" action="" lay-filter="aform">
                    <div id="admin" class="input-fram-admin" style="display: flex;flex-direction: column;justify-items: center;align-items: center;">
                        <input type="text" id="admin_username" data-id="userid" class="layui-input" lay-verify="required|adminname" lay-reqtext="请输入用户名" autocomplete="off" placeholder="管理员用户名">
                        <input type="password" id="admin_userpass" data-id="password" style="margin-top: 22px;" class="layui-input" lay-verify="required|pass" lay-reqtext="密码不能为空" autocomplete="off" placeholder="输入密码" maxlength="16">
                        <div style="display: flex;flex-direction: row;width: 100%">
                            <div class="phone-label" style="">酒店代码</div>
                            <input type="text" id="hotel" data-id="hotelid" style="margin-top: 22px;width: 62%;margin-left: auto" class="layui-input" autocomplete="off" placeholder="请输入酒店绑定码" lay-reqtext="酒店代码不能为空" maxlength="11" lay-verify="required|number">
                        </div>
                    </div>
                    <button type="button" class="layui-btn btn-sub" lay-submit="" lay-filter="admin_reg">立即注册</button>
                    <div style="margin-top: 8px">
                        <span style="font-size: 13px;color: #888888;">已有账号？立即</span><a href="${ctx}/main" style="font-size: 13px;color: #3B78DD;font-weight: bold;cursor: pointer;">登录</a>
                    </div>
                </form>
            </div>
        </div>
        <div class="pend" style="display:flex;flex-direction: column;align-items: center;justify-content: center">
            <div style="display: flex;flex-direction: row;justify-items: center;color: #666666;font-size: 12px">
                <div style=""><p>友情链接:</p></div>
                <div style="margin-left: 10px;margin-right: 10px"><p>keep官网</p></div>
                <div style="border-left: 1px solid #888888;margin-right: 10px;padding-left: 10px"><p style="">Github开源：CMU-Perceptual-Computing-Lab/openpose</p></div>
            </div>
            <div style="margin-top: 5px;color: #666666;font-size: 12px">Copyright © 2019-2020 湖南大学信息科学与工程学院宋朝都:Songcd2019@163.com </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $(".change-tags").click(function () {
                $(".userform").toggle(500,"linear",function () {
                    $(".adminform").toggle(500,"linear")
                })
            })
        })

        var time = 60;
        var btnflg = false;
        function countdown(){
            if (time == 0) {
                //这里时设置当时间到0的时候重新设置点击事件，并且默认time修改为60
                btnflg = false;
                $('#phben').attr("disabled",false);
                $("#phben").css("background-color","#3B78DD")
                document.getElementById("phben").innerText="再次发送验证码";
                time = 60;
                clearInterval(t);
            }else{
                btnflg = true;
                //这里是显示时间倒计时的时候点击不生效
                $('#phben').attr("disabled",true);
                $("#phben").css("background-color","")
                document.getElementById("phben").innerHTML="重新发送（"+time+"s)";
                time--;
            }
        }

        layui.use(['form', 'layedit'], function(){
            var form = layui.form
                ,layer = layui.layer
                ,layedit = layui.layedit
            var code = "000000"
            //创建一个编辑器
            var editIndex = layedit.build('LAY_demo_editor');
            //自定义验证规则
            form.verify({
                title: function(value){
                    if(value.length < 5){
                        return '标题至少得5个字符啊';
                    }
                }
                ,pass: [
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/
                    ,'密码必须6到12位，至少包含1个大写字母，1个小写字母和数字，不能含有空格等特殊字符'
                ]
                ,username: [
                    /^([0-9a-zA-Z\u4E00-\u9FA5]+){4,16}$/
                    ,'用户名必须4到16位，可包含字母、数字以及下划线，不能包含空格'
                ]
                ,adminname: [
                    /^([0-9a-zA-Z\u4E00-\u9FA5]+){4,11}$/
                    ,'用户名必须4到11位，可包含字母、数字以及下划线，不能包含空格'
                ]
                ,content: function(value){
                    layedit.sync(editIndex);
                }
            });

            //监听提交
            //发送验证码部分

            $("#phonefram").on('input',function () {
                if(!btnflg){
                    var v = $('#phonefram').val();
                    if ($.trim(v) == '') {
                        $('#phben').attr("disabled",true);
                        $("#phben").css("background-color","")
                    }else{
                        $('#phben').attr("disabled",false);
                        $("#phben").css("background-color","#3B78DD")
                    };
                }
            })
            form.on('submit(phonebtn)', function(data){
                var result = {}
                $("#user input").each(function () {
                    result[$(this).attr('id')] = $(this).val()
                })
                if(result['phonefram']){
                    //请求二维码
                    $.ajax({
                        //请求方式
                        type : "POST",
                        contentType: "application/json;charset=UTF-8",
                        url : "${ctx}/main/getCode",
                        data : JSON.stringify(result),
                        datatype:"JSON",
                        success : function(re) {
                            if (re.code=="0"){
                                code = re.pcode;
                                t = setInterval(function () {
                                    countdown()
                                }, 1000)
                                layer.msg(re.msg);
                                countdown()
                            }else{
                                layer.msg(re.msg);
                            }
                        },
                        error : function(e){
                            layer.msg('服务器出错');
                        }
                    });
                }
                return false;
            });

            form.on('submit(reg)', function(data){
                var subre = {}
                $("#user input").each(function () {
                    subre[$(this).attr('id')] = $(this).val()
                })
                if(subre["code"] == code){
                    var user_sha1 = sha1(subre["userpass"]);
                    subre["userpass"] = user_sha1;
                    //将数据发送后台
                    $.ajax({
                        //请求方式
                        type : "POST",
                        contentType: "application/json;charset=UTF-8",
                        url : "${ctx}/main/userEnroll",
                        data : JSON.stringify(subre),
                        datatype:"JSON",
                        success : function(re) {
                            layer.msg(re.msg);
                            if (re.code=="0"){
                                location.href="${ctx}/main/login-success?userId="+subre["phonefram"]+"&userName="+subre["username"]
                            }
                        },
                        error : function(e){
                            layer.msg('服务器出错');
                        }
                    });
                }else{
                    layer.msg('验证码错误', {
                        time: 3000
                    });
                }
                return false;
            });
            form.on('submit(admin_reg)', function(data){
                var subad = {}
                $("#admin input").each(function () {
                    subad[$(this).data('id')] = $(this).val()
                })
                if (subad!=null){
                    var sha1_pass = sha1(subad["password"])
                    subad["password"] = sha1_pass
                    //将数据发送后台
                    $.ajax({
                        //请求方式
                        type : "POST",
                        contentType: "application/json;charset=UTF-8",
                        url : "${ctx}/main/adminEnroll",
                        data : JSON.stringify(subad),
                        datatype:"JSON",
                        success : function(re) {
                            layer.msg(re.msg);
                            if (re.code=="0"){
                                location.href="${ctx}/main/admin-frame?adminId="+subad["userid"]
                            }
                        },
                        error : function(e){
                            layer.msg('服务器出错');
                        }
                    });
                }else {
                    layer.msg('系统错误', {
                        time: 3000
                    });
                }
            });
        });
    </script>
</body>
</html>
