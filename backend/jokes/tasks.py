from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task
from core.models import User
from jokes.models import Joke
import logging

logger = logging.getLogger(__name__)


@shared_task(name="jokes.email_staff_about_new_joke")
def email_staff_about_new_joke(id):
    joke = Joke.objects.get(id=id)
    staff = User.objects.filter(is_staff=True).values_list("email", flat=True)

    subject = f"New Joke Created! (#{id})"
    html_message = render_to_string('mail/new_joke.html', context={"joke": joke})
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER

    send_mail(
        subject,
        plain_message,
        from_email,
        staff,
        html_message=html_message,
        fail_silently=False
    )


@shared_task(name="jokes.email_staff_about_updated_joke")
def email_staff_about_updated_joke(id):
    joke = Joke.objects.get(id=id)
    staff = User.objects.filter(is_staff=True).values_list("email", flat=True)

    subject = f"Joke #{id} Was Updated!"
    html_message = render_to_string('mail/updated_joke.html', context={"joke": joke})
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER

    send_mail(
        subject,
        plain_message,
        from_email,
        staff,
        html_message=html_message,
        fail_silently=False
    )


@shared_task(name="jokes.email_staff_about_deleted_joke")
def email_staff_about_deleted_joke(joke):
    staff = User.objects.filter(is_staff=True).values_list("email", flat=True)

    subject = f"Joke #{joke.get('id')} Was Deleted!"
    html_message = render_to_string('mail/deleted_joke.html', context={"joke": joke})
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER

    send_mail(
        subject,
        plain_message,
        from_email,
        staff,
        html_message=html_message,
        fail_silently=False
    )
