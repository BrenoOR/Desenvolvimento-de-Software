FROM python:3.12.0-slim

WORKDIR /usr/src/app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_DB=${POSTGRES_DB}

# Set container port
EXPOSE 8000

# Update environment
RUN apt-get -y update && \
    apt-get install -y libpq-dev gcc && \
    apt-get clean

# Copy requirements file
COPY ./requirements.txt /usr/src/app/requirements.txt

# Install pip
RUN set -eux \
    && pip install --upgrade pip setuptools wheel

# Install dependencies
RUN pip --default-timeout=1000 install -r /usr/src/app/requirements.txt
RUN rm -rf /root/.cache/pip

# Copy files to the container
COPY . /usr/src/app