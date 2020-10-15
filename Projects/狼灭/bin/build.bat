@echo off
title EasyJF
color a
rem by easyjf williamraym 16:46 2006-6-15
if "%OS%"=="Windows_NT" SETLOCAL
:init
if "%JAVA_HOME%"=="" goto nojava
goto main
goto eof

:main
"%JAVA_HOME%\bin\java.exe" -cp "../lib/build/ant.jar;../lib/build/ant-nodeps.jar;../lib/build/ant-junit.jar;../lib/build/junit-3.8.1.jar;%JAVA_HOME%/lib/tools.jar" org.apache.tools.ant.Main -f ../build.xml %1
goto eof

:nojava
echo 在您的操作系统上没有安装JAVA运行环境，请先设置JAVA_HOME环境变量或安装JDK
goto eof

:eof
@pause

if "%OS%"=="Windows_NT" ENDLOCAL
