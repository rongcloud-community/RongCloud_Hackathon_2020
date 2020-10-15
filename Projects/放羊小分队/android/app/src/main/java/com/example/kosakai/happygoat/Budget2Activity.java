package com.example.kosakai.happygoat;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

public class Budget2Activity extends AppCompatActivity {
    private TextView hunyan_price;
    private TextView sheying_price;
    private TextView hunqing_price;
    private TextView hunche_price;
    private TextView miyue_price;
    private TextView lifu_price;
    private TextView shoushi_price;
    private ImageView budget2_back;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.budget2_layout);
        hunyan_price = (TextView)findViewById(R.id.hunyan_price);
        sheying_price = (TextView)findViewById(R.id.sheying_price);
        hunqing_price = (TextView)findViewById(R.id.hunqing_price);
        hunche_price = (TextView)findViewById(R.id.hunche_price);
        miyue_price = (TextView)findViewById(R.id.miyue_price);
        lifu_price = (TextView)findViewById(R.id.lifu_price);
        shoushi_price = (TextView)findViewById(R.id.shoushi_price);
        budget2_back = (ImageView) findViewById(R.id.budget2_back);

        budget2_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        Intent intent = getIntent();
        String budget = intent.getStringExtra("budget");
        int budget_num = Integer.parseInt(budget);
        hunyan_price.setText(String.valueOf(budget_num*0.5));
        sheying_price.setText(String.valueOf(budget_num*0.06));
        hunqing_price.setText(String.valueOf(budget_num*0.1));
        hunche_price.setText(String.valueOf(budget_num*0.04));
        miyue_price.setText(String.valueOf(budget_num*0.05));
        lifu_price.setText(String.valueOf(budget_num*0.05));
        shoushi_price.setText(String.valueOf(budget_num*0.2));
    }


}