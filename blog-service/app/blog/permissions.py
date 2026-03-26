import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


class JWTUser:
    def __init__(self, payload):
        self.payload = payload

    @property
    def id(self):
        return self.payload.get("user_id")

    @property
    def is_authenticated(self):
        return True


class JWTAuthentication(BaseAuthentication):
    def enforce_csrf(self, request):
        return

    def authenticate(self, request):
        access_token = request.COOKIES.get("access")
        if not access_token:
            return None
        try:
            payload = jwt.decode(
                access_token, settings.SECRET_KEY, algorithms=["HS256"]
            )
            if "user_id" not in payload:
                raise AuthenticationFailed("Invalid token payload")
            return (JWTUser(payload), payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
