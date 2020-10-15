package com.example.kosakai.happygoat;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

public class ScanFragment extends Fragment {
    private ImageView scan_hotel;
    private ImageView scan_hotel1;
    private ImageView scan_photo;
    private ImageView scan_tourism;
    public static ScanFragment newInstance(String param1) {
        ScanFragment fragment = new ScanFragment();
        Bundle args = new Bundle();
        args.putString("agrs1", param1);
        fragment.setArguments(args);
        return fragment;
    }

    public ScanFragment() {

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.scan_fragment, container, false);
        scan_hotel = (ImageView)view.findViewById(R.id.scan_hotel);
        scan_hotel1 = (ImageView)view.findViewById(R.id.scan_hotel1);
        scan_photo = (ImageView)view.findViewById(R.id.scan_photo);
        scan_tourism = (ImageView)view.findViewById(R.id.scan_tourism);
        scan_tourism.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),TourismListActivity.class);
                startActivity(intent);
            }
        });
        scan_hotel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),HotelListActivity.class);
                startActivity(intent);
            }
        });
        scan_hotel1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),HotelListActivity.class);
                startActivity(intent);
            }
        });
        scan_photo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),PhotoListActivity.class);
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