from django.contrib.admin import ModelAdmin, register
from django.utils.translation import gettext_lazy as _
from jokes.models import Joke


# Register your models here.
@register(Joke)
class JokeAdmin(ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('author', 'title',)
    search_fields = ('author__username', 'title',)
    ordering = ('author__username', 'title',)

    fieldsets = (
        (
            None,
            {
                'fields': (
                    'id',
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
