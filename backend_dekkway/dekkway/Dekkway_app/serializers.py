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


class LogementsRechercheSerializer(serializers.ModelSerializer):
    banniere = serializers.SerializerMethodField()

    class Meta:
        model = Logement
        fields = ['id', 'type', 'region', 'quartier', 'prix', 'banniere']

    def get_banniere(self, obj):
        if obj.medias and len(obj.medias.get('images', [])) > 0:
            return obj.medias['images'][0]
        return None
        

class LogementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logement
        fields = ['type', 'description' 'region', 'quartier', 'prix', 'nombre_de_chambres' 'medias', 'equipements']


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