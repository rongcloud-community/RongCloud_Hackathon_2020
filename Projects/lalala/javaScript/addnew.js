function addType(){
             var typeselect=document.getElementById("typeselect");
             var newoption=document.createElement("option");
             var newtype=document.getElementById("newtype");
             newoption.appendChild(document.createTextNode(newtype.value));
             newoption.setAttribute("value",newtype.value);
             //newoption.setAttribute("id",newtype.value);
             //var newtypeid=document.getElementById(newtype.value);
             typeselect.insertBefore(newoption,typeselect.options[0]);
             
             //typeselect.appendChild(newoption);
             
             //var selindex=typeselect.options.length;
             //selindex--;
             //for(var i=0;i<typeselect.options.length;i++){
              //alert(typeselect.options[i].value);
             // alert(typeselect.options[i].text);
             //}
             typeselect.selectedIndex=0;
             //alert(typeselect.selectedIndex);
             hiddeninput();
          }
          
          function showinput(){
             var newtype=document.getElementById("newtype");
             newtype.setAttribute("value","请在这里输入新类型");
             newtype.style.visibility="visible";
          }
          
          function hiddeninput(){
             var newtype=document.getElementById("newtype");
             newtype.style.visibility="hidden";
          }
          
          function resetvalue(){
            var newtype=document.getElementById("newtype");
            newtype.value="";
          }