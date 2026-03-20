from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ApplicationSerializer
from .models import Application
from apps.jobs.models import Job


# class ApplyJobView(APIView):

#     permission_classes = [IsAuthenticated]

#     def post(self, request):

#         # ✅ Recruiter cannot apply
#         if request.user.role == "recruiter":
#             return Response(
#                 {"error": "Recruiter cannot apply for jobs"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         job_id = request.data.get("job")

#         if not job_id:
#             return Response(
#                 {"error": "Job ID is required"}, status=status.HTTP_400_BAD_REQUEST
#             )

#         # ✅ Prevent Duplicate Apply
#         already_applied = Application.objects.filter(
#             job_id=job_id, user=request.user
#         ).exists()

#         if already_applied:
#             return Response(
#                 {"error": "You already applied for this job"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         serializer = ApplicationSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save(user=request.user)

#             return Response(
#                 {"message": "Applied Successfully"}, status=status.HTTP_201_CREATED
#             )

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplyJobView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        # recruiter cannot apply
        if request.user.role == "recruiter":
            return Response(
                {"error": "Recruiter cannot apply"}, status=status.HTTP_400_BAD_REQUEST
            )

        job_id = request.data.get("job")

        if not job_id:
            return Response(
                {"error": "Job ID required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response(
                {"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # ⭐ correct duplicate logic
        if Application.objects.filter(user=request.user, job=job).exists():
            return Response(
                {"error": "Already applied"}, status=status.HTTP_400_BAD_REQUEST
            )

        Application.objects.create(
            user=request.user, job=job, resume=request.user.resume  # ⭐ important
        )

        return Response(
            {"message": "Applied Successfully"}, status=status.HTTP_201_CREATED
        )


class MyApplicationsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        # ⭐ Candidate View
        if user.role == "candidate":

            apps = Application.objects.filter(user=user).select_related("job")

            data = [
                {
                    "id": a.id,
                    "job": a.job.id,
                    "job_title": a.job.title,
                    "company": a.job.company,
                    "status": a.status,
                    "applied_at": a.applied_at,
                }
                for a in apps
            ]

        # ⭐ Recruiter View
        else:

            apps = Application.objects.filter(job__user=user).select_related(
                "job", "user"
            )

            data = [
                {
                    "id": a.id,
                    "candidate_id": a.user.id,
                    "candidate_name": a.user.username,
                    # ⭐ USER MODEL DATA (IMPORTANT)
                    "email": a.user.email,
                    "phone": a.user.phone,
                    "resume": a.user.resume.url if a.user.resume else None,
                    "job_title": a.job.title,
                    "status": a.status,
                    "applied_at": a.applied_at,
                }
                for a in apps
            ]

        return Response({"role": user.role, "data": data})


class JobApplicantsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):

        job = Job.objects.get(id=job_id, user=request.user)

        applications = Application.objects.filter(job=job)

        serializer = ApplicationSerializer(applications, many=True)

        return Response(serializer.data)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Application


class UpdateApplicationStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        try:
            app = Application.objects.get(id=pk)

            # only recruiter who posted job can update
            if app.job.user != request.user:
                return Response(
                    {"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN
                )

            new_status = request.data.get("status")

            if new_status not in ["pending", "shortlisted", "rejected"]:
                return Response(
                    {"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST
                )

            app.status = new_status
            app.save()

            return Response({"message": "Application status updated"})

        except Application.DoesNotExist:
            return Response(
                {"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND
            )


class RecruiterApplicationsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "recruiter":
            return Response({"error": "Only recruiter allowed"}, status=403)

        apps = Application.objects.filter(job__user=request.user).select_related(
            "user", "job"
        )

        data = []

        for a in apps:

            data.append(
                {
                    "id": a.id,
                    "candidate_name": a.user.username,
                    "email": a.user.email,
                    "phone": a.user.phone,
                    "job_title": a.job.title,
                    "resume": (
                        request.build_absolute_uri(a.resume.url) if a.resume else None
                    ),
                    "status": a.status,
                    "applied_at": a.applied_at,
                }
            )

        return Response(data)
