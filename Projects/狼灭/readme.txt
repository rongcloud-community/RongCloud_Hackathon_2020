使用ant和maven来管理项目

Author: EasyJF WilliamRaym


	5:05 2006-6-15
最初测试

	17:02 2006-6-15
第二次发布测试

	23:24 2006-6-15
加入compile jar war test test-report eclipse Myeclipse maven-jar 

	2:08 2006-6-16
test test-report idea jbuilder netbean 还未完成

	17:43 2006-6-22
添加maven简介


感谢您使用我们的EasyJF开源系列！

	技术进步、提高软件生产力、实现最大社会效益是我们不懈追求的目标。
“简易、实用才是硬道理”、“让J2EE应用开发变得更加轻松、简单”是我们团队的理念。
您可以从官方网站得到更多信息http://www.easyjf.com/

目录介绍：

EasyJF源码结构
--./
--../
  |--bin        Build程序目录
  |--src        源代码目录
  |--lib        项目jar包目录
     |--build   项目Build jar包目录
  |--pom.xml    Maven项目定义文件
  |--build.xml  Ant Build定义文件
  |--build      程序编译目录
  |--release    程序发布目录
  |--webapps    web根目录
  |--misc       杂项、IDE配置文件


入门：
	我认为最好开始学习一门技术的方法,是有一条正确、便捷的路。
这就是为什么我们开发出最简易的框架，也是为何取名为EasyJF的缘由。
您可以使用本框架快速开始（请阅读Example部分开始学习或架构您自已的项目）：

	* 打开一个命令行窗口，切换到项目根目录下的bin目录。
	* 用java5 JDK执行。
	* 您可以用任意支持UTF-8的编辑器去编辑源文件，比如：.java、.jsp等等，源程序都在src目录下。

寻求帮助：
	您可以从团队开发人员或开发社区中发贴得到您想要的帮助。
文档：
	运行build后输入javadoc,会在您的docs目录下生成所有API文档。
编译：
	运行build后输入compile,会在您的build目录下生成classes目录和相关项目文件。
发布：
	运行build后输入jar或者war，会在您的release目录下生成相应的文件。
清理：
	运行build后输入clean，可以清除上面编译生成的所有文件，还原到原始状态。
IDE转换：
	运行build后输入要转换的IDE名，然后导入到IDE中即可。



Maven简介：

	Apache Maven一个潜在的基于java的apache ant的构建工具的替代者。两者之间的比较： 
　　第一：ant脚本是可以直接运行在maven中的。maven和ant最大的差别就是在于maven的编译以及所有的脚本都有一个基础，就是POM（project object model）。这个模型定义了项目的方方面面，然后各式各样的脚本在这个模型上工作，而ant完全是自己定义，显然maven更胜一筹。 
　　第二：Maven对所依赖的包有明确的定义，如使用那个包，版本是多少，一目了然。而ant则通常是简单的inclde 所有的jar。导致的最终结果就是，你根本无法确定JBoss中的lib下的common－logging 是哪个版本的，唯一的方法就是打开 META－INF 目录下MANIFEST.MF。估计JBoss迟早会转向Maven的。 
　　第三：Maven是基于中央仓库的编译，即把编译所需要的资源放在一个中央仓库里，如jar，tld，pom，等。当编译的时候，maven会自动在仓库中找到相应的包，如果本地仓库没有，则从设定好的远程仓库中下载到本地。这一切都是自动的，而ant需要自己定义了。这个好处导致的结果就是，用maven编译的项目在发布的时候只需要发布源码，小得很，而反之，ant的发布则要把所有的包一起发布，显然maven又胜了一筹。 
　　第四：maven有大量的重用脚本可以利用，如生成网站，生成javadoc，sourcecode reference，等。而ant都需要自己去写。试试 maven site 的效果。 
　　第五：maven目前不足的地方就是没有象ant那样成熟的GUI界面，不过mavengui正在努力中。目前使用maven最好的方法还是命令行，又快又方便。


