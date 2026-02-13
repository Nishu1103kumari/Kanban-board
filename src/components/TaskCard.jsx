function TaskCard({ item, columnId, handleDragStart, removeTask }) {
  return (
    <div
      className="p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-move flex items-center justify-between"
      draggable
      onDragStart={() => handleDragStart(columnId, item)}
    >
      <span>{item.content}</span>

      <button
        onClick={() => removeTask(columnId, item.id)}
        className="text-zinc-400 hover:text-red-400"
      >
        ✕
      </button>
    </div>
  );
}

export default TaskCard;