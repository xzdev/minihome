package routers

import (
	"strconv"
)

func parseInt(value string, defaultValue int) int {
	i, err := strconv.Atoi(value)
	if err != nil {
		return defaultValue
	}
	return i
}

func parseInt64(value string, defaultValue int64) int64 {
	i, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		return defaultValue
	}
	return i
}
