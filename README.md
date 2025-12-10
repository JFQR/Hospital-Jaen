> --------------------------Spanish
# Hospital Jaén

## Un proyecto de práctica, un sitio web para registrar una amplia variedad de signos vitales.

Este sitio puede apoyar a un doctor con el registro de varios signos vitales de un paciente y justo de eso se
compone un registro, de varios signos vitales. 
Cada signo vital es completamente opcional de añadir.

Los registros se pueden crear, modificar, eliminar o consultar.

Como se mencionó, es un proyecto para practicar hecho para implementar nuevas cosas para el desarrollador, como por ejemplo:

* Uso de material UI (componentes, modificación de componentes, uso de íconos)
* Creación de un Error handler
* Uso más robusto de los tokens de autentificación

# Cómo empezar a usarlo.
El primer paso sería clonar el proyecto desde github y seguir:
* Instalar Node js: https://nodejs.org/es
* Instalar Python: https://www.python.org/downloads/
* Instalar y configurar appServ y con phpmyadmin crear una base de datos llamada jaen
* Crear un entorno virtual de python dentro de la carpeta backend
* Ir a la carpeta Scripts del entorno virtual y ejecutar activate
* Regresar a la carpeta backend y ejecutar pip install -r requirements.txt, después ejecutar python manage.py makemigrations y python manage.py migrate
* después, ejecutar python manage.py createsuperuser e ingresar los datos que se demanden

# IMPORTANTE:
Se deberá crear un superusuario, el cual, en localhost:8000/admin podrá activar las cuentas de los doctores

* Ejecutar python manage.py runserver
* Ir a frontend y ejecutar npm install y luego npm run dev
* Ir a http://localhost:5173 en un navegador

## Para tener en cuenta:
El director tiene que creat cursos, asignar maestros a éstos, subir archivos 
para los cursos y aceptar o rechazar gente (CustomUser tiene un campo llamado is_accepted).

> --------------------------English
# Institut Hegel
## A practice project — a platform to record various vital signs of a patient

This website can support doctors with the record of different vital signs of a patient and this is going
to be treaten as a registre, all of the vital signs.
Each vital sign is completely optional to add. 

Registres can be createdm modified, read, or be eliminated.

As menctioned, is a practice project to implement new concepts for the developer, such as:

* ussage of MUI (components, component modification, usage of Icons)
* Creation of an error handler
* More robust usage of security tokens from the backend


# How to Get Started

* The first step is to clone the project from GitHub and then follow these steps:
* Install Node.js: https://nodejs.org/en
* Install Python: https://www.python.org/downloads/
* Install and configure AppServ, and using phpMyAdmin, create a database named jaen.
* Create a Python virtual environment inside the backend folder.
* Go to the Scripts folder inside the virtual environment and run activate.

Return to the backend folder and run:
* pip install -r requirements.txt
* python manage.py makemigrations
* python manage.py migrate
* Then create a superuser:
* python manage.py createsuperuser

# IMPORTANT:
One must create a superuser, which, in localhost:8000/admin, will be able to create accounts for the doctors.

 Start the backend server:
* python manage.py runserver

 Go to frontend folder and run:
* 
* npm install
* npm run dev
* 
 Finally, open your browser and go to:
* http://localhost:5173
