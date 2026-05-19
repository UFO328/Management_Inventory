from django.shortcuts import render,redirect
from dashboard.services import DataServices
from django.contrib import messages
from django.contrib.auth.decorators import permission_required,login_required

@login_required
@permission_required('dashboard.delete_product',raise_exception=True)
def del_product(request,id):
  if request.method == 'POST':
    result = DataServices.delete_product(id)
    
    if result.get("response"):
      messages.success(request,result.get('messages'))
      return redirect('dashboard_app:list_product')
    else:
      messages.error(request,result.get('messages'))
      return redirect('dashboard_app:list_product')
  return redirect('dashboard_app:list_product')