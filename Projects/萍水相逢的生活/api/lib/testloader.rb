require 'bundler/setup'
require 'rake'

first_opt = ARGV.find_index { |arg| arg.start_with?('-') } || ARGV.length
files = ARGV[0...first_opt]
opts = ARGV[first_opt..-1]

files.each do |filepath|
  begin
    FileList[filepath].to_a.each do |file|
      require File.expand_path file
    end
  rescue LoadError => e
    raise unless e.path

    abort "\nFile does not exist: #{e.path}\n\n"
  end
end

ARGV.replace opts
