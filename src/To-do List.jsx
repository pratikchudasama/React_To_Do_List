import React, { useState } from "react";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleEditChange(event) {
    setEditTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function removeTask(index) {
    setTasks((t) => t.filter((_, i) => i !== index));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const newTasks = [...tasks];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      setTasks(newTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      setTasks(newTasks);
    }
  }

  function startEditing(index) {
    setEditIndex(index);
    setEditTask(tasks[index]);
  }

  function saveTask() {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask("");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">To-Do List</h1>
        <div className="flex mb-4">
          <input
            className="flex-1 p-2 border border-gray-600 bg-gray-900 text-white rounded-l"
            type="text"
            placeholder="Enter task"
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            className="ml-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ol className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              {editIndex === index ? (
                <>
                  <input
                    className="flex-1 p-2 bg-gray-900 text-white rounded-l"
                    type="text"
                    value={editTask}
                    onChange={handleEditChange}
                  />
                  <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                    onClick={saveTask}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="mr-2">{index + 1}.</span>
                  <span className="flex-1">{task}</span>
                  <div className="space-x-2">
                    <button
                      className="p-1 bg-red-500 rounded hover:bg-red-400"
                      onClick={() => removeTask(index)}
                    >
                      🗑️
                    </button>
                    <button
                      className="p-1 bg-yellow-500 rounded hover:bg-yellow-400"
                      onClick={() => moveTaskUp(index)}
                    >
                      ☝
                    </button>
                    <button
                      className="p-1 bg-green-500 rounded hover:bg-green-400"
                      onClick={() => moveTaskDown(index)}
                    >
                      👇
                    </button>
                    <button
                      className="p-1 bg-blue-500 rounded hover:bg-blue-400"
                      onClick={() => startEditing(index)}
                    >
                      🖊
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default ToDo;
