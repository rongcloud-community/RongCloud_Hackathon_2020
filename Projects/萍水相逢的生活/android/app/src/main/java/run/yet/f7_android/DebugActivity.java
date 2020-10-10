package run.yet.f7_android;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class DebugActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_debug);
    }

    public void goToWebView (View view) {
        Intent intent = new Intent(this, WebViewActivity.class);
        startActivity(intent);
    }

    public void goToCall (View view) {
        RongCloudUtils.call(this, "t2", "video");
    }

    public void loginToRongCloud (View view) {
        String token = "Gyveotl1sAPnq215K10yzareHULUoFIc@4qbh.cn.rongnav.com;4qbh.cn.rongcfg.com"; // uid 为 t1
        RongCloudUtils.connectToRongCloud(token);
    }
}