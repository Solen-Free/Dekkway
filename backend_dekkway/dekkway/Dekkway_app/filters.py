import django_filters
import re
from django.contrib.postgres.search import SearchVector, SearchQuery
from django.db import models
from django.db.models import Q
from .models import Logement

class LogementFilter(django_filters.FilterSet):
    # Filtre de base pour le type (recherche insensible à la casse)
    type = django_filters.CharFilter(
        field_name='type', 
        lookup_expr='icontains',
        label="Type de logement (ex: Studio, Maison)"
    )
    
    # Filtres numériques pour le prix
    prix_min = django_filters.NumberFilter(
        field_name='prix', 
        lookup_expr='gte',
        label="Prix minimum"
    )
    prix_max = django_filters.NumberFilter(
        field_name='prix', 
        lookup_expr='lte',
        label="Prix maximum"
    )
    
    # Filtre exact pour le nombre de chambres
    nombre_de_chambres = django_filters.NumberFilter(
        label="Nombre de chambres exact (ex: 3)"
    )
    
    # Filtre de région (recherche insensible à la casse)
    region = django_filters.CharFilter(
        field_name='region', 
        lookup_expr='icontains',
        label="Région ou ville (ex: Dakar)"
    )
    
    # Ajout d'un filtre pour le quartier
    quartier = django_filters.CharFilter(
        field_name='quartier',
        lookup_expr='icontains',
        label="Quartier (ex: Medina, Yoff)"
    )
    
    # Filtre personnalisé pour les équipements
    equipements = django_filters.CharFilter(
        method='filter_equipements',
        label="Équipements (format: equipement:true/false, ex: wifi:true,piscine:false)"
    )
    
    # Filtre de recherche naturelle
    search = django_filters.CharFilter(
        method='filter_natural_search',
        label="Recherche naturelle (ex: 'Studio pas cher à Dakar avec wifi')"
    )

    def filter_equipements(self, queryset, name, value):
        """
        Fonction personnalisée pour filtrer les équipements.
        """
        filters = {}
        for eq_pair in value.split(','):
            key, val = eq_pair.split(':')
            filters[f"equipements__{key.strip()}"] = val.strip().lower() in ['true', 'vrai', '1', 'oui']
        return queryset.filter(**filters)
    
    
 

    class Meta:
        model = Logement
        fields = ['type', 'prix_min', 'prix_max', 'nombre_de_chambres', 'region', 'quartier']
        filter_overrides = {
            models.JSONField: {
                'filter_class': django_filters.CharFilter,
                'extra': lambda f: {'method': 'filter_equipements'}
            }
        }

