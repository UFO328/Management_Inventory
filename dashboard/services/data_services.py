from ..models import Karyawan, Jabatan, Departemen, Product, Category, Transaction
from django.db import transaction, IntegrityError
from django.db.models import F, Sum


class DataServices:
  """
  Service class yang digunakan untuk menangani business logic aplikasi.

  Class ini bertanggung jawab untuk:
  - Manajemen data karyawan
  - Manajemen produk
  - Manajemen transaksi
  - Pengambilan data departemen dan jabatan
  - Perhitungan stok

  Seluruh method menggunakan classmethod agar dapat dipanggil
  tanpa harus membuat object dari class terlebih dahulu.
  """
  
  @classmethod
  # function for add data worker
  def add_data_karyawan(cls,**kwargs):
    """
    Membuat data karyawan baru.

    Method ini melakukan:
    1. Mengambil data departemen.
    2. Mengambil data jabatan.
    3. Membuat data karyawan baru.

    Args:
      **kwargs:
        Data dinamis karyawan seperti:
        - nama
        - nik
        - email
        - telepon
        - alamat
        - departemen
        - jabatan

    Returns:
      dict:
        {
          'response': bool,
          'messages': str
        }

    Kemungkinan Response:
      - Success:
          DATA BERHASIL DI BUAT

      - Error:
          ERROR : DEPARTEMEN TIDAK DI TEMUKAN
          ERROR : JABATAN TIDAK DI TEMUKAN
          ERROR TERJADI DUPLIKASI DATA

    Exception yang ditangani:
      - Departemen.DoesNotExist
      - Jabatan.DoesNotExist
      - IntegrityError
      - Exception umum
    """

    try:
      departemen_id = Departemen.objects.get(id=kwargs.get('departemen'))
      jabatan_id = Jabatan.objects.get(id=kwargs.get('jabatan'))
      
      Karyawan.objects.create(
        nama=kwargs.get('nama').strip(),
        nik=kwargs.get('nik').strip(),
        email=kwargs.get('email').strip(),
        telepon=kwargs.get('telepon').strip(),
        alamat=kwargs.get('alamat').strip(),
        departemen=departemen_id,
        jabatan=jabatan_id
        )

      return {
        'response': True,
        'messages': 'DATA BERHASIL DI BUAT' 
      }

    except Departemen.DoesNotExist:
      return {
        'response': False,
        'messages': 'ERROR : DEPARTEMEN TIDAK DI TEMUKAN'
      }

    except Jabatan.DoesNotExist:
      return {
        'response': False,
        'messages': 'ERROR : JABATAN TIDAK DI TEMUKAN'
      }

    except IntegrityError:
      return {
        'response': False,
        'messages': f'ERROR TERJADI DUPLIKASI DATA'
      }

    except Exception as e:
      return {
        'response': False,
        'messages': f'ERROR : {e}'
      }
    
  @classmethod
  def get_jabatan(cls):
    """
    Mengambil seluruh data jabatan.

    Returns:
      QuerySet:
        Berisi:
        - id
        - jabatan

    Optimasi:
      Menggunakan only() untuk mengurangi field
      yang diambil dari database.
    """

    return Jabatan.objects.only('id', 'jabatan').order_by('id')
    
  @classmethod
  def get_total_product(cls):
    """
    Menghitung total seluruh produk.

    Returns:
      int:
        Total jumlah produk.
    """

    return Product.objects.count()
    
  @classmethod
  def get_total_transaction(cls):
    """
    Menghitung total seluruh transaksi.

    Returns:
      int:
        Total jumlah transaksi.
    """

    return Transaction.objects.count()
  
  @classmethod
  def get_total_stock(cls):
    """
    Menghitung total stok dari seluruh produk.

    Returns:
      dict:
        {
          'total': total_stock
        }

    Menggunakan:
      aggregate(Sum('stock'))
      agar perhitungan dilakukan langsung di database.
    """

    return Product.objects.aggregate(total=Sum('stock'))

  @classmethod
  def get_departemen(cls):
    """
    Mengambil seluruh data departemen.

    Returns:
      QuerySet:
        Berisi:
        - id
        - departemen

    Optimasi:
      Menggunakan only() untuk meminimalkan
      field yang diambil dari database.
    """

    return Departemen.objects.only('id', 'departemen').order_by('id')
    
  @classmethod
  def get_stock(cls, product_id):
    """
    Mengambil data stok berdasarkan product id.

    Args:
      product_id (int):
        ID produk.

    Returns:
      Product:
        Object product yang hanya berisi field stock.
    """

    return Product.objects.only('stock').get(id=product_id)
    
  @classmethod
  def update_data_karyawan(cls, **kwargs):
    """
    Mengupdate data karyawan menggunakan update_or_create.

    Method ini melakukan:
    1. Validasi keberadaan departemen.
    2. Validasi keberadaan jabatan.
    3. Menggunakan transaction.atomic()
       untuk mencegah race condition.
    4. Mengupdate atau membuat data karyawan.

    Args:
      **kwargs:
        Field data karyawan.

    Returns:
      dict:
        {
          'response': bool,
          'messages': str
        }

    Keamanan Database:
      transaction.atomic()
      memastikan konsistensi data saat proses update.

    Exception yang ditangani:
      - Departemen.DoesNotExist
      - Jabatan.DoesNotExist
      - IntegrityError
      - Exception umum
    """

    try:
      departemen_id = Departemen.objects.get(id=kwargs.get('departemen'))
      jabatan_id = Jabatan.objects.get(id=kwargs.get('jabatan'))
      
      # Mencegah race condition saat update data
      with transaction.atomic():

        obj, create = Karyawan.objects.update_or_create(
          id=kwargs.get('id'),
          defaults={
            'user': kwargs.get('user'),
            'nama': kwargs.get('nama'),
            'nik': kwargs.get('nik'),
            'email': kwargs.get('email'),
            'telepon': kwargs.get('telepon'),
            'alamat': kwargs.get('alamat'),
            'departemen': departemen_id,
            'jabatan': jabatan_id,
          }
        )

        return {
          'response': True,
          'messages': 'DATA BERHASIL DI UPDATE'
        }

    except Departemen.DoesNotExist:
      return {
        'response': False,
        'messages': 'ERROR : DEPARTEMEN TIDAK DI TEMUKAN'
      }

    except Jabatan.DoesNotExist:
      return {
        'response': False,
        'messages': 'ERROR : JABATAN TIDAK DI TEMUKAN'
      }

    except IntegrityError as e:
      return {
        'response': False,
        'messages': f'ERROR : {e}'
      }

    except Exception as e:
      return {
        'response': False,
        'messages': f'ERROR : {e}'
      }
    
  # function for create product
  @classmethod
  def create_product(self, **kwargs):
    """
    Membuat produk baru.

    Method ini melakukan:
    1. Validasi category.
    2. Membuat object product.
    3. Menyimpan data produk ke database.

    Args:
      **kwargs:
        Data produk:
        - name
        - stock
        - kode_barang
        - suplier
        - category

    Returns:
      dict:
        {
          'response': bool,
          'messages': str
        }

    Exception yang ditangani:
      - Category.DoesNotExist
      - IntegrityError
    """

    try:
      category = Category.objects.get(id=kwargs.get('category'))

      product = Product.objects.create(
        name=kwargs.get('name'),
        stock=kwargs.get('stock'),
        kode_barang=kwargs.get('kode_barang'),
        suplier=kwargs.get('suplier'),
        category=category
      )

      product.save()

      return {
        'response': True,
        'messages': 'DATA PRODUCT BERHASIL DI TAMBAHKAN '
      }

    except Category.DoesNotExist:
      return {
        'response': False,
        'messages': 'CATEGORY TIDAK DI TEMUKAN '
      }

    except IntegrityError:
      return {
        'response': False,
        'messages': 'KODE BARANG SUDAH DI GUNAKAN'
      }
  
  # function for delete product
  @classmethod
  def delete_product(cls, id):
    """
    Menghapus produk secara permanen dari database.

    Args:
      id (int):
        ID produk.

    Returns:
      dict:
        {
          'response': bool,
          'messages': str
        }

    Catatan:
      Menggunakan hard delete.
    """

    try:
      Product.objects.filter(id=id).delete()

      return {
        'response': True,
        'messages': 'BERHASIL HAPUS PRODUCT'
      }

    except Product.DoesNotExist:
      return {
        'response': False,
        'messages': 'PRODUCT TIDAK DI TEMUKAN'
      }
  
  # function for create transaction
  @classmethod
  def create_transaction(cls, **kwargs):
    """
    Membuat transaksi produk dan mengupdate stok secara aman.

    Method ini melakukan:
    1. Lock data product menggunakan select_for_update().
    2. Mencegah race condition menggunakan transaction.atomic().
    3. Mengupdate stok berdasarkan tipe transaksi.
    4. Membuat riwayat transaksi.

    Jenis Transaksi:
      - OUT:
          Mengurangi stok produk.

      - IN:
          Menambahkan stok produk.

    Args:
      **kwargs:
        Data transaksi:
        - user
        - product_id
        - qty
        - type
        - note

    Returns:
      dict:
        {
          'response': bool,
          'messages': str
        }

    Keamanan Database:
      - transaction.atomic()
      - select_for_update()

    Kedua mekanisme ini memastikan
    konsistensi stok saat terjadi transaksi bersamaan.
    """

    try:
      # Mencegah race condition saat transaksi
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
          
          # Membuat riwayat transaksi
          Transaction.objects.create(
              user=kwargs.get('user'),
              product=product,
              type=trx_type,
              qty=qty,
              note=kwargs.get('note')
          )

      return {
        'response': True,
        'messages': 'BERHASIL MELAKUKAN TRANSAKSI'
      }

    except Exception as e:
      return {
        'response': False,
        'messages': f"GAGAL MELAKUKAN TRANSAKSI {e}"
      }