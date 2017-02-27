class LinksController < ApplicationController
  def index
    @hot_links = Link.where(user_id: current_user.id)
  end
  
  private

  def link_params
    params.permit(:title, :url, :read)
  end
end
