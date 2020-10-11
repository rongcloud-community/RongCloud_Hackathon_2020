//登录注册时检测数据
function checkreg(name){
	var id;
	var num = 0;
	$("#"+name).find('input').each(function(i){
		id = $(this).attr('id');
		if(id !=''){
			var  input = $.trim($("#"+id).val());
			var regXe = $("#"+id).attr("regXe");
			switch($("#"+id).attr("texttype")){
				case 'text':
					if(input == ''){
						var errorTip = $("#"+id).attr("backText1");
						num = 1;
						alert(errorTip);
						return false
					}
					if(regXe !='' && typeof(regXe) != 'undefined' && input != ''){
						if(!eval(regXe).test(input)){
							var errorTip2 = $("#"+id).attr("backText2");
							num = 1;
							alert(errorTip2);
							return false
						}
					}
					break;
				case 'equal': //相等
					if(input == ""){
							var errorTip = $("#"+id).attr("backText1");
							num = 1;
							alert(errorTip);
							return false;
					}
					if(input.length < 6){
						var errorTip3 = $("#"+id).attr("backText3");
						num = 1;
						alert(errorTip3);
						return false;
					}
					if(input != $("#"+id+"2").val()){ 
						var errorTip2 = $("#"+id).attr("backText2");
						num = 1;
						alert(errorTip2);
						return false;
					}
					
					break;
			}
		}
	})
	if(num == 1){
		return false;
	}else{
		return true;
	}
}
