from django.shortcuts import render,redirect 
from dashboard.models import Transaction,Product
from django.db.models import Q
from django.contrib import messages
from django.views.generic import ListView
from dashboard.utils import check_field
from dashboard.services import DataServices
from django.contrib.auth.decorators import permission_required,login_required
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin

class ListTransactionView(LoginRequiredMixin,PermissionRequiredMixin,ListView):
  model = Transaction
  template_name = 'dashboard/inventory/list_transaction.html'
  permission_required = 'dashboard.view_transaction'
  raise_exception=True
  context_object_name = 'list_transaction'
  ordering = '-date'
  paginate_by = 5
  
  def get_queryset(self):
    qs = Transaction.objects.select_related('product','user').order_by('-date')
    q = self.request.GET.get('q')
    jenis = self.request.GET.get('jenis')
    
    if q:
      qs = qs.filter(Q(prpduct__name__icontains=q) | Q(product__kode_barang__icontains=q))
    
    if jenis in ['IN','OUT']:
      qs = qs.filter(type=jenis)
    return qs
  def get_context_data(self,**kwargs):
    context = super().get_context_data(**kwargs)
    context['jumlah_transaksi'] = Transaction.objects.count()
    context['total_masuk'] = Transaction.objects.filter(type='IN').count()
    context['total_keluar'] = Transaction.objects.filter(type='OUT').count()
    return context

@login_required
@permission_required('dashboard.add_transaction',raise_exception=False)
def transaction_views(request,product_id):
  if request.method == 'POST':
    status,errors = check_field(request.POST,['jenis','jumlah','keterangan'])
    
    if not status:
      for msg in errors.values():
        messages.error(request,msg)
      return redirect('dashboard_app:list_product')
      
    data = {
      'user':request.user,
      'type':request.POST.get('jenis'),
      'qty':int(request.POST.get('jumlah')),
      'note':request.POST.get('keterangan'),
      'product_id':int(product_id)
    }
    stock = DataServices.get_stock(int(product_id))
    result = DataServices.create_transaction(**data)
    if data.get('type') == 'OUT':
      if data.get('qty') > 0 and data.get('qty') <= stock.stock :
        if result.get('response'):
          messages.success(request,result.get('messages'))
          return redirect('dashboard_app:list_product')
        else:
          messages.error(request,result.get('messages'))
          return redirect('dashboard_app:list_product')
    else:
        if result.get('response'):
          messages.success(request,result.get('messages'))
          return redirect('dashboard_app:list_product')
        else:
          messages.error(request,result.get('messages'))
          return redirect('dashboard_app:list_product')
      
  return redirect('dashboard_app:list_product.html')