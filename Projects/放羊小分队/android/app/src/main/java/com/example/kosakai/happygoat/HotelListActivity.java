package com.example.kosakai.happygoat;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

public class HotelListActivity extends AppCompatActivity{
    private ImageView  hotel_list_back;
    private ListView hotel_listview;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.hotel_list_layout);
        hotel_listview = (ListView)findViewById(R.id.hotel_listview);
        hotel_list_back = (ImageView)findViewById(R.id.hotel_list_back);
        hotel_listview.setAdapter(new MyAdapter());
        hotel_list_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        hotel_listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                TextView tv = view.findViewById(R.id.hotel_name1);
                TextView tv1 = view.findViewById(R.id.hotel_price1);
                ImageView iv = view.findViewById(R.id.hotel_img1);
                int hotel_img = (int)iv.getTag();

                Log.i("info",String.valueOf(hotel_img));
                String hotel_name = tv.getText().toString();
                String hotel_price = tv1.getText().toString();
                Intent intent = new Intent(HotelListActivity.this,HotelActivity.class);
                intent.putExtra("hotel_name",hotel_name);
                intent.putExtra("hotel_price",hotel_price);
                intent.putExtra("hotel_img",String.valueOf(hotel_img));
                startActivity(intent);
            }
        });
    }

    // 定义的数据
    private int[] images = { R.drawable.pic_hotel1, R.drawable.hotel_pic2, R.drawable.hotel_pic3,
            R.drawable.hotel_pic4, R.drawable.hotel_pic5, R.drawable.hotel_pic6, R.drawable.hotel_pic7,
            R.drawable.hotel_pic8, R.drawable.hotel_pic9, R.drawable.hotel_pic10, R.drawable.hotel_pic11,
            R.drawable.pic_hotel1 };
    private String[] names = { "盖亚国际酒店", "维也纳国际酒店", "红星国际酒店", "湘府国际酒店", "圣威斯酒店",
            "兴威华天大酒店", "蓝湾酒店", "麓枫酒店", "雅美酒店", "泊悦酒店", "通程盛源大酒店", "天下洞庭国际大酒店" };
    private String[] prices = {"¥2688-6988/桌","¥1599-5999/桌","¥2588-3999/桌","¥1499-5888/桌",
            "¥2000-6000/桌","¥1999-4999/桌","¥2000-4888/桌","¥2399-3799/桌","¥1799-3599/桌","¥2599-4999/桌",
            "¥2399-5888/桌","¥2199-3788/桌"};

    //自定义适配器
    class MyAdapter extends BaseAdapter {
        @Override
        public int getCount() {
            // TODO Auto-generated method stub
            return names.length;
        }
        @Override
        public Object getItem(int position) {
            // TODO Auto-generated method stub
            return names[position];
        }
        @Override
        public long getItemId(int position) {
            // TODO Auto-generated method stub
            return position;
        }
        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            // TODO Auto-generated method stub
//               System.out.println("position=" + position);
//            System.out.println(convertView);
//            System.out.println("------------------------");
            ViewHolder vh = new ViewHolder();
            //通过下面的条件判断语句，来循环利用。如果convertView = null ，表示屏幕上没有可以被重复利用的对象。
            if(convertView==null){
                //创建View
                convertView = getLayoutInflater().inflate(R.layout.hotel_item, null);
                vh.hotel_img1 = (ImageView) convertView.findViewById(R.id.hotel_img1);
                vh.hotel_name1 = (TextView) convertView.findViewById(R.id.hotel_name1);
                vh.hotel_price1 = (TextView) convertView.findViewById(R.id.hotel_price1);
                convertView.setTag(vh);
            }else{
                vh = (ViewHolder)convertView.getTag();
            }
            vh.hotel_img1.setImageResource(images[position]);
            vh.hotel_img1.setTag(images[position]);
            vh.hotel_name1.setText(names[position]);
            vh.hotel_price1.setText(prices[position]);
            return convertView;
        }

    }

    static class ViewHolder{
        ImageView hotel_img1;
        TextView hotel_name1;
        TextView hotel_price1;
    }

}
