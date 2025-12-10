from django.db import models
from doctors.models import Doctor

class Registre(models.Model):
	idRegistre = models.AutoField(primary_key = True)
	fk_doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE)
	date = models.DateField()
	patient_name = models.CharField(max_length=100)
	control_number = models.CharField(max_length=50)
	heartbeat = models.IntegerField(blank=True, null=True)
	pas = models.IntegerField(blank=True, null=True)#presión arterial sistólica
	pad = models.IntegerField(blank=True, null=True)#presión arterial diastólica
	breathbeat = models.IntegerField(blank=True, null=True)
	corporalTemp = models.FloatField(blank=True, null=True)
	pain = models.IntegerField(blank=True, null=True)
	ocular = models.CharField(max_length=20, blank=True, null=True) #movimiento ocular
	verbal = models.CharField(max_length=20, blank=True, null=True) #respuesta verbal
	motor_response = models.CharField(max_length=20, blank=True, null=True)
	skin_colour = models.CharField(max_length=20, blank=True, null=True)
	trugidity = models.CharField(max_length=20, blank=True, null=True)
	cardiac_output = models.IntegerField(blank=True, null=True)
	cvp = models.CharField(max_length=20, blank=True, null=True) #presión venosa central
	perfution = models.FloatField(blank=True, null=True)
	_map = models.IntegerField(blank=True, null=True)
	hemoglobin = models.CharField(max_length=20, blank=True, null=True)
	hemotocrit = models.IntegerField(blank=True, null=True)
	pupilary = models.CharField(max_length=20, blank=True, null=True)
	muscle_tone = models.CharField(max_length=20, blank=True, null=True)
	posture = models.CharField(max_length=20, blank=True, null=True)
	bmi = models.FloatField(max_length=5, blank=True, null=True)
	urinary_flow = models.IntegerField(blank=True, null=True )
	arterial_oxigen = models.IntegerField(blank=True, null=True )
	cranial_pressure = models.IntegerField(blank=True, null=True )

