package run.yet.f7_android;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.util.Log;

import io.rong.imkit.RongIM;

public class App extends Application {
    private static final String TAG = "App";
    public static final String NOTIFICATION_CHANNEL_ID = "channel_reminder_2";

    private void initRongLib () {
        Log.d(TAG, "初始化 IM 连接");
        String appKey = "pvxdm17jpe4ir";
        RongIM.init(this, appKey);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initRongLib();
        createNotificationChannel();
    }

    private void createNotificationChannel() {
        Log.d(TAG, "创建 NotificationChannel");

        NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        // The id of the channel.
        String channelId = NOTIFICATION_CHANNEL_ID;

        // The user-visible name of the channel.
        CharSequence name = "Name-" + channelId;

        // The user-visible description of the channel.
        String description = "A channel";

        int importance = NotificationManager.IMPORTANCE_LOW;

        NotificationChannel mChannel = new NotificationChannel(channelId, name, importance);

        // Configure the notification channel.
        mChannel.setDescription(description);

        mChannel.enableLights(true);
        // Sets the notification light color for notifications posted to this
        // channel, if the device supports this feature.
        mChannel.setLightColor(Color.RED);

        mChannel.enableVibration(true);
        mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});

        mNotificationManager.createNotificationChannel(mChannel);
    }
}
