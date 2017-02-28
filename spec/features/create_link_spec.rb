require "rails_helper"

RSpec.describe "can create links", :js => :true do
  scenario "Create a new link" do
    
    user = User.create!(email: "test@test.com", password_digest: BCrypt::Password.create("test"))
    link = Link.create!(title: "Title", url: "http://www.google.com", read: true, user_id: user.id)

    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit "/links"

    expect(page).to have_text(link.title)
    expect(page).to have_text(link.url)
  end
end
