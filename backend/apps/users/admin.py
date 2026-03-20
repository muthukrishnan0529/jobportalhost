from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    list_display = (
        "id",
        "username",
        "email",
        "role",
        "phone",
        "company_name",
        "is_profile_completed",
        "is_staff",
    )

    list_filter = (
        "role",
        "is_profile_completed",
        "is_staff",
        "is_superuser",
    )

    search_fields = (
        "username",
        "email",
        "phone",
        "company_name",
    )

    ordering = ("-id",)

    fieldsets = BaseUserAdmin.fieldsets + (
        (
            "Extra Info",
            {
                "fields": (
                    "role",
                    "phone",
                    "resume",
                    "company_name",
                    "designation",
                    "is_profile_completed",
                )
            },
        ),
    )