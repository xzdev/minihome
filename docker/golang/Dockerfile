FROM golang:1.6

MAINTAINER xzdev

RUN mkdir -p /go/src/github.com/xzdev/minihome && mkdir -p /database

VOLUME [ "/go" ]
WORKDIR /go/src/github.com/xzdev/minihome

ENV PORT 8080
EXPOSE 8080

#CMD go get && go run main.go