package routers

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/garyburd/redigo/redis"
)

// Follow GetPocket API document to get the consumer-key and access-token.
// GetPocket API authentication link: https://getpocket.com/developer/docs/authentication
const (
	consumerKey = "*****-************************"
	accessToken = "********-****-****-****-******"
)

func BookmarkHandler(w http.ResponseWriter, r *http.Request, conn redis.Conn) {

	jsonString := fmt.Sprintf("{\"consumer_key\": \"%s\", \"access_token\": \"%s\", \"count\": 100, \"sort\": \"newest\", \"detailType\": \"complete\"}", consumerKey, accessToken)
	jsonValue := []byte(jsonString)
	req, err := http.NewRequest("POST", "https://getpocket.com/v3/get", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	req.Header.Set("X-Accept", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprint(w, string(body))
}
