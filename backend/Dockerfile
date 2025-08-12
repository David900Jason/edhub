# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install dependencies
RUN apk add --no-cache git

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o doroosy-api ./cmd/main.go

# Final stage
FROM alpine:latest

WORKDIR /app

# Install required packages
RUN apk --no-cache add ca-certificates

# Copy the binary from builder
COPY --from=builder /app/doroosy-api .

# Copy configuration files
COPY .env.example .env

# Expose port
EXPOSE 8080

# Command to run the executable
CMD ["./doroosy-api"]
