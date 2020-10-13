package com.aihome.utils;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.NumberFormat;
import java.util.List;
import java.util.UUID;

/**
 * 字符串工具类
 * @author lijie
 * @date 2018年6月21日
 */
public class StringUtils {
	
	private static final String hexString = "0123456789ABCDEF";
	
	private StringUtils(){}
	
	
	/**
	 * @description 字符串不为空或空串
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(Object obj) {
		return !isEmpty(obj);
	}

	/**     
	 * @description 给定字符串是否为空或空串
	 * @param str
	 * @return     
	 */
	public static boolean isEmpty(Object obj) {
		return (obj == null || obj.equals(""));
	}
	
	/**
	 * @description 转字符串
	 * @param obj
	 * @return
	 */
	public static String objToStr(Object obj){
		if(isEmpty(obj)){
			return "";
		}
		return obj.toString();
	}
	
	/**
	 * 16进制转换成字符串
	 * @param bytes
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String para16ToStr(String bytes) throws UnsupportedEncodingException {
    	bytes = bytes.replaceAll("%", "");
    	ByteArrayOutputStream baos = new ByteArrayOutputStream(bytes.length() / 2);
        // 将每2位16进制整数组装成一个字节
        for (int i = 0; i < bytes.length(); i += 2)
        baos.write((hexString.indexOf(bytes.charAt(i)) << 4 | hexString
                        .indexOf(bytes.charAt(i + 1))));
        return new String(baos.toByteArray());
	}
	
	/**
	 * 字符串转换成16进制
	 * @description
	 * @param str
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String paraTo16(String str) throws UnsupportedEncodingException {
		String hs = "";
		
		byte[] byStr = str.getBytes("UTF-8");
		for(int i=0;i<byStr.length;i++)
		{
			String temp = "";
			temp = (Integer.toHexString(byStr[i]&0xFF));
			if(temp.length()==1) temp = "%0"+temp;
			else temp = "%"+temp;
			hs = hs+temp;
		}
		return hs.toUpperCase();
	}
    
    /**
     * 字符转换
     * @description
     * @param method
     * @param str
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String paraToStr(String method, String str) throws UnsupportedEncodingException{
    	if("GET".equalsIgnoreCase(method) && StringUtils.isNotEmpty(str)){
			str = URLDecoder.decode(URLEncoder.encode(str, "ISO-8859-1"), "UTF-8");
    	}
    	return str;
    }
    
    public static String uuid(int subIndex){
    	String uuidStr = UUID.randomUUID().toString().replaceAll("-", "");
    	if(subIndex > 0){
    		uuidStr = uuidStr.substring(0, subIndex);
    	}
    	return uuidStr;
    }
    
    public static String filterPercent2String(String percent){
    	if(isNotEmpty(percent)){
    		return percent.replaceAll("%", "");
    	}
    	return "0";
    }
    
    public static float filterPercent2Number(String percent){
    	return Float.valueOf(filterPercent2String(percent));
    }
    
    public static <T> boolean isNotEmpty(List<T> list){
    	if(list != null && list.size() > 0){
    		return true;
    	}
    	return false;
    }
    
    public static <T> boolean isEmpty(List<T> list){
    	return !isNotEmpty(list);
    }
    
    public static NumberFormat getPercentInstance(int newValue){
    	//设置百分比格式
		NumberFormat nt = NumberFormat.getPercentInstance();
		//需要保留几位小数点
		nt.setMinimumFractionDigits(newValue);
		return nt;
    }
    
    public static Long String2Long(String str){
    	if(isNotEmpty(str)){
    		try {
    			return Long.valueOf(str);
			} catch (Exception e) {
				return null;
			}
    	}
    	return null;
    }
    
    public static BigDecimal String2BigDecimal(String str) {
    	if(isNotEmpty(str)){
    		try {
    			return new BigDecimal(str);
			} catch (Exception e) {
				return null;
			}
    	}
    	return null;
    }
    
    public static int String2Int(String str, int defaultInt){
    	if(isNotEmpty(str)){
    		try {
    			return Integer.valueOf(str);
			} catch (Exception e) {
				return 0;
			}
    	}
    	return defaultInt;
    }
    
    public static int String2Int(String str){
    	if(isNotEmpty(str)){
    		try {
    			return Integer.valueOf(str);
			} catch (Exception e) {
				return 0;
			}
    	}
    	return 0;
    }
    
    public static BigDecimal object2BigDecimal(Object obj) {
    	if(isNotEmpty(obj)){
    		try {
    			return new BigDecimal(objToStr(obj));
			} catch (Exception e) {
				return new BigDecimal("0");
			}
    	}
    	return new BigDecimal("0");
    }
    
    public static BigDecimal filterBigDecimal(BigDecimal bigDecimal) {
    	if(bigDecimal == null) {
    		return new BigDecimal("0");
    	}
    	return bigDecimal;
    }
}
