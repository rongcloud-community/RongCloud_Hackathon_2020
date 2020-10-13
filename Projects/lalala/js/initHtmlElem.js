/**
 * 文件名称: initHtmlElem.js
 * 文件描述: initHtmlElem 类
 * 文件作者: kering
 * 创建日期: 2006-01-13
 * 版本编号: 1.0
 * 修改记录: 
 */


	/**
	 * 　类名字: initHtmlElem
	 * 功能描述: 根据指定的值初始化 HTML 页面元素
	 * 输入参数:
	 * 返回数据: 
	 * 抛出异常: 
	 * 调用示范: 
	 *
	 *   var he = new initHtmlElem();
	 *   he.setSelectBox("test", "test");
	 *   he.setCheckBox("test", "test");
	 *   he.setMuliCBox("test", "1");
	 *
	 */
	function initHtmlElem()
	{
		/**
		 * 函数名字: setCheckBox
		 * 功能描述: 设置单选框
		 * 输入参数:
		 *  @param sBoxName 单选框的ID
		 *  @param sBoxVal  被选中的选项的值
		 * 返回数据: 
		 * 抛出异常: 
		 */
		this.setSelectBox = function(sBoxName, sBoxVal)
		{
			var obj = document.getElementById(sBoxName);

			if (obj != null)
			{
				for (var i = 0; i < obj.length; i ++)
					if (obj[i].value == sBoxVal)
						obj[i].selected = true;
			}
		}

		/**
		 * 函数名字: setCheckBox
		 * 功能描述: 设置下拉列表
		 * 输入参数:
		 *  @param sBoxName 下拉列表的ID
		 *  @param sBoxVal  被选中的下拉项的值
		 * 返回数据: 
		 * 抛出异常: 
		 */
		this.setCheckBox = function(sBoxName, sBoxVal)
		{
			var obj = document.getElementsByName(sBoxName);

			if (obj != null)
			{
				for (var i = 0; i < obj.length; i ++)
					if (obj[i].value == sBoxVal)
						obj[i].checked = true;
			}
		}

		/**
		 * 函数名字: setMuliCBox
		 * 功能描述: 设置多选框
		 * 输入参数:
		 *  @param sBoxName 多选框的ID
		 *  @param sBoxVal  有 1 和 0 两种值。1 为选中，0 反之。
		 * 返回数据: 
		 * 抛出异常: 
		 */
		this.setMuliCBox = function(sBoxName, sBoxVal)
		{
			var obj = document.getElementById(sBoxName);

			if (obj != null)
			{
				obj.checked = sBoxVal == "1" ? true : false;
			}
		}
	}