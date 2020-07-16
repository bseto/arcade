package wordfactory

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strings"
)

func WordGenerator() string {
	b, err := ioutil.ReadFile("wordbank.txt")

	if err != nil {
		fmt.Println("There is an error in reading file.", err)
	}

	allWords := string(b[:])
	wordList := []string{allWords}

	words := strings.Split(wordList[0], "\r\n")
	pickWord := rand.Intn(len(words))
	return words[pickWord]
}

func WordGenerator2() string {
	file, err := os.Open("wordbank.txt")
	if err != nil {
		fmt.Println("file could not be read", err)
	}
	fileInfo, err := file.Stat()
	if err != nil {
		fmt.Println("file info cannot be read", err)
	}

	var fileSize int = int(fileInfo.Size())
	randomLocation := rand.Intn(fileSize)
	reader := bufio.NewReader(file)

	reader.Discard(randomLocation)

	data, _, _ := reader.ReadLine()
	data, _, _ = reader.ReadLine()
	file.Close()
	return (string(data))
}
