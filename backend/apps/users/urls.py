from django.urls import path
from .views import RegisterView,LoginView,ProfileView,UserDetailView,MyProfileView,UpdateProfileView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("<int:pk>/", UserDetailView.as_view()),
    path("me/", MyProfileView.as_view()),
    path("update/", UpdateProfileView.as_view()),
]