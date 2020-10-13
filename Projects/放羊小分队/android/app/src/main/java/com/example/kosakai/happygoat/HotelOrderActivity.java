package com.example.kosakai.happygoat;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;

public class HotelOrderActivity extends AppCompatActivity {
    private ImageView hotel_order_back;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.hotel_order_layout);
        hotel_order_back = (ImageView)findViewById(R.id.hotel_order_back);
        hotel_order_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }
}
