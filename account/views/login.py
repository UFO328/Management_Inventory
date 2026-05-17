from django.shortcuts import render,redirect 
from django.contrib.auth import login,authenticate,logout
from django.contrib import messages

def login_user(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    password= request.POST.get('password')
    print(username)
    print(password)
    user = authenticate(
      request,
      username=username,
      password=password
      )
    
    if user:
      #print('login berhasil',user)
      login(request,user)
      return redirect('dashboard_app:dashboard')
    else:
      #print('login gagal',user)
      messages.error(request,'INFORMASI AKUN SALAH')
      return redirect('account_app:login')
  return render(request,'account/login.html')

