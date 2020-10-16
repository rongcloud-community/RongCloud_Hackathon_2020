package cn.rongcloud.scriptgame.bean.repo;

/**
 * 网络请求返回的公共响应体
 */
public class NetResult<R> {


    /**
     * code : 10000
     * msg : OK
     */

    private int code;
    private String msg;
    private R data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public R getData() {
        return data;
    }

    public void setData(R data) {
        this.data = data;
    }
}
