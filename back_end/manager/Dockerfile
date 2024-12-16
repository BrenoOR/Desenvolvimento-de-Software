FROM python:3.12.0-slim

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
EXPOSE 50051

RUN apt-get -y update

COPY ./requirements.txt /usr/src/app/requirements.txt

RUN set -eux \
    && pip install --upgrade pip setuptools wheel

RUN pip --default-timeout=1000 install -r /usr/src/app/requirements.txt
RUN rm -rf /root/.cache/pip

COPY . /usr/src/app