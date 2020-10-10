package com.aihome.aihomesys.controller;

import com.aihome.aihomesys.service.*;
import com.aihome.aihomesys.vo.*;
import com.aihome.component.ComputingUnit;
import com.aihome.utils.DateUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/padding")
public class PadFramController {
    @Autowired
    UserEnrollService userEnrollService = new UserEnrollService();

    @Autowired
    UserInfoService userInfoService = new UserInfoService();

    @Autowired
    ClassInfoService classInfoService = new ClassInfoService();

    @Autowired
    UserPlanService userPlanService = new UserPlanService();

    @Autowired
    CircleContentServices circleContentServices = new CircleContentServices();

    @Autowired
    UserFollowServices userFollowServices = new UserFollowServices();

    @Autowired
    UserGoodServices userGoodServices = new UserGoodServices();

    @Autowired
    FitnessRecordServices fitnessRecordServices = new FitnessRecordServices();

    @Autowired
    HotelInfoServices hotelInfoServices = new HotelInfoServices();

    @Autowired
    MealInfoServices mealInfoServices = new MealInfoServices();

    @Autowired
    FoodKuServices foodKuServices = new FoodKuServices();

    ComputingUnit computingUnit = new ComputingUnit();

    @RequestMapping(value = "pad-statistics")
    public String padstatistics(String userId,Map<String,Object> mapper){
        if(userId==null||userId==""){
            return "error/error";
        }
        //获取用户基本数据
        try {
            UserInfo userInfo = this.userInfoService.findById(userId);
            int FitnessTime = 0,CumFatB = 0,CumFatBToday = 0,CumDay = 0,Perfect = 0,Good = 0,Bad = 0;
            {
                FitnessTime = this.fitnessRecordServices.countFitnessTime(userId)/60;
                CumFatB = this.fitnessRecordServices.countCumFatB(userId);
                CumFatBToday = this.fitnessRecordServices.countCumFatBToday(userId);
                CumDay = this.fitnessRecordServices.countCumday(userId);
                Perfect = this.fitnessRecordServices.countPerfect(userId);
                Good = this.fitnessRecordServices.countGood(userId);
                Bad = this.fitnessRecordServices.countBad(userId);
            }
            mapper.put("userInfo",userInfo);
            mapper.put("FitnessTime",FitnessTime);
            mapper.put("CumFatB",CumFatB);
            mapper.put("CumFatBToday",CumFatBToday);
            mapper.put("CumDay",CumDay);
            mapper.put("Perfect",Perfect);
            mapper.put("Good",Good);
            mapper.put("Bad",Bad);
            return "comm/paddingfram/statistics";
        } catch (Exception e) {
            e.printStackTrace();
            return "error/error";
        }
    }

    @RequestMapping(value = "pad-userinfo")
    public String paduserinfo(String userId, Map<String,Object> mapper){
        if (userId==""||userId==null){
            return "error/error";
        }else {
            try {
                Map<String,Object> temp = new HashMap<>();
                //获取用户基本信息
                UserEnroll userEnroll = this.userEnrollService.findById(userId);
                //获取用户健身数据
                UserInfo userInfo = this.userInfoService.findById(userId);
                //获取用户选择课程信息
                List<ClassInfo> ClassInfo = this.classInfoService.selectByUserId(userId);
                //获取用户动态
                temp.put("userId",userId);
                List<CircleContent> circleContents = this.circleContentServices.getMycontAndCallback(temp);
                for(int i=0;i<circleContents.size();i++){
                    Map<String, Object> temp2 = new HashMap<>();
                    temp2.put("userId",userId);
                    temp2.put("conId",circleContents.get(i).getConId());
                    circleContents.get(i).setIsGood(this.userGoodServices.isGood(temp2));
                    if(!circleContents.get(i).getConImg().isEmpty()){
                        String[] imglist = circleContents.get(i).getConImg().split(",");
                        circleContents.get(i).setImglist(imglist);
                    }
                }
                //统计数值
                int myfollow = this.userFollowServices.countMyFollow(userId);
                int followme = this.userFollowServices.countFollowMe(userId);
                int planclass = this.userPlanService.countMyClassNum(userId);
                {
                    mapper.put("myfollow",myfollow);
                    mapper.put("followme",followme);
                    mapper.put("planclass",planclass);
                    mapper.put("userEnroll",userEnroll);
                    mapper.put("userInfo",userInfo);
                    mapper.put("ClassInfo",ClassInfo);
                    mapper.put("cc",circleContents);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return "error/error";
            }
        }
        return "comm/paddingfram/userinfo";
    }

    @RequestMapping(value = "pad-otherInfo")
    public String padotherInfo(String userId, String otherId,Map<String,Object> mapper){
        if (otherId==""||otherId==null){
            return "error/error";
        }else {
            try {
                Map<String,Object> temp = new HashMap<>();
                //获取用户基本信息
                UserEnroll userEnroll = this.userEnrollService.findById(otherId);
                //获取用户健身数据
                UserInfo userInfo = this.userInfoService.findById(otherId);
                //获取用户选择课程信息
                List<ClassInfo> ClassInfo = this.classInfoService.selectByUserId(otherId);
                //获取用户动态
                temp.put("userId",otherId);
                List<CircleContent> circleContents = this.circleContentServices.getMycontAndCallback(temp);
                for(int i=0;i<circleContents.size();i++){
                    Map<String, Object> temp2 = new HashMap<>();
                    temp2.put("userId",otherId);
                    temp2.put("conId",circleContents.get(i).getConId());
                    circleContents.get(i).setIsGood(this.userGoodServices.isGood(temp2));
                    if(!circleContents.get(i).getConImg().isEmpty()){
                        String[] imglist = circleContents.get(i).getConImg().split(",");
                        circleContents.get(i).setImglist(imglist);
                    }
                }
                //统计数值
                int myfollow = this.userFollowServices.countMyFollow(otherId);
                int followme = this.userFollowServices.countFollowMe(otherId);
                int planclass = this.userPlanService.countMyClassNum(otherId);
                int isfollowta = this.userFollowServices.isFollow(userId,otherId);
                {
                    mapper.put("myfollow",myfollow);
                    mapper.put("followme",followme);
                    mapper.put("planclass",planclass);
                    mapper.put("userEnroll",userEnroll);
                    mapper.put("userInfo",userInfo);
                    mapper.put("ClassInfo",ClassInfo);
                    mapper.put("isfollowta",isfollowta);
                    mapper.put("cc",circleContents);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return "error/error";
            }
        }
        return "comm/paddingfram/otherUserPage";
    }

    @RequestMapping(value = "/followAction",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object goodAction(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null||result.get("otherId")==null||result.get("flag")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            int flag =Integer.valueOf(result.get("flag").toString());
            Map<String,Object> temp = new HashMap<>();
            temp.put("fuserId",result.get("userId"));
            temp.put("fuseredId",result.get("otherId"));
            if(flag==0){    //关注
                temp.put("followTime", DateUtils.getCurTime());
                this.userFollowServices.setFollow(temp);
                mapper.put("code","0");
                mapper.put("msg","关注成功");
            }else if(flag==1){  //取消
                this.userFollowServices.deleteFollow(temp);
                mapper.put("code","0");
                mapper.put("msg","取消成功");
            }else {
                mapper.put("code","1");
                mapper.put("msg","参数异常");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "pad-food")
    public String padfood(String userId,Map<String,Object> mapper){
        Map<String, Object> result = new HashMap<>();
        result.put("userId",userId);
        try {
            HotelInfo hotelInfo = this.hotelInfoServices.getHotelInfo(result);
            int totalFabt = this.fitnessRecordServices.countCumFatBToday(userId);
            mapper.put("code","0");
            mapper.put("hotelInfo",hotelInfo);
            mapper.put("totalFabt",totalFabt);
            return "comm/paddingfram/foodpro";
        } catch (Exception e) {
            e.printStackTrace();
            return "error/error";
        }
    }

    @RequestMapping(value = "/getMealList",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object getMealList(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null||result.get("hotelId")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {

            MealInfo zao = null;
            try {
                zao = this.mealInfoServices.getCommMeal(result);
                int tempFatb = 0;

                FoodKu staple = this.foodKuServices.selectById(zao.getStapleId());
                zao.setStapleName(staple.getFoodName());
                zao.setStapleCacul(staple.getFoodContent());
                tempFatb+=staple.getFoodFatB();

                FoodKu MEM = this.foodKuServices.selectById(zao.getMEMId());
                zao.setMEMName(MEM.getFoodName());
                zao.setMEMCacul(MEM.getFoodContent());
                tempFatb+=MEM.getFoodFatB();

                FoodKu VF = this.foodKuServices.selectById(zao.getVFId());
                zao.setVFName(VF.getFoodName());
                zao.setVFCacul(VF.getFoodContent());
                tempFatb+=VF.getFoodFatB();

                FoodKu Grease = this.foodKuServices.selectById(zao.getGreaseId());
                zao.setGreaseName(Grease.getFoodName());
                zao.setGreaseCacul(Grease.getFoodContent());
                tempFatb+=Grease.getFoodFatB();

                FoodKu other = this.foodKuServices.selectById(zao.getOtherId());
                if(other!=null){
                    zao.setOtherName(other.getFoodName());
                    zao.setOtherCacul(other.getFoodContent());
                    tempFatb+=other.getFoodFatB();
                }
                zao.setTotalFatB(tempFatb);
                mapper.put("code", "0");
                mapper.put("msg", "查询成功");
                mapper.put("mealInfo",zao);
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错啦");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "pad-foodku")
    public String padfoodku(String userId,Map<String,Object> mapper){
        Map<String, Object> result = new HashMap<>();
        result.put("userId",userId);
        try {
            HotelInfo hotelInfo = this.hotelInfoServices.getHotelInfo(result);
            int totalFabt = this.fitnessRecordServices.countCumFatBToday(userId);
            mapper.put("code","0");
            mapper.put("hotelInfo",hotelInfo);
            mapper.put("totalFabt",totalFabt);
            return "comm/paddingfram/foodku";
        } catch (Exception e) {
            e.printStackTrace();
            return "error/error";
        }
    }

    @RequestMapping(value = "/getFoodku",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object getFoodku(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("hotelId")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            List<FoodKu> foodlist = null;
            try {
                foodlist = this.foodKuServices.selectFoodListByHotel(Integer.valueOf(result.get("hotelId").toString()));
                mapper.put("code", "0");
                mapper.put("msg", "查询成功");
                mapper.put("foodlist",foodlist);
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错啦");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "pad-select")
    public String padselect(String userId,Map<String,Object> mapper){
        Map<String, Object> result = new HashMap<>();
        result.put("userId",userId);
        try {
            HotelInfo hotelInfo = this.hotelInfoServices.getHotelInfo(result);
            mapper.put("hotelInfo",hotelInfo);
            return "comm/paddingfram/selectFood";
        } catch (Exception e) {
            e.printStackTrace();
            return "error/error";
        }
    }

    @RequestMapping(value = "pad-changeinfo")
    public String padchangeinfo(String userId,Map<String,Object> mapper){
        if(userId==""||userId==null){
            return "error/error";
        }
        try {
            UserEnroll userEnroll = this.userEnrollService.findById(userId);
            UserInfo userInfo = this.userInfoService.findById(userId);
            mapper.put("userEnroll",userEnroll);
            mapper.put("userInfo",userInfo);
            return "comm/paddingfram/changeInfo";
        } catch (Exception e) {
            e.printStackTrace();
            return "error/error";
        }
    }

    @RequestMapping(value = "/uploadImg",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object uploadImg(@RequestParam("file") MultipartFile file, HttpServletRequest req){
        String userId = req.getParameter("userId");
        String realPath=req.getServletContext().getRealPath("/uploadImg");
        Map<String, Object> mapper = new HashMap<>();
        MultipartFile img = file;
        if(img.isEmpty()||userId.isEmpty()){
            mapper.put("code", "1");
            mapper.put("msg", "服务器出错");
        }else{
            String fileName = "nav_"+userId+"_"+DateUtils.getCurTime2Number();
            File dest = new File(new File(realPath).getAbsolutePath()+ "/../../resources/static/images/nav/" + userId + "/" + fileName+".png");
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                file.transferTo(dest); // 保存文件
                String userAva = userId+"/"+fileName+".png";
                //修改数据库
                this.userEnrollService.userAvaUpdate(userId,userAva);
                mapper.put("code", "0");
                mapper.put("msg", "上传成功");
                mapper.put("filename",userAva);
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code", "1");
                mapper.put("msg", "服务器出错");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "infoInsert")
    @ResponseBody
    public Object infoInsert(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")!=""&&result.get("userId")!=null){
            result.put("modifyTime", DateUtils.getCurTime());
            result.put("BMI",computingUnit.BMICom(result.get("height"),result.get("weight")));
            try {
                this.userInfoService.infoUpdate(result);
                this.userEnrollService.userNameUpdate(result);
                mapper.put("code","0");
                mapper.put("msg","数据存取成功");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错");
            }
        }else {
            mapper.put("code","1");
            mapper.put("msg","有异常数值");
        }
        return mapper;
    }

    @RequestMapping(value = "/getEchartsData")
    @ResponseBody
    public Object getEchartsData(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null||result.get("userId")==""){
            mapper.put("code","1");
            mapper.put("msg","参数错误");
        }else{
            //获取前一周
            String userId = result.get("userId").toString();
            try {
                List<String> datalist = DateUtils.getLastWeek(DateUtils.getCurTime());
                List<Integer> weekplan = new ArrayList<>();
                List<Integer> weektime = new ArrayList<>();
                List<Integer> weekFatB = new ArrayList<>();
                List<Integer> period = new ArrayList<>();
                for(int i=datalist.size()-1;i>=0;i--){
                    //获取当天数据
                    int plannum = this.fitnessRecordServices.countEchartPlan(userId,datalist.get(i));
                    weekplan.add(plannum);
                    int timenum = this.fitnessRecordServices.countEchartFitnessTime(userId,datalist.get(i))/60;
                    weektime.add(timenum);
                    int FatB = this.fitnessRecordServices.countEchartFatB(userId,datalist.get(i));
                    weekFatB.add(FatB);
                }
                //每天健身时段
                {
                    period.add(this.fitnessRecordServices.count69(userId));
                    period.add(this.fitnessRecordServices.count912(userId));
                    period.add(this.fitnessRecordServices.count1215(userId));
                    period.add(this.fitnessRecordServices.count1518(userId));
                    period.add(this.fitnessRecordServices.count1821(userId));
                    period.add(this.fitnessRecordServices.count210(userId));
                    period.add(this.fitnessRecordServices.count0after(userId));
                }
                mapper.put("code","0");
                mapper.put("msg","数据拉取成功");
                mapper.put("weekplan",weekplan);
                mapper.put("weektime",weektime);
                mapper.put("weekFatB",weekFatB);
                mapper.put("period",period);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        return mapper;
    }
}
