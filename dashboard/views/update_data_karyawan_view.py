from django.shortcuts import render,redirect,get_object_or_404
from ..models import Karyawan
from ..services import DataServices
from django.contrib import messages

def delete_karyawan(request,pk):
  if request.method == 'POST':
    if request.user.role == 'admin':
      karyawan = get_object_or_404(Karyawan,pk=pk)
      karyawan.delete()
      messages.success(request,'DATA KARYAWAN BERHASIL DI HAPUS')
      return redirect('dashboard_app:list_karyawan')
    else:
      messages.error(request,'PERMISION DENIED')
      return redirect('dashboard_app:list_karyawan')
      
def update_data_karyawan(request,id):
  if request.method == 'POST':
    data = {
      'id':id,
      'user':request.user,
      'nama':request.POST.get('nama'),
      'nik':request.POST.get('nik'),
      'telepon':request.POST.get('telepon'),
      'email':request.POST.get('email'),
      'departemen':request.POST.get('departemen'),
      'jabatan':request.POST.get('jabatan'),
      'alamat':request.POST.get('alamat'),
    }
    # for key,value in data.items():
#       print(f"{key}:{value}")
    result = DataServices.update_data_karyawan(**data)
    
    if result.get('response'):
      messages.success(request,result.get('messages'))
      return redirect('dashboard_app:list_karyawan')
    else:
      messages.error(request,result.get('messages'))
      return redirect('dashboard_app:list_karyawan')
  return render(request,'dashboard/list_karyawan.html')