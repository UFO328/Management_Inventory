from django.contrib.auth.models import Group,Permission 
from .role_mapping import ROLE_PERMISSIONS

def sync_role_permision():
  for role,permission_name in ROLE_PERMISSIONS.items():
    group,_ = Group.objects.get_or_create(name=role)
    permissions = Permission.objects.filter(codename__in=permission_name)
    group.permissions.set(permissions)
    print(f"{role} aktif")