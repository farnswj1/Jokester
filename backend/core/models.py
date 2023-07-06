from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid


# Create your models here.
class User(AbstractUser):
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(_('first name'), max_length=150)
    last_name = models.CharField(_('last name'), max_length=150)
    email = models.EmailField(_('email address'))

    @property
    def is_admin(self):
        return self.is_superuser or self.is_staff

    @property
    def has_admin_group(self):
        return self.groups.filter(name='Administrators').exists()

    class Meta:
        ordering = ('id',)
