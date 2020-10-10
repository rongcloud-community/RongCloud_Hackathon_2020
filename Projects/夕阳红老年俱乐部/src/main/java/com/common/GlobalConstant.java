package com.common;

/**
 * 统一常量类
 * @author 宋朝都
 * @date 2019年12月5日
 */
public class GlobalConstant {
	/**
	 * 默认字符编码
	 */
	public static final String ENCODE_UTF_8 = "utf-8";
	
	
	/**
	 * 应用编号
	 */
	public static final Integer APPID = 9;
	
	/**
	 * 默认显示记录数
	 */
	public final static int PAGE_SIZE = 30;
	
	/**
	 * 开始页
	 */
	public static final String PAGE_START = "start";
	
	/**
	 * 结束页
	 */
	public static final String PAGE_LIMIT = "limit";
	
	/**
	 * 成功返回码
	 */
	public static final int OK = 200;
	
	/**
	 * 错误返回码
	 */
	public static final int ERROR = 500;
	
	/**
	 * 成功返回消息
	 */
	public static final String OK_MSG = "操作成功";
	
	/**
	 * 错误返回消息
	 */
	public static final String ERROR_MSG = "操作失败";
	
	/**
	 * 权限返回消息
	 */
	public static final String ACCESSDENIED_MSG = "权限不足，请联系管理员";
	
	/**
	 * session用户
	 */
	public static final String SESSION_USER = "session_user";
	
	/**
	 * eagle管理员默认前端角色编码
	 */
	public static final int MANAGE_ROLE_CODE = 4;
	
	/**
	 * eagle老师默认前端角色编码
	 */
	public static final int TEARCHER_ROLE_CODE = 2;
	
	/**
	 * json输入
	 */
	public static final String APPLICATION_JSON = "application/json;charset=UTF-8";
	

	public static final int ORG_LEVEL_PROVINCE = 1;
	
	public static final int ORG_LEVEL_CITY = 2;
	
	public static final int ORG_LEVEL_AREA = 3;
	
	public static final int ORG_LEVEL_SCHOOL = 4;
	
	/**
	 * 导入文件返回图片的字段名
	 */
	public static final String IMG_COL_NAME = "img_col_name";
	
	/**
	 * 进度条状态
	 */
	public static final String PROCESS_FLAG = "processFlag";
	public static final String PROCESS_FLAG_F = "false";
	
	/**
	 * 状态，0初始化，1标识符
	 */
	public static final int STATUS_INIT = 0;
	public static final int STATUS_HANDLE = 1;
}
