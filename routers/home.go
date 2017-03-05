package routers

import (
	"fmt"
	"net/http"

	"io/ioutil"
	"os"

	"bytes"
	"encoding/json"

	"github.com/garyburd/redigo/redis"
)

func getSSRServer() string {
	serverName := os.Getenv("SSR")
	port := 3001
	if len(serverName) == 0 {
		serverName = "localhost"
	}

	return fmt.Sprintf("http://%v:%v/ssr", serverName, port)
}

func HomeHandler(w http.ResponseWriter, r *http.Request, conn redis.Conn) {
	blogs, err := getBlogs(PAGE_SIZE, 0, conn)

	// error, create an empty blogBlock object
	if err != nil {
		blogs = &blogBlocks{}
	}

	buffer := new(bytes.Buffer)
	json.NewEncoder(buffer).Encode(blogs)
	resp, err := http.Post(getSSRServer(), "application/json; charset=utf-8", buffer)
	if err == nil {
		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)

		if err == nil {
			w.Header().Set("Content-Type", "text/html;charset=UTF-8")
			w.Write(body)
		}
	}

}
