from math import radians, cos, sin, asin, sqrt
from django.shortcuts import render
from rest_framework import generics
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

# class LogementListCreateView(generics.ListCreateAPIView):
#     queryset = Logement.objects.all()
#     serializer_class = LogementSerializer

# class LogementDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Logement.objects.all()
#     serializer_class = LogementSerializer

# class LogementListCreateView(generics.ListCreateAPIView):
#     queryset = Logement.objects.all()
#     serializer_class = LogementSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_class = LogementFilter

class LogementListCreateView(generics.ListCreateAPIView):
    queryset = Logement.objects.all()
    serializer_class = LogementSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = LogementFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        if 'lat' in self.request.GET and 'lng' in self.request.GET:
            user_lat = float(self.request.GET.get('lat'))
            user_lng = float(self.request.GET.get('lng'))
            queryset = sorted(queryset, key=lambda x: self.haversine(user_lat, user_lng, x.latitude, x.longitude))
        return queryset

    def haversine(self, lat1, lon1, lat2, lon2):
        # convert decimal degrees to radians
        lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
        # haversine formula
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        # Radius of earth in kilometers. Use 3956 for miles. Determines return value units.
        r = 6371
        return c * r

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





