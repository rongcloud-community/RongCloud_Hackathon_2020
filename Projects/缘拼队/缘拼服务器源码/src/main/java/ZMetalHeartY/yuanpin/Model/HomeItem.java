package ZMetalHeartY.yuanpin.Model;

public class HomeItem {
	private String title = null;
	private String address = null;
	private String date = null;
	private String time = null;
	private String sex = null;
	private String dowhat = null;
	private String details = null;
	private String img = null;
	private String type = null;
	private String userid = null;
	private String pstart = null;
	private String pend = null;

	
	public HomeItem(String title, String address,String date,String time,String sex,String dowhat,String details,String img,String type,String userid) {
		this.title = title;
		this.address = address;
		this.date = date;
		this.time = time;
		this.sex = sex;
		this.dowhat = dowhat;
		this.details = details;
		this.img = img;
		this.type = type;
		this.userid = userid;
	}
	
	public HomeItem(String title,String pstart,String pend,String date,String time,String sex,String dowhat,String details,String img,String type,String userid) {
		this.title = title;
		this.pstart = pstart;
		this.pend = pend;
		this.date = date;
		this.time = time;
		this.sex = sex;
		this.dowhat = dowhat;
		this.details = details;
		this.img = img;
		this.type = type;
		this.userid = userid;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getDowhat() {
		return dowhat;
	}
	public void setDowhat(String dowhat) {
		this.dowhat = dowhat;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}


	public String getPstart() {
		return pstart;
	}

	public void setPstart(String pstart) {
		this.pstart = pstart;
	}

	public String getPend() {
		return pend;
	}

	public void setPend(String pend) {
		this.pend = pend;
	}
}
