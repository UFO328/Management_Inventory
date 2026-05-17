from django.views import View
from django.shortcuts import render,redirect 
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin


class DashboardView(LoginRequiredMixin,View):
  def get(self,request):
    return render(request,'dashboard/dashboard.html')