import { useState } from "react";
import { mockApiCall } from "../mockApi";
import AddTask from "./AddTask";
import Column from "./Column";
import Toast from "./Toast";

function Board({ user, onLogout }) {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "read book" },
      
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [
          { id: "2", content: "write assignment" },
      ],
    },
    done: {
      name: "Done",
      items: [{ id: "3", content: "make project" }],
    },
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const addNewTask = async () => {
    if (!newTask.trim()) return;

    const previousState = structuredClone(columns);
    const updatedColumns = structuredClone(columns);

    updatedColumns[activeColumn].items.push({
      id: Date.now().toString(),
      content: newTask,
    });

    setColumns(updatedColumns);
    setNewTask("");

    try {
      await mockApiCall();
    } catch {
      setColumns(previousState);
      showError("Failed to add item.");
    }
  };

  const removeTask = async (columnId, taskId) => {
    const previousState = structuredClone(columns);
    const updatedColumns = structuredClone(columns);

    updatedColumns[columnId].items =
      updatedColumns[columnId].items.filter(
        (item) => item.id !== taskId
      );

    setColumns(updatedColumns);

    try {
      await mockApiCall();
    } catch {
      setColumns(previousState);
      showError("Failed to delete item.");
    }
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const previousState = structuredClone(columns);
    const updatedColumns = structuredClone(columns);

    const { columnId: sourceColumnId, item } = draggedItem;
    if (sourceColumnId === targetColumnId) return;

    updatedColumns[sourceColumnId].items =
      updatedColumns[sourceColumnId].items.filter(
        (i) => i.id !== item.id
      );

    updatedColumns[targetColumnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);

    try {
      await mockApiCall();
    } catch {
      setColumns(previousState);
      showError("Failed to move item.");
    }
  };

  const columnStyles = {
    todo: {
      header: "bg-gradient-to-r from-pink-600 to-pink-200",
      border: "border-pink-700",
    },
    inProgress: {
      header: "bg-gradient-to-r from-blue-600 to-yellow-100",
      border: "border-blue-400",
    },
    done: {
      header: "bg-gradient-to-r from-green-600 to-green-100",
      border: "border-green-400",
    },
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl">
          Welcome, <span className="text-yellow-400">{user}</span>
        </h2>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>

      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        activeColumn={activeColumn}
        setActiveColumn={setActiveColumn}
        addNewTask={addNewTask}
        columns={columns}
      />

      <div className="flex gap-6 overflow-x-auto pb-6 w-full">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            column={columns[columnId]}
            columnStyle={columnStyles[columnId]}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            removeTask={removeTask}
          />
        ))}
      </div>

      <Toast message={errorMessage} />
    </div>
  );
}

export default Board;