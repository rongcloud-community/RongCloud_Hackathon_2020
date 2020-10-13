<%
	/**
		页面功能：将文本ip数据转换进入数据库
		数据文件存反位置：..\install\ip.txt 
		数据形如：
			起始IP			结束IP			国家/省份 	详细地址
			0.0.0.0         0.255.255.255   IANA  		CZ88.NET
			1.0.0.0         1.255.255.255   IANA  		CZ88.NET
			
	**/

%>
<%@page contentType="text/html; charset=GB2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" /> 
<%
//禁止缓存，否则表visiotr时间lastTime无法更新
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");

int start=0;						//指定从某行起始读取
int end=0;							//指定的结束行
int counterAll=0; 					//全部记录数
long readChars=0; 					//已被读取的字节数
//如果接受到参数start＝0，就从第一条数据开始转换，否则，从计数器文件中读取起始位置
String startStr=request.getParameter("start");
String ipcounterFile="";			//ip计数器文件
//从计数器文件读取起始位置//////////////////////////////////
ipcounterFile=request.getSession().getServletContext().getRealPath(request.getRequestURI());
//ipcounterFile值 ：D:\100imserver\Tomcat5.5\webapps\ROOT\install\convertIP.jsp  
ipcounterFile=ipcounterFile.substring(0,ipcounterFile.lastIndexOf("install"))+"config\\ipcounter";	
//out.println(ipcounterFile);
if(startStr!=null && startStr.equals("0"))	 
	;
else{		
	try{	
		 
		BufferedReader in= new BufferedReader(new FileReader(ipcounterFile));     
		if(in.ready())    
			try{start=Integer.parseInt(in.readLine()); }catch(Exception e1){}   
		if(in.ready())    
			try{counterAll=Integer.parseInt(in.readLine()); }catch(Exception e1){}   
		if(in.ready())    
			try{readChars=Long.parseLong(in.readLine()); }catch(Exception e1){}     
		in.close();     
	}catch(Exception e){}
	/////////////////////////////////////////////////////////////
}
//每次转换3000条数据 因为转换大量的数据很容易导致消耗大量资源，服务器性能急剧下降
end=start+1000;
String file=request.getSession().getServletContext().getRealPath(request.getRequestURI());
int n=file.lastIndexOf("\\");
file=file.substring(0,n+1);
file=file+"\\ip.txt";				//包含路径的文件名
int counter=0;						//总记录计数器
int failedCounter=0;				//失败记录计数器

String t1="",t2="",t3="",t4="";		//每条记录北分成4部分
long t1l=0,t2l=0;					//起始IP和结束IP北转换为长整型数
String sql="";	

Vector lines=new Vector();
///如果从第一条数据开始就删除数据库中的数据////////////
if(start==0){
	try{
		sql="TRUNCATE TABLE address ";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection();  
		db.setSqlQuery(sql);	
		db.executeUpdate();		
	}catch(Exception e1){
		//out.println(e1.getMessage());
	}
}
////////////////////////////////////////////////////////
///读取3000条数据到内存///////////////////////////////
try{
	
	/////读取全部记录数//////////////////////////////
	BufferedReader in=null;	 	  
	String t=""; 
	StringTokenizer st=null,st1=null;	
	if(counterAll==0){ //如果是第一次读取
		in= new BufferedReader(new FileReader(file));		
		while(in.ready()){		
			in.readLine();
			counterAll++;
		}  
		in.close();
	}
	//////////////////////////////////////////////
	counter=start;
	in= new BufferedReader(new FileReader(file));
	if(in.ready()) 
		in.skip(readChars);			 
	while(in.ready() && start<counterAll){			
		if(counter<start) //可以从指定的行开始读取数据
			continue;
		if(counter>end){
			counter--;
			break;
		}
		t=in.readLine();
		readChars +=t.length()+2;
		counter++;
		//跳过注释行和空行
		if(t.startsWith("#") || t.startsWith("\r") || t.startsWith("\n")) 
			continue;
		try{
			st = new StringTokenizer(t," \r\n\t");			 
			t1=st.nextToken();t2=st.nextToken();t3=st.nextToken();					 
			t4="";
			while(st.hasMoreTokens())
				t4 +=" "+st.nextToken();
			st1 = new StringTokenizer(t1,".");	
			t1l=Long.parseLong(st1.nextToken())*256*256*256+Long.parseLong(st1.nextToken())*256*256+
			Long.parseLong(st1.nextToken())*256+Long.parseLong(st1.nextToken());
			st1 = new StringTokenizer(t2,".");	
			t2l=Long.parseLong(st1.nextToken())*256*256*256+Long.parseLong(st1.nextToken())*256*256+
			Long.parseLong(st1.nextToken())*256+Long.parseLong(st1.nextToken());
			sql="insert into address values(\""+String.valueOf(t1l)+"\",\""+String.valueOf(t2l)+"\",\""+t3+"\",\""+t4+"\")";
			//lines.addElement(sql);
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 	
			db.setSqlQuery(sql);	
			db.executeUpdate();			
		}catch(Exception e1){
			failedCounter++;	
			//out.println("行"+counter+"转换失败 "+t+"<br>");						
		}
		st=null;
		st1=null;
		sql=null; 
	}
	in.close();
}catch(Exception e){
	//out.println(e.toString()+" 文件读取失败<br>");	 
}	
////////////////////////////////////////////////////// 
/**
//写数据库///////////////////////////////////////////	
Runtime.getRuntime().gc();	
if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
for(int i=0;i<lines.size();i++){
	try{
		sql=(String)lines.elementAt(i);			 
		db.setSqlQuery(sql);	
		db.executeUpdate();	
	}catch(Exception e2){
		out.println(e2.getMessage());
	}
}
**/
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection(); 
//////////////////////////////////////////////////// 
//out.println("共转换"+counter+"条数据 失败"+failedCounter+"条数据。");
//写IP计数器////////////////////////////
try{	 
	//写入文件
	FileWriter fw = new FileWriter(ipcounterFile,false); //false 覆盖原有文件 true追加写入
	PrintWriter pw = new PrintWriter(fw);	 
	pw.print(String.valueOf(end+1)+"\r\n"); 	
	pw.print(String.valueOf(counterAll)+"\r\n"); 
	pw.print(String.valueOf(readChars)+"\r\n");   
	pw.flush();
	pw.close();
  	fw.close();		
}catch(Exception e){
	//out.println(e.getMessage());
}
//out.println(""+String.valueOf(start)+" "+String.valueOf(end)+" "+String.valueOf(counter));
///////////////////////////////////////////
if(end>=counterAll)
	out.println("finished");
else
	out.println("result="+String.valueOf(end)+"/"+counterAll);
%>