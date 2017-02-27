class LinksController < ApplicationController
  def index
    @hot_links = Link.where(user_id: current_user.id)
  end
end
