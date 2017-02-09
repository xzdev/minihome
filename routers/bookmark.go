package routers

import (
	"fmt"
	"net/http"
)

func BookmarkHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "bookmarks")
}
