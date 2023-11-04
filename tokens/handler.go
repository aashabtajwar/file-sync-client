package tokens

import (
	"fmt"

	"github.com/golang-jwt/jwt/v4"
)

func DecodeToken(token string) jwt.MapClaims {
	claims := jwt.MapClaims{}
	data, err := jwt.ParseWithClaims(token, claims, func(data *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		fmt.Println("Error Decoding Token\n", data)
	}
	if claims, ok := data.Claims.(jwt.MapClaims); ok && data.Valid {
		return claims
	} else {
		return nil
	}
}
