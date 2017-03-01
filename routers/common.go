package routers

import (
	"encoding/json"
	"net/http"
)

const (
	PAGE_SIZE       = 50
	ERROR_NOT_FOUND = -1
)

type errorBlock struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type pageBlock struct {
	PageSize  int `json:"pageSize"`
	PageIndex int `json:"pageIndex"`
	Total     int `json:"total"`
}

func jsonResponse(w http.ResponseWriter, v interface{}) {
	if err := json.NewEncoder(w).Encode(v); err != nil {
		panic(err)
	}
}

func handleError(err error) {
	if err != nil {
		panic(err)
	}
}
