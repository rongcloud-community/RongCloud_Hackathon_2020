package com.aihome.aihomesys.controller;

import com.aihome.aihomesys.service.*;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.CircleContent;
import com.aihome.aihomesys.vo.ClassInfo;
import com.aihome.aihomesys.vo.UserPlan;
import com.aihome.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "plan")
public class PlanCoreController {
    @Autowired
    ClassInfoService classInfoService = new ClassInfoService();
    @Autowired
    UserPlanService userPlanService = new UserPlanService();
    @Autowired
    UserEnrollService userEnrollService = new UserEnrollService();
    @Autowired
    UserInfoService userInfoService = new UserInfoService();
    @Autowired
    ActionInfoServices actionInfoServices = new ActionInfoServices();
    @Autowired
    CircleContentServices circleContentServices = new CircleContentServices();
    @Autowired
    UserGoodServices userGoodServices = new UserGoodServices();
    @Autowired
    FitnessRecordServices fitnessRecordServices = new FitnessRecordServices();

    @RequestMapping(value = "userSubc")
    @ResponseBody
    public Object userSubc(@RequestBody Map<String,Object> res){
        Map<String, Object> mapper = new HashMap<>();
        if(res.get("userId").equals("")||res.get("classId").equals("")){
            mapper.put("code","1");
            mapper.put("msg","违法参数");
        }else {
            //添加信息
            String userId = res.get("userId").toString();
            int classId = (int)res.get("classId");
            //先判断是否存在
            int isIn = 0;
            try {
                isIn = this.userPlanService.countById(res);
                if(isIn == 0) {
                    //获取课程信息
                    try {
                        ClassInfo classInfo = this.classInfoService.selectById(res);
                        if(classInfo!=null){
                            res.put("className",classInfo.getClassName());
                            res.put("classImg",classInfo.getClassImg());
                            res.put("classTime",classInfo.getClassTime());
                            res.put("subTime", DateUtils.getCurTime());
                            this.userPlanService.infoinsert(res);
                            //修改订阅人数
                            this.classInfoService.updateSub(res);
                            mapper.put("code","0");
                            mapper.put("msg","成功订阅");
                        }else {
                            mapper.put("code","1");
                            mapper.put("msg","未获得课程信息");
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        mapper.put("code","1");
                        mapper.put("msg","服务器错误");
                    }
                }else{
                    mapper.put("code","1");
                    mapper.put("msg","重复订阅");
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器错误");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "/start")
    public String planStart(String userId,Map<String,Object> mapper){
        Map<String, Object> res = new HashMap<>();
        res.put("userId",userId);
        if(userId!=null&&userId!=""){
            //获取用户数据
            List<UserPlan> todaylist = null;
            List<UserPlan> mylist = null;
            try {
                todaylist = this.userPlanService.selectTodayTask(res);
                mylist = this.userPlanService.selectMyTask(res);
                //计算表头数据
                {
                    int cumfitness = this.userInfoService.findById(userId).getTrainDay();
                    int todayTime = todaylist.size();
                    int allmyTime = 0;
                    for(int i=0;i<mylist.size();i++){
                        allmyTime+=Integer.valueOf(mylist.get(i).getComTime());
                    }
                    int allFatB = 0;
                    for(int i=0;i<mylist.size();i++){
                        allFatB+=Integer.valueOf(mylist.get(i).getTotalFatB());
                    }
                    mapper.put("cumfitness",cumfitness);
                    mapper.put("todayTime",todayTime);
                    mapper.put("allmyTime",allmyTime);
                    mapper.put("allFatB",allFatB);
                }
                mapper.put("code","0");
                mapper.put("todaylist",todaylist);
                mapper.put("mylist",mylist);
                return "comm/planfram/planmain";
            } catch (NumberFormatException e) {
                e.printStackTrace();
                return "error/error/planmain";
            }
            //send
        }
        return "error/error/planmain";
    }

    @RequestMapping("/getRandPose")
    @ResponseBody
    public Object getRandPose() {
        Map<String, Object> mapper = new HashMap<>();
        try {
            List<ActionInfo> randaction = this.actionInfoServices.randGetpos();
            mapper.put("code","0");
            mapper.put("randaction",randaction);
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code", "1");
            mapper.put("msg", "服务器出错");
        }
        return mapper;
    }

    @RequestMapping(value = "/start-whole")
    public String planWhole(String userId,String classId,Map<String,Object> mapper){
        if (userId!=null&&classId!=null){
            //获取课程参数
            Map<String, Object> res = new HashMap<>();
            res.put("userId",userId);
            res.put("classId",classId);
            try {
                //获取课程参数
                ClassInfo classInfo = this.classInfoService.selectById(res);
                //获取课程所拥有动作信息
                List<ActionInfo> al = this.actionInfoServices.selectByclassId(res);
                //获取用户评论信息
                List<CircleContent> circleContents = this.circleContentServices.fromClass2Content(Integer.valueOf(classId));
                for(int i=0;i<circleContents.size();i++){
                    Map<String, Object> temp = new HashMap<>();
                    temp.put("userId",userId);
                    temp.put("conId",circleContents.get(i).getConId());
                    circleContents.get(i).setIsGood(this.userGoodServices.isGood(temp));
                    String[] imglist = circleContents.get(i).getConImg().split(",");
                    circleContents.get(i).setImglist(imglist);
                }
                int acNumber = 0;
                mapper.put("code","0");
                mapper.put("classInfo",classInfo);
                mapper.put("actionInfo",al);
                acNumber = al.size();
                mapper.put("acNumber",acNumber);
                mapper.put("cc",circleContents);
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                return "error/error";
            }
        }
        return "comm/planfram/planwhole";
    }

    @RequestMapping(value = "/start-pose")
    public String planPose(String userId,String actionId,Map<String,Object> mapper){
        if(userId!=null&&actionId!=null){
            //获取动作参数
            Map<String, Object> res = new HashMap<>();
            res.put("actionId",actionId);
            ActionInfo actionInfo = null;
            try {
                actionInfo = this.actionInfoServices.selectById(res);
                mapper.put("code","0");
                mapper.put("actionInfo",actionInfo);
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                return "comm/planfram/planpose";
            }
        }
        return "comm/planfram/planpose";
    }

    @RequestMapping(value = "/uploadAction",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object uploadAction(@RequestParam("file") MultipartFile file){
        Map<String, Object> mapper = new HashMap<>();
        MultipartFile img = file;
        if(img.isEmpty()){
            mapper.put("code", "1");
            mapper.put("msg", "服务器出错");
        }else{
            String fileName = file.getOriginalFilename();
            File dest = new File(new File("D:\\test").getAbsolutePath()+ "/" + fileName+".png");
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                file.transferTo(dest); // 保存文件
                mapper.put("code", "0");
                mapper.put("msg", "上传成功");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code", "1");
                mapper.put("msg", "服务器出错");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "updateUserPlan")
    @ResponseBody
    public Object updateUserPlan(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        String userId = result.get("userId").toString();
        int classId =Integer.valueOf(result.get("classId").toString());
        if(userId==null||classId==0){
            mapper.put("code","2");
            mapper.put("msg","未获得用户信息");
        }else {
            try {
                //查看今日是否已经完成训练记录
                if(this.userInfoService.todayIsTrain(result)==0){
                    this.userInfoService.trainUpdate(result);
                }
                //查看今日是否完成计划
                int isComToday = this.userPlanService.countTodayIsCom(result);
                if(isComToday==0){
                    result.put("todayTime",DateUtils.getCurTime());
                    result.put("recordTime",DateUtils.getCurTime());
                    this.userPlanService.updateOneClass(result);
                    this.fitnessRecordServices.recordInsert(result);
                    //判断是否已经完成整个课程
                    UserPlan userPlan = this.userPlanService.selectByClassIdAndUserId(result);
                    if(Integer.valueOf(userPlan.getComTime().toString())==Integer.valueOf(userPlan.getClassTime().toString())){
                        this.userPlanService.updateIsCom(result);
                        mapper.put("code","0_2");
                        mapper.put("msg","恭喜您，已完成全部课程系列,为您燃脂："+userPlan.getTotalFatB()+"Kcal！");
                    }else{
                        mapper.put("code","0_3");
                        mapper.put("msg","恭喜您，已完成今日课程，燃脂："+userPlan.getTotalFatB()+"Kcal！继续努力吧！");
                    }
                }else {
                    result.put("todayTime",DateUtils.getCurTime());
                    result.put("recordTime",DateUtils.getCurTime());
                    this.userPlanService.updateFatB(result);
                    this.fitnessRecordServices.recordInsert(result);
                    mapper.put("code","0_1");
                    mapper.put("msg","今日已完成课程，燃脂："+result.get("totalFatB")+"Kcal！继续努力吧！");
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器异常");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "updatePoseRecord")
    @ResponseBody
    public Object updatePoseRecord(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        String userId = result.get("userId").toString();
        int actionId =Integer.valueOf(result.get("fkId").toString());
        if(userId==null||actionId==0){
            mapper.put("code","2");
            mapper.put("msg","未获得用户信息,运动记录上传失败...");
        }else {
            try {
                result.put("recordTime",DateUtils.getCurTime());
                this.fitnessRecordServices.recordInsert(result);
                mapper.put("code","0");
                mapper.put("msg","运动记录已上传");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器异常,运动记录上传失败...");
            }
        }
        return mapper;
    }

}
