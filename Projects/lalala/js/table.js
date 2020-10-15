

function TableCreateManager()
{
	this.tbTitle = ["第一栏", "第二栏", "第三栏", "第四栏"];
	this.rowType = ["String", "String", "String", "String", "String"];
	this.nodeName = ["R_1", "R_2", "R_3", "R_4"];
	this.celalign = ["center", "center", "center", "center"];
	this.divId = "data";
	this.tbId  = "datatable";
	this.tbBorder = "0";
	this.tbWidth  = "100%";
	this.tb = null;

	this.xmlRoot = null;

	this.init = function()
	{
		var len = this.tbTitle.length;

		if (this.rowType.length != len ||
			this.nodeName.length != len ||
			this.nodeName.length != len ||
			this.celalign.length != len)
			return false;
	}

	this.createTable = function()
	{
		// 表格属性
		var tb = document.createElement("TABLE")
		tb.id = this.tbId;
		tb.border = this.tbBorder;
		tb.width = this.tbWidth;
		/*tb.onclick = function(e) {
			if (document.all) var e = event;
			sortColumn(e);
		}*/

		// 表头
		var th = tb.createTHead();
		var row = th.insertRow();

		for (var i = 0, n = this.tbTitle.length; i < n; i ++)
		{
			var cell = row.insertCell();
			cell.type = this.rowType[i] == null ? "String" : this.rowType[i];
			cell.align = "center";
			cell.innerHTML = this.tbTitle[i];
		}

		// 表身
		//this.addRowCell(tb);
		this.tb = tb;

		// 加到 dataDiv 里
		/*var obj = document.getElementById(this.divId);

		if (obj != null)
		{
			obj.innerHTML = "";

			if (document.getElementById(this.tbId) != null)
				this.removeTb(this.tbId);

			obj.appendChild(tb);
		}*/
	}
	
	// 创建表格数据内容
	//this.addRowCell = function(tb)
	this.addRowCell = function()
	{
		for (i = 0, n = this.xmlRoot.childNodes.length; i < n; i ++)
		{
			var row = this.tb.insertRow();

			for (var j = 0, m = this.nodeName.length; j < m; j ++)
			{
				var cell = row.insertCell();
				cell.innerHTML = this.xmlRoot.getElementsByTagName(this.nodeName[j])[i].firstChild.data;
				cell.align = (this.celalign[i] == null || this.celalign[i] == "") ? "center" : this.celalign[i];
			}
		}
	}

	this.append = function()
	{
		// 加到 dataDiv 里
		var obj = document.getElementById(this.divId);

		if (obj != null)
		{
			obj.innerHTML = "";

			if (document.getElementById(this.tbId) != null)
				this.removeTb(this.tbId);

			obj.appendChild(this.tb);
		}
	}

	// 清除表格
	this.removeTb = function(tbid)
	{
		var tb = document.getElementById(this.divId);
		if (tb)
			tb.parentNode.removeChild(tb);
	}
}




function TablePagesSet()
{
	this.xmlRoot = null;
	this.url = null;
	this.param = "";
	this.page = 1;
	this.pagesize = 5;

	this.setCountsLabel = function(attrname, labid)
	{
		var count = this.xmlRoot.getAttribute(attrname);

		var obj = document.getElementById(labid);

		if (obj != null)
			obj.innerHTML = count;
	}

	this.setCurPageLable = function(labid)
	{
		var obj = document.getElementById(labid);

		if (obj != null)
			obj.innerHTML = this.page;
	}

	this.setPageLable = function(attrname, xhManager, evenList, pageid, selfName)
	{
		var obj1 = document.getElementById(pageid[0]);
		var obj2 = document.getElementById(pageid[1]);
		var obj3 = document.getElementById(pageid[2]);
		var obj4 = document.getElementById(pageid[3]);

		if (obj1 != null && obj2 != null && obj3 != null && obj4 != null)
		{
			var count = this.xmlRoot.getAttribute(attrname);

			if (this.page > 1)
				obj1.innerHTML = "<a href=\"javascript:loadData(" + xhManager + ", " + evenList + ", " + selfName + ".url, " + selfName + ".setParam(1))\">首页</a>";
			else
				obj1.innerHTML = "首页";

			if (this.page > 1)
				obj2.innerHTML = "<a href=\"javascript:loadData(" + xhManager + ", " + evenList + ", " + selfName + ".url, " + selfName + ".setParam(" + selfName + ".page - 1))\">上一页</a>";
			else
				obj2.innerHTML = "上一页";

			if (this.page < count / this.pagesize)
				obj3.innerHTML = "<a href=\"javascript:loadData(" + xhManager + ", " + evenList + ", " + selfName + ".url, " + selfName + ".setParam(" + selfName + ".page + 1))\">下一页</a>";
			else
				obj3.innerHTML = "下一页";

			if (this.page < count / this.pagesize)
				obj4.innerHTML = "<a href=\"javascript:loadData(" + xhManager + ", " + evenList + ", " + selfName + ".url, " + selfName + ".setParam(Math.floor(" + count + "/" + selfName + ".pagesize) + 1))\">末页</a>";
			else
				obj4.innerHTML = "末页";
		}
	}

	this.setParam = function(p)
	{
		this.page = p;
		return "page=" + p + this.param;
	}
}