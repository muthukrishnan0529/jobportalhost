from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ('recruiter', 'Recruiter'),
        ('candidate', 'Candidate'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    phone = models.CharField(max_length=15, null=True, blank=True)

    resume = models.FileField(upload_to="resumes/", null=True, blank=True)

    company_name = models.CharField(max_length=200, null=True, blank=True)

    designation = models.CharField(max_length=200, null=True, blank=True)

    is_profile_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.username