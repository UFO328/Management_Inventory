from django.db.models import Count
from django.db.models.functions import TruncDate
from ..models import Transaction
import json


class AnalyticServices:
  """
  Service class untuk menangani proses analitik data transaksi.

  Class ini digunakan untuk:
  - Menghitung jumlah transaksi per hari.
  - Menghitung jumlah transaksi berdasarkan tipe transaksi.

  Output dari setiap method dikembalikan dalam format dictionary
  yang berisi data JSON agar mudah digunakan di frontend JavaScript
  seperti Chart.js atau library visualisasi lainnya.
  """
  
  @classmethod
  def transaction_per_day(cls):
    """
    Mengambil jumlah transaksi berdasarkan tanggal.

    Method ini melakukan:
    1. Mengambil data dari model Transaction.
    2. Mengelompokkan transaksi berdasarkan tanggal menggunakan TruncDate.
    3. Menghitung jumlah transaksi setiap hari menggunakan Count.
    4. Mengubah hasil query menjadi format labels dan data.

    Returns:
      dict:
        {
          'labels': JSON string daftar tanggal,
          'data': JSON string jumlah transaksi per tanggal
        }

    Contoh Output:
      {
        "labels": ["2026-08-01", "2026-08-02"],
        "data": [5, 8]
      }

    Penjelasan Query:
      - annotate(day=TruncDate('date'))
        Membuat field baru bernama 'day' dari field date tanpa jam.

      - values('day')
        Mengelompokkan data berdasarkan tanggal.

      - annotate(total=Count('id'))
        Menghitung jumlah transaksi tiap tanggal.

      - order_by('day')
        Mengurutkan data berdasarkan tanggal secara ascending.
    """

    qs = (
      Transaction.objects.annotate(day=TruncDate('date')
      ).values('day').annotate(total=Count('id')).order_by('day')
    )

    labels = []
    data = []
      
    for item in qs:
      # Menambahkan tanggal ke labels
      labels.append(item['day'].strftime('%Y-%m-%d'))

      # Menambahkan total transaksi ke data
      data.append(item['total'])

    return {
      'labels': json.dumps(labels),
      'data': json.dumps(data)
    }
  
  @classmethod
  # get data transaction per type like as IN or OUT
  def transaction_per_type(cls, type=None):
    """
    Mengambil jumlah transaksi berdasarkan tipe transaksi.

    Parameter:
      type (str, optional):
        Filter tipe transaksi.
        Contoh:
          - "IN"
          - "OUT"

        Jika parameter kosong (None),
        maka semua tipe transaksi akan dihitung.

    Returns:
      dict:
        {
          'labels': JSON string daftar tipe transaksi,
          'data': JSON string jumlah transaksi per tipe
        }

    Contoh Output:
      {
        "labels": ["IN", "OUT"],
        "data": [10, 7]
      }

    Penjelasan Query:
      - values('type')
        Mengelompokkan data berdasarkan field type.

      - annotate(total=Count('id'))
        Menghitung jumlah transaksi pada setiap tipe.
    """

    qs = (Transaction.objects.all())
    
    # Filter berdasarkan tipe transaksi jika parameter diberikan
    if type:
      qs = (qs.filter(type=type))

    # Grouping dan counting data transaksi
    qs = (qs.values('type').annotate(total=Count('id')))
    
    labels = []
    data = []

    for types in qs:
      # Menyimpan nama tipe transaksi
      labels.append(types['type'])

      # Menyimpan jumlah transaksi tiap tipe
      data.append(types['total'])

    return {
      'labels': json.dumps(labels),
      'data': json.dumps(data)
    }