// JavaScript Document
function ModifyUserData(f){
  if(f.oldpassword.value == ""){
      alert("�������޸����룡");
	  return false;
   }
   else if(f.oldpassword.value != f.reoldpassword.value){
      alert("������޸����벻��ȷ��");
	  return false;
   }
   else if(f.newpassword.value != ""){
      if(f.newpassword.value.length > 18){
	    alert("����������벻�ܳ��� 18 ���ַ���");
		return false;
	  }
	  if(f.newpassword.value.length<3){
	     alert("����������벻��С�� 3 ���ַ���");
		 return false;
	  }
	  if(f.newpassword.value != f.renewpassword.value){
	    alert("��������������벻ͬ��");
		return false;
	  }
   }
   else if(f.qq.value == ""){
      alert("������QQ���룡");
	  return false;
   }
   else if(f.qq.value.length>10){
       alert("���QQ����̫���ˣ�");
	   return false;
   }
   else if(f.email.value == ""){
       alert("�����������ַ��");
	   return false;    
   }
   else if((f.email.value.indexOf('@',0) == -1)||(f.email.value.indexOf('.',0) == -1)){
        alert("������Ϸ��������ַ!");
	    return false;
     }
   else if(f.signname.value.length >150){
      alert("����ǩ��̫����!");
      return false;
  }
   else{
      return true;
   }
}