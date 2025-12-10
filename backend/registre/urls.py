from django.contrib import admin
from django.urls import path, include
from registre import views
from django.conf import settings
from django.conf.urls.static import static
from registre import views

app_name="registre"

urlpatterns = [

    path('create/registre/', views.RegistreCreateAPIView.as_view()),
    #this helps to get of of the registres of a doctor or a patient
    path('detail/registres_by_doctor/<int:iddoctor>/', views.RegistreDetailAPIView.as_view()),
    path('specificRegistre/<int:idRegistre>/', views.SpecificRegistreAPIView.as_view()),
    
    path('detail/registres_by_patient/<int:control_number>/', views.RegistreDetailAPIView.as_view()),
    path(
        'detail/control_numbers_by_doctor/<int:fk_doctor>/',
        views.ControlNumbersByDoctorAPIView.as_view()
    ),
    path(
        'detail/registre_by_control_and_date/<str:control_number>/<str:date>/',
        views.RegistreByControlNumberAndDateAPIView.as_view(),
    ),

    path('update/registre/<int:idRegistre>/', views.RegistreRetrieveUpdateAPIView.as_view()),
    path('delete/registre/<int:idRegistre>/', views.RegistreDeleteAPIView.as_view()),
]