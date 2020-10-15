package com.example.kosakai.happygoat;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

public class PhotoListActivity extends AppCompatActivity {
    private ImageView photo_list_back;
    private LinearLayout photolist_photo1;
    private LinearLayout photolist_photo2;
    private LinearLayout photolist_photo3;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.photo_list_layout);
        photo_list_back = (ImageView)findViewById(R.id.photo_list_back);
        photolist_photo1 = (LinearLayout)findViewById(R.id.photolist_photo1);
        photolist_photo2 = (LinearLayout)findViewById(R.id.photolist_photo2);
        photolist_photo3 = (LinearLayout)findViewById(R.id.photolist_photo3);
        photo_list_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        photolist_photo1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PhotoListActivity.this,PhotoActivity.class);
                startActivity(intent);
            }
        });


    }
}
