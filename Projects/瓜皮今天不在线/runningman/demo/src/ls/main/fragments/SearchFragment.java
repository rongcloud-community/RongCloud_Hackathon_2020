package ls.main.fragments;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.handmark.pulltorefresh.library.ILoadingLayout;
import com.handmark.pulltorefresh.library.PullToRefreshBase;
import com.handmark.pulltorefresh.library.PullToRefreshListView;
import com.netease.nim.demo.R;
import com.zl.reik.dilatingdotsprogressbar.DilatingDotsProgressBar;

import java.util.ArrayList;
import java.util.List;

import ls.main.adapter.InfoListAdapter;
import ls.main.base.BaseFragment;
import ls.main.bean.InfolistItem;
import ls.main.utils.TitleBuilder;
import ls.main.utils.ToastUtils;


public class SearchFragment extends BaseFragment {

	private View view;
	@Override
	public View onCreateView(final LayoutInflater inflater, ViewGroup container,
							 Bundle savedInstanceState) {
		view = View.inflate(activity, R.layout.frag_search, null);
		new TitleBuilder(view).setTitleText("附近的人");
		return view;
	}
}
