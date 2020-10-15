package ZMetalHeartY.yuanpin.Operators;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet("/MessageFileUpload")
public class MessageFileOperater extends HttpServlet {

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		ServletFileUpload servletFileUpload = new ServletFileUpload(new DiskFileItemFactory());
		String Filename = null;
		String pathstr = null;
		File file = null;
		List<FileItem> list = null;

		try {
			list = servletFileUpload.parseRequest(req);
			for (FileItem fileItem : list) {
				if (!fileItem.isFormField()) {

					Filename = System.currentTimeMillis() + "R" + (int) (Math.random() * 10000) + "R"
							+ (int) (Math.random() * 10000) + fileItem.getName();
					pathstr = "/usr/local/tomcatSource/UserMessages";
					file = new File(pathstr, Filename);
					
					fileItem.write(file);
					
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.write("/UserMessages/"+Filename);
		out.close();
	}
}
