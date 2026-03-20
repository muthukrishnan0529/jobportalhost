from django.urls import path
from .views import PostJobView,JobListView,SearchJobView,JobDetailView

urlpatterns = [
    path("post/", PostJobView.as_view()),
    path("list/", JobListView.as_view()),
    path("search/", SearchJobView.as_view()),
    path("<int:pk>/", JobDetailView.as_view()),
]