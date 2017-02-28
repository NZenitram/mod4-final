class LinksController < ApplicationController
  def index
    @hot_links = Link.where(user_id: current_user.id)
  end

  def edit
    @link = Link.find(params[:link_id])
  end

  def update
    @link = Link.find(params[:id])
    @link.assign_attributes(link_params)
    just_read = @link.read_changed? && @link.read
    if @link.save
      Read.create(link: @link) if just_read
      head :no_content
    else
      render json: @link.errors.full_messages, status: 500
    end
  end

  private

  def link_params
    params.permit(:id, :title, :url, :read)
  end
end
