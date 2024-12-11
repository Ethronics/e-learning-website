from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_custom_email(subject, template_name, context, recipient_list, from_email=None):
    """
    Sends an email using a template and context.

    :param subject: Subject of the email
    :param template_name: Path to the HTML template
    :param context: Context dictionary to render the template
    :param recipient_list: List of recipient email addresses
    :param from_email: The sender's email address (optional, defaults to settings.DEFAULT_FROM_EMAIL)
    """
    if from_email is None:
        from_email = settings.DEFAULT_FROM_EMAIL
    
    html_message = render_to_string(template_name, context)
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject,
        plain_message,
        from_email,
        recipient_list,
        html_message=html_message,
        fail_silently=False,
    )
