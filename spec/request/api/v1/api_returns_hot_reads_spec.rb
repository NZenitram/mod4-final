require 'rails_helper'

describe 'GET /api/v1/links' do
  it 'returns success' do
    user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))
    Link.create!(title: "Title", url: "http://www.google.com", read: true, user_id: user.id)
    Link.create!(title: "Random", url: "http://www.adfgasfg.com", read: true, user_id: user.id)
    Link.create!(title: "Bad", url: "http://www.gasdfasdf.com", read: true, user_id: user.id)

    get "/api/v1/links"

    exercises_json = JSON.parse(response.body)

    expect(response).to be_success
  end
end
