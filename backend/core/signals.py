from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from core.models import User


@receiver(post_save, sender=User)
def set_user_permissions(sender, instance, created, *args, **kwargs):
    admin_group, _ = Group.objects.get_or_create(name='Administrators')
    user_group, _ = Group.objects.get_or_create(name='Users')

    if instance.is_admin:
        instance.groups.add(admin_group)
        instance.groups.remove(user_group)
    else:
        instance.groups.add(user_group)
        instance.groups.remove(admin_group)
