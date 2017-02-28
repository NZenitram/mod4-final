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
  describe "POST /api/v1/links" do
    it 'returns success' do
      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))
      link_params = {title: "Bad", url: "http://www.gasdfasdf.com", read: true, user_id: user.id}

      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

      post "/api/v1/links", link_params

      expect(response).to be_success
      expect(response.status).to eq(201)
    end
  end
  describe 'PATCH /api/v1/link' do
    it 'returns success' do
      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))
      link = Link.create!(title: "Title", url: "http://www.google.com", read: true, user_id: user.id)
      Link.create!(title: "Random", url: "http://www.adfgasfg.com", read: true, user_id: user.id)
      Link.create!(title: "Bad", url: "http://www.gasdfasdf.com", read: true, user_id: user.id)

      patch "/api/v1/links/#{link.id}"

      expect(response).to be_success
    end
  end
end
