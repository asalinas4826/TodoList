all:
	g++ todo.c -o todo
clean:
	rm ./todo
	pkill node
kill:
	pkill node