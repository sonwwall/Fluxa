FROM golang:1.24-alpine AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/fluxa-server ./cmd/server

FROM alpine:3.21

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /out/fluxa-server /app/fluxa-server
COPY configs /app/configs

EXPOSE 8080

CMD ["/app/fluxa-server"]
