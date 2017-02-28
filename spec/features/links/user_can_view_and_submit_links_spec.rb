require 'rails_helper'

describe 'when an authenticated user visits the links index', :js => :true do
  context 'the user can see submitted links' do
    it 'should see a form to submit a link' do

      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))
      link = Link.create!(title: "Example", url: "http://www.example.com", read: false, user_id: user.id)

      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

      visit '/links'

      expect(page).to have_content("Hot Reads!")
      expect(page).to have_content(link.title)
    end
  end
end
