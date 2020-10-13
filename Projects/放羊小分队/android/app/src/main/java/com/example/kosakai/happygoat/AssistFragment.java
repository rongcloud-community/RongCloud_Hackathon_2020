package com.example.kosakai.happygoat;
import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class AssistFragment extends Fragment {
    private RelativeLayout budget_layout;
    private RelativeLayout goodday_layout;
    public static AssistFragment newInstance(String param1) {
        AssistFragment fragment = new AssistFragment();
        Bundle args = new Bundle();
        args.putString("agrs1", param1);
        fragment.setArguments(args);
        return fragment;
    }

    public AssistFragment() {

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.assist_fragment, container, false);
        budget_layout = (RelativeLayout)view.findViewById(R.id.budget_layout);
        budget_layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),BudgetActivity.class);
                startActivity(intent);
            }
        });
        goodday_layout = (RelativeLayout)view.findViewById(R.id.goodday_layout);
        goodday_layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),GooddayActivity.class);
                startActivity(intent);
            }
        });
     //   Bundle bundle = getArguments();
     //   String agrs1 = bundle.getString("agrs1");
     //   TextView tv = (TextView) view.findViewById(R.id.container);
     //   tv.setText(agrs1);
        return view;
    }
}