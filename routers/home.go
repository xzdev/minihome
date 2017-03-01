package routers

import (
	"fmt"
	"net/http"

	"github.com/garyburd/redigo/redis"
)

func HomeHandler(w http.ResponseWriter, r *http.Request, conn redis.Conn) {
	fmt.Fprint(w, "hello world")
}
