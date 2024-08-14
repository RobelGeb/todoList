const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors())
app.use(express.json());

//ROUTES

//create a todo
//POST = adding data
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo);
        console.log(description);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (todo_id, description) VALUES($1, $2) RETURNING *",
            [id, description]
        );

        res.json(newTodo);
        console.log(description);
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos
//GET = retrieving data
app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
        console.log("rows retrieved");
    } catch (err) {
        console.error(err.message);
    }
});


//get a todo
app.get("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json(todo.rows[0]);
        console.log(id);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
//PUT = update data
app.put("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo was updated: ");
        console.log(description);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("todo #" + id + " was deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
});