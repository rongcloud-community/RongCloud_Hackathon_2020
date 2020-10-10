# 脚本文件编写和运行的规则

Ruby 语言编写的脚本文件，推荐都放在该目录下面。应在脚本文件开头位置编写注释文档，标明该脚本的

- 功能
- 调用示例
- 参数说明
- 注意事项
- 等。

脚本文件需要依赖项目的环境，如数据库、自动引入常量的机制等。为了做到，需要借助`bin/run`命令运行脚本。例如`scripts/demo.rb`脚本，运行方式应为：

    bin/run scripts/demo.rb arguments

## 编写脚本的规范

虽然仅仅是脚本，但仍然需要认真对待代码。

### 命令行参数的规范

命令行参数应当遵循 UNIX 风格。对于不清楚 UNIX 风格的命令行选项的，应自行查找资料。简单来说，你要写一套支持长短选项的命令行参数，如：

    bin/run scripts/demo.rb -i source_dir --output output_dir -v --no-deamon file1 file2

而不是像下面这样：

    bin/run scripts/demo.rb source_dir output_dir true false  file1 file2

Ruby 标准库自带一套解析命令行参数的工具：'optparse'. 虽然说也有第三方的 gem，如 'Gli'、'Choise' 等，但自带的功能已经足够了，而且这类第三方的 gem 在我看来并不够优秀。

想了解 'optparse' 的用法，可以阅读下面这一篇写的并不怎么样的教程：

> [用 OptionParser 构建 Command Line 工具](https://ruby-china.org/wiki/building-a-command-line-tool-with-optionparser)

但我建议，有条件的，直接阅读官方文档：

> [OptionParser](https://ruby-doc.org/stdlib-2.6.4/libdoc/optparse/rdoc/OptionParser.html)

本项目下用'optparse'解析的一个比较好的例子是，阅读`scripts/import_wanfang_data.rb`的`parse_options`方法。

### 处理文件路径的方法

脚本中当遇到文件路径的时候，极其不建议使用字符串拼接的方式，例如 `'foo/' + 'bar/' + 'demo.txt'` 这种。Ruby 标准库已经自带处理文件路径的方法，如 `File.join`，以及全能`Pathname`类。仔细阅读它们的文档了解使用方法。 

### 控制台输出

脚本执行期间要在控制台打印出输出，尤其是那些长时间运行的脚本。通过控制台的不断输出，最起码我是知道脚本是正在工作的，而不是卡在某一个位置。尽量提供一些有用的输出，辅助我们了解执行的进度、关键参数和状态等重要信息。

### 错误处理

对于错误的处理相当重要。不要想当然地处理错误，不知道怎么处理的情况下倒不如什么也不错，让程序异常退出。**尤其记住，不要压制异常。**

常见的一种错误处理方式是将错误记录下来，然后继续处理下一个数据。认真考虑你要记下的内容。还有，你的错误要记录在哪里最好用命令行参数指定，最好是必须参数，而不是硬核地写死在一个文件里。
