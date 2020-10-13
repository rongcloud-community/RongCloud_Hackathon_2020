#!/bin/bash
#author EasyJF Williamraym
if test -z $JAVA_HOME; then
	echo '没有JAVA环境，请先安装JAVA或设置JAVA_HOME变量'
else
	"$JAVA_HOME/bin/java" -cp ../lib/build/ant.jar:../lib/build/ant-nodeps.jar:../lib/build/ant-junit.jar:../lib/build/junit-3.8.1.jar:%JAVA_HOME%/lib/tools.jar org.apache.tools.ant.Main -f ../build.xml %1
fi