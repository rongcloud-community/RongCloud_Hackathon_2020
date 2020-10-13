package org.sunxin.lesson.jsp.ch09.online;

import javax.servlet.*;
import java.io.*;
import javax.servlet.http.*;

public class LogoutServlet extends HttpServlet
{
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
               throws ServletException,IOException
    {
        resp.setContentType("text/html;charset=gb2312");
        
        HttpSession session=req.getSession();
        User user=(User)session.getAttribute("user");
        session.invalidate();
        
        PrintWriter out=resp.getWriter();
        out.println("<html><head><title>ÍË³öµÇÂ¼</title></head><body>");
        out.println(user.getName()+"£¬ÄãÒÑÍË³öµÇÂ¼<br>");
        out.println("<a href=login.html>ÖØÐÂµÇÂ¼</a>");
        out.println("</body></html>");
        out.close();
    }
}