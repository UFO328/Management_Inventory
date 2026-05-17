from django.views.generic import ListView 
from django.shortcuts import render,redirect 
from ..models import Karyawan,Jabatan,Departemen
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin

from django.db.models import Q

class ListKaryawan(LoginRequiredMixin,PermissionRequiredMixin,ListView):
  model = Karyawan
  context_object_name = 'list_karyawan'
  template_name = 'dashboard/list_karyawan.html'
  permission_required = 'dashboard.view_karyawan'
  raise_exception=True
  ordering = 'id'
  paginate_by = 5
  
  def get_queryset(self):
    qs = Karyawan.objects.select_related('departemen','jabatan').order_by('id')
    keyword = self.request.GET.get('q')
    dept = self.request.GET.get('dept')
    jabatan = self.request.GET.get('jabatan')
    
    if keyword:
      qs = qs.filter(
        Q(nama__icontains=keyword) | Q(nik__icontains=keyword)
        )
    
    if dept:
      qs = qs.filter(departemen__departemen__icontains=dept)
      
    if jabatan:
      qs = qs.filter(jabatan__jabatan__icontains=jabatan)
    return qs
    
  def get_context_data(self,**kwargs):
    context = super().get_context_data(**kwargs)
    context['jumlah_karyawan'] = Karyawan.objects.count()
    context['list_jabatan'] = Jabatan.objects.only('id','jabatan')
    context['list_departemen'] = Departemen.objects.only('id','departemen')
    return context