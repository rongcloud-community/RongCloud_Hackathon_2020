package cn.rongcloud.singtogether.common.factory.dialog.base;

import android.app.Dialog;
import android.view.Gravity;
import android.view.Window;

import androidx.fragment.app.FragmentActivity;

import cn.rongcloud.singtogether.R;

/**
 * 从中部弹出的dialog
 */
public class CenterDialogFactory implements SealMicDialogFactory {
    @Override
    public Dialog buildDialog(FragmentActivity context) {
        Dialog bottomDialog = new Dialog(context, R.style.BottomDialog);
        Window dialogWindow = bottomDialog.getWindow();
        dialogWindow.setGravity(Gravity.CENTER);
        return bottomDialog;
    }
}
