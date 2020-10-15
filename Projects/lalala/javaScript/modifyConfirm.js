// JavaScript Document
function ModifyUserData(f){
  if(f.oldpassword.value == ""){
      alert("请输入修改密码！");
	  return false;
   }
   else if(f.oldpassword.value != f.reoldpassword.value){
      alert("输入的修改密码不正确！");
	  return false;
   }
   else if(f.newpassword.value != ""){
      if(f.newpassword.value.length > 18){
	    alert("你输入的密码不能超过 18 个字符！");
		return false;
	  }
	  if(f.newpassword.value.length<3){
	     alert("你输入的密码不能小于 3 个字符！");
		 return false;
	  }
	  if(f.newpassword.value != f.renewpassword.value){
	    alert("你输入的两次密码不同！");
		return false;
	  }
   }
   else if(f.qq.value == ""){
      alert("请输入QQ号码！");
	  return false;
   }
   else if(f.qq.value.length>10){
       alert("你的QQ号码太长了！");
	   return false;
   }
   else if(f.email.value == ""){
       alert("请输入邮箱地址！");
	   return false;    
   }
   else if((f.email.value.indexOf('@',0) == -1)||(f.email.value.indexOf('.',0) == -1)){
        alert("请输入合法的邮箱地址!");
	    return false;
     }
   else if(f.signname.value.length >150){
      alert("个性签名太长了!");
      return false;
  }
   else{
      return true;
   }
}