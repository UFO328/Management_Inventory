from django.core.mail import send_mail
from django.conf import settings

def send_email_to_user(**kwargs):
    send_mail(
        subject=kwargs.get('subject', 'No Subject'),
        message=kwargs.get('message', ''),  # bukan 'messages'
        from_email=kwargs.get('from_email', settings.DEFAULT_FROM_EMAIL),
        recipient_list=kwargs.get('recipient_list', []),
        fail_silently= False
        #html_message=kwargs.get('html_message')  opsional buat email HTML
    )