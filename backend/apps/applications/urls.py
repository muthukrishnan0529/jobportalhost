from django.urls import path
from .views import (
    ApplyJobView,
    MyApplicationsView,
    JobApplicantsView,
    UpdateApplicationStatusView,
    RecruiterApplicationsView,
)

urlpatterns = [
    path("apply/", ApplyJobView.as_view()),
    path("my/", MyApplicationsView.as_view()),
    path("job/<int:job_id>/", JobApplicantsView.as_view()),
    path("status/<int:pk>/", UpdateApplicationStatusView.as_view()),
    path("recruiter/", RecruiterApplicationsView.as_view()),
]
