package com.example.jialichun.client.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.example.jialichun.client.R;

import io.rong.imkit.RongIM;
import io.rong.imlib.model.Conversation;

public class MessageActivity extends AppCompatActivity {
    private Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_message);
    }
    public void onClick(View v){
//        Boolean i = false;
//        switch (v.getId()) {
//            case R.id.cus:
//                intent=new Intent(MessageActivity.this,ChatActivity.class);
//                i=false;
//                intent.putExtra("data",i);
//                startActivity(intent);
//                break;
//            default:
//                break;
//        }
        Conversation.ConversationType conversationType  = Conversation.ConversationType.GROUP;
        String targetId = "6";
        String title = "13栋业主群";

        RongIM.getInstance().startConversation(MessageActivity.this , conversationType, targetId, title, null);

    }
    public void onClickBack(View v) {
        // TODO Auto-generated method stub
        this.finish();
    }
}
