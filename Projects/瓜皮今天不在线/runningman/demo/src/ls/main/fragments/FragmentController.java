package ls.main.fragments;

import android.app.Application;
import android.net.Uri;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;

import com.netease.nim.demo.NimApplication;

import java.util.ArrayList;

import io.rong.imkit.fragment.ConversationListFragment;
import io.rong.imlib.model.Conversation;


public class FragmentController {

	private int containerId;
	private FragmentManager fm;
	private ArrayList<Fragment> fragments;
	
	private static FragmentController controller;

	public static FragmentController getInstance(FragmentActivity activity, int containerId) {
		if (controller == null) {
			controller = new FragmentController(activity, containerId);
		}
		return controller;
	}

	private FragmentController(FragmentActivity activity, int containerId) {
		this.containerId = containerId;
		fm = activity.getSupportFragmentManager();
		initFragment();
	}

	private void initFragment() {
		fragments = new ArrayList<Fragment>();
		fragments.add(new HomeFragment());
		ConversationListFragment conversationListFragment=new ConversationListFragment();
		Uri uri = Uri.parse("rong://" +
				NimApplication.packageName).buildUpon()
				.appendPath("conversationlist")
				.appendQueryParameter(Conversation.ConversationType.PRIVATE.getName(), "false") //设置私聊会话是否聚合显示
				.appendQueryParameter(Conversation.ConversationType.GROUP.getName(), "true")//群组
				.appendQueryParameter(Conversation.ConversationType.PUBLIC_SERVICE.getName(), "true")//公共服务号
				.appendQueryParameter(Conversation.ConversationType.APP_PUBLIC_SERVICE.getName(), "true")//订阅号
				.appendQueryParameter(Conversation.ConversationType.SYSTEM.getName(), "true")//系统
				.build();

		conversationListFragment.setUri(uri);
		fragments.add(conversationListFragment);
		fragments.add(new SearchFragment());
		fragments.add(new UserFragment());
		
		FragmentTransaction ft = fm.beginTransaction();
		for(Fragment fragment : fragments) {
			ft.add(containerId, fragment);
		}
		ft.commit();
	}

	public void showFragment(int position) {
		hideFragments();
		Fragment fragment = fragments.get(position);
		FragmentTransaction ft = fm.beginTransaction();
		ft.show(fragment);
		ft.commit();
	}
	
	public void hideFragments() {
		FragmentTransaction ft = fm.beginTransaction();
		for(Fragment fragment : fragments) {
			if(fragment != null) {
				ft.hide(fragment);
			}
		}
		ft.commit();
	}
	
	public Fragment getFragment(int position) {
		return fragments.get(position);
	}
}