from rest_framework import serializers
from .models import Bailleur, Locataire, Administrateur, Logement, Location, Notification, Service, Favoris, LocataireService


class BailleurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bailleur
        fields = '__all__'

class LocataireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locataire
        fields = '__all__'

class AdministrateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrateur
        fields = '__all__'

class LogementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logement
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class FavorisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favoris
        fields = '__all__'


class LocataireServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocataireService
        fields = '__all__'