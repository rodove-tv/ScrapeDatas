package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	secret_alpha := os.Args[1:]               // console args
	secret := strings.Join(secret_alpha, " ") // convert array string into a string
	rune_sec := []rune(secret)                // convert string into an array of rune
	for _, i := range rune_sec {
		if i >= 97 && i <= 122 { // for low case
			if i != 32 {
				if i <= 115 {
					i = i + 7
					result := string(i)
					fmt.Print(result)
				} else {
					i = i - 19
					result := string(i)
					fmt.Print(result)
				}
			} else {
				result := string(i)
				fmt.Print(result)
			}
		} else if i >= 65 && i <= 90 { // for upper case
			if i <= 83 {
				i = i + 7
				result := string(i)
				fmt.Print(result)
			} else {
				i = i - 19
				result := string(i)
				fmt.Print(result)
			}
		} else {
			result := string(i)
			fmt.Print(result)
		}
	}
}
