package com.example.kosakai.happygoat;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

public class TourismListActivity extends AppCompatActivity {
    private LinearLayout tourismlist_tourism1;
    private ImageView tourism_list_back;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tourism_list_layout);
        tourism_list_back = (ImageView)findViewById(R.id.tourism_list_back);
        tourismlist_tourism1 = (LinearLayout)findViewById(R.id.tourismlist_tourism1);
        tourismlist_tourism1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TourismListActivity.this,TourismActivity.class);
                startActivity(intent);
            }
        });
        tourism_list_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }
}
