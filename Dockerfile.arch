FROM archlinux/base

ENV PACMAN_PACKAGES="python python-pip git base-devel"

copy ./.requirements /.requirements

RUN pacman --noconfirm -Sy ${PACMAN_PACKAGES} && \
  pip install -r /.requirements

COPY ./server /server
COPY ./application/dist /application/dist

CMD python server
