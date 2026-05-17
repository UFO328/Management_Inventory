

def check_field(request_post,field):
  error={}
  for f in field:
    value = request_post.get(f,'').strip()
    if not value:
      error[f] = f"Field {f} Tidak Boleh Kosong"
  return len(error) == 0,error