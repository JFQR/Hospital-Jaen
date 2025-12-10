from rest_framework import serializers
from .models import *

class RegistreDetailSerializer(serializers.ModelSerializer):   
    class Meta:
        model=Registre
        fields=[
            "idRegistre",
            "fk_doctor",
            "date",
            "patient_name",
            "control_number",
            "heartbeat",
            "pas",
            "pad",
            "breathbeat",
            "corporalTemp",
            "pain",
            "ocular",
            "verbal",
            "motor_response",
            "skin_colour",
            "trugidity",
            "cardiac_output",
            "cvp",
            "perfution",
            "_map",
            "hemoglobin",
            "hemotocrit",
            "pupilary",
            "muscle_tone",
            "posture",
            "bmi",
            "urinary_flow",
            "arterial_oxigen",
            "cranial_pressure",
        ]