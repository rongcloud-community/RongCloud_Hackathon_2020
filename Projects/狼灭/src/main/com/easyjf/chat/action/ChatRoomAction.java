package com.easyjf.chat.action;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import com.easyjf.chat.business.ChatHistory;
import com.easyjf.chat.business.ChatRoom;
import com.easyjf.chat.business.ChatService;
import com.easyjf.chat.business.ChatUser;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Globals;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.AbstractCrudAction;
import com.easyjf.web.tools.DbPageList;
import com.easyjf.web.tools.IActiveUser;
import com.easyjf.web.tools.IPageList;
import com.easyjf.web.tools.ListQuery;
import com.easyjf.web.tools.PageList;

public class ChatRoomAction extends AbstractCrudAction {
	public Page doCreate(WebForm form, Module module) {
		if (getCurrentUser(form) == null)
			return new Page("popedomError", "/bbs/norights.htm", "page");
		String cid = CommUtil.null2String(form.get("cid"));
		ChatRoom obj = ChatRoom.read(cid);
		if (obj != null) {
			ChatService chat = ChatService.create(obj.getCid());
			chat.setMaxUser(obj.getMaxUser().intValue());
			chat.setCid(obj.getCid());
			chat.setIntro(obj.getIntro());
			chat.setTitle(obj.getTitle());
			chat.setInterval(obj.getIntervals().intValue() * 1000);
			chat.setOwner(obj.getOwner());
			chat.setVrtype(obj.getVrtype());
			chat.setVrvalue(obj.getVrvalue());
			chat.setAnnounce(obj.getAnnounce());
			chat.setStatus(obj.getStatus().intValue());
			chat.setFilePath(Globals.APP_BASE_DIR + "/WEB-INF/chat-history");
			Thread t = new Thread(chat);
			t.start();
			form.addResult("msg", "已经成功启动会议室！");
		}
		return super.doQuery(form, module, this.getCurrentUser(form));
	}

	public Page doShow(WebForm form, Module module) {
		DbPageList pList = new DbPageList(ChatRoom.class,
				"1=1 order by inputTime", null);
		pList.doList(-1, -1);
		form.addResult("list", pList.getResult());
		return module.findPage("show");
	}

	// 显示会议历史记录
	public Page doListHistory(WebForm form, Module module) {
		String cid = CommUtil.null2String(form.get("cid"));
		int currentPage = CommUtil.null2Int(form.get("page"));
		int pageSize = CommUtil.null2Int(form.get("pageSize"));
		if (currentPage < 1)
			currentPage = 1;
		if (pageSize < 1)
			pageSize = 15;
		ChatRoom obj = ChatRoom.read(cid);
		if (obj != null) {
			ChatHistory ch = new ChatHistory(obj);
			IPageList pList = new PageList(new ListQuery(ch.listHistory()));
			pList.doList(pageSize, currentPage, "", "");
			CommUtil.saveIPageList2WebForm(pList, form);
			form.addResult("pageSize", new Integer(pageSize));
		}
		return module.findPage("listHistory");
	}

	public Page doShowHistory(WebForm form, Module module) throws Exception {
		String cid = CommUtil.null2String(form.get("cid"));
		String fileName = URLDecoder.decode(URLEncoder.encode((String) form
				.get("fileName"), "ISO8859_1"), "utf-8");
		ChatRoom obj = ChatRoom.read(cid);
		if (obj != null) {
			ChatHistory ch = new ChatHistory(obj);
			form.addResult("chatMsg", ch.read(fileName));
		}
		return module.findPage("showHistory");
	}

	public Page doClose(WebForm form, Module module) {

		String cid = CommUtil.null2String(form.get("cid"));
		ChatService.close(cid);
		return super.doQuery(form, module, this.getCurrentUser(form));
	}

	public IPageList doQuery(WebForm form, int currentPage, int pageSize) {
		// ActiveUser u=(ActiveUser)this.getCurrentUser(form);
		String scope = "1=1";
		Collection paras = new ArrayList();
		String orderType = CommUtil.null2String(form.get("orderType"));
		String orderField = CommUtil.null2String(form.get("orderField"));
		if (orderField.equals("")) {
			orderField = "inputTime";
			orderType = "desc";
		}
		if (!orderField.equals("")) {
			scope += " order by " + orderField;
			if (!orderType.equals(""))
				scope += " " + orderType;
		}
		DbPageList pList = new DbPageList(ChatRoom.class, scope, paras);
		pList.doList(currentPage, pageSize);
		return pList;
	}

	public void doInit(WebForm form, Module module) {
		// TODO Auto-generated method stub
	}

/**
 * 这里返回管理员帐号，根据实现的应用中修改
 */
	public IActiveUser getCurrentUser(WebForm form) {
		ChatUser user=new ChatUser();
		user.setUserName("admin");
		return user;
		//return (IActiveUser) ActionContext.getContext().getSession()
		//		.getAttribute("sysuser");
	}

	public Object doBefore(WebForm form, Module module) {
		if ("save".equals(this.getCommand())
				|| "update".equals(this.getCommand())
				|| "del".equals(this.getCommand())) {
			if (getCurrentUser(form) == null)
				return new Page("popedomError", "/bbs/norights.htm", "page");
		}
		return null;
	}

	public void doAfter(WebForm form, Module module) {
		// TODO Auto-generated method stub

	}

	public Object form2Obj(WebForm form) {// doAdd,Edit,Del
		String cid = CommUtil.null2String(form.get("cid"));
		ChatRoom obj = null;
		if (cid.equals("")) {
			obj = (ChatRoom) form.toPo(ChatRoom.class);
			obj.setInputTime(new Date());
			obj.setStatus(new Integer(-1));
		} else {
			obj = ChatRoom.read(cid);
			form.toPo(obj);
		}
		return obj;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
