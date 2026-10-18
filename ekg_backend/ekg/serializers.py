from rest_framework import serializers
from .models import EKGReading


#tells python how to transform our model into json data that we can access in api

class EKGReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EKGReading
        fields = '__all__'
