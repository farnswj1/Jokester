from django.urls import path, include
from core import views


app_name = 'core'

password_urls = [
    path('<str:pk>/', views.UserUpdatePasswordAPIView.as_view(), name='update'),
]

user_urls = [
    path('register/', views.RegisterUserAPIView.as_view(), name='register'),
    path('all/', views.UserListAPIView.as_view(), name='all'),
    path('<str:pk>/', views.UserDetailAPIView.as_view(), name='detail'),
    path('password/', include((password_urls, 'password'))),
]

urlpatterns = [
    path('users/', include((user_urls, 'users'))),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='login'),
    path('refresh/', views.CustomTokenRefreshView.as_view(), name='refresh'),
]
