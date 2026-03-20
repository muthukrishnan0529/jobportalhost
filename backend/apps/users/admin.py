from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "username",
        "email",
        "role",
        "is_profile_completed",
    )

    fieldsets = (
        (None, {
            "fields": ("username", "password")
        }),

        ("Personal Info", {
            "fields": (
                "email",
                "phone",
                "resume",
            )
        }),

        ("Role Info", {
            "fields": (
                "role",
                "company_name",
                "designation",
                "is_profile_completed",
            )
        }),

        ("Permissions", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),
    )


admin.site.register(User, UserAdmin)