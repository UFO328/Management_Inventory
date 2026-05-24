from django.urls import path 
from .views import login_user,logout_user,register_user,change_password_user

app_name = 'account_app'
urlpatterns = [
  path('',login_user,name='login'),
  path('register_user/<int:id>/',register_user,name='register_user'),
  path('change_password/',change_password_user,name='change_password'),
  path('logout/',logout_user,name='logout'),
  ]