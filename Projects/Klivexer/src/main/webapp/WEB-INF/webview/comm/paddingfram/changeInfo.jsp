<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/22
  Time: 15:17
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
    <%@ include file="../../tags/taglib.jsp"%>
</head>
<style>
    body,html{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    .layui-card-header{
        font-size: 12px;
        color: #888888;
        height: 32px;
        line-height: 32px;
    }
    .layui-input-inline{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>
<body>
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md2">
            <div class="layui-card">
                <div class="layui-card-header">
                    <span>我的头像</span>
                </div>
                <div class="layui-card-body" style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                    <div class="layui-upload-list">
                        <c:if test="${userEnroll.userAva==null}">
                            <img class="layui-upload-img user" src="${ctx}/images/nav/nav_boy.png" style="width: 100px;height: 100px;border-radius: 50%;object-fit:cover;">
                        </c:if>
                        <c:if test="${userEnroll.userAva!=null}">
                            <img class="layui-upload-img user" src="${ctx}/images/nav/${userEnroll.userAva}" style="width: 100px;height: 100px;border-radius: 50%;object-fit:cover;">
                        </c:if>
                        <p id="demoText"></p>
                    </div>
                    <button type="button" class="layui-btn" id="changetab" style="margin-bottom: 10px;">修改头像</button>
                </div>
            </div>
        </div>
        <div class="layui-col-md10">
            <form class="layui-form" lay-filter="userfram" id="form_user">
            <div class="layui-card">
                <div class="layui-card-header">
                    <span>我的账户</span>
                </div>
                <div class="layui-card-body">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">
                                <i class="layui-icon layui-icon-username"></i>
                                用户名
                            </label>
                            <div class="layui-input-inline">
                                <input type="text" name="userName" autocomplete="off" lay-verify="required|username" lay-reqtext="用户名不能为空" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">
                                <i class="layui-icon layui-icon-cellphone"></i>
                                绑定手机
                            </label>
                            <div class="layui-input-inline">
                                <input type="text" name="userId" autocomplete="off" disabled="disabled" lay-verify="required|phone" lay-reqtext="手机号不能为空" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">
                                <i class="layui-icon layui-icon-date"></i>
                                注册时间
                            </label>
                            <div class="layui-input-inline">
                                <input type="text" name="enrollTime" autocomplete="off" disabled="disabled" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md12">
                <div class="layui-card">
                    <div class="layui-card-header">
                        <span>我的基本信息</span>
                    </div>
                    <div class="layui-card-body">
                        <div class="layui-form-item">
                            <div class="layui-inline" pane="">
                                <label class="layui-form-label">
                                    <span class="iconfont iconxingbie" style="font-size: 18px;color: #5FB878"></span>
                                    性别
                                </label>
                                <div class="layui-input-block">
                                    <input type="radio" name="sex" value="男" title="男" checked="">
                                    <input type="radio" name="sex" value="女" title="女">
                                    <input type="radio" name="sex" value="无" title="无" disabled>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont iconnianling" style="font-size: 18px;color: #5FB878"></span>
                                    年龄
                                </label>
                                <div class="layui-input-inline">
                                    <select name="age" lay-verify="required">
                                        <option value=""></option>
                                        <option value="0" >无</option>
                                        <option value="1">10-18岁</option>
                                        <option value="2">19-23岁</option>
                                        <option value="3">24-28岁</option>
                                        <option value="4">29-33岁</option>
                                        <option value="5">34-38岁</option>
                                        <option value="6">39-43岁</option>
                                        <option value="7">44-48岁</option>
                                        <option value="8">48岁以上</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont icontizhong" style="font-size: 18px;color: #1E9FFF"></span>
                                    身高
                                </label>
                                <div class="layui-input-inline">
                                    <input type="text" name="height" autocomplete="off" class="layui-input" lay-verify="required|number">
                                    <span style="margin-left: 5px;color: #888888">CM</span>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont iconshengao" style="font-size: 18px;color: #1E9FFF"></span>
                                    体重
                                </label>
                                <div class="layui-input-inline">
                                    <input type="text" name="weight" autocomplete="off" class="layui-input" lay-verify="required|number">
                                    <span style="margin-left: 5px;color: #888888">KG</span>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont iconyaowei" style="font-size: 18px;color: #FFB800"></span>
                                    腰围
                                </label>
                                <div class="layui-input-inline">
                                    <input type="text" name="waist" autocomplete="off" class="layui-input" lay-verify="required|number">
                                    <span style="margin-left: 5px;color: #888888">CM</span>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont icontunwei" style="font-size: 18px;color: #FFB800"></span>
                                    臀围
                                </label>
                                <div class="layui-input-inline">
                                    <input type="text" name="hipline" autocomplete="off" class="layui-input" lay-verify="required|number">
                                    <span style="margin-left: 5px;color: #888888">CM</span>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont iconxiongwei" style="font-size: 18px;color: #FFB800"></span>
                                    胸围
                                </label>
                                <div class="layui-input-inline">
                                    <input type="text" name="bust" autocomplete="off" class="layui-input" lay-verify="required|number">
                                    <span style="margin-left: 5px;color: #888888">CM</span>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont iconxinshuai1" style="font-size: 18px;color: indianred"></span>
                                    静息心率
                                </label>
                                <div class="layui-input-inline">
                                    <input type="text" name="RHR" autocomplete="off" class="layui-input" lay-verify="required|number">
                                    <span style="margin-left: 5px;color: #888888">次</span>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">
                                    <span class="iconfont iconxinshuai" style="font-size: 18px;color: indianred"></span>
                                    最大心率
                                </label>
                                <div class="layui-input-inline">
                                    <input type="text" name="MHR" autocomplete="off" class="layui-input" lay-verify="required|number">
                                    <span style="margin-left: 5px;color: #888888">次</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="">
                    <button class="layui-btn" lay-submit="" lay-filter="formSubmit" style="">立即修改</button>
<%--                    <button type="reset" class="layui-btn layui-btn-primary" style="border: 1px solid #e8e8e8!important;">重置</button>--%>
                </div>
            </div>
            </form>
        </div>
    </div>
</body>
<script>
    function showLoad() {
        return layer.msg('正在提交...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,offset: 'auto', time:100000});
    }

    function closeLoad(index) {
        layer.close(index);

    }
    function showSuccess() {
        layer.msg('执行成功！',{time: 1000,offset: 'auto'});
    }
    layui.use(['form', 'layedit', 'laydate','element','upload'], function(){
        var $ = layui.jquery;
        var form = layui.form
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate
            ,upload = layui.upload;

        form.verify({
            username: [
                /^([0-9a-zA-Z\u4E00-\u9FA5]+){4,16}$/
                ,'用户名必须4到16位，可包含字母、数字以及下划线，不能包含空格'
            ]
            ,content: function(value){
                layedit.sync(editIndex);
            }
        });

        var agelist = ["无","10-18岁","19-23岁","24-28岁","29-33岁","34-38岁","39-43岁","44-48岁","48岁以上"]
        var index = agelist.lastIndexOf("${userInfo.age}");
        //加载数据
        form.val('userfram', {
            "userName": "${userEnroll.userName}"
            ,"userId": "${userEnroll.userId}"
            ,"enrollTime": "${userEnroll.enrollTime}"
            ,"sex": "${userInfo.sex}"
            ,"age": index
            ,"height": "${userInfo.height}"
            ,"weight": "${userInfo.weight}"
            ,"bust": "${userInfo.bust}"
            ,"waist": "${userInfo.waist}"
            ,"hipline": "${userInfo.hipline}"
            ,"RHR": "${userInfo.RHR}"
            ,"MHR": "${userInfo.MHR}"
        });
        var formtemp;
        //监听提交
        form.on('submit(formSubmit)', function(data){
            data.field.age = agelist[data.field.age]
            $.ajax({
                //存取数据
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/padding/infoInsert",
                data : JSON.stringify(data.field),
                datatype:"JSON",
                beforeSend: function () {
                    formtemp=showLoad();
                },
                success : function(re) {
                    closeLoad(formtemp);
                    if (re.code=="0"){
                        self.location = document.referrer;
                    }else{
                        layer.msg(re.msg,function () {});
                    }
                },
                error : function(e){
                    layer.msg('服务器出错',function () {});
                }
            });
            return false;
        });
        var layershow;
        //普通图片上传
        var uploadInst = upload.render({
            elem: '#changetab'
            ,url: '${ctx}/padding/uploadImg?userId='+${param.userId} //改成您自己的上传接口
            ,before: function(obj){
                layershow=showLoad();
            }
            ,done: function(res){
                closeLoad(layershow);
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败，请检查网络连接');
                }else {
                    var temppath = "${ctx}/images/nav/"+res.filename
                    $(".user").attr("src",temppath)
                }
            }
            ,error: function(){
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                    uploadInst.upload();
                });
            }
        });
    });
</script>
</html>
