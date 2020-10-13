package com.aihome.jythonplug;

import org.python.util.PythonInterpreter;

public class pythonRunTest {
    public static void main(String[] args) {
        PythonInterpreter pi = new PythonInterpreter();
        pi.exec("a='test'");
        pi.exec("print(a)");
    }
}
