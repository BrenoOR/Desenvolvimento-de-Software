FROM python:3.12.0-slim

WORKDIR /usr/src/app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set container port
EXPOSE 50051
EXPOSE 50080

# Update environment
RUN apt-get -y update

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

# Compile protobufs
RUN cd ./app/ && python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. ./server/proto/message.proto