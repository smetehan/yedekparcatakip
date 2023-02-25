from rest_framework import serializers
from .models import Car,Spare

class CarSerializer(serializers.ModelSerializer):
     class Meta:
        model = Car
        fields = (
            'id',
            'brand',
            'model',
            'year',
            'image',
            
        )

class SpareSerializer(serializers.ModelSerializer):
    car = serializers.StringRelatedField()
    car_id = serializers.IntegerField()
    user= serializers.StringRelatedField()
    user_id = serializers.IntegerField()
    class Meta:
        model = Spare
        fields = (
            "id",
            "car",
            "car_id",
            "spare",
            "spare_number",
            "user",
            "user_id",
            "price",
            "image",
            "box",
            "total",
          
        )
        
    
   
    