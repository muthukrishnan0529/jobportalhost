from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'role', 'phone', 'resume']

    # ⭐ PASSWORD VALIDATION
    def validate_password(self, value):

        validate_password(value)

        return value

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)   # ⭐ hash password properly
        user.save()

        return user