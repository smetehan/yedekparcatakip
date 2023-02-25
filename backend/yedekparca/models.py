from django.db import models
from django.contrib.auth.models import User

class Car(models.Model):
    brand= models.CharField(max_length=15)
    model = models.CharField(max_length=20)
    year= models.SmallIntegerField()
    image=models.TextField()
    

    def __str__(self):
        return f'{self.brand} - {self.model} - {self.year}'

class Spare(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE,  related_name="spare")
    price = models.DecimalField(max_digits=6, decimal_places=2)
    spare = models.CharField(max_length=25)
    spare_number=models.PositiveSmallIntegerField()
    image=models.TextField()
    box=models.CharField(max_length=20)
    total = models.PositiveSmallIntegerField()
    
    def __str__(self):
        return f'{self.spare} - {self.spare_number} - {self.price} - {self.car}'

  