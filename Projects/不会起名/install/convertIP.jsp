<%
	/**
		ҳ�湦�ܣ����ı�ip����ת���������ݿ�
		�����ļ��淴λ�ã�..\install\ip.txt 
		�������磺
			��ʼIP			����IP			����/ʡ�� 	��ϸ��ַ
			0.0.0.0         0.255.255.255   IANA  		CZ88.NET
			1.0.0.0         1.255.255.255   IANA  		CZ88.NET
			
	**/

%>
<%@page contentType="text/html; charset=GB2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" /> 
<%
//��ֹ���棬�����visiotrʱ��lastTime�޷�����
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");

int start=0;						//ָ����ĳ����ʼ��ȡ
int end=0;							//ָ���Ľ�����
int counterAll=0; 					//ȫ����¼��
long readChars=0; 					//�ѱ���ȡ���ֽ���
//������ܵ�����start��0���ʹӵ�һ�����ݿ�ʼת�������򣬴Ӽ������ļ��ж�ȡ��ʼλ��
String startStr=request.getParameter("start");
String ipcounterFile="";			//ip�������ļ�
//�Ӽ������ļ���ȡ��ʼλ��//////////////////////////////////
ipcounterFile=request.getSession().getServletContext().getRealPath(request.getRequestURI());
//ipcounterFileֵ ��D:\100imserver\Tomcat5.5\webapps\ROOT\install\convertIP.jsp  
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
//ÿ��ת��3000������ ��Ϊת�����������ݺ����׵������Ĵ�����Դ�����������ܼ����½�
end=start+1000;
String file=request.getSession().getServletContext().getRealPath(request.getRequestURI());
int n=file.lastIndexOf("\\");
file=file.substring(0,n+1);
file=file+"\\ip.txt";				//����·�����ļ���
int counter=0;						//�ܼ�¼������
int failedCounter=0;				//ʧ�ܼ�¼������

String t1="",t2="",t3="",t4="";		//ÿ����¼���ֳ�4����
long t1l=0,t2l=0;					//��ʼIP�ͽ���IP��ת��Ϊ��������
String sql="";	

Vector lines=new Vector();
///����ӵ�һ�����ݿ�ʼ��ɾ�����ݿ��е�����////////////
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
///��ȡ3000�����ݵ��ڴ�///////////////////////////////
try{
	
	/////��ȡȫ����¼��//////////////////////////////
	BufferedReader in=null;	 	  
	String t=""; 
	StringTokenizer st=null,st1=null;	
	if(counterAll==0){ //����ǵ�һ�ζ�ȡ
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
		if(counter<start) //���Դ�ָ�����п�ʼ��ȡ����
			continue;
		if(counter>end){
			counter--;
			break;
		}
		t=in.readLine();
		readChars +=t.length()+2;
		counter++;
		//����ע���кͿ���
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
			//out.println("��"+counter+"ת��ʧ�� "+t+"<br>");						
		}
		st=null;
		st1=null;
		sql=null; 
	}
	in.close();
}catch(Exception e){
	//out.println(e.toString()+" �ļ���ȡʧ��<br>");	 
}	
////////////////////////////////////////////////////// 
/**
//д���ݿ�///////////////////////////////////////////	
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
//out.println("��ת��"+counter+"������ ʧ��"+failedCounter+"�����ݡ�");
//дIP������////////////////////////////
try{	 
	//д���ļ�
	FileWriter fw = new FileWriter(ipcounterFile,false); //false ����ԭ���ļ� true׷��д��
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