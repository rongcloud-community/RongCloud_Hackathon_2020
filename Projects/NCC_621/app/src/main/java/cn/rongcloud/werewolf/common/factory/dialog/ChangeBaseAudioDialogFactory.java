package cn.rongcloud.werewolf.common.factory.dialog;

import cn.rongcloud.werewolf.R;
import cn.rongcloud.werewolf.SealMicApp;
import cn.rongcloud.werewolf.common.factory.dialog.base.BaseAudioDialogFactory;

/**
 * 变声dialog工厂
 */
public class ChangeBaseAudioDialogFactory extends BaseAudioDialogFactory {
    @Override
    public String getTitle() {
        return SealMicApp.getApplication().getString(R.string.change_audio);
    }

    @Override
    public String[] getContents() {
        return SealMicApp.getApplication().getResources().getStringArray(R.array.dialog_change_audio);
    }
}
