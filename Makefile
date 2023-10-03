all:
	g++ todo.c -o todo
	./todo
clean:
	rm ./todo
	pkill node
kill:
	pkill node