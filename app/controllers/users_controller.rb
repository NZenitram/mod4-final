class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      flash[:success] = "Account for #{user.email} created."
      redirect_to :root
    else
      flash[:notice] = "Please fill out all forms and make sure your passwords match."
      redirect_to :root
    end
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
