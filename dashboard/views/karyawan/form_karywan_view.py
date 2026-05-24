from django.views import View
from django.shortcuts import render,redirect 
from django.contrib import messages
from dashboard.services import DataServices
from django.contrib.auth.decorators import permission_required,login_required

@login_required
@permission_required('dashboard.add_karyawan',raise_exception=True)
def form_karyawan(request):
  if request.method == 'POST':
    data = {
      'nama':request.POST.get('nama'),
      'nik':request.POST.get('nik'),
      'email':request.POST.get('email'),
      'telepon':str(request.POST.get('no_telepon')),
      'departemen':int(request.POST.get('departemen')),
      'alamat':request.POST.get('alamat'),
      'jabatan':int(request.POST.get('jabatan')),
    }
    result = DataServices.add_data_karyawan(**data)
    
    if result.get('response'):
      messages.success(request,result.get('messages'))
      return redirect('dashboard_app:tambah_karyawan')
    else:
      messages.error(request,result.get('messages'))
      return redirect('dashboard_app:tambah_karyawan')
  jabatan = DataServices.get_jabatan()
  departemen = DataServices.get_departemen()
  return render(request,'dashboard/karyawan/form_kariyawan.html',{'jabatan_list':jabatan,'departemen_list':departemen})
      