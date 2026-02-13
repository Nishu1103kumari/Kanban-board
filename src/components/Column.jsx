import TaskCard from "./TaskCard";

function Column({
  columnId,
  column,
  columnStyle,
  handleDragOver,
  handleDrop,
  handleDragStart,
  removeTask,
}) {
  return (
    <div
      className={`flex-shrink-0 w-80 bg-zinc-800 rounded-lg shadow-xl border-t-4 ${columnStyle.border}`}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnId)}
    >
      <div
        className={`p-4 text-white font-bold text-xl rounded-t-md ${columnStyle.header}`}
      >
        {column.name}
        <span className="ml-2 px-2 py-1 bg-zinc-800 rounded-full text-sm">
          {column.items.length}
        </span>
      </div>

      <div className="p-3 min-h-64">
        {column.items.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 italic text-sm">
            Drop tasks here
          </div>
        ) : (
          column.items.map((item) => (
            <TaskCard
              key={item.id}
              item={item}
              columnId={columnId}
              handleDragStart={handleDragStart}
              removeTask={removeTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;