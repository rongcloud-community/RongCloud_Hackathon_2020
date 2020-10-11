package com.zjuse415.rongyu.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class DateUtils {

private DateUtils(){}
	
	public static final String DATE_FROMAT = "yyyy-MM-dd";

	public static final String DATE_FROMAT_CN = "yyyy-MM-dd HH:mm:ss";

	public static final String DATE_NUMBER_CN = "yyyyMMddHHmmss";

	public static final String DATE_FROMAT_EN = "dd/MM/yyyy HH:mm:ss";
	
	public static final String DATE_FROMAT_CHINA = "yyyy年MM月dd日HH:mm";
	/**
	 * 获得格式化对象
	 * @param pattern
	 * @return
	 */
	public static DateFormat getDateFormat(String pattern) {
		return new SimpleDateFormat(pattern);
	}

	/**
	 * 获得当前时间
	 * 
	 * @return
	 */
	public static String getCurDateTime(String fromatStr) {
		DateFormat df = new SimpleDateFormat(fromatStr);
		return df.format(new Date().getTime());
	}

	/**
	 * 时间加减
	 * 
	 * @param amount
	 * @return
	 */
	public static Date dateSub(int amount) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.DATE, amount);
		return calendar.getTime();
	}

	// 按格式取系统日期
	public static String getDateWithYMD() {
		Calendar now = Calendar.getInstance();
		int month = now.get(Calendar.MONTH) + 1;
		int day = now.get(Calendar.DAY_OF_MONTH);
		int year = now.get(Calendar.YEAR);
		String date = year + "-" + month + "-" + day;
		return date;
	}

	/**
	 * 获得前天
	 * 
	 * @return
	 */
	public static String getdayBeforeYesterday() {
		Date date = new Date();// 取时间
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, -2);//
		date = calendar.getTime();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateString = formatter.format(date);
		return dateString;
	}

	/**
	 * 根据输入的日期字符串 和 提前天数 ， * 获得 指定日期提前几天的日期对象 *
	 * 
	 * @param dateString
	 *            日期对象 ，格式如1-31-1900 *
	 * @param beforeDays
	 *            倒推的天数
	 * @return 指定日期倒推指定天数后的日期对象 *
	 * @throws ParseException
	 */
	public static Date getDate(String dateString, int beforeDays)
			throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date inputDate = dateFormat.parse(dateString);
		Calendar cal = Calendar.getInstance();
		cal.setTime(inputDate);
		int inputDayOfYear = cal.get(Calendar.DAY_OF_YEAR);
		cal.set(Calendar.DAY_OF_YEAR, inputDayOfYear - beforeDays);
		return cal.getTime();
	}
	
	public static Date getDateStr(Date dateString, int beforeDays)
			throws ParseException {
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateString);
		int inputDayOfYear = cal.get(Calendar.DAY_OF_YEAR);
		cal.set(Calendar.DAY_OF_YEAR, inputDayOfYear - beforeDays);
		return cal.getTime();
	}

	/**
	 *
	 * @param dateString
	 * @return
	 * @throws ParseException
	 */
	public static List<String> getLastWeek(String dateString) throws ParseException {
		List<String> datelist = new ArrayList<>();
		for(int i=0;i<7;i++){
			Date date = DateUtils.getDate(dateString,i);
			datelist.add(DateUtils.date2String(date,DATE_FROMAT_CN));
		}
		return datelist;
	}

	/**
	 * 日期转换为字符串
	 * 
	 * @param date
	 * @return
	 */
	public static String date2String(Date date) {
		return date2String(date, "yyyy-MM-dd");
	}

	/**
	 * 日期转换为字符串
	 * 
	 * @param date
	 * @return
	 */
	public static String date2String(Date date, String fromatStr) {
		DateFormat df = new SimpleDateFormat(fromatStr);
		return df.format(date);
	}

	/**
	 * 字符串转为日期
	 * 
	 * @param dateStr
	 * @param fromatStr
	 * @return
	 * @throws ParseException
	 */
	public static Date String2Date(String dateStr, String fromatStr) {
		SimpleDateFormat sdf = new SimpleDateFormat(fromatStr);
		try {
			return sdf.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 字符串转为日期
	 * 
	 * @param dateStr
	 * @param
	 * @return
	 * @throws ParseException
	 */
	public static Date String2Date(String dateStr) {
		return String2Date(dateStr, "yyyy-MM-dd");
	}

	/**
	 * 获得当前日期
	 * 
	 * @return
	 */
	public static String getCurDate() {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return df.format(new Date());
	}
	
	/**
	 * 获取当前年
	 */
	public static String getCurYear(){
		return date2String(new Date(), "yyyy");
	}
	
	public static int getCurYear(int addYear){
		return Integer.valueOf(getCurYear()) + addYear;
	}
	
	/**
	 * 获得当前日期
	 * 
	 * @return
	 */
	public static String getCurTime() {
		DateFormat df = new SimpleDateFormat(DATE_FROMAT_CN);
		return df.format(new Date());
	}

	/**
	 * 获得当前日期
	 *
	 * @return
	 */
	public static String getCurTime2Number() {
		DateFormat df = new SimpleDateFormat(DATE_NUMBER_CN);
		return df.format(new Date());
	}
	
	/**
	 * 获得当前日期
	 * 
	 * @return
	 */
	public static String getCurDate(String fromatStr) {
		DateFormat df = new SimpleDateFormat(fromatStr);
		return df.format(new Date());
	}

	/**
	 * 格式化时间
	 * 
	 * @param dateStr
	 * @return
	 */
	public static String formatDate(String dateStr) {
		return formatDate(dateStr, DateUtils.DATE_FROMAT_CN);
	}

	/**
	 * 格式化时间
	 * 
	 * @param dateStr
	 * @return
	 */
	public static String formatDate(String dateStr, String formatStr) {
		DateFormat df = new SimpleDateFormat(formatStr);
		try {
			Date date = df.parse(dateStr);
			return date2String(date, formatStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 将日期字符串转日期类型
	 * 
	 * @param date
	 * @return
	 */
	public static Date parseDate(String date, String pattern) {
		DateFormat df = new SimpleDateFormat(pattern);
		try {
			return df.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 将日期字符串转日期类型
	 * 
	 * @param date
	 * @return
	 */
	public static Date parseDate(String date) {
		return parseDate(date, DateUtils.DATE_FROMAT);
	}
	
	public static boolean isInDate(Date nowDate, Date startDate, Date endDate){
		if(nowDate != null && startDate != null && endDate != null){
			Calendar date = Calendar.getInstance();
	        date.setTime(nowDate);

	        Calendar begin = Calendar.getInstance();
	        begin.setTime(startDate);

	        Calendar end = Calendar.getInstance();
	        end.setTime(endDate);

	        if ((date.after(begin) || date.equals(begin)) && (date.equals(end) ||date.before(end))) {
	            return true;
	        } else {
	            return false;
	        }
		}else{
			return false;
		}
	}
	
	public static boolean isInDate(Date startDate, Date endDate){
		if(startDate != null && endDate != null){

	        Calendar begin = Calendar.getInstance();
	        begin.setTime(startDate);

	        Calendar end = Calendar.getInstance();
	        end.setTime(endDate);

	        if (end.after(begin) || end.equals(begin)) {
	            return true;
	        } else {
	            return false;
	        }
		}else{
			return false;
		}
	}
	
	public static Long getSecondInDate(Date startDate, Date endDate){
		long second = endDate.getTime() - startDate.getTime();
		return second > 1000 ? second / 1000 : 0;
	}
	
	/**
	 * @description 两个时间是否在规定的范围内
	 * @param date1 
	 * @param date2
	 * @param
	 * @return
	 */
	public static boolean IsInDate(Date date1, Date date2, int second){
		long s1 = (date1.getTime() - date2.getTime()) / 1000;
		long s2 = (date2.getTime() - date1.getTime()) / 1000;
		if(s1 <= 0 && s2 <= second){
			return true;
		}else if(s2 <= 0 && s1 <=second){
			return true;
		}else{
			return false;
		}
	}
	
	public static int getWeek(Date nowDate){
		Calendar c= Calendar.getInstance();
        c.setTime(nowDate);
        return c.get(Calendar.DAY_OF_WEEK);
	}
	
	public static boolean isValidDate(String dateStr, String formatStr){
		boolean f = true;
		SimpleDateFormat dateFormat = new SimpleDateFormat(formatStr);
		try {
			dateFormat.setLenient(false);
			dateFormat.parse(dateStr);
		} catch (ParseException e) {
			f = false;
		}
		return f;
	}
	
	public static String avgDateTime(String time1, String time2, String formatStr) {
		if(StringUtils.isNotEmpty(time1) && StringUtils.isNotEmpty(time2)){
			int hh = (Integer.valueOf(time1.substring(0, time1.indexOf(":"))) + Integer.valueOf(time2.substring(0, time2.indexOf(":")))) / 2;
			int mm = (Integer.valueOf(time1.substring(time1.indexOf(":")+1)) + Integer.valueOf(time2.substring(time2.indexOf(":")+1))) / 2 ;
			return formatDate(hh+":"+mm, formatStr);
		}else if(StringUtils.isNotEmpty(time1) && StringUtils.isEmpty(time2)){
			return formatDate(time1, formatStr);
		}else if(StringUtils.isEmpty(time1) && StringUtils.isNotEmpty(time2)){
			return formatDate(time2, formatStr);
		}
		return "";
	}
	
	public static int getIntervalDays(Date startDate, Date endDate) {
		Calendar aCalendar = Calendar.getInstance();
		aCalendar.setTime(startDate);
		int day1 = aCalendar.get(Calendar.DAY_OF_YEAR);
		aCalendar.setTime(endDate);
		int day2 = aCalendar.get(Calendar.DAY_OF_YEAR);
		return day2 - day1;
	}

//	public static void main(String[] args) {
//		System.out.println(DateUtils.getCurTime());
//		try {
//			System.out.println(DateUtils.getLastWeek("2020-03-01 22:11:22"));
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//	}
}
