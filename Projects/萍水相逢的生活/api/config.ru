require 'rubygems'
require 'bundler/setup'

require 'rack'
require 'rack/cors'
require_relative 'config/environment.rb'
require_relative 'app/resources/index'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: :any
  end
end

run Resources::Index
