from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render,redirect

@login_required
def change_password_user(request):
  if request.method == 'POST':
    new_passoword = request.POST.get('new_password','').strip()
    confirm_password = request.POST.get('confirm_password','').strip()
    
    if confirm_password != new_passoword:
      messages.error(request,'PASSWORD TIDAK SAMA')
      return redirect('account_app:change_password')
    
    request.user.set_password(new_passoword)
    request.user.must_change_password = False 
    request.user.save()
    messages.success(request,'PASSWORD BERHASIL DI UBAH')
    return redirect('dashboard_app:dashboard')
  return render(request,'account/change_password.html')