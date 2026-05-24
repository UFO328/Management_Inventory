from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from dashboard.models import Karyawan

class User(AbstractUser):
    karyawan = models.ForeignKey(Karyawan,null=True,blank=True,on_delete=models.SET_NULL)
    must_change_password = models.BooleanField(default=True)
    def __str__(self):
        return self.username