package com.easyjf.chat.business;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.easyjf.web.Globals;

/**
 * 会议历史记录
 * @author 大峡
 *
 */
public class ChatHistory {
	private ChatRoom room;

	public ChatHistory() {

	}

	public ChatHistory(ChatRoom room) {
		this.room = room;
	}

	public List listHistory() {
		String fileDir = Globals.APP_BASE_DIR + "/WEB-INF/chat-history";
		File f = new File(fileDir);
		File[] files = f.listFiles(new ChatHistoryFile(room.getTitle()));
		List ret = new ArrayList();
		if (files != null) {
			for (int i = 0; i < files.length; i++) {
				Map map = new HashMap();
				map.put("title", files[i].getName());
				map.put("vdate", new Date(files[i].lastModified()));
				map.put("size", new Long(files[i].length()));
				ret.add(map);
			}

		}
		return ret;
	}

	public String read(String fileName) {
		StringBuffer ret = new StringBuffer();
		System.out.println(fileName);
		String fileDir = Globals.APP_BASE_DIR + "/WEB-INF/chat-history";
		File f = new File(fileDir);
		File[] files = f.listFiles(new ChatHistoryFile(fileName));
		if (files != null && files.length>0) {
			try {
				BufferedReader br = new BufferedReader(new InputStreamReader(
						new FileInputStream(files[0]), "utf-8"));
				String line;
				while ((line = br.readLine()) != null) {				
					ret.append(line + "\r\n");
				}
				br.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return ret.toString();
	}

	private class ChatHistoryFile implements FileFilter {
		private String roomName;

		public ChatHistoryFile(String name) {
			this.roomName = name;
		}

		public boolean accept(File pathname) {
			return pathname.getName().indexOf(roomName) == 0;
		}
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
