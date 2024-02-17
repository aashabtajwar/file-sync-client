package notifications

import "github.com/gen2brain/beeep"

func AlertNotification(title string, msg string, assetName string) {
	err := beeep.Alert(title, msg, "assets/"+assetName)
	if err != nil {
		panic(err)
	}
}
