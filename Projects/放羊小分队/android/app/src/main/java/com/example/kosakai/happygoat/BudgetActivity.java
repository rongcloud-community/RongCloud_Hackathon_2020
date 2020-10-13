package com.example.kosakai.happygoat;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

public class BudgetActivity extends AppCompatActivity {
    private Button btn_budget;
    private EditText budget_edit;
    private ImageView budget_back;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.budget_layout);
        btn_budget = (Button)findViewById(R.id.btn_budget);
        budget_edit = (EditText)findViewById(R.id.budget_edit);
        budget_back = (ImageView)findViewById(R.id.budget_back);

        btn_budget.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(BudgetActivity.this,Budget2Activity.class);
                String budget = budget_edit.getText().toString();
                intent.putExtra("budget",budget);
                startActivity(intent);
            }
        });

        budget_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

    }


}