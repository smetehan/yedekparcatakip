from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import Car,Spare
from .serializers import CarSerializer,SpareSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import DjangoModelPermissions


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class SpareView(viewsets.ModelViewSet):
    queryset = Spare.objects.all()
    serializer_class =SpareSerializer
    permission_classes = [DjangoModelPermissions]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['car']
    search_fields = ['model']    
    
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     #! #############################################
    #     self.perform_update(serializer)