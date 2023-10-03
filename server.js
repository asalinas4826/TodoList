import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

// INITIALIZATIONS AND SET-UP
const app = express();
let jsonParser = bodyParser.json()


const client = new pg.Client({
    host: "ec2-3-144-111-214.us-east-2.compute.amazonaws.com",
    user: "ubuntu",
    port: 5432,
    password: "GooglyDoo123",
    database: "postgres"
})
client.connect()

// HTTP REQUESTS
app.get('/api', (req, res) => {
    const options = {
        root: '.'
    }
    res.sendFile('index.html', options)
})


app.get('/api/get', (req, res) => {
    getTodos().then((todos) => {
        res.send(todos)
    })
})


app.post('/api/add', jsonParser, (req, res) => {
    addTodo(req.body)
    res.send(req.body)
})


app.post('/api/toggle', jsonParser, (req, res) => {
    toggleTodo(req.body)
    res.send(req.body)
})


app.post('/api/delete', jsonParser, (req, res) => {
    deleteTodo(req.body)
    res.send(req.body)
})

// DATABASE MANAGEMENT
function addTodo(todo) {
    let todo_val = [`${todo.id}`, `${todo.completed}`, `${todo.title}`]
    client.query(`INSERT INTO todos (id, title, completed) VALUES($1, $3, $2);`, todo_val)
}


function toggleTodo(todo) {
    let todo_val = [`${todo.completed}`, `${todo.id}`]
    client.query(`UPDATE todos SET completed = $1 WHERE id = $2;`, todo_val) 
}


function deleteTodo(todo) {
    let todo_val = [`${todo.id}`]
    client.query(`DELETE FROM todos WHERE id = $1;`, todo_val)
}


async function getTodos() {
    const todos = await client.query(`SELECT * FROM todos;`)
    return todos.rows
}

// START LISTENING
app.use(express.json())
app.listen(3000, () => {console.log("Server listening on port 3000")});
