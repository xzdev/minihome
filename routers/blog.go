package routers

import (
	"fmt"
	"net/http"

	"log"

	"encoding/json"

	"io/ioutil"

	"strconv"
	"time"

	"github.com/garyburd/redigo/redis"
	"github.com/gorilla/mux"
)

type Blog struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	Content     string `json:"content"`
	PublishTime int64  `json:"publishTime"`
}

type blogBlocks struct {
	pageBlock
	Blogs []Blog `json:"blogs"`
}

func BlogsHandler(w http.ResponseWriter, r *http.Request, conn redis.Conn) {

	query := r.URL.Query()
	pageSize := parseInt(query.Get("pageSize"), PAGE_SIZE)
	pageIndex := parseInt(query.Get("pageIndex"), 0)

	log.Println("pageSize:", pageSize, "pageIndex:", pageIndex)
	// query db to get the blogs data
	rows, err := conn.Do("KEYS", "blog:*")

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		error := errorBlock{
			Code:    ERROR_NOT_FOUND,
			Message: "Cannot find any data",
		}
		jsonResponse(w, error)
	} else {
		total := len(rows.([]interface{}))
		blogs := []Blog{}
		for i := 0; i < pageSize; i++ {
			var blog Blog
			blogID := i + pageIndex*pageSize + 1 // 1-based index
			blogBlob, err := conn.Do("GET", fmt.Sprintf("blog:%v", blogID))
			if err != nil || blogBlob == nil {
				continue
			}

			if err = json.Unmarshal(blogBlob.([]byte), &blog); err != nil {
				panic(err)
			} else {
				blogs = append(blogs, blog)
			}
		}

		blockData := blogBlocks{
			pageBlock: pageBlock{
				PageSize:  pageSize,
				PageIndex: pageIndex,
				Total:     total,
			},
			Blogs: blogs,
		}

		w.WriteHeader(http.StatusOK)
		jsonResponse(w, blockData)
	}

}

func ReadBlogHandler(w http.ResponseWriter, r *http.Request, conn redis.Conn) {
	vars := mux.Vars(r)
	blogID := vars["id"]

	blogBlob, err := conn.Do("GET", "blog:"+blogID)
	handleError(err)

	if blogBlob == nil {
		w.WriteHeader(http.StatusNotFound)
		error := errorBlock{
			Code:    ERROR_NOT_FOUND,
			Message: "Cannot find any data",
		}
		jsonResponse(w, error)
	} else {
		w.WriteHeader(http.StatusOK)
		w.Write(blogBlob.([]byte))
	}
}

func CreateBlogHandler(w http.ResponseWriter, r *http.Request, conn redis.Conn) {

	body, err := ioutil.ReadAll(r.Body)
	handleError(err)

	log.Println("receive POST body", string(body))
	var blog Blog
	err = json.Unmarshal(body, &blog)
	handleError(err)

	// the globalBlogID may not be thread safe
	globalBlogID, err := conn.Do("GET", "globalBlogID")
	handleError(err)
	log.Println("globalBlogID", globalBlogID)

	newBlogID := int64(0)
	if globalBlogID != nil {
		newBlogID, err = redis.Int64(globalBlogID, err)
	} else {
		conn.Do("SET", "globalBlogID", 0)
	}
	newBlogID += 1
	bidStr := strconv.FormatInt(newBlogID, 10)

	reply, err := conn.Do("INCR", "globalBlogID")
	handleError(err)
	log.Println("set global blog id", newBlogID, reply)

	blog.ID = newBlogID
	blog.PublishTime = time.Now().Unix() * 1000
	bJson, err := json.Marshal(blog)
	handleError(err)

	reply, err = conn.Do("SET", "blog:"+bidStr, bJson)
	handleError(err)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{\"id\":" + bidStr + "}"))
}
