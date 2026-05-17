from django.urls import path 
from .views import DashboardView,form_karyawan,ListKaryawan,update_data_karyawan,delete_karyawan
from .views import create_product_views,ListProductView,transaction_views,ListTransactionView,del_product

app_name = 'dashboard_app'

urlpatterns = [
  path('',DashboardView.as_view(),name='dashboard'),
  path('tambah_karyawan/',form_karyawan,name='tambah_karyawan'),
  path('list_karyawan/',ListKaryawan.as_view(),name='list_karyawan'),
  path('update_karyawan/<int:id>/',update_data_karyawan,name='update_karyawan'),
  path('delete_karyawan/<int:pk>/',delete_karyawan,name='delete_karyawan'),
  path('create_product/',create_product_views,name='create_product'),
  path('list_product/',ListProductView.as_view(),name='list_product'),
  path('delete_product/<int:id>/',del_product,name='delete_product'),
  path('list_transaction/',ListTransactionView.as_view(),name='list_transaction'),
  path('create_transaction/<int:product_id>/',transaction_views,name='create_transaction'),
  ]