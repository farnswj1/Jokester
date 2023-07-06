from django.contrib.admin import ModelAdmin, register
from django.utils.translation import gettext_lazy as _
from jokes.models import Joke


# Register your models here.
@register(Joke)
class JokeAdmin(ModelAdmin):
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'author',
                )
            }
        ),
        (
            _('Information'),
            {
                'fields': (
                    'title',
                    'body'
                )
            }
        )
    )
