# 编译和构建 SQLite3 

这里，我们主要讲的是构建 sqlite3 的开发包，用于我们的 ruby 程序中。

## 安装

### 使用包管理器

包管理器一般都有 sqlite3 的安装包，只是版本可能偏老。我们要求 sqlite3 的版本不低于 3.8.

拿 yum 举例，查看安装包的版本的命令是：

    yum info sqlite-devel

安装命令是：

    yum install sqlite-devel

### 编译安装

下载源代码（amalgamation 版，带构建工具），例如：

    wget https://sqlite.org/2020/sqlite-autoconf-3310100.tar.gz

解压并进入目录：

    tar zxvf sqlite-autoconf-3310100.tar.gz
    cd sqlite-autoconf-3310100

编译、构建：

    ./configure
    make
    sudo make install

这会将 sqlite3-devel 安装在 `/usr/local` 下。如果需要指定其他位置，在构建时指定 `--prefix` 参数：

    ./configure --prefix=/opt/local

## Gem `sqlite3` 重新编译的问题

### 如何在安装时指定 `sqlite3-devel` 的路径

Gem `sqlite3` 安装时需要本地编译，以引用系统上的 `sqlite3-devel` 包。如下方式安装，它会从某个默认位置寻找。

    gem install sqlite3

如果需要指定 `sqlite3-devel` 的其他位置：

    gem install sqlit3 -- --with-sqlite3-include=/opt/local/include --with-sqlite3-lib=/opt/local/lib

如果是 `bundle` 方式安装，配置如下：

    bundle config --local build.sqlite3 --with-sqlite3-include=/opt/local/include --with-sqlite3-lib=/opt/local/lib

### 重新编译 `sqlite3` 的引发的问题

如果 gem `sqlite3` 已经安装，重装时重新指定 `sqlite3-devel` 的位置未必有效。

使用 `gem install -- --with` 指定位置的方式总是有效的。如果无效，先 `gem uninstall sqlite3` 之后一定有效。

`bundle` 配置的方式总是无效的。如果先用 `bundle` 安装了 `sqlite3`，即使再通过 `bundle config` 指定 `sqlite3-devel` 的位置，安装后引用的也是之前配置的位置。

另外，可以通过如下的 Ruby 代码查看 gem `sqlite3` 引用的 `sqlite3` 版本：

    SQLite3::SQLITE_VERSION
