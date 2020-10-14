package answer.question;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ListView;

import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import answer.question.adapter.Fruit;
import answer.question.adapter.FruitAdapter;
import io.rong.imkit.RongIM;
import io.rong.imlib.RongIMClient;


/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
public class Home extends AppCompatActivity {
    /**
     * Whether or not the system UI should be auto-hidden after
     * {@link #AUTO_HIDE_DELAY_MILLIS} milliseconds.
     */
    private static final boolean AUTO_HIDE = true;

    /**
     * If {@link #AUTO_HIDE} is set, the number of milliseconds to wait after
     * user interaction before hiding the system UI.
     */
    private static final int AUTO_HIDE_DELAY_MILLIS = 3000;

    private static String APPKEY = "bmdehs6pbadis";

    // fruitList用于存储数据
    private List<Fruit> fruitList = new ArrayList<>();

    /**
     * Some older devices needs a small delay between UI widget updates
     * and a change of the status and navigation bar.
     */
    private static final int UI_ANIMATION_DELAY = 300;
    private final Handler mHideHandler = new Handler();
    private View mContentView;
    private final Runnable mHidePart2Runnable = new Runnable() {
        @SuppressLint("InlinedApi")
        @Override
        public void run() {
            // Delayed removal of status and navigation bar

            // Note that some of these constants are new as of API 16 (Jelly Bean)
            // and API 19 (KitKat). It is safe to use them, as they are inlined
            // at compile-time and do nothing on earlier devices.
            mContentView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
        }
    };
    private View mControlsView;
    private final Runnable mShowPart2Runnable = new Runnable() {
        @Override
        public void run() {
            // Delayed display of UI elements
            ActionBar actionBar = getSupportActionBar();
            if (actionBar != null) {
                actionBar.show();
            }
            mControlsView.setVisibility(View.VISIBLE);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        // 先拿到数据并放在适配器上
        initFruits(); //初始化水果数据
        FruitAdapter adapter = new FruitAdapter(Home.this, R.layout.fruit_item, fruitList);

        // 将适配器上的数据传递给listView
        ListView listView = findViewById(R.id.list_view);
        listView.setAdapter(adapter);

        RongIM.init(this, APPKEY);
        for (String userId : Token.getUserIds()) {
            boolean isOnline = checkOnline(userId);
            if (!isOnline) {
                Log.i("用户ID正在链接", userId);
                Token.setCurrent(userId);
                //  链接IM
                RongIM.connect(Token.getToken(userId), new RongIMClient.ConnectCallback() {

                    @Override
                    public void onSuccess(String s) {
                        Log.println(Log.WARN, "connect", "连接成功");
                    }

                    @Override
                    public void onError(RongIMClient.ConnectionErrorCode connectionErrorCode) {
                        Log.println(Log.WARN, "connect", "连接失败");
                    }

                    @Override
                    public void onDatabaseOpened(RongIMClient.DatabaseOpenStatus databaseOpenStatus) {

                    }
                });

                break;
            } else {
                Log.i("用户ID在线", userId);
            }
        }
    }

    private boolean checkOnline(String userId) {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        String url = "https://api2-cn.ronghub.com/user/checkOnline.json";
        HashMap<String, String> params = new HashMap<>();
        HashMap<String, String> headers = new HashMap<>();
        Random rand = new Random();
        String appSecret = "tgfZIcilRvLn";
        String nonce = String.valueOf(rand.nextInt(500) + 1000);
        String timeStamp = String.valueOf(System.currentTimeMillis());

        String signature = DigestUtils.sha1Hex(appSecret + nonce + timeStamp);
        headers.put("App-Key", APPKEY);
        headers.put("Nonce", nonce);
        headers.put("Timestamp", timeStamp);
        headers.put("Signature", signature);

        params.put("userId", userId);

        String response = post(url, params, headers);
        if (null == response) {
            return false;
        }
        try {
            JSONObject jsonObject = new JSONObject(response);
            int status = jsonObject.getInt("status");
            return status == 1;
        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }

    private String post(String urlPath, Map<String, String> params, Map<String, String> headers) {
        String result = null;
        try {
            URL url = new URL(urlPath);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setUseCaches(false);
            if (!headers.isEmpty()) {
                for (Map.Entry<String, String> header : headers.entrySet()) {
                    connection.setRequestProperty(header.getKey(), header.getValue());
                }
            }
            connection.connect();
            StringBuilder bodyBuilder = new StringBuilder();
            if (!params.isEmpty()) {
                for (Map.Entry<String, String> param : params.entrySet()) {
                    bodyBuilder.append(param.getKey()).append("=").append(param.getValue()).append("&");
                }
            }
            String body = bodyBuilder.toString().substring(0, bodyBuilder.length() - 1);

            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(), "UTF-8"));
            writer.write(body);
            writer.close();

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = connection.getInputStream();
                //将流转换为字符串。
                result = new BufferedReader(new InputStreamReader(inputStream))
                        .lines()
                        .parallel()
                        .collect(Collectors.joining(System.lineSeparator()));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    // 初始化数据
    private void initFruits() {
        int[] mipmap = {
                R.mipmap.baixiangguo,
                R.mipmap.boluo,
                R.mipmap.caomei,
                R.mipmap.chengzi,
                R.mipmap.hamigua,
                R.mipmap.hongpingguo,
                R.mipmap.hongxinyou,
                R.mipmap.huolongguo,
                R.mipmap.li,
                R.mipmap.mangguo,
                R.mipmap.mihoutao,
                R.mipmap.ningmeng,
                R.mipmap.niuyouguo,
                R.mipmap.putao,
                R.mipmap.shanzhu,
                R.mipmap.shuimitao,
                R.mipmap.xiangjiao,
                R.mipmap.xigua,
                R.mipmap.yezi,
                R.mipmap.yingtao
        };

        for (int value : mipmap) {
            Fruit fruit = new Fruit("请问一下为什么PHP是世界上最好的语言？", value);
            fruitList.add(fruit);
        }
    }
}
