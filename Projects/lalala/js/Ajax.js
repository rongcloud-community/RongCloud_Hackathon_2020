/**
 * 文件名称: Ajax.js
 * 文件描述: Ajax 处理，包括同步及异步处理；任意级菜单关联
 * 文件作者: kering
 * 创建日期: 2005-10-10
 * 版本编号: 1.2
 * 修改记录: 
 */


	/**
	 * 　类名字: XmlHttp
	 * 功能描述: 处理 Ajax 事件
	 * 输入参数:
	 * 返回数据: XML 数据文档对象
	 * 抛出异常: 
	 * 调用示范: 
	 *
	 *   var testXH = new XmlHttp();
	 *
	 *   if (testXH.init())
	 *   {
	 *      // 同步处理时直接返回的 XML 文档数据
	 *      var xmlDOM = testXH.loadXMLDoc(sUrl, sParam, false, "");
	 *
	 *      // 异步处理时
	 *      testXH.loadXMLDoc(sUrl, sParam, true, "testfuc");
	 *   }
	 */
	function XmlHttp()
	{
		// 对象变量 xmlHttp
		var xmlHttp = null;
		// 异步处理方式结果处理函数
		var fucName = "doReady(xmlRoot, eventList)";
		// 获取到 XML 数据后的触发事件队列
		var eventList = ["alert(xmlRoot)"];
		// 信息提示变量
		var infShow = null;

		// 是否为 debug 环境
		this.isDebug = false;
		// 信息提示 DIV 的 ID
		this.layerID = "pleaseWaitScreen";

		/**
		 * 函数名字: init
		 * 功能描述: 对 xmlHttp 对象进行初始化工作
		 * 输入参数:
		 * 返回数据: xmlHttp
		 * 抛出异常: 
		 */
		this.init = function()
		{
			if (window.XMLHttpRequest)
			{
				// 创建 Mozilla/FireFox平台的 XMLHttpRequest 对象
				xmlHttp = new XMLHttpRequest();
			}
			else if (window.ActiveXObject)
			{
				// 创建 IE/Windows 平台的XMLHttp对象
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

			// 如果当前环境是 非Debug 环境，则显示 Debug 信息到信息提示层
			if (this.isDebug == false)
				infShow = new InfoLayerManager();

			return (xmlHttp != null)
		}

		/**
		 * 函数名字: loadXMLDoc
		 * 功能描述: 从指定URL以同步/异步方式（true 为同步，反之异步）加载XML文档数据对象。
		 * 输入参数:
		 *  @param url 请求地址
		 *  @param param 请求数据
		 *  @param sync 请求方式
		 * 函数说明: 如果请求方式为同步，即 sync 为 true
		 *          此时 loadXMLDoc 将会返回 XML 文档数据
		 *          如果请求方式为异步，则需重写 doReady 函数
		 *          依靠 setFuction 函数修改变量 fucName
		 */
		this.loadXMLDoc = function(url, param, sync)
		{
			// 同步方式
			if (sync == true)
				return this.doSync(url, param);
			// 异步方式
			else
				this.doAsync(url, param);
		}

		/**
		 * 函数名字: doSync
		 * 功能描述: 同步处理方式
		 * 输入参数:
		 *  @param url 请求地址
		 *  @param param 请求数据
		 * 返回数据: XML 文档数据
		 * 抛出异常: Exception
		 */
		this.doSync = function(url, param)
		{
			try
			{
				// 用 POST，非异步方式开启请求地址，
				xmlHttp.open("POST", url, false);
				// 设置提交数据的格式为Form表单格式。
				// 如要发送xml格式的数据，将此行注释掉即可。
				// 或者显式指定为"Content-Type", "text/xml; charset=utf-8"
				xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				// 发送数据
				xmlHttp.send(param);

				return xmlHttp.responseXML.documentElement;

			} catch (exception) { doException("[Exception][doSync]:" + exception); }
		}

		/**
		 * 函数名字: doAsync
		 * 功能描述: 异步处理方式
		 * 输入参数:
		 *  @param url 请求地址
		 *  @param param 请求数据
		 * 返回数据: 
		 * 抛出异常: Exception
		 */
		this.doAsync = function(url, param)
		{
			try
			{
				// 用 POST，异步方式开启请求地址，
				xmlHttp.open("POST", url, true);
				// 设置提交数据的格式为Form表单格式。
				// 如要发送xml格式的数据，将此行注释掉即可。
				// 或者显式指定为"Content-Type", "text/xml; charset=utf-8"
				xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				// 每次状态改变所触发事件的事件处理程序
				xmlHttp.onreadystatechange = this.onReadySync;
				// 发送数据
				xmlHttp.send(param);

			} catch (exception) { doException("[Exception][doAsync]:" + exception); }
		}

		/**
		 * 函数名字: onReadySync
		 * 功能描述: 每次状态改变所触发事件的事件处理程序
		 *          对象状态值 readyState ：
		 *          0 = 未初始化（uninitialized）
		 *          1 = 正在加载（loading）
		 *          2 = 加载完毕（loaded）
		 *          3 = 交互（interactive）
		 *          4 = 完成（complete）
		 *
		 *          responseText 从服务器进程返回的数据的字符串形式
		 *          responseXML 从服务器进程返回的DOM兼容的文档数据对象
		 */
		this.onReadySync = function()
		{
			// 当状态为完成时
			if (xmlHttp.readyState == 4)
			{
				// 从服务器返回的数字代码 status，比如404（未找到）或200（就绪）
				if (xmlHttp.status == 200)
				{
					// 取 XML 跟节点数据
					xmlRoot = xmlHttp.responseXML.documentElement;
					// 调用处理函数
					eval(fucName);
				}
				else
					doException("[Exception][onReadySync]There was a problem with the request.");
			}
		}

		/**
		 * 函数名字: doReady
		 * 功能描述: 异步结果处理函数
		 * 输入参数:
		 *  @param xmlRoot XML跟节点数据
		 * 返回数据: xmlRoot XML跟节点数据
		 */
		function doReady(xmlRoot, eventlist)
		{
			var rCode = xmlRoot.getAttribute("R_result");

			if (rCode == "0")
			{
				for (var i = 0, n = eventlist.length; i < n; i ++)
					eval(eventlist[i]);
			}
			//else if (rCode == "LOGIN")
			//	alert("请重新登录！");
				//window.location.href = "login/login.htm";
			//else
			//	alert("异常！");
		}

		/**
		 * 函数名字: setFuction
		 * 功能描述: 设置外部提供的异步结果处理函数名
		 * 输入参数:
		 *  @param fName 函数名
		 */
		this.setFuction = function(fName)
		{
			fucName = fName;
		}

		this.setEventList = function(eventlist)
		{
			eventList = eventlist;
		}

		/**
		 * 函数名字: doException
		 * 功能描述: 设置信息的提示方式并打印信息
		 * 输入参数:
		 *  @param eString 信息
		 */
		function doException(eString)
		{
			if (this.isDebug)
				alert(eString);
			else
				infShow.showLayer(this.layerID, eString, false);
		}
	}




	/**
	 * 　类名字: InfoLayerManager
	 * 功能描述: 信息提示层显示，设置，隐藏和清空等操作
	 * 调用示范: 
	 *
	 *   var infoManager = new InfoLayerManager();
	 *
	 *   infoManager.showLayer(LayerID, LayerText, isAppend);
	 *   infoManager.hideLayer(LayerID);
	 *   infoManager.clearLayer(LayerID);
	 */
	function InfoLayerManager()
	{
		/**
		 * 函数名字: showLayer
		 * 功能描述: 如果存在改信息层，显示并设置信息层里的提示文字，可以为续加和新写两种方式
		 * 输入参数:
		 *  @param LayerID 信息层ID
		 *  @param LayerText 提示文字
		 *  @param isAppend 是否续写（true 为续写，反之新加）
		 */
		this.showLayer = function(LayerID, LayerText, isAppend)
		{
			// 获取该层保存为对象
			var obj = document.getElementById(LayerID);

			// 如果存在该对象
			if (obj != null)
			{
				// 显示
				obj.style.visibility = "visible";

				// 继写
				if (isAppend)
				{
					// 记录原有的信息
					var oText = document.getElementById(LayerID + "Text").innerHTML;
					document.getElementById(LayerID + "Text").innerHTML = oText + "<br/>" + LayerText;
				}
				// 否则新加
				else
					document.getElementById(LayerID + "Text").innerHTML = LayerText;
			}
		}

		/**
		 * 函数名字: hideLayer
		 * 功能描述: 如果存在改信息层，隐藏该信息层
		 * 输入参数:
		 *  @param LayerID 信息层ID
		 */
		this.hideLayer = function(LayerID)
		{
			var obj = document.getElementById(LayerID);

			if (obj != null)
				// 隐藏
				obj.style.visibility = "hidden";
		}

		/**
		 * 函数名字: clearLayer
		 * 功能描述: 清除信息层原有的信息
		 * 输入参数:
		 *  @param LayerID 信息层ID
		 */
		this.clearLayer = function(LayerID)
		{
			var obj = document.getElementById(LayerID);

			if (obj != null)
				obj.innerHTML = "";
		}
	}