from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import blogModel
from .permissions import JWTAuthentication
from .serializers import blogSerializer


class BlogCreateView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        user_id = request.auth.get("user_id") if isinstance(request.auth, dict) else None
        if user_id is None:
            return Response({"detail": "Invalid authentication payload"}, status=401)
        data = request.data.copy()
        data["user_id"] = user_id
        serializer = blogSerializer(data=data)
        if serializer.is_valid():
            blog = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors)


class BlogAll(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_id = request.auth.get("user_id") if isinstance(request.auth, dict) else None
        if user_id is None:
            return Response({"detail": "Invalid authentication payload"}, status=401)
        blogs = blogModel.objects.filter(user_id=user_id)
        serializer = blogSerializer(blogs, many=True)
        return Response(serializer.data)


class SingleBlogView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request, id):
        blog = blogModel.objects.get(id=id)
        serializer = blogSerializer(blog)
        return Response(serializer.data)


class DeleteView(APIView):
    authentication_classes = [JWTAuthentication]

    def delete(self, request, id):
        blog = get_object_or_404(blogModel, id=id)
        blog.delete()
        return Response(
            {"message": "Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT
        )


class UpdateView(APIView):
    authentication_classes = [JWTAuthentication]

    def patch(self, request, id):
        blog = get_object_or_404(blogModel, id=id)
        serializer = blogSerializer(blog, data=request.data)
        if serializer.is_valid():
            blog = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors)
