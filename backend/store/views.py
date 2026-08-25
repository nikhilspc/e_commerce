from rest_framework import viewsets, generics, permissions
from .models import Product
from .serializers import ProductSerializer, RegisterSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True   # sab GET kar sakte hain (list/detail)
        return request.user.is_authenticated and hasattr(request.user, 'userprofile') and request.user.userprofile.is_admin

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]