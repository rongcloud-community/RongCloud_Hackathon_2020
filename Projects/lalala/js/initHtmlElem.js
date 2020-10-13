/**
 * �ļ�����: initHtmlElem.js
 * �ļ�����: initHtmlElem ��
 * �ļ�����: kering
 * ��������: 2006-01-13
 * �汾���: 1.0
 * �޸ļ�¼: 
 */


	/**
	 * ��������: initHtmlElem
	 * ��������: ����ָ����ֵ��ʼ�� HTML ҳ��Ԫ��
	 * �������:
	 * ��������: 
	 * �׳��쳣: 
	 * ����ʾ��: 
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
		 * ��������: setCheckBox
		 * ��������: ���õ�ѡ��
		 * �������:
		 *  @param sBoxName ��ѡ���ID
		 *  @param sBoxVal  ��ѡ�е�ѡ���ֵ
		 * ��������: 
		 * �׳��쳣: 
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
		 * ��������: setCheckBox
		 * ��������: ���������б�
		 * �������:
		 *  @param sBoxName �����б��ID
		 *  @param sBoxVal  ��ѡ�е��������ֵ
		 * ��������: 
		 * �׳��쳣: 
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
		 * ��������: setMuliCBox
		 * ��������: ���ö�ѡ��
		 * �������:
		 *  @param sBoxName ��ѡ���ID
		 *  @param sBoxVal  �� 1 �� 0 ����ֵ��1 Ϊѡ�У�0 ��֮��
		 * ��������: 
		 * �׳��쳣: 
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