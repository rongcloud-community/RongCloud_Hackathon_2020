

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
            //加载banner动画
            $('#slider').nivoSlider();
           //解决鼠标移动闪切延迟问题
            $(' .game_content > li').hover(function() {
                var imgs = $(this).find('img');
                setTimeout(function() {
                    $(imgs[0]).hide();
                    $(imgs[1]).show();
                }, 250);
            }, function() {
                var imgs = $(this).find('img');
                setTimeout(function() {
                    $(imgs[1]).hide();
                    $(imgs[0]).show();
                }, 250);
            });

        }
    };

    //初始化加载
    process.init();



