package com.aihome.component;

import com.aihome.utils.DoubleUtils;

public class ComputingUnit {

    public double BMICom(Object height,Object weight){
        Double hh = Double.parseDouble(height.toString());
        double h = (hh==null?0:hh);
        Double ww = Double.parseDouble(weight.toString());
        double w = (ww==null?0:ww);
        if(h==0){
            return 0;
        }else {
            double hw = h/100;
            double BMI = w/(hw*hw);
            return Double.parseDouble(String.format("%.1f",BMI));
        }
    }

    public static void main(String[] args) {
        ComputingUnit computingUnit = new ComputingUnit();
        System.out.println(computingUnit.BMICom(177,74));
    }

}
