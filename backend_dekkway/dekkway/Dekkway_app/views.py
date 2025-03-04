from django.shortcuts import render
from rest_framework import generics
from .models import Bailleur, Locataire, Administrateur, Logement, Location, Notification, Service, Favoris
from .serializers import BailleurSerializer, LocataireSerializer, AdministrateurSerializer, LogementSerializer, LocationSerializer, NotificationSerializer, ServiceSerializer, FavorisSerializer


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
