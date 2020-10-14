// 递归目录树（只能用同步，用异步会出现后面的文件比前面的文件先输出，顺序会乱。）
// 默认按照ASCII码的顺序，例如js里面的sort()函数。
 
// 先写一层的情况
// 抽象递归参数
// 找到突破点（避免死循环）
//   自己调自己，某种情况（肯定会存在的）不调用
 
 
const fs = require('fs');
const path = require('path');
 
// 获取当前有没有传入目标路径
var target = path.join(__dirname, process.argv[2] || './');

function changstrs(str){
    //D:\webnews\xzy\demo\node_modules\@babel\runtime\helpers
    let ss = "";

    for(var s=0;s<str.length;s++){
        let item = str[s];

        if((item!="/" &&  item!="@") && item!=":"){
            ss+=item;
        }
    }
    

    /* str.forEach((item,index)=>{
        if((item!="/" &&  item!="@") && item!=":"){
            ss+=item;
        }
    }) */


    return ss;
}

 
function load(target, depth) {
  // depth  0 = ''
  // depth  1 = '│ '
  // depth  2 = '│ │ '
  var prefix = new Array(depth + 1).join('│ ');// join()函数的妙用
  //console.log("target",target);
  //console.log("target",depth);

  let ssf = changstrs(target);
  if(ssf.indexOf("node_modules") != -1 ){//如果是npm包
    return false;
  }
 
  //  读取一个目录的内容，返回一个不包括 '.' 和 '..' 的文件名的数组。
  var dirinfos = fs.readdirSync(target);
 
  var dirs = [];
  var files = [];
 
  dirinfos.forEach(info=> {
    // 返回一个 fs.Stats 实例
    var stats = fs.statSync(path.join(target, info));
    if (stats.isFile()) {
      files.push(info);
    } else {
      dirs.push(info);
    }
  });
 
  dirs.forEach(dir=> {
    console.log(`${prefix}├─${dir}`); // node_modules
    // 当前是一个目录 需要深入进去
    load(path.join(target, dir), depth + 1);
  });
 
  var count = files.length - 1;  // 此处必须-1与下面的count--想对应
  files.forEach(file=> {
    var temp = count-- ? '├' : '└';  // 三元运算符的妙用
    console.log(`${prefix}${temp}─${file}`);
  });
}
 
load(target, 0);