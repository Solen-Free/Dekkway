from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Bailleur, Locataire, Administrateur, Logement, Location, Notification, Service, Favoris, LocataireService


class BailleurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bailleur
        fields = '__all__'

class LocataireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locataire
        fields = ['username', 'email', 'nom', 'prenom', 'adresse', 'telephone']

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
        

class InscriptionLocataireSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Locataire
        fields = ['username', 'email', 'password', 'nom', 'prenom', 'adresse', 'telephone']

    def create(self, validated_data):
        user = Locataire.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            nom=validated_data.get('nom', ''),
            prenom=validated_data.get('prenom', ''),
            adresse=validated_data.get('adresse', ''),
            telephone=validated_data.get('telephone', ''),
        )
        return user

# Serializer pour la connexion
class ConnexionLocataireSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = Locataire.objects.get(email=email)
        except Locataire.DoesNotExist:
            raise serializers.ValidationError("Adresse e-mail ou mot de passe incorrect")

        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError("Adresse e-mail ou mot de passe incorrect")

        data['user'] = user
        return data
    
    