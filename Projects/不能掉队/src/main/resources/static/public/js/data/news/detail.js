var _index5=0;

/**  默认加载  **/
window.process={
    init:function(){
        //   this.load();
        this.public();
    },
    load:function () {
        $.ajax({
            type:"POST",
            url:getApiDomain()+"/guanwang/index",
            dataType:"json",
            data:{
                banner_size:4,
                news_size:5
            },
            success:function(data){
                var newKHtml = template('newK_data', newKData);
                $("#newK_data_content").html(newKHtml);
            },
            error:function(){
                alert("请求数据失败");
            }
        });
    },
    public:function () {
        //解决鼠标移动闪切延迟问题
        $(' .fl-right .content > a').hover(function() {
            $(this).addClass('on').siblings().removeClass('on');
        });


        //tab切换选择游戏
        $('.fl-left .title a').click(function () {
            var index=$(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $('.fl-left .content ul').eq(index).fadeIn(200).siblings().hide();
        })



    }
};

//初始化加载
process.init();



