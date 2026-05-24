# Management Inventory System

## Deskripsi

Management Inventory System adalah aplikasi berbasis Full Django yang digunakan untuk mengelola:

- Data barang
- Data karyawan
- Transaksi inventory
- Sistem role dan permission

Project ini tidak menggunakan Django REST Framework (DRF) dan seluruh fitur dibangun menggunakan Django Template Rendering.
Sistem ini dirancang untuk membantu proses manajemen gudang dengan sistem otorisasi berdasarkan role pengguna.
Dan ketika kalian sudah migration pastikan kalian create manual di shell karena saya tidak menambahkan page register

---

## Features

- Authentication System
- Authorization & Permission Management
- CRUD Product
- CRUD KARYAWAN
- CRUD TRANSAKSI
- Inventory Management
- Transaction Management
- Dashboard Management
- Role-Based Access Control

---

## Role & Permission

Sistem memiliki 3 role utama:

- HRD
- Kepala Gudang
- Staff Gudang

---

## HRD

Role HRD memiliki permission sebagai berikut:

- Membuat akun karyawan
- CRUD data karyawan
- Melihat data karyawan

---

## Kepala Gudang

Role Kepala Gudang memiliki permission sebagai berikut:

- CRUD product
- Membuat transaksi
- Melihat transaksi
- Mengelola stok barang

---

## Staff Gudang

Role Staff Gudang memiliki permission sebagai berikut:

- Melihat data product
- Membuat transaksi
- Melihat transaksi

---

## Tech Stack

- Python
- Django(backend)
- HTML
- CSS
- JavaScript(UI only)
- Postgresql

---

## Installation

### Clone Repository

```bash
git clone https://github.com/UFO328/Management_Inventory.git
```

### Masuk Ke Folder Project

```bash
cd management_inventory
```

### Membuat Virtual Environment

```bash
python -m venv venv
```

### Mengaktifkan Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux/macOS

```bash
source venv/bin/activate
```

### Install Dependency

```bash
pip install -r requirements.txt
```

### Migration Database

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

### Menjalankan Server

```bash
python manage.py runserver
```

---

## Project Structure

```text
management_inventory/
│
|__  account/
├── dashboard/
├── templates/
├── static/
├── manage.py
```

---

## Security Features

- Authentication System
- Role-Based Authorization
- Permission Management
- Password Hashing

---

## Author

Riski

---

## License

project ini aku buag karena aku sedang belajar programing.UI
nya di buat denga 100%AI tapi backend aku yang buat sendiri
dan dokumentasi di buat dengan 60%AI dan 40% aku yang buat 
PLEASE SUPPORT ME AND GIVE ME FEEDBACK YOUR FEEDBACK SO VERY USEFUL
FOR ME.