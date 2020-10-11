//取分页数据
var matched, browser;
jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();
    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};
matched = jQuery.uaMatch( navigator.userAgent );
browser = {};
if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
    browser.webkit = true;
} else if ( browser.webkit ) {
    browser.safari = true;
}

jQuery.browser = browser;
var safari = jQuery.browser.webkit;
$(function(){
    var url;
	var i = 2;
    var _no_page = false;
    var _ajax_load = false;
    if(typeof(_url) == 'undefined'){
        url = "/product/getReloadPro/";
    }else{
        url = _url;
    }
	$(window).bind( "scroll", function(e) {
        if(_no_page){
            return;
        }
		var bot = 0; //bot是底部距离的高度
		//异步加载数据
        var scrollTop = $(document).scrollTop();
        var winHeight = $(window).height();
        var domHeight = $(document).height();
        if(safari){
			bot += 60 + 78;
		}
		if (bot + scrollTop + winHeight >= domHeight && !_ajax_load) {
            _ajax_load = true;
			if(typeval == "sales"){
				var postStr = 'type='+typeval+'&page=' + i +  '&c='+ category + '&b='+ brand +'&p=' + price + '&co=' + color + '&o=' + order + '&ptype=' + ptype +"&g="+gender;
			}else if(typeval == "bargains"){
				var postStr = 'type='+typeval+'&page=' + i +  '&c='+ category + '&b='+ brand +'&p=' + price + '&co=' + color + '&o=' + order + '&bid=' + bid +"&g="+gender;
			}else if(typeval == "woman" || typeval == "man"){
				var postStr = 'type='+typeval+'&page=' + i +  '&c='+ category + '&b='+ brand +'&p=' + price + '&co=' + color + '&o=' + order ;
			}else if(typeval == "search"){
                var postStr = 'type=ajax&page=' + i + '&q=' + q;
            }else{
				var postStr = 'type='+typeval+'&page=' + i +  '&c='+ category + '&b='+ brand +'&p=' + price + '&co=' + color + '&o=' + order + '&size=' + size +"&g="+gender;
			}
			$.ajax({
				type: "GET",
				url: url + new Date().getTime(),
				async: false,
				data: postStr,
				beforeSend:function(){
					$("#dataload").show();
				},
				success: function(msg){
                    if(msg == ''){
						_no_page = true;
						$('#dataload').hide();
					}
					$("#proList").append(msg);
					i++;
                    _ajax_load = false;
					return;
				}
			});
		}

	})
})