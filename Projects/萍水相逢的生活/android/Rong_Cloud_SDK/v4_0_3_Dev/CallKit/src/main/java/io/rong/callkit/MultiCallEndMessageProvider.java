package io.rong.callkit;

import android.content.Context;
import android.text.Spannable;
import android.text.SpannableString;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import io.rong.calllib.RongCallCommon;
import io.rong.calllib.message.MultiCallEndMessage;
import io.rong.imkit.model.ProviderTag;
import io.rong.imkit.model.UIMessage;
import io.rong.imkit.widget.provider.IContainerItemProvider;
import io.rong.imlib.RongIMClient;

@ProviderTag(
        messageContent = MultiCallEndMessage.class,
        showPortrait = false,
        showProgress = false,
        showWarning = false,
        centerInHorizontal = true,
        showSummaryWithName = false)
public class MultiCallEndMessageProvider
        extends IContainerItemProvider.MessageProvider<MultiCallEndMessage> {

    protected static class ViewHolder {
        TextView textView;
    }

    @Override
    public View newView(Context context, ViewGroup group) {
        View v = LayoutInflater.from(context).inflate(R.layout.rc_voip_msg_multi_call_end, null);
        ViewHolder holder = new ViewHolder();
        holder.textView = v.findViewById(R.id.rc_msg);
        v.setTag(holder);
        return v;
    }

    @Override
    public void bindView(View v, int position, MultiCallEndMessage content, UIMessage message) {
        Context context = v.getContext();
        String msg = "";
        if (content.getReason()
                == RongCallCommon.CallDisconnectedReason.OTHER_DEVICE_HAD_ACCEPTED) {
            msg = context.getResources().getString(R.string.rc_voip_call_other);
        } else if (content.getReason() == RongCallCommon.CallDisconnectedReason.REMOTE_HANGUP
                || content.getReason() == RongCallCommon.CallDisconnectedReason.HANGUP) {
            if (content.getMediaType() == RongIMClient.MediaType.AUDIO) {
                msg = context.getResources().getString(R.string.rc_voip_audio_ended);
            } else if (content.getMediaType() == RongIMClient.MediaType.VIDEO) {
                msg = context.getResources().getString(R.string.rc_voip_video_ended);
            }
        } else if (content.getReason() == RongCallCommon.CallDisconnectedReason.REMOTE_REJECT
                || content.getReason() == RongCallCommon.CallDisconnectedReason.REJECT) {
            if (content.getMediaType() == RongIMClient.MediaType.AUDIO) {
                msg = context.getResources().getString(R.string.rc_voip_audio_refuse);
            } else if (content.getMediaType() == RongIMClient.MediaType.VIDEO) {
                msg = context.getResources().getString(R.string.rc_voip_video_refuse);
            }
        } else if (content.getReason() == RongCallCommon.CallDisconnectedReason.SERVICE_NOT_OPENED
            || content.getReason() == RongCallCommon.CallDisconnectedReason.REMOTE_ENGINE_UNSUPPORTED) {
            msg = context.getResources().getString(R.string.rc_voip_engine_notfound);
        } else {
            if (content.getMediaType() == RongIMClient.MediaType.AUDIO) {
                msg = context.getResources().getString(R.string.rc_voip_audio_no_response);
            } else if (content.getMediaType() == RongIMClient.MediaType.VIDEO) {
                msg = context.getResources().getString(R.string.rc_voip_video_no_response);
            }
        }
        ViewHolder holder = (ViewHolder) v.getTag();
        holder.textView.setText(msg);
    }

    @Override
    public Spannable getContentSummary(Context context, MultiCallEndMessage message) {
        String msg = "";

        if (message.getReason() == RongCallCommon.CallDisconnectedReason.NO_RESPONSE) {
            if (message.getMediaType() == RongIMClient.MediaType.AUDIO) {
                msg = context.getResources().getString(R.string.rc_voip_audio_no_response);
            } else if (message.getMediaType() == RongIMClient.MediaType.VIDEO) {
                msg = context.getResources().getString(R.string.rc_voip_video_no_response);
            }
        } else {
            if (message.getMediaType() == RongIMClient.MediaType.AUDIO) {
                msg = context.getResources().getString(R.string.rc_voip_message_audio);
            } else if (message.getMediaType() == RongIMClient.MediaType.VIDEO) {
                msg = context.getResources().getString(R.string.rc_voip_message_video);
            }
        }
        return new SpannableString(msg);
    }

    @Override
    public Spannable getContentSummary(MultiCallEndMessage data) {
        return null;
    }

    @Override
    public void onItemClick(
            View view, int position, MultiCallEndMessage content, UIMessage message) {}

    @Override
    public void onItemLongClick(
            View view, int position, MultiCallEndMessage content, UIMessage message) {}
}
