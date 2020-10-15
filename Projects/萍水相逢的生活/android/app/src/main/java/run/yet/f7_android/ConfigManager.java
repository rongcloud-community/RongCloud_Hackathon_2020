// https://www.jianshu.com/p/3a0ccbdbfc0f

package run.yet.f7_android;

public class ConfigManager {
    private static final String TAG = "ConfigManager";

    private ConfigManager() {}

    private static class ConfigMangerHolder {
        private static final ConfigManager instance = new ConfigManager();
    }

    public static ConfigManager getInstance(){
        return  ConfigMangerHolder.instance;
    }

    public String getWebViewURL() {
        if (BuildConfig.DEBUG) {
            //测试环境地址
            return "http://10.0.2.2:8080?platform=android";
        } else {
            //正式环境地址
            return "https://yet.run:8000?platform=android";
        }
    }
}
