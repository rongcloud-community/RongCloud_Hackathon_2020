<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/22
  Time: 14:10
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
        x-overflow: hidden;
    }

</style>
<body>
    <form class="layui-form layui-form-pane" style="margin-top: 10px;">
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">
                <span class="layui-icon layui-icon-release" style="color: #3B78DD;font-size: 14px;">
                    <span style="color: #D0D0D0;font-size: 12px;margin-left: 4px;">快来分享你的健身心得吧~</span>
                </span>
            </label>
            <div class="layui-input-block">
                <textarea placeholder="请输入内容..." class="layui-textarea" maxlength="255"></textarea>
            </div>
        </div>
        <div class="layui-upload">
            <button type="button" class="layui-btn" id="imgUpload" style="background-color: #3B78DD;"><i class="layui-icon" style="margin-right: 4px;"></i>添加图片</button>
            <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;background-color: white">
                <span style="color: #D0D0D0;font-size: 12px;">预览图：</span>
                <div class="layui-upload-list" id="preview" style=""></div>
            </blockquote>
        </div>
        <div class="layui-form-item">
            <button class="layui-btn" lay-submit="" lay-filter="formSubmit" style="background-color: #3B78DD">发布</button>
            <button type="reset" class="layui-btn layui-btn-primary" style="border: 1px solid #e8e8e8!important;">重置</button>
        </div>
    </form>
</body>
<script>
    layui.use(['form','upload'], function() {
        var $ = layui.jquery
            , upload = layui.upload;
        var form = layui.form
        var imgList = []    //存储图片路径
        //多图片上传
        if(imgList.length<10){
            upload.render({
                elem: '#imgUpload'
                ,url: '${ctx}/circle/uploadImg?userId='+${param.userId} //改成您自己的上传接口
                ,multiple: true
                ,before: function(obj){
                    //预读本地文件示例，不支持ie8
                }
                ,done: function(res){
                    if(res.code=="0"){
                        layer.msg("上传成功")
                        imgList.push(res.filename)
                        $('#preview').append('<img src="${ctx}/images/contentImgs/'+ res.filename +'" alt="" class="layui-upload-img" style="object-fit:cover;width: 18%;height: 120px;margin: 0 4px 0 4px;">')
                    }else{
                        layer.open({
                            type: 1
                            ,title: false //不显示标题栏
                            ,closeBtn: false
                            ,area: '300px;'
                            ,shade: 0.8
                            ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                            ,btn: ['确定']
                            ,btnAlign: 'c'
                            ,moveType: 1 //拖拽模式，0或者1
                            ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">服务器出错啦，请稍后再试</div>'
                        });
                    }
                }
                ,error: function(){
                    layer.open({
                        type: 1
                        ,title: false //不显示标题栏
                        ,closeBtn: false
                        ,area: '300px;'
                        ,shade: 0.8
                        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                        ,btn: ['确定']
                        ,btnAlign: 'c'
                        ,moveType: 1 //拖拽模式，0或者1
                        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">网络出现错误，请检查网络连接</div>'
                    });
                }
            });
        }else{
            layer.open({
                type: 1
                ,title: false //不显示标题栏
                ,closeBtn: false
                ,area: '300px;'
                ,shade: 0.8
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,btn: ['确定']
                ,btnAlign: 'c'
                ,moveType: 1 //拖拽模式，0或者1
                ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">最多上传9张图片</div>'
            });
        }

        $("button[type=reset]").click(function () {
            $('#preview').empty()
            imgList = []
        })
        //监听提交
        form.on('submit(formSubmit)', function(data){
            var inputText = $("textarea").val();
            if(inputText==""&&imgList.length==0){
                layer.msg('未填写任何内容', function(){});
            }else{
               var res = {}
                res["conCont"] = inputText;
                res["conImg"] = imgList.toString();
                res["userId"] = ${param.userId};
                //判断父id
                var classId = "${param.classId}";
                var conId = "${param.conId}";
                if(classId==""&&conId==""){
                    res["fkType"] = 0;
                }else{
                    if(classId==""&&conId!=""){
                        res["fkType"] = 2;
                        res["fkId"] = conId;
                    }else if(classId!=""&&conId==""){
                        res["fkType"] = 1;
                        res["fkId"] = classId;
                    }
                }
                $.ajax({
                    //请求方式
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/circle/setContent",
                    data : JSON.stringify(res),
                    datatype:"JSON",
                    success : function(re) {
                        if(re.code=="0"){
                            layer.msg(re.msg)
                            res = {}
                            $("button[type=reset]").click();
                            if(classId!=""){
                                self.location = document.referrer;
                            }
                        }else{
                            layer.msg(re.msg,function () {})
                        }
                    },
                    error : function(e){
                        layer.msg('网络连接出错',{icon:5}, function(){});
                    }
                });
            }
            return false;
        });
    });
</script>
</html>
