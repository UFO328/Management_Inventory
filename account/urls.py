from django.urls import path 
from .views import login_user,logout_user

app_name = 'account_app'
urlpatterns = [
  path('',login_user,name='login'),
  path('logout',logout_user,name='logout'),
  ]