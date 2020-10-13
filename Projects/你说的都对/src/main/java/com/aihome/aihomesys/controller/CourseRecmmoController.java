package com.aihome.aihomesys.controller;

import com.aihome.aihomesys.service.*;
import com.aihome.aihomesys.vo.*;
import com.aihome.component.ComputingUnit;
import com.aihome.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "courses")
public class CourseRecmmoController {

    @Autowired
    UserInfoService userInfoService = new UserInfoService();
    @Autowired
    UserEnrollService userEnrollService = new UserEnrollService();
    @Autowired
    LabelTypeService labelTypeService = new LabelTypeService();
    @Autowired
    UserLabelServices userLabelServices = new UserLabelServices();
    @Autowired
    ClassInfoService classInfoService = new ClassInfoService();
    @Autowired
    ActionInfoServices actionInfoServices = new ActionInfoServices();
    @Autowired
    CircleContentServices circleContentServices = new CircleContentServices();
    @Autowired
    UserGoodServices userGoodServices = new UserGoodServices();

    ComputingUnit computingUnit = new ComputingUnit();

    @RequestMapping(value = "skipInsert")
    @ResponseBody
    public Object skipInsert(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")!=""&&result.get("userId")!=null){
            //先判断是否存在
            try {
                int isIn = this.userInfoService.counById(result);
                if(isIn==0){
                    result.put("modifyTime", DateUtils.getCurTime());
                    int re = this.userInfoService.skipinsert(result);
                    mapper.put("code","0");
                    mapper.put("msg","数据存取成功");
                }else{ //存在就update
                    result.put("modifyTime", DateUtils.getCurTime());
                    this.userInfoService.skipUpdate(result);
                    mapper.put("code","0");
                    mapper.put("msg","数据存取成功");
                }
                this.userEnrollService.eableUpdate(result);
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

    @RequestMapping(value = "infoInsert")
    @ResponseBody
    public Object infoInsert(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")!=""&&result.get("userId")!=null){
            result.put("modifyTime", DateUtils.getCurTime());
            result.put("BMI",computingUnit.BMICom(result.get("height"),result.get("weight")));
            //先判断是否存在
            try {
                int isIn = this.userInfoService.counById(result);
                if(isIn==0){
                    int re = this.userInfoService.infoinsert(result);
                }else{ //存在就update
                    this.userInfoService.infoUpdate(result);
                }
                this.userEnrollService.eableUpdate(result);
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

    @RequestMapping(value = "getLabelList")
    @ResponseBody
    public Object getLabelList(){
        Map<String, Object> mapper = new HashMap<>();
        try {
            List<LabelType> list = this.labelTypeService.getAll();
            mapper.put("code","0");
            mapper.put("list",list);
            mapper.put("msg","列表拉取成功");
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","服务器异常");
        }
        return mapper;
    }

    @RequestMapping(value = "setUserLabel")
    @ResponseBody
    public Object setUserLabel(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        try {
            List<UserLabel> list = (List)result.get("list");
            this.userLabelServices.insertBeach(list);
            mapper.put("code","0");
            mapper.put("msg","数据存取成功");
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","服务器异常");
        }
        return mapper;
    }


//    @RequestMapping(value = "info-user")
//    public String getUser(){
//        return "comm/getinfo/info-user";
//    }

    @RequestMapping(value = "info-fav")
    public String getUserage(){
        return "comm/getinfo/info-fav";
    }

    @RequestMapping(value = "inner-recomm")
    public String innerrecomm(String userId,Map<String,Object> mapper){
        //取用户label
        List<UserLabel> userLabel = this.userLabelServices.getAll(userId);
        //获取用户推荐课程list
        List<Map> labellist = new ArrayList<>();
        if(!userLabel.isEmpty()){
            for (int i=0;i<userLabel.size();i++){
                Map<String,Object> classinfo = new HashMap<>();
                Map<String,Object> tem = new HashMap<>();
                String typename = userLabel.get(i).getTypeName();
                tem.put("classLabel",typename);
                List<ClassInfo> classInfos = this.classInfoService.selectByKeys(tem);
                if(!classInfos.isEmpty()){
                    classinfo.put("typeName",typename);
                    classinfo.put("data",classInfos);
                    labellist.add(classinfo);
                }
                tem.clear();
            }
            mapper.put("labellist",labellist);
            return "comm/coursefav/recomm";
        }
        return "error/error";
    }

    @RequestMapping(value = "getUserRecommInfo")
    @ResponseBody
    public Object getUserRecommInfo(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        String userId = result.get("userId").toString();
        if(userId==null){
            mapper.put("code","2");
            mapper.put("msg","未获得用户信息");
        }else {
            try {
                //取用户信息
                UserEnroll userEnroll = this.userEnrollService.findById(userId);
                //取用户info
                UserInfo userInfo = this.userInfoService.findById(userId);
                //取用户label
                List<UserLabel> userLabel = this.userLabelServices.getAll(userId);
                mapper.put("userEnroll",userEnroll);
                mapper.put("userInfo",userInfo);
                mapper.put("userLabel",userLabel);
                mapper.put("code","0");
                mapper.put("msg","拉取数据成功");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器异常");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "getTabClass")
    @ResponseBody
    public Object getTabClass(@RequestBody Map<String,Object> res){
        Map <String, Object> mapper = new HashMap<>();
        //请求后台数据
        if(res.get("classTitle")!=""&&res.get("classTitle")!=null){
            List<ClassInfo> classlist = new ArrayList<>();
            String title = res.get("classTitle").toString();
            //分页处理
            int page = Integer.valueOf(res.get("page").toString());
            int number = Integer.valueOf(res.get("number").toString());
            res.put("page",(page-1)*number);
            res.put("number",number);
            try {
                if(title.equals("全部")){
                    classlist = this.classInfoService.getAll(res);
                    int pagesAll = this.classInfoService.getAllCounts();
                    int pages = pagesAll%number==0?(pagesAll/number):(pagesAll/number)+1;
                    mapper.put("pages",pages);
                }else{
                    classlist = this.classInfoService.selectBytitles(res);
                    int pagesAll = this.classInfoService.countByTitle(res);
                    int pages = pagesAll%number==0?(pagesAll/number):(pagesAll/number)+1;
                    mapper.put("pages",pages);
                }
                mapper.put("classList",classlist);
                mapper.put("code","0");
                mapper.put("msg","请求成功");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器错误");
            }
        }else{
            mapper.put("code","2");
            mapper.put("msg","未获取的参数");
        }
        return mapper;
    }

    @RequestMapping(value = "getSearchItems")
    @ResponseBody
    public Object getSearchItems(@RequestBody Map<String,Object> res){
        Map<String, Object> mapper = new HashMap<>();
        //请求后台数据
        if(res.get("val")!=""&&res.get("val")!=null){
            List<ClassInfo> classlist = new ArrayList<>();
            String text = res.get("val").toString();
            try {
                classlist = this.classInfoService.getSearch(text);
                mapper.put("classList",classlist);
                mapper.put("code","0");
                mapper.put("msg","请求成功");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器错误");
            }
        }else{
            mapper.put("code","2");
            mapper.put("msg","未获取的参数");
        }
        return mapper;
    }

    @RequestMapping(value = "inner-allc")
    public String innerallc(){
        return "comm/coursefav/allcourse";
    }

    @RequestMapping(value = "inner-intro")
    public String innerintro(String userId,String classId,Map<String,Object> mapper){
        if(userId!=null&&classId!=null){
            Map<String,Object> map = new HashMap<>();
            map.put("classId",classId);
            try {
                ClassInfo classInfo = this.classInfoService.selectById(map);
                int acnum = this.actionInfoServices.countById(map);
                if(acnum>0){
                    List<ActionInfo> actionInfos = this.actionInfoServices.selectByclassId(map);
                    mapper.put("actionlist",actionInfos);
                }
                if(classInfo==null){
                    mapper.put("code","1");
                    mapper.put("msg","异常参数");
                }else {
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
                    mapper.put("code","0");
                    mapper.put("msg","请求数据成功");
                    mapper.put("classInfo",classInfo);
                    mapper.put("acnum",acnum);
                    mapper.put("cc",circleContents);
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器异常");
            }
        }else{
            mapper.put("code","1");
            mapper.put("msg","缺少必要参数");
        }
        return "comm/coursefav/courseintro";
    }
}
