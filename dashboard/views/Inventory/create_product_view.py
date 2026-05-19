from django.shortcuts import render,redirect 
from django.contrib import messages
from dashboard.services import DataServices
from dashboard.utils import check_field 
from dashboard.models import Category
from django.contrib.auth.decorators import permission_required,login_required

@login_required
@permission_required('dashboard.add_product',raise_exception=True)
def create_product_views(request):
  
  if request.method == 'POST':
    is_valid,errors = check_field(request.POST,['name','kode_barang','stock','category'])
    
    if not is_valid:
      for msg in errors.values():
        messages.error(request,msg)
      return redirect('dashboard_app:create_product')
      
    data = {
      'name':request.POST.get('name').strip(),
      'suplier':request.POST.get('suplier').strip(),
      'kode_barang':request.POST.get('kode_barang'),
      'stock':request.POST.get('stock'),
      'category':int(request.POST.get('category'))
    }
    print(data)
    result = DataServices.create_product(**data)
    
    if result.get('response'):
      messages.success(request,result.get('messages'))
      return redirect('dashboard_app:create_product')
    else:
      messages.error(request,result.get('messages'))
      return redirect('dashboard_app:create_product')
  list_category = Category.objects.only('id','name')
  return render(request,'dashboard/inventory/create_product.html',{'list_category':list_category})