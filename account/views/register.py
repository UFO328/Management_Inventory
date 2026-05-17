from ..models import User 
from django.shortcuts import render,redirect  


def register_user(request):
  if request.method == 'POST':
    