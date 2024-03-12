package Go

import (
	"html/template"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request){
	template.Must(template.ParseFiles("frontend/html/index.html")).Execute(w, nil)

}