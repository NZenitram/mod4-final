require 'rails_helper'

describe 'when a user visits the root the user can sign up or log in' do
  context 'when an unauthenticated user visits root, the user can sign up' do
    it 'signs up for urlockbox' do

      visit '/'
      expect(page).to have_content('Sign Up!')

    end

    it 'can create an account' do
      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))

      visit '/'

      expect(page).to have_content("Email")
      expect(page).to have_content("Password")

      click_link "Sign Up!"

      fill_in "user_email", with: user.email
      fill_in "user_password", with: user.password_digest
      fill_in "user_password_confirmation", with: user.password_digest

      click_button "Create User"
    end

    it 'can login' do
      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))

      visit '/'
      fill_in "email", with: user.email
      fill_in "password", with: "test"

      click_button "Sign In"

      expect(page).to have_content("You have successfully logged in.")
    end
    it 'can logout' do
      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))

      visit '/'
      fill_in "email", with: user.email
      fill_in "password", with: "test"

      click_button "Sign In"

      expect(page).to have_content("You have successfully logged in.")

      visit '/'

      click_button "Log Out"

      expect(page).to have_content("You have successfully logged out.")
    end
    it 'can login and is redirected' do
      user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))

      visit '/'
      fill_in "email", with: user.email
      fill_in "password", with: "test"

      click_button "Sign In"

      expect(page).to have_content("You have successfully logged in.")
      expect(page).to have_content("Hot Reads!")
    end
  end
end
