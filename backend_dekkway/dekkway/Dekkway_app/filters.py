import django_filters
from .models import Logement

class LogementFilter(django_filters.FilterSet):
    type = django_filters.CharFilter(field_name="type", lookup_expr='icontains')
    localisation = django_filters.CharFilter(field_name="localisation", lookup_expr='icontains')
    prix_min = django_filters.NumberFilter(field_name="prix", lookup_expr='gte')
    prix_max = django_filters.NumberFilter(field_name="prix", lookup_expr='lte')
    nombre_de_chambres = django_filters.NumberFilter(field_name="nombre_de_chambres", lookup_expr='exact')
    equipements = django_filters.CharFilter(field_name="equipements", lookup_expr='icontains')
    region = django_filters.CharFilter(field_name="region", lookup_expr='icontains')

    class Meta:
        model = Logement
        fields = ['type', 'localisation', 'prix_min', 'prix_max', 'nombre_de_chambres', 'equipements', 'region']
