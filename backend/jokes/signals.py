from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.forms.models import model_to_dict
from .models import Joke
from .tasks import (
    email_staff_about_new_joke,
    email_staff_about_updated_joke,
    email_staff_about_deleted_joke
)


@receiver(post_save, sender=Joke)
def email_staff_on_created_or_updated_joke(sender, instance, created, *args, **kwargs):
    if created:
        email_staff_about_new_joke.delay(instance.id)
    else:
        email_staff_about_updated_joke.delay(instance.id)


@receiver(post_delete, sender=Joke)
def email_staff_on_deleted_joke(sender, instance, *args, **kwargs):
    joke = model_to_dict(instance)
    email_staff_about_deleted_joke.delay(joke)
