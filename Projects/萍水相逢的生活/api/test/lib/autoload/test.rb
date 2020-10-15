# 注：不能调用 require('test_helper')，因为它会引入 autoload 机制。
# 另外，这个测试的类加载机制与正常项目的不一致，所以它不能与项目的单元测试同时运行。

require 'bundler/setup'
require 'minitest/autorun'
require_relative '../../../lib/autoload'

# module 的定义不能放在方法内
module Resources
  autoload_all 'test/lib/autoload/resources'
end

class AutoloadTest < Minitest::Test
  def test_autoload_models
    Object.autoload_all('test/lib/autoload/models')
    assert Post
  end

  def test_autoload_resources
    assert Resources::Posts
  end

  def test_autoload_policies
    Object.autoload_all('test/lib/autoload/policies1') do |const_name|
      const_name + 'Policy'
    end

    assert PostPolicy
  end

  def test_autoload_policies2
    Object.autoload_all('test/lib/autoload/policies2') do |const_name|
      if const_name == 'User'
        'UserPolicy'
      else
        false
      end
    end

    assert UserPolicy
    assert_raises(NameError) { NonePolicy }
  end
end
