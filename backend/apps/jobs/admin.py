from django.contrib import admin
from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "company",
        "location",
        "salary",
        "user",
        "created_at",
    )

    search_fields = (
        "title",
        "company",
        "location",
        "user__username",
    )

    list_filter = (
        "location",
        "created_at",
    )

    ordering = ("-created_at",)

    autocomplete_fields = ("user",)