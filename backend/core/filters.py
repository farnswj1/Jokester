from django_filters.rest_framework import FilterSet, CharFilter
from core.models import User


class UserFilterSet(FilterSet):
    username = CharFilter('username', label='Username', lookup_expr='icontains')

    class Meta:
        model = User
        fields = ('username',)
