package com.article;

public class Article {
	private int article_no;
	public void setArticle_no(int article_no){
		this.article_no = article_no;
	}
	public int getArticle_no(){
		return this.article_no;
	}
	
	private String title;
	public void setTitle(String title){
		this.title = title;
	}
	public String getTitle(){
		return this.title;
	}
	
	private String  speaker;
	public void setSpeaker(String speaker){
		this.speaker = speaker;
	}
	public String getSpeaker(){
		return this.speaker;
	}
	
	private String sent_time;
	public void setSent_time(String sent_time){
		this.sent_time = sent_time;
	}
	public String getSent_time(){
		return this.sent_time;
	}
	
	private int reply_num;
	public void setReply_num(int reply_num){
		this.reply_num = reply_num;
	}
	public int getReply_num(){
		return this.reply_num;
	}
	
	private int click_num;
	public void setClick_num(int click_num){
		this.click_num = click_num;
	}
	public int getClick_num(){
		return this.click_num;
	}
	
	private String content;
	public void setContent(String content){
		this.content = content;
	}
	public String getContent(){
		return this.content;
	}
	
	private String type;
	public void setType(String type){
		this.type = type;
	}
	public String getType(){
		return this.type;
	}
}
