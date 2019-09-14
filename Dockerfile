FROM alpine:edge

ENV APK_TEMPORARY_PACKAGES="git g++ make"
ENV APK_PACKAGES="python3 py3-gunicorn python3-dev"

COPY ./.requirements /.requirements

RUN apk update && \
  apk add ${APK_TEMPORARY_PACKAGES} && \
  apk add ${APK_PACKAGES} && \
  pip3 install -r /.requirements && \
  apk del --purge -r ${APK_TEMPORARY_PACKAGES} && \
  rm -rf /var/cache/apk/APKINDEX.*

COPY ./server /server
COPY ./application/dist /application/dist

CMD python3 server

#WORKDIR /server

#CMD gunicorn wsgi:application --bind 0.0.0.0:${PORT} --worker-class sanic.worker.GunicornWorker
