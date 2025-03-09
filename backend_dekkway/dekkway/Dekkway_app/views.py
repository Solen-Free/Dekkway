from math import radians, cos  # Ajouté
from django.db.models import Q
from django.db.models import F, FloatField, ExpressionWrapper
from django.db.models.functions import Radians, Sin, Cos, ATan2, Sqrt, Power
from django.shortcuts import render
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Logement
from .filters import LogementFilter
from .serializers import LogementSerializer
from .models import Bailleur, Locataire, Administrateur, Logement, Location, Notification, Service, Favoris, LocataireService
from .serializers import BailleurSerializer, LocataireSerializer, AdministrateurSerializer, LogementSerializer, LocationSerializer, NotificationSerializer, ServiceSerializer, FavorisSerializer, LocataireServiceSerializer


# Create your views here.

class BailleurListCreateView(generics.ListCreateAPIView):
    queryset = Bailleur.objects.all()
    serializer_class = BailleurSerializer

class BailleurDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bailleur.objects.all()
    serializer_class = BailleurSerializer

class LocataireListCreateView(generics.ListCreateAPIView):
    queryset = Locataire.objects.all()
    serializer_class = LocataireSerializer

class LocataireDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Locataire.objects.all()
    serializer_class = LocataireSerializer

class AdministrateurListCreateView(generics.ListCreateAPIView):
    queryset = Administrateur.objects.all()
    serializer_class = AdministrateurSerializer

class AdministrateurDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrateur.objects.all()
    serializer_class = AdministrateurSerializer
    

class LogementListCreateView(generics.ListCreateAPIView):
    queryset = Logement.objects.all()
    serializer_class = LogementSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = LogementFilter
    

    def get_queryset(self):
        queryset = super().get_queryset()
        
        
        lat = self.request.GET.get('lat')
        lng = self.request.GET.get('lng')
        rayon = float(self.request.GET.get('rayon', 10))  # Par défaut : 10 km
        
        
        
        if lat and lng:
            lat = float(lat)
            lng = float(lng)
            
            # Filtre initial pour limiter la recherche à une boîte englobante
            delta_lat = rayon / 111  # 1° de latitude ≈ 111 km
            delta_lng = rayon / (111 * cos(radians(lat)))  # Ajustement selon la latitude
            
            queryset = queryset.filter(
                latitude__range=(lat - delta_lat, lat + delta_lat),
                longitude__range=(lng - delta_lng, lng + delta_lng)
            )

            # Ajout de la distance Haversine pour affiner les résultats
            queryset = queryset.annotate(
                distance=self.haversine_sql(lat, lng)
            ).filter(distance__lte=rayon).order_by('distance')

        return queryset
    
    def haversine_sql(self, lat, lng):
        """Génère une expression SQL pour calculer la distance Haversine corrigée"""
        lat_rad = Radians(F('latitude'))
        lng_rad = Radians(F('longitude'))
        input_lat_rad = radians(lat)
        input_lng_rad = radians(lng)

        delta_lat = lat_rad - input_lat_rad
        delta_lng = lng_rad - input_lng_rad

        # Utilisation de Power() au lieu de l'opérateur **
        a_expression = (
            Power(Sin(delta_lat / 2.0), 2) + 
            Cos(input_lat_rad) * 
            Cos(lat_rad) * 
            Power(Sin(delta_lng / 2.0), 2)
        )

        a = ExpressionWrapper(a_expression, output_field=FloatField())
        sqrt_a = Sqrt(a)
        sqrt_1_minus_a = Sqrt(1.0 - a)
        c = ExpressionWrapper(2.0 * ATan2(sqrt_a, sqrt_1_minus_a), output_field=FloatField())

        return ExpressionWrapper(6371.0 * c, output_field=FloatField())
    


class LogementDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Logement.objects.all()
    serializer_class = LogementSerializer

class LocationListCreateView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class FavorisListCreateView(generics.ListCreateAPIView):
    queryset = Favoris.objects.all()
    serializer_class = FavorisSerializer

class FavorisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Favoris.objects.all()
    serializer_class = FavorisSerializer


class LocataireServiceListCreateView(generics.ListCreateAPIView):
    queryset = LocataireService.objects.all()
    serializer_class = LocataireServiceSerializer

class LocataireServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LocataireService.objects.all()
    serializer_class = LocataireServiceSerializer





