# 该文件一定要最先引用
require 'rubygems'
require 'bundler/setup'
require 'minitest/autorun'

ENV['RACK_ENV'] = 'test'

require_relative '../config/environment.rb'
require_relative 'support/model_test'
require_relative 'support/resource_test'
