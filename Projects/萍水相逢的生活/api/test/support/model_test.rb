require 'active_record/fixtures'

FactoryBot.find_definitions

ActiveRecord::Base.logger = nil
ActiveRecord::Migration.verbose = false

DatabaseCleaner.strategy = :transaction

module Models
  class Test < Minitest::Test
    include FactoryBot::Syntax::Methods

    def before_setup
      DatabaseCleaner.start
    end

    def after_teardown
      DatabaseCleaner.clean
    end

    fixture_names = Dir.glob('./test/fixtures/*.yml').map { |path| File.basename(path).sub(/\.yml$/, '') }
    fixtures = ActiveRecord::FixtureSet.create_fixtures('test/fixtures', fixture_names)
    fixtures.each do |fixture_set|
      define_method fixture_set.name do |record_name|
        id = fixture_set[record_name.to_s]['id']
        fixture_set.model_class.find(id)
      end
    end
  end
end
