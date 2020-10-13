package com.easyjf.chat.business;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class ChatService implements Runnable {
private static final Map service=new HashMap();//会议室服务,系统中的当前会议室存放到该表集合中
private static final int maxServices=10;//可以同时开的最大会议室数
private static final SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd");
private final List msgs;//聊天信息Chat
private final List users;//在线用户,ChatUser
private final List talkers;//排队发言人数Talker
private final List manager;//会议室管理员
private Talker currentTalker;//当前发言人
private String cid;//会议室id
private String title;//会议室主题
private String intro;//会议室简介
private String owner;//会议室创建人
private int maxUser;//最大在线人数
private int interval;//最大刷新时间间隔
private String vrtype;//访问权限
private String vrvalue;//访问值
private String announce;
private String password;//房间进入密码
private int status;//会议室状态
private String filePath;
//private Thread thread;
private boolean isStop=false;
public ChatService()
{
	this.msgs=new ArrayList();
	this.users=new ArrayList();
	this.talkers=new ArrayList();
	this.manager=new ArrayList();
	this.maxUser=1000;//最大1000人同时
	this.interval=1000*60*5;//5分钟以前的信息
}
/**
 * 停止所有会议室
 *
 */
public  static void clear()
{
	if(!service.isEmpty())
	{
		Iterator it=service.values().iterator();
		while(it.hasNext())
		{
			ChatService chat=(ChatService)it.next();
			chat.stop();
		}
	}
		service.clear();
}
/**
 * 创建一个会议室
 * @param name 会议室ID
 * @return
 */
public static ChatService create(String name)
{
ChatService ret=null;
if(service.containsKey(name))
{
	ChatService s=(ChatService)service.get(name);
	s.stop();
	service.remove(name);
}
if(service.size()<maxServices)
{
	ret=new ChatService();	
	service.put(name,ret);
}
return ret;
}
/**
 * 停止某个会议室
 * @param name 会议室ID
 * @return
 */
public static boolean close(String name)
{
	ChatService chatRoom=ChatService.get(name);
	if(chatRoom!=null)
		{
		chatRoom.stop();
		service.remove(name);
		}
	return true;
}
/**
 * 获得一个会议室信息
 * @param name 会议室ID
 * @return
 */
public static ChatService get(String name)
{
	if(service.containsKey(name))return (ChatService)service.get(name);
	else return null;
}

public void run() {
	// TODO Auto-generated method stub
	//this.thread=Thread.currentThread();
	while(!isStop)
	{
	//System.out.println("开始监控一个会议室!"+this.title);
	this.flash();
	try{
	Thread.sleep(5000);
	}
	catch(Exception e)
	{
		e.printStackTrace();		
	}	
	}
	//System.out.println("结束!");
}
public void stop()
{
	this.flashAll();
	isStop=true;
}
//会议室中有人发言
public boolean talk(Chat chat)
{
	boolean ret=false;
	if(canTalk(chat.getSender()))
		{		
		this.msgs.add(chat);
	     ret=true;
		}
	return ret;
}
//新用户加入会议室
public boolean join(ChatUser user)
{
	boolean ret=false;
	if(canJoin(user))
	{
		boolean isJoin=false;
		for(int i=0;i<users.size();i++)
		{
			ChatUser u=(ChatUser)users.get(i);
			if(u.getUserName().equals(user.getUserName()))
			{
				isJoin=true;
				u.setLastAccessTime(new Date());
			}
		}
		if(!isJoin)this.users.add(user);	
		talk(geneSystemMsg(user.getUserName()+"进入会议室!"));
		ret=true;
		
	}
	return ret;
}

public boolean exit(ChatUser user)
{	    
  talk(geneSystemMsg(user.getUserName()+"退出了会议室！"));
  return this.users.remove(user);
}
public Chat geneSystemMsg(String info)
{
	Chat msg=new Chat();
	   msg.setCid(geneId());
	   msg.setSender("系统");
	   msg.setContent(info);
	   msg.setVdate(new Date());	
	   msg.setReciver("大家");
	   return msg;
}
//检测用户是否具有加入会议室的权限
public boolean canJoin(ChatUser user)
{
	boolean ret=false;
	String vrType=this.getVrtype();	
	if(vrType==null || (vrType.trim().equals("")))//所有人都能进入
	{
		ret=true;
	}
	else//判断访问权限
	{	
     //	会员
	if(vrType.equals("user"))
	{
		//ret=user!=null;	
	}			
	else if(vrType.equals("score"))//积分限制
	{
		//ret= user.getScore().intValue()>new Integer(this.getVrvalue()).intValue();		
	}	
	else if(vrType.equals("member"))
	{
		//ret=user.getTypes()!=null && (!user.getTypes().equals("")) && user.checkUserRole("member");	
	}
	else if(vrType.equals("admin"))
	{
		//ret=user.getTypes()!=null && (!user.getTypes().equals("")) && user.checkUserRole("admin");	
	}
	}
	return ret;
}
//检测用户是否具有发言权限
public boolean canTalk(String userName)
{
	if(this.getStatus()>0)
	{		
		return (this.getCurrentTalker().getUserName().equals(userName));
	}
	else return true;
}
//读取N条最新的发言信息
public List getNewestMsg(ChatUser user,String lastReadId)//根据上次读出的Id号读出聊天信息
{
	List ret=new ArrayList();
	user.setLastAccessTime(new Date());
	long now=System.currentTimeMillis();
	for(int i=msgs.size()-1;i>=0;i--)
	{
	Chat info=(Chat)msgs.get(i);
	if((now-info.getVdate().getTime()>this.interval)||(info.getCid().equals(lastReadId)))break;	
	ret.add(0,info);
	}	
	return ret;
}
public String geneId()
{
	Random r = new Random(10);   
	String id = System.currentTimeMillis()+""+r.nextInt();
	return id;
}
public String geneGuest()
{
	int i=this.users.size()+1;
	String userName="guest"+i;
	if(this.users.contains(userName))userName="guest_"+i;	
	return userName;
}
//刷新信息，保存会议信息
public void flash()
{
	flashChatMsg();
	flashChatUser();
}
public void flashChatMsg()
{
	long now=System.currentTimeMillis();
	List delList=new ArrayList();
	for(int i=0;i<msgs.size();i++)
	{
		Chat info=(Chat)msgs.get(i);
		if((now-info.getVdate().getTime())>this.interval)delList.add(0,info);
	}
   StringBuffer s=new StringBuffer(1024);
   for(int i=0;i<delList.size();i++)
   {
	   Chat info=(Chat)msgs.get(i);
	   s.append("<font color=blue>"+info.getSender()+"</font>对<font color=blue>"+info.getReciver()+"</font>说:"+info.getContent()+"("+info.getVdate()+")\r\n");
   }
   if(s.length()>1)  saveToFile(s.toString());
   msgs.removeAll(delList);
}
public void flashChatUser()
{
	long now=System.currentTimeMillis();
	List delList=new ArrayList();
	for(int i=0;i<users.size();i++)
	{
		ChatUser info=(ChatUser)users.get(i);
		if((now-info.getLastAccessTime().getTime())>this.interval)delList.add(0,info);		
	}  
   for(int i=0;i<delList.size();i++)
   {
	   ChatUser info=(ChatUser)delList.get(i);	   
	   this.talk(geneSystemMsg(info.getUserName()+"非正常退出会议！"));
   } 
   users.removeAll(delList);
}
private void saveToFile(String s)
{
	try{
	File file=new File(filePath+"/"+this.title+"_"+df.format(new Date())+".txt");
	if(!file.getParentFile().exists())file.getParentFile().mkdirs();
	OutputStream o=new FileOutputStream(file,true);	
	OutputStreamWriter out=new OutputStreamWriter(o,"utf-8");	
	out.write(s);
	out.close();
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
}
//刷新信息，保存会议信息
public void flashAll()
{
	StringBuffer s=new StringBuffer(1024);
	for(int i=0;i<msgs.size();i++)
	{
	  Chat info=(Chat)msgs.get(i);
	  s.append(info.getSender()+"对"+info.getReciver()+"说:"+info.getContent()+"("+info.getVdate()+")\r\n");
	}
	msgs.clear();
	saveToFile(s.toString());
}


public int getInterval() {
	return interval;
}
public void setInterval(int interval) {
	this.interval = interval;
}

public int getMaxUser() {
	return maxUser;
}
public void setMaxUser(int maxUser) {
	this.maxUser = maxUser;
}
public String getVrtype() {
	return vrtype;
}
public void setVrtype(String vrtype) {
	this.vrtype = vrtype;
}
public String getVrvalue() {
	return vrvalue;
}
public void setVrvalue(String vrvalue) {
	this.vrvalue = vrvalue;
}
public int getStatus() {
	return status;
}
public void setStatus(int status) {
	this.status = status;
}

public List getTalkers() {
	return talkers;
}

public List getUsers() {
	return users;
}

public Talker getCurrentTalker() {
	return currentTalker;
}
public void setCurrentTalker(Talker currentTalker) {
	this.currentTalker = currentTalker;
}

public String getIntro() {
	return intro;
}
public void setIntro(String intro) {
	this.intro = intro;
}
public String getOwner() {
	return owner;
}
public void setOwner(String owner) {
	this.owner = owner;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public List getManager() {
	return manager;
}

public String getFilePath() {
	return filePath;
}

public void setFilePath(String filePath) {
	this.filePath = filePath;
}

public String getCid() {
	return cid;
}

public void setCid(String cid) {
	this.cid = cid;
}

public String getAnnounce() {
	return announce;
}

public void setAnnounce(String announce) {
	this.announce = announce;
}

public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}

/**
	 * @param args
	 */
public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}
