package cn.rongcloud.warmhart.common.factory.dialog;

import android.app.Dialog;

import androidx.fragment.app.FragmentActivity;

import cn.rongcloud.warmhart.R;
import cn.rongcloud.warmhart.SealMicApp;
import cn.rongcloud.warmhart.common.factory.dialog.base.BaseAudioDialogFactory;

/**
 * 伴音dialog 工厂
 */
public class BgBaseAudioDialogFactory extends BaseAudioDialogFactory {
    @Override
    public String getTitle() {
        return SealMicApp.getApplication().getString(R.string.bg_audio);
    }

    @Override
    public String[] getContents() {
        return SealMicApp.getApplication().getResources().getStringArray(R.array.dialog_background_audio);
    }

    @Override
    public Dialog buildDialog(FragmentActivity context) {
        return super.buildDialog(context);
    }
}
