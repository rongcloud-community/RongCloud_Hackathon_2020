



/**
 * 解析get请求参数
 * @returns {Array}
 */
function getCode() {
    var URLParams = new Array();
    var aParams = document.location.search.substr(1).split('&');
    for (var i = 0; i < aParams.length; i++) {
        var aParam = aParams[i].split('=');
        URLParams[aParam[0]] = aParam[1];
    }
    return URLParams;
}

/**
 * 获取api头域名
 * @returns {*}
 */
function getApiDomain() {
    return "http://cs.api.6lapp.com.cn:8081";
}


/**
 * 分页
 * @returns {*}
 */

function getPage() {
    var datas=[
        {"did":1,"name":"又降价！Intel狂推首款可超频i3 中国特供","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":2,"name":"父子俩野营时喂了一只野猫 打开帐篷震惊","price":16.5,"img_sm":"p2679.jpg","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳"},
        {"did":3,"name":"iPhone 7为啥卖不动？终于知道了！","price":32,"img_sm":"p8489.jpg","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽"},
        {"did":4,"name":"7吨超美国！中国革命性大卫星领先世界1代","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":5,"name":"昨晚全世界都被杭州美哭了(图)","price":16.5,"img_sm":"p2679.jpg","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳"},
        {"did":6,"name":"A系处理器成历史！苹果从零自研GPU","price":32,"img_sm":"p8489.jpg","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽"},
        {"did":7,"name":"黑科技让NVMe SSD性能爆炸！再不浪费容量","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":8,"name":"都是泪！QQ最新大数据：年轻人看完沉默了","price":16.5,"img_sm":"p2679.jpg","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳"},
        {"did":9,"name":"特斯拉什么车都要造：但就是不造它","price":32,"img_sm":"p8489.jpg","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽"},
        {"did":10,"name":"新一代宝马X4首次现身：内外大换血！","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":11,"name":"又降价！Intel狂推首款可超频i3 中国特供","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":12,"name":"父子俩野营时喂了一只野猫 打开帐篷震惊","price":16.5,"img_sm":"p2679.jpg","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳"},
        {"did":13,"name":"iPhone 7为啥卖不动？终于知道了！","price":32,"img_sm":"p8489.jpg","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽"},
        {"did":14,"name":"7吨超美国！中国革命性大卫星领先世界1代","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":15,"name":"昨晚全世界都被杭州美哭了(图)","price":16.5,"img_sm":"p2679.jpg","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳"},
        {"did":16,"name":"A系处理器成历史！苹果从零自研GPU","price":32,"img_sm":"p8489.jpg","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽"},
        {"did":17,"name":"黑科技让NVMe SSD性能爆炸！再不浪费容量","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":18,"name":"都是泪！QQ最新大数据：年轻人看完沉默了","price":16.5,"img_sm":"p2679.jpg","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳"},
        {"did":19,"name":"特斯拉什么车都要造：但就是不造它","price":32,"img_sm":"p8489.jpg","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽"},
        {"did":20,"name":"新一代宝马X4首次现身：内外大换血！","price":36,"img_sm":"p0281.jpg","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉"},
        {"did":21,"name":"二十四节气怎样来的？老祖宗真智慧","price":32,"img_sm":"p8489.jpg","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽"}
    ];
    var options={
        "id":"page",//显示页码的元素
        "data":datas,//显示数据
        "maxshowpageitem":5,//最多显示的页码个数
        "pagelistcount":2,//每页显示数据个数
        "callBack":function(result){
            var cHtml="";
            for(var i=0;i<result.length;i++){
                cHtml+="<li>"+ result[i].name+"</li>";//处理数据
            }
            $("#demoContent").html(cHtml);//将数据增加到页面中
        }
    };
    page.init(datas.length,1,options);
}