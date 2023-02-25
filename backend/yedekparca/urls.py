from django.urls import path
from rest_framework import routers
from .views import CarView,SpareView

router = routers.DefaultRouter()

router.register("car", CarView)
router.register("spare", SpareView)


urlpatterns = [
    
] + router.urls