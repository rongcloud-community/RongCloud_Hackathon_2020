<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/22
  Time: 14:50
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
    body,html{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    .head-tags{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .head-tags .iconfont{
        font-size: 32px;
    }
    .head-tags .icontext{
        color: #888888;
        font-size: 14px;
        margin-left: 5px;
    }
    .head-tags .showtext{
        color: #888888;
        font-size: 16px;
    }
    .gonggao{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

</style>
<body>

<fieldset class="layui-elem-field site-demo-button" style="border-radius: 4px;border: 1px solid #3B78DD;">
    <legend >
        <span style="color: #888888;font-size: 16px;">用户推荐餐饮搭配 - 摄入热量参考范围 ： </span>
        <span class="iconfont iconhuo" style="color: #FF5722;font-size: 16px;"></span>
        <span style="color: #FF5722;font-size: 22px;">2090 - 2190Kcal</span>
    </legend>
    <div style="padding: 10px;">
        <div class="layui-card">
            <div class="layui-card-header">
                <span class="iconfont iconzaocan"><span style="margin-left: 5px;">早餐建议</span></span>
                <span style="margin-left: 15px;color: #888888;font-size: 16px;text-align: center">来源用户:</span>
                <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" style="cursor: pointer;margin-bottom: 2px;margin-left: 10px;">
                <span style="color: #888888;font-size: 16px;">Tursa</span>
                <span style="margin-left:10px;color: #888888;font-size: 12px;">2020-04-30 16:30:23</span>
                <span style="margin-left:25px;color: #3B78DD;font-size: 14px;cursor: pointer;">采纳<span class="iconfont iconxiayibu" style=""></span></span>
                <span class="iconfont iconqiehuan" style="float: right;color: #3B78DD;font-size: 14px;cursor: pointer;"><span style="margin-left:5px;">换一组</span></span>
            </div>
            <div class="layui-card-body">
                <table class="layui-table" lay-even="" lay-skin="nob">
                    <colgroup>
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>类别</th>
                        <th>名称</th>
                        <th>计量</th>
                        <th>能量</th>
                        <th>备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>主食</td>
                        <td>小米</td>
                        <td>3.4份</td>
                        <td>12Kcal</td>
                        <td>约65g</td>
                    </tr>
                    <tr>
                        <td>肉蛋奶</td>
                        <td>瘦猪肉</td>
                        <td></td>
                        <td>12Kcal</td>
                        <td>约84g</td>
                    </tr>
                    <tr>
                        <td>蔬果</td>
                        <td>西兰花</td>
                        <td></td>
                        <td>12Kcal</td>
                        <td>约139g</td>
                    </tr>
                    <tr>
                        <td>油脂</td>
                        <td>植物油</td>
                        <td>3.0份</td>
                        <td>12Kcal</td>
                        <td>约15g</td>
                    </tr>
                    <tr>
                        <td>总热量</td>
                        <td></td><td></td>
                        <td style="color: #FF5722">538Kcal</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="layui-card">
            <div class="layui-card-header">
                <span class="iconfont iconwucan"><span style="margin-left: 5px;">午餐建议</span></span>
                <span style="margin-left: 15px;color: #888888;font-size: 16px;text-align: center">来源用户:</span>
                <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" style="cursor: pointer;margin-bottom: 2px;margin-left: 10px;">
                <span style="color: #888888;font-size: 16px;">Tursa</span>
                <span style="margin-left:10px;color: #888888;font-size: 12px;">2020-04-30 16:30:23</span>
                <span style="margin-left:25px;color: #3B78DD;font-size: 14px;cursor: pointer;">采纳<span class="iconfont iconxiayibu" style=""></span></span>
                <span class="iconfont iconqiehuan" style="float: right;color: #3B78DD;font-size: 14px;cursor: pointer;"><span style="margin-left:5px;">换一组</span></span>
            </div>
            <div class="layui-card-body">
                <table class="layui-table" lay-even="" lay-skin="nob">
                    <colgroup>
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>类别</th>
                        <th>名称</th>
                        <th>计量</th>
                        <th>能量</th>
                        <th>备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>主食</td>
                        <td>小米</td>
                        <td>3.4份</td>
                        <td>12Kcal</td>
                        <td>约65g</td>
                    </tr>
                    <tr>
                        <td>肉蛋奶</td>
                        <td>瘦猪肉</td>
                        <td></td>
                        <td>12Kcal</td>
                        <td>约84g</td>
                    </tr>
                    <tr>
                        <td>蔬果</td>
                        <td>西兰花</td>
                        <td></td>
                        <td>12Kcal</td>
                        <td>约139g</td>
                    </tr>
                    <tr>
                        <td>油脂</td>
                        <td>植物油</td>
                        <td>3.0份</td>
                        <td>12Kcal</td>
                        <td>约15g</td>
                    </tr>
                    <tr>
                        <td>总热量</td>
                        <td></td><td></td>
                        <td style="color: #FF5722">538Kcal</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="layui-card">
            <div class="layui-card-header">
                <span class="iconfont iconzaocanwancan"><span style="margin-left: 5px;">晚餐建议</span></span>
                <span style="margin-left: 15px;color: #888888;font-size: 16px;text-align: center">来源用户:</span>
                <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" style="cursor: pointer;margin-bottom: 2px;margin-left: 10px;">
                <span style="color: #888888;font-size: 16px;">Tursa</span>
                <span style="margin-left:10px;color: #888888;font-size: 12px;">2020-04-30 16:30:23</span>
                <span style="margin-left:25px;color: #3B78DD;font-size: 14px;cursor: pointer;">采纳<span class="iconfont iconxiayibu" style=""></span></span>
                <span class="iconfont iconqiehuan" style="float: right;color: #3B78DD;font-size: 14px;cursor: pointer;"><span style="margin-left:5px;">换一组</span></span>
            </div>
            <div class="layui-card-body">
                <table class="layui-table" lay-even="" lay-skin="nob">
                    <colgroup>
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>类别</th>
                        <th>名称</th>
                        <th>计量</th>
                        <th>能量</th>
                        <th>备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>主食</td>
                        <td>小米</td>
                        <td>3.4份</td>
                        <td>12Kcal</td>
                        <td>约65g</td>
                    </tr>
                    <tr>
                        <td>肉蛋奶</td>
                        <td>瘦猪肉</td>
                        <td></td>
                        <td>12Kcal</td>
                        <td>约84g</td>
                    </tr>
                    <tr>
                        <td>蔬果</td>
                        <td>西兰花</td>
                        <td></td>
                        <td>12Kcal</td>
                        <td>约139g</td>
                    </tr>
                    <tr>
                        <td>油脂</td>
                        <td>植物油</td>
                        <td>3.0份</td>
                        <td>12Kcal</td>
                        <td>约15g</td>
                    </tr>
                    <tr>
                        <td>总热量</td>
                        <td></td><td></td>
                        <td style="color: #FF5722">538Kcal</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</fieldset>
</body>
<script>
    layui.use(['form', 'layedit', 'laydate','element','upload'], function() {
        var $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate
            , upload = layui.upload;

    })
</script>
</html>
