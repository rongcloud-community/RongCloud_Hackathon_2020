package com.pyblind.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class ShaUtils {
    public static String getShaPass(String input) throws NoSuchAlgorithmException {
        MessageDigest mDigest = MessageDigest.getInstance("SHA1");
        byte[] pass = input.getBytes();
        byte[] result = mDigest.digest(pass);
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < result.length; i++) {
            sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }

//    public static void main(String[] args) throws NoSuchAlgorithmException {
//        String pass = "Scd15891932";
//        System.out.println(getShaPass(pass));
//    }
}
