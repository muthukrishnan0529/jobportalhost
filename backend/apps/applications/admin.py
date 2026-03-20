from django.contrib import admin
from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "job",
        "status",
        "applied_at",
    )

    search_fields = (
        "user__username",
        "job__title",
    )

    list_filter = (
        "status",
        "applied_at",
    )

    ordering = ("-applied_at",)

    autocomplete_fields = ("user", "job")

    list_editable = ("status",)