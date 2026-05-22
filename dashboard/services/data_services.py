from ..models import Karyawan,Jabatan,Departemen,Product,Category,Transaction
from django.db import transaction,IntegrityError
from django.db.models import F,Sum
class DataServices:
  
  @classmethod
  def add_data_karyawan(cls,**kwargs):
    try:
      departemen_id = Departemen.objects.get(id=kwargs.get('departemen'))
      jabatan_id = Jabatan.objects.get(id=kwargs.get('jabatan'))
      with transaction.atomic():
        obj,create = Karyawan.objects.update_or_create(
          nik=kwargs.get('nik'),
          defaults={
          'user':kwargs.get('user'),
          'nama':kwargs.get('nama'),
          'nik':kwargs.get('nik'),
          'email':kwargs.get('email'),
          'telepon':kwargs.get('telepon'),
          'alamat':kwargs.get('alamat'),
          'departemen':departemen_id,
          'jabatan':jabatan_id,
          }
        )
        return {'response':True,'messages':'DATA BERHASIL DI BUAT' if create else 'DATA BERHASIL DI UPDATE'}
    except Departemen.DoesNotExist:
        return {'response':False,'messages':'ERROR : DEPARTEMEN TIDAK DI TEMUKAN'}
    except Jabatan.DoesNotExist:
        return {'response':False,'messages':'ERROR : JABATAN TIDAK DI TEMUKAN'}
    except IntegrityError:
        return {'response':False,'messages':f'ERROR TERJADI DUPLIKASI DATA'}
    except Exception as e:
        return {'response':False,'messages':f'ERROR : {e}'}
    
  @classmethod
  def get_jabatan(cls):
    return Jabatan.objects.only('id','jabatan').order_by('id')
    
  @classmethod
  def get_total_product(cls):
    return Product.objects.count()
    
  @classmethod
  def get_total_transaction(cls):
    return Transaction.objects.count()
  
  @classmethod
  def get_total_stock(cls):
    return Product.objects.aggregate(total=Sum('stock'))
  @classmethod
  def get_departemen(cls):
    return Departemen.objects.only('id','departemen').order_by('id')
    
  @classmethod
  def get_stock(cls,product_id):
     return Product.objects.only('stock').get(id=product_id)
    
  @classmethod
  def update_data_karyawan(cls,**kwargs):
    try:
      departemen_id = Departemen.objects.get(id=kwargs.get('departemen'))
      jabatan_id = Jabatan.objects.get(id=kwargs.get('jabatan'))
      with transaction.atomic():
        obj,create = Karyawan.objects.update_or_create(
          id=kwargs.get('id'),
          defaults={
          'user':kwargs.get('user'),
          'nama':kwargs.get('nama'),
          'nik':kwargs.get('nik'),
          'email':kwargs.get('email'),
          'telepon':kwargs.get('telepon'),
          'alamat':kwargs.get('alamat'),
          'departemen':departemen_id,
          'jabatan':jabatan_id,
          }
        )
        return {'response':True,'messages':'DATA BERHASIL DI UPDATE'}
    except Departemen.DoesNotExist:
        return {'response':False,'messages':'ERROR : DEPARTEMEN TIDAK DI TEMUKAN'}
    except Jabatan.DoesNotExist:
        return {'response':False,'messages':'ERROR : JABATAN TIDAK DI TEMUKAN'}
    except IntegrityError as e:
        return {'response':False,'messages':f'ERROR : {e}'}
    except Exception as e:
        return {'response':False,'messages':f'ERROR : {e}'}
    
  #for create product 
  @classmethod
  def create_product(self,**kwargs):
    try:
      category = Category.objects.get(id=kwargs.get('category'))
      product = Product.objects.create(
        name=kwargs.get('name'),
        stock=kwargs.get('stock'),
        kode_barang=kwargs.get('kode_barang'),
        suplier=kwargs.get('suplier'),
        category = category
        
        )
      product.save()
      return {'response':True,'messages':'DATA PRODUCT BERHASIL DI TAMBAHKAN '}
    except Category.DoesNotExist:
      return {'response':False,'messages':'CATEGORY TIDAK DI TEMUKAN '}
    except IntegrityError:
      return {'response':False,'messages':'KODE BARANG SUDAH DI GUNAKAN'}
      
  @classmethod
  def delete_product(cls,id):
    try:
      Product.objects.filter(id=id).delete()
      return {'response':True,'messages':'BERHASIL HAPUS PRODUCT'}
    except Product.DoesNotExist:
      return {'response':False,'messages':'PRODUCT TIDAK DI TEMUKAN'}
  @classmethod
  def create_transaction(cls, **kwargs):
    try:
      with transaction.atomic():
          product = Product.objects.select_for_update().get(
              id=kwargs.get('product_id')
          )
          qty = int(kwargs.get('qty'))
          trx_type = kwargs.get('type')
          
          if trx_type == 'OUT':
            product.stock -= qty
  
          elif trx_type == 'IN':
              product.stock += qty
  
          product.save()
  
          Transaction.objects.create(
              user=kwargs.get('user'),
              product=product,
              type=trx_type,
              qty=qty,
              note=kwargs.get('note')
          )
      return {'response':True,'messages':'BERHASIL MELAKUKAN TRANSAKSI'}
    except Exception as e:
      return {'response':False,'messages':f"GAGAL MELAKUKAN TRANSAKSI {e}"}