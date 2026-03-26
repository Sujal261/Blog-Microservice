from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        username = request.data["username"]
        user = User.objects.create_user(
            email=email, password=password, username=username
        )
        return Response({"message": "Registered Successfully"}, status=201)


class LoginView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        if not user:
            return Response({"error": "Invalid Credentials"}, status=401)
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        response = Response(
            {
                "message": "Successful Login",
                "user": {"id": user.id, "email": user.email},
            }
        )

        response.set_cookie(
            key="access",
            value=access,
            max_age=60 * 15,
            httponly=True,
            secure=False,
            samesite=None,
        )
        response.set_cookie(
            key="refresh",
            value=str(refresh),
            max_age=60 * 60 * 24 * 7,
            httponly=True,
            secure=False,
            samesite=None,
        )

        return response


class RefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")
        if not refresh_token:
            return Response({"error": "No refresh token"}, status=401)
        try:
            refresh = RefreshToken(refresh_token)
            user_id = refresh["user_id"]

            user = User.objects.get(id=user_id)
            refresh.blacklist()
            new_refresh = RefreshToken.for_user(user)
            new_access = str(new_refresh.access)

            response = Response({"message": "Token Refreshed"})

            response.set_cookie(
                key="access",
                value=new_access,
                max_age=60 * 15,
                httponly=True,
                secure=False,
                samesite=None,
            )
            response.set_cookie(
                key="refresh",
                value=new_refresh,
                max_age=60 * 60 * 24 * 7,
                httponly=True,
                secure=False,
                samesite=None,
            )
            return response
        except User.DoesNotExist:
            return Response({"Error": "User not found"}, status=401)


class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out"})
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "id": request.user.id,
                "email": request.user.email,
            }
        )
