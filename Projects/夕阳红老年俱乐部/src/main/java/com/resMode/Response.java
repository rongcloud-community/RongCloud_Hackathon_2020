package com.resMode;

import com.common.GlobalConstant;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * 统一响应构建器
 * @author lijie
 * @date 2019年3月21日
 */
@Setter
@Getter
public class Response {
	private Integer status;
	private String msg;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private Long count;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private Object data;
	
	private Response(Integer status, String msg, Long count, Object data) {
		this.status = status;
		this.msg = msg;
		this.count = count;
		this.data = data;
	}
	
	public static ResposeJsonBuilder success(){
		return new ResposeJsonBuilder(GlobalConstant.OK, GlobalConstant.OK_MSG, null, null);
	}
	
	public static ResposeJsonBuilder success(String msg){
		return new ResposeJsonBuilder(GlobalConstant.OK, msg, null, null);
	}
	
	public static ResposeJsonBuilder failure(){
		return new ResposeJsonBuilder(GlobalConstant.ERROR, GlobalConstant.ERROR_MSG, null, null);
	}
	
	public static ResposeJsonBuilder failure(String msg){
		return new ResposeJsonBuilder(GlobalConstant.ERROR, msg, null, null);
	}


	public static class ResposeJsonBuilder{
		private Integer status;
		private String msg;
		private Long count;
		private Object data;

		private ResposeJsonBuilder(Integer status, String msg, Long count, Object data) {
			this.status = status;
			this.msg = msg;
			this.count = count;
			this.data = data;
		}

		public Response body(){
			return new Response(status, msg, count, data);
		}

		public Response body(Object data){
			return new Response(status, msg, count, data);
		}

		public Response body(Long count){
			return new Response(status, msg, count, data);
		}

		public Response body(Long count, Object data){
			return new Response(status, msg, count, data);
		}

		/**
		 * 响应页面地址
		 * @param path
		 * @return
		 */
		public String forward(String path){
			return msg + path;
		}
	}
}
