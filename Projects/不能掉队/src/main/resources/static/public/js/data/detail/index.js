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
        $('.model_2 .show').click(function() {
            if($('.model_2 .content').hasClass('on')){
                $('.model_2 .content').removeClass('on');
                $('.model_2 .show').html('+ 展开全部');

            }
            else{
                $('.model_2 .content').addClass('on');
                $('.model_2 .show').html('- 收起部分');

            }
        });

        //点击左右切换
        $(".content .but_right").click(function(){
            _index5++;
            var len=$(".swiper ul.mobile li").length;
            if(_index5+4>len){
                $(".content .swiper ul.mobile").stop().append($("ul.mobile").html());
            }
            $(".content .swiper ul.mobile").stop().animate({left:-_index5*250},1000);
        });


        $(".content .but_left").click(function(){
            if(_index5==0){
                $("ul.mobile").prepend($("ul.mobile").html());
                $("ul.mobile").css("left","-1100px");
                _index5=4
            }
            _index5--;
            $(".content .swiper ul.mobile").stop().animate({left:-_index5*250},1000);
        });

    }
};

//初始化加载
process.init();



