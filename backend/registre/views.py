from django.shortcuts import render
from registre import models
from rest_framework import generics
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status

#----------------CRUD for Registre-----------------
#C
class RegistreCreateAPIView(generics.CreateAPIView):
    queryset=Registre.objects.all()
    serializer_class = RegistreDetailSerializer
#R
class RegistreDetailAPIView(APIView):

    def get(self, request, **kwargs):
        if 'iddoctor' in kwargs:
            registros = Registre.objects.filter(doctor_id=kwargs['iddoctor'])
        elif 'control_number' in kwargs:
            registros = Registre.objects.filter(control_number=kwargs['control_number'])
        else:
            return Response({"error": "Missing parameter"}, status=400)

        serializer = RegistreDetailSerializer(registros, many=True)
        return Response(serializer.data)
#registre by its id
class SpecificRegistreAPIView(APIView):
    def get(self, request, idRegistre):
        registre = Registre.objects.filter(idRegistre=idRegistre)
        serializer = RegistreDetailSerializer(registre, many=True)
        return Response({"registre": serializer.data[0]}, status=status.HTTP_200_OK)

#the doctor will be able to only see the patients they registred:
class ControlNumbersByDoctorAPIView(APIView):
    def get(self, request, fk_doctor):
        control_numbers = (
            Registre.objects.filter(fk_doctor=fk_doctor)
            .values_list('control_number', flat=True)
            .distinct()
        )

        return Response({"control_numbers": list(control_numbers)}, status=status.HTTP_200_OK)
#once the doctor has all the control numbers, they can choose a date where 
#a registre for this patient was made
class RegistreByControlNumberAndDateAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, control_number, date):

        registros = Registre.objects.filter(
            control_number=control_number,
            date=date
        )

        return Response(
            {"results": RegistreDetailSerializer(registros, many=True).data},
            status=status.HTTP_200_OK
        )
#U
class RegistreRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    lookup_field="idRegistre"
    queryset = Registre.objects.all()
    serializer_class=RegistreDetailSerializer
#D
class RegistreDeleteAPIView(generics.DestroyAPIView):
    lookup_field = "idRegistre"
    queryset = Registre.objects.all()
    serializer_class = RegistreDetailSerializer
