from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.contrib.auth import get_user_model
from .models import *
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import ListAPIView
from django.http import JsonResponse

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user, context={'request': request}).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=201)
        return Response(serializer.errors, status=400)

class UserDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            data = {
                'name': user.name,
                'email': user.email,
            }
            return Response(data)

        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=404)


class UpdateUserAndRefreshTokenView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request):
        user = request.user
        data = request.data

        user.email = data.get('email', user.email)
        user.professional_license = data.get('professional_license', user.professional_license)

        if 'password' in data:
            user.set_password(data['password'])

        user.save()

        token = MyTokenObtainPairSerializer.get_token(user)
        return Response({
            'refresh': str(token),
            'access': str(token.access_token),
            'id': user.id,
            'email': user.email,
            'professional_license':user.professional_license,
        })


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({'message': 'Account deleted successfully'})

class SeeUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'email': user.email,
        })

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class TokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.data.get("refreshToken")

        if not refresh_token:
            return Response({"detail": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({"accessToken": access_token}, status=status.HTTP_200_OK)

        except TokenError as e:
            return Response({"detail": "Refresh token is invalid or expired"}, status=status.HTTP_401_UNAUTHORIZED)

class CheckPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = CheckPasswordSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response({"detail": "Contraseña correcta"})
