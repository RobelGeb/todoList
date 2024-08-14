import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);
    
    const getTodos = async () => {
        try {
            //fetch = automatic get request
            const response = await fetch("http://localhost:5000/todos");
            //wait for json from response
            const jsonData = await response.json();
            //set todo state to json response data
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteTodo = async id => {
        try {
            const response_delete = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            window.location.href = "http://localhost:3000";
        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
        
    }, []);

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-4xl p-5">ListTodos</h1>
            <div className="overflow-auto w-1/2 flex justify-center">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200 text-center">
                        <tr>
                        <th className="p-3 text-md tracking-wide">Task</th>
                        <th className="p-3 text-md tracking-wide">__</th>
                        <th className="p-3 text-md tracking-wide">__</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {todos.map((todo) => (
                            <tr key={todo.todo_id}>
                                <td className="text-left">{todo.description}</td>
                                <td><button><EditTodo todo={todo}/></button></td>
                                <td><button className="rounded-lg uppercase bg-opacity-50 tracking-wide font-semibold text-gray-700 bg-red-300 hover:bg-rose-900 hover:text-white p-1.5" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTodos;