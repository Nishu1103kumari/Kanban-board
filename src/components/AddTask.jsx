function AddTask({
  newTask,
  setNewTask,
  activeColumn,
  setActiveColumn,
  addNewTask,
  columns,
}) {
  return (
    <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-3 bg-zinc-700 text-white"
        onKeyDown={(e) => e.key === "Enter" && addNewTask()}
      />

      <select
        value={activeColumn}
        onChange={(e) => setActiveColumn(e.target.value)}
        className="p-3 bg-zinc-700 text-white border border-zinc-600"
      >
        {Object.keys(columns).map((columnId) => (
          <option key={columnId} value={columnId}>
            {columns[columnId].name}
          </option>
        ))}
      </select>

      <button
        onClick={addNewTask}
        className="px-6 bg-gradient-to-r from-yellow-600 to-amber-500 text-white"
      >
        Add
      </button>
    </div>
  );
}

export default AddTask;