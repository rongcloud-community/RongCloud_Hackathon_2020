package com.easyjf.chat.business;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import com.easyjf.dbo.EasyJDB;
import com.easyjf.dbo.IObject;

public class ChatRoom implements IObject {
	private String cid;//主键
	private String title;//聊天室主题
	private String intro;//聊天室简介
	private String announce;//聊天室公告
	private String owner;//聊天室创建人
	private Integer maxUser;//最大在线人数
	private Integer intervals;//最大刷新时间间隔
	private String vrtype;//访问权限
	private String vrvalue;//访问值
	private Integer status;//聊天室状态
	private Date inputTime;
	public static ChatRoom read(String cid)
	{
		EasyJDB db=EasyJDB.getInstance();		
		return (ChatRoom)db.get(ChatRoom.class,cid);
	}
	public static ChatRoom readBySN(String sn)
	{
		EasyJDB db=EasyJDB.getInstance();
		Collection paras=new ArrayList();
		paras.add(sn);
		return (ChatRoom)db.read(ChatRoom.class,"sn=?",paras);
	}
	public boolean save()
	{
		EasyJDB db=EasyJDB.getInstance();
		return db.saveOrUpdate(this);
	}
	public boolean update()
	{
		EasyJDB db=EasyJDB.getInstance();
		return db.update(this);
	}
	public boolean del()
	{
		EasyJDB db=EasyJDB.getInstance();
		return db.del(this);
	}
	public static List query(String scope)
	{
		EasyJDB db=EasyJDB.getInstance();
		return db.query(ChatRoom.class,scope);	
	}
	public String showStatus()
	{
		if(ChatService.get(this.cid)==null)return "未启动";
		else return "已启动";
	}	
	public boolean isRunning()
	{
		if(ChatService.get(this.cid)==null)return true;
		else return false;
	}
	 //实现IObject接口的方法
	public  String getTableName()
    {
    	return "ChatRoom";
    }
    public  String getKeyField()
    {
    	return "cid";	
    }
    public String getKeyGenerator()//主键产生器
    {
    	return "com.easyjf.dbo.RandomIdGenerator";
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
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	
	public Date getInputTime() {
		return inputTime;
	}
	public void setInputTime(Date inputTime) {
		this.inputTime = inputTime;
	}
	
	public Integer getIntervals() {
		return intervals;
	}
	public void setIntervals(Integer intervals) {
		this.intervals = intervals;
	}
	public Integer getMaxUser() {
		return maxUser;
	}
	public void setMaxUser(Integer maxUser) {
		this.maxUser = maxUser;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public String getAnnounce() {
		return announce;
	}
	public void setAnnounce(String announce) {
		this.announce = announce;
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}
