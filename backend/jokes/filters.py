from django_filters.rest_framework import FilterSet, CharFilter
from jokes.models import Joke


class JokeFilterSet(FilterSet):
    title = CharFilter('title', label='Title', lookup_expr='icontains')

    class Meta:
        model = Joke
        fields = ('title',)
