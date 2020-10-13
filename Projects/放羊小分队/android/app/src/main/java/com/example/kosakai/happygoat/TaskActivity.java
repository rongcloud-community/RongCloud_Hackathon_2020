package com.example.kosakai.happygoat;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class TaskActivity extends AppCompatActivity {
    private ImageView task_back;
    private LinearLayout task_l1;
    private LinearLayout task_l2;
    private ImageView task_i1;
    private ImageView task_i2;
    private TextView task_text;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.task_layout);
        task_back = (ImageView)findViewById(R.id.task_back);
        task_i1 = (ImageView)findViewById(R.id.task_i1);
        task_i2 = (ImageView)findViewById(R.id.task_i2);
        task_l1 = (LinearLayout)findViewById(R.id.task_l1);
        task_l2 = (LinearLayout)findViewById(R.id.task_l2);
        task_text = (TextView)findViewById(R.id.task_text);
        task_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        task_l1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                task_i1.setImageResource(R.drawable.task_dui);
                task_text.setText("已完成1/35");
            }
        });
        task_l2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                task_i2.setImageResource(R.drawable.task_dui);
                task_text.setText("已完成2/35");
            }
        });



    }


}
