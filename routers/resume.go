package routers

import (
	"fmt"
	"net/http"

	"io/ioutil"

	"github.com/garyburd/redigo/redis"
)

func ResumeHandler(w http.ResponseWriter, r *http.Request, conn redis.Conn) {
	content, err := ioutil.ReadFile("./static/resume.json")
	if err != nil {
		fmt.Fprint(w, "{}")
	} else {
		resume := string(content)
		fmt.Fprint(w, resume)
	}
}
