from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ProductViewSet, RegisterView

router = DefaultRouter()
router.register('products', ProductViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
] + router.urls