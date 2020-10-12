package ZMetalHeartY.yuanpin.Utils;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.apache.commons.text.StringEscapeUtils;
import org.json.*;

import ZMetalHeartY.yuanpin.JDBC.Dao.UserDao;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class Pinyin4jUtil {
	public static String getFirstPinYin(String hanyu) {
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        StringBuilder firstPinyin = new StringBuilder();
        char[] hanyuArr = hanyu.trim().toCharArray();
        try {
            for (int i = 0, len = hanyuArr.length; i < len; i++) {
                if(Character.toString(hanyuArr[i]).matches("[\\u4E00-\\u9FA5]+")){
                    String[] pys = PinyinHelper.toHanyuPinyinStringArray(hanyuArr[i],format);
                    firstPinyin.append(pys[0].charAt(0));
                }else {
                    firstPinyin.append(hanyuArr[i]);
                }
            }
        } catch (BadHanyuPinyinOutputFormatCombination badHanyuPinyinOutputFormatCombination) {
            badHanyuPinyinOutputFormatCombination.printStackTrace();
        }
        return firstPinyin.toString();
    }
	
	public static char getFirstChar(String hanyu) {
		char ch = Pinyin4jUtil.getFirstPinYin(hanyu).toUpperCase().charAt(0);
		return ch;
    }
	
	public static Set<HashMap<String, Object>> pinyinGroupingByID(Set<String> IDs) throws ClassNotFoundException, SQLException {
		
		
		UserDao userDao = new UserDao();
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		Iterator<String> it = IDs.iterator();
		while (it.hasNext()) {
			String ID = it.next();
			HashMap<String, String> userinfoMap = userDao.getUserInfoByID(ID);
			String nickname = (String) userinfoMap.get("nickname");
			userinfoMap.remove("openid");
			userinfoMap.remove("sex");
			userinfoMap.put("ID", ID);
			char fch = getFirstChar(nickname);
			if (fch>='0' && fch<='9') {
				fch = '#';
			}
			if (map.containsKey(fch+"")) {
				
				HashMap<String, Object> map2 = (HashMap<String, Object>) map.get(fch+"");
				map2.put(ID, userinfoMap);
				map.put(fch+"", map2);
			
			}else {
				
				HashMap<String, Object> map2 = new HashMap<String, Object>();
				map2.put(ID, userinfoMap);
				map.put(fch+"", map2);
			}
			
		}
		
		return FrontForm(map);
    }
	
	@SuppressWarnings("unchecked")
	public static Set<HashMap<String, Object>> FrontForm(HashMap<String, Object> map) {
		Set<HashMap<String, String>> vdata = null;
		HashMap<String, Object> group = null;
		Set<HashMap<String, Object>> vfriends = new HashSet<HashMap<String,Object>>();
		HashMap<String, Object> friends = new HashMap<String, Object>();
		
		for (String key : map.keySet()) {//key = ABCD...
			HashMap<String, Object> map2 = (HashMap<String, Object>) map.get(key);
			vdata = new HashSet<HashMap<String,String>>();
			group = new HashMap<String, Object>();
			for (String str : map2.keySet()) {
				vdata.add((HashMap<String, String>) map2.get(str));
			}
			group.put("letter", key);
			group.put("data", vdata);
			vfriends.add(group);
		}
		
		return vfriends;
	}
}
