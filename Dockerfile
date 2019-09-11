FROM alpine:3.7

ENV APK_TEMPORARY_PACKAGES="git g++ make python3-dev"
ENV APK_PACKAGES="python3"

COPY ./.requirements /.requirements

RUN apk add ${APK_TEMPORARY_PACKAGES} && \
  apk add ${APK_PACKAGES} && \
  pip3 install -r /.requirements && \
  apk del --purge -r ${APK_TEMPORARY_PACKAGES} && \
  rm -rf /var/cache/apk/APKINDEX.*

COPY ./server /server

CMD [ "python3", "server" ]
