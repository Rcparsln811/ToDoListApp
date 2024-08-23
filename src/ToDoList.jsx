import React, { useState } from 'react'

function ToDoList() {

    const [tasks, setTasks] = useState(["sa", "as", "assse"]);
    const [newTask, setNewTasks] = useState("");

    function handleInputChange(event) {
        setNewTasks(event.target.value);

    }

    function addTask() {

    }

    function deleteTask(index) {

    }

    function moveTaskUp(index) {

    }

    function moveTaskDown(index) {

    }




    return (
        <div className="to-do-list" >

            <h1>To-Do-List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Şunu yapacağım.."
                    value={newTask}
                    onChange={handleInputChange} />
                <button
                    className="add-button"
                    onClick={addTask}>
                    Ekle
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index} >
                        <span className="text" >{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            Sil

                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            ☝️

                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            👇

                        </button>


                    </li>

                )}
            </ol>


        </div>
    );
}

export default ToDoList