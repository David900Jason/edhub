package middlewares

import (
	"errors"
	"net/http"
	"strings"

	"doroosy-backend/internal/models"
	"doroosy-backend/internal/utils"
	"github.com/gin-gonic/gin"
)

const (
	AuthorizationHeaderKey  = "authorization"
	AuthorizationType      = "bearer"
	AuthorizationPayloadKey = "authorization_payload"
)

// AuthMiddleware verifies the access token and sets the user in the context
func AuthMiddleware(jwtSecret string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader(AuthorizationHeaderKey)
		if len(authorizationHeader) == 0 {
			err := errors.New("authorization header is not provided")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			err := errors.New("invalid authorization header format")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		authorizationType := strings.ToLower(fields[0])
		if authorizationType != AuthorizationType {
			err := errors.New("unsupported authorization type")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		accessToken := fields[1]
		payload, err := utils.ParseToken(accessToken, jwtSecret)
		if err != nil {
			if errors.Is(err, utils.ErrExpiredToken) {
				err = errors.New("token has expired")
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
				return
			}
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		ctx.Set(AuthorizationPayloadKey, payload)
		ctx.Next()
	}
}

// RoleMiddleware checks if the user has the required role
func RoleMiddleware(roles ...models.UserRole) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		payload, exists := ctx.Get(AuthorizationPayloadKey)
		if !exists {
			err := errors.New("unauthorized")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		claims, ok := payload.(*utils.JWTClaims)
		if !ok {
			err := errors.New("invalid token claims")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		for _, role := range roles {
			if claims.Role == role {
				ctx.Next()
				return
			}
		}

		err := errors.New("access denied: insufficient permissions")
		ctx.AbortWithStatusJSON(http.StatusForbidden, errorResponse(err))
	}
}

// ErrorResponse is a helper function to format error responses
func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
