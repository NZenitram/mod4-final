class Api::V1::LinksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @links = Link.hot
    render json: @links, status: 200
  end

  def create
    @link = current_user.links.new link_params
    if @link.save
      render json: @link, status: 201
    else
      render json: @link.errors.full_messages, status: 500
    end
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
