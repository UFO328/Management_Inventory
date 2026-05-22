from django.views import View
from django.shortcuts import render,redirect 
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin
from ..services import AnalyticServices,DataServices

class DashboardView(LoginRequiredMixin,View):
  def get(self,request):
    data_transaction_per_day = (AnalyticServices.transaction_per_day())
    data_transaction_per_type = (AnalyticServices.transaction_per_type())
    total_stock = DataServices.get_total_stock()
    context = {
      'labelsTransactionPerDay':data_transaction_per_day['labels'],
      'dataTransactionPerDay':data_transaction_per_day['data'],
      'transactionTypeLabels':data_transaction_per_type['labels'],
      'transactionTypeData':data_transaction_per_type['data'],
      'total_product':DataServices.get_total_product(),
      'total_transaction':DataServices.get_total_transaction(),
      'total_stock':total_stock['total'],
    }
    return render(request,'dashboard/dashboard.html',context)
  