import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from apps.users.models import User

if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser(
        username="admin",
        email="admin@gmail.com",
        password="admin123",
        role="recruiter"
    )
    print("✅ Admin Created")
else:
    print("⚡ Admin Already Exists")