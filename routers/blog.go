package routers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func BlogsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "blogs")
}

func ReadBlogHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	blogID := vars["id"]
	fmt.Fprint(w, "blog", blogID)
}
