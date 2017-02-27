require "rails_helper"

RSpec.describe "can create links", :js => :true do
  scenario "Create a new link" do
    user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))

    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit "/links"
    fill_in "Title:", :with => "Turing"
    fill_in "URL:", :with => "http://turing.io"
    click_on "Add Link"

    expect(page).to have_text("Turing")
    expect(page).to have_text("http://turing.io")
  end
end
