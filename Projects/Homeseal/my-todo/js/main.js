$(function(){
	
	var $nav=$(".nav");
	var all_flag=false;
	var task_id;
	var task;

	/*************显示首页*****************/
	$nav.siblings().not("h1").hide();

	/**************点击导航进入分页*********/
	$(".nav div").click(function(){
		if(!($nav.hasClass("nav2"))){
			$nav.addClass("nav2")
			.find("div").addClass("nav2_btn");

		}
	});

	/**************添加待办事宜****************/
	$("#add_btn").click(function(){
		all_flag=false;
		$("#add_task").show()
		.siblings().not("h1,.nav").hide();
	});

	/**************提交添加任务,存储及更新页面****************/
	$("#add_task").on("submit",function(event){  
		var $task_input=$("#add_task");
		var new_task=new Object();
		var task_id;
		//检测浏览器是否开启localstorage
		if (!store.enabled) 
  			alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
		else
		{	new_task.content=$task_input.find("input[name=task_content]").val();		
			if(new_task.content) {
				//存储
				new_task.descr=$task_input.find("textarea").val();
				new_task.state='unfinished';
				if(store.get('last_id'))
					task_id=store.get('last_id');
				else task_id=0; //获得上一条事宜的ID
				task_id += 1;
				addTask(task_id,new_task);  //存储事宜详情
				addTask('last_id',task_id);  //存储id
				//添加成功后清空输入框
				$task_input.find("input,textarea").not("input[type=submit]").val(null);
		

				}}
				//console.log(store.get(task_id));
		return false;
	});
	/**************显示已完成事宜****************/
	$("#finished_btn").click(function(){
		all_flag=false;
		getTaskList("finished");
		taskListShow();
	});
	/**************显示待办事宜****************/
	$("#unfinished_btn").click(function(){
		all_flag=false;
		// $(".task_list").show()
		// .find("li").show()
		// .end().find("li[class=finished]").hide()
		// .end().siblings().not("h1,.nav").hide();
		getTaskList("unfinished");
		taskListShow();
	});
	/**************显示所有事宜****************/
	$("#all_btn").click(function(){
		all_flag=true;
		getTaskList("*");
		taskListShow();
	});
	/**************显示详情****************/
	$(".task_list").on("click"," li",function(){
		var $task_detail=$(".task_detail");
		task_id=$(this).attr("id");
		task=store.get(task_id);
		$task_detail.find("input[type=text]").val(task.content)
		.end().find("textarea.descr").val(task.descr)
		.end().show();
	});
	/**************关闭详情****************/
	$("button.detail_close").on("click",function(){
		$(".task_detail").hide();
	});
	/**************更新详情****************/
	$("#task_detail").on("submit",function(){  
		var $task_detail=$(".task_detail");
		task.content=$task_detail.find("input[type=text]").val();
		task.descr=$task_detail.find("textarea.descr").val();
		addTask(task_id,task);
		return false;
	});
	/**************更改状态****************///这里注意要阻止事件冒泡，防止触发显示详情事件
	$(".task_list").on("click"," li button.delete",function(event){
		var $this=$(this);
		var task_id=$this.parent().attr("id");
		$this.parent().toggleClass("finished unfinished");
		if ($this.text()=="完成") {
			$this.text("待办");
			updateTaskState(task_id,"unfinished");
		}
		else 
		{
			$this.text("完成");
			updateTaskState(task_id,"finished");
		}
		event.stopPropagation();
	});

})
	/*************按要求获取事宜列表************************/
	function getTaskList(state){
		//var all_task=store.getAll(); //返回Object{1:Object,2:Object,3:Object}
		var task;
		var last_id=store.get("last_id");
		var $task_ul=$("<ul></ul>");
		var $task_unfini_ul=$("<ul></ul>");
		var index=0;
		var unfini_index=0;	
		$(".task_list ul").remove();
		for(var i=1;i<=last_id;i++){
			task=getTask(i);
				if(task.state==state){
					index += 1;
					$task_ul.append(taskView(task,index,i));					
				}
				if(state=="*"){
					if(task.state=="finished")
						{
					    index += 1;
						$task_ul.append(taskView(task,index,i));						
						}else{
						unfini_index += 1;
						$task_unfini_ul.append(taskView(task,unfini_index,i));						
						}
				}
		}  //store.forEach()遍历的是ID
		if((index+unfini_index)==0)
			$task_ul.append("<li>暂无事宜</li>");
		$(".task_list").append($task_ul);
		if(state=="*")
		{
			var $task_unfini_index=$task_unfini_ul.find("li span[class=task_index]");
			var temp_index;
			for(i=0;i<unfini_index;i++){
				temp_index=$task_unfini_index.eq(i).text();
				temp_index=parseInt(temp_index)+index;
				$task_unfini_index.eq(i).text(temp_index);
			}
			$(".task_list").append($task_unfini_ul);
		}


	}
	/*************显示事宜列表************************/
	function taskListShow(){
		$(".task_list").show()
		.siblings().not("h1,.nav").hide();
	}
	
	 /*************事宜模板************************/	
	   function taskView(task,index,task_id){
   		var view_state;
   		if(task.state=='finished')view_state="完成";
   			else view_state="待办";
   		var task_show='<li class='+
   		task.state+' id='+
   		task_id+''+' title="点击查看详情"><button type="button" class="delete" title="点击更改状态">'+
   		view_state+'</button><span class="task_index">'+
   		index+'</span><span class="task_content">'+'.'+
   		task.content+'</li>';
   		return $(task_show);
   }
   /**************向数据库添加事宜****************/ 
   function addTask(id,new_task){  //对同一个ID写入会自动覆盖之前的数据，即先删除已有的再写
   		store.set(id,new_task);
   } 
   /**************从数据库获得事宜****************/
   function getTask(id){
   		var task=new Object();
   		task=store.get(id);
   		return task;
   }
   /**************从数据库更新事宜状态****************/
   function updateTaskState(task_id,state_value){ //不能用value变量，这个函数里value变量默认是ID对应的值
   		store.transact(task_id, function(value) {
			value.state = state_value;
});
   }


 

