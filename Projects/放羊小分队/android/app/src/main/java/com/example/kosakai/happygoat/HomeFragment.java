package com.example.kosakai.happygoat;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RadioGroup;

import com.bumptech.glide.Glide;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class HomeFragment extends Fragment {
    private boolean begin;
    private ViewPager viewPager;
    private RadioGroup group;
    private ImageView home_budget;
    private ImageView home_goodday;
    private LinearLayout home_hotel;
    private LinearLayout home_photo;
    private LinearLayout home_hotel1;
    private LinearLayout home_photo1;
    private LinearLayout home_cehua;
    private LinearLayout home_tourism;
    //图片资源
    private int[] imageIds = {R.drawable.home_event1,R.drawable.home_event5,R.drawable.home_event1,R.drawable.home_event5};
    //存放图片的数组
    private List<ImageView> mList;
    //当前索引位置以及上一个索引位置
    private int index = 0,preIndex = 0;
    //是否需要轮播标志
    private boolean isContinue = true;
    //定时器，用于实现轮播
    private Timer timer;
    private Handler mHandler;



    public static HomeFragment newInstance(String param1) {
        HomeFragment fragment = new HomeFragment();
        Bundle args = new Bundle();
        args.putString("agrs1", param1);
        fragment.setArguments(args);
        return fragment;
    }

    public HomeFragment() {

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.home_fragment, container, false);
        home_budget = (ImageView)view.findViewById(R.id.home_budget);
        home_goodday = (ImageView)view.findViewById(R.id.home_goodday);
        home_hotel = (LinearLayout)view.findViewById(R.id.home_hotel);
        home_photo = (LinearLayout)view.findViewById(R.id.home_photo);
        home_hotel1 = (LinearLayout)view.findViewById(R.id.home_hotel1);
        home_photo1 = (LinearLayout)view.findViewById(R.id.home_photo1);
        home_cehua = (LinearLayout)view.findViewById(R.id.home_ceha);
        home_tourism = (LinearLayout)view.findViewById(R.id.home_tourism);
        home_tourism.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),TourismListActivity.class);
                startActivity(intent);
            }
        });
        home_cehua.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),PlanListActivity.class);
                startActivity(intent);
            }
        });
        home_budget.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),BudgetActivity.class);
                startActivity(intent);
            }
        });
        home_goodday.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),GooddayActivity.class);
                startActivity(intent);
            }
        });
        home_hotel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),HotelListActivity.class);
                startActivity(intent);
            }
        });
        home_photo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),PhotoListActivity.class);
                startActivity(intent);
            }
        });
        home_hotel1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),HotelListActivity.class);
                startActivity(intent);
            }
        });
        home_photo1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),PhotoListActivity.class);
                startActivity(intent);
            }
        });
       // Bundle bundle = getArguments();
       // String agrs1 = bundle.getString("agrs1");
       // TextView tv = (TextView)view.findViewById(R.id.container);
       // tv.setText(agrs1);
        viewPager = (ViewPager)view.findViewById(R.id.viewpager);
        group = (RadioGroup)view.findViewById(R.id.group);
        mList = new ArrayList<>();
        index = 0;
        preIndex = 0;
        viewPager.setAdapter(pagerAdapter);
        viewPager.addOnPageChangeListener(onPageChangeListener);
        viewPager.setOnTouchListener(onTouchListener);
        initRadioButton(imageIds.length);
        if (!begin){
            mHandler  = new Handler(){
                @Override
                public void handleMessage(Message msg) {
                    super.handleMessage(msg);
                    switch (msg.what){
                        case 1:
                            index++;
                            viewPager.setCurrentItem(index);
                    }
                }
            };
            timer = new Timer();//创建Timer对象
            //执行定时任务
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    //首先判断是否需要轮播，是的话我们才发消息
                    if (isContinue) {
                        mHandler.sendEmptyMessage(1);
                    }
                }
            },2000,2000);//延迟2秒，每隔2秒发一次消息
            begin = true;
        }
        return view;
    }


    //轮播图
    PagerAdapter pagerAdapter = new PagerAdapter() {
        @Override
        public int getCount() {
            //返回一个比较大的值，目的是为了实现无限轮播
            return Integer.MAX_VALUE;
        }

        @Override
        public boolean isViewFromObject(View view, Object object) {
            return view==object;
        }

        @Override
        public Object instantiateItem(ViewGroup container, int position) {
            position = position%imageIds.length;
            ImageView imageView = new ImageView(getActivity());
            Glide.with(getActivity()).load(imageIds[position]).placeholder(R.drawable.home_event1).into(imageView);
            //imageView.setImageResource(imageIds[position]);
            imageView.setScaleType(ImageView.ScaleType.FIT_XY);
            container.addView(imageView);
            mList.add(imageView);
            return imageView;
        }
        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            container.removeView(mList.get(position%3));
        }
    };

    /**
     * 根据当前触摸事件判断是否要轮播
     */
    View.OnTouchListener onTouchListener  = new View.OnTouchListener() {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            switch (event.getAction()){
                //手指按下和划动的时候停止图片的轮播
                case MotionEvent.ACTION_DOWN:
                case MotionEvent.ACTION_MOVE:
                    isContinue = false;
                    break;
                default:
                    isContinue = true;
            }
            return false;
        }
    };

    /**
     * 根据图片个数初始化按钮
     * @param length
     */
    private void initRadioButton(int length) {
        for(int i = 0;i<length;i++){
            ImageView imageview = new ImageView(getActivity());
            imageview.setImageResource(R.drawable.rg_selector);//设置背景选择器
            imageview.setPadding(20,0,0,0);//设置每个按钮之间的间距
            //将按钮依次添加到RadioGroup中
            group.addView(imageview, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            //默认选中第一个按钮，因为默认显示第一张图片
            group.getChildAt(0).setEnabled(false);
        }
    }

    /**
     *根据当前选中的页面设置按钮的选中
     */
    ViewPager.OnPageChangeListener onPageChangeListener = new ViewPager.OnPageChangeListener() {
        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
        }
        @Override
        public void onPageSelected(int position) {
            index = position;//当前位置赋值给索引
            setCurrentDot(index%imageIds.length);
        }
        @Override
        public void onPageScrollStateChanged(int state) {

        }
    };

    /**
     * 设置对应位置按钮的状态
     * @param i 当前位置
     */
    private void setCurrentDot(int i) {
        if(group.getChildAt(i)!=null){
            group.getChildAt(i).setEnabled(false);//当前按钮选中
        }
        if(group.getChildAt(preIndex)!=null){
            group.getChildAt(preIndex).setEnabled(true);//上一个取消选中
            preIndex = i;//当前位置变为上一个，继续下次轮播
        }
    }
}