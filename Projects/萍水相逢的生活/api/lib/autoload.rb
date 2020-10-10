require 'active_support/core_ext/string/inflections'

class Module
  # 为当前模块定义加载常量的方式
  MAP = proc { |path| File.basename(path, '.rb').camelize }

  def autoload_all(dir)
    dir = dir[1...-1] if dir.end_with?('/')
    Dir[dir + '/*.rb'].each do |path|
      class_name = File.basename(path, '.rb').camelize
      class_name = yield(class_name) if block_given?
      autoload class_name.to_sym, File.join(Dir.pwd, path) if class_name
    end
  end
end
