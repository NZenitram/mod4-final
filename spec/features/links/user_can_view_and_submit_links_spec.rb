require 'rails_helper'

describe 'when an authenticated user visits the links index' do
  context 'the user can see submitted links' do
    it 'should see a form to submit a link' do
      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))
      link = Link.create!(title: "Example", url: "http://www.example.com", read: false)
      visit '/'
      fill_in "email", with: user.email
      fill_in "password", with: "test"

      click_button "Sign In"

      expect(page).to have_content("Hot Reads!")

      fill_in "URL", with: link.url
      fill_in "Title", with: link.title

      click_button "Add Link"

      expect(page).to have_content(link.title)
    end
  end
end
