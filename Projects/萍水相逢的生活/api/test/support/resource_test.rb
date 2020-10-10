module Resources
  class Test < Models::Test
    include Rack::Test::Methods

    def app
      Resources::Index
    end

    def last_response_json
      @_last_response_json ||= JSON.parse(last_response.body)
    end
  end
end
