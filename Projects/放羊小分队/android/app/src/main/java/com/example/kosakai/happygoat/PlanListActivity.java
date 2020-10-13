package com.example.kosakai.happygoat;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

public class PlanListActivity extends AppCompatActivity {
    private ImageView plan_list_back;
    private LinearLayout planlist_plan1;
    private LinearLayout planlist_plan2;
    private LinearLayout planlist_plan3;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.plan_list_layout);
        plan_list_back = (ImageView)findViewById(R.id.plan_list_back);
        planlist_plan1 = (LinearLayout)findViewById(R.id.planlist_plan1);
        planlist_plan2 = (LinearLayout)findViewById(R.id.planlist_plan2);
        planlist_plan3 = (LinearLayout)findViewById(R.id.planlist_plan3);
        plan_list_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        planlist_plan1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PlanListActivity.this,PlanActivity.class);
                startActivity(intent);
            }
        });

    }
}
