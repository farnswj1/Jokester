from django.db import models
from django.core.validators import (
    MinLengthValidator,
    MaxLengthValidator,
    RegexValidator
)
from django.conf import settings
import uuid


# Create your models here.
class Joke(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(
        max_length=100,
        validators=[
            MinLengthValidator(1),
            MaxLengthValidator(100),
            RegexValidator(r'^[^\n]+$')
        ]
    )
    body = models.CharField(
        max_length=1000,
        validators=[
            MinLengthValidator(1),
            MaxLengthValidator(1000)
        ]
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='jokes'
    )

    def __str__(self):
        return f'{self.id}: {self.title}'

    class Meta:
        ordering = ('id',)
