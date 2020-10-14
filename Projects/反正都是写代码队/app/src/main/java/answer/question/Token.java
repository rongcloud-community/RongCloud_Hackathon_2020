package answer.question;

import java.util.HashMap;

public class Token {
    private static HashMap<String, String> tokens = new HashMap<>();
    private static String current = null;

    public static String getToken(String id) {
        tokens.put("1", "mJTNOEWrw9pxlTh5IGaLrd6z3Jw48dYp@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("2", "WtK2FEYzPctxlTh5IGaLrXlPwQfUpYvh@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("3", "dLjazj19jUhxlTh5IGaLreMH4RlJdBQw@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("4", "TbL45SvFPBpxlTh5IGaLrfQlxwVZV8Ce@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("5", "lE80+fuohHJxlTh5IGaLrSlPptzd/+Cv@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("6", "GS9knG7GAJxxlTh5IGaLrfSGoON8hYjk@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("7", "O85o0kbESVdxlTh5IGaLrWBUyGEErmH4@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("8", "DAsNKKRA7CFxlTh5IGaLrfGSqVoFh6Sp@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("9", "b6CQMAtpCtpxlTh5IGaLrZiHJNXx/KLm@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("10", "UnHj8d8qrsZxvuQk5sdwnDsy9qgEqbu+@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("11", "fyrq8fO4YexxvuQk5sdwnG/d3dfuZeYI@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("12", "xJdAxrY4fg9xvuQk5sdwnHJRLGhxXXzo@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("13", "q0T9br/8wHdxvuQk5sdwnKQxkvX/gGlq@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("14", "LvuAjc0BCfpxvuQk5sdwnMsfCzeAiRBL@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("15", "8OpT2QGYt/hxvuQk5sdwnJEgURFdVSyD@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("16", "BV+dMKZKcKpxvuQk5sdwnJX9J3F29jDZ@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("17", "/M7yPA3K+JNxvuQk5sdwnBWI7fmA9p93@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("18", "//OU79pQRURxvuQk5sdwnKHU/mmPseTZ@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("19", "cpuU/Z8KYuhxvuQk5sdwnKjZD/L95zeo@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        tokens.put("20", "QKhMeXUJmipxvuQk5sdwnMU51SmixGz7@phoy.cn.rongnav.com;phoy.cn.rongcfg.com");
        return tokens.get(id);
    }

    public static String[] getUserIds() {
        String[] userIds = new String[20];
        int k = 0;
        for (int i = 1; i <= 20; i++) {
            userIds[k] = String.valueOf(i);
            k++;
        }
        return userIds;
    }

    public static void setCurrent(String userId) {
        current = userId;
    }

    public static String getCurrent() {
        return current;
    }
}
