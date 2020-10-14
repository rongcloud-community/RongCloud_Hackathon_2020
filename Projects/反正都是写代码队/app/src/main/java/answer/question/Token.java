package answer.question;

import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

public class Token {
    private static HashMap<String, String> tokens = new HashMap<>();
    private static String current = null;
    private static String APPKEY = "bmdehs6pbadis";

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

    public static boolean checkOnline(String userId) {
        String url = "https://api2-cn.ronghub.com/user/checkOnline.json";
        HashMap<String, String> params = new HashMap<>();
        HashMap<String, String> headers = new HashMap<>();
        Random rand = new Random();
        String appSecret = "tgfZIcilRvLn";
        String nonce = String.valueOf(rand.nextInt(500) + 1000);
        String timeStamp = String.valueOf(System.currentTimeMillis());

        String signature = DigestUtils.sha1Hex(appSecret + nonce + timeStamp);
        headers.put("App-Key", APPKEY);
        headers.put("Nonce", nonce);
        headers.put("Timestamp", timeStamp);
        headers.put("Signature", signature);

        params.put("userId", userId);

        String response = post(url, params, headers);
        if (null == response) {
            return false;
        }
        try {
            JSONObject jsonObject = new JSONObject(response);
            int status = jsonObject.getInt("status");
            return status == 1;
        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static String post(String urlPath, Map<String, String> params, Map<String, String> headers) {
        String result = null;
        try {
            URL url = new URL(urlPath);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setUseCaches(false);
            if (!headers.isEmpty()) {
                for (Map.Entry<String, String> header : headers.entrySet()) {
                    connection.setRequestProperty(header.getKey(), header.getValue());
                }
            }
            connection.connect();
            StringBuilder bodyBuilder = new StringBuilder();
            if (!params.isEmpty()) {
                for (Map.Entry<String, String> param : params.entrySet()) {
                    bodyBuilder.append(param.getKey()).append("=").append(param.getValue()).append("&");
                }
            }
            String body = bodyBuilder.toString().substring(0, bodyBuilder.length() - 1);

            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(), "UTF-8"));
            writer.write(body);
            writer.close();

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = connection.getInputStream();
                //将流转换为字符串。
                result = new BufferedReader(new InputStreamReader(inputStream))
                        .lines()
                        .parallel()
                        .collect(Collectors.joining(System.lineSeparator()));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
