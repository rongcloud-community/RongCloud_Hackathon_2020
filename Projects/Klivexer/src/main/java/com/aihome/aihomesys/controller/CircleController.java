package com.aihome.aihomesys.controller;

import com.aihome.aihomesys.service.*;
import com.aihome.aihomesys.vo.*;
import com.aihome.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/circle")
public class CircleController {

    @Autowired
    UserEnrollService userEnrollService = new UserEnrollService();

    @Autowired
    CircleContentServices circleContentServices = new CircleContentServices();

    @Autowired
    UserFollowServices userFollowServices = new UserFollowServices();

    @Autowired
    UserPlanService userPlanService = new UserPlanService();

    @Autowired
    UserGoodServices userGoodServices = new UserGoodServices();

    @GetMapping
    public String  circle(String userId,Map<String,Object> mapper){
        if(userId!=null){
            try {
                //统计数值
                int myfollow = this.userFollowServices.countMyFollow(userId);
                int followme = this.userFollowServices.countFollowMe(userId);
                int planclass = this.userPlanService.countMyClassNum(userId);
                //个人情况
                UserEnroll myinfo = this.userEnrollService.findById(userId);
                {
                    mapper.put("myfollow",myfollow);
                    mapper.put("followme",followme);
                    mapper.put("planclass",planclass);
                    mapper.put("myinfo",myinfo);
                }
                return "comm/userfram/circle";
            } catch (Exception e) {
                e.printStackTrace();
                return "error/error";
            }
        }else {
            return "error/error";
        }
    }

    @RequestMapping(value = "/getContent",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object getContent(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null||result.get("type")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            //分页处理
            int page = Integer.valueOf(result.get("page").toString());
            int number = Integer.valueOf(result.get("number").toString());
            result.put("page",(page-1)*number);
            result.put("number",number);
            try {
                int type = Integer.valueOf(result.get("type").toString());
                if(type==0){    //热门
                    List<CircleContent> circleContents = this.circleContentServices.getHot(result);
                    //是否点赞
                    for(int i=0;i<circleContents.size();i++){
                        Map<String, Object> temp = new HashMap<>();
                        temp.put("userId",result.get("userId"));
                        temp.put("conId",circleContents.get(i).getConId());
                        circleContents.get(i).setIsGood(this.userGoodServices.isGood(temp));
                    }
                    //分页处理
                    int pagesAll = this.circleContentServices.countHot(result);
                    int pages = pagesAll%number==0?(pagesAll/number):(pagesAll/number)+1;
                    mapper.put("pages",pages);
                    mapper.put("code","0");
                    mapper.put("msg","查询成功");
                    mapper.put("circleContents",circleContents);
                }else if (type==1){     //关注
                    List<CircleContent> circleContents = this.circleContentServices.getFollow(result);
                    for(int i=0;i<circleContents.size();i++){
                        Map<String, Object> temp = new HashMap<>();
                        temp.put("userId",result.get("userId"));
                        temp.put("conId",circleContents.get(i).getConId());
                        circleContents.get(i).setIsGood(this.userGoodServices.isGood(temp));
                    }
                    //分页处理
                    int pagesAll = this.circleContentServices.countFollow(result);
                    int pages = pagesAll%number==0?(pagesAll/number):(pagesAll/number)+1;
                    mapper.put("pages",pages);
                    mapper.put("code","0");
                    mapper.put("msg","查询成功");
                    mapper.put("circleContents",circleContents);
                }else if (type==2){     //我的
                    List<CircleContent> circleContents = this.circleContentServices.getMycont(result);
                    for(int i=0;i<circleContents.size();i++){
                        Map<String, Object> temp = new HashMap<>();
                        temp.put("userId",result.get("userId"));
                        temp.put("conId",circleContents.get(i).getConId());
                        circleContents.get(i).setIsGood(this.userGoodServices.isGood(temp));
                    }
                    //分页处理
                    int pagesAll = this.circleContentServices.countMycont(result);
                    int pages = pagesAll%number==0?(pagesAll/number):(pagesAll/number)+1;
                    mapper.put("pages",pages);
                    mapper.put("code","0");
                    mapper.put("msg","查询成功");
                    mapper.put("circleContents",circleContents);
                }else if(type==3){      //搜索
                    mapper.put("code","1");
                    mapper.put("msg","参数异常");
                }else {
                    mapper.put("code","1");
                    mapper.put("msg","参数异常");
                }
            } catch (NumberFormatException e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错啦");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "/getSearchContent",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object getSearchContent(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null||result.get("val")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            try {
                List<CircleContent> circleContents = this.circleContentServices.getSearchItems(result);
                for(int i=0;i<circleContents.size();i++){
                    Map<String, Object> temp = new HashMap<>();
                    temp.put("userId",result.get("userId"));
                    temp.put("conId",circleContents.get(i).getConId());
                    circleContents.get(i).setIsGood(this.userGoodServices.isGood(temp));
                }
                mapper.put("code","0");
                mapper.put("msg","查询成功");
                mapper.put("circleContents",circleContents);
            } catch (NumberFormatException e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错啦");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "/getFollow",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object getFollow(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null&&result.get("type")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            try {
                int type = Integer.valueOf(result.get("type").toString());
                String userId = result.get("userId").toString();
                if(type==0){    //我关注的
                    List<UserFollow> myFollows = this.userFollowServices.selectMyFollow(userId);
                    for(int i=0;i<myFollows.size();i++){
                        myFollows.get(i).setIsFollowed(1);
                    }
                    mapper.put("code","0");
                    mapper.put("msg","查询成功");
                    mapper.put("Follows",myFollows);
                }else if (type==1){     //关注我的
                    List<UserFollow> followme = this.userFollowServices.selectFollowMe(userId);
                    for(int i=0;i<followme.size();i++){
                        followme.get(i).setIsFollowed(this.userFollowServices.isFollow(userId,followme.get(i).getFuserId()));
                    }
                    mapper.put("code","0");
                    mapper.put("msg","查询成功");
                    mapper.put("Follows",followme);
                }else {
                    mapper.put("code","1");
                    mapper.put("msg","参数异常");
                }
            } catch (NumberFormatException e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错啦");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "/gettaFollow",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object gettaFollow(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null||result.get("type")==null||result.get("otherId")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            try {
                int type = Integer.valueOf(result.get("type").toString());
                String userId = result.get("userId").toString();
                String otherId = result.get("otherId").toString();
                if(type==0){    //ta关注的
                    List<UserFollow> myFollows = this.userFollowServices.selectMyFollow(otherId);
                    //我是否关注
                    for(int i=0;i<myFollows.size();i++){
                        myFollows.get(i).setIsFollowed(this.userFollowServices.isFollow(userId,myFollows.get(i).getFuseredId()));
                    }
                    mapper.put("code","0");
                    mapper.put("msg","查询成功");
                    mapper.put("Follows",myFollows);
                }else if (type==1){     //关注ta的
                    List<UserFollow> followme = this.userFollowServices.selectFollowMe(otherId);
                    //我是否关注
                    for(int i=0;i<followme.size();i++){
                        followme.get(i).setIsFollowed(this.userFollowServices.isFollow(userId,followme.get(i).getFuserId()));
                    }
                    mapper.put("code","0");
                    mapper.put("msg","查询成功");
                    mapper.put("Follows",followme);
                }else {
                    mapper.put("code","1");
                    mapper.put("msg","参数异常");
                }
            } catch (NumberFormatException e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错啦");
            }
        }
        return mapper;
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
            String fileName = userId+"_"+DateUtils.getCurTime2Number();
            File dest = new File(new File(realPath).getAbsolutePath()+ "/../../resources/static/images/contentImgs/" + fileName+".png");
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                file.transferTo(dest); // 保存文件
                mapper.put("code", "0");
                mapper.put("msg", "上传成功");
                mapper.put("filename",fileName+".png");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code", "1");
                mapper.put("msg", "服务器出错");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "/setContent",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object setContent(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            //获取用户信息
            try {
                UserEnroll userEnroll = this.userEnrollService.findById(result.get("userId").toString());
                if(userEnroll==null){
                    mapper.put("code","1");
                    mapper.put("msg","违法用户");
                }else {
                    result.put("userName",userEnroll.getUserName());
                    result.put("userImg",userEnroll.getUserAva());
                    result.put("conTime",DateUtils.getCurTime());
                    this.circleContentServices.insert(result);
                    if(Integer.valueOf(result.get("fkType").toString())==2){    //更新评论数据库
                        this.circleContentServices.contAdd(result);
                    }
                    mapper.put("code","0");
                    mapper.put("msg","发布成功");
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错啦...");
            }
        }
        return mapper;
    }


    @RequestMapping(value = "/details")
    public String  circledetails(String userId,String conId,Map<String,Object> mapper){
        if(userId!=null&&conId!=null){
            try {
                //统计数值
                int myfollow = 0;
                int followme = 0;
                int planclass = 0;
                //圈子内容
                CircleContent circleContent = this.circleContentServices.getUserCont(Integer.valueOf(conId));
                UserEnroll myinfo = new UserEnroll();
                if(circleContent!=null){
                    myfollow = this.userFollowServices.countMyFollow(circleContent.getUserId());
                    followme = this.userFollowServices.countFollowMe(circleContent.getUserId());
                    planclass = this.userPlanService.countMyClassNum(circleContent.getUserId());
                    //个人情况
                    myinfo = this.userEnrollService.findById(circleContent.getUserId());
                    //是否点赞
                    Map<String, Object> temp = new HashMap<>();
                    temp.put("userId",userId);
                    temp.put("conId",conId);
                    circleContent.setIsGood(this.userGoodServices.isGood(temp));
                }else {
                    return "error/error";
                }
                //获取图片list
                String[] imglist = circleContent.getConImg().split(",");
                //获取评论内容
                List<CircleContent> contents = this.circleContentServices.getUsers2Contents(Integer.valueOf(conId));
                //判断是否获赞
                for(int i =0;i<contents.size();i++){
                    Map<String, Object> temp2 = new HashMap<>();
                    temp2.put("userId",userId);
                    temp2.put("conId",contents.get(i).getConId());
                    contents.get(i).setIsGood(this.userGoodServices.isGood(temp2));
                }
                mapper.put("myfollow",myfollow);
                mapper.put("followme",followme);
                mapper.put("planclass",planclass);
                mapper.put("myinfo",myinfo);
                mapper.put("cc",circleContent);
                mapper.put("imglist",imglist);
                mapper.put("contents",contents);
                return "comm/userfram/circledetails";
            } catch (Exception e) {
                e.printStackTrace();
                return "error/error";
            }
        }else {
            return "error/error";
        }
    }

    @RequestMapping(value = "/goodAction",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Object goodAction(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        if(result.get("userId")==null||result.get("conId")==null||result.get("flag")==null){
            mapper.put("code","1");
            mapper.put("msg","参数异常");
        }else {
            //获取用户信息
            String userId = result.get("userId").toString();
            UserEnroll myinfo = this.userEnrollService.findById(userId);
            //获取文章信息
            int conId = Integer.valueOf(result.get("conId").toString());
            CircleContent circleContent = this.circleContentServices.getUserCont(conId);
            if(myinfo!=null&&circleContent!=null){
                int flag=Integer.valueOf(result.get("flag").toString());
                Map<String, Object> temp = new HashMap<>();
                temp.put("userId",myinfo.getUserId());
                temp.put("userName",myinfo.getUserName());
                temp.put("userImg",myinfo.getUserAva());
                temp.put("conId",circleContent.getConId());
                temp.put("conCont",circleContent.getConCont());
                temp.put("goodTime",DateUtils.getCurTime());
                if(flag==0){    //加点赞
                    this.userGoodServices.insertGood(temp);
                    this.circleContentServices.goodAdd(temp);
                    mapper.put("code","0");
                    mapper.put("msg","点赞成功");
                }else if(flag==1){  //减点赞
                    this.userGoodServices.deleteGood(temp);
                    this.circleContentServices.goodSub(temp);
                    mapper.put("code","0");
                    mapper.put("msg","取消成功");
                }else {
                    mapper.put("code","1");
                    mapper.put("msg","参数异常");
                }
            }else{
                mapper.put("code","1");
                mapper.put("msg","用户信息获取错误");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "/upload")
    public String  circleupload(){
        return "comm/userfram/circleform";
    }

    @RequestMapping(value = "/classCircle")
    public String  classCircle(){
        return "comm/userfram/classCircle";
    }

    @RequestMapping(value = "/chatRoom")
    public String  chatRoom(){
        return "comm/userfram/chatroom";
    }

}
