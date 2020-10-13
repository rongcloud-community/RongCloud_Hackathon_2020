package com.example.kosakai.happygoat;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class MyFragment extends Fragment {
    private RelativeLayout task_rlayout;
    public static MyFragment newInstance(String param1) {
        MyFragment fragment = new MyFragment();
        Bundle args = new Bundle();
        args.putString("agrs1", param1);
        fragment.setArguments(args);
        return fragment;
    }

    public MyFragment() {

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.my_fragment, container, false);
        task_rlayout = (RelativeLayout) view.findViewById(R.id.task_rlayout);
        task_rlayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),TaskActivity.class);
                startActivity(intent);

            }
        });
      //  Bundle bundle = getArguments();
      //  String agrs1 = bundle.getString("agrs1");
      //  TextView tv = (TextView)view.findViewById(R.id.container);
      //  tv.setText(agrs1);
        return view;
    }
}