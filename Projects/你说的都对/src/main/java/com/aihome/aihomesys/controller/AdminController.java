package com.aihome.aihomesys.controller;

import com.aihome.aihomesys.service.FoodKuServices;
import com.aihome.aihomesys.service.HotelInfoServices;
import com.aihome.aihomesys.service.MealInfoServices;
import com.aihome.aihomesys.service.UserEnrollService;
import com.aihome.aihomesys.vo.FoodKu;
import com.aihome.aihomesys.vo.HotelInfo;
import com.aihome.aihomesys.vo.MealInfo;
import com.aihome.aihomesys.vo.UserEnroll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    @Autowired
    UserEnrollService userEnrollService = new UserEnrollService();
    @Autowired
    HotelInfoServices hotelInfoServices = new HotelInfoServices();
    @Autowired
    MealInfoServices mealInfoServices = new MealInfoServices();
    @Autowired
    FoodKuServices foodKuServices = new FoodKuServices();

    @RequestMapping("/getUserList")
    @ResponseBody
    public Object userRefind(@RequestBody Map<String,Object> result) {
        Map<String, Object> mapper = new HashMap<>();
        try {
            List<UserEnroll> listuser = this.userEnrollService.selectAll();
            mapper.put("code","0");
            mapper.put("msg","查询成功");
            mapper.put("count",listuser.size());
            mapper.put("data",listuser);
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","服务器出错");
        }
        return mapper;
    }

    @RequestMapping("/getMealList")
    @ResponseBody
    public Object getMealList(@RequestBody Map<String,Object> result) {
        Map<String, Object> mapper = new HashMap<>();
        try {
            List<MealInfo> listmeal = this.mealInfoServices.getMealList(result);
            if(listmeal.size()>0){
                for(int i=0;i<listmeal.size();i++){
                    int tempFatb = 0;

                    FoodKu staple = this.foodKuServices.selectById(listmeal.get(i).getStapleId());
                    listmeal.get(i).setStapleName(staple.getFoodName());
                    listmeal.get(i).setStapleCacul(staple.getFoodContent());
                    tempFatb+=staple.getFoodFatB();

                    FoodKu MEM = this.foodKuServices.selectById(listmeal.get(i).getMEMId());
                    listmeal.get(i).setMEMName(MEM.getFoodName());
                    listmeal.get(i).setMEMCacul(MEM.getFoodContent());
                    tempFatb+=MEM.getFoodFatB();

                    FoodKu VF = this.foodKuServices.selectById(listmeal.get(i).getVFId());
                    listmeal.get(i).setVFName(VF.getFoodName());
                    listmeal.get(i).setVFCacul(VF.getFoodContent());
                    tempFatb+=VF.getFoodFatB();

                    FoodKu Grease = this.foodKuServices.selectById(listmeal.get(i).getGreaseId());
                    listmeal.get(i).setGreaseName(Grease.getFoodName());
                    listmeal.get(i).setGreaseCacul(Grease.getFoodContent());
                    tempFatb+=Grease.getFoodFatB();

                    FoodKu other = this.foodKuServices.selectById(listmeal.get(i).getOtherId());
                    if(other!=null){
                        listmeal.get(i).setOtherName(other.getFoodName());
                        listmeal.get(i).setOtherCacul(other.getFoodContent());
                        tempFatb+=other.getFoodFatB();
                    }
                    listmeal.get(i).setTotalFatB(tempFatb);
                }
            }
            mapper.put("code","0");
            mapper.put("msg","查询成功");
            mapper.put("count",listmeal.size());
            mapper.put("data",listmeal);
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","服务器出错");
        }
        return mapper;
    }

    @RequestMapping("/getHotelInfo")
    @ResponseBody
    public Object getHotelInfo(@RequestBody Map<String,Object> result) {
        Map<String, Object> mapper = new HashMap<>();
        try {
            HotelInfo hotelInfo = this.hotelInfoServices.getHotelInfo(result);
            mapper.put("code","0");
            mapper.put("msg","获取酒店信息成功");
            mapper.put("hotelInfo",hotelInfo);
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","服务器出错");
        }
        return mapper;
    }

    @RequestMapping("/setHotelInfo")
    @ResponseBody
    public Object setHotelInfo(@RequestBody Map<String,Object> result) {
        Map<String, Object> mapper = new HashMap<>();
        try {
            this.hotelInfoServices.setHotelInfo(result);
            mapper.put("code","0");
            mapper.put("msg","公告已更新...");
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","服务器出错");
        }
        return mapper;
    }

    @RequestMapping("/getHotelFoodKu")
    @ResponseBody
    public Object getHotelFoodKu(@RequestBody Map<String,Object> result) {
        Map<String, Object> mapper = new HashMap<>();
        try {
            int hotelId = Integer.valueOf(result.get("hotelId").toString());
            List<FoodKu> listfood = this.foodKuServices.selectFoodListByHotel(hotelId);
            mapper.put("code","0");
            mapper.put("msg","查询成功");
            mapper.put("count",listfood.size());
            mapper.put("data",listfood);
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","服务器出错");
        }
        return mapper;
    }

    @RequestMapping(value = "/statistics")
    public String  statics(){
            return "admin/statistics";
    }

    @RequestMapping(value = "/foodku")
    public String  foodku(String userId,Map<String,Object> mapper){
        Map<String, Object> result = new HashMap<>();
        result.put("userId",userId);
        try {
            HotelInfo hotelInfo = this.hotelInfoServices.getHotelInfo(result);
            mapper.put("code","0");
            mapper.put("hotelInfo",hotelInfo);
            return "admin/foodku";
        } catch (Exception e) {
            e.printStackTrace();
            return "error/error";
        }
    }

    @RequestMapping(value = "/foodService")
    public String  foodService(String userId,Map<String,Object> mapper){
        Map<String, Object> result = new HashMap<>();
        result.put("userId",userId);
        try {
            HotelInfo hotelInfo = this.hotelInfoServices.getHotelInfo(result);
            mapper.put("code","0");
            mapper.put("hotelInfo",hotelInfo);
            return "admin/foodService";
        } catch (Exception e) {
            e.printStackTrace();
            return "error/error";
        }
    }

    @RequestMapping(value = "/foodre")
    public String  foodre(){
        return "admin/foodRecom";
    }
}
