# Jokester
This app allows users to read jokes that were extracted from Reddit. 

## Setup
The project uses the following:
- Python 3.11
- Django 4.2
- Celery
- NPM
- React 18
- Material-UI 5
- PostgreSQL 15
- Redis 7
- Nginx 1.23
- Docker
- Docker Compose

For additional information on project specifications, see ```backend/Pipfile``` for the backend server and ```frontend/package.json``` for the frontend respectively.

### PostgreSQL
The ```frontend``` directory must also have a ```.env``` file with the following configurations. It is highly recommended to use your own credentials instead of the values provided:
```
REACT_APP_API_URL=http://localhost
```

### Backend
In the ```backend``` directory, create a ```.env``` file that contains the following configurations:

```
SECRET_KEY=somerandomstring

DEBUG=False
ALLOWED_HOSTS=localhost
CORS_ALLOWED_ORIGIN_REGEXES=^https?://(localhost|127\.0\.0\.1)(:3000)?$

DB_ENGINE=django.db.backends.postgresql
DB_HOST=postgres
DB_NAME=jokester
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432

REDIS_URL=redis://redis:6379/0
```

The database variables can be changed as desired. However, make sure to update the environment variables in ```docker-compose.yml``` as well.

The email configurations can also be configured. For more information, see the Django 3.2 documentation.

### Frontend
The ```frontend``` directory must also have a ```.env``` file with the following configurations:
```
REACT_APP_API_URL=http://localhost
```
The URL should be the endpoint of the backend server.

## Building
The project uses Docker. Ensure Docker and Docker Compose are installed before continuing.

To build, run ```docker compose build```

## Running
To run the web app, run ```docker compose up -d```, then go to http://localhost using your web browser.

## Populating the Database
This project provides data to use for the project. Populating the database should only be done once to avoid duplicate data. To do so, run ```docker exec -it backend python manage.py loaddata data.json```.

To create a staff user, run ```docker exec -it backend python manage.py createsuperuser``` and fill out the fields in the prompt.
