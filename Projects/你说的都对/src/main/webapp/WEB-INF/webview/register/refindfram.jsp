<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/13
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
        width: 100%;
        height: 80%;
        margin-top: 3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .pend{
        height: 8%;
        background-color: #FAFAFA;
    }
    /*input{*/
    /*    width: 98%;*/
    /*    height: 24px;*/
    /*    border-radius: 4px;*/
    /*    border: 1px solid #aaa;*/
    /*    padding: 14px 4px;*/
    /*    background: 0 0;*/
    /*    text-align: left;*/
    /*    font-size: 20px;*/
    /*    line-height: 50px;*/
    /*    text-indent: 12px;*/
    /*}*/
    /*input::-moz-placeholder { !* Mozilla Firefox 19+ *!*/
    /*    color:    #FAFAFA;*/
    /*}*/

    .layui-input, .layui-select, .layui-textarea{
        width: 99%;
        height: 54px;
        border-radius: 4px;
        border: 1px solid #aaa;
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

</style>

<body>
<div class="container">
    <div class="phead" style="display: flex;flex-direction: row ;align-items: center;">
        <div style="margin-left: 20px;display: flex;flex-direction: row;align-items: center" >
            <img src="${ctx}/images/backimg/logo.png" alt="" width="150px">
            <div style="border-left: 1px solid #888888;height: 30px;display: flex;flex-direction: row ;align-items: center;">
                <p style="margin-left: 10px;color: #888888;font-size: 16px">重置密码</p>
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
        <div class="mid-fram">
            <div class="" style="width: 100%;height: 15%;display: flex;flex-direction: row;justify-content: center;align-items: center">
                <div style="width: 10%;display: flex;flex-direction: column;align-items: center">
                    <span class="iconfont icon01" style="font-size: 50px;color: #3B78DD;font-weight: bold"></span>
                    <span style="color: #3B78DD;font-size: 12px">账户验证</span>
                </div>
                <div style="width: 30%">
                    <div class="layui-progress" lay-filter="tags1">
                        <div class="layui-progress-bar layui-bg-blue" lay-percent="0%"></div>
                    </div>
                </div>
                <div style="width: 10%;display: flex;flex-direction: column;align-items: center">
                    <span id="tags02" class="iconfont icon02" style="font-size: 50px;color: #888888;font-weight: bold"></span>
                    <span id="c-tags02" style="color: #888888;font-size: 12px">输入新密码</span>
                </div>
                <div style="width: 30%">
                    <div class="layui-progress" lay-filter="tags2">
                        <div class="layui-progress-bar layui-bg-blue" lay-percent="0%"></div>
                    </div>
                </div>
                <div style="width: 10%;display: flex;flex-direction: column;align-items: center">
                    <span id="tags03" class="iconfont icon3" style="font-size: 50px;color: #888888;font-weight: bold"></span>
                    <span id="c-tags03" style="color: #888888;font-size: 12px">完成</span>
                </div>
            </div>
            <form id="form1" class="layui-form" style="height: 100%;" action="" lay-filter="lform">
                <div id="ones" class="content-fram1" style="height:100%;width: 520px;display: flex;flex-direction: column;align-items: center;justify-content: center;margin-top: 50px;">
                    <span style="margin-right: auto;color: #888888;font-size: 12px;">请输入要重置的账号</span>
                    <div style="display: flex;flex-direction: row;width: 100%">
                        <div class="phone-label" style="">+86</div>
                        <input type="text" id="phonefram" style="margin-top: 22px;width: 62%;margin-left: auto" class="layui-input" autocomplete="off" placeholder="手机号码" lay-reqtext="手机号码不能为空" maxlength="11" lay-verify="required|phone">
                    </div>
                    <div style="display: flex;flex-direction: row;width:100%">
                        <input type="text" id="code" style="margin-top: 22px;width: 28.5%;margin-right: auto" class="layui-input" placeholder="验证码" autocomplete="off" maxlength="6">
                        <button type="button" id="phben" class="btn phonebtn" style="" lay-submit="" lay-filter="phonebtn" disabled=True>发送短信验证码</button>
                    </div>
                    <button id="onebnt" type="button" class="layui-btn btn-sub" data-steps="0" lay-submit="" lay-filter="reg">下一步</button>
                </div>
            </form>
            <form id="form2" class="layui-form" style="height: 100%;" action="" lay-filter="tform">
                <div id="twos" class="content-fram2" style="height:100%;width: 520px;display: flex;flex-direction: column;align-items: center;justify-content: center;display: none;margin-top: 50px;">
                    <input type="password" id="passWord" style="margin-top: 22px;" class="layui-input" lay-verify="required|pass" lay-reqtext="密码不能为空" autocomplete="off" placeholder="输入密码" maxlength="16">
                    <input type="password" id="reuserpass" style="margin-top: 22px;" class="layui-input" lay-verify="required|repass" lay-reqtext="重复密码不能为空" autocomplete="off" placeholder="再次输入密码" maxlength="16">
                    <button id="twsbnt" type="button" class="layui-btn btn-sub" data-steps="1" lay-submit="" lay-filter="sub">确定</button>
                </div>
            </form>
                <div id="ths" class="content-fram3" style="height:100%;width: 520px;display: flex;flex-direction: column;align-items: center;justify-content: center;display: none;margin-top: 40px;">
                    <span style="color:#888888;font-size: 16px;">密码重置成功，若浏览器长时间无跳转，点击这里进行</span><a href="${ctx}/main" style="color:#3B78DD;font-size: 22px;cursor: pointer;">登录</a>
                </div>
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
        var time = 60;
        var btnflg = false;
        var formuser = {}
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
        layui.use(['form', 'layedit','element'], function(){
            var form = layui.form
                ,layer = layui.layer
                ,layedit = layui.layedit
            var $ = layui.jquery
                ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
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
                ,repass:function (value) {
                    var repass = $("#passWord").val();
                    if($("#reuserpass").val()!=repass){
                        return '两次密码不一致';
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
                $("#ones input").each(function () {
                    result[$(this).attr('id')] = $(this).val()
                })
                if(result['phonefram']){
                    //请求二维码
                    $.ajax({
                        //请求方式
                        type : "POST",
                        contentType: "application/json;charset=UTF-8",
                        url : "${ctx}/main/getCode_refind",
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
                $("#ones input").each(function () {
                    subre[$(this).attr('id')] = $(this).val()
                })
                 if(subre["code"] == code){
                    //保存数据
                    formuser["userId"] = subre["phonefram"];
                    //切换栏目
                    var steps = $(this).data("steps")
                    if(steps == '0'){
                        element.progress("tags1","100%")
                        $("#tags02").css({"color":"#3B78DD"})
                        $("#c-tags02").css({"color":"#3B78DD"})
                        $("#tags03").css({"color":"#888888"})
                        $("#c-tags03").css({"color":"#888888"})
                        $(".content-fram1,#form1").hide(300,"linear",function () {
                            $(".content-fram2").show(300,"linear")
                        });
                    }else if(steps == '1'){
                        element.progress("tags2","100%")
                        $("#tags02").css({"color":"#3B78DD"})
                        $("#c-tags02").css({"color":"#3B78DD"})
                        $("#tags03").css({"color":"#3B78DD"})
                        $("#c-tags03").css({"color":"#3B78DD"})
                        $(".content-fram2,#form2").hide(300,"linear",function () {
                            $(".content-fram3").show(300,"linear")
                        });
                    }
                 }else{
                    layer.msg('验证码错误', {
                         time: 3000
                     });
                 }
                return false;
            });
            form.on('submit(sub)', function(data){
                var twore = {}
                $("#twos input").each(function () {
                    twore[$(this).attr('id')] = $(this).val()
                })
                if(twore["passWord"]!=""){
                    //保存数据
                    formuser["passWord"] = twore["passWord"];
                    var sha1_pass = sha1(formuser["passWord"])
                    formuser["passWord"] = sha1_pass
                    //访问后台
                    $.ajax({
                        //请求方式
                        type : "POST",
                        contentType: "application/json;charset=UTF-8",
                        url : "${ctx}/main/userRefind",
                        data : JSON.stringify(formuser),
                        datatype:"JSON",
                        success : function(re) {
                            if (re.code=="0"){
                                var steps = $("#twsbnt").data("steps")
                                if(steps == '0'){
                                    element.progress("tags1","100%")
                                    $("#tags02").css({"color":"#3B78DD"})
                                    $("#c-tags02").css({"color":"#3B78DD"})
                                    $("#tags03").css({"color":"#888888"})
                                    $("#c-tags03").css({"color":"#888888"})
                                    $(".content-fram1,#form1").hide(300,"linear",function () {
                                        $(".content-fram2").show(300,"linear")
                                    });
                                }else if(steps == '1'){
                                    element.progress("tags2","100%")
                                    $("#tags02").css({"color":"#3B78DD"})
                                    $("#c-tags02").css({"color":"#3B78DD"})
                                    $("#tags03").css({"color":"#3B78DD"})
                                    $("#c-tags03").css({"color":"#3B78DD"})
                                    $(".content-fram2,#form2").hide(300,"linear",function () {
                                        $(".content-fram3").show(300,"linear")
                                    });
                                }
                                t = setInterval(function () {
                                    location.href="${ctx}/main/login-success?userId="+formuser["userId"];
                                }, 3000)
                            }
                            layer.msg(re.msg);
                        },
                        error : function(e){
                            layer.msg('服务器出错');
                        }
                    });
                }else{
                    lay.msg("系统出错")
                }
                return false;
            });
        });
    })

</script>
</body>
</html>
