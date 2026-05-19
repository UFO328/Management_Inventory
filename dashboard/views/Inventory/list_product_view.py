from django.views.generic import ListView
from ..models import Product
from django.db.models import Q
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin


class ListProductView(LoginRequiredMixin,PermissionRequiredMixin,ListView):
  model = Product
  context_object_name = 'list_product'
  template_name = 'dashboard/inventory/list_product.html'
  permission_required = 'dashboard.view_product'
  raise_exception=True
  ordering = 5 
  paginate_by = 4
  
  def get_queryset(self):
    qs = Product.objects.select_related('category').order_by('id')
    
    q = self.request.GET.get('q')
    if q:
      qs = qs.filter(Q(name__icontains=q) | Q(kode_barang__icontains=q))
    return qs
  
  def get_context_data(self,**kwargs):
    context = super().get_context_data(**kwargs)
    context['jumlah_product'] = Product.objects.count()
    return context