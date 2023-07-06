from django.urls import path
from jokes import views


app_name = 'jokes'

urlpatterns = [
    path('add/', views.JokeCreateAPIView.as_view(), name='add'),
    path('all/', views.JokeListAPIView.as_view(), name='all'),
    path('<str:pk>/', views.JokeDetailAPIView.as_view(), name='detail'),
]
