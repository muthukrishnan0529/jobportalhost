from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import JobSerializer
from .models import Job
from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsJobOwner
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsJobOwner


class PostJobView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = JobSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(
                {"message": "Job Posted Successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=400)
    

# class JobListView(APIView):

#     def get(self, request):

#         jobs = Job.objects.all().order_by("-created_at")

#         serializer = JobSerializer(jobs, many=True)

#         return Response(serializer.data)

class JobListView(ListAPIView):

    queryset = Job.objects.all().order_by("-created_at")
    serializer_class = JobSerializer
    
class SearchJobView(APIView):

    def get(self, request):

        keyword = request.query_params.get("keyword")

        jobs = Job.objects.all()

        if keyword:
            jobs = jobs.filter(
                Q(title__icontains=keyword) |
                Q(company__icontains=keyword) |
                Q(location__icontains=keyword)
            )

        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)
    

class JobDetailView(RetrieveUpdateDestroyAPIView):

    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_permissions(self):

        if self.request.method == "GET":
            return [AllowAny()]

        return [IsAuthenticated(), IsJobOwner()]