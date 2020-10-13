package org.sunxin.lesson.jsp.ch09.online;

import javax.servlet.*;
import java.io.*;
import javax.servlet.http.*;
import java.util.Enumeration;

public class OnlineUser extends HttpServlet
{
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
               throws ServletException,IOException
    {
        req.setCharacterEncoding("gb2312");
        String name=req.getParameter("user");
        String pwd=req.getParameter("password");
            
        if(null==name || null==pwd || name.equals("") || pwd.equals(""))
        {
            resp.sendRedirect("login.html");
        }
        else
        {
            HttpSession session=req.getSession();
            User user=(User)session.getAttribute("user");
            if(null==user || !name.equals(user.getName()))
            {
                user=new User(name);
                session.setAttribute("user",user);
            }
            
            resp.setContentType("text/html;charset=gb2312");
            PrintWriter out=resp.getWriter();
            
            out.println("��ӭ�û�<b>"+name+"</b>��¼");
            UserList ul=UserList.getInstance();
            out.println("<br>��ǰ���ߵ��û��б�<br>");
            Enumeration<String> enums=ul.getUserList();
            int i=0;
            while(enums.hasMoreElements())
            {
                out.println(enums.nextElement());
                out.println("&nbsp;&nbsp;&nbsp;&nbsp;");
                if(++i==10)
                {
                    out.println("<br>");
                }
            }
            out.println("<br>��ǰ���ߵ��û�����"+i);
            out.println("<p><a href=logout>�˳���¼</a>");
            out.close();
        }
    }
    
    public void doPost(HttpServletRequest req, HttpServletResponse resp)
               throws ServletException,IOException
    {
        doGet(req,resp);
    }
}