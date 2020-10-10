ENV['RACK_ENV'] ||= 'development'
Bundler.require(:default, ENV['RACK_ENV'])
require_relative '../lib/autoload'

Object.autoload_all('app/common')
module Resources
  autoload_all('app/resources')
end
module Entities
  autoload_all('app/entities')
end
Object.autoload_all('app/models')
Object.autoload_all('app/policies') { |const_name| const_name + 'Policy' }

Config.load_and_set_settings(
  'config/settings.yml',
  "config/settings/#{ENV['RACK_ENV']}.yml",
  "config/environments/#{ENV['RACK_ENV']}.yml",
  'config/settings.local.yml',
  "config/settings/#{ENV['RACK_ENV']}.local.yml",
  "config/environments/#{ENV['RACK_ENV']}.local.yml"
)

OTR::ActiveRecord.configure_from_file! 'config/database.yml'
ActiveRecord::Base.logger = Logger.new(STDOUT, level: Logger::INFO)
