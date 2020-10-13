/**
 * �ļ�����: Ajax.js
 * �ļ�����: Ajax ��������ͬ�����첽�������⼶�˵�����
 * �ļ�����: kering
 * ��������: 2005-10-10
 * �汾���: 1.2
 * �޸ļ�¼: 
 */


	/**
	 * ��������: XmlHttp
	 * ��������: ���� Ajax �¼�
	 * �������:
	 * ��������: XML �����ĵ�����
	 * �׳��쳣: 
	 * ����ʾ��: 
	 *
	 *   var testXH = new XmlHttp();
	 *
	 *   if (testXH.init())
	 *   {
	 *      // ͬ������ʱֱ�ӷ��ص� XML �ĵ�����
	 *      var xmlDOM = testXH.loadXMLDoc(sUrl, sParam, false, "");
	 *
	 *      // �첽����ʱ
	 *      testXH.loadXMLDoc(sUrl, sParam, true, "testfuc");
	 *   }
	 */
	function XmlHttp()
	{
		// ������� xmlHttp
		var xmlHttp = null;
		// �첽����ʽ���������
		var fucName = "doReady(xmlRoot, eventList)";
		// ��ȡ�� XML ���ݺ�Ĵ����¼�����
		var eventList = ["alert(xmlRoot)"];
		// ��Ϣ��ʾ����
		var infShow = null;

		// �Ƿ�Ϊ debug ����
		this.isDebug = false;
		// ��Ϣ��ʾ DIV �� ID
		this.layerID = "pleaseWaitScreen";

		/**
		 * ��������: init
		 * ��������: �� xmlHttp ������г�ʼ������
		 * �������:
		 * ��������: xmlHttp
		 * �׳��쳣: 
		 */
		this.init = function()
		{
			if (window.XMLHttpRequest)
			{
				// ���� Mozilla/FireFoxƽ̨�� XMLHttpRequest ����
				xmlHttp = new XMLHttpRequest();
			}
			else if (window.ActiveXObject)
			{
				// ���� IE/Windows ƽ̨��XMLHttp����
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

			// �����ǰ������ ��Debug ����������ʾ Debug ��Ϣ����Ϣ��ʾ��
			if (this.isDebug == false)
				infShow = new InfoLayerManager();

			return (xmlHttp != null)
		}

		/**
		 * ��������: loadXMLDoc
		 * ��������: ��ָ��URL��ͬ��/�첽��ʽ��true Ϊͬ������֮�첽������XML�ĵ����ݶ���
		 * �������:
		 *  @param url �����ַ
		 *  @param param ��������
		 *  @param sync ����ʽ
		 * ����˵��: �������ʽΪͬ������ sync Ϊ true
		 *          ��ʱ loadXMLDoc ���᷵�� XML �ĵ�����
		 *          �������ʽΪ�첽��������д doReady ����
		 *          ���� setFuction �����޸ı��� fucName
		 */
		this.loadXMLDoc = function(url, param, sync)
		{
			// ͬ����ʽ
			if (sync == true)
				return this.doSync(url, param);
			// �첽��ʽ
			else
				this.doAsync(url, param);
		}

		/**
		 * ��������: doSync
		 * ��������: ͬ������ʽ
		 * �������:
		 *  @param url �����ַ
		 *  @param param ��������
		 * ��������: XML �ĵ�����
		 * �׳��쳣: Exception
		 */
		this.doSync = function(url, param)
		{
			try
			{
				// �� POST�����첽��ʽ���������ַ��
				xmlHttp.open("POST", url, false);
				// �����ύ���ݵĸ�ʽΪForm����ʽ��
				// ��Ҫ����xml��ʽ�����ݣ�������ע�͵����ɡ�
				// ������ʽָ��Ϊ"Content-Type", "text/xml; charset=utf-8"
				xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				// ��������
				xmlHttp.send(param);

				return xmlHttp.responseXML.documentElement;

			} catch (exception) { doException("[Exception][doSync]:" + exception); }
		}

		/**
		 * ��������: doAsync
		 * ��������: �첽����ʽ
		 * �������:
		 *  @param url �����ַ
		 *  @param param ��������
		 * ��������: 
		 * �׳��쳣: Exception
		 */
		this.doAsync = function(url, param)
		{
			try
			{
				// �� POST���첽��ʽ���������ַ��
				xmlHttp.open("POST", url, true);
				// �����ύ���ݵĸ�ʽΪForm����ʽ��
				// ��Ҫ����xml��ʽ�����ݣ�������ע�͵����ɡ�
				// ������ʽָ��Ϊ"Content-Type", "text/xml; charset=utf-8"
				xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				// ÿ��״̬�ı��������¼����¼��������
				xmlHttp.onreadystatechange = this.onReadySync;
				// ��������
				xmlHttp.send(param);

			} catch (exception) { doException("[Exception][doAsync]:" + exception); }
		}

		/**
		 * ��������: onReadySync
		 * ��������: ÿ��״̬�ı��������¼����¼��������
		 *          ����״ֵ̬ readyState ��
		 *          0 = δ��ʼ����uninitialized��
		 *          1 = ���ڼ��أ�loading��
		 *          2 = ������ϣ�loaded��
		 *          3 = ������interactive��
		 *          4 = ��ɣ�complete��
		 *
		 *          responseText �ӷ��������̷��ص����ݵ��ַ�����ʽ
		 *          responseXML �ӷ��������̷��ص�DOM���ݵ��ĵ����ݶ���
		 */
		this.onReadySync = function()
		{
			// ��״̬Ϊ���ʱ
			if (xmlHttp.readyState == 4)
			{
				// �ӷ��������ص����ִ��� status������404��δ�ҵ�����200��������
				if (xmlHttp.status == 200)
				{
					// ȡ XML ���ڵ�����
					xmlRoot = xmlHttp.responseXML.documentElement;
					// ���ô�����
					eval(fucName);
				}
				else
					doException("[Exception][onReadySync]There was a problem with the request.");
			}
		}

		/**
		 * ��������: doReady
		 * ��������: �첽���������
		 * �������:
		 *  @param xmlRoot XML���ڵ�����
		 * ��������: xmlRoot XML���ڵ�����
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
			//	alert("�����µ�¼��");
				//window.location.href = "login/login.htm";
			//else
			//	alert("�쳣��");
		}

		/**
		 * ��������: setFuction
		 * ��������: �����ⲿ�ṩ���첽�����������
		 * �������:
		 *  @param fName ������
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
		 * ��������: doException
		 * ��������: ������Ϣ����ʾ��ʽ����ӡ��Ϣ
		 * �������:
		 *  @param eString ��Ϣ
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
	 * ��������: InfoLayerManager
	 * ��������: ��Ϣ��ʾ����ʾ�����ã����غ���յȲ���
	 * ����ʾ��: 
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
		 * ��������: showLayer
		 * ��������: ������ڸ���Ϣ�㣬��ʾ��������Ϣ�������ʾ���֣�����Ϊ���Ӻ���д���ַ�ʽ
		 * �������:
		 *  @param LayerID ��Ϣ��ID
		 *  @param LayerText ��ʾ����
		 *  @param isAppend �Ƿ���д��true Ϊ��д����֮�¼ӣ�
		 */
		this.showLayer = function(LayerID, LayerText, isAppend)
		{
			// ��ȡ�ò㱣��Ϊ����
			var obj = document.getElementById(LayerID);

			// ������ڸö���
			if (obj != null)
			{
				// ��ʾ
				obj.style.visibility = "visible";

				// ��д
				if (isAppend)
				{
					// ��¼ԭ�е���Ϣ
					var oText = document.getElementById(LayerID + "Text").innerHTML;
					document.getElementById(LayerID + "Text").innerHTML = oText + "<br/>" + LayerText;
				}
				// �����¼�
				else
					document.getElementById(LayerID + "Text").innerHTML = LayerText;
			}
		}

		/**
		 * ��������: hideLayer
		 * ��������: ������ڸ���Ϣ�㣬���ظ���Ϣ��
		 * �������:
		 *  @param LayerID ��Ϣ��ID
		 */
		this.hideLayer = function(LayerID)
		{
			var obj = document.getElementById(LayerID);

			if (obj != null)
				// ����
				obj.style.visibility = "hidden";
		}

		/**
		 * ��������: clearLayer
		 * ��������: �����Ϣ��ԭ�е���Ϣ
		 * �������:
		 *  @param LayerID ��Ϣ��ID
		 */
		this.clearLayer = function(LayerID)
		{
			var obj = document.getElementById(LayerID);

			if (obj != null)
				obj.innerHTML = "";
		}
	}