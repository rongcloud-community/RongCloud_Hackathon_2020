package com.center.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DealString {

	/** ���캯�� */
	public DealString() {
	}

	/**
	 * ��nullת��Ϊ""
	 * 
	 */
	public static String toNullString(String str) {
		if (str == null)
			str = "";
		if (str.equals("null"))
			str = "";
		str = str.trim();
		return str;
	}

	/**
	 * ת������ ת��ΪGBK
	 */
	public static String toGBK(String str)
	{
		str = DealString.toNullString(str);
		try
		{
			str = new String(str.getBytes("ISO-8859-1"), "GBK");
		} 
		catch (Exception e) 
		{
			System.err.println("DealString.toGBK():" + e.getMessage());
		}
		return str;
	}

	/**
	 * ת�Ʊ��� ת��ΪUTF8
	 * 
	 */
	public static String toUtf8String(String str) {
		str = DealString.toNullString(str);
		byte[] b = str.getBytes();
		char[] c = new char[b.length];
		for (int i = 0; i < b.length; i++) {
			c[i] = (char) (b[i] & 0x00FF);

		}
		return new String(c);
	}

	/**
	 * ȡ��ϵͳʱ��
	 * 
	 */
	public static String getDateTime() {
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = f.format(new Date());
		return time;
	}

	/**
	 * ȡ��������������֮��
	 * 
	 * @param d1
	 * @param d2
	 * @return
	 */
	public static long getDaysInterval(Date d1, Date d2) {
		return (d2.getTime() - d1.getTime()) / 86400000;
	}

	/*
	 * public static void main(String[] args) { }
	 */
}
