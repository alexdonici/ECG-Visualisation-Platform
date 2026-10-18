from django.urls import path
from .views import EKGDataView
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#these ate the paths
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  #use /api/register/ to test
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #use /api/token/ to test
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('ekg/', EKGDataView.as_view(), name='ekg-data'),
]
