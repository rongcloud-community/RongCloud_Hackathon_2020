
function AreaManager()
{
	var nowPro   = '广东省';
	var nowCity  = '广州市';
	var pro_City = new Array();
	var province = '--请选择--,北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏自治区,新疆自治区,香港特别行政区,澳门特别行政区,台湾省,其它';

	pro_City[0]  = '--请选择--';
	pro_City[1]  = '北京市';
	pro_City[2]  = '天津市';
	pro_City[3]  = '河北省,石家庄市,唐山市,秦皇岛市,邯郸市,邢台市,保定市,张家口市,承德市,沧州市,廊坊市,衡水市';
	pro_City[4]  = '山西省,太原市,大同市,阳泉市,长治市,晋城市,朔州市,晋中市,运城市,忻州市,临汾市,吕梁市';
	pro_City[5]  = '内蒙古自治区,呼和浩特市,包头市,乌海市,赤峰市,通辽市,鄂尔多斯市,呼伦贝尔市,巴彦淖尔市,乌兰察布市,锡林浩特市,乌兰浩特市';
	pro_City[6]  = '辽宁省,沈阳市,大连市,鞍山市,抚顺市,本溪市,丹东市,锦州市,葫芦岛市,营口市,盘锦市,阜新市,辽阳市,铁岭市,朝阳市';
	pro_City[7]  = '吉林省,长春市,吉林市,四平市,辽源市,通化市,白山市,松原市,白城市,延吉市';
	pro_City[8]  = '黑龙江省,哈尔滨市,齐齐哈尔市,鹤岗市,双鸭山市,鸡西市,大庆市,伊春市,牡丹江市,佳木斯市,七台河市,黑河市,绥化市';
	pro_City[9]  = '上海市';
	pro_City[10] = '江苏省,南京市,无锡市,徐州市,常州市,苏州市,南通市,连云港市,淮安市,盐城市,扬州市,镇江市,泰州市,宿迁市';
	pro_City[11] = '浙江省,杭州市,宁波市,温州市,嘉兴市,湖州市,绍兴市,金华市,衢州市,舟山市,台州市,丽水市';
	pro_City[12] = '安徽省,合肥市,芜湖市,蚌埠市,淮南市,马鞍山市,淮北市,铜陵市,安庆市,黄山市,滁州市,阜阳市,宿州市,巢湖市,六安市,亳州市,池州市,宣城市';
	pro_City[13] = '福建省,福州市,厦门市,莆田市,三明市,泉州市,漳州市,南平市,龙岩市,宁德市';
	pro_City[14] = '江西省,南昌市,景德镇市,萍乡市,新余市,九江市,鹰潭市,赣州市,吉安市,宜春市,抚州市,上饶市';
	pro_City[15] = '山东省,济南市,青岛市,淄博市,枣庄市,东营市,潍坊市,烟台市,威海市,济宁市,泰安市,日照市,莱芜市,德州市,临沂市,聊城市,滨州市,菏泽市';
	pro_City[16] = '河南省,郑州市,开封市,洛阳市,平顶山市,焦作市,鹤壁市,新乡市,安阳市,濮阳市,许昌市,漯河市,三门峡市,南阳市,商丘市,信阳市,周口市,驻马店市,济源市';
	pro_City[17] = '湖北省,武汉市,黄石市,襄樊市,十堰市,荆州市,宜昌市,荆门市,鄂州市,孝感市,黄冈市,咸宁市,随州市,恩施市,仙桃市,天门市,潜江市';
	pro_City[18] = '湖南省,长沙市,株洲市,湘潭市,衡阳市,邵阳市,岳阳市,常德市,张家界市,益阳市,郴州市,永州市,怀化市,娄底市,吉首市';
	pro_City[19] = '广东省,广州市,深圳市,珠海市,汕头市,韶关市,佛山市,江门市,湛江市,茂名市,肇庆市,惠州市,梅州市,汕尾市,河源市,阳江市,清远市,东莞市,中山市,潮州市,揭阳市,云浮市';
	pro_City[20] = '广西自治区,南宁市,柳州市,桂林市,梧州市,北海市,防城港市,钦州市,贵港市,玉林市,百色市,贺州市,河池市,来宾市,崇左市';
	pro_City[21] = '海南省,海口市,三亚市';
	pro_City[22] = '重庆市';
	pro_City[23] = '四川省,成都市,自贡市,攀枝花市,泸州市,德阳市,绵阳市,广元市,遂宁市,内江市,乐山市,南充市,宜宾市,广安市,达州市,眉山市,雅安市,巴中市,资阳市,西昌市';
	pro_City[24] = '贵州省,贵阳市,六盘水市,遵义市,安顺市,铜仁市,毕节市,兴义市,凯里市,都匀市';
	pro_City[25] = '云南省,昆明市,曲靖市,玉溪市,保山市,昭通市,丽江市,思茅市,临沧市,景洪市,楚雄市,大理市,潞西市';
	pro_City[26] = '西藏自治区,拉萨市,日喀则市';
	pro_City[27] = '陕西省,西安市,铜川市,宝鸡市,咸阳市,渭南市,延安市,汉中市,榆林市,安康市,商洛市';
	pro_City[28] = '甘肃省,兰州市,金昌市,白银市,天水市,嘉峪关市,武威市,张掖市,平凉市,酒泉市,庆阳市,定西市,陇南市,临夏市,合作市';
	pro_City[29] = '青海省,西宁市,德令哈市,格尔木市';
	pro_City[30] = '宁夏自治区,银川市,石嘴山市,吴忠市,固原市,中卫市';
	pro_City[31] = '新疆自治区,乌鲁木齐市,克拉玛依市,吐鲁番市,哈密市,和田市,阿克苏市,喀什市,阿图什市,库尔勒市,昌吉市,博乐市,伊宁市,塔城市,阿勒泰市,石河子市,阿拉尔市,图木舒克市,五家渠市,';
	pro_City[32] = '香港特别行政区';
	pro_City[33] = '澳门特别行政区';
	pro_City[34] = '台湾省,台北市,高雄市,基隆市,台中市,台南市,新竹市,嘉义市';
	pro_City[35] = '其它';

	this.initElem = function(p, c)
	{
		var Array_city;
		var Array_province;

		Array_province = province.split(',');

		for (i = 0; i < Array_province.length; i ++)
		{
			document.getElementById(p).options.add(new Option(Array_province[i], i));

			if (nowPro == Array_province[i])
			{
				document.getElementById(p)[i].selected = true;
				Array_city = pro_City[i].split(',');

				if (Array_city.length > 1)
				{
					for (j = 0; j < Array_city.length; j ++)
					{
						document.getElementById(c).options.add(new Option(Array_city[j], j));

						if (nowCity == Array_city[j])
							document.getElementById(c)[j].selected = true;
					}
				}
				else
					document.getElementById(c).options.add(new Option(pro_City[i], 0));
			}
		}
	}

	this.onPSelectChange = function(p, c)
	{
		var nowSelectIndex = document.getElementById(p).selectedIndex;

		for (i = document.getElementById(c).length - 1; i >= 0; i --)
			document.getElementById(c).options.remove(i);

		var Array_city = pro_City[nowSelectIndex].split(',');

		if (Array_city.length > 1)
		{
			for (j = 1; j < Array_city.length; j ++)
			{
				document.getElementById(c).options.add(new Option(Array_city[j], j));

				if (nowCity == Array_city[j])
					document.getElementById(c)[j].selected = true;
			}
		}
		else
			document.getElementById(c).options.add(new Option(pro_City[nowSelectIndex], 0));
	}

	this.onCChange = function(boxName, p, c)
	{
		eval("frm." + boxName).value =
			document.getElementById(p)[document.getElementById(p).selectedIndex].innerText
			+ '-' + document.getElementById(c)[document.getElementById(c).selectedIndex].innerText;
		//alert(eval("frm." + boxName).value);
	}

	this.setP = function(p)
	{
		nowPro = p;
	}

	this.setC = function(c)
	{
		nowCity = c;
	}
}
