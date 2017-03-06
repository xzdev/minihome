package main

import (
	"log"
	"net/http"
	"time"

	r "./routers"
	"github.com/garyburd/redigo/redis"
	"github.com/gorilla/mux"
)

type ServerHandler func(http.ResponseWriter, *http.Request, redis.Conn)

type Route struct {
	Method      string
	Pattern     string
	HandlerFunc ServerHandler
}

type Routes []Route

const (
	WWW            = "./www/dist/"
	MAX_CONNECTION = 100
)

func main() {

	redisPool := redis.NewPool(func() (redis.Conn, error) {
		c, err := redis.Dial("tcp", "127.0.0.1:6379")
		if err != nil {
			return nil, err
		}
		return c, err
	}, MAX_CONNECTION)
	defer redisPool.Close()

	routes := Routes{
		Route{"GET", "/ssr", r.HomeHandler},
		Route{"POST", "/blogs", r.CreateBlogHandler},
		Route{"GET", "/blogs", r.BlogsHandler},
		Route{"GET", "/blogs/{id}", r.ReadBlogHandler},
		Route{"GET", "/resume", r.ResumeHandler},
		Route{"GET", "/bookmarks", r.BookmarkHandler},
	}
	router := newRouter(routes, redisPool)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(WWW)))

	log.Fatal(http.ListenAndServe(":8080", router))
}

func newRouter(routes Routes, pool *redis.Pool) *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {

		// wrap the handler to add logging message
		handler := wrapHandler(route.HandlerFunc, route.Pattern, pool)
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Handler(handler)
	}
	return router
}

func wrapHandler(inner ServerHandler, pattern string, pool *redis.Pool) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		conn := pool.Get()
		defer conn.Close()

		w.Header().Set("Content-Type", "application/json;charset=UTF-8")

		inner(w, r, conn)
		log.Printf("%s\t%s\t%s\t%s", r.Method, r.RequestURI, pattern, time.Since(start))
	})
}
