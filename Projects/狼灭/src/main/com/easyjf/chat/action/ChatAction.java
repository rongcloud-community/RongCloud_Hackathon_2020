package com.easyjf.chat.action;

import java.util.Date;

import com.easyjf.chat.business.Chat;
import com.easyjf.chat.business.ChatService;
import com.easyjf.chat.business.ChatUser;
import com.easyjf.util.CommUtil;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Globals;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.AbstractCmdAction;
import com.easyjf.web.tools.IActiveUser;
public class ChatAction extends AbstractCmdAction {
	private ChatService chatRoom;
	public Object doBefore(WebForm form, Module module) {
	// TODO Auto-generated method stub
		if(chatRoom==null)chatRoom=ChatService.get((String)form.get("cid"));
		return super.doBefore(form, module);
	}
	public Page doInit(WebForm form, Module module) {
		// TODO Auto-generated method stub		
		return doMain(form,module);
	}	
	//用户登录进入会议室
	public Page doMain(WebForm form, Module module) {			
		if(chatRoom!=null){
		ChatUser user=getChatUser();		
		if(!chatRoom.join(user))form.addResult("msg","不能加入房间，可能是权限不够！");
		form.addResult("chatRoom",chatRoom);
		form.addResult("user",user);
		}
		else
		{
			form.addResult("msg","会议未启动或者会议室不存在！");
		}		
		return module.findPage("main");
	}	
	//处理用户发言信息
	public Page doSend(WebForm form, Module module) {		
		if(chatRoom==null)return new Page("err","/err.html","thml");//返回会议室不存在的错误
		Chat chat=(Chat)form.toPo(Chat.class);
		chat.setCid(chatRoom.geneId());
		chatRoom.talk(chat);
		return doRecive(form,module);
	}	
	//用户接收发言信息
	public Page doRecive(WebForm form, Module module) {		
		if(chatRoom==null)return new Page("err","/err.html","thml");//返回会议室不存在的错误
		String lastReadId=CommUtil.null2String(form.get("lastReadId"));
		//System.out.println(lastReadId);
		form.addResult("list", chatRoom.getNewestMsg(getChatUser(),lastReadId));		
		return module.findPage("msgList");
	}
	//用户刷新会议状态信息
	public Page doLoadConfig(WebForm form, Module module) {		
		if(chatRoom==null)return new Page("err","/err.html","thml");//返回会议室不存在的错误		
		form.addResult("userList", chatRoom.getUsers());
		form.addResult("talkerList", chatRoom.getTalkers());
		return module.findPage("config");
	}
	
	//用户退出
	public Page doExit(WebForm form, Module module) {		
		if(chatRoom==null)return new Page("err","/err.html","thml");//返回会议室不存在的错误
		chatRoom.exit(getChatUser());
		form.addResult("msg","退出成功");
		ActionContext.getContext().getSession().removeAttribute("chatUser");
		return new Page("msg","/chat/xmlMsg.xml",Globals.PAGE_TEMPLATE_TYPE);
	}
	private ChatUser doLogin()
	{		
		String userName=getCurrentUser()!=null?getCurrentUser().getUserName():chatRoom.geneGuest();
		ChatUser user=new ChatUser();
		user.setUserName(userName);
		user.setLastAccessTime(new Date());
		user.setIp(ActionContext.getContext().getRequest().getRemoteAddr());
		user.setPort(""+ActionContext.getContext().getRequest().getRemotePort());
		ActionContext.getContext().getSession().setAttribute("chatUser",user);
		return user;
	}
	private IActiveUser  getCurrentUser()
	{
		IActiveUser user=(IActiveUser)ActionContext.getContext().getSession().getAttribute("bbsuser");
		return user;
	}
	private ChatUser getChatUser()
	{
		ChatUser user=null;
		user=(ChatUser)ActionContext.getContext().getSession().getAttribute("chatUser");
		if(user==null)user=doLogin();						
		return user;
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}
