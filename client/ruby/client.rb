require 'net/http'
require 'json'
require 'uri'

url = URI('https://localhost:3000/graphql')
query = {
    "query" => "query { books { title id }}"
}.to_json

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true if url.scheme == 'https'
http.verify_mode = OpenSSL::SSL::VERIFY_NONE # Disable SSL verification for localhost
request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
# request["Authorization"] = "Bearer YOUR_ACCESS_TOKEN"
request.body = query

response = http.request(request)

puts(JSON.parse(response.body))