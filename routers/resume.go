package routers

import (
	"fmt"
	"net/http"
)

func ResumeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "resume")
}
