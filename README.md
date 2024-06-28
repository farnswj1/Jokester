# Jokester
This app allows users to read jokes that were extracted from Reddit.

## Setup
The project uses the following:
- Python 3
- TypeScript
- Django
- Celery
- NPM
- React
- Material-UI
- Vite
- PostgreSQL
- RabbitMQ
- Redis
- Nginx
- Certbot
- Docker
- Docker Compose

For additional information on project specifications, see ```backend/Pipfile``` for the backend server and ```frontend/package.json``` for the frontend respectively.

### PostgreSQL
The ```postgres``` directory must also have a ```.env``` file with the following configurations. It is highly recommended to use your own credentials instead of the values provided:
```
POSTGRES_DB=jokester
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

### RabbitMQ
The ```rabbitmq``` directory must also have a ```.env``` file with the following configurations:
```
RABBITMQ_DEFAULT_USER=myuser
RABBITMQ_DEFAULT_PASS=password
RABBITMQ_DEFAULT_VHOST=myvhost
```

### Backend
In the ```backend``` directory, create a ```.env``` file that contains the following configurations:
```
SECRET_KEY=somerandomstring

DEBUG=False
ALLOWED_HOSTS=localhost
CORS_ALLOWED_ORIGIN_REGEXES=^https?://(localhost|127\.0\.0\.1)(:3000)?$
CSRF_TRUSTED_ORIGINS=http://localhost http://127.0.0.1

DB_ENGINE=django.db.backends.postgresql
DB_HOST=postgres
DB_NAME=jokester
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432

RABBITMQ_URL=amqp://myuser:password@rabbitmq:5672/myvhost
REDIS_URL=redis://redis:6379/0

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=example@gmail.com
EMAIL_HOST_PASSWORD=password
```

The database variables can be changed as desired. However, make sure to update the environment variables in ```docker-compose.yml``` as well.

The email configurations can also be configured. For more information, see the Django 3.2 documentation.

### Frontend
The ```frontend``` directory must also have a ```.env``` file with the following configurations:
```
VITE_API_URL=http://localhost
```
The URL should be the endpoint of the backend server.

## Building
The project uses Docker. Ensure Docker and Docker Compose are installed before continuing.

To build, run ```docker compose build```

## Running
To run the web app, run ```docker compose up -d```, then go to http://localhost using your web browser.

## Setting Up RabbitMQ
To ensure the client can connect to RabbitMQ, run `docker exec -it rabbitmq rabbitmqctl set_permissions -p myvhost myuser ".*" ".*" ".*"`

## Populating the Database
This project provides data to use for the project. Populating the database should only be done once to avoid duplicate data. To do so, run ```docker exec -it backend python manage.py loaddata data.json```.

To create a staff user, run ```docker exec -it backend python manage.py createsuperuser``` and fill out the fields in the prompt.

### Setting Up HTTPS With Certbot
There are configurations already set up via `cli.ini` in the `certbot` directory. To receive an SSL certificate using those configurations, run:
```
docker compose run --no-deps --rm certbot certonly -d [enter domain here]
```

Fill out the prompt, then configure Nginx to use the SSL certificate and domain.

To renew the SSL certificate and use the newest certificate, run:
```
docker compose run --no-deps --rm certbot renew && docker exec nginx nginx -s reload
```

**NOTE**: Ensure port 443 is exposed in `docker-compose.yml` for HTTPS.
