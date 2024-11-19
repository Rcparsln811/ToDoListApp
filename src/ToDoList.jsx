import React, { useState } from 'react';
import './index.css';
import './App.css';
import { motion, Reorder } from "framer-motion";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTasks] = useState("");
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [editingTaskIndex, setEditingTaskIndex] = useState(null); // Düzenlenen görevin indeksi
    const [editingTaskText, setEditingTaskText] = useState(""); // Düzenlenen görev metni

    function handleInputChange(event) {
        setNewTasks(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTasks("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

        const updatedSelectedTasks = selectedTasks
            .filter(i => i !== index)
            .map(i => (i > index ? i - 1 : i));

        setSelectedTasks(updatedSelectedTasks);
    }

    function deleteSelectedTasks() {
        const updatedTasks = tasks.filter((_, index) => !selectedTasks.includes(index));
        setTasks(updatedTasks);
        setSelectedTasks([]);
    }


    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);

            const updatedSelectedTasks = selectedTasks.map(i => {
                if (i === index) return index - 1;
                if (i === index - 1) return index;
                return i;
            });
            setSelectedTasks(updatedSelectedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);

            const updatedSelectedTasks = selectedTasks.map(i => {
                if (i === index) return index + 1;
                if (i === index + 1) return index;
                return i;
            });
            setSelectedTasks(updatedSelectedTasks);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    const handleKeyUpdate = (event) => {
        if (event.key === 'Enter') {
            handleTaskUpdate();
        }
    };



    function toggleTaskSelection(index) {
        if (selectedTasks.includes(index)) {
            setSelectedTasks(st => st.filter(i => i !== index));
        } else {
            setSelectedTasks(st => [...st, index]);
        }
    }

    function handleReorder(updatedTasks) {
        setTasks(updatedTasks);

        const updatedSelectedTasks = updatedTasks
            .map((task, index) => (selectedTasks.includes(tasks.indexOf(task)) ? index : null))
            .filter(index => index !== null);

        setSelectedTasks(updatedSelectedTasks);
    }

    function startEditingTask(index) {
        setEditingTaskIndex(index);  // Düzenleme moduna geç
        setEditingTaskText(tasks[index]);  // Düzenlenecek görevin mevcut metni
    }

    function handleTaskUpdate() {
        if (editingTaskText.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[editingTaskIndex] = editingTaskText;
            setTasks(updatedTasks);
            setEditingTaskIndex(null);  // Düzenleme modundan çık
            setEditingTaskText("");
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Şunu yapacağım.."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="add-button"
                    onClick={addTask}>
                    Ekle
                </button>
                <button
                    className="delete-selected-button"
                    onClick={deleteSelectedTasks}
                    disabled={selectedTasks.length === 0} // Eğer seçili görev yoksa buton pasif olur
                >
                    {selectedTasks.length > 0 ? `Sil ${selectedTasks.length}` : "Sil"}
                </button>
            </div>

            <Reorder.Group values={tasks} onReorder={handleReorder} as="ol">
                {tasks.map((task, index) => (
                    <Reorder.Item
                        key={task}
                        value={task}
                        whileDrag={{ scale: 1.05 }}
                    >
                        {editingTaskIndex === index ? (  // Eğer düzenleme modundaysak
                            <div>
                                <input
                                    type="text"
                                    value={editingTaskText}
                                    onChange={(e) => setEditingTaskText(e.target.value)}
                                    onKeyDown={handleKeyUpdate}
                                />
                                <button className='update-task' onClick={handleTaskUpdate}>Kaydet</button>
                            </div>
                        ) : (
                            <>
                                <label style={{ marginTop: '4px' }}>
                                    <input
                                        type='checkbox'
                                        checked={selectedTasks.includes(index)}
                                        onChange={() => toggleTaskSelection(index)}
                                    />
                                </label>
                                <motion.button
                                    className='update-task'
                                    onClick={() => startEditingTask(index)}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    📝
                                </motion.button>

                                <span
                                    className="text"
                                    style={{
                                        textDecoration: selectedTasks.includes(index) ? 'line-through' : 'none',
                                        color: selectedTasks.includes(index) ? 'grey' : 'black',
                                    }}
                                >
                                    {task}
                                </span>

                                <motion.button
                                    className="delete-button"
                                    onClick={() => deleteTask(index)}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    Sil
                                </motion.button>
                                <motion.button
                                    className="move-button"
                                    onClick={() => moveTaskDown(index)}
                                    whileHover={{ y: +5 }}>
                                    ↓
                                </motion.button>
                                <motion.button
                                    className="move-button"
                                    onClick={() => moveTaskUp(index)}
                                    whileHover={{ y: -5 }}
                                >
                                    ↑
                                </motion.button>
                            </>
                        )}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div >
    );
}

export default ToDoList;
