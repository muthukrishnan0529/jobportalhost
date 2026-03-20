from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .models import User
from rest_framework.parsers import MultiPartParser, FormParser


class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User Registered Successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class LoginView(APIView):

#     def post(self, request):

#         username = request.data.get("username")
#         password = request.data.get("password")

#         user = authenticate(username=username, password=password)

#         if user is not None:

#             refresh = RefreshToken.for_user(user)

#             return Response(
#                 {
#                     "access": str(refresh.access_token),
#                     "refresh": str(refresh),
#                     # ⭐ VERY IMPORTANT
#                     "role": user.role,
#                     "username": user.username,
#                     "user_id": user.id,
#                     "is_profile_completed": user.is_profile_completed,  # ⭐ NEW
#                     "phone": user.phone,
#                     "resume": user.resume.url if user.resume else None,
#                 }
#             )

#         return Response({"error": "Invalid Credentials"}, status=400)


class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
            )

        # ⭐ CREATE JWT TOKENS
        refresh = RefreshToken.for_user(user)

        # ⭐ PROFILE COMPLETION LOGIC
        if user.role == "candidate":
            is_profile_completed = True if user.phone and user.resume else False
        else:  # recruiter
            is_profile_completed = True if user.phone else False

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "role": user.role,
                "username": user.username,
                "user_id": user.id,
                "phone": user.phone,
                "resume": user.resume.url if user.resume else None,
                "is_profile_completed": is_profile_completed,
            },
            status=status.HTTP_200_OK,
        )


class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        data = {
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "phone": user.phone,
        }

        return Response(data)


class UserDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        user = User.objects.get(id=pk)

        return Response(
            {
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "resume": user.resume.url if user.resume else None,
            }
        )


class MyProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "resume": user.resume.url if user.resume else None,
                "is_profile_completed": user.is_profile_completed,
            }
        )


# class UpdateProfileView(APIView):

#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def put(self, request):

#         user = request.user

#         user.phone = request.data.get("phone", user.phone)
#         user.email = request.data.get("email", user.email)

#         if "resume" in request.FILES:
#             user.resume = request.FILES["resume"]

#         user.save()

#         return Response({"msg": "Profile Updated"})


class UpdateProfileView(APIView):

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):

        user = request.user

        user.phone = request.data.get("phone", user.phone)
        user.email = request.data.get("email", user.email)

        # recruiter fields
        user.company_name = request.data.get("company_name", user.company_name)

        user.designation = request.data.get("designation", user.designation)

        if "resume" in request.FILES:
            user.resume = request.FILES["resume"]

        # ⭐ onboarding logic
        if user.role == "candidate":
            if user.phone and user.resume:
                user.is_profile_completed = True

        if user.role == "recruiter":
            if user.phone and user.company_name and user.designation:
                user.is_profile_completed = True

        user.save()

        return Response(
            {
                "msg": "Profile Updated",
                "is_profile_completed": user.is_profile_completed,
            }
        )
