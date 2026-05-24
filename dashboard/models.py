
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL



class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    kode_barang = models.CharField(max_length=30,unique=True)
    suplier= models.CharField(max_length=255)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        related_name='products'
    )

    def __str__(self):
        return f"{self.name} (Stock: {self.stock})"


class Transaction(models.Model):
    TYPE_CHOICES = (
        ('IN', 'Stock In'),
        ('OUT', 'Stock Out'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='transactions'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name='transactions'
    )

    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    qty = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=255)
    def __str__(self):
        return f"{self.product} - {self.type} ({self.qty})"
        

class Jabatan(models.Model):
  jabatan = models.CharField(max_length=50)

class Departemen(models.Model):
  departemen = models.CharField(max_length=100)

class Karyawan(models.Model):
  nama = models.CharField(max_length=255)
  nik = models.CharField(max_length=50, unique=True)
  email = models.EmailField()
  telepon = models.CharField(max_length=50)
  alamat = models.TextField()
  jabatan = models.ForeignKey(Jabatan,on_delete=models.SET_NULL)
  departemen = models.ForeignKey(Departemen,on_delete=models.SET_NULL)
  class Meta:
    unique_together = ['nik','nama','email']
  def __str__(self):
     return self.nama
  