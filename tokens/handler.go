package tokens

import (
	"fmt"
	"os"

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

func SaveTokenToStorage(token string) {
	err := os.WriteFile("storage/tokens.txt", []byte(token), 0644)
	if err != nil {
		fmt.Println("Error Storing Token in File\n", err)
	}
}

func ReadTokenFromStorage() string {
	token, err := os.ReadFile("storage/tokens.txt")
	if err != nil {
		fmt.Println("Error reading token fro file\n", err)
	}
	fmt.Println("Printing token: ", token)
	return string(token)
}
