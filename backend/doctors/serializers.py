from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['id'] = user.id
        token['is_active'] = user.is_active

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        request = self.context.get('request')

        data['id'] = user.id
        data['email'] = user.email
        data['is_active'] = user.is_active
        
        return data

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = [
            'id',
            'email',
            'password',
            'professional_license',
            'is_active',
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user

class CheckPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = self.context['request'].user
        password = attrs.get("current_password")

        if not user.check_password(password):
            raise serializers.ValidationError({"current_password": "Contraseña incorrecta"})

        return attrs
