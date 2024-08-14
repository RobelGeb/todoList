import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method:"POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location.href = "http://localhost:3000";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div className="w-full bg-gray-300 flex flex-col items-center justify-center">
            <h1 className="text-4xl justify-center m-8">InputTodo</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="bg-green-600 rounded-md text-white ml-2 p-2" >Add</button>
            </form>
        </div>
    )
};

export default InputTodo;