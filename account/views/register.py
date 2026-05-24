from ..models import User 
from django.contrib.auth.models import Group
from dashboard.models import Karyawan
from django.shortcuts import render,redirect  
from django.contrib import messages
from ..utils import create_password_user,send_email_to_user


def register_user(request,id):
  if request.method == 'POST':
    username = request.POST.get('username','').strip()
    role = request.POST.get('role')
    email = request.POST.get('email','').strip()
    password = create_password_user()
    
    
    try:
      karyawan = Karyawan.objects.get(id=id)
    except Karyawan.DoesNotExist:
      messages.error(request,'KARYAWAN TIDAK DI TEMUKAN')
      redirect('dashboard_app:list_karyawan')
    
    user = User.objects.create_user(
      karyawan=karyawan,
      username=username,
      email=email,
      password=password
      )
    data = {
      'subject':'SUCCESS ADD USER',
      'message':f'INI USERNAME DAN PASSWORD JANGAN DJ BERIKAN SIAPAPUN\n USERNAME:{username}\n PASSWORD:{password}\n WAJIB DI GANTI SAAT PERTAMA KALI LOGIN',
      'recipient_list':[user.email],
    }
    group = Group.objects.get(name=role)
    user.groups.add(group)
    send_email_to_user(**data)
    messages.success(request,'BERHASIL MEMBUAT ACCOUNT ')
    return redirect('dashboard_app:list_karyawan')
  return redirect('dashboard_app:list_karyawan')