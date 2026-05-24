import random 

def create_password_user():
  return ''.join(str(random.randint(0,9)) for _ in range(6))