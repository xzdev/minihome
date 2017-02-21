package main

import (
	"log"
	"net/http"
	"time"

	r "./routers"
	"github.com/gorilla/mux"
)

type Route struct {
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

const WWW = "./www/dist/"

func main() {

	routes := Routes{
		Route{"GET", "/blogs", r.BlogsHandler},
		Route{"GET", "/blogs/{id}", r.ReadBlogHandler},
		Route{"GET", "/resume", r.ResumeHandler},
		Route{"GET", "/bookmarks", r.BookmarkHandler},
	}
	router := newRouter(routes)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(WWW)))

	log.Fatal(http.ListenAndServe(":8080", router))
}

func newRouter(routes Routes) *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {

		// wrap the handler to add logging message
		handler := logHandler(route.HandlerFunc, route.Pattern)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Handler(handler)
	}
	return router
}

func logHandler(inner http.Handler, pattern string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		inner.ServeHTTP(w, r)
		log.Printf("%s\t%s\t%s\t%s", r.Method, r.RequestURI, pattern, time.Since(start))
	})
}
