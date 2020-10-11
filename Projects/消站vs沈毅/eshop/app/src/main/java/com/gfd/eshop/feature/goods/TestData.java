package com.gfd.eshop.feature.goods;




import com.gfd.eshop.R;
import com.gfd.eshop.feature.goods.model.ChatModel;
import com.gfd.eshop.feature.goods.model.ItemModel;

import java.util.ArrayList;

/**
 * Created by：Administrator on 2015/12/21 16:43
 */
public class TestData {

    public static ArrayList<ItemModel> getTestAdData() {
        ArrayList<ItemModel> models = new ArrayList<>();
        ChatModel model = new ChatModel();
        model.setContent("苏克直播开播啦\n" +
                "每周周二和周四【晚上18点-21:30点】有小姐姐直播哦，直播间超多活动惊喜福利，店铺首页就可以观看的，记得准时来哦~");
        model.setIcon(R.drawable.touxiang2);
        models.add(new ItemModel(ItemModel.CHAT_A, model));
        ChatModel model2 = new ChatModel();
        model2.setContent("在吗?");
        model2.setIcon(R.drawable.touxiang);
        models.add(new ItemModel(ItemModel.CHAT_B, model2));
        return models;
    }
    public static ArrayList<ItemModel> getTestMSData() {
        ArrayList<ItemModel> models = new ArrayList<>();
        ChatModel model = new ChatModel();
        model.setContent("");
        model.setIcon(R.drawable.qiao);
        models.add(new ItemModel(ItemModel.CHAT_A, model));
        return models;
    }

}
