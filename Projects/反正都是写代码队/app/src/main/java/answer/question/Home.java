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

import java.util.ArrayList;
import java.util.List;

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

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        // 先拿到数据并放在适配器上
        initFruits(); //初始化水果数据
        FruitAdapter adapter = new FruitAdapter(Home.this, R.layout.fruit_item, fruitList);

        // 将适配器上的数据传递给listView
        ListView listView = findViewById(R.id.list_view);
        listView.setAdapter(adapter);

        RongIM.init(this, APPKEY);
        for (String userId : Token.getUserIds()) {
            boolean isOnline = Token.checkOnline(userId);
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
